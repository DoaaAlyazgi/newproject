import { useStore } from '../lib/store';
import { formatKD } from '../data/products';
import { resolvedQuantity } from '../lib/recommend';
import ProductArt from '../components/ProductArt';
import { ExpertNudge, PrototypeFooter, ScreenTitle } from '../components/ui';

export default function Summary() {
  const { t, n, lang, go, setStep, answers, selected, personalization, logoName } = useStore();

  const qty = personalization.quantity > 1 ? personalization.quantity : resolvedQuantity(answers);

  const customList = answers.customization.length
    ? answers.customization.map((c) => t(`custom.${c}`)).join(lang === 'ar' ? '، ' : ' · ')
    : t('summary.none');

  const rows: { label: string; value: string }[] = [
    {
      label: t('summary.occasion'),
      value: answers.occasion ? t(`occasion.${answers.occasion}.title`) : t('summary.none'),
    },
    {
      label: t('summary.recipients'),
      value: answers.recipients.length
        ? answers.recipients.map((r) => t(`recipient.${r}`)).join(lang === 'ar' ? '، ' : ' · ')
        : t('summary.none'),
    },
    { label: t('summary.quantity'), value: n(qty) },
    {
      label: t('summary.budget'),
      value: answers.budget ? t(`budget.${answers.budget}`) : t('summary.none'),
    },
    {
      label: t('summary.style'),
      value: answers.style ? t(`style.${answers.style}`) : t('summary.none'),
    },
    { label: t('summary.customization'), value: customList },
    {
      label: t('summary.timeline'),
      value: answers.timeline ? t(`timeline.${answers.timeline}`) : t('summary.none'),
    },
  ];

  if (personalization.engravingText.trim()) {
    rows.push({ label: t('summary.engraving'), value: personalization.engravingText });
  }
  if (logoName) {
    rows.push({ label: t('custom.logo'), value: logoName });
  }

  return (
    <div className="flex min-h-[100dvh] flex-col">
      <div className="mx-auto w-full max-w-4xl flex-1 px-4 py-10 sm:px-6 lg:py-14">
        <ScreenTitle title={t('summary.title')} subtitle={t('summary.subtitle')} />

        <div className="mt-8 grid gap-5 lg:grid-cols-[1fr_0.85fr]">
          {/* answers */}
          <div className="card animate-fade-up overflow-hidden">
            <dl className="divide-y divide-line">
              {rows.map((row) => (
                <div
                  key={row.label}
                  className="flex flex-col gap-1 px-5 py-4 sm:flex-row sm:items-baseline sm:gap-6 sm:px-6"
                >
                  <dt className="w-40 shrink-0 text-[0.78rem] font-semibold uppercase tracking-[0.08em] text-ink-muted">
                    {row.label}
                  </dt>
                  <dd className="text-[0.95rem] font-medium leading-relaxed text-ink">
                    {row.value}
                  </dd>
                </div>
              ))}
            </dl>
          </div>

          {/* selected product */}
          <div
            className="card animate-fade-up p-5 sm:p-6"
            style={{ animationDelay: '110ms' }}
          >
            <div className="eyebrow mb-3">{t('summary.product')}</div>
            {selected ? (
              <>
                <div
                  className="rounded-xl border border-line/70 p-4"
                  style={{ background: 'radial-gradient(110% 80% at 50% 0%, #FFFFFF, #F6F0E5)' }}
                >
                  <ProductArt
                    art={selected.art}
                    tone={personalization.metal ?? selected.tone}
                    variant={selected.id}
                    ribbon={personalization.ribbon}
                    className="mx-auto h-40 w-full"
                  />
                </div>
                <h2 className="mt-4 font-display text-[1.15rem] font-semibold leading-snug text-ink">
                  {selected.name[lang]}
                </h2>
                <div className="mt-1 text-[0.85rem] text-ink-muted">
                  {t(`category.${selected.category}`)}
                </div>
                <div className="mt-3 font-display text-[1.3rem] font-semibold text-gold-deep">
                  <span className="ltr">
                    {selected.priceRange
                      ? `${n(formatKD(selected.priceRange.min))}–${n(formatKD(selected.priceRange.max))}`
                      : n(formatKD(selected.price))}
                  </span>{' '}
                  <span className="text-[0.78rem] font-medium text-ink-muted">
                    {t('chrome.kd')} · {t('chrome.perItem')}
                  </span>
                </div>

                {(personalization.metal || personalization.ribbon) && (
                  <div className="mt-4 flex flex-wrap gap-2">
                    {personalization.metal && (
                      <span className="rounded-full border border-line bg-canvas px-3 py-1 text-[0.74rem] text-ink-muted">
                        {t('product.metal')}: {t(`metal.${personalization.metal}`)}
                      </span>
                    )}
                    {personalization.ribbon && (
                      <span className="rounded-full border border-line bg-canvas px-3 py-1 text-[0.74rem] text-ink-muted">
                        {t('product.ribbon')}: {t(`ribbon.${personalization.ribbon}`)}
                      </span>
                    )}
                  </div>
                )}
              </>
            ) : (
              <p className="text-[0.9rem] text-ink-muted">{t('summary.none')}</p>
            )}
          </div>
        </div>

        <div className="mt-8 flex flex-col gap-3 sm:flex-row">
          <button
            type="button"
            onClick={() => {
              setStep(0);
              go('quiz');
            }}
            className="btn-ghost"
          >
            {t('summary.edit')}
          </button>
          <button type="button" onClick={() => go('contact')} className="btn-primary sm:min-w-[200px]">
            {t('chrome.continue')}
          </button>
        </div>

        <ExpertNudge />
      </div>

      <PrototypeFooter />
    </div>
  );
}
