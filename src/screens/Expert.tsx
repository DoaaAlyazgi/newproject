import { useStore } from '../lib/store';
import { PrototypeFooter, ScreenTitle } from '../components/ui';

export default function Expert() {
  const { t, go, answers } = useStore();

  const back = () => go(answers.occasion ? 'recommendations' : 'landing');

  return (
    <div className="flex min-h-[100dvh] flex-col">
      <div className="mx-auto w-full max-w-2xl flex-1 px-4 py-12 sm:px-6 lg:py-16">
        <ScreenTitle eyebrow={t('chrome.notSure')} title={t('expert.title')} />

        <p className="mt-4 text-[0.98rem] leading-relaxed text-ink-soft">{t('expert.body')}</p>

        <ul className="mt-7 space-y-3">
          {['expert.point1', 'expert.point2', 'expert.point3'].map((key) => (
            <li
              key={key}
              className="flex items-start gap-3 rounded-xl border border-line bg-white px-4 py-3.5 text-[0.9rem] leading-relaxed text-ink"
            >
              <span
                className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-gold"
                aria-hidden="true"
              />
              {t(key)}
            </li>
          ))}
        </ul>

        <div className="mt-8 flex flex-col gap-3 sm:flex-row">
          <button type="button" onClick={() => go('contact')} className="btn-gold sm:min-w-[230px]">
            {t('expert.cta')}
          </button>
          <button type="button" onClick={back} className="btn-ghost">
            {t('expert.back')}
          </button>
        </div>

        <p className="mt-5 text-[0.78rem] text-ink-muted">{t('expert.disclaimer')}</p>
      </div>

      <PrototypeFooter />
    </div>
  );
}
