import { useEffect, type ReactNode } from 'react';
import { formatKD } from '../data/products';
import { useStore } from '../lib/store';
import type { Product } from '../lib/types';

/* ------------------------------- brand mark ------------------------------- */

/**
 * Typographic mark standing in for the official Global Medal logo, which could
 * not be downloaded into this prototype. Replace the SVG + wordmark with the
 * supplied brand asset before any external presentation.
 */
export function BrandMark({ compact = false }: { compact?: boolean }) {
  const { t } = useStore();
  return (
    <div className="flex items-center gap-3">
      <svg viewBox="0 0 44 44" className="h-9 w-9 shrink-0" aria-hidden="true">
        <circle cx="22" cy="22" r="21" fill="none" stroke="#B0863C" strokeWidth="1.2" />
        <circle cx="22" cy="22" r="16" fill="#14110E" />
        <path
          d="M13 25 C13 17, 17 12, 22 10 C27 12, 31 17, 31 25"
          fill="none"
          stroke="#DCBE84"
          strokeWidth="1.6"
          strokeLinecap="round"
        />
        <circle cx="22" cy="27" r="3.2" fill="#DCBE84" />
      </svg>
      <div className="leading-none">
        <div className="font-display text-[1.06rem] font-semibold tracking-[0.14em] text-ink">
          {t('brand.name')}
        </div>
        {!compact && (
          <div className="mt-1 text-[0.63rem] uppercase tracking-[0.16em] text-ink-muted">
            {t('brand.since')}
          </div>
        )}
      </div>
    </div>
  );
}

/* ---------------------------- language switcher --------------------------- */

export function LanguageSwitcher() {
  const { lang, setLang } = useStore();
  return (
    <div
      className="flex items-center rounded-full border border-line bg-white p-0.5"
      role="group"
      aria-label="Language"
    >
      {(['en', 'ar'] as const).map((code) => (
        <button
          key={code}
          type="button"
          onClick={() => setLang(code)}
          aria-pressed={lang === code}
          className={`min-h-[34px] rounded-full px-3 text-[0.72rem] font-semibold transition-colors duration-200 ${
            lang === code ? 'bg-ink text-white' : 'text-ink-muted hover:text-ink'
          }`}
        >
          <span className="ltr">{code === 'en' ? 'EN' : 'AR'}</span>
        </button>
      ))}
    </div>
  );
}

/* --------------------------------- header --------------------------------- */

export function Header() {
  const { t, go, screen, reset } = useStore();
  const onLanding = screen === 'landing';

  return (
    <header className="sticky top-0 z-40 border-b border-line/80 bg-canvas/85 backdrop-blur-md">
      <div className="mx-auto flex max-w-6xl items-center gap-3 px-4 py-3 sm:px-6 lg:px-8">
        <button
          type="button"
          onClick={reset}
          className="rounded-lg text-start transition-opacity duration-200 hover:opacity-70"
          aria-label={t('chrome.restart')}
        >
          <BrandMark />
        </button>

        <span className="mx-1 hidden h-6 w-px bg-line md:block" />
        <span className="hidden text-[0.78rem] text-ink-muted md:block">
          {t('brand.assistant')}
        </span>

        <div className="ms-auto flex items-center gap-2">
          <span className="hidden rounded-full border border-gold/30 bg-gold-wash px-3 py-1 text-[0.66rem] font-semibold uppercase tracking-[0.12em] text-gold-deep sm:inline-block">
            {t('chrome.conceptBadge')}
          </span>
          {!onLanding && (
            <button
              type="button"
              onClick={() => go('expert')}
              className="hidden rounded-full border border-line-strong px-4 py-2 text-[0.78rem] font-medium text-ink transition-colors duration-200 hover:border-gold hover:bg-gold-wash lg:inline-block"
            >
              {t('chrome.expertShort')}
            </button>
          )}
          <LanguageSwitcher />
        </div>
      </div>
    </header>
  );
}

/* ------------------------------ progress bar ------------------------------ */

export function ProgressBar({ current, total }: { current: number; total: number }) {
  const { t, n } = useStore();
  const pct = Math.round(((current + 1) / total) * 100);
  return (
    <div className="w-full">
      <div className="mb-2 flex items-baseline justify-between">
        <span className="eyebrow">{t('chrome.stepOf', { a: n(current + 1), b: n(total) })}</span>
        <span className="text-[0.72rem] font-medium text-ink-muted">
          <span className="ltr">{n(pct)}%</span>
        </span>
      </div>
      <div
        className="h-[3px] w-full overflow-hidden rounded-full bg-line"
        role="progressbar"
        aria-valuenow={current + 1}
        aria-valuemin={1}
        aria-valuemax={total}
      >
        <div
          className="h-full rounded-full bg-gradient-to-r from-gold-light to-gold transition-[width] duration-700 ease-premium"
          style={{ width: `${pct}%` }}
        />
      </div>
    </div>
  );
}

/* ------------------------------- option card ------------------------------ */

interface OptionCardProps {
  title: string;
  body?: string;
  icon?: ReactNode;
  selected: boolean;
  onClick: () => void;
  multi?: boolean;
  compact?: boolean;
}

export function OptionCard({
  title,
  body,
  icon,
  selected,
  onClick,
  multi = false,
  compact = false,
}: OptionCardProps) {
  return (
    <button
      type="button"
      onClick={onClick}
      aria-pressed={selected}
      className={`group relative flex w-full items-start gap-3 rounded-2xl border p-4 text-start transition-all duration-300 ease-premium sm:p-5 ${
        selected
          ? 'border-gold bg-gold-wash shadow-card'
          : 'border-line bg-white hover:-translate-y-0.5 hover:border-gold/50 hover:shadow-card'
      }`}
      style={{ minHeight: compact ? 60 : 92 }}
    >
      {icon && (
        <span
          className={`mt-0.5 flex h-9 w-9 shrink-0 items-center justify-center rounded-xl text-[1.05rem] transition-colors duration-300 ${
            selected ? 'bg-white text-gold-deep' : 'bg-canvas text-ink-soft group-hover:bg-gold-wash'
          }`}
          aria-hidden="true"
        >
          {icon}
        </span>
      )}
      <span className="min-w-0 flex-1">
        <span className="block text-[0.95rem] font-semibold leading-snug text-ink">{title}</span>
        {body && (
          <span className="mt-1 block text-[0.82rem] leading-relaxed text-ink-muted">{body}</span>
        )}
      </span>
      <span
        className={`mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center border transition-all duration-300 ${
          multi ? 'rounded-md' : 'rounded-full'
        } ${selected ? 'border-gold bg-gold text-white' : 'border-line-strong bg-white text-transparent'}`}
        aria-hidden="true"
      >
        <svg viewBox="0 0 20 20" className="h-3 w-3" fill="none">
          <path
            d="M4 10.5 L8 14.5 L16 5.5"
            stroke="currentColor"
            strokeWidth="2.4"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      </span>
    </button>
  );
}

/* -------------------------------- chip card ------------------------------- */

export function Chip({
  label,
  selected,
  onClick,
}: {
  label: string;
  selected: boolean;
  onClick: () => void;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      aria-pressed={selected}
      className={`min-h-[46px] rounded-full border px-5 text-[0.88rem] font-medium transition-all duration-300 ease-premium ${
        selected
          ? 'border-gold bg-gold text-white shadow-card'
          : 'border-line bg-white text-ink hover:border-gold/60 hover:bg-gold-wash'
      }`}
    >
      {label}
    </button>
  );
}

/* ------------------------------- price tag -------------------------------- */

/**
 * Prices are shown the way the Global Medal catalogue shows them: three
 * decimals, a range where the item is sold in several sizes, and the was-price
 * struck through where the catalogue lists the item reduced.
 */
export function PriceTag({
  product,
  size = 'md',
  showSaleBadge = true,
}: {
  product: Product;
  size?: 'sm' | 'md' | 'lg';
  showSaleBadge?: boolean;
}) {
  const { t, n } = useStore();
  const scale = {
    sm: 'text-[0.86rem]',
    md: 'text-[1.15rem]',
    lg: 'text-[1.7rem]',
  }[size];

  return (
    <span className="flex flex-wrap items-baseline gap-x-2 gap-y-1">
      <span className={`font-display font-semibold text-gold-deep ${scale}`}>
        <span className="ltr">
          {product.priceRange
            ? `${n(formatKD(product.priceRange.min))}–${n(formatKD(product.priceRange.max))}`
            : n(formatKD(product.price))}
        </span>
      </span>
      <span className="text-[0.76rem] font-medium text-ink-muted">{t('chrome.kd')}</span>
      {product.compareAt && (
        <>
          <span className="text-[0.76rem] text-ink-muted line-through decoration-ink-muted/50">
            <span className="ltr">{n(formatKD(product.compareAt))}</span>
          </span>
          {showSaleBadge && (
            <span className="rounded-full bg-[#E3EFE6] px-2 py-0.5 text-[0.62rem] font-semibold uppercase tracking-[0.1em] text-[#1F6B45]">
              {t('product.sale')}
            </span>
          )}
        </>
      )}
    </span>
  );
}

/* --------------------------------- notice --------------------------------- */

export function Notice({
  children,
  tone = 'gold',
}: {
  children: ReactNode;
  tone?: 'gold' | 'neutral';
}) {
  return (
    <div
      className={`animate-fade-up rounded-xl border px-4 py-3 text-[0.84rem] leading-relaxed ${
        tone === 'gold'
          ? 'border-gold/30 bg-gold-wash text-gold-deep'
          : 'border-line bg-white text-ink-muted'
      }`}
      role="status"
    >
      {children}
    </div>
  );
}

/* --------------------------------- modal ---------------------------------- */

export function Modal({
  open,
  onClose,
  children,
  labelledBy,
}: {
  open: boolean;
  onClose: () => void;
  children: ReactNode;
  labelledBy?: string;
}) {
  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    document.addEventListener('keydown', onKey);
    const prev = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    return () => {
      document.removeEventListener('keydown', onKey);
      document.body.style.overflow = prev;
    };
  }, [open, onClose]);

  if (!open) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-end justify-center sm:items-center">
      <div
        className="absolute inset-0 animate-fade-in bg-ink/40 backdrop-blur-sm"
        onClick={onClose}
        aria-hidden="true"
      />
      <div
        role="dialog"
        aria-modal="true"
        aria-labelledby={labelledBy}
        className="relative flex max-h-[94vh] w-full max-w-4xl animate-scale-in flex-col overflow-hidden rounded-t-3xl border border-line bg-canvas shadow-lift sm:max-h-[90vh] sm:rounded-3xl"
      >
        {children}
      </div>
    </div>
  );
}

/* ------------------------------ expert nudge ------------------------------ */

export function ExpertNudge() {
  const { t, go } = useStore();
  return (
    <div className="mt-8 flex flex-wrap items-center justify-center gap-x-3 gap-y-1 text-center text-[0.84rem] text-ink-muted">
      <span>{t('chrome.notSure')}</span>
      <button
        type="button"
        onClick={() => go('expert')}
        className="font-semibold text-gold-deep underline decoration-gold/40 underline-offset-4 transition-colors duration-200 hover:text-ink"
      >
        {t('chrome.expertShort')}
      </button>
    </div>
  );
}

/* ------------------------------ section title ----------------------------- */

export function ScreenTitle({
  eyebrow,
  title,
  subtitle,
}: {
  eyebrow?: string;
  title: string;
  subtitle?: string;
}) {
  return (
    <div className="animate-fade-up">
      {eyebrow && <div className="eyebrow mb-3">{eyebrow}</div>}
      <h1 className="font-display text-[1.9rem] font-medium leading-[1.15] text-ink sm:text-[2.5rem]">
        {title}
      </h1>
      {subtitle && (
        <p className="mt-3 max-w-2xl text-[0.95rem] leading-relaxed text-ink-muted">{subtitle}</p>
      )}
    </div>
  );
}

/* -------------------------------- footer ---------------------------------- */

export function PrototypeFooter() {
  const { t } = useStore();
  return (
    <footer className="mt-auto border-t border-line/70 px-4 py-8 text-center sm:px-6">
      <div className="mx-auto h-px w-24 gold-rule" />
      <p className="mx-auto mt-5 max-w-2xl text-[0.76rem] leading-relaxed text-ink-muted">
        {t('chrome.demoNotice')}
      </p>
    </footer>
  );
}
