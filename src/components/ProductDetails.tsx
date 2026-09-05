import { useStore } from '../lib/store';
import { formatKD } from '../data/products';
import type { Product } from '../lib/types';
import ProductArt from './ProductArt';
import PersonalizationPreview from './PersonalizationPreview';
import { Modal, Notice, PriceTag } from './ui';

const RIBBON_SWATCH: Record<string, string> = {
  blue: '#1F4E8C',
  black: '#22201D',
  red: '#A32A2A',
  white: '#EFEDE7',
  orange: '#CE6C1E',
  green: '#1F6B45',
  kuwaitFlag: 'linear-gradient(180deg,#1F6B45 0 33%,#EFEDE7 33% 66%,#A32A2A 66% 100%)',
};

const METAL_SWATCH: Record<string, string> = {
  gold: 'linear-gradient(135deg,#F3DEA8,#C79A45 55%,#8A6425)',
  silver: 'linear-gradient(135deg,#F1F0EC,#C3C2BD 55%,#8E8D88)',
  bronze: 'linear-gradient(135deg,#EFCFA9,#BE8354 55%,#8A5A32)',
};

export default function ProductDetails({
  product,
  open,
  onClose,
  onSelect,
}: {
  product: Product | null;
  open: boolean;
  onClose: () => void;
  onSelect: (p: Product) => void;
}) {
  const { t, n, lang, personalization, setPersonalization } = useStore();

  if (!product) return null;

  const qty = Math.max(1, personalization.quantity || 1);
  const unit = product.priceRange ? product.priceRange.min : product.price;
  const total = unit * qty;

  return (
    <Modal open={open} onClose={onClose} labelledBy="product-title">
      {/* header */}
      <div className="flex items-start gap-3 border-b border-line bg-white px-5 py-4 sm:px-7">
        <div className="min-w-0 flex-1">
          <div className="eyebrow">{t(`category.${product.category}`)}</div>
          <h2
            id="product-title"
            className="mt-1 font-display text-[1.3rem] font-medium leading-snug text-ink sm:text-[1.6rem]"
          >
            {product.name[lang]}
          </h2>
        </div>
        <button
          type="button"
          onClick={onClose}
          aria-label={t('chrome.close')}
          className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full border border-line text-ink-muted transition-colors duration-200 hover:border-gold hover:text-ink"
        >
          <svg viewBox="0 0 20 20" className="h-4 w-4" fill="none" aria-hidden="true">
            <path
              d="M5 5l10 10M15 5L5 15"
              stroke="currentColor"
              strokeWidth="1.6"
              strokeLinecap="round"
            />
          </svg>
        </button>
      </div>

      {/* body */}
      <div className="grid flex-1 gap-0 overflow-y-auto lg:grid-cols-[0.92fr_1.08fr]">
        {/* visual column */}
        <div className="border-b border-line bg-white p-5 sm:p-7 lg:border-b-0 lg:border-e">
          <div
            className="rounded-2xl border border-line p-6"
            style={{
              background: 'radial-gradient(110% 80% at 50% 0%, #FFFFFF, #F5EFE4)',
            }}
          >
            <ProductArt
              art={product.art}
              tone={personalization.metal ?? product.tone}
              variant={product.id}
              ribbon={personalization.ribbon}
              className="mx-auto h-56 w-full transition-all duration-500 ease-premium sm:h-72"
            />
          </div>

          <div className="mt-5">
            <PriceTag product={product} size="lg" />
          </div>

          <p className="mt-3 text-[0.9rem] leading-relaxed text-ink-soft">
            {product.description[lang]}
          </p>

          <div className="mt-4 flex flex-wrap gap-2">
            {product.tags.map((tag) => (
              <span
                key={tag.en}
                className="rounded-full border border-line bg-canvas px-3 py-1 text-[0.72rem] font-medium text-ink-muted"
              >
                {tag[lang]}
              </span>
            ))}
          </div>
        </div>

        {/* options column */}
        <div className="bg-canvas p-5 sm:p-7">
          {product.hasVerifiedVariants ? (
            <>
              {product.metalOptions?.length ? (
                <fieldset className="mb-6">
                  <legend className="eyebrow mb-3">{t('product.metal')}</legend>
                  <div className="flex flex-wrap gap-2">
                    {product.metalOptions.map((m) => (
                      <button
                        key={m}
                        type="button"
                        onClick={() => setPersonalization({ metal: m })}
                        aria-pressed={personalization.metal === m}
                        className={`flex min-h-[44px] items-center gap-2 rounded-full border px-3.5 text-[0.82rem] font-medium transition-all duration-300 ${
                          personalization.metal === m
                            ? 'border-gold bg-white shadow-card'
                            : 'border-line bg-white/70 hover:border-gold/50'
                        }`}
                      >
                        <span
                          className="h-4 w-4 rounded-full ring-1 ring-black/10"
                          style={{ background: METAL_SWATCH[m] }}
                          aria-hidden="true"
                        />
                        {t(`metal.${m}`)}
                      </button>
                    ))}
                  </div>
                </fieldset>
              ) : null}

              {product.ribbonOptions?.length ? (
                <fieldset className="mb-6">
                  <legend className="eyebrow mb-3">{t('product.ribbon')}</legend>
                  <div className="flex flex-wrap gap-2">
                    {product.ribbonOptions.map((r) => (
                      <button
                        key={r}
                        type="button"
                        onClick={() => setPersonalization({ ribbon: r })}
                        aria-pressed={personalization.ribbon === r}
                        className={`flex min-h-[44px] items-center gap-2 rounded-full border px-3.5 text-[0.82rem] font-medium transition-all duration-300 ${
                          personalization.ribbon === r
                            ? 'border-gold bg-white shadow-card'
                            : 'border-line bg-white/70 hover:border-gold/50'
                        }`}
                      >
                        <span
                          className="h-4 w-4 rounded-sm ring-1 ring-black/10"
                          style={{ background: RIBBON_SWATCH[r] }}
                          aria-hidden="true"
                        />
                        {t(`ribbon.${r}`)}
                      </button>
                    ))}
                  </div>
                </fieldset>
              ) : null}
            </>
          ) : (
            product.customizable && (
              <div className="mb-6">
                <div className="eyebrow mb-3">{t('product.options')}</div>
                <Notice tone="neutral">{t('product.optionsUnverified')}</Notice>
              </div>
            )
          )}

          <fieldset className="mb-6">
            <legend className="eyebrow mb-3">{t('product.customization')}</legend>
            {product.supportsEngraving ? (
              <>
                <label
                  htmlFor="engraving"
                  className="mb-1.5 block text-[0.82rem] font-medium text-ink-soft"
                >
                  {t('product.engravingText')}
                </label>
                <input
                  id="engraving"
                  className="field"
                  maxLength={48}
                  placeholder={t('product.engravingPlaceholder')}
                  value={personalization.engravingText}
                  onChange={(e) => setPersonalization({ engravingText: e.target.value })}
                />
                <p className="mt-2 text-[0.76rem] leading-relaxed text-ink-muted">
                  {t('product.supportsBoth')}
                </p>
              </>
            ) : (
              <Notice tone="neutral">{t('product.notCustomizable')}</Notice>
            )}
          </fieldset>

          <fieldset className="mb-6">
            <legend className="eyebrow mb-3">{t('product.quantity')}</legend>
            <div className="flex items-center gap-3">
              <QtyButton
                label="−"
                onClick={() => setPersonalization({ quantity: Math.max(1, qty - 1) })}
              />
              <input
                inputMode="numeric"
                aria-label={t('product.quantity')}
                className="field w-24 text-center"
                value={qty}
                onChange={(e) => {
                  const v = Number(e.target.value.replace(/[^\d]/g, ''));
                  setPersonalization({ quantity: Math.min(100000, Math.max(1, v || 1)) });
                }}
              />
              <QtyButton
                label="+"
                onClick={() => setPersonalization({ quantity: Math.min(100000, qty + 1) })}
              />
            </div>
          </fieldset>

          {product.customizable && (
            <PersonalizationPreview product={product} personalization={personalization} />
          )}

          <div className="mt-6 rounded-2xl border border-line bg-white p-4">
            <div className="flex items-baseline justify-between gap-3">
              <span className="text-[0.85rem] font-medium text-ink-soft">
                {t('product.estTotal')}
              </span>
              <span className="font-display text-[1.35rem] font-semibold text-ink">
                <span className="ltr">{n(formatKD(total))}</span>{' '}
                <span className="text-[0.8rem] font-medium text-ink-muted">{t('chrome.kd')}</span>
              </span>
            </div>
            <p className="mt-2 text-[0.74rem] leading-relaxed text-ink-muted">
              {t('product.estNote')}
            </p>
          </div>
        </div>
      </div>

      {/* footer */}
      <div className="border-t border-line bg-white px-5 py-3 sm:px-7">
        <button
          type="button"
          onClick={() => onSelect(product)}
          className="btn-gold w-full sm:w-auto sm:min-w-[240px]"
        >
          {t('product.selectThis')}
        </button>
      </div>
    </Modal>
  );
}

function QtyButton({ label, onClick }: { label: string; onClick: () => void }) {
  return (
    <button
      type="button"
      onClick={onClick}
      aria-label={label === '+' ? 'increase' : 'decrease'}
      className="flex h-12 w-12 items-center justify-center rounded-xl border border-line bg-white text-[1.15rem] text-ink transition-colors duration-200 hover:border-gold hover:bg-gold-wash"
    >
      {label}
    </button>
  );
}
