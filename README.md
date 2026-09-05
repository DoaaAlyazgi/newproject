# Global Medal — Smart Awards & Gifts Assistant

A **concept prototype** of a guided shopping experience for
[Global Medal](https://www.globalmedalkw.com/), the family-owned Kuwaiti awards
business established in 1980 and the first trophy store in Kuwait.

Instead of asking a customer to browse hundreds of medals, trophies, crystal
awards and VIP gifts, the assistant asks six short questions and recommends
three suitable options — each with the reason it was matched — then packages the
whole request so it can move straight into the team's existing WhatsApp
workflow.

> This complements Global Medal's existing online store. It does not replace it,
> and no order is placed anywhere in this prototype.

## Running it

```bash
npm install
npm run dev      # http://localhost:5173
npm run build    # production build into dist/
npm run preview  # serve the production build
```

React 19 · TypeScript · Tailwind CSS · Vite. No backend, no database, no
authentication, no payment, no AI API, no WhatsApp API.

## The journey

`Landing → 6 guided questions → matching animation → 3 recommendations →
product detail + personalisation preview → request summary → contact →
WhatsApp preview → success`

There is also a **catalogue browser** (`Browse products`) and a **Talk to an
expert** path reachable from every screen.

### Demo mode

The landing screen has a **Play demo scenario** button that pre-fills a polished
corporate scenario — 50 awards, employee recognition, 10–20 KD budget, premium
style, logo + engraving, 1–2 weeks — and jumps straight to the recommendations.
The full click-through takes about two minutes.

## Languages

English (default) and Arabic, switchable from the header. Arabic is a real RTL
build, not translated labels on an LTR layout: direction is set once at the root
so the whole layout mirrors, logical CSS properties (`margin-inline-start`,
`text-align: start`) flip the spacing, directional icons flip, numerals become
Arabic-Indic, and the Arabic type stack (IBM Plex Sans Arabic / Noto Kufi
Arabic) is loaded with `letter-spacing: normal` and generous line-height so the
connected script never crushes and diacritics never clip. Latin tokens embedded
in Arabic text (prices, phone numbers, file names) are isolated in `.ltr` spans
so bidi cannot reorder them.

## How the recommendation engine works

`src/lib/recommend.ts` — deterministic, entirely front-end, no network call. The
same answers always produce the same three cards, which is what makes it safe to
demo live.

Each catalogue item is scored against the answers:

| Signal | Effect |
| --- | --- |
| Occasion | +42 when listed for it; a mismatch disqualifies the item entirely |
| Recipients | up to +16 for overlap |
| Budget | +30 when the price span overlaps the band, +8 one band away, −20 beyond |
| Quantity ≥ 50 | +22 if bulk-suitable, −30 if not |
| Quantity ≤ 10 | +12 for heavier, individually-presented pieces |
| Style | +20 on a match |
| Logo / engraving / ribbon | +14 / +12 / +16 when supported, penalised when not |
| Urgent or few-days timeline | +8 for the simpler stocked formats |

The three cards are then chosen as **Best match** (top score), **Best value**
(lowest price among the strongest remaining matches) and a third option. That
third card is only badged **Premium choice** when it genuinely is one — at least
1.5× the best match's price *and* positioned as a premium piece; otherwise it is
labelled **Another strong match**. If all three would be near-identical, the
third is swapped for the strongest option in a different category, so a cup
appears alongside two medals rather than a third medal.

## Product data

`src/data/products.ts` holds 21 items — names and prices taken from the public
Global Medal catalogue and used here as **demonstration data**. Prices in KD may
change and availability is **not live**; the UI says so on every screen.

Two rules were followed when building the dataset, and should be kept:

- `supportsLogo` / `supportsEngraving` are true because Global Medal publicly
  offers in-house engraving and logo customisation across its award range.
- `hasVerifiedVariants` is true **only** where the catalogue lists selectable
  colour/ribbon variants on the product page (currently The Classic Weave Medal:
  gold/silver/bronze, and blue/black/red/white/orange/green/Kuwait-flag ribbons).
  Everywhere else the product detail screen says options are confirmed with the
  Global Medal team rather than inventing capabilities.

To connect a real catalogue later, replace the `products` array with the API
response and keep the same field names — nothing else needs to change.

## Product imagery

The official product photography and logo could not be downloaded into this
repository, so rather than dressing the concept in unrelated stock photos, every
catalogue item is drawn as a purpose-built vector illustration in the correct
silhouette and metal tone (`src/components/ProductArt.tsx`), and the header
carries a typographic stand-in mark (`BrandMark` in `src/components/ui.tsx`).

**Before presenting externally, swap in the real brand assets:** replace
`BrandMark` with the supplied logo, and replace `ProductArt` with an `<img>`
bound to a `product.image` field.

## What is simulated

- Logo upload — the file name is read locally; nothing is uploaded anywhere.
- Personalisation preview — illustrative, and labelled as such on screen.
- WhatsApp bridge — shows the message that *could* be handed to WhatsApp; the
  CTA does not send anything. "Copy message" copies the plain-text version.
- Success screen — states plainly that no request was sent.

## Structure

```
src/
  components/   BrandMark, Header, LanguageSwitcher, ProgressBar, OptionCard,
                Chip, Notice, Modal, ProductArt, ProductDetails,
                PersonalizationPreview, ExpertNudge
  screens/      Landing, Quiz, Thinking, Recommendations, Summary, Contact,
                WhatsAppBridge, Success, Expert, Catalog
  data/         products.ts (catalogue), i18n.ts (EN/AR copy)
  lib/          recommend.ts (matching), store.tsx (state), types.ts
```
