import { useMemo, useState } from 'react';
import { useStore } from '../lib/store';
import { alsoConsider, recommend } from '../lib/recommend';
import type { Product, Recommendation } from '../lib/types';
import ProductArt from '../components/ProductArt';
import ProductDetails from '../components/ProductDetails';
import { ExpertNudge, Notice, PriceTag, PrototypeFooter, ScreenTitle } from '../components/ui';

const BADGE_STYLE: Record<Recommendation['badge'], string> = {
  best: 'bg-ink text-white',
  value: 'bg-gold-wash text-gold-deep border border-gold/30',
  premium: 'bg-champagne text-gold-deep border border-gold/30',
  alt: 'bg-canvas text-ink-muted border border-line-strong',
};

export default function Recommendations() {
  const { t, n, lang, go, setStep, answers, setSelected, setPersonalization, personalization } =
    useStore();
  const [detail, setDetail] = useState<Product | null>(null);

  const recs = useMemo(() => recommend(answers), [answers]);
  const more = useMemo(
    () => alsoConsider(answers, recs.map((r) => r.product.id)),
    [answers, recs],
  );

  const openDetail = (p: Product) => {
    // Seed the personalisation panel from what the customer already told us.
    setPersonalization({
      metal: p.metalOptions?.[0] ?? null,
      ribbon: p.ribbonOptions?.[0] ?? null,
      quantity: personalization.quantity > 1 ? personalization.quantity : 1,
    });
    setDetail(p);
  };

  const choose = (p: Product) => {
    setSelected(p);
    setDetail(null);
    go('summary');
  };

  /* ---------------------------- empty state ---------------------------- */
  if (!recs.length) {
    return (
      <div className="mx-auto max-w-3xl px-4 py-16 sm:px-6">
        <div className="card animate-fade-up p-8 text-center sm:p-12">
          <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-full border border-gold/40 bg-gold-wash text-[1.3rem]">
            ✦
          </div>
          <h1 className="mt-5 font-display text-[1.6rem] font-medium text-ink sm:text-[2rem]">
            {t('rec.empty.title')}
          </h1>
          <p className="mx-auto mt-3 max-w-lg text-[0.92rem] leading-relaxed text-ink-muted">
            {t('rec.empty.body')}
          </p>
          <div className="mt-7 flex flex-col justify-center gap-3 sm:flex-row">
            <button type="button" onClick={() => go('expert')} className="btn-gold">
              {t('rec.empty.cta')}
            </button>
            <button
              type="button"
              onClick={() => {
                setStep(0);
                go('quiz');
              }}
              className="btn-ghost"
            >
              {t('rec.editAnswers')}
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="flex min-h-[100dvh] flex-col">
      <div className="mx-auto w-full max-w-6xl flex-1 px-4 py-10 sm:px-6 lg:px-8 lg:py-14">
        <ScreenTitle
          eyebrow={t('brand.assistant')}
          title={t('rec.title')}
          subtitle={t('rec.subtitle')}
        />

        {answers.timeline === 'urgent' && (
          <div className="mt-6 max-w-2xl">
            <Notice>{t('rec.urgentNote')}</Notice>
          </div>
        )}

        {/* ------------------------- the three cards ------------------------- */}
        <div
          className={`mt-8 grid gap-5 lg:gap-6 ${
            recs.length >= 3
              ? 'lg:grid-cols-3'
              : recs.length === 2
                ? 'max-w-3xl sm:grid-cols-2'
                : 'max-w-sm'
          }`}
        >
          {recs.map((rec, i) => (
            <article
              key={rec.product.id}
              className={`group flex animate-fade-up flex-col overflow-hidden rounded-2xl border bg-white transition-all duration-500 ease-premium hover:-translate-y-1 hover:shadow-lift ${
                rec.badge === 'best' ? 'border-gold shadow-card' : 'border-line shadow-card'
              }`}
              style={{ animationDelay: `${i * 110}ms` }}
            >
              <div className="flex items-center justify-between gap-2 px-5 pt-5">
                <span
                  className={`rounded-full px-3 py-1 text-[0.66rem] font-semibold uppercase tracking-[0.12em] ${BADGE_STYLE[rec.badge]}`}
                >
                  {t(`rec.badge.${rec.badge}`)}
                </span>
                <span className="text-[0.72rem] text-ink-muted">
                  {t(`category.${rec.product.category}`)}
                </span>
              </div>

              <div
                className="mx-5 mt-4 rounded-xl border border-line/70 p-4"
                style={{ background: 'radial-gradient(110% 80% at 50% 0%, #FFFFFF, #F6F0E5)' }}
              >
                <ProductArt
                  art={rec.product.art}
                  tone={rec.product.tone}
                  variant={rec.product.id}
                  className="mx-auto h-44 w-full transition-transform duration-500 ease-premium group-hover:scale-[1.04] sm:h-52"
                />
              </div>

              <div className="flex flex-1 flex-col p-5">
                <h2 className="font-display text-[1.18rem] font-semibold leading-snug text-ink">
                  {rec.product.name[lang]}
                </h2>

                <div className="mt-1.5 flex flex-wrap items-baseline gap-x-2">
                  <PriceTag product={rec.product} />
                  <span className="text-[0.78rem] text-ink-muted">{t('chrome.perItem')}</span>
                </div>

                <p className="mt-3 text-[0.86rem] leading-relaxed text-ink-muted">
                  {rec.product.description[lang]}
                </p>

                <div className="mt-4 rounded-xl border border-line bg-canvas p-4">
                  <div className="eyebrow mb-2.5">{t('rec.why')}</div>
                  <ul className="space-y-1.5">
                    {rec.reasons.slice(0, 4).map((reason) => (
                      <li
                        key={reason.key + (reason.value ?? '')}
                        className="flex items-start gap-2 text-[0.82rem] leading-relaxed text-ink-soft"
                      >
                        <svg
                          viewBox="0 0 20 20"
                          className="mt-[3px] h-3.5 w-3.5 shrink-0 text-gold"
                          fill="none"
                          aria-hidden="true"
                        >
                          <path
                            d="M4 10.5 L8 14.5 L16 5.5"
                            stroke="currentColor"
                            strokeWidth="2.2"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                          />
                        </svg>
                        <span>
                          {t(reason.key, {
                            v: reason.value
                              ? reason.value.includes('.')
                                ? t(reason.value)
                                : n(reason.value)
                              : '',
                          })}
                        </span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="mt-5 flex flex-col gap-2 sm:flex-row lg:flex-col xl:flex-row">
                  <button
                    type="button"
                    onClick={() => openDetail(rec.product)}
                    className="btn-ghost flex-1"
                  >
                    {t('rec.viewDetails')}
                  </button>
                  <button
                    type="button"
                    onClick={() => {
                      setPersonalization({
                        metal: rec.product.metalOptions?.[0] ?? null,
                        ribbon: rec.product.ribbonOptions?.[0] ?? null,
                      });
                      choose(rec.product);
                    }}
                    className={`flex-1 ${rec.badge === 'best' ? 'btn-gold' : 'btn-primary'}`}
                  >
                    {t('rec.choose')}
                  </button>
                </div>
              </div>
            </article>
          ))}
        </div>

        {/* -------------------------- also consider -------------------------- */}
        {more.length > 0 && (
          <section className="mt-14">
            <h2 className="font-display text-[1.3rem] font-medium text-ink sm:text-[1.5rem]">
              {t('rec.alsoTitle')}
            </h2>
            <div className="mt-5 grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-6 lg:gap-4">
              {more.map((p) => (
                <button
                  key={p.id}
                  type="button"
                  onClick={() => openDetail(p)}
                  className="group rounded-xl border border-line bg-white p-3 text-start transition-all duration-400 ease-premium hover:-translate-y-1 hover:border-gold/50 hover:shadow-card"
                >
                  <ProductArt
                    art={p.art}
                    tone={p.tone}
                    variant={p.id}
                    className="mx-auto h-24 w-full transition-transform duration-500 group-hover:scale-105"
                  />
                  <span className="mt-2 block text-[0.76rem] font-semibold leading-snug text-ink">
                    {p.name[lang]}
                  </span>
                  <span className="mt-0.5 block">
                    <PriceTag product={p} size="sm" showSaleBadge={false} />
                  </span>
                </button>
              ))}
            </div>
          </section>
        )}

        <div className="mt-10 flex justify-center">
          <button
            type="button"
            onClick={() => {
              setStep(0);
              go('quiz');
            }}
            className="btn-quiet"
          >
            {t('rec.editAnswers')}
          </button>
        </div>

        <ExpertNudge />
      </div>

      <PrototypeFooter />

      <ProductDetails
        product={detail}
        open={!!detail}
        onClose={() => setDetail(null)}
        onSelect={choose}
      />
    </div>
  );
}
