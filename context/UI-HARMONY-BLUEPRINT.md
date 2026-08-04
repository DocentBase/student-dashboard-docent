# DocentBase — UI Harmony Blueprint

> Paste into any subdomain repo. Every subdomain must ship the SAME aesthetic — identical tokens, components, motion — so the ecosystem feels like one product. Do NOT re-design. Do NOT invent new tokens.

---

## 1. Philosophy

Not an admin dashboard — a **premium consumer app** (Apple polish, Notion space, Linear beauty, Arc micro-interactions). #1 priority = visual excellence.

Golden rules:
- One brand (Indigo `#4F46E5`), one accent (Cyan `#06B6D4`), one warm accent (Amber `#F59E0B`). No new hues.
- Light + dark mode both mandatory. Dark = desaturated slate-blue, never pure black.
- Glassmorphism ONLY on sidebar, header, hero, modals, control bars.
- All animation via Framer Motion (skeleton is the only CSS exception).
- Icons only from **lucide-react**, `strokeWidth={2.2}`.

---

## 2. Color Tokens

### Light
```css
:root {
  --bg-app:#f7f8fb; --bg-surface:#fff; --bg-elevated:rgba(255,255,255,.82); --bg-subtle:#eef2f7; --bg-sidebar:rgba(255,255,255,.84); --bg-hero:#111827;
  --text-primary:#0f172a; --text-secondary:#475569; --text-muted:#94a3b8; --text-inverse:#fff;
  --brand-primary:#4f46e5; --brand-primary-hover:#4338ca; --brand-primary-light:#eef2ff; --brand-primary-subtle:#e0e7ff; --brand-accent:#06b6d4; --brand-warm:#f59e0b;
  --color-success:#10b981; --color-success-light:#d1fae5; --color-danger:#ef4444; --color-danger-light:#fee2e2;
  --color-warning:#f59e0b; --color-warning-light:#fef3c7; --color-info:#3b82f6; --color-info-light:#dbeafe;
  --border-default:#e2e8f0; --border-subtle:#edf2f7; --border-strong:#cbd5e1;
  --shadow-xs:0 1px 2px rgba(15,23,42,.04); --shadow-sm:0 1px 3px rgba(15,23,42,.06),0 1px 2px rgba(15,23,42,.04);
  --shadow-md:0 8px 18px rgba(15,23,42,.08),0 2px 6px rgba(15,23,42,.05);
  --shadow-lg:0 18px 34px rgba(15,23,42,.1),0 8px 14px rgba(15,23,42,.06); --shadow-xl:0 28px 56px rgba(15,23,42,.16);
}
```

### Dark
```css
@media (prefers-color-scheme: dark) { :root {
  --bg-app:#080f1d; --bg-surface:#111827; --bg-elevated:rgba(17,24,39,.84); --bg-subtle:#172033; --bg-sidebar:rgba(11,17,32,.86); --bg-hero:#111827;
  --text-primary:#f8fafc; --text-secondary:#cbd5e1; --text-muted:#64748b; --text-inverse:#0f172a;
  --brand-primary:#818cf8; --brand-primary-hover:#a5b4fc; --brand-primary-light:rgba(99,102,241,.18); --brand-primary-subtle:rgba(99,102,241,.12); --brand-accent:#22d3ee; --brand-warm:#fbbf24;
  --color-success:#34d399; --color-success-light:rgba(52,211,153,.16); --color-danger:#f87171; --color-danger-light:rgba(248,113,113,.16);
  --color-warning:#fbbf24; --color-warning-light:rgba(251,191,36,.16); --color-info:#60a5fa; --color-info-light:rgba(96,165,250,.16);
  --border-default:rgba(255,255,255,.1); --border-subtle:rgba(255,255,255,.07); --border-strong:rgba(255,255,255,.18);
  --shadow-xs:0 1px 2px rgba(0,0,0,.36); --shadow-sm:0 2px 8px rgba(0,0,0,.32); --shadow-md:0 12px 24px rgba(0,0,0,.36); --shadow-lg:0 20px 40px rgba(0,0,0,.44); --shadow-xl:0 32px 64px rgba(0,0,0,.5);
}}
```

### App background (signature glow)
```css
body { background:
  radial-gradient(circle at 14% 10%, rgba(79,70,229,.1), transparent 26rem),
  radial-gradient(circle at 88% 8%, rgba(6,182,212,.12), transparent 24rem),
  var(--bg-app); color: var(--text-primary); line-height:1.5; -webkit-font-smoothing:antialiased; }
```

### Semantic colors
| Status | Light text | Light bg | Dark text | Dark bg |
|---|---|---|---|---|
| Success (Paid/Present) | `#047857` | success-light | `#34d399` | `rgba(52,211,153,.16)` |
| Warning (Due/Late) | `#b45309` | warning-light | `#fbbf24` | `rgba(251,191,36,.16)` |
| Danger (Overdue/Absent) | `#b91c1c` | danger-light | `#f87171` | `rgba(248,113,113,.16)` |
| Info (Holiday/Scheduled) | `#1d4ed8` | info-light | `#60a5fa` | `rgba(96,165,250,.16)` |

---

## 3. Typography

- Font: **Inter** (400/500/600/700/800) — `'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif`.
- Headings: 800 weight; hero `clamp(30px,5vw,56px)`; page 30px; section 18px; card 16px.
- Body: 16px/400; desc 14px; captions 12px/500.
- `eyebrow`: 11px / 800 / UPPERCASE / `letter-spacing:.08em` — micro-label above titles.
- Line heights: headings 1.2–1.25, body 1.5, copy 1.6–1.7.

---

## 4. Spacing, Radius, Elevation

- **Spacing:** 4px grid (4/8/12/16/20/24/32/40/48/64). Page padding: desktop `28px 32px 48px`, tablet `24px`, mobile `16px`. Content max-width `1280px` centered. Section gaps: 24px (32px for feature pages).
- **Radius:** sm 8 · md 12 (buttons/inputs/nav) · lg 16 (cards) · xl 20 · 2xl 24 (hero/modals) · 3xl 28–32 (feature panels) · full 999px (avatars/badges/pills).
- **Shadows:** sm=cards, md=hover/active, lg=modals, xl=hero. Brand glow on primary CTAs: `box-shadow:0 10px 20px rgba(79,70,229,.22)`.
- **Glass:** `rgba(255,255,255,.65)` / `blur(20px)` / `border rgba(255,255,255,.2)` light; `rgba(11,17,32,.6)` dark. Hero glass chips: `bg-white/10 + blur-xl + border-white/20`.

---

## 5. App Shell

```
┌── SIDEBAR (fixed 260px, collapsible→72px, mobile→drawer 290px) ──┬── HEADER (sticky, 72px, glass) ──┐
│ brand-mark: 40px radius-12 gradient indigo→cyan, GraduationCap   │  title 18px/700 + subtitle 12px │
│ nav: section label (11px uppercase) + links (44px, radius-12)    │  right: search-pill, Bell+dot,  │
│ active link: indigo-tint gradient bg + 3px indigo left bar       │  Sparkles, <UserButton/>        │
│ footer: mini user card + collapse toggle                         │                                 │
└───────────────────────────────────────────────────────────────────┴─────────────────────────────────┘
```
- Content `margin-left` 260→72px, `transition:300ms cubic-bezier(0.4,0,0.2,1)`; collapse state in `localStorage('sidebar_collapsed')`.
- Mobile drawer spring `{damping:25,stiffness:300}`, backdrop `rgba(2,6,23,.5)`.
- Main scroll area: `height:calc(100vh - 72px); overflow-y:auto`.

---

## 6. Components (recipes)

- **`.btn`** base: 40px, radius 12, 14px/700, gap 8. Variants: `btn-primary` (indigo+glow), `btn-secondary` (indigo-light bg), `btn-ghost`, `btn-danger`, `btn-light` (white on hero), `btn-glass` (white/12 on hero). Disabled `opacity:.6`.
- **`.card`**: `border:1px solid --border-subtle; radius:16px; bg:--bg-surface; shadow-sm; padding:20px;` hover→shadow-md; optional `whileHover={{y:-2,scale:1.01}}`.
- **StatCard**: label+icon row → value 30px/700 → trend row 12px (`↑` green / `↓` red).
- **Badge**: radius-full, 12px/800, `padding:5px 9px`; classes `badge-success/warning/danger/info` (+paid/present/due/overdue/etc.) → semantic palettes.
- **quick-link** (dashboard grid): min-h 128px, radius 18, icon 42px radius-14 tinted square + title 15px/700 + caption 12px muted.
- **Tabs**: segmented `p-1.5 rounded-2xl bg-slate-100 dark:bg-slate-900`; active=`bg-white dark:bg-slate-800 text-indigo-600 shadow-md`; inactive muted. Filter pills: selected=`bg-indigo-600 text-white shadow-indigo-500/20`.
- **timeline-item**: `border --border-subtle, radius 14, bg --bg-elevated, padding 14px` = title 14px/800 + meta 12px + Badge.
- **Progress bar**: track `bg-slate-200 dark:bg-slate-700 h-2.5 rounded-full`; fill gradient indigo→purple, animate width via Framer Motion `{duration:.8,ease:'easeOut'}`.
- **Inputs**: `px-4 py-2.5 rounded-xl bg-white dark:bg-slate-900 border-slate-200 dark:border-slate-700`, focus `border-indigo-500 ring-2 ring-indigo-500/30`; labels 12px/600.
- **Stepper**: dots 8px — active `bg-indigo-600 scale-125`, done `bg-emerald-500`, next `bg-slate-200`; connector `h-0.5 w-8`.
- **EmptyState**: centered p-12, muted 4xl icon, 16px/600 title, 14px muted desc (max-w 320px). Friendly copy, never "No data found".
- **Skeleton**: gradient shimmer, `animation:skeleton-pulse 1.5s ease-in-out infinite`.

---

## 7. Hero (signature)

```css
.hero-card { position:relative; overflow:hidden; border-radius:24px;
  background:linear-gradient(135deg, rgba(79,70,229,.96), rgba(17,24,39,.98) 62%, rgba(6,182,212,.9));
  color:#fff; padding:26px; box-shadow:var(--shadow-xl); }
```
Structure: eyebrow → title `clamp(30px,5vw,56px)`/800 → copy `rgba(255,255,255,.78)` 15px → `btn-light`+`btn-glass` → meta-grid of glass tiles (label 12px white/65, value 18px bold).

**Premium variant** (feature pages): `background:radial-gradient(135% 135% at 0% 0%, #4F46E5, #3730A3 50%, #1E1B4B 100%)` + `border-white/10`. Add: 2 blurred orbs (`w-80 bg-indigo-400/20 blur-3xl`), badge pill `bg-white/10 blur-md border-white/20` with pulsing amber Sparkles, "Next class" pill `bg-white/15 blur-xl` + `animate-ping` emerald dot, 3 metric tiles `bg-white/10 blur-xl` (icon 40px, number 3xl/800, label white/70).

---

## 8. Motion (Framer Motion)

| Use | Recipe |
|---|---|
| Page/section enter | `{opacity:0,y:15}→{opacity:1,y:0}` ease `[0.16,1,0.3,1]`, 0.25–0.4s |
| Tab switch | `AnimatePresence mode="wait"`, exit `{opacity:0,y:-15}` |
| Multi-step flow | slide: enter `{opacity:0,x:24}`, exit `{opacity:0,x:-24}` |
| Card hover | `whileHover={{y:-4,scale:1.01}}` spring `{stiffness:350,damping:25}` |
| Drawer | spring `{damping:25,stiffness:300}` |
| Success check | `{scale:0}→1` spring `{stiffness:200,damping:15}` |
| Buttons | `active:scale-95`; cards reveal gradient top bar on hover |

---

## 9. Responsive

- `<420px`: hero padding `22px 18px`, title 30px, timeline stacks column.
- `640px` / `768px` / `1024px`: grid cols 2/3, sidebar switches to drawer at 1024, search-pill appears at 1024, page padding 24→32px.
- Grids: `repeat(auto-fit, minmax(220px,1fr))` for stats, `minmax(150px,1fr)` quick links, `minmax(300px,1fr)` dashboard cards.

---

## 10. Icons & UX

- **lucide-react**: Dashboard=Home, Coaching=GraduationCap, Attendance=BarChart3, Fees=Wallet, Notes=FileText, Exams=ClipboardList, Results=Trophy, Routine=Calendar, Notices=Megaphone, Profile=User, Settings=Settings, Bell, Sparkles, Search, Key, Clock, MapPin, BookOpen, Loader2, CheckCircle2, XCircle, AlertTriangle, RefreshCw, Building2, ChevronLeft/Right, ArrowRight.
- **Bangladesh**: currency `৳ 5,500`, dates `DD MMM YYYY`, 12h time, bKash/Nagad in fee copy.

---

## 11. Page Recipe

1. `<div className="flex flex-col gap-6">` (feature pages: `gap-8 pb-16 max-w-7xl mx-auto`).
2. Hero (or `section-head`: eyebrow + title + `section-link`).
3. Content grid (stat-grid / quick-grid / dashboard-grid / `md:grid-cols-2`).
4. Lists in `Card` via `section-head` + `list-stack` + `timeline-item`.
5. Every loading state → `Skeleton`; every empty state → `EmptyState`.
6. Interactivity → Framer Motion recipes (§8).

---

## 12. Stack & Order

**Stack:** Next.js App Router · custom CSS in `globals.css` + handwritten utilities (NO Tailwind framework) · lucide-react · framer-motion · @clerk/nextjs (`<UserButton/>`) · Inter.

**Build order:**
1. Tokens (§2) + body glow → 2. Base + utility classes → 3. Shell (AppShell/Sidebar/Header §5) → 4. UI kit (Card/Badge/StatCard/Button/EmptyState/Skeleton) → 5. Hero (§7) → 6. Motion recipes → 7. Dark mode check → 8. Rebuild Dashboard page as reference, clone for all routes → 9. New components derive from these recipes. **New tokens forbidden.**
