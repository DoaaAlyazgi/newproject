import { useState } from 'react';
import { useStore } from '../lib/store';
import { PrototypeFooter, ScreenTitle } from '../components/ui';
import type { ContactDetails } from '../lib/types';

const PREFERRED: { id: ContactDetails['preferred']; key: string }[] = [
  { id: 'whatsapp', key: 'contact.whatsapp' },
  { id: 'phone', key: 'contact.phoneOpt' },
  { id: 'email', key: 'contact.emailOpt' },
];

export default function Contact() {
  const { t, go, contact, setContact } = useStore();
  const [touched, setTouched] = useState(false);

  const digits = contact.phone.replace(/[^\d]/g, '');
  const errors = {
    name: contact.name.trim().length < 2,
    phone: digits.length < 8,
    email: contact.email.trim() !== '' && !/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(contact.email),
  };
  const hasErrors = errors.name || errors.phone || errors.email;

  const submit = () => {
    setTouched(true);
    if (hasErrors) return;
    go('whatsapp');
  };

  return (
    <div className="flex min-h-[100dvh] flex-col">
      <div className="mx-auto w-full max-w-2xl flex-1 px-4 py-10 sm:px-6 lg:py-14">
        <ScreenTitle title={t('contact.title')} subtitle={t('contact.subtitle')} />

        <form
          className="mt-8 space-y-5"
          noValidate
          onSubmit={(e) => {
            e.preventDefault();
            submit();
          }}
        >
          <Field
            id="c-name"
            label={t('contact.name')}
            value={contact.name}
            onChange={(v) => setContact({ name: v })}
            error={touched && errors.name ? t('contact.err.name') : undefined}
            autoComplete="name"
          />

          <Field
            id="c-org"
            label={t('contact.org')}
            hint={t('contact.optionalNote')}
            value={contact.organization}
            onChange={(v) => setContact({ organization: v })}
            autoComplete="organization"
          />

          <div className="grid gap-5 sm:grid-cols-2">
            <Field
              id="c-phone"
              label={t('contact.phone')}
              value={contact.phone}
              onChange={(v) => setContact({ phone: v })}
              error={touched && errors.phone ? t('contact.err.phone') : undefined}
              inputMode="tel"
              autoComplete="tel"
              ltrValue
            />
            <Field
              id="c-email"
              label={t('contact.email')}
              hint={t('chrome.optional')}
              value={contact.email}
              onChange={(v) => setContact({ email: v })}
              error={touched && errors.email ? t('contact.err.email') : undefined}
              inputMode="email"
              autoComplete="email"
              ltrValue
            />
          </div>

          <fieldset>
            <legend className="mb-2 block text-[0.82rem] font-semibold text-ink">
              {t('contact.preferred')}
            </legend>
            <div className="grid gap-2 sm:grid-cols-3">
              {PREFERRED.map((p) => (
                <button
                  key={p.id}
                  type="button"
                  onClick={() => setContact({ preferred: p.id })}
                  aria-pressed={contact.preferred === p.id}
                  className={`min-h-[48px] rounded-xl border px-4 text-[0.88rem] font-medium transition-all duration-300 ${
                    contact.preferred === p.id
                      ? 'border-gold bg-gold-wash text-gold-deep shadow-card'
                      : 'border-line bg-white text-ink hover:border-gold/50'
                  }`}
                >
                  {t(p.key)}
                </button>
              ))}
            </div>
          </fieldset>

          <div>
            <label htmlFor="c-notes" className="mb-1.5 block text-[0.82rem] font-semibold text-ink">
              {t('contact.notes')}{' '}
              <span className="font-normal text-ink-muted">({t('chrome.optional')})</span>
            </label>
            <textarea
              id="c-notes"
              rows={3}
              className="field resize-none"
              placeholder={t('contact.notesPlaceholder')}
              value={contact.notes}
              onChange={(e) => setContact({ notes: e.target.value })}
            />
          </div>

          <div className="flex flex-col gap-3 pt-2 sm:flex-row">
            <button type="button" onClick={() => go('summary')} className="btn-ghost">
              {t('chrome.back')}
            </button>
            <button type="submit" className="btn-primary sm:min-w-[220px]">
              {t('contact.review')}
            </button>
          </div>
        </form>
      </div>

      <PrototypeFooter />
    </div>
  );
}

function Field({
  id,
  label,
  hint,
  value,
  onChange,
  error,
  inputMode,
  autoComplete,
  ltrValue = false,
}: {
  id: string;
  label: string;
  hint?: string;
  value: string;
  onChange: (v: string) => void;
  error?: string;
  inputMode?: 'tel' | 'email' | 'numeric' | 'text';
  autoComplete?: string;
  ltrValue?: boolean;
}) {
  return (
    <div>
      <label htmlFor={id} className="mb-1.5 block text-[0.82rem] font-semibold text-ink">
        {label}
        {hint && <span className="ms-2 font-normal text-ink-muted">({hint})</span>}
      </label>
      <input
        id={id}
        className={`field ${error ? 'border-[#A32A2A]' : ''}`}
        value={value}
        inputMode={inputMode}
        autoComplete={autoComplete}
        onChange={(e) => onChange(e.target.value)}
        aria-invalid={!!error}
        aria-describedby={error ? `${id}-err` : undefined}
        // Phone numbers and email addresses stay left-to-right in both languages.
        dir={ltrValue ? 'ltr' : undefined}
        style={ltrValue ? { textAlign: 'start' } : undefined}
      />
      {error && (
        <p id={`${id}-err`} className="mt-1.5 text-[0.8rem] text-[#A32A2A]" role="alert">
          {error}
        </p>
      )}
    </div>
  );
}
