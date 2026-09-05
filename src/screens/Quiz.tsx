import { useState } from 'react';
import { useStore } from '../lib/store';
import { Chip, ExpertNudge, Notice, OptionCard, ProgressBar } from '../components/ui';
import type {
  BudgetId,
  CustomizationId,
  OccasionId,
  QuantityBandId,
  RecipientId,
  StyleId,
  TimelineId,
} from '../lib/types';

const TOTAL_STEPS = 6;

const OCCASIONS: { id: OccasionId; icon: string }[] = [
  { id: 'sports', icon: '🏆' },
  { id: 'corporate', icon: '🏢' },
  { id: 'academic', icon: '🎓' },
  { id: 'gift', icon: '🎁' },
  { id: 'vip', icon: '⭐' },
  { id: 'ceremony', icon: '🎉' },
  { id: 'personal', icon: '✨' },
];

const RECIPIENTS: RecipientId[] = [
  'employees',
  'athletes',
  'students',
  'executives',
  'teams',
  'guests',
  'clients',
  'other',
];

const QUANTITIES: QuantityBandId[] = ['1-10', '11-25', '26-50', '51-100', '100+'];
const BUDGETS: BudgetId[] = ['under5', '5-10', '10-20', '20-50', '50+', 'unsure'];
const STYLES: StyleId[] = ['classic', 'modern', 'premium', 'luxury', 'minimal', 'sporty', 'unsure'];

const CUSTOMIZATIONS: { id: CustomizationId; icon: string }[] = [
  { id: 'engraving', icon: '✒️' },
  { id: 'logo', icon: '🏷️' },
  { id: 'text', icon: '🔤' },
  { id: 'design', icon: '🎨' },
  { id: 'ribbon', icon: '🎀' },
  { id: 'unsure', icon: '🤔' },
];

const TIMELINES: TimelineId[] = ['flexible', 'weeks', 'days', 'urgent'];

export default function Quiz() {
  const {
    t,
    n,
    go,
    step,
    setStep,
    answers,
    setAnswers,
    logoName,
    setLogoName,
    setPersonalization,
  } = useStore();
  const [qtyError, setQtyError] = useState(false);
  const [touched, setTouched] = useState(false);

  const qtyNumber = answers.quantityExact ?? 0;

  /* ------------------------------ validation ------------------------------ */
  const canContinue = (() => {
    switch (step) {
      case 0:
        return !!answers.occasion;
      case 1:
        return answers.recipients.length > 0;
      case 2:
        return (!!answers.quantityBand || qtyNumber > 0) && !!answers.budget && !qtyError;
      case 3:
        return !!answers.style;
      case 4:
        return true; // customisation is genuinely optional
      case 5:
        return !!answers.timeline;
      default:
        return false;
    }
  })();

  const next = () => {
    if (!canContinue) {
      setTouched(true);
      return;
    }
    setTouched(false);
    if (step === TOTAL_STEPS - 1) {
      // Carry the quiz answers into the product screen's defaults.
      setPersonalization({
        quantity: qtyNumber || bandMidpoint(answers.quantityBand),
      });
      go('thinking');
      return;
    }
    setStep(step + 1);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const back = () => {
    setTouched(false);
    if (step === 0) {
      go('landing');
      return;
    }
    setStep(step - 1);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const toggleRecipient = (id: RecipientId) =>
    setAnswers({
      recipients: answers.recipients.includes(id)
        ? answers.recipients.filter((r) => r !== id)
        : [...answers.recipients, id],
    });

  const toggleCustom = (id: CustomizationId) => {
    // "I'm not sure yet" is exclusive — it cannot coexist with a concrete choice.
    if (id === 'unsure') {
      setAnswers({ customization: answers.customization.includes('unsure') ? [] : ['unsure'] });
      return;
    }
    const without = answers.customization.filter((c) => c !== 'unsure');
    setAnswers({
      customization: without.includes(id) ? without.filter((c) => c !== id) : [...without, id],
    });
  };

  const onQuantityInput = (raw: string) => {
    if (raw === '') {
      setAnswers({ quantityExact: null });
      setQtyError(false);
      return;
    }
    const value = Number(raw.replace(/[^\d]/g, ''));
    if (!Number.isFinite(value) || value < 1 || value > 100000) {
      setAnswers({ quantityExact: value || null });
      setQtyError(true);
      return;
    }
    setQtyError(false);
    setAnswers({ quantityExact: value, quantityBand: bandFor(value) });
  };

  const effectiveQty = qtyNumber || bandMidpoint(answers.quantityBand);

  return (
    <div className="flex min-h-[100dvh] flex-col">
      <div className="mx-auto w-full max-w-3xl flex-1 px-4 pb-40 pt-8 sm:px-6 sm:pb-32 lg:pt-12">
        <ProgressBar current={step} total={TOTAL_STEPS} />

        <div key={step} className="mt-8 animate-fade-up">
          {/* --------------------------- 1 · occasion --------------------------- */}
          {step === 0 && (
            <Section title={t('q.occasion.title')} hint={t('q.occasion.hint')}>
              <div className="grid gap-3 sm:grid-cols-2">
                {OCCASIONS.map((o) => (
                  <OptionCard
                    key={o.id}
                    icon={o.icon}
                    title={t(`occasion.${o.id}.title`)}
                    body={t(`occasion.${o.id}.body`)}
                    selected={answers.occasion === o.id}
                    onClick={() => setAnswers({ occasion: o.id })}
                  />
                ))}
              </div>
            </Section>
          )}

          {/* -------------------------- 2 · recipients -------------------------- */}
          {step === 1 && (
            <Section title={t('q.recipients.title')} hint={t('q.recipients.hint')}>
              <div className="flex flex-wrap gap-2.5">
                {RECIPIENTS.map((r) => (
                  <Chip
                    key={r}
                    label={t(`recipient.${r}`)}
                    selected={answers.recipients.includes(r)}
                    onClick={() => toggleRecipient(r)}
                  />
                ))}
              </div>
            </Section>
          )}

          {/* ----------------------- 3 · quantity + budget ---------------------- */}
          {step === 2 && (
            <Section title={t('q.scale.title')} hint={t('q.scale.hint')}>
              <fieldset>
                <legend className="eyebrow mb-3">{t('q.quantity.label')}</legend>
                <div className="flex flex-wrap gap-2.5">
                  {QUANTITIES.map((q) => (
                    <Chip
                      key={q}
                      label={t(`qty.${q}`)}
                      selected={answers.quantityBand === q && !answers.quantityExact}
                      onClick={() => setAnswers({ quantityBand: q, quantityExact: null })}
                    />
                  ))}
                </div>

                <div className="mt-4 max-w-xs">
                  <label
                    htmlFor="qty-exact"
                    className="mb-1.5 block text-[0.8rem] font-medium text-ink-muted"
                  >
                    {t('q.quantity.exact')}
                  </label>
                  <input
                    id="qty-exact"
                    inputMode="numeric"
                    className="field"
                    placeholder={t('q.quantity.placeholder')}
                    value={answers.quantityExact ?? ''}
                    onChange={(e) => onQuantityInput(e.target.value)}
                    aria-invalid={qtyError}
                  />
                  {qtyError && (
                    <p className="mt-2 text-[0.8rem] text-[#A32A2A]">{t('q.quantity.invalid')}</p>
                  )}
                </div>

                {!qtyError && effectiveQty >= 50 && effectiveQty <= 1000 && (
                  <div className="mt-4">
                    <Notice>{t('q.quantity.bulkNote')}</Notice>
                  </div>
                )}
                {!qtyError && effectiveQty > 1000 && (
                  <div className="mt-4">
                    <Notice>{t('q.quantity.hugeNote')}</Notice>
                  </div>
                )}
              </fieldset>

              <fieldset className="mt-9 border-t border-line pt-8">
                <legend className="eyebrow mb-3">{t('q.budget.label')}</legend>
                <div className="grid gap-3 sm:grid-cols-3">
                  {BUDGETS.map((b) => (
                    <OptionCard
                      key={b}
                      compact
                      title={t(`budget.${b}`)}
                      selected={answers.budget === b}
                      onClick={() => setAnswers({ budget: b })}
                    />
                  ))}
                </div>
              </fieldset>
            </Section>
          )}

          {/* ----------------------------- 4 · style ---------------------------- */}
          {step === 3 && (
            <Section title={t('q.style.title')} hint={t('q.style.hint')}>
              <div className="grid gap-3 sm:grid-cols-2">
                {STYLES.map((s) => (
                  <OptionCard
                    key={s}
                    title={t(`style.${s}`)}
                    body={t(`style.${s}.body`)}
                    selected={answers.style === s}
                    onClick={() => setAnswers({ style: s })}
                  />
                ))}
              </div>
            </Section>
          )}

          {/* -------------------------- 5 · customisation ------------------------ */}
          {step === 4 && (
            <Section title={t('q.custom.title')} hint={t('q.custom.hint')}>
              <div className="grid gap-3 sm:grid-cols-2">
                {CUSTOMIZATIONS.map((c) => (
                  <OptionCard
                    key={c.id}
                    multi
                    icon={c.icon}
                    title={t(`custom.${c.id}`)}
                    selected={answers.customization.includes(c.id)}
                    onClick={() => toggleCustom(c.id)}
                    compact
                  />
                ))}
              </div>

              <div className="mt-6">
                <LogoUpload value={logoName} onChange={setLogoName} />
              </div>
            </Section>
          )}

          {/* ---------------------------- 6 · timeline --------------------------- */}
          {step === 5 && (
            <Section title={t('q.timeline.title')} hint={t('q.timeline.hint')}>
              <div className="grid gap-3 sm:grid-cols-2">
                {TIMELINES.map((tl) => (
                  <OptionCard
                    key={tl}
                    title={t(`timeline.${tl}`)}
                    body={t(`timeline.${tl}.body`)}
                    selected={answers.timeline === tl}
                    onClick={() => setAnswers({ timeline: tl })}
                  />
                ))}
              </div>
              {answers.timeline === 'urgent' && (
                <div className="mt-5">
                  <Notice>{t('q.timeline.urgentNote')}</Notice>
                </div>
              )}
            </Section>
          )}

          {touched && !canContinue && (
            <p className="mt-5 text-[0.85rem] font-medium text-[#A32A2A]" role="alert">
              {t('chrome.selectToContinue')}
            </p>
          )}

          <ExpertNudge />
        </div>
      </div>

      {/* --------------------- sticky action bar (mobile-first) --------------------- */}
      <div className="fixed inset-x-0 bottom-0 z-30 border-t border-line bg-canvas/95 backdrop-blur-md">
        <div className="mx-auto flex max-w-3xl items-center gap-3 px-4 py-3 sm:px-6">
          <button type="button" onClick={back} className="btn-quiet shrink-0">
            <svg viewBox="0 0 20 20" className="h-4 w-4 rtl:-scale-x-100" fill="none" aria-hidden="true">
              <path
                d="M16 10H4M9 5l-5 5 5 5"
                stroke="currentColor"
                strokeWidth="1.6"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
            {t('chrome.back')}
          </button>

          <span className="hidden text-[0.76rem] text-ink-muted sm:inline">
            {t('chrome.stepOf', { a: n(step + 1), b: n(TOTAL_STEPS) })}
          </span>

          <button
            type="button"
            onClick={next}
            disabled={!canContinue}
            className="btn-primary ms-auto flex-1 px-8 sm:flex-none"
          >
            {t('chrome.continue')}
          </button>
        </div>
      </div>
    </div>
  );
}

/* -------------------------------- helpers -------------------------------- */

function Section({
  title,
  hint,
  children,
}: {
  title: string;
  hint: string;
  children: React.ReactNode;
}) {
  return (
    <div>
      <h1 className="font-display text-[1.75rem] font-medium leading-[1.18] text-ink sm:text-[2.2rem]">
        {title}
      </h1>
      <p className="mt-2.5 text-[0.9rem] leading-relaxed text-ink-muted">{hint}</p>
      <div className="mt-7">{children}</div>
    </div>
  );
}

function bandFor(value: number): QuantityBandId {
  if (value <= 10) return '1-10';
  if (value <= 25) return '11-25';
  if (value <= 50) return '26-50';
  if (value <= 100) return '51-100';
  return '100+';
}

function bandMidpoint(band: QuantityBandId | null): number {
  switch (band) {
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
      return 1;
  }
}

/* ------------------------------ logo upload ------------------------------ */

function LogoUpload({
  value,
  onChange,
}: {
  value: string | null;
  onChange: (name: string | null) => void;
}) {
  const { t } = useStore();
  const [dragging, setDragging] = useState(false);

  // Simulated: the file name is read locally, nothing is uploaded anywhere.
  const accept = (files: FileList | null) => {
    if (files && files[0]) onChange(files[0].name);
  };

  if (value) {
    return (
      <div className="flex items-center gap-3 rounded-2xl border border-gold/40 bg-gold-wash p-4">
        <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-white text-gold-deep">
          <svg viewBox="0 0 20 20" className="h-5 w-5" fill="none" aria-hidden="true">
            <path
              d="M4 10.5 L8 14.5 L16 5.5"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </span>
        <div className="min-w-0 flex-1">
          <div className="text-[0.88rem] font-semibold text-ink">{t('q.custom.uploaded')}</div>
          <div className="truncate text-[0.78rem] text-ink-muted">
            <span className="ltr">{value}</span>
          </div>
        </div>
        <button
          type="button"
          onClick={() => onChange(null)}
          className="shrink-0 text-[0.8rem] font-semibold text-gold-deep underline underline-offset-4 hover:text-ink"
        >
          {t('q.custom.remove')}
        </button>
      </div>
    );
  }

  return (
    <label
      onDragOver={(e) => {
        e.preventDefault();
        setDragging(true);
      }}
      onDragLeave={() => setDragging(false)}
      onDrop={(e) => {
        e.preventDefault();
        setDragging(false);
        accept(e.dataTransfer.files);
      }}
      className={`flex cursor-pointer flex-col items-center justify-center rounded-2xl border border-dashed p-7 text-center transition-all duration-300 ${
        dragging ? 'border-gold bg-gold-wash' : 'border-line-strong bg-white hover:border-gold/60'
      }`}
    >
      <svg viewBox="0 0 24 24" className="h-6 w-6 text-ink-muted" fill="none" aria-hidden="true">
        <path
          d="M12 16V4m0 0L7.5 8.5M12 4l4.5 4.5M4 17v1.5A2.5 2.5 0 0 0 6.5 21h11a2.5 2.5 0 0 0 2.5-2.5V17"
          stroke="currentColor"
          strokeWidth="1.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
      <span className="mt-2.5 text-[0.9rem] font-semibold text-ink">{t('q.custom.upload')}</span>
      <span className="mt-1 text-[0.78rem] text-ink-muted">{t('q.custom.uploadHint')}</span>
      <input
        type="file"
        accept="image/*"
        className="sr-only"
        onChange={(e) => accept(e.target.files)}
      />
    </label>
  );
}
