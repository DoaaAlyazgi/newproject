import { useMemo, useState } from 'react';
import { useStore } from '../lib/store';
import { products } from '../data/products';
import type { CategoryId, Product } from '../lib/types';
import ProductArt from '../components/ProductArt';
import ProductDetails from '../components/ProductDetails';
import { PriceTag, PrototypeFooter, ScreenTitle } from '../components/ui';

const CATEGORIES: (CategoryId | 'all')[] = [
  'all',
  'medals',
  'trophies',
  'crystal',
  'plaques',
  'replica',
  'vip',
  'bobbleheads',
];

export default function Catalog() {
  const { t, n, lang, go, setSelected, setPersonalization, personalization } = useStore();
  const [filter, setFilter] = useState<CategoryId | 'all'>('all');
  const [detail, setDetail] = useState<Product | null>(null);

  const list = useMemo(
    () => (filter === 'all' ? products : products.filter((p) => p.category === filter)),
    [filter],
  );

  const openDetail = (p: Product) => {
    setPersonalization({
      metal: p.metalOptions?.[0] ?? null,
      ribbon: p.ribbonOptions?.[0] ?? null,
      quantity: personalization.quantity > 1 ? personalization.quantity : 1,
    });
    setDetail(p);
  };

  return (
    <div className="flex min-h-[100dvh] flex-col">
      <div className="mx-auto w-full max-w-6xl flex-1 px-4 py-10 sm:px-6 lg:px-8 lg:py-14">
        <ScreenTitle title={t('catalog.title')} subtitle={t('catalog.subtitle')} />

        <div className="mt-7 flex flex-wrap items-center gap-2">
          {CATEGORIES.map((c) => (
            <button
              key={c}
              type="button"
              onClick={() => setFilter(c)}
              aria-pressed={filter === c}
              className={`min-h-[42px] rounded-full border px-4 text-[0.84rem] font-medium transition-all duration-300 ${
                filter === c
                  ? 'border-ink bg-ink text-white'
                  : 'border-line bg-white text-ink hover:border-gold/60 hover:bg-gold-wash'
              }`}
            >
              {c === 'all' ? t('catalog.all') : t(`category.${c}`)}
            </button>
          ))}
          <span className="ms-auto text-[0.78rem] text-ink-muted">
            {t('catalog.count', { n: n(list.length) })}
          </span>
        </div>

        <div className="mt-6 grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-4 lg:gap-5">
          {list.map((p, i) => (
            <button
              key={p.id}
              type="button"
              onClick={() => openDetail(p)}
              className="group flex animate-fade-up flex-col rounded-2xl border border-line bg-white p-4 text-start transition-all duration-400 ease-premium hover:-translate-y-1 hover:border-gold/50 hover:shadow-lift"
              style={{ animationDelay: `${Math.min(i, 8) * 45}ms` }}
            >
              <div
                className="rounded-xl border border-line/60 p-3"
                style={{ background: 'radial-gradient(110% 80% at 50% 0%, #FFFFFF, #F6F0E5)' }}
              >
                <ProductArt
                  art={p.art}
                  tone={p.tone}
                  variant={p.id}
                  className="mx-auto h-32 w-full transition-transform duration-500 ease-premium group-hover:scale-105 sm:h-36"
                />
              </div>
              <span className="mt-3 text-[0.7rem] uppercase tracking-[0.1em] text-ink-muted">
                {t(`category.${p.category}`)}
              </span>
              <span className="mt-1 text-[0.9rem] font-semibold leading-snug text-ink">
                {p.name[lang]}
              </span>
              <span className="mt-auto pt-2">
                <PriceTag product={p} size="sm" />
              </span>
            </button>
          ))}
        </div>

        <div className="mt-10">
          <button type="button" onClick={() => go('landing')} className="btn-ghost">
            {t('catalog.back')}
          </button>
        </div>
      </div>

      <PrototypeFooter />

      <ProductDetails
        product={detail}
        open={!!detail}
        onClose={() => setDetail(null)}
        onSelect={(p) => {
          setSelected(p);
          setDetail(null);
          go('summary');
        }}
      />
    </div>
  );
}
