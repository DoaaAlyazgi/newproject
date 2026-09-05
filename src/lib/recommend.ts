import { products } from '../data/products';
import type {
  Answers,
  BudgetId,
  MatchReason,
  Product,
  Recommendation,
} from './types';

/**
 * Deterministic, front-end-only recommendation engine.
 *
 * There is no AI API and no network call here: every result is derived from
 * the answers the customer gave and the local catalogue. The same answers
 * always produce the same three recommendations, which is what makes the
 * prototype safe to demo live.
 */

const BUDGET_BANDS: Record<Exclude<BudgetId, 'unsure'>, [number, number]> = {
  under5: [0, 5],
  '5-10': [5, 10],
  '10-20': [10, 20],
  '20-50': [20, 50],
  '50+': [50, Number.POSITIVE_INFINITY],
};

const BAND_ORDER: BudgetId[] = ['under5', '5-10', '10-20', '20-50', '50+'];

/** The price span a product actually occupies (a single price is a zero-width span). */
const priceSpan = (p: Product): [number, number] =>
  p.priceRange ? [p.priceRange.min, p.priceRange.max] : [p.price, p.price];

const spansOverlap = (a: [number, number], b: [number, number]) =>
  a[0] <= b[1] && b[0] <= a[1];

/** Resolves the customer's quantity to a single number for scoring. */
export function resolvedQuantity(answers: Answers): number {
  if (answers.quantityExact && answers.quantityExact > 0) return answers.quantityExact;
  switch (answers.quantityBand) {
    case '1-10':
      return 8;
    case '11-25':
      return 20;
    case '26-50':
      return 40;
    case '51-100':
      return 75;
    case '100+':
      return 150;
    default:
      return 0;
  }
}

interface Scored {
  product: Product;
  score: number;
  reasons: MatchReason[];
}

function scoreProduct(product: Product, answers: Answers): Scored {
  let score = 0;
  const reasons: MatchReason[] = [];

  /* ---- Occasion: the strongest signal in the whole model ---- */
  if (answers.occasion) {
    if (product.occasion.includes(answers.occasion)) {
      score += 42;
      reasons.push({ key: 'reason.occasion', value: `occasion.${answers.occasion}.title` });
    } else {
      // A mismatched occasion is disqualifying, not merely unhelpful.
      score -= 45;
    }
  }

  /* ---- Recipients ---- */
  if (answers.recipients.length) {
    const hits = answers.recipients.filter((r) => product.recipients.includes(r));
    if (hits.length) {
      score += Math.min(16, hits.length * 8);
      reasons.push({ key: 'reason.recipients', value: `recipient.${hits[0]}` });
    }
  }

  /* ---- Budget ---- */
  if (answers.budget && answers.budget !== 'unsure') {
    const band = BUDGET_BANDS[answers.budget];
    const span = priceSpan(product);
    if (spansOverlap(span, band)) {
      score += 30;
      reasons.push({ key: 'reason.budget', value: `budget.${answers.budget}` });
    } else {
      const wantedIndex = BAND_ORDER.indexOf(answers.budget);
      const productIndex = BAND_ORDER.findIndex((b) =>
        b === 'unsure' ? false : spansOverlap(span, BUDGET_BANDS[b as Exclude<BudgetId, 'unsure'>]),
      );
      const distance = Math.abs(productIndex - wantedIndex);
      score += distance <= 1 ? 8 : -20;
      if (distance <= 1 && span[0] < band[0]) {
        reasons.push({ key: 'reason.underBudget' });
      }
    }
  } else if (answers.budget === 'unsure') {
    // Nothing is excluded on price — nudge the mid range so the three cards
    // span an informative price ladder instead of clustering at one end.
    const [min] = priceSpan(product);
    score += min >= 1 && min <= 20 ? 8 : 2;
  }

  /* ---- Quantity / bulk suitability ---- */
  const qty = resolvedQuantity(answers);
  if (qty >= 50) {
    if (product.bulkSuitable) {
      score += 22;
      reasons.push({ key: 'reason.bulk', value: String(qty) });
    } else {
      score -= 30;
    }
  } else if (qty > 0 && qty <= 10 && !product.bulkSuitable) {
    // Small runs are exactly where the heavier, individually-presented pieces belong.
    score += 12;
    reasons.push({ key: 'reason.smallRun' });
  }

  /* ---- Style ---- */
  if (answers.style && answers.style !== 'unsure') {
    if (product.styles.includes(answers.style)) {
      score += 20;
      reasons.push({ key: 'reason.style', value: `style.${answers.style}` });
    } else {
      score -= 8;
    }
  } else if (answers.style === 'unsure') {
    score += 4;
  }

  /* ---- Customization ---- */
  const wants = answers.customization;
  if (wants.includes('logo')) {
    if (product.supportsLogo) {
      score += 14;
      reasons.push({ key: 'reason.logo' });
    } else {
      score -= 30;
    }
  }
  if (wants.includes('engraving') || wants.includes('text')) {
    if (product.supportsEngraving) {
      score += 12;
      reasons.push({ key: 'reason.engraving' });
    } else {
      score -= 30;
    }
  }
  if (wants.includes('ribbon')) {
    if (product.hasVerifiedVariants && product.ribbonOptions?.length) {
      score += 16;
      reasons.push({ key: 'reason.ribbon' });
    } else {
      score -= 10;
    }
  }
  if (wants.includes('design') && product.customizable) {
    score += 6;
  }

  /* ---- Timeline: shorter lead times favour the simpler, stocked formats ---- */
  if (answers.timeline === 'urgent' || answers.timeline === 'days') {
    if (product.category === 'medals' || product.category === 'trophies') score += 8;
  }

  return { product, score, reasons };
}

/**
 * Returns the three cards shown on the results screen, labelled
 * BEST MATCH / BEST VALUE / PREMIUM CHOICE. Always three distinct products
 * where the catalogue allows it, ordered deterministically.
 */
function rankViable(answers: Answers): Scored[] {
  return products
    .map((p) => scoreProduct(p, answers))
    .filter((r) => {
      // Never recommend a piece for an occasion the catalogue does not list it
      // under, however well it scores on price or customisation.
      if (answers.occasion && !r.product.occasion.includes(answers.occasion)) return false;
      return r.score > 0;
    })
    .sort((a, b) => {
      if (b.score !== a.score) return b.score - a.score;
      if (a.product.price !== b.product.price) return a.product.price - b.product.price;
      return a.product.id.localeCompare(b.product.id);
    });
}

export function recommend(answers: Answers): Recommendation[] {
  const viable = rankViable(answers);
  if (!viable.length) return [];

  const best = viable[0];
  // Value and premium are chosen from the strongest remaining matches only, so
  // a cheap or expensive outlier can never outrank a genuinely better fit.
  const pool = viable.slice(1, 5);

  const cheapest = [...pool].sort(
    (a, b) => a.product.price - b.product.price || a.product.id.localeCompare(b.product.id),
  )[0];

  const taken = new Set([best.product.id, cheapest?.product.id]);

  let third = [...pool]
    .filter((r) => !taken.has(r.product.id))
    .sort(
      (a, b) => b.product.price - a.product.price || a.product.id.localeCompare(b.product.id),
    )[0];

  // If all three would be near-identical pieces, reach a little further down the
  // ranking for a different format — a cup alongside two medals is more useful
  // to the customer than a third medal.
  if (
    third &&
    third.product.category === best.product.category &&
    cheapest?.product.category === best.product.category
  ) {
    const different = viable
      .slice(1)
      .filter((r) => !taken.has(r.product.id) && r.product.category !== best.product.category)
      .sort((a, b) => b.score - a.score || a.product.price - b.product.price)[0];
    if (different) third = different;
  }

  const picked: Recommendation[] = [{ ...best, badge: 'best' }];
  if (cheapest) picked.push({ ...cheapest, badge: 'value' });
  if (third) picked.push({ ...third, badge: premiumBadgeFor(third.product, best.product) });

  return picked;
}

/**
 * "Premium choice" is only claimed when the third card genuinely is one:
 * meaningfully dearer than the best match AND positioned as a premium piece.
 * Otherwise it is presented honestly as another strong match.
 */
function premiumBadgeFor(third: Product, best: Product): 'premium' | 'alt' {
  const dearer = third.price >= best.price * 1.5;
  const upscale =
    third.styles.includes('premium') ||
    third.styles.includes('luxury') ||
    third.category === 'crystal' ||
    third.category === 'vip';
  return dearer && upscale ? 'premium' : 'alt';
}

/** Everything that scored, for the "see more options" drawer on the results screen. */
export function alsoConsider(answers: Answers, excludeIds: string[]): Product[] {
  return rankViable(answers)
    .filter((r) => !excludeIds.includes(r.product.id))
    .slice(0, 6)
    .map((r) => r.product);
}
