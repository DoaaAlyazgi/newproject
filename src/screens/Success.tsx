import { useStore } from '../lib/store';
import { PrototypeFooter } from '../components/ui';

const VALUE_KEYS = [
  'success.v1',
  'success.v2',
  'success.v3',
  'success.v4',
  'success.v5',
  'success.v6',
];

export default function Success() {
  const { t, go, reset } = useStore();

  return (
    <div className="flex min-h-[100dvh] flex-col">
      <div className="mx-auto w-full max-w-3xl flex-1 px-4 py-14 sm:px-6 lg:py-20">
        <div className="text-center">
          <div className="mx-auto flex h-20 w-20 items-center justify-center rounded-full border border-gold/40 bg-gold-wash">
            <svg viewBox="0 0 48 48" className="h-9 w-9" fill="none" aria-hidden="true">
              <path
                d="M12 25 L21 34 L37 15"
                stroke="#B0863C"
                strokeWidth="3"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeDasharray="60"
                className="animate-draw-check"
              />
            </svg>
          </div>

          <h1 className="mt-7 animate-fade-up font-display text-[2rem] font-medium leading-tight text-ink sm:text-[2.6rem]">
            {t('success.title')}
          </h1>
          <p className="mx-auto mt-4 max-w-xl animate-fade-up text-[0.98rem] leading-relaxed text-ink-soft">
            {t('success.body')}
          </p>

          <div className="mt-8 flex flex-col justify-center gap-3 sm:flex-row">
            <button type="button" onClick={reset} className="btn-primary sm:min-w-[190px]">
              {t('success.restart')}
            </button>
            <button type="button" onClick={() => go('catalog')} className="btn-ghost">
              {t('success.browse')}
            </button>
          </div>

          <p className="mx-auto mt-6 max-w-lg rounded-xl border border-line bg-white px-4 py-3 text-[0.8rem] leading-relaxed text-ink-muted">
            {t('success.prototypeNote')}
          </p>
        </div>

        {/* ------------------------- business value ------------------------- */}
        <section className="mt-14 rounded-2xl border border-line bg-white p-6 sm:p-8">
          <h2 className="font-display text-[1.35rem] font-medium text-ink sm:text-[1.6rem]">
            {t('success.valueTitle')}
          </h2>
          <ul className="mt-5 grid gap-x-8 gap-y-3 sm:grid-cols-2">
            {VALUE_KEYS.map((key) => (
              <li key={key} className="flex items-start gap-2.5 text-[0.88rem] leading-relaxed text-ink-soft">
                <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-gold" aria-hidden="true" />
                {t(key)}
              </li>
            ))}
          </ul>
          <p className="mt-6 border-t border-line pt-4 text-[0.76rem] text-ink-muted">
            {t('success.valueNote')}
          </p>
        </section>
      </div>

      <PrototypeFooter />
    </div>
  );
}
