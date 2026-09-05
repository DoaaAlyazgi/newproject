/**
 * Domain types for the Global Medal Smart Awards & Gifts Assistant prototype.
 *
 * The shapes here intentionally mirror what a real catalogue API would return,
 * so the local dataset in `src/data/products.ts` can later be swapped for a
 * live product feed without touching the recommendation engine or the UI.
 */

export type Lang = 'en' | 'ar';

/** Bilingual string. Every customer-facing value in the dataset carries both. */
export interface Bi {
  en: string;
  ar: string;
}

export type OccasionId =
  | 'sports'
  | 'corporate'
  | 'academic'
  | 'gift'
  | 'vip'
  | 'ceremony'
  | 'personal';

export type RecipientId =
  | 'employees'
  | 'athletes'
  | 'students'
  | 'executives'
  | 'teams'
  | 'guests'
  | 'clients'
  | 'other';

export type QuantityBandId = '1-10' | '11-25' | '26-50' | '51-100' | '100+';

export type BudgetId = 'under5' | '5-10' | '10-20' | '20-50' | '50+' | 'unsure';

export type StyleId =
  | 'classic'
  | 'modern'
  | 'premium'
  | 'luxury'
  | 'minimal'
  | 'sporty'
  | 'unsure';

export type CustomizationId =
  | 'engraving'
  | 'logo'
  | 'text'
  | 'design'
  | 'ribbon'
  | 'unsure';

export type TimelineId = 'flexible' | 'weeks' | 'days' | 'urgent';

export type CategoryId =
  | 'medals'
  | 'trophies'
  | 'crystal'
  | 'plaques'
  | 'vip'
  | 'replica'
  | 'bobbleheads';

/** Illustration family used by the ProductArt renderer. */
export type ArtKind =
  | 'medal'
  | 'medal-mini'
  | 'medal-sport'
  | 'cup'
  | 'cup-tall'
  | 'cup-set'
  | 'crystal-cube'
  | 'crystal-star'
  | 'crystal-ball'
  | 'dhow'
  | 'replica-cup'
  | 'replica-mini'
  | 'resin-figure'
  | 'ball-column'
  | 'plaque'
  | 'plaque-shield'
  | 'plaque-round'
  | 'plaque-box'
  | 'bobblehead';

export type MetalTone = 'gold' | 'silver' | 'bronze' | 'crystal' | 'wood' | 'resin';

export interface Product {
  id: string;
  name: Bi;
  category: CategoryId;
  /** Single price in KD, or the low end of `priceRange`. */
  price: number;
  /** Present when the catalogue lists the item as a range (size/variant based). */
  priceRange?: { min: number; max: number };
  /** Was-price, present only where the catalogue shows the item reduced. */
  compareAt?: number;
  description: Bi;
  occasion: OccasionId[];
  recipients: RecipientId[];
  styles: StyleId[];
  customizable: boolean;
  supportsLogo: boolean;
  supportsEngraving: boolean;
  /** True only where the catalogue lists selectable colour/ribbon variants. */
  hasVerifiedVariants: boolean;
  metalOptions?: MetalTone[];
  ribbonOptions?: string[];
  bulkSuitable: boolean;
  art: ArtKind;
  tone: MetalTone;
  tags: Bi[];
}

/** All answers collected by the guided flow. */
export interface Answers {
  occasion: OccasionId | null;
  recipients: RecipientId[];
  quantityBand: QuantityBandId | null;
  quantityExact: number | null;
  budget: BudgetId | null;
  style: StyleId | null;
  customization: CustomizationId[];
  timeline: TimelineId | null;
}

export type RecommendationBadge = 'best' | 'value' | 'premium' | 'alt';

export interface MatchReason {
  /** i18n key resolved by the UI layer. */
  key: string;
  /** Optional interpolation value (a price, a quantity, a style name). */
  value?: string;
}

export interface Recommendation {
  product: Product;
  score: number;
  badge: RecommendationBadge;
  reasons: MatchReason[];
}

/** Personalisation chosen on the product detail screen. */
export interface Personalization {
  metal: MetalTone | null;
  ribbon: string | null;
  engravingText: string;
  logoName: string | null;
  quantity: number;
}

export interface ContactDetails {
  name: string;
  organization: string;
  phone: string;
  email: string;
  preferred: 'whatsapp' | 'phone' | 'email';
  notes: string;
}

export type Screen =
  | 'landing'
  | 'quiz'
  | 'thinking'
  | 'recommendations'
  | 'summary'
  | 'contact'
  | 'whatsapp'
  | 'success'
  | 'expert'
  | 'catalog';
