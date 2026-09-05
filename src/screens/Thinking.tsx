import { useEffect, useState } from 'react';
import { useStore } from '../lib/store';

const STEP_KEYS = ['thinking.step1', 'thinking.step2', 'thinking.step3'];

export default function Thinking() {
  const { t, go } = useStore();
  const [stage, setStage] = useState(0);

  useEffect(() => {
    const timers = [
      window.setTimeout(() => setStage(1), 620),
      window.setTimeout(() => setStage(2), 1240),
      window.setTimeout(() => setStage(3), 1860),
      window.setTimeout(() => go('recommendations'), 2280),
    ];
    return () => timers.forEach(window.clearTimeout);
  }, [go]);

  return (
    <div className="flex min-h-[calc(100dvh-64px)] flex-col items-center justify-center px-6 py-16">
      <div className="relative h-20 w-20" aria-hidden="true">
        <span className="absolute inset-0 rounded-full border border-line" />
        <span className="absolute inset-0 animate-ring-spin rounded-full border-2 border-transparent border-t-gold" />
        <span className="absolute inset-3 rounded-full bg-gold-wash" />
        <span className="absolute inset-0 flex items-center justify-center font-display text-[1.2rem] text-gold-deep">
          ✦
        </span>
      </div>

      <h1
        className="mt-8 text-center font-display text-[1.5rem] font-medium text-ink sm:text-[1.9rem]"
        role="status"
        aria-live="polite"
      >
        {t('thinking.title')}
      </h1>

      <ul className="mt-8 w-full max-w-sm space-y-3">
        {STEP_KEYS.map((key, i) => (
          <li
            key={key}
            className={`flex items-center gap-3 rounded-xl border px-4 py-3 text-[0.86rem] transition-all duration-500 ease-premium ${
              stage > i
                ? 'border-gold/30 bg-gold-wash text-ink'
                : 'border-line bg-white text-ink-muted opacity-60'
            }`}
          >
            <span
              className={`flex h-5 w-5 shrink-0 items-center justify-center rounded-full border transition-colors duration-300 ${
                stage > i ? 'border-gold bg-gold text-white' : 'border-line-strong text-transparent'
              }`}
              aria-hidden="true"
            >
              <svg viewBox="0 0 20 20" className="h-3 w-3" fill="none">
                <path
                  d="M4 10.5 L8 14.5 L16 5.5"
                  stroke="currentColor"
                  strokeWidth="2.6"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </span>
            {t(key)}
          </li>
        ))}
      </ul>
    </div>
  );
}
