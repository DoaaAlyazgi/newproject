import { useMemo, useState } from 'react';
import { useStore } from '../lib/store';
import { formatKD } from '../data/products';
import { resolvedQuantity } from '../lib/recommend';
import { PrototypeFooter, ScreenTitle } from '../components/ui';

export default function WhatsAppBridge() {
  const { t, n, lang, go, answers, selected, personalization, contact, logoName } = useStore();
  const [copied, setCopied] = useState(false);

  const qty = personalization.quantity > 1 ? personalization.quantity : resolvedQuantity(answers);
  const sep = lang === 'ar' ? '، ' : ', ';

  const lines = useMemo(() => {
    const rows: { label: string; value: string }[] = [];

    rows.push({
      label: t('summary.occasion'),
      value: answers.occasion ? t(`occasion.${answers.occasion}.title`) : t('summary.none'),
    });
    if (answers.recipients.length) {
      rows.push({
        label: t('summary.recipients'),
        value: answers.recipients.map((r) => t(`recipient.${r}`)).join(sep),
      });
    }
    rows.push({ label: t('summary.quantity'), value: n(qty) });
    rows.push({
      label: t('summary.budget'),
      value: answers.budget
        ? `${t(`budget.${answers.budget}`)} · ${t('chrome.perItem')}`
        : t('summary.none'),
    });
    if (answers.customization.length) {
      rows.push({
        label: t('summary.customization'),
        value: answers.customization.map((c) => t(`custom.${c}`)).join(sep),
      });
    }
    if (selected) {
      rows.push({
        label: t('summary.product'),
        value: `${selected.name[lang]} — ${n(
          selected.priceRange ? formatKD(selected.priceRange.min) : formatKD(selected.price),
        )} ${t('chrome.kd')}`,
      });
    }
    if (personalization.engravingText.trim()) {
      rows.push({ label: t('summary.engraving'), value: `“${personalization.engravingText}”` });
    }
    if (logoName) {
      rows.push({ label: t('custom.logo'), value: logoName });
    }
    rows.push({
      label: t('summary.timeline'),
      value: answers.timeline ? t(`timeline.${answers.timeline}`) : t('summary.none'),
    });
    return rows;
  }, [answers, selected, personalization, logoName, lang, n, qty, sep, t]);

  const intro = t('wa.msgIntro', {
    qty: n(qty),
    occasion: answers.occasion ? t(`occasion.${answers.occasion}.title`) : '—',
  });

  const plainText = useMemo(() => {
    const head = [t('wa.msgGreeting'), '', intro, ''];
    const body = lines.map((l) => `${l.label}: ${l.value}`);
    const tail = contact.name
      ? ['', `— ${contact.name}${contact.organization ? `, ${contact.organization}` : ''}`]
      : [];
    return [...head, ...body, ...tail].join('\n');
  }, [lines, intro, contact, t]);

  const copy = async () => {
    try {
      await navigator.clipboard.writeText(plainText);
    } catch {
      // Clipboard access can be blocked (insecure context / permissions);
      // the preview below is still readable, so fail quietly.
    }
    setCopied(true);
    window.setTimeout(() => setCopied(false), 1800);
  };

  return (
    <div className="flex min-h-[100dvh] flex-col">
      <div className="mx-auto w-full max-w-3xl flex-1 px-4 py-10 sm:px-6 lg:py-14">
        <ScreenTitle
          eyebrow={t('wa.ready')}
          title={t('wa.title')}
          subtitle={t('wa.subtitle')}
        />

        {/* --------------------- WhatsApp-style preview --------------------- */}
        <div
          className="mt-8 animate-fade-up overflow-hidden rounded-2xl border border-line shadow-card"
          aria-label={t('wa.title')}
        >
          {/* chat header */}
          <div className="flex items-center gap-3 border-b border-line bg-white px-4 py-3">
            <span className="flex h-10 w-10 items-center justify-center rounded-full bg-[#0F5C43] text-white">
              <WhatsAppGlyph />
            </span>
            <div className="min-w-0">
              <div className="text-[0.9rem] font-semibold text-ink">{t('brand.name')}</div>
              <div className="text-[0.72rem] text-ink-muted">{t('brand.since')}</div>
            </div>
          </div>

          {/* chat body */}
          <div
            className="p-4 sm:p-6"
            style={{
              background:
                'repeating-linear-gradient(135deg,#F1EDE4 0 12px,#EFEAE0 12px 24px)',
            }}
          >
            <div className="ms-auto max-w-lg rounded-2xl rounded-ee-sm bg-[#DCF8C6] p-4 shadow-sm">
              <p className="text-[0.92rem] font-medium text-[#0F2E22]">{t('wa.msgGreeting')}</p>
              <p className="mt-2 text-[0.9rem] leading-relaxed text-[#0F2E22]">{intro}</p>

              <dl className="mt-3 space-y-1.5 border-t border-black/10 pt-3">
                {lines.map((l) => (
                  <div key={l.label} className="flex flex-wrap gap-x-2 text-[0.85rem] leading-relaxed">
                    <dt className="font-semibold text-[#0F2E22]">{l.label}:</dt>
                    <dd className="text-[#26483A]">{l.value}</dd>
                  </div>
                ))}
              </dl>

              {contact.name && (
                <p className="mt-3 border-t border-black/10 pt-2 text-[0.82rem] text-[#26483A]">
                  — {contact.name}
                  {contact.organization ? `, ${contact.organization}` : ''}
                </p>
              )}

              <div className="mt-2 flex items-center justify-end gap-1 text-[0.66rem] text-[#4A6B5C]">
                <span className="ltr">10:24</span>
                <svg viewBox="0 0 18 12" className="h-3 w-4" fill="none" aria-hidden="true">
                  <path
                    d="M1 6.5 L4.5 10 L11 2M7.5 10 L14 2"
                    stroke="#4FA3D1"
                    strokeWidth="1.4"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </div>
            </div>
          </div>
        </div>

        <div className="mt-6 flex flex-col gap-3 sm:flex-row">
          <button
            type="button"
            onClick={() => go('success')}
            className="btn inline-flex bg-[#0F5C43] text-white shadow-card hover:bg-[#0B4534] hover:shadow-lift sm:min-w-[250px]"
          >
            <WhatsAppGlyph />
            {t('wa.cta')}
          </button>
          <button type="button" onClick={copy} className="btn-ghost">
            {copied ? t('wa.copied') : t('wa.copy')}
          </button>
          <button type="button" onClick={() => go('contact')} className="btn-quiet">
            {t('chrome.back')}
          </button>
        </div>

        <p className="mt-4 text-[0.78rem] leading-relaxed text-ink-muted">{t('wa.disclaimer')}</p>
      </div>

      <PrototypeFooter />
    </div>
  );
}

function WhatsAppGlyph() {
  return (
    <svg viewBox="0 0 24 24" className="h-[18px] w-[18px]" fill="currentColor" aria-hidden="true">
      <path d="M12.04 2C6.58 2 2.13 6.45 2.13 11.91c0 1.75.46 3.45 1.32 4.95L2 22l5.28-1.38a9.9 9.9 0 0 0 4.76 1.21h.01c5.46 0 9.91-4.45 9.91-9.91 0-2.65-1.03-5.14-2.9-7.01A9.85 9.85 0 0 0 12.04 2Zm0 18.13h-.01a8.2 8.2 0 0 1-4.19-1.15l-.3-.18-3.13.82.84-3.05-.2-.31a8.19 8.19 0 0 1-1.26-4.35c0-4.54 3.7-8.24 8.25-8.24 2.2 0 4.27.86 5.83 2.42a8.19 8.19 0 0 1 2.41 5.83c0 4.54-3.7 8.21-8.24 8.21Zm4.52-6.16c-.25-.12-1.47-.72-1.69-.81-.23-.08-.39-.12-.56.13-.16.24-.64.8-.78.97-.15.16-.29.18-.53.06-.25-.13-1.05-.39-1.99-1.23-.74-.66-1.23-1.47-1.38-1.72-.14-.25-.01-.38.11-.5.11-.11.25-.29.37-.44.13-.15.17-.25.25-.42.08-.16.04-.31-.02-.43-.06-.12-.56-1.34-.76-1.84-.2-.48-.4-.42-.56-.43h-.47c-.16 0-.43.06-.65.31-.22.25-.86.84-.86 2.05 0 1.21.88 2.38 1 2.54.12.16 1.73 2.64 4.19 3.7.59.25 1.04.4 1.4.52.59.19 1.12.16 1.54.1.47-.07 1.47-.6 1.68-1.18.2-.58.2-1.08.14-1.18-.06-.11-.22-.17-.47-.29Z" />
    </svg>
  );
}
