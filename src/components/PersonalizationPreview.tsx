import { useStore } from '../lib/store';
import type { Personalization, Product } from '../lib/types';
import ProductArt from './ProductArt';

/**
 * Illustrative preview of the customer's personalisation choices. It composes
 * the product silhouette with a logo placeholder and the engraving text on a
 * plate — deliberately simple, and always labelled as illustration only.
 */
export default function PersonalizationPreview({
  product,
  personalization,
}: {
  product: Product;
  personalization: Personalization;
}) {
  const { t, lang } = useStore();
  const { engravingText, logoName, ribbon, metal } = personalization;
  const hasAny = Boolean(engravingText.trim() || logoName);

  const tone = metal ?? product.tone;

  return (
    <section aria-labelledby="preview-heading">
      <div className="mb-3 flex items-baseline justify-between gap-3">
        <h3 id="preview-heading" className="eyebrow">
          {t('product.preview')}
        </h3>
        <span className="text-[0.7rem] text-ink-muted">{t('product.previewDisclaimer')}</span>
      </div>

      <div
        className="relative overflow-hidden rounded-2xl border border-line p-5"
        style={{
          background:
            'radial-gradient(120% 90% at 50% 0%, #FFFFFF 0%, #F7F2E8 55%, #F1EADC 100%)',
        }}
      >
        <div className="flex flex-col items-center gap-4 sm:flex-row sm:items-center sm:justify-center sm:gap-7">
          <ProductArt
            art={product.art}
            tone={tone}
            ribbon={ribbon}
            className="h-40 w-28 shrink-0 drop-shadow-sm transition-all duration-500 ease-premium sm:h-48 sm:w-32"
          />

          <div className="flex w-full max-w-xs flex-col items-center gap-3">
            {logoName ? (
              <div className="flex w-full items-center gap-3 rounded-xl border border-dashed border-gold/50 bg-white/80 px-4 py-3">
                <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-lg bg-ink font-display text-[0.72rem] font-semibold tracking-wider text-gold-light">
                  LOGO
                </div>
                <span className="min-w-0 flex-1 truncate text-[0.74rem] text-ink-muted">
                  <span className="ltr">{logoName}</span>
                </span>
              </div>
            ) : null}

            {engravingText.trim() ? (
              <div
                className="w-full rounded-lg border px-4 py-3 text-center shadow-inset"
                style={{
                  background: 'linear-gradient(160deg, #F3DEA8 0%, #C79A45 55%, #8A6425 100%)',
                  borderColor: '#8A6425',
                }}
              >
                <span
                  className="block break-words font-display text-[0.98rem] font-semibold text-[#3B2A0E]"
                  style={{
                    letterSpacing: lang === 'ar' ? 'normal' : '0.08em',
                    lineHeight: lang === 'ar' ? 1.5 : 1.25,
                  }}
                >
                  {engravingText.toUpperCase()}
                </span>
              </div>
            ) : null}

            {!hasAny && (
              <p className="text-center text-[0.82rem] leading-relaxed text-ink-muted">
                {t('product.previewEmpty')}
              </p>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
