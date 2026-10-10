# Design Brief

## Direction

Warm Boutique Editorial — a friendly Indonesian clothing store landing page that reads like a curated fashion magazine, not a generic shop.

## Tone

Warm, editorial and confident: cream paper surfaces, espresso ink, and a single terracotta-red accent executed with restraint rather than a rainbow of promo colors.

## Differentiation

Fraunces serif headlines over warm cream with a sharp terracotta promo badge — an editorial fashion voice applied to a humble WhatsApp-first checkout.

## Color Palette

| Token      | OKLCH       | Role                                          |
| ---------- | ----------- | --------------------------------------------- |
| background | 0.97 0.012 78 | warm cream page canvas                       |
| foreground | 0.22 0.028 48 | espresso ink text                            |
| card       | 0.995 0.006 78 | product & content surfaces                  |
| primary    | 0.52 0.17 30  | terracotta-red CTAs, promo badges, active nav |
| accent     | 0.72 0.14 58  | warm gold highlights, hover states            |
| muted      | 0.93 0.018 74 | filter pills, section alternation, meta text |
| success    | 0.6 0.15 152  | WhatsApp "Beli Sekarang" buttons              |

## Typography

- Display: Fraunces — store name, hero headline, section headings, prices
- Body: General Sans — nav, labels, descriptions, buttons, filters
- Mono: JetBrains Mono — price numerals and discount percentages (optional)
- Scale: hero `text-4xl md:text-6xl font-bold tracking-tight`, h2 `text-3xl md:text-4xl font-bold tracking-tight`, label `text-xs font-semibold tracking-widest uppercase`, body `text-base`

## Elevation & Depth

Cream `background` base, crisp `card` product surfaces with a hairline `border` and `shadow-subtle`, lifting to `shadow-elevated` on hover and on the modal; hero uses a dark gradient overlay, never a full-page gradient.

## Structural Zones

| Zone    | Background          | Border   | Notes                                              |
| ------- | ------------------- | -------- | -------------------------------------------------- |
| Header  | `bg-card/90` backdrop-blur | `border-b` | sticky, subtle shadow on scroll            |
| Hero    | photo + `gradient-hero` overlay | — | dark editorial banner, floating promo badge |
| Content | `bg-background`, alternate `bg-muted/40` | — | catalog, features sections alternate |
| Footer  | `bg-foreground` dark espresso | `border-t` | light text, quick links, social icons    |

## Spacing & Rhythm

Generous section gaps (`py-16 md:py-24`), tight card internals (`p-4`), pill controls at `h-10`; rhythm comes from alternating muted bands between cream sections.

## Component Patterns

- Buttons: full pill `rounded-full`, primary is solid terracotta, WhatsApp CTA is `bg-whatsapp`; hover darkens and lifts `shadow-elevated`.
- Cards: `rounded-2xl` cream `card`, hairline border, image with `aspect-[4/5]`, `shadow-subtle` → `shadow-elevated` on hover.
- Badges: circular or pill `rounded-full`, terracotta `primary` with cream text for "Diskon 50%".
- Inputs: `rounded-full` search bar on `card` with `border-input`, focus `ring-primary`.

## Motion

- Entrance: `animate-slide-up` staggered for hero and `animate-float-in` for product cards.
- Hover: 300ms `transition-smooth` lift and shadow on cards/buttons.
- Decorative: `animate-pulse-soft` on the floating WhatsApp button; `animate-marquee-in` for carousel slide changes.

## Constraints

- All UI text in Bahasa Indonesia.
- Color only via semantic tokens — no hex, rgb, or arbitrary color classes.
- No cart/checkout and no product detail page; "Beli Sekarang" opens WhatsApp (`wa.me`).
- WhatsApp number configured in one place.

## Signature Detail

A circular terracotta "Diskon 50%" promo seal floating on the hero — the one memorable, ownable mark of the store.
