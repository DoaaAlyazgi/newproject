import { useStore } from '../lib/store';
import { products } from '../data/products';
import ProductArt from '../components/ProductArt';
import { PrototypeFooter } from '../components/ui';

const HERO_PIECES = [
  'gilded-pinnacle-trophy',
  'classic-weave-medal',
  'artisan-frosted-cube-award',
];

const RANGE = [
  { id: 'medals', art: 'medal', tone: 'gold' },
  { id: 'trophies', art: 'cup', tone: 'gold' },
  { id: 'crystal', art: 'crystal-star', tone: 'crystal' },
  { id: 'plaques', art: 'plaque', tone: 'gold' },
  { id: 'replica', art: 'replica-cup', tone: 'gold' },
  { id: 'vip', art: 'dhow', tone: 'gold' },
] as const;

export default function Landing() {
  const { t, n, go, setStep, loadDemo } = useStore();

  const hero = HERO_PIECES.map((id) => products.find((p) => p.id === id)!);

  const start = () => {
    setStep(0);
    go('quiz');
  };

  return (
    <div className="flex min-h-[100dvh] flex-col">
      {/* ------------------------------- hero ------------------------------- */}
      <section className="relative overflow-hidden">
        <div
          className="pointer-events-none absolute inset-0 -z-10"
          style={{
            background:
              'radial-gradient(120% 80% at 50% -10%, #FFFDF8 0%, #F7F1E6 42%, #FAF8F4 100%)',
          }}
          aria-hidden="true"
        />
        <div className="mx-auto grid max-w-6xl items-center gap-10 px-4 pb-14 pt-12 sm:px-6 sm:pt-16 lg:grid-cols-[1.05fr_0.95fr] lg:gap-14 lg:px-8 lg:pb-20 lg:pt-20">
          <div className="animate-fade-up">
            <div className="eyebrow flex items-center gap-3">
              <span className="h-px w-8 bg-gold" aria-hidden="true" />
              {t('landing.eyebrow')}
            </div>

            <h1 className="mt-5 font-display text-[2.4rem] font-medium leading-[1.08] text-ink sm:text-[3.2rem] lg:text-[3.6rem]">
              {t('landing.title')}
            </h1>

            <p className="mt-5 max-w-xl text-[1.02rem] leading-relaxed text-ink-soft">
              {t('landing.subtitle')}
            </p>

            <p className="mt-3 max-w-xl text-[0.88rem] leading-relaxed text-ink-muted">
              {t('landing.support')}
            </p>

            <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:items-center">
              <button type="button" onClick={start} className="btn-primary px-8">
                {t('landing.cta')}
                <Arrow />
              </button>
              <button type="button" onClick={() => go('catalog')} className="btn-ghost">
                {t('landing.ctaSecondary')}
              </button>
            </div>

            <div className="mt-6 flex flex-wrap items-center gap-x-3 gap-y-1 text-[0.8rem] text-ink-muted">
              <button
                type="button"
                onClick={loadDemo}
                className="inline-flex min-h-[40px] items-center gap-2 rounded-full border border-gold/40 bg-white px-4 text-[0.8rem] font-semibold text-gold-deep transition-all duration-300 hover:bg-gold-wash"
              >
                <span className="relative flex h-1.5 w-1.5" aria-hidden="true">
                  <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-gold opacity-60" />
                  <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-gold" />
                </span>
                {t('landing.demoCta')}
              </button>
              <span className="max-w-xs leading-relaxed">{t('landing.demoHint')}</span>
            </div>
          </div>

          {/* hero product trio */}
          <div className="relative">
            <div className="grid grid-cols-3 items-end gap-2 sm:gap-4">
              {hero.map((p, i) => (
                <figure
                  key={p.id}
                  className="group animate-fade-up rounded-2xl border border-line bg-white/80 p-3 shadow-card backdrop-blur-sm transition-all duration-500 ease-premium hover:-translate-y-1.5 hover:shadow-lift sm:p-4"
                  style={{
                    animationDelay: `${120 + i * 110}ms`,
                    marginBottom: i === 1 ? '1.75rem' : 0,
                  }}
                >
                  <ProductArt
                    art={p.art}
                    tone={p.tone}
                    variant={p.id}
                    className="h-32 w-full transition-transform duration-500 ease-premium group-hover:scale-[1.05] sm:h-40 lg:h-48"
                  />
                  <figcaption className="mt-2 text-center">
                    <span className="block truncate text-[0.7rem] font-semibold text-ink sm:text-[0.76rem]">
                      {t(`category.${p.category}`)}
                    </span>
                    <span className="mt-0.5 block text-[0.68rem] text-ink-muted">
                      <span className="ltr">{n(p.price.toFixed(3))}</span> {t('chrome.kd')}
                    </span>
                  </figcaption>
                </figure>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ----------------------------- pillars ----------------------------- */}
      <section className="border-y border-line/70 bg-white">
        <div className="mx-auto grid max-w-6xl gap-px bg-line/70 px-0 sm:grid-cols-3">
          {[1, 2, 3].map((i) => (
            <div key={i} className="bg-white px-6 py-8 sm:px-7">
              <div className="font-display text-[1.1rem] font-semibold text-ink">
                {t(`landing.pillar${i}.title`)}
              </div>
              <p className="mt-2 text-[0.85rem] leading-relaxed text-ink-muted">
                {t(`landing.pillar${i}.body`)}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* ------------------------------ range ------------------------------ */}
      <section className="mx-auto w-full max-w-6xl px-4 py-14 sm:px-6 lg:px-8 lg:py-18">
        <h2 className="font-display text-[1.5rem] font-medium text-ink sm:text-[1.85rem]">
          {t('landing.rangeTitle')}
        </h2>
        <div className="mt-7 grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-6 lg:gap-4">
          {RANGE.map((c) => (
            <button
              key={c.id}
              type="button"
              onClick={() => go('catalog')}
              className="group rounded-2xl border border-line bg-white p-4 text-center transition-all duration-400 ease-premium hover:-translate-y-1 hover:border-gold/50 hover:shadow-card"
            >
              <ProductArt
                art={c.art}
                tone={c.tone}
                className="mx-auto h-24 w-full transition-transform duration-500 ease-premium group-hover:scale-105 sm:h-28"
              />
              <span className="mt-2 block text-[0.82rem] font-semibold text-ink">
                {t(`category.${c.id}`)}
              </span>
            </button>
          ))}
        </div>
      </section>

      {/* ---------------------------- how it works -------------------------- */}
      <section className="border-t border-line/70 bg-white">
        <div className="mx-auto max-w-6xl px-4 py-14 sm:px-6 lg:px-8">
          <h2 className="font-display text-[1.5rem] font-medium text-ink sm:text-[1.85rem]">
            {t('landing.howTitle')}
          </h2>
          <ol className="mt-8 grid gap-6 sm:grid-cols-3 sm:gap-8">
            {[1, 2, 3].map((i) => (
              <li key={i} className="relative ps-12">
                <span
                  className="absolute start-0 top-0 flex h-9 w-9 items-center justify-center rounded-full border border-gold/40 bg-gold-wash font-display text-[0.95rem] font-semibold text-gold-deep"
                  aria-hidden="true"
                >
                  <span className="ltr">{n(i)}</span>
                </span>
                <h3 className="text-[0.98rem] font-semibold text-ink">{t(`landing.how${i}`)}</h3>
                <p className="mt-1.5 text-[0.85rem] leading-relaxed text-ink-muted">
                  {t(`landing.how${i}b`)}
                </p>
              </li>
            ))}
          </ol>

          <div className="mt-10">
            <button type="button" onClick={start} className="btn-gold px-8">
              {t('landing.cta')}
              <Arrow />
            </button>
          </div>

          <p className="mt-10 max-w-3xl border-t border-line pt-6 text-[0.78rem] leading-relaxed text-ink-muted">
            {t('landing.footnote')}
          </p>
        </div>
      </section>

      <PrototypeFooter />
    </div>
  );
}

function Arrow() {
  return (
    <svg viewBox="0 0 20 20" className="h-4 w-4 rtl:-scale-x-100" fill="none" aria-hidden="true">
      <path
        d="M4 10h12M11 5l5 5-5 5"
        stroke="currentColor"
        strokeWidth="1.6"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}
