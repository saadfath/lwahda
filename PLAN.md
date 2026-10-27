# TAWḤDA — Implementation Plan

> **For OpenCode:** Execute every phase in order. Each task has explicit files, acceptance criteria, and a verification command. Do not skip tasks. Do not write app code before Phase 1 is complete. Never place `quiz-answers.sql` inside `src/` or `public/`.

---

## 0. Stack Decision

**Chosen stack:** Vite + React 18 + TypeScript + React Router v6 + Tailwind CSS v3 + `@supabase/supabase-js` v2.

**Why:** Vite gives near-instant HMR for a phone-centric event app. React Router v6 handles the four routes with nested layouts. Tailwind's JIT purges unused styles for a tiny bundle. Supabase provides Postgres + RLS + Realtime + Edge Functions in one hosted service with a generous free tier, eliminating any custom backend. Deployable to Vercel or Netlify with zero config.

**Node requirement:** ≥ 18.

---

## 1. Asset Mapping Table

| File (under `assets/`) | Destination in project | Used on |
|---|---|---|
| `logos/cmcbmk.png` | `public/logos/cmcbmk.png` | Navbar — all pages |
| `logos/youth5.png` | `public/logos/youth5.png` | Navbar — all pages |
| `logos/e-cmc.png` | `public/logos/e-cmc.png` | Navbar — all pages |
| *(fablob logo — missing)* | Text chip `fablap` fallback | Navbar — all pages |
| *(icebear logo — missing)* | Text chip `icebear` fallback | Navbar — all pages |
| `pages backgrouds/_ (2).jpeg` | `public/bg/hero-home.jpeg` | `/` hero full-bleed |
| `pages backgrouds/_ (1).jpeg` | `public/bg/hero-info.jpeg` | `/informations` hero |
| `pages backgrouds/_.jpeg` | `public/bg/accent-zellige.jpeg` | `/informations` section accent |
| `pages backgrouds/10 Mistakes People Make When They Visit Morocco.jpeg` | `public/bg/quiz-bg.jpeg` | `/quiz` page background |
| `pages backgrouds/The BEST Things to Do in Taroudant - Top Activities in 2026 _ GetYourGuide.jpeg` | `public/bg/leaderboard-bg.jpeg` | `/leaderboard` page background |
| `home.ar.json` | `src/data/home.ar.json` | `/` |
| `home.fr.json` | `src/data/home.fr.json` | `/` |
| `info.ar.json` | `src/data/info.ar.json` | `/informations` |
| `info.fr.json` | `src/data/info.fr.json` | `/informations` |
| `quiz.questions.json` | `src/data/quiz.questions.json` | `/quiz` (questions only, no answers) |
| `quiz-answers.sql` | `supabase/seed/quiz-answers.sql` | Server-side seed only — **never in `src/` or `public/`** |
| `color plate/moroccan-color-palette.md` | Reference for `tailwind.config.ts` | Design token source |
| `desing and ui inspration apple/apple-DESIGN.md` | Reference for components | Design system source |

---

## 2. Design System

### 2.1 Color Tokens (Tailwind extend)

```ts
// tailwind.config.ts — colors.extend
midnight:   '#0B1F4B',   // page base, dark tile bg
dusk:       '#1D4FB8',   // secondary bg, progress bar fill
amber:      '#F2A93B',   // primary CTA, accent — the ONE interactive color
gold:       '#D98A1F',   // CTA hover / active, borders
terracotta: '#4A2418',   // dark surfaces, footer, card dark bg
cream:      '#F6E7CB',   // cards, light section bg, body text on dark
teal:       '#1F9A94',   // highlights, links, icons, timer ring
ink:        '#1A1209',   // body text on light backgrounds
```

### 2.2 Typography

Font: **Inter** (Google Fonts, variable, weights 300/400/600/700). Loaded via `<link>` in `index.html`. Inter is the documented substitute for SF Pro.

| Token class | Size | Weight | Line-height | Letter-spacing | Usage |
|---|---|---|---|---|---|
| `.t-hero` | 56px / 3.5rem | 600 | 1.07 | -0.28px | Home hero H1 |
| `.t-display` | 40px / 2.5rem | 600 | 1.10 | -0.02em | Section H2 |
| `.t-section` | 34px / 2.125rem | 600 | 1.47 | -0.374px | Info page H2 |
| `.t-lead` | 28px / 1.75rem | 400 | 1.14 | 0 | Hero subtitle |
| `.t-tagline` | 21px / 1.313rem | 600 | 1.19 | 0.231px | Sub-headings, navbar brand |
| `.t-body` | 17px / 1.0625rem | 400 | 1.47 | -0.374px | Body paragraphs |
| `.t-caption` | 14px / 0.875rem | 400 | 1.43 | -0.224px | Captions, chips |
| `.t-nav` | 12px / 0.75rem | 400 | 1.0 | -0.12px | Navbar links |

**RTL rule:** Apply `font-feature-settings: 'ss03'` on Inter for Arabic. Direction toggled via `dir` attribute on `<html>`. All layout uses logical CSS properties (`ms-`, `me-`, `ps-`, `pe-`).

### 2.3 Component Tokens

**Button primary (amber pill):**
```css
background: #F2A93B; color: #1A1209;
border-radius: 9999px; padding: 11px 22px;
font-size: 17px; font-weight: 400;
transition: background 150ms; min-height: 44px;
```
Hover/active: `background: #D98A1F; transform: scale(0.97)`.

**Button secondary (ghost pill):**
```css
background: transparent; color: #F2A93B;
border: 1.5px solid #F2A93B; border-radius: 9999px;
padding: 11px 22px; min-height: 44px;
```

**Answer option row (quiz):**
```css
background: rgba(246,231,203,0.07); border: 1.5px solid rgba(246,231,203,0.18);
border-radius: 11px; padding: 14px 20px; min-height: 56px;
color: #F6E7CB; font-size: 17px; cursor: pointer;
```
Selected: `border-color: #F2A93B; background: rgba(242,169,59,0.15)`.
Correct (revealed): `border-color: #1F9A94; background: rgba(31,154,148,0.18)`.
Wrong (revealed): `border-color: #c0392b; background: rgba(192,57,43,0.15)`.

**Leaderboard row:**
```css
background: rgba(246,231,203,0.06); border: 1px solid rgba(246,231,203,0.12);
border-radius: 8px; padding: 12px 16px; display: flex; align-items: center;
```
Rank 1/2/3: left border 3px solid amber/cream/teal respectively.

**Navbar:**
```css
background: rgba(11,31,75,0.88); backdrop-filter: blur(20px) saturate(180%);
height: 56px; position: sticky; top: 0; z-index: 50;
```

**Timer ring:** SVG circle, stroke `#1F9A94`, animated via `stroke-dashoffset`. Turns `#F2A93B` at ≤ 7s, `#c0392b` at ≤ 3s.

### 2.4 Overlay gradient for full-bleed backgrounds
```css
background: linear-gradient(180deg, rgba(11,31,75,0.55) 0%, rgba(74,36,24,0.72) 100%),
            url("<image>") center/cover no-repeat;
```
Ensures `--cream` text is legible over all five background images.

### 2.5 Zellige decorative pattern
A faint `background-image: repeating-conic-gradient(...)` or SVG tile at 6% opacity in `--teal` on dark section headers. Used as a texture — never as the primary background.

---

## 3. Folder Structure

```
/home/icebear/code/cmc-shit/
├── public/
│   ├── logos/
│   │   ├── cmcbmk.png
│   │   ├── youth5.png
│   │   └── e-cmc.png
│   └── bg/
│       ├── hero-home.jpeg
│       ├── hero-info.jpeg
│       ├── accent-zellige.jpeg
│       ├── quiz-bg.jpeg
│       └── leaderboard-bg.jpeg
├── src/
│   ├── main.tsx
│   ├── App.tsx
│   ├── i18n/
│   │   ├── index.ts           # useTranslation hook, localStorage persist
│   │   └── types.ts           # Lang = 'ar' | 'fr'
│   ├── data/
│   │   ├── home.ar.json
│   │   ├── home.fr.json
│   │   ├── info.ar.json
│   │   ├── info.fr.json
│   │   └── quiz.questions.json
│   ├── lib/
│   │   └── supabase.ts        # createClient with anon key only
│   ├── hooks/
│   │   ├── useLanguage.ts
│   │   ├── useLeaderboard.ts
│   │   └── useQuizAttempt.ts
│   ├── components/
│   │   ├── Navbar.tsx
│   │   ├── LanguageSwitcher.tsx
│   │   ├── ImageCarousel.tsx
│   │   ├── Timeline.tsx
│   │   ├── KeyFacts.tsx
│   │   ├── Sources.tsx
│   │   ├── QuizQuestion.tsx
│   │   ├── TimerRing.tsx
│   │   ├── LeaderboardRow.tsx
│   │   └── QRCodeDisplay.tsx
│   ├── pages/
│   │   ├── Home.tsx
│   │   ├── Informations.tsx
│   │   ├── Quiz.tsx           # orchestrates registration → questions → result
│   │   └── Leaderboard.tsx
│   └── index.css              # Tailwind directives + CSS custom props
├── supabase/
│   ├── migrations/
│   │   ├── 20261027000001_create_tables.sql
│   │   ├── 20261027000002_rls_policies.sql
│   │   └── 20261027000003_rpc_functions.sql
│   └── seed/
│       └── quiz-answers.sql   # NEVER in src/ or public/
├── .env.example
├── .env.local                 # gitignored
├── index.html
├── tailwind.config.ts
├── vite.config.ts
├── tsconfig.json
└── package.json
```

---

## 4. Phased Task List

---

### Phase 1 — Scaffold

#### Task 1.1 — Initialize project

**Goal:** Create the Vite + React + TS project, install all dependencies, copy assets to correct public paths.

**Files to create/edit:**
- `package.json`, `vite.config.ts`, `tsconfig.json`, `index.html`, `src/main.tsx`, `src/App.tsx`, `src/index.css`
- All `public/` asset copies (logos + backgrounds)

**Steps:**
```bash
npm create vite@latest . -- --template react-ts
npm install react-router-dom @supabase/supabase-js qrcode.react
npm install -D tailwindcss@3 postcss autoprefixer
npx tailwindcss init -p
```

Copy assets:
```bash
mkdir -p public/logos public/bg
cp "assets/logos/cmcbmk.png"   public/logos/cmcbmk.png
cp "assets/logos/youth5.png"   public/logos/youth5.png
cp "assets/logos/e-cmc.png"    public/logos/e-cmc.png
cp "assets/pages backgrouds/_ (2).jpeg"  "public/bg/hero-home.jpeg"
cp "assets/pages backgrouds/_ (1).jpeg"  "public/bg/hero-info.jpeg"
cp "assets/pages backgrouds/_.jpeg"      "public/bg/accent-zellige.jpeg"
cp "assets/pages backgrouds/10 Mistakes People Make When They Visit Morocco.jpeg" "public/bg/quiz-bg.jpeg"
cp "assets/pages backgrouds/The BEST Things to Do in Taroudant - Top Activities in 2026 _ GetYourGuide.jpeg" "public/bg/leaderboard-bg.jpeg"
```

Copy data:
```bash
mkdir -p src/data supabase/seed supabase/migrations
cp assets/home.ar.json    src/data/home.ar.json
cp assets/home.fr.json    src/data/home.fr.json
cp assets/info.ar.json    src/data/info.ar.json
cp assets/info.fr.json    src/data/info.fr.json
cp assets/quiz.questions.json src/data/quiz.questions.json
cp assets/quiz-answers.sql    supabase/seed/quiz-answers.sql
```

**`tailwind.config.ts`** must include:
```ts
content: ['./index.html', './src/**/*.{ts,tsx}'],
theme: {
  extend: {
    colors: {
      midnight: '#0B1F4B',
      dusk: '#1D4FB8',
      amber: '#F2A93B',
      gold: '#D98A1F',
      terracotta: '#4A2418',
      cream: '#F6E7CB',
      teal: '#1F9A94',
      ink: '#1A1209',
    },
    fontFamily: {
      sans: ['Inter', 'system-ui', '-apple-system', 'sans-serif'],
    },
  },
},
```

**`index.html`** `<head>` must include:
```html
<link rel="preconnect" href="https://fonts.googleapis.com" />
<link href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;600;700&display=swap" rel="stylesheet" />
```

**`.env.example`:**
```
VITE_SUPABASE_URL=https://your-project.supabase.co
VITE_SUPABASE_ANON_KEY=your-anon-key-here
VITE_PUBLIC_SITE_URL=https://your-domain.com
```

**`.gitignore`** must contain `.env.local` and `supabase/.env`.

**Acceptance criteria:**
- `npm run dev` starts without errors.
- `http://localhost:5173` renders a blank page (no 404, no console errors).
- `public/logos/cmcbmk.png` is accessible at `/logos/cmcbmk.png`.
- `src/data/quiz.questions.json` exists; `supabase/seed/quiz-answers.sql` is NOT under `src/` or `public/`.
- No answer keys or service role keys appear in any file under `src/` or `public/`.

**Verify:** `ls public/logos public/bg src/data supabase/seed && npm run build 2>&1 | grep -c "error"` must print `0`.

---

#### Task 1.2 — Router skeleton

**Goal:** Four routes render placeholder `<h1>` pages; RTL/LTR switching works; language persists across refresh.

**Files:** `src/App.tsx`, `src/i18n/index.ts`, `src/i18n/types.ts`, `src/hooks/useLanguage.ts`, `src/lib/supabase.ts`

**`src/i18n/types.ts`:**
```ts
export type Lang = 'ar' | 'fr';
```

**`src/hooks/useLanguage.ts`:**
```ts
import { useState, useEffect } from 'react';
import type { Lang } from '../i18n/types';

const STORAGE_KEY = 'tawhda_lang';

export function useLanguage() {
  const [lang, setLang] = useState<Lang>(() => {
    return (localStorage.getItem(STORAGE_KEY) as Lang) ?? 'fr';
  });

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, lang);
    document.documentElement.lang = lang;
    document.documentElement.dir = lang === 'ar' ? 'rtl' : 'ltr';
  }, [lang]);

  return { lang, setLang };
}
```

**`src/lib/supabase.ts`:**
```ts
import { createClient } from '@supabase/supabase-js';

const url  = import.meta.env.VITE_SUPABASE_URL  as string;
const anonKey = import.meta.env.VITE_SUPABASE_ANON_KEY as string;

if (!url || !anonKey) {
  throw new Error('Missing Supabase env vars. Copy .env.example to .env.local and fill them in.');
}

export const supabase = createClient(url, anonKey);
```

**`src/App.tsx`:**
```tsx
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { useLanguage } from './hooks/useLanguage';
import Navbar from './components/Navbar';
import Home from './pages/Home';
import Informations from './pages/Informations';
import Quiz from './pages/Quiz';
import Leaderboard from './pages/Leaderboard';

export default function App() {
  const { lang, setLang } = useLanguage();
  return (
    <BrowserRouter>
      <Navbar lang={lang} setLang={setLang} />
      <Routes>
        <Route path="/"              element={<Home lang={lang} />} />
        <Route path="/informations"  element={<Informations lang={lang} />} />
        <Route path="/quiz"          element={<Quiz lang={lang} />} />
        <Route path="/leaderboard"   element={<Leaderboard lang={lang} />} />
      </Routes>
    </BrowserRouter>
  );
}
```

**Acceptance criteria:**
- Navigating to `/`, `/informations`, `/quiz`, `/leaderboard` all render without crashing.
- Switching language via a toggle changes `<html dir>` and persists after hard reload.
- No TypeScript errors (`npm run build` exits 0).

---

### Phase 2 — Design System & Shared Components

#### Task 2.1 — Navbar

**Goal:** Sticky navbar matching wireframe: "tawahda" brand text + 5 partner chips + AR/FR switcher.

**File:** `src/components/Navbar.tsx`

**Layout (matches wireframe Screenshot 21:26):**
- Left: "TAWḤDA" text in `--cream`, font-size 21px, font-weight 600.
- Center: Five pill chips in a horizontal scroll row:
  1. `<img src="/logos/cmcbmk.png" alt="CMC BMK" />` chip — show image, label "cmc bmk"
  2. `<img src="/logos/e-cmc.png"  alt="e-CMC" />` chip — show image, label "c-cmc"
  3. `<img src="/logos/youth5.png" alt="Youth 5.0" />` chip — show image, label "youth5"
  4. Text-only chip "fablap" (no image file exists — use text fallback, do NOT throw)
  5. Text-only chip "icebear" (no image file exists — use text fallback)
- Right: Language toggle button `AR | FR` — pill button, active lang highlighted in `--amber`.

**Chip style:**
```css
border: 1px solid rgba(246,231,203,0.25);
border-radius: 9999px; padding: 4px 10px;
font-size: 12px; color: #F6E7CB;
display: flex; align-items: center; gap: 6px;
```
Logo images inside chips: `height: 18px; width: auto; object-fit: contain`.

**Mobile (< 640px):** Brand text + language toggle visible; chips hidden behind a horizontal scroll container with `overflow-x: auto; scrollbar-width: none`.

**Acceptance criteria:**
- All five chips render without JS errors (text fallback for fablap/icebear).
- Three logos load from `/logos/`.
- Active language chip is amber-highlighted.
- Sticky at top across all pages.

---

#### Task 2.2 — ImageCarousel

**Goal:** Reusable carousel with dot pagination for the home/info left panel.

**File:** `src/components/ImageCarousel.tsx`

**Props:**
```ts
interface CarouselProps {
  images: { src: string; alt: string }[];
  autoPlayMs?: number; // default 4000
}
```

**Behavior:**
- Auto-advances every `autoPlayMs` ms.
- Dot indicators below image; clicking a dot jumps to that slide.
- Touch swipe support: track `touchstart`/`touchend`, swipe distance > 40px triggers next/prev.
- Images: `object-fit: cover`, `aspect-ratio: 4/3`, `border-radius: 11px`.

**Acceptance criteria:**
- Renders with 1–5 images without crashing.
- Dots update on slide change.
- Auto-play pauses on mouse hover (desktop).

---

#### Task 2.3 — Timeline component

**File:** `src/components/Timeline.tsx`

**Props:**
```ts
interface TimelineProps {
  items: { id: string; date: string; title: string; description?: string }[];
  lang: Lang;
}
```

**Layout:** Vertical line (2px `--teal`), alternating left/right on desktop, single column on mobile. Each node: amber circle dot, date in `--teal` caption size, title in body-strong, optional description in body.

**Acceptance criteria:** Renders all 6 timeline items from `info.ar.json` / `info.fr.json` without layout overflow at 360px viewport width.

---

### Phase 3 — Pages

#### Task 3.1 — Home page (`/`)

**File:** `src/pages/Home.tsx`

**Data source:** `src/data/home.{lang}.json` — import both, select by `lang` prop.

**Layout (two-panel on ≥ 768px, stacked on mobile):**

```
┌─────────────────────────────────────────────────────────────┐
│  HERO: full-bleed public/bg/hero-home.jpeg + gradient overlay│
│  Eyebrow text (cream, caption)                               │
│  H1: hero.title  (cream, t-hero)                             │
│  Subtitle (cream, t-lead)                                    │
│  Date label (teal, tagline)                                  │
│  [Amber pill: primaryCta] [Ghost pill: secondaryCta]         │
└─────────────────────────────────────────────────────────────┘
┌──────────────────────┬──────────────────────────────────────┐
│  ImageCarousel       │  introduction.title (t-section)      │
│  (left, 45%)         │  introduction.paragraphs (t-body)    │
│                      │  highlights cards (3 cards, --cream  │
│                      │  bg, --ink text, teal border-left)   │
└──────────────────────┴──────────────────────────────────────┘
┌─────────────────────────────────────────────────────────────┐
│  Timeline preview (timelinePreview — 4 items)                │
│  CTA → /informations (see full timeline)                     │
└─────────────────────────────────────────────────────────────┘
┌─────────────────────────────────────────────────────────────┐
│  Quiz promo tile (dark tile, --terracotta bg)                │
│  quizPromotion.title + description                           │
│  [Amber pill CTA → /quiz]                                    │
└─────────────────────────────────────────────────────────────┘
```

**Hero image wiring:** `hero.image.src` is `null` in the JSON. Hardcode `src="/bg/hero-home.jpeg"` in this component. Use `hero.image.altFr` / `hero.image.altAr` for the `alt` attribute based on `lang`.

**ImageCarousel images for home left panel:** Use the five background images as a showcase carousel:
```ts
const carouselImages = [
  { src: '/bg/hero-home.jpeg',    alt: lang === 'ar' ? 'مسجد الحسن الثاني' : 'Mosquée Hassan II au coucher du soleil' },
  { src: '/bg/hero-info.jpeg',    alt: lang === 'ar' ? 'فناء رياض مغربي'   : 'Riad marocain' },
  { src: '/bg/accent-zellige.jpeg', alt: lang === 'ar' ? 'زليج مغربي'      : 'Zellige marocain' },
  { src: '/bg/quiz-bg.jpeg',      alt: lang === 'ar' ? 'مسجد الحسن الثاني' : 'Mosquée Hassan II' },
  { src: '/bg/leaderboard-bg.jpeg', alt: lang === 'ar' ? 'أسوار تارودانت'  : 'Remparts de Taroudant' },
];
```

**Acceptance criteria:**
- All sections render in both `lang='ar'` (RTL) and `lang='fr'` (LTR).
- Hero overlay makes H1 legible (contrast ≥ 4.5:1 against cream text).
- Page loads in < 3 s on throttled 3G (Lighthouse).
- No content claims paid-holiday status or decree entry-into-force date.

---

#### Task 3.2 — Informations page (`/informations`)

**File:** `src/pages/Informations.tsx`

**Data source:** `src/data/info.{lang}.json`

**Layout:**
```
┌─────────────────────────────────────────────────────────────┐
│  HERO: public/bg/hero-info.jpeg + overlay                    │
│  pageHeader.eyebrow (teal, caption)                          │
│  pageHeader.title (cream, t-display)                         │
│  pageHeader.introduction (cream, t-lead)                     │
└─────────────────────────────────────────────────────────────┘
┌─────────────────────────────────────────────────────────────┐
│  KeyFacts grid (2-col on ≥ 768, 1-col mobile)               │
│  9 keyFacts items — cream card, teal label, ink value        │
└─────────────────────────────────────────────────────────────┘
┌─────────────────────────────────────────────────────────────┐
│  Article sections (sections array — 8 sections)              │
│  Each: h2 (t-section, --cream), paragraphs (t-body, --cream) │
│  Source badge at end of each section                         │
│  Background: zellige accent image at 8% opacity on dark tile │
└─────────────────────────────────────────────────────────────┘
┌─────────────────────────────────────────────────────────────┐
│  Full Timeline (6 items via Timeline component)              │
└─────────────────────────────────────────────────────────────┘
┌─────────────────────────────────────────────────────────────┐
│  Sources list (10 sources — linked, caption size)            │
└─────────────────────────────────────────────────────────────┘
┌─────────────────────────────────────────────────────────────┐
│  Closing section + CTA → /quiz                               │
└─────────────────────────────────────────────────────────────┘
```

**Acceptance criteria:**
- All 8 sections, 9 keyFacts, 6 timeline items, 10 sources render.
- "Explication pédagogique" / "شرح تعليمي" paragraphs visually distinguished (left border 3px `--teal`, italic, slightly muted).
- Page RTL-correct at 360px.

---

#### Task 3.3 — Quiz page (`/quiz`)

**File:** `src/pages/Quiz.tsx`

**Background:** `public/bg/quiz-bg.jpeg` + overlay, full-bleed behind the quiz card.

The quiz has three internal screens managed by a `quizScreen` state: `'register' | 'playing' | 'result'`.

##### Screen A — Registration

**Fields (all required):**
| Field | Type | Validation |
|---|---|---|
| `fullName` | text input | trimmed length 2–60 chars, no HTML |
| `className` | text input | trimmed length 1–40 chars |
| `yearOfStudy` | radio | exactly one of: `1ère année` / `2ème année` / `3ème année` |

On submit: call `supabase.rpc('start_attempt', { p_full_name, p_class_name, p_year_of_study })`.
The RPC returns `{ attempt_id: uuid }`. Store in component state. Transition to `'playing'`.

**Validation rules (client-side):**
- Trim whitespace before validation.
- Reject if any field empty after trim.
- `fullName` max 60 chars; `className` max 40 chars.
- Show inline error message per field on submit failure.

##### Screen B — Playing

**State:**
```ts
{
  currentIndex: number;   // 0–9
  attemptId: string;
  answers: Record<string, string>; // questionId → optionId (client display only)
  secondsLeft: number;   // counts down from 20
  isSubmitting: boolean;
}
```

**Per-question flow:**
1. Display question `questions[currentIndex]` with `TimerRing` (20 s countdown).
2. Timer counts down in the browser. The server measures actual elapsed time via `submitted_at - started_at` columns — the client timer is display-only and does NOT send the time value.
3. On option select: highlight selected option. Lock input (no re-selection).
4. On "Next" button click (or when timer hits 0): call `supabase.rpc('submit_answer', { p_attempt_id, p_question_id, p_option_id })`. `p_option_id` is `null` if timer expired without selection.
5. Advance to next question. If last question, call `supabase.rpc('finish_attempt', { p_attempt_id })`. Transition to `'result'`.

**Progress indicator:** "Question 3 / 10" above the question box. Linear progress bar below navbar.

**Handle disconnect/refresh:** On page load, if `localStorage.getItem('tawhda_attempt_id')` exists, call `supabase.rpc('get_attempt_status', { p_attempt_id })`. If status is `'in_progress'`, resume from the last unanswered question. If status is `'finished'` or `'invalidated'`, clear localStorage and show registration screen. Store `attemptId` in localStorage on `start_attempt` success; clear it on `finish_attempt` success.

##### Screen C — Result

**Data source:** `finish_attempt` RPC response:
```ts
{
  score: number;
  correct_count: number;
  total_time_seconds: number;
  rank: number;
}
```

Display: score (large amber number), correct_count / 10, total time, rank. Two buttons: "Voir le classement / رؤية الترتيب" → `/leaderboard`; "Rejouer / اللعب مجددا" → resets to registration screen.

**Acceptance criteria:**
- Registration form rejects empty / too-long inputs with visible error messages.
- Timer ring counts down visually; option auto-submits as null on expiry.
- Answer options are locked after selection; no double-submission.
- Network tab in DevTools shows no answer keys in any response from Supabase.
- Refresh mid-quiz resumes from last unanswered question (not restarting from q01).

---

#### Task 3.4 — Leaderboard page (`/leaderboard`)

**File:** `src/pages/Leaderboard.tsx`

**Background:** `public/bg/leaderboard-bg.jpeg` + overlay.

**Layout (matches wireframe Screenshot 21:24):**
```
┌─────────────────────────────────────────────────────────────┐
│  "Classement / الترتيب" — t-display, cream                  │
│  Subtitle: "Meilleure tentative par joueur"                  │
└─────────────────────────────────────────────────────────────┘
┌────────────────────────┬────────────────────────────────────┐
│  Leaderboard list      │  QR Code (large, ≥ 240px)          │
│  (max 50 rows)         │  Points to VITE_PUBLIC_SITE_URL/quiz│
│  Each row:             │  Label: "Scanner pour jouer"        │
│  Rank | Name | Class   │  Generated client-side via          │
│  Year | Score          │  qrcode.react <QRCodeSVG>           │
└────────────────────────┴────────────────────────────────────┘
```

**Data source:** `supabase.rpc('get_leaderboard')` — returns rows `{ rank, full_name, class_name, year_of_study, score, correct_count, total_time_seconds }`.

**Realtime:** Subscribe to `supabase.channel('leaderboard').on('postgres_changes', { event: '*', schema: 'public', table: 'attempts' }, () => refetch())`. Fallback: if Realtime fails to connect within 5 s, poll every 10 s via `setInterval`.

**QR code:**
```tsx
import { QRCodeSVG } from 'qrcode.react';
const siteUrl = import.meta.env.VITE_PUBLIC_SITE_URL ?? window.location.origin;
<QRCodeSVG value={`${siteUrl}/quiz`} size={256} fgColor="#F6E7CB" bgColor="#0B1F4B" />
```

**Acceptance criteria:**
- QR code renders and encodes the correct `/quiz` URL using `VITE_PUBLIC_SITE_URL`.
- Leaderboard auto-updates when a new `finish_attempt` completes (within 10 s).
- Only `full_name`, `class_name`, `year_of_study`, `score`, `correct_count`, `total_time_seconds`, `rank` are returned — no `attempt_id`, no `answer_*` fields.
- Page usable on a projector at 1080p (QR ≥ 240px, text ≥ 21px).

---

### Phase 4 — Database via Supabase MCP

> **OpenCode instruction:** Use the Supabase MCP (`mcp__supabase__*` tools) for ALL database operations. Do NOT write ad-hoc SQL in the terminal. Apply changes via versioned migration files. Confirm each step before proceeding.

#### Task 4.1 — Connect or create Supabase project

**Steps:**
1. Call `mcp__supabase__list_projects`. If a project named `tawhda` exists, use it. Otherwise call `mcp__supabase__create_project` with name `tawhda`, region `eu-west-1` (closest to Morocco), confirm the database password.
2. Retrieve the project's `url` and `anon_key` from the MCP response.
3. Write them to `.env.local` as `VITE_SUPABASE_URL` and `VITE_SUPABASE_ANON_KEY`.
4. Set `VITE_PUBLIC_SITE_URL=http://localhost:5173` in `.env.local` for local dev.

**Acceptance criteria:** `supabase.from('players').select('count')` returns without a connection error.

---

#### Task 4.2 — Migration 1: Create tables

**File:** `supabase/migrations/20261027000001_create_tables.sql`

```sql
-- =============================================================================
-- Migration 1: Create tables for TAWḤDA quiz
-- =============================================================================

-- answer_keys: populated by seed/quiz-answers.sql. No anon/authenticated access.
create table if not exists public.answer_keys (
  question_id       text primary key,
  correct_option_id text not null check (correct_option_id in ('a','b','c','d')),
  explanation_ar    text not null,
  explanation_fr    text not null,
  source_ids        text[] not null default '{}'
);

-- players: one row per registration (not per attempt)
create table if not exists public.players (
  id               uuid primary key default gen_random_uuid(),
  full_name        text not null check (char_length(trim(full_name)) between 2 and 60),
  class_name       text not null check (char_length(trim(class_name)) between 1 and 40),
  year_of_study    text not null check (year_of_study in ('1ère année','2ème année','3ème année')),
  created_at       timestamptz not null default now()
);

-- attempts: one row per quiz attempt
create table if not exists public.attempts (
  id                   uuid primary key default gen_random_uuid(),
  player_id            uuid not null references public.players(id) on delete cascade,
  status               text not null default 'in_progress'
                         check (status in ('in_progress','finished','invalidated')),
  score                integer,             -- null until finished
  correct_count        integer,             -- null until finished
  total_time_seconds   numeric(8,3),        -- null until finished; server-computed
  started_at           timestamptz not null default now(),
  finished_at          timestamptz,
  constraint attempts_score_range check (score is null or score between 0 and 2000)
);

-- question_answers: one row per question per attempt
create table if not exists public.question_answers (
  id                uuid primary key default gen_random_uuid(),
  attempt_id        uuid not null references public.attempts(id) on delete cascade,
  question_id       text not null,
  option_id         text     check (option_id in ('a','b','c','d')),  -- null = timed out
  is_correct        boolean, -- null until graded
  time_taken_seconds numeric(8,3), -- server-computed: submitted_at - attempt started_at per question
  submitted_at      timestamptz not null default now(),
  constraint question_answers_unique unique (attempt_id, question_id)
);

-- Indexes
create index on public.attempts (player_id);
create index on public.attempts (status, score desc, total_time_seconds asc, finished_at asc);
create index on public.question_answers (attempt_id);
```

**Apply:** Call `mcp__supabase__apply_migration` with the content above and name `create_tables`.

**Acceptance criteria:** All four tables exist. `\dt public.*` shows `answer_keys`, `players`, `attempts`, `question_answers`.

---

#### Task 4.3 — Migration 2: RLS policies

**File:** `supabase/migrations/20261027000002_rls_policies.sql`

```sql
-- =============================================================================
-- Migration 2: Enable RLS on all tables
-- =============================================================================

alter table public.answer_keys    enable row level security;
alter table public.players        enable row level security;
alter table public.attempts       enable row level security;
alter table public.question_answers enable row level security;

-- answer_keys: NO policy for anon or authenticated.
-- Only SECURITY DEFINER functions (service role context) can read this table.
-- (Deliberately no CREATE POLICY statement — zero policies = zero access for all roles.)

-- players: anon can INSERT only (to register). Cannot read other players.
create policy "players_insert_anon"
  on public.players for insert
  to anon
  with check (
    char_length(trim(full_name)) between 2 and 60
    and char_length(trim(class_name)) between 1 and 40
    and year_of_study in ('1ère année','2ème année','3ème année')
  );

-- attempts: anon cannot directly read or write — all access via RPCs.
-- (No direct policies. RPCs run as SECURITY DEFINER = service role context.)

-- question_answers: same — no direct anon access.

-- Service role (used by RPCs) bypasses RLS entirely (Supabase default).
```

**Apply:** `mcp__supabase__apply_migration` with name `rls_policies`.

**Acceptance criteria:**
- `supabase.from('answer_keys').select('*')` with the anon key returns a 0-row result (RLS blocks it, not an error — an empty result is acceptable; a 403 is also acceptable).
- `supabase.from('attempts').select('*')` with anon key returns 0 rows.

---

#### Task 4.4 — Migration 3: RPC functions

**File:** `supabase/migrations/20261027000003_rpc_functions.sql`

```sql
-- =============================================================================
-- Migration 3: RPC functions (all SECURITY DEFINER)
-- =============================================================================

-- ─── start_attempt ───────────────────────────────────────────────────────────
-- Creates a player and an attempt. Returns attempt_id.
-- Rate limit: max 5 in-progress or finished attempts per (full_name, class_name)
-- in the last 24 hours. Prevents flooding.
create or replace function public.start_attempt(
  p_full_name     text,
  p_class_name    text,
  p_year_of_study text
)
returns json
language plpgsql
security definer
set search_path = public
as $$
declare
  v_player_id   uuid;
  v_attempt_id  uuid;
  v_count       int;
begin
  -- Input sanitization
  p_full_name     := trim(p_full_name);
  p_class_name    := trim(p_class_name);
  p_year_of_study := trim(p_year_of_study);

  if char_length(p_full_name) < 2 or char_length(p_full_name) > 60 then
    raise exception 'invalid_full_name' using errcode = 'P0001';
  end if;
  if char_length(p_class_name) < 1 or char_length(p_class_name) > 40 then
    raise exception 'invalid_class_name' using errcode = 'P0001';
  end if;
  if p_year_of_study not in ('1ère année','2ème année','3ème année') then
    raise exception 'invalid_year_of_study' using errcode = 'P0001';
  end if;

  -- Rate limit: max 5 attempts per player identity in 24 h
  select count(*) into v_count
  from public.attempts a
  join public.players  p on p.id = a.player_id
  where lower(trim(p.full_name)) = lower(p_full_name)
    and lower(trim(p.class_name)) = lower(p_class_name)
    and a.started_at > now() - interval '24 hours';

  if v_count >= 5 then
    raise exception 'rate_limit_exceeded' using errcode = 'P0002';
  end if;

  -- Create player row
  insert into public.players (full_name, class_name, year_of_study)
  values (p_full_name, p_class_name, p_year_of_study)
  returning id into v_player_id;

  -- Create attempt row
  insert into public.attempts (player_id, status)
  values (v_player_id, 'in_progress')
  returning id into v_attempt_id;

  return json_build_object('attempt_id', v_attempt_id);
end;
$$;

-- ─── submit_answer ────────────────────────────────────────────────────────────
-- Records one answer. Grades it server-side. Returns is_correct and time_taken.
-- Client never receives the correct answer ID.
create or replace function public.submit_answer(
  p_attempt_id  uuid,
  p_question_id text,
  p_option_id   text  -- null if timed out
)
returns json
language plpgsql
security definer
set search_path = public
as $$
declare
  v_attempt         record;
  v_correct_option  text;
  v_is_correct      boolean;
  v_time_taken      numeric;
  v_already_exists  int;
begin
  -- Validate attempt exists and is in_progress
  select * into v_attempt from public.attempts where id = p_attempt_id;
  if not found then
    raise exception 'attempt_not_found' using errcode = 'P0003';
  end if;
  if v_attempt.status <> 'in_progress' then
    raise exception 'attempt_not_in_progress' using errcode = 'P0003';
  end if;

  -- Prevent duplicate submission for same question
  select count(*) into v_already_exists
  from public.question_answers
  where attempt_id = p_attempt_id and question_id = p_question_id;
  if v_already_exists > 0 then
    raise exception 'already_answered' using errcode = 'P0004';
  end if;

  -- Validate option_id
  if p_option_id is not null and p_option_id not in ('a','b','c','d') then
    raise exception 'invalid_option_id' using errcode = 'P0001';
  end if;

  -- Server-side time measurement (seconds since attempt started)
  v_time_taken := extract(epoch from (now() - v_attempt.started_at));

  -- Grade against answer_keys (client never sees correct_option_id)
  select correct_option_id into v_correct_option
  from public.answer_keys
  where question_id = p_question_id;

  if not found then
    raise exception 'question_not_found' using errcode = 'P0005';
  end if;

  v_is_correct := (p_option_id is not null and p_option_id = v_correct_option);

  -- Insert answer record
  insert into public.question_answers
    (attempt_id, question_id, option_id, is_correct, time_taken_seconds)
  values
    (p_attempt_id, p_question_id, p_option_id, v_is_correct, v_time_taken);

  -- Return only is_correct — never the correct answer
  return json_build_object('is_correct', v_is_correct);
end;
$$;

-- ─── finish_attempt ──────────────────────────────────────────────────────────
-- Computes final score, updates attempt row, returns summary.
-- Score formula per correct answer:
--   base  = 100
--   bonus = floor(100 * max(0, (20 - per_question_time_seconds) / 20))
--   where per_question_time_seconds = time when answer submitted
--         minus time when previous answer was submitted (or attempt started for q01)
-- Wrong answer or timeout = 0 points.
-- Ranking: score DESC, total_time_seconds ASC, finished_at ASC.
create or replace function public.finish_attempt(
  p_attempt_id uuid
)
returns json
language plpgsql
security definer
set search_path = public
as $$
declare
  v_attempt         record;
  v_total_score     integer := 0;
  v_correct_count   integer := 0;
  v_total_time      numeric;
  v_rank            bigint;
  v_ans             record;
  v_prev_time       numeric := 0;
  v_q_time          numeric;
  v_speed_bonus     integer;
begin
  select * into v_attempt from public.attempts where id = p_attempt_id;
  if not found then
    raise exception 'attempt_not_found' using errcode = 'P0003';
  end if;
  if v_attempt.status <> 'in_progress' then
    raise exception 'attempt_not_in_progress' using errcode = 'P0003';
  end if;

  -- Compute total elapsed time
  v_total_time := extract(epoch from (now() - v_attempt.started_at));

  -- Score each answered question in submission order
  for v_ans in
    select qa.is_correct, qa.time_taken_seconds
    from public.question_answers qa
    where qa.attempt_id = p_attempt_id
    order by qa.submitted_at asc
  loop
    -- Per-question time = cumulative time_taken_seconds minus previous cumulative
    v_q_time := v_ans.time_taken_seconds - v_prev_time;
    v_prev_time := v_ans.time_taken_seconds;

    if v_ans.is_correct then
      v_correct_count := v_correct_count + 1;
      -- Speed bonus: 0–100 based on (20 - q_time) / 20, clamped to [0, 100]
      v_speed_bonus := floor(100.0 * greatest(0.0, (20.0 - v_q_time) / 20.0))::integer;
      v_total_score := v_total_score + 100 + v_speed_bonus;
    end if;
  end loop;

  -- Update attempt
  update public.attempts set
    status             = 'finished',
    score              = v_total_score,
    correct_count      = v_correct_count,
    total_time_seconds = v_total_time,
    finished_at        = now()
  where id = p_attempt_id;

  -- Compute rank: count attempts with higher score, or equal score but lower time, or equal score/time but earlier finish
  select count(*) + 1 into v_rank
  from public.attempts
  where status = 'finished'
    and id <> p_attempt_id
    and (
      score > v_total_score
      or (score = v_total_score and total_time_seconds < v_total_time)
      or (score = v_total_score and total_time_seconds = v_total_time and finished_at < now())
    );

  return json_build_object(
    'score',               v_total_score,
    'correct_count',       v_correct_count,
    'total_time_seconds',  v_total_time,
    'rank',                v_rank
  );
end;
$$;

-- ─── get_attempt_status ──────────────────────────────────────────────────────
-- Used by the client on page load to check if a saved attempt_id is resumable.
create or replace function public.get_attempt_status(
  p_attempt_id uuid
)
returns json
language plpgsql
security definer
set search_path = public
as $$
declare
  v_attempt     record;
  v_answered    int;
  v_next_q_idx  int;
begin
  select * into v_attempt from public.attempts where id = p_attempt_id;
  if not found then
    return json_build_object('status', 'not_found');
  end if;

  if v_attempt.status = 'finished' then
    return json_build_object(
      'status',        'finished',
      'score',         v_attempt.score,
      'correct_count', v_attempt.correct_count,
      'total_time_seconds', v_attempt.total_time_seconds
    );
  end if;

  if v_attempt.status = 'invalidated' then
    return json_build_object('status', 'invalidated');
  end if;

  -- in_progress: return how many questions answered so client can resume
  select count(*) into v_answered
  from public.question_answers
  where attempt_id = p_attempt_id;

  v_next_q_idx := v_answered; -- 0-indexed; client maps to questions array

  return json_build_object(
    'status',         'in_progress',
    'next_q_index',   v_next_q_idx
  );
end;
$$;

-- ─── get_leaderboard ─────────────────────────────────────────────────────────
-- Returns the best attempt per player (best score, then fastest, then earliest).
-- Safe fields only — no attempt_id, no answer data.
create or replace function public.get_leaderboard(
  p_limit int default 50
)
returns table (
  rank               bigint,
  full_name          text,
  class_name         text,
  year_of_study      text,
  score              integer,
  correct_count      integer,
  total_time_seconds numeric
)
language sql
security definer
set search_path = public
as $$
  with best_attempts as (
    select
      pl.full_name,
      pl.class_name,
      pl.year_of_study,
      a.score,
      a.correct_count,
      a.total_time_seconds,
      row_number() over (
        partition by pl.full_name, pl.class_name
        order by a.score desc, a.total_time_seconds asc, a.finished_at asc
      ) as rn
    from public.attempts a
    join public.players pl on pl.id = a.player_id
    where a.status = 'finished'
  )
  select
    rank() over (order by score desc, total_time_seconds asc) as rank,
    full_name,
    class_name,
    year_of_study,
    score,
    correct_count,
    total_time_seconds
  from best_attempts
  where rn = 1
  order by score desc, total_time_seconds asc
  limit p_limit;
$$;

-- Grant execute to anon and authenticated roles
grant execute on function public.start_attempt(text,text,text)  to anon, authenticated;
grant execute on function public.submit_answer(uuid,text,text)  to anon, authenticated;
grant execute on function public.finish_attempt(uuid)           to anon, authenticated;
grant execute on function public.get_attempt_status(uuid)       to anon, authenticated;
grant execute on function public.get_leaderboard(int)           to anon, authenticated;
```

**Apply:** `mcp__supabase__apply_migration` with name `rpc_functions`.

**Acceptance criteria:**
- All five RPC functions exist in `public` schema.
- `start_attempt('Test', 'Classe A', '1ère année')` returns `{ attempt_id: "<uuid>" }`.
- `submit_answer('<uuid>', 'q01', 'b')` returns `{ is_correct: true }` (answer b is correct for q01).
- The response from `submit_answer` contains NO field named `correct_option_id` or `explanation_ar` or `explanation_fr`.
- `get_leaderboard()` returns zero rows (no finished attempts yet).

---

#### Task 4.5 — Seed answer keys

**Steps:**
1. Open Supabase SQL editor via `mcp__supabase__execute_sql`.
2. Execute the full content of `supabase/seed/quiz-answers.sql`.
3. Verify: `select count(*) from public.answer_keys` returns `10`.

**Acceptance criteria:**
- `answer_keys` has exactly 10 rows, question_ids q01–q10.
- `select correct_option_id from public.answer_keys where question_id = 'q01'` returns `b`.
- `select * from public.answer_keys` with the **anon key** returns 0 rows (RLS blocks it).

---

#### Task 4.6 — Enable Realtime

**Steps:**
1. Call `mcp__supabase__enable_realtime` for the `attempts` table (or enable via the Supabase dashboard Realtime → Tables).
2. Verify the `Leaderboard.tsx` subscription receives an event when a test `finish_attempt` is called.

---

#### Task 4.7 — Run Supabase Security Advisor

**Steps:**
1. Call `mcp__supabase__run_security_advisor` (or navigate to Supabase dashboard → Security Advisor).
2. Fix every finding. Common expected findings and their fixes:

| Finding | Fix |
|---|---|
| Function with mutable search_path | Already mitigated: all RPCs have `set search_path = public`. |
| Table with RLS enabled but no policies | Expected for `answer_keys`, `attempts`, `question_answers` — document as intentional. Add a SQL comment: `comment on table public.answer_keys is 'No anon policy intentional — access via SECURITY DEFINER RPCs only.';` |
| Leaked service role key | Ensure `.env.local` is in `.gitignore` and not committed. |

**Acceptance criteria:** Security Advisor shows 0 unresolved high-severity findings. Any "informational" findings about intentionally policy-less tables are documented in a comment.

---

### Phase 5 — Game Logic & RPC Integration

#### Task 5.1 — `useQuizAttempt` hook

**File:** `src/hooks/useQuizAttempt.ts`

This hook encapsulates all quiz state and RPC calls so `Quiz.tsx` is purely presentational.

```ts
export interface QuizAttemptState {
  screen: 'register' | 'playing' | 'result';
  attemptId: string | null;
  currentIndex: number;         // 0–9
  selectedOption: string | null; // for current question
  isLocked: boolean;            // true after option selected or timer expired
  isSubmitting: boolean;
  result: { score: number; correct_count: number; total_time_seconds: number; rank: number } | null;
  error: string | null;
}

export interface QuizAttemptActions {
  register: (fullName: string, className: string, yearOfStudy: string) => Promise<void>;
  selectOption: (optionId: string) => void;   // locks immediately, submits async
  advanceOrFinish: () => Promise<void>;       // called by Next button
  timeExpired: () => Promise<void>;           // called by TimerRing when countdown hits 0
  restart: () => void;
}
```

**localStorage keys:** `tawhda_attempt_id` (string uuid), `tawhda_attempt_index` (number).

**On mount:** Check localStorage. If `tawhda_attempt_id` exists, call `get_attempt_status`. Resume or clear as described in Task 3.3.

**Acceptance criteria:** Unit-testable in isolation (mock `supabase.rpc`). All RPC error codes (`P0001`–`P0005`) surface as `error` state strings, never as unhandled exceptions.

---

#### Task 5.2 — TimerRing component

**File:** `src/components/TimerRing.tsx`

```ts
interface TimerRingProps {
  totalSeconds: number;      // 20
  onExpire: () => void;
  paused: boolean;           // true when option is locked
}
```

**Implementation:**
- SVG circle, `r=20`, `cx=24`, `cy=24`, viewBox `0 0 48 48`.
- `stroke-dasharray = 2 * π * 20 ≈ 125.66`.
- `stroke-dashoffset` animates from 0 to 125.66 over `totalSeconds` seconds via `requestAnimationFrame` (not CSS animation, so `paused` can stop it immediately).
- Color: teal → amber at ≤ 7 s → red (#c0392b) at ≤ 3 s.
- Large centered number shows seconds remaining.
- Calls `onExpire` exactly once when countdown hits 0.

**Acceptance criteria:** Pausing stops animation within one frame. `onExpire` fires exactly once even if component re-renders. Accessible: `role="timer" aria-live="polite" aria-label="<N> secondes restantes"`.

---

### Phase 6 — Leaderboard & QR

#### Task 6.1 — `useLeaderboard` hook

**File:** `src/hooks/useLeaderboard.ts`

```ts
export function useLeaderboard() {
  // 1. Initial fetch via supabase.rpc('get_leaderboard')
  // 2. Subscribe to Realtime on 'attempts' table
  // 3. On any change event: re-fetch leaderboard
  // 4. Fallback: if Realtime subscription fails (status !== 'SUBSCRIBED' after 5s),
  //    setInterval(refetch, 10_000)
  // 5. Cleanup subscriptions on unmount
  return { rows, loading, error };
}
```

**Acceptance criteria:** Two browser tabs — one finishing a quiz attempt, the other showing `/leaderboard` — the leaderboard updates within 10 s without manual refresh.

---

### Phase 7 — Polish

#### Task 7.1 — RTL audit

Go through every component. Fix any issues:
- All `margin-left`/`margin-right` → `margin-inline-start`/`margin-inline-end`.
- All `padding-left`/`padding-right` → `padding-inline-start`/`padding-inline-end`.
- All `text-align: left` → `text-align: start`.
- `flex-direction: row` does not need changing (flips automatically with `dir=rtl`).
- Carousel dot row: verify dots are in correct RTL order.
- Timeline: verify the vertical line aligns correctly in RTL.

**Acceptance criteria:** At `dir=rtl` and 360px width, no element overflows horizontally. Checked in Chrome DevTools device emulation.

---

#### Task 7.2 — Accessibility pass

- All images have non-empty `alt` attributes (use `altAr` / `altFr` from JSON where available).
- All interactive elements have `min-height: 44px` and `min-width: 44px`.
- Color contrast: `--cream` (`#F6E7CB`) on `--midnight` (`#0B1F4B`) = 9.8:1 ✓. `--amber` (`#F2A93B`) on `--midnight` = 5.4:1 ✓. `--ink` (`#1A1209`) on `--cream` = 14.2:1 ✓.
- `lang` and `dir` on `<html>` update on language switch.
- Focus ring visible on all interactive elements (do not use `outline: none` without a replacement).
- `TimerRing` has `role="timer"` and `aria-live="polite"`.

**Acceptance criteria:** Lighthouse Accessibility score ≥ 90 on `/quiz` page.

---

#### Task 7.3 — Performance pass

- Background images in `public/bg/` are large JPEGs. Add `loading="lazy"` to all `<img>` except the hero. The hero `<img>` (or CSS bg on hero div) should use `fetchpriority="high"`.
- Add `<link rel="preload" as="image" href="/bg/hero-home.jpeg">` in `index.html`.
- Quiz question options are a static array — no network call between questions. Only `submit_answer` RPC is called, which is fire-and-forget before the next question loads.
- Bundle: `npm run build && npx vite-bundle-visualizer` — ensure no data file over 100 KB in the bundle.

**Acceptance criteria:** Lighthouse Performance score ≥ 80 on `/` on a simulated mid-tier mobile (Moto G4, throttled 4G).

---

#### Task 7.4 — 404 and error boundaries

- Add a `<Route path="*">` in `App.tsx` that renders a simple 404 page with a link back to `/`.
- Wrap each page in a React `ErrorBoundary` that renders a cream-on-midnight fallback with an error message and a reload button.
- `supabase.ts` throws on missing env vars at import time (already specified in Task 1.2).

---

### Phase 8 — Deploy

#### Task 8.1 — Environment variables

Set the following in Vercel/Netlify dashboard (or `.env.production`):
```
VITE_SUPABASE_URL         = https://<project>.supabase.co
VITE_SUPABASE_ANON_KEY    = <anon key>
VITE_PUBLIC_SITE_URL      = https://<production-domain>
```

**The `service_role` key must never appear in any frontend env var.**

#### Task 8.2 — Deploy to Vercel or Netlify

```bash
# Vercel
npx vercel --prod

# or Netlify
npx netlify deploy --prod --dir dist
```

For client-side routing (React Router), add a rewrite rule:
- **Vercel:** `vercel.json`:
  ```json
  { "rewrites": [{ "source": "/(.*)", "destination": "/index.html" }] }
  ```
- **Netlify:** `public/_redirects`:
  ```
  /*  /index.html  200
  ```

**Acceptance criteria:**
- `https://<domain>/quiz` loads on a phone after scanning the QR code from `/leaderboard`.
- `https://<domain>/informations` renders in Arabic RTL.
- No service role key or answer key appears in any network response.

---

## 5. DB Schema Summary

```
public.answer_keys
  question_id       text PK
  correct_option_id text NOT NULL CHECK ('a'|'b'|'c'|'d')
  explanation_ar    text NOT NULL
  explanation_fr    text NOT NULL
  source_ids        text[] NOT NULL

public.players
  id             uuid PK DEFAULT gen_random_uuid()
  full_name      text NOT NULL CHECK(length 2–60)
  class_name     text NOT NULL CHECK(length 1–40)
  year_of_study  text NOT NULL CHECK('1ère année'|'2ème année'|'3ème année')
  created_at     timestamptz DEFAULT now()

public.attempts
  id                   uuid PK
  player_id            uuid FK → players.id
  status               text CHECK('in_progress'|'finished'|'invalidated')
  score                integer NULL (0–2000)
  correct_count        integer NULL
  total_time_seconds   numeric(8,3) NULL
  started_at           timestamptz DEFAULT now()
  finished_at          timestamptz NULL

public.question_answers
  id                  uuid PK
  attempt_id          uuid FK → attempts.id
  question_id         text
  option_id           text NULL CHECK('a'|'b'|'c'|'d')
  is_correct          boolean NULL
  time_taken_seconds  numeric(8,3) (cumulative from attempt start, server-set)
  submitted_at        timestamptz DEFAULT now()
  UNIQUE (attempt_id, question_id)
```

**Scoring formula (server-side only):**
```
per_question_time = time_taken_seconds[i] - time_taken_seconds[i-1]
                    (for i=0: time_taken_seconds[0] - 0)
speed_bonus = floor(100 * max(0, (20 - per_question_time) / 20))
question_score = is_correct ? (100 + speed_bonus) : 0
total_score = sum(question_score for all 10 questions)
max possible score = 200 * 10 = 2000
```

**Ranking:** `score DESC`, then `total_time_seconds ASC`, then `finished_at ASC`.

**Player identity rule:** `(full_name, class_name)` pair identifies a player for the purposes of the leaderboard "best attempt" grouping. Two people with the same name in the same class are treated as the same player — document this as a known limitation (see Risks).

**Replay rule:** A player may replay the quiz up to 5 times per 24-hour window (`start_attempt` enforces this). The leaderboard shows their best attempt only.

---

## 6. RLS Policies Summary

| Table | anon INSERT | anon SELECT | anon UPDATE | Notes |
|---|---|---|---|---|
| `answer_keys` | ✗ | ✗ | ✗ | Zero policies — zero access. SECURITY DEFINER RPCs only. |
| `players` | ✓ (with check constraint) | ✗ | ✗ | Can create own player row only. |
| `attempts` | ✗ | ✗ | ✗ | All access via RPCs. |
| `question_answers` | ✗ | ✗ | ✗ | All access via RPCs. |

---

## 7. Test Checklist

### RTL Rendering
- [ ] Switch to AR: `<html dir="rtl" lang="ar">` is set.
- [ ] All text flows right-to-left; navbar chips are in correct order.
- [ ] No element overflows viewport at 360px width in RTL mode.
- [ ] Arabic text in quiz questions and options is legible (not clipped).

### Mobile (360px phone width)
- [ ] Hero H1 font-size is ≤ 2.125rem (34px) on 360px (responsive text).
- [ ] Quiz answer option rows are full width, min 56px tall, tapable without mis-tap.
- [ ] QR code on `/leaderboard` is ≥ 240px (usable at arm's length).
- [ ] Navbar chips scroll horizontally without triggering page scroll.

### Cheat attempt: reading answers from the network tab
- [ ] In Chrome DevTools Network tab, filter by `/rest/v1/answer_keys` — no request should exist.
- [ ] `submit_answer` response contains only `{ is_correct: boolean }` — no `correct_option_id`.
- [ ] `get_leaderboard` response contains no `attempt_id` fields.
- [ ] `finish_attempt` response contains only `{ score, correct_count, total_time_seconds, rank }`.

### Cheat attempt: replaying an attempt
- [ ] Calling `submit_answer` with the same `(attempt_id, question_id)` twice returns error `already_answered`.
- [ ] Calling `finish_attempt` on an already-finished attempt returns error `attempt_not_in_progress`.
- [ ] Modifying `localStorage.tawhda_attempt_id` to a non-existent UUID: `get_attempt_status` returns `{ status: 'not_found' }`; the app clears localStorage and shows registration.

### Cheat attempt: tampering with the timer
- [ ] The client never sends a `time_taken` value to any RPC. The server measures elapsed time via `now() - attempt.started_at`.
- [ ] Setting the local system clock back before submitting an answer does not affect the server-side timestamp.

### Leaderboard ordering with ties
- [ ] Insert two finished attempts with equal score; the one with lower `total_time_seconds` ranks higher.
- [ ] Insert two finished attempts with equal score AND equal time; the one with earlier `finished_at` ranks higher.
- [ ] `get_leaderboard` returns only the best attempt per `(full_name, class_name)` pair.

### QR scan on real phone
- [ ] QR code at `/leaderboard` scans correctly on iOS Camera app and Android Camera.
- [ ] Scanned URL loads `/quiz` correctly (not 404).
- [ ] Quiz page is fully usable on a 360px screen without horizontal scroll.

---

## 8. Risks & Open Questions

**R1 — Missing fablap and icebear logos.**
*Default decision:* Render text-only chips `"fablap"` and `"icebear"` with the same pill border style as the image chips. Document in code comment: `// TODO: replace with logo when file is provided`. Do not throw an error or leave a broken `<img>` tag.

**R2 — Hero image licensing.**
`hero.image.src` is null; `license: "needs_verification"` in JSON. The plan wires `hero-home.jpeg` (Hassan II Mosque sunset) as a temporary visual.
*Default decision:* Use it for the school event. Add an HTML comment `<!-- TODO: verify image license before public deployment -->` in `Home.tsx`. Do not claim the image is licensed. For any public-facing deployment, replace with a Wikimedia Commons CC-licensed image.

**R3 — Player identity collision.**
Two students with the same full name in the same class are grouped as one player in the leaderboard's best-attempt logic.
*Default decision:* Accept this limitation for a school event where names are unlikely to collide within a single class. If collision is a problem, the teacher can ask one student to add a middle initial. No code change needed.

**R4 — Supabase Realtime reliability.**
Realtime over websockets can fail on spotty school WiFi.
*Default decision:* The 10-second polling fallback in `useLeaderboard` handles this. The leaderboard will be at most 10 s stale. Acceptable for a projected display.

**R5 — Decree entry-into-force.**
The content does not claim that decrees 2.26.14 and 2.25.1140 have been published in the Bulletin officiel or that 31 October is a paid holiday.
*Default decision:* Keep all wording as-is from the JSON files. If the teacher wants to update the content after verifying the Bulletin officiel, they edit `info.ar.json` / `info.fr.json` directly. Do not add any claims not already in those files.

---

## 9. Definition of Done

- [ ] `npm run build` exits 0 with no TypeScript errors.
- [ ] All four routes (`/`, `/informations`, `/quiz`, `/leaderboard`) render correctly in Chrome at 360px.
- [ ] Language switcher changes `dir` and `lang` on `<html>` and persists across refresh.
- [ ] Quiz registration validates all three fields; invalid input shows error messages.
- [ ] A full quiz run (register → 10 questions → result) completes without error.
- [ ] Timer counts down and auto-submits null on expiry.
- [ ] `answer_keys` table is not accessible to anon key (confirmed in DevTools Network tab).
- [ ] `get_leaderboard` RPC returns safe fields only (no answer data, no attempt IDs).
- [ ] Leaderboard updates after a new `finish_attempt` without manual page refresh.
- [ ] QR code on `/leaderboard` encodes the correct `/quiz` URL.
- [ ] QR code scans on a real phone and opens `/quiz`.
- [ ] Supabase Security Advisor shows 0 high-severity findings.
- [ ] `supabase/seed/quiz-answers.sql` is NOT in `src/` or `public/`.
- [ ] `.env.local` is in `.gitignore` and not committed.
- [ ] No service role key appears in any frontend file.
- [ ] Content makes no claim about paid-holiday status or decree entry-into-force.
- [ ] Lighthouse Accessibility ≥ 90 on `/quiz`.
- [ ] Lighthouse Performance ≥ 80 on `/` (mobile simulation).
- [ ] Deployed URL loads on a real phone after QR scan.
