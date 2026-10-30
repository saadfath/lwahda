# Moroccan Heritage & Unity — Design System

> **Applied project palette (Moroccan flag)**
> The live front end uses the Moroccan flag colours in place of the navy/gold theme described below:
> - **Deep flag-red surfaces:** `#1A0709` (background), `#5E0F1A` (header), `#2E0D12` (cards).
> - **Flag-green accents:** `#006233` / `#0C6B3C` (primary buttons), `#9FE7B7` (labels, borders, highlights).
> - **Flag-red accent:** `#C1272D`.
> - **Ivory text:** `#FFF9F4`.
> Legacy token names (`gold-metallic`, `gold-amber`, `surface-navy`) are kept for code compatibility and now resolve to green accents and deep red surfaces respectively.
> **Typography:** the live site uses **Roboto** (300–900) for Latin text, with **Noto Sans Arabic** for Arabic; the font stacks described below are superseded.

---
name: Moroccan Heritage & Unity
colors:
  surface: '#091424'
  surface-dim: '#091424'
  surface-bright: '#2f3a4b'
  surface-container-lowest: '#040e1e'
  surface-container-low: '#111c2c'
  surface-container: '#152030'
  surface-container-high: '#202a3b'
  surface-container-highest: '#2b3547'
  on-surface: '#d8e3fa'
  on-surface-variant: '#c5c6ce'
  inverse-surface: '#d8e3fa'
  inverse-on-surface: '#263142'
  outline: '#8f9098'
  outline-variant: '#44474d'
  surface-tint: '#b6c7e9'
  primary: '#b6c7e9'
  on-primary: '#20314c'
  primary-container: '#0c1e38'
  on-primary-container: '#7686a5'
  inverse-primary: '#4f5f7c'
  secondary: '#ffb3ae'
  on-secondary: '#68000b'
  secondary-container: '#9b0117'
  on-secondary-container: '#ffa39d'
  tertiary: '#86d89d'
  on-tertiary: '#00391b'
  tertiary-container: '#00240f'
  on-tertiary-container: '#459561'
  error: '#ffb4ab'
  on-error: '#690005'
  error-container: '#93000a'
  on-error-container: '#ffdad6'
  primary-fixed: '#d6e3ff'
  primary-fixed-dim: '#b6c7e9'
  on-primary-fixed: '#091c35'
  on-primary-fixed-variant: '#374763'
  secondary-fixed: '#ffdad7'
  secondary-fixed-dim: '#ffb3ae'
  on-secondary-fixed: '#410004'
  on-secondary-fixed-variant: '#930015'
  tertiary-fixed: '#a1f5b7'
  tertiary-fixed-dim: '#86d89d'
  on-tertiary-fixed: '#00210d'
  on-tertiary-fixed-variant: '#00522a'
  background: '#091424'
  on-background: '#d8e3fa'
  surface-variant: '#2b3547'
  surface-navy: '#11284A'
  surface-navy-light: '#1A3761'
  crimson-accent: '#B91C1C'
  emerald-bright: '#059669'
  ivory-base: '#FDFBF7'
  ivory-muted: '#EFECE6'
  gold-metallic: '#D4AF37'
  gold-amber: '#F59E0B'
  text-on-dark-primary: '#FDFBF7'
  text-on-dark-secondary: '#BAC7D5'
typography:
  display-hero:
    fontFamily: Roboto
    fontSize: 48px
    fontWeight: '700'
    lineHeight: 56px
  display-hero-mobile:
    fontFamily: Roboto
    fontSize: 32px
    fontWeight: '700'
    lineHeight: 40px
  headline-lg:
    fontFamily: Roboto
    fontSize: 36px
    fontWeight: '600'
    lineHeight: 44px
  headline-lg-mobile:
    fontFamily: Roboto
    fontSize: 26px
    fontWeight: '600'
    lineHeight: 34px
  headline-md:
    fontFamily: Roboto
    fontSize: 24px
    fontWeight: '600'
    lineHeight: 32px
  headline-sm:
    fontFamily: Roboto
    fontSize: 20px
    fontWeight: '600'
    lineHeight: 28px
  title-md:
    fontFamily: Roboto
    fontSize: 18px
    fontWeight: '600'
    lineHeight: 26px
  body-lg:
    fontFamily: Roboto
    fontSize: 18px
    fontWeight: '400'
    lineHeight: 28px
  body-md:
    fontFamily: Roboto
    fontSize: 16px
    fontWeight: '400'
    lineHeight: 24px
  body-sm:
    fontFamily: Roboto
    fontSize: 14px
    fontWeight: '400'
    lineHeight: 20px
  label-md:
    fontFamily: Roboto
    fontSize: 13px
    fontWeight: '600'
    lineHeight: 18px
  label-sm:
    fontFamily: Roboto
    fontSize: 11px
    fontWeight: '700'
    lineHeight: 16px
rounded:
  sm: 0.125rem
  DEFAULT: 0.25rem
  md: 0.375rem
  lg: 0.5rem
  xl: 0.75rem
  full: 9999px
spacing:
  gutter: 1.5rem
  gutter-mobile: 1rem
  margin: 2.5rem
  margin-mobile: 1.25rem
  space-xs: 0.25rem
  space-sm: 0.5rem
  space-md: 1rem
  space-lg: 1.5rem
  space-xl: 2.5rem
---

## Brand & Style

This design system expresses the pride, unity, and timeless craft of Morocco in a contemporary digital context. Created for the celebration of Eid Al Wahda (Fête de l'Unité) and CMC Béni Mellal-Khénifra, it honors Moroccan artistic traditions—most notably the precision of zellige mosaic tiling, sacred geometry, and royal heraldry—while delivering an intuitive, accessible experience across quizzes, cultural narratives, and competitive leaderboards.

The aesthetic philosophy merges **Modern Moroccan Heritage** with high-end editorial clarity. Deep midnight indigo and royal navy backdrops evoke intimate Moroccan riad courtyards at dusk, punctuated by warm ivory card surfaces, authentic national crimson, star emerald green, and fine gilded brass accents. Rather than applying traditional motifs as loud, ornamental overlays, the system treats Moroccan geometry structurally: interlocking frames, eight-pointed star corner medallions, low-opacity lattice textures, and precision keyline dividers. 

The emotional tone balances institutional gravitas with celebratory warmth. Users should feel reverence for Moroccan national unity and heritage alongside the vibrant energy of intellectual engagement.

## Colors

The palette draws directly from the official colors of the Kingdom of Morocco, traditional Fez ceramic glazes, and royal architectural motifs:

- **Primary (`#0C1E38` & `#11284A`):** Moroccan Royal Navy and deep indigo form the foundation of all ambient spaces, card backplates, and persistent chrome.
- **Secondary (`#C1272D` & `#B91C1C`):** Moroccan National Crimson delivers urgency, focal emphasis, primary CTA energy, and patriotic significance.
- **Tertiary (`#006233` & `#059669`):** Emerald Star Green signifies balance, prosperity, correct answers, and verification states.
- **Warm Ivory (`#FDFBF7`):** Replaces clinical stark whites for text clarity, card bodies, and high-readability containers.
- **Warm Gold Accents (`#D4AF37` & `#F59E0B`):** Reserved for podium rankings, achievement medals, ornamental borders, and focus rings.

### Application Rules
- **Dark Mode Default:** The canvas root defaults to deep navy (`#081323` to `#0C1E38`) layered with low-opacity geometric zellige watermarks (3% to 6% opacity) to avoid visual fatigue.
- **Contrast Discipline:** When using crimson or emerald on deep navy, pair with white or gold borders to ensure AAA contrast compliance. Never render dark body copy against navy surfaces.

## Typography

The typographic hierarchy accommodates bilingual and trilingual layouts (Arabic, French, English) with equal dignity and visual weight:

- **Headlines, Body & Interactive Controls:** Set in **Roboto** (weights 300–900). Its neutral, highly legible geometry gives headings a confident editorial voice while keeping dense quiz interfaces, option lists, and scoreboards crisp.
- **Bilingual & RTL Harmony:** Roboto has no Arabic glyphs, so Arabic copy falls back to **Noto Sans Arabic**, matched in weight and x-height for a seamless switch. When text direction changes (`dir="rtl"`), maintain baseline alignment and symmetric padding across card frames.

## Layout & Spacing

The layout is built upon an 8pt architectural rhythm, utilizing a structured 12-column responsive fluid grid designed around symmetrical spatial harmony:

- **Desktop (1200px+):** 12 columns, `1.5rem` (24px) gutters, `2.5rem` (40px) outer margins, capped at a maximum container width of `1280px` for optimal readability and centered focus.
- **Tablet (768px - 1199px):** 8 columns, `1.25rem` (20px) gutters, `2rem` (32px) margins. Cards collapse from multi-column tiles into 2-up grids.
- **Mobile (< 768px):** 4 columns, `1rem` (16px) gutters, `1.25rem` (20px) margins. Interactive option blocks and leaderboard podium positions reflow into single-column vertical stacks.

Spacing tokens (`space-xs` through `space-xl`) dictate internal card paddings, list tile gaps, and section intervals. Quiz containers utilize strict vertical pacing to ensure question stems, options, and actions remain anchored within standard viewports without excessive vertical scrolling.

## Elevation & Depth

Visual depth is expressed through layered atmospheric depth rather than heavy synthetic drop shadows:

1. **Backdrop Canvas:** Dark midnight navy (`#081323`) infused with a subtle radial gradient radiating from the center-top (`#11284A`), overlaid with an SVG Moroccan star-polygon trellis at 4% opacity.
2. **Surface Containers (Cards & Panels):** Rendered in tinted deep navy (`#11284A`) or warm ivory (`#FDFBF7`) depending on context. Surfaces use translucent borders: `1px solid rgba(212, 175, 55, 0.2)` (refined gold keyline) or `1px solid rgba(255, 255, 255, 0.08)`.
3. **Ambient Glow & Drop Shadows:**
   - **Resting:** `0 8px 24px -4px rgba(4, 10, 20, 0.5)`
   - **Floating / Active:** `0 16px 36px -6px rgba(4, 10, 20, 0.7), 0 0 16px rgba(212, 175, 55, 0.15)` (ambient gold halo).
4. **Moroccan Corner Accents:** Hero cards and modal headers use corner brackets inspired by Moroccan architectural arches (al-aqwas), subtly framing content with 1px gold hairline borders.

## Shapes

The design uses **Soft roundedness (Level 1)**:
- Standard elements (buttons, form inputs, list items): `0.25rem` (4px).
- Containers, question panels, leaderboard cards: `0.5rem` (8px).
- Modal dialogues and elevated banners: `0.75rem` (12px).

This slight curve softens modern digital geometry while preserving the crisp, chiseled precision intrinsic to Moroccan plaster carving (gebs) and hand-cut zellige tilework. Circular radii (`border-radius: 9999px`) are strictly reserved for score badges, medal icons, avatar chips, and step progression dots.

## Components

### Buttons & Interactive CTAs
- **Primary CTA (National Crimson):** Solid `#C1272D` background, text in `#FDFBF7`, gold hairline border (`1px solid rgba(212, 175, 55, 0.4)`). Hover state brightens to `#D32F2F` with a soft gold focus ring.
- **Secondary Action (Emerald Star):** Solid `#006233` or `#059669` fill for confirmations, completion flows, and positive validation.
- **Tertiary / Outline Button:** Transparent background, `1px solid #D4AF37`, text in `#D4AF37`. Hover state transitions to `rgba(212, 175, 55, 0.1)`.

### Quiz Cards & Question Options
- **Question Container:** Tinted navy panel (`#11284A`) with subtle top-to-bottom gold keyline gradient.
- **Option Tiles:** Large interactive cards with left-aligned indices (A, B, C, D) inside circular badges.
  - *Default:* Navy surface (`#1A3761`) with low-contrast border.
  - *Selected:* Border `#D4AF37`, background `rgba(212, 175, 55, 0.15)`.
  - *Correct:* Border `#059669`, background `rgba(5, 150, 105, 0.2)`, emerald checkmark icon.
  - *Incorrect:* Border `#B91C1C`, background `rgba(185, 28, 28, 0.2)`, crimson cross icon.

### Leaderboard & Cultural Medals
- **Podium Tier (Top 3):**
  - **1st Place:** Gold badge (`#D4AF37`), subtle illuminated crown ring, gilded perimeter border.
  - **2nd Place:** Burnished silver (`#CBD5E1`) border with navy backdrop.
  - **3rd Place:** Warm bronze (`#CD7F32`) border.
- **Row Items:** Alternating subtle navy tints (`rgba(17, 40, 74, 0.6)`), fixed tabular layout with mono-aligned numerical scores, participant avatar, and national rank badge.

### Cultural Borders & Frame Dividers
- Section dividers incorporate an inline 8-pointed star motif centered between dual hairline gold lines (`rgba(212, 175, 55, 0.3)`).
- Card corners on major editorial articles feature discreet Moroccan geometrical knot motifs (4% to 12% opacity) without obscuring text.

### Inputs & Form Controls
- Input fields use `#0C1E38` background, `#BAC7D5` placeholder, `1px solid rgba(212, 175, 55, 0.3)` rest state, transitioning to `#D4AF37` focus state with `0 0 0 3px rgba(212, 175, 55, 0.2)`.