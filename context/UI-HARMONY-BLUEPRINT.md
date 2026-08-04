# DocentBase — UI Harmony Blueprint

> **Purpose:** This file is the single source of truth for the visual identity of the DocentBase ecosystem. Paste it into **any** subdomain project and reproduce the exact same premium UI. Every new subdomain must ship the SAME aesthetic — identical tokens, identical components, identical motion — so the whole ecosystem feels like one product.
>
> **How to use:** Copy this whole file into the target repo (e.g. `context/UI-HARMONY-BLUEPRINT.md`), then follow the implementation order at the end. Do NOT re-design. Do NOT invent new tokens. Reuse these.

---

## 1. Design Philosophy

This is **NOT an admin dashboard**. This is a **premium consumer application**. Think:

- **Apple** — polish, precision, attention to detail
- **Notion** — clean, spacious, elegant typography
- **Linear** — sleek, modern, functional beauty
- **Arc Browser** — delightful micro-interactions

**The #1 priority is visual excellence.** Everything must look expensive and intentional.

Golden rules:
1. One brand color (Indigo `#4F46E5`), one accent (Cyan `#06B6D4`), one warm accent (Amber `#F59E0B`). Never introduce new hues.
2. Light + dark mode, both mandatory. Dark = deeper, desaturated slate-blue, NOT pure black.
3. Glassmorphism for premium surfaces only (sidebar, header, hero, modals), never for every card.
4. All component animation via Framer Motion, never raw CSS keyframes (skeleton is the only CSS exception).
5. Icons come exclusively from **lucide-react**, `strokeWidth={2.2}`.

---

## 2. Color System

### 2.1 Design Tokens (CSS Variables) — LIGHT

```css
:root {
  --bg-app: #f7f8fb;                    /* App background */
  --bg-surface: #ffffff;                /* Cards & surfaces */
  --bg-elevated: rgba(255, 255, 255, 0.82);   /* Floating bars (header, dropdowns) */
  --bg-subtle: #eef2f7;                 /* Hover fills, chips */
  --bg-sidebar: rgba(255, 255, 255, 0.84);    /* Sidebar glass */
  --bg-hero: #111827;                   /* Dark hero base */

  --text-primary: #0f172a;              /* Headings, body */
  --text-secondary: #475569;            /* Descriptions, labels */
  --text-muted: #94a3b8;                /* Timestamps, hints */
  --text-inverse: #ffffff;

  --brand-primary: #4f46e5;             /* Indigo — main brand */
  --brand-primary-hover: #4338ca;
  --brand-primary-light: #eef2ff;       /* Tint for active/hover */
  --brand-primary-subtle: #e0e7ff;      /* Subtle tint */
  --brand-accent: #06b6d4;              /* Cyan — secondary brand */
  --brand-warm: #f59e0b;                /* Amber — attention */

  --color-success: #10b981;
  --color-success-light: #d1fae5;
  --color-danger: #ef4444;
  --color-danger-light: #fee2e2;
  --color-warning: #f59e0b;
  --color-warning-light: #fef3c7;
  --color-info: #3b82f6;
  --color-info-light: #dbeafe;

  --border-default: #e2e8f0;
  --border-subtle: #edf2f7;
  --border-strong: #cbd5e1;

  --shadow-xs: 0 1px 2px rgba(15, 23, 42, 0.04);
  --shadow-sm: 0 1px 3px rgba(15, 23, 42, 0.06), 0 1px 2px rgba(15, 23, 42, 0.04);
  --shadow-md: 0 8px 18px rgba(15, 23, 42, 0.08), 0 2px 6px rgba(15, 23, 42, 0.05);
  --shadow-lg: 0 18px 34px rgba(15, 23, 42, 0.1), 0 8px 14px rgba(15, 23, 42, 0.06);
  --shadow-xl: 0 28px 56px rgba(15, 23, 42, 0.16);
}
```

### 2.2 Design Tokens — DARK

```css
@media (prefers-color-scheme: dark) {
  :root {
    --bg-app: #080f1d;
    --bg-surface: #111827;
    --bg-elevated: rgba(17, 24, 39, 0.84);
    --bg-subtle: #172033;
    --bg-sidebar: rgba(11, 17, 32, 0.86);
    --bg-hero: #111827;

    --text-primary: #f8fafc;
    --text-secondary: #cbd5e1;
    --text-muted: #64748b;
    --text-inverse: #0f172a;

    --brand-primary: #818cf8;              /* Lighter indigo for contrast */
    --brand-primary-hover: #a5b4fc;
    --brand-primary-light: rgba(99, 102, 241, 0.18);
    --brand-primary-subtle: rgba(99, 102, 241, 0.12);
    --brand-accent: #22d3ee;
    --brand-warm: #fbbf24;

    --color-success: #34d399;
    --color-success-light: rgba(52, 211, 153, 0.16);
    --color-danger: #f87171;
    --color-danger-light: rgba(248, 113, 113, 0.16);
    --color-warning: #fbbf24;
    --color-warning-light: rgba(251, 191, 36, 0.16);
    --color-info: #60a5fa;
    --color-info-light: rgba(96, 165, 250, 0.16);

    --border-default: rgba(255, 255, 255, 0.1);
    --border-subtle: rgba(255, 255, 255, 0.07);
    --border-strong: rgba(255, 255, 255, 0.18);

    --shadow-xs: 0 1px 2px rgba(0, 0, 0, 0.36);
    --shadow-sm: 0 2px 8px rgba(0, 0, 0, 0.32);
    --shadow-md: 0 12px 24px rgba(0, 0, 0, 0.36);
    --shadow-lg: 0 20px 40px rgba(0, 0, 0, 0.44);
    --shadow-xl: 0 32px 64px rgba(0, 0, 0, 0.5);
  }
}
```

### 2.3 App Background (ambient glow)

Every page sits on a base color with two soft radial glows — indigo top-left, cyan top-right. This is the signature "DocentBase glow".

```css
body {
  background:
    radial-gradient(circle at 14% 10%, rgba(79, 70, 229, 0.1), transparent 26rem),
    radial-gradient(circle at 88% 8%, rgba(6, 182, 212, 0.12), transparent 24rem),
    var(--bg-app);
  color: var(--text-primary);
  line-height: 1.5;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}
```

### 2.4 Status Colors (semantic)

| Status | Color (light) | Background (light) | Dark text | Dark bg |
|---|---|---|---|---|
| Success (Paid/Present/Pass) | `#047857` | `--color-success-light` | `#34d399` | `rgba(52,211,153,0.16)` |
| Warning (Due/Late/Upcoming) | `#b45309` | `--color-warning-light` | `#fbbf24` | `rgba(251,191,36,0.16)` |
| Danger (Overdue/Absent/Fail) | `#b91c1c` | `--color-danger-light` | `#f87171` | `rgba(248,113,113,0.16)` |
| Info (Holiday/Scheduled) | `#1d4ed8` | `--color-info-light` | `#60a5fa` | `rgba(96,165,250,0.16)` |

---

## 3. Typography

### 3.1 Font Stack

```css
font-family: 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif;
```

Load Inter weights 400/500/600/700/800 from Google Fonts (or via `next/font`).

### 3.2 Scale

| Token | Size | Weight | Use |
|---|---|---|---|
| `hero-title` | `clamp(30px, 5vw, 56px)` | 800 | Dashboard hero headline |
| `heading-xl` | 30px | 800 | Page titles |
| `heading-lg` | 24px / 28px | 800 | Hero/sub-page titles |
| `heading-md` | 18px | 800 | Card / section titles |
| `heading-sm` | 16px | 700 | Card sub-titles |
| `body-lg` | 16px | 400 | Primary body text |
| `body-md` | 14px | 400 | Descriptions |
| `body-sm` | 12px | 500 | Timestamps, captions |
| `label` | 13px | 600 | Form labels, nav |
| `eyebrow` | 11px | 800, `uppercase`, `letter-spacing: 0.08em` | Micro-labels above titles |

### 3.3 Line Heights

- Headings: `1.2` / `1.25` (tight)
- Body: `1.5` (comfortable)
- Copy: `1.6–1.7` (relaxed)

---

## 4. Spacing System

4px base grid.

| Token | Value |
|---|---|
| space-1 | 4px |
| space-2 | 8px |
| space-3 | 12px |
| space-4 | 16px |
| space-5 | 20px |
| space-6 | 24px |
| space-8 | 32px |
| space-10 | 40px |
| space-12 | 48px |
| space-16 | 64px |

**Page padding** (`portal-main`):
- Desktop (≥1024px): `28px 32px 48px`
- Tablet (≥768px): `24px 24px 40px`
- Mobile: `20px 16px 32px`

**Page container:** `width: min(100%, 1280px); margin: 0 auto;` (some feature pages use `max-w-7xl mx-auto`).

**Vertical rhythm between page sections:** `gap: 24px` (flex-col), `gap: 32px` for large feature pages.

---

## 5. Border Radius

| Token | Value | Use |
|---|---|---|
| `radius-sm` | 8px | Small chips |
| `radius-md` | 12px | Buttons, inputs, nav links, icon buttons |
| `radius-lg` | 16px | Cards, mini-cards |
| `radius-xl` | 20px | Standard cards, inputs, tab panels |
| `radius-2xl` | 24px | Hero cards, modals, large inputs |
| `radius-3xl` | 28px / 32px | Feature hero panels, join panels |
| `radius-full` | 9999px | Avatars, badges, pills, dots |

---

## 6. Shadows & Elevation

| Layer | Token | Use |
|---|---|---|
| Base | `shadow-xs` | Search pill |
| Card | `shadow-sm` | Default cards |
| Raised | `shadow-md` | Hovered cards, active tab (white on gray) |
| Overlay | `shadow-lg` | Modals, feature panels, primary CTAs |
| Hero | `shadow-xl` + brand glow | Hero cards, primary buttons |

**Brand glow for primary CTAs:**
```css
box-shadow: 0 10px 20px rgba(79, 70, 229, 0.22);   /* indigo CTA */
box-shadow: 0 10px 20px rgba(99, 102, 241, 0.2);   /* shadow-indigo-500/20 */
```

---

## 7. Glassmorphism

Use ONLY on: sidebar, sticky header, hero cards, control bars, modals, floating pills.

```css
/* Light */
background: rgba(255, 255, 255, 0.65);
backdrop-filter: blur(20px);
-webkit-backdrop-filter: blur(20px);
border: 1px solid rgba(255, 255, 255, 0.2);

/* Dark */
background: rgba(11, 17, 32, 0.6);        /* or slate-900/60 */
backdrop-filter: blur(20px);
border: 1px solid rgba(255, 255, 255, 0.1);
```

Hero over glass: `bg-white/10` + `backdrop-blur-xl` + `border-white/20`.

---

## 8. App Shell & Layout

### 8.1 Structure

```
┌──────────────────────────┬───────────────────────────────┐
│  SIDEBAR (fixed, 260px)  │  HEADER (sticky, 72px, glass) │
│  collapsible → 72px      │───────────────────────────────│
│  mobile → drawer 290px   │  MAIN (scrollable)            │
│                          │   └─ portal-page (max 1280px) │
└──────────────────────────┴───────────────────────────────┘
```

- Desktop sidebar: `position: fixed; left: 0; width: 260px` (collapsed `72px`), spring transition.
- Content margin-left: `260px` → `72px` (transition `300ms cubic-bezier(0.4,0,0.2,1)`).
- Mobile (<1024px): content full width, sidebar becomes a drawer (`290px`) sliding from left with spring `{ type: 'spring', damping: 25, stiffness: 300 }`, backdrop `rgba(2,6,23,0.5)`.
- Sidebar collapse state persisted in `localStorage` key `sidebar_collapsed`.
- Main scroll container: `height: calc(100vh - 72px); overflow-y: auto`.
- Header is sticky, `min-height: 72px`, `backdrop-filter: blur(20px)`, `background: var(--bg-elevated)`.

### 8.2 Sidebar

- **Brand block** (72px, bordered bottom): `brand-mark` = 40px rounded-12 square with `linear-gradient(135deg, var(--brand-primary), var(--brand-accent))`, white GraduationCap icon, glow shadow. Name = "DocentBase", subtitle = subdomain/product name.
- **Nav sections**: uppercase 11px `nav-section-label` ("Workspace" / "Account").
- **Nav links**: `min-height: 44px`, padding `10px 12px`, radius 12, 14px/600. Hover: `background: var(--bg-subtle)`. Active: `linear-gradient(135deg, var(--brand-primary-light), rgba(6,182,212,0.1))`, text `var(--brand-primary)`, plus a 3px rounded indigo bar on the left edge.
- **Footer**: `student-mini-card` (avatar-initials 36px circle `var(--brand-primary-light)` / `var(--brand-primary)`), plus collapse toggle `icon-button`.

### 8.3 Header

- Left: hamburger (mobile only) + `header-title` (18px/700) + `header-subtitle` (12px muted).
- Right: `search-pill` (hidden below 1024px, `min-width: 240px`, radius-full, shadow-xs) + Sparkles icon button + Bell icon button with red `notification-dot` + Clerk `<UserButton />`.

---

## 9. Component Patterns

### 9.1 Buttons

| Variant | Class | Style |
|---|---|---|
| Primary | `btn btn-primary` | `var(--brand-primary)` bg, white text, indigo glow shadow |
| Secondary | `btn btn-secondary` | `var(--brand-primary-light)` bg, `var(--brand-primary)` text |
| Ghost | `btn btn-ghost` | transparent, `--text-secondary` |
| Danger | `btn btn-danger` | `var(--color-danger)` bg, white text |
| Light | `btn btn-light` | white bg on dark hero, text `#111827` |
| Glass | `btn btn-glass` | `rgba(255,255,255,0.12)` on dark hero, white text |

Base `.btn`: `min-height: 40px`, radius 12, padding `9px 15px`, font 14px/700, inline-flex centered. Disabled: `opacity 0.6, cursor not-allowed`.

### 9.2 Cards

```css
.card {
  border: 1px solid var(--border-subtle);
  border-radius: 16px;
  background: var(--bg-surface);
  box-shadow: var(--shadow-sm);
  padding: 20px;
  transition: box-shadow 200ms ease, transform 200ms ease;
}
.card:hover { box-shadow: var(--shadow-md); }
```

Hoverable motion (when `hoverable` prop): `whileHover={{ y: -2, scale: 1.01 }}` spring `{ type: 'spring', stiffness: 300 }`.

### 9.3 Stat Card

Layout: label + icon row → big value (30px/700) → trend row (12px; `↑` green / `↓` red + muted label).

### 9.4 Badges

Radius-full pills, 12px/800, padding `5px 9px`. Variants map to CSS classes:

```
badge-paid | badge-present | badge-success   → success palette
badge-due  | badge-late    | badge-warning   → warning palette
badge-overdue | badge-absent | badge-danger  → danger palette
badge-holiday  | badge-info                 → info palette
```

For richer status chips (icon + pill, e.g. join requests) use the pattern:
```
inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[11px] font-bold border
+ tinted bg + tinted text + icon 14px
```

### 9.5 Nav / Quick Links

`quick-link`: `min-height: 128px`, radius 18, surface bg, shadow-sm, hover `translateY(-1px)`. Contains `quick-icon` (42px radius-14 tinted square with colored lucide icon) + `quick-title` (15px/700) + `quick-caption` (12px muted).

### 9.6 Tabs (feature pages)

Segmented control: container `p-1.5 rounded-2xl bg-slate-100 dark:bg-slate-900 border`. Active tab: `bg-white dark:bg-slate-800 text-indigo-600 dark:text-indigo-400 shadow-md`. Inactive: `text-slate-600 dark:text-slate-400 hover`.

Filter pills: selected = `bg-indigo-600 text-white shadow-md shadow-indigo-500/20`; unselected = `bg-slate-100/80 dark:bg-slate-800/60`.

### 9.7 Timeline / List Items

`.timeline-item`: `border: 1px solid var(--border-subtle); border-radius: 14px; background: var(--bg-elevated); padding: 14px;` with `timeline-title` (14px/800) + `timeline-meta` (12px secondary) + right-side Badge.

### 9.8 Progress Bar

Track: `bg-slate-200 dark:bg-slate-700`, `h-2.5 rounded-full overflow-hidden`. Fill: `bg-gradient-to-r from-indigo-500 to-purple-500`, animated `width` via Framer Motion `{ duration: 0.8, ease: 'easeOut' }`.

### 9.9 Inputs

- Standard: `px-4 py-2.5 rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700`, focus: `border-indigo-500 focus:ring-2 focus:ring-indigo-500/30 outline-none transition-colors`.
- Large CTA input (join key): `px-5 py-4 rounded-2xl border-2`, `font-mono font-bold tracking-widest text-center`, focus `border-indigo-500`.
- Labels: 12px/600 `text-slate-600 dark:text-slate-400`, `mb-1.5`.

### 9.10 Modals & Panels

- Overlay: `fixed inset-0 bg-black/60 backdrop-blur-sm`, z-50.
- Sheet: radius-2xl/3xl, `bg-white dark:bg-slate-900`, `shadow-xl`, spring entrance.
- Join flow wrapper panel: `rounded-3xl p-6 sm:p-10 border bg-white dark:bg-slate-900 shadow-lg`.

### 9.11 Progress Stepper (multi-step forms)

Dots + connectors: active `bg-indigo-600 scale-125`, complete `bg-emerald-500`, upcoming `bg-slate-200 dark:bg-slate-700`. Connector: `h-0.5 w-8`.

### 9.12 Empty States

Centered, `p-12`, muted 4xl icon, 16px/600 title, 14px secondary description (max-width 320px), optional action.

### 9.13 Skeletons

```css
.skeleton {
  animation: skeleton-pulse 1.5s ease-in-out infinite;
  background: linear-gradient(90deg, var(--bg-subtle) 25%, var(--bg-surface) 50%, var(--bg-subtle) 75%);
  background-size: 200% 100%;
  border-radius: 8px;
}
@keyframes skeleton-pulse { 0% { background-position: 200% 0; } 100% { background-position: -200% 0; } }
```

Match skeleton shapes to real layout.

---

## 10. Hero Card (signature)

The hero is the most distinctive element — dark indigo gradient + ambient orbs + glass meta chips.

```css
.hero-card {
  position: relative; overflow: hidden;
  border: 0; border-radius: 24px;
  background: linear-gradient(135deg, rgba(79,70,229,0.96), rgba(17,24,39,0.98) 62%, rgba(6,182,212,0.9));
  color: white; padding: 26px; box-shadow: var(--shadow-xl);
}
```

Structure:
1. **Eyebrow** (white/74): date or category.
2. **Title**: `clamp(30px,5vw,56px)` / 800 / `line-height:1.03`.
3. **Copy**: `rgba(255,255,255,0.78)`, 15px, `line-height:1.7`.
4. **Actions**: `btn-light` + `btn-glass`.
5. **Meta grid**: `repeat(auto-fit, minmax(160px,1fr))` of `hero-meta` glass tiles (`rgba(255,255,255,0.1)` + `backdrop-blur` + `border-white/14`), label 12px white/65, value 18px bold.

### Ultra-premium variant (Coaching header)

```css
background: radial-gradient(135% 135% at 0% 0%, #4F46E5 0%, #3730A3 50%, #1E1B4B 100%);
border: 1px solid rgba(255,255,255,0.1);
```

Decorative pieces:
- Two blurred orbs: `absolute w-80 h-80 rounded-full bg-indigo-400/20 blur-3xl` (top-right) and `bg-purple-500/20` (bottom-left).
- Badge pill: `bg-white/10 backdrop-blur-md border-white/20` with pulsing amber Sparkles.
- "Next class" pill: `bg-white/15 backdrop-blur-xl border-white/25` + `animate-ping` emerald dot.
- 3 metric tiles: `bg-white/10 backdrop-blur-xl border-white/20`, each with `w-10 h-10 rounded-xl bg-white/15` icon, big number 3xl/800, tiny label white/70. Hover: `whileHover={{ y: -3, scale: 1.02 }}`.

---

## 11. Motion & Animation (Framer Motion)

ALL component animations via Framer Motion.

| Use case | Recipe |
|---|---|
| Page/section enter | `initial={{ opacity: 0, y: 15 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.25–0.4, ease: [0.16,1,0.3,1] }}` |
| Tab switch (AnimatePresence) | `mode="wait"`, enter `{opacity:0,y:15}`, exit `{opacity:0,y:-15}`, 0.25s |
| Multi-step flow | horizontal slide: enter `{opacity:0,x:24}`, exit `{opacity:0,x:-24}` |
| Card hover | `whileHover={{ y: -4, scale: 1.01 }}` spring `{ stiffness: 350, damping: 25 }` |
| Drawer | spring `{ damping: 25, stiffness: 300 }` |
| Success check | `initial={{ scale: 0 }} animate={{ scale: 1 }}` spring `{ stiffness: 200, damping: 15 }` |
| Progress fill | `width: 0 → n%`, `{ duration: 0.8, ease: 'easeOut' }` |
| Live dot | `animate-ping` (Tailwind) or `animate-pulse` |

Motion micro-detail: buttons `active:scale-95`, cards reveal a gradient top accent bar on hover (`group-hover:opacity-100`).

---

## 12. Responsive Breakpoints

| Breakpoint | Behavior |
|---|---|
| < 420px | Hero padding `22px 18px`, title fixed 30px, timeline items stack column |
| 640px (sm) | Two-col grids kick in |
| 768px (md) | `md:grid-cols-2/3`, main padding `24px` |
| 1024px (lg) | Sidebar persistent (else drawer), search-pill shows, main padding `32px` |
| 1280px | Page content max-width, centered |

Rules: mobile-first; grids `repeat(auto-fit, minmax(...))` for stat/quick grids; explicit `sm:/md:/lg:` utilities for feature layouts.

---

## 13. Icons

- Library: **lucide-react** only. `size={16–24}`, `strokeWidth={2.2}` for nav, default elsewhere.
- Tint icons inside tinted chips with `var(--brand-primary)`, `var(--color-info)`, etc.
- Standard map: Dashboard=Home, Coaching=GraduationCap, Attendance=BarChart3, Fees=Wallet, Notes=FileText, Exams=ClipboardList, Results=Trophy, Routine=Calendar, Notices=Megaphone, Profile=User, Settings=Settings, Menu/Close/X, Bell, Sparkles, Search, LogOut, ChevronLeft/Right/Down, ArrowRight, Clock, MapPin, BookOpen, Key, Loader2 (spinner), CheckCircle2, AlertTriangle, XCircle, RefreshCw, Building2, DollarSign, Globe, TrendingUp, Layers, Info, Trash2.

---

## 14. Bangladesh-Specific UX

- **Currency:** BDT with `৳` symbol, thousands separator → `৳ 5,500`.
- **Dates:** `DD MMM YYYY` (e.g. `04 Aug 2026`).
- **Times:** 12-hour with AM/PM.
- **Language:** English primary; Bengali planned.
- **Payment context:** bKash / Nagad referenced in fee copy.

---

## 15. Page Recipe (every new page)

1. Wrap in `<div className="flex flex-col gap-6">` (or `gap-8 pb-16 max-w-7xl mx-auto` for feature pages).
2. Hero (or `section-head` with eyebrow + section-title + `section-link`).
3. Content grid — stat-grid / quick-grid / dashboard-grid / `grid md:grid-cols-2`.
4. Lists inside `Card` using `section-head` + `list-stack` + `timeline-item`.
5. Every async/loading state → `Skeleton` matching layout.
6. Every empty state → `EmptyState` with friendly copy (never "No data found").
7. Client interactivity → Framer Motion; tab/step transitions use `AnimatePresence mode="wait"`.

---

## 16. Tech Stack (must match)

- Next.js (App Router) + React
- CSS Modules-free: custom CSS in `globals.css` + handwritten utility classes (no Tailwind framework — the utilities in §17 already exist)
- **lucide-react** for icons
- **framer-motion** for animation
- **@clerk/nextjs** for auth + `<UserButton />`
- Fonts: **Inter**

---

## 17. Utility Class Inventory

The following utility classes already exist and are used throughout. Keep them identical across subdomains:

**Layout:** `.flex .inline-flex .flex-col .flex-wrap .flex-1 .shrink-0 .items-center .items-start .justify-center .justify-between .grid .grid-cols-1/2/3 .gap-1/1.5/2/2.5/3/3.5/4/5/6/8`

**Position:** `.fixed .absolute .relative .inset-0 .top-0 .right-0 .bottom-0 .left-0 .top-4/5 .right-4/5 .z-10/50 .left-1/3 .top-1/2 .-translate-y-1/2`

**Size:** `.w-full .w-2/2.5/3/10/12/72/80 .h-1/2/2.5/3/10/12/72/80 .h-full .min-h-screen .max-h-[90vh] .max-w-lg/xl/2xl/4xl`

**Spacing:** `.p-1/1.5/2/3/3.5/4/6/8/12 .px-1/2.5/3/3.5/4/5 .pl-10 .pr-4/8 .py-0.5/1/1.5/2/2.5/3 .m-* .mx-auto .mb-* .mr-2 .mt-* .mt-auto`

**Typography:** `.text-[10px]/[11px]/xs/sm/base/lg/xl/2xl/3xl/4xl .font-normal/medium/semibold/bold/extrabold .leading-tight/snug/relaxed .tracking-tight/wide/wider .uppercase .text-center/right .whitespace-nowrap .font-mono`

**Color/surface (slate/indigo/purple/emerald/amber):** `.bg-white/10/15/60 .bg-black/60 .bg-slate-50/70/100/200/800 .bg-indigo-50/100/600/700 .bg-emerald-50/100/400/500 .bg-amber-100 .text-white/70/85 .text-slate-300→900 .text-indigo-200→600 .text-purple-200/400/600 .text-emerald-200→700 .text-amber-300→700 .border-slate-100/200/700/800 .border-indigo-100/200/800/900/40 .border-emerald-100/900/40 .border-white/10/20/25`

**Effects:** `.rounded-lg/xl/2xl/3xl/full .shadow-sm/md/lg/2xl .shadow-indigo-500/20 .backdrop-blur-sm/md/xl .blur-3xl .transition-all/colors/opacity .duration-300 .active:scale-95 .hover:bg-* .hover:shadow-md .hover:text-* .group-hover:opacity-100 .group-hover:text-indigo-600`

**Responsive:** `.sm:... .md:... .lg:...` (flex-row, items-center, grid-cols-*, text sizes, w-auto, p-6/8)

**Components:** `.app-shell .app-content .portal-main .portal-page .app-sidebar .sidebar-panel .sidebar-brand .brand-lockup .brand-mark .brand-name .brand-subtitle .sidebar-scroll .nav-section-label .nav-link .nav-link-active .nav-icon .sidebar-footer .student-mini-card .avatar-initials .icon-button .portal-header .header-title .header-subtitle .header-actions .search-pill .notification-dot .card .surface-card .hero-card .hero-content .eyebrow .hero-eyebrow .hero-title .hero-copy .hero-actions .hero-meta-grid .hero-meta .btn .btn-primary .btn-secondary .btn-ghost .btn-danger .btn-light .btn-glass .stat-grid .quick-grid .dashboard-grid .quick-link .quick-icon .quick-title .quick-caption .section-head .section-title .section-link .list-stack .timeline-item .timeline-title .timeline-meta .badge-* .skeleton`

---

## 18. Implementation Order (new subdomain)

1. **Tokens first.** Paste §2.1 + §2.2 into `:root` / dark block, add §2.3 body background.
2. **Base + utilities.** Add reset, body/button/a defaults, and §17 utility inventory to `globals.css`.
3. **Shell.** Build `AppShell` + `Sidebar` (§8.2) + `Header` (§8.3). Wire collapse + mobile drawer.
4. **Core UI kit.** `Card`, `Badge`, `StatCard`, `Button`, `EmptyState`, `Skeleton`, `ProgressRing`.
5. **Hero.** Implement §10 hero (standard + premium variant).
6. **Motion.** Add the §11 Framer Motion recipes globally.
7. **Theme.** Verify dark mode at every step; contrast per §2.4.
8. **Ship a page.** Recreate the Dashboard page as the reference, then clone the pattern for every other route.
9. **Do NOT deviate.** If a new component is needed, build it from existing recipes. New tokens are forbidden — derive from §2.

---

*Keep this file in `context/` at the repo root. Update it whenever a new visual pattern ships — it is the contract every subdomain must honor.*
