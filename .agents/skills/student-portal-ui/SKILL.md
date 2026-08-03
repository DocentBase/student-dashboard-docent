---
name: student-portal-ui
description: Complete UI/UX design system and component guide for the DocentBase Student Portal. Covers aesthetic direction, color system, typography, spacing, component patterns, animations, mobile sidebar drawer, glassmorphism, card designs, status indicators, and premium visual guidelines. Use when building any UI component, page, or layout for the student portal.
---

# Student Portal UI/UX Design System

> **Read this BEFORE writing any UI code.** This skill defines every visual decision so all agents produce consistent, premium, aesthetic output.

---

## 1. Design Philosophy

This is NOT an admin dashboard. This is a **premium educational consumer app**. Think:
- **Apple** — polish, precision, attention to detail
- **Notion** — clean, spacious, elegant typography
- **Linear** — sleek, modern, functional beauty
- **Arc Browser** — delightful micro-interactions

**The #1 priority is visual excellence.** Performance optimization comes after achieving the aesthetic vision.

---

## 2. Color System

### Light Mode Palette
```css
/* Backgrounds */
--bg-app: #FAFBFC;                    /* App background */
--bg-surface: #FFFFFF;                /* Card/surface background */
--bg-elevated: #FFFFFF;               /* Elevated surfaces (modals, dropdowns) */
--bg-subtle: #F1F5F9;                 /* Subtle backgrounds (hover states) */
--bg-sidebar: #FFFFFF;                /* Sidebar background */

/* Text */
--text-primary: #0F172A;              /* Primary text (headings, body) */
--text-secondary: #475569;            /* Secondary text (descriptions, labels) */
--text-muted: #94A3B8;                /* Muted text (timestamps, hints) */
--text-inverse: #FFFFFF;              /* Text on dark backgrounds */

/* Brand */
--brand-primary: #4F46E5;             /* Primary brand color (indigo) */
--brand-primary-hover: #4338CA;       /* Hover state */
--brand-primary-light: #EEF2FF;       /* Light tint for backgrounds */
--brand-primary-subtle: #E0E7FF;      /* Subtle tint */

/* Status */
--color-success: #10B981;             /* Present, Paid, Pass */
--color-success-light: #D1FAE5;
--color-danger: #EF4444;              /* Absent, Overdue, Fail */
--color-danger-light: #FEE2E2;
--color-warning: #F59E0B;             /* Low attendance, Due */
--color-warning-light: #FEF3C7;
--color-info: #3B82F6;                /* Holiday, Information */
--color-info-light: #DBEAFE;

/* Borders */
--border-default: #E2E8F0;
--border-subtle: #F1F5F9;
--border-strong: #CBD5E1;
```

### Dark Mode Palette
```css
--bg-app-dark: #0B1120;
--bg-surface-dark: #151D2E;
--bg-elevated-dark: #1E293B;
--bg-subtle-dark: #1E293B;
--bg-sidebar-dark: #0F172A;

--text-primary-dark: #F1F5F9;
--text-secondary-dark: #94A3B8;
--text-muted-dark: #64748B;

--brand-primary-dark: #818CF8;         /* Lighter indigo for dark mode */
--brand-primary-hover-dark: #A5B4FC;
--brand-primary-light-dark: rgba(99, 102, 241, 0.15);

--border-default-dark: #1E293B;
--border-subtle-dark: #0F172A;
```

### Notice Category Colors
| Category | Dot Color | Background |
|---|---|---|
| Important | `#EF4444` | `#FEE2E2` |
| Academic | `#3B82F6` | `#DBEAFE` |
| Holiday | `#10B981` | `#D1FAE5` |
| Exam | `#F59E0B` | `#FEF3C7` |

---

## 3. Typography

### Font
```css
font-family: 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif;
```
Import via Google Fonts: `https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&display=swap`

### Scale
| Token | Size | Weight | Use |
|---|---|---|---|
| `heading-xl` | 30px / 1.875rem | 700 | Page titles |
| `heading-lg` | 24px / 1.5rem | 700 | Section headers |
| `heading-md` | 20px / 1.25rem | 600 | Card titles |
| `heading-sm` | 16px / 1rem | 600 | Sub-headers |
| `body-lg` | 16px / 1rem | 400 | Primary body text |
| `body-md` | 14px / 0.875rem | 400 | Secondary text, descriptions |
| `body-sm` | 12px / 0.75rem | 400 | Timestamps, captions, badges |
| `label` | 14px / 0.875rem | 500 | Form labels, nav items |

### Line Heights
- Headings: 1.25 (tight)
- Body: 1.5 (comfortable)
- Descriptions: 1.6 (relaxed)

---

## 4. Spacing System

Use a **4px base grid** with these increments:

| Token | Value | Use |
|---|---|---|
| `space-1` | 4px | Tight spacing (icon gaps) |
| `space-2` | 8px | Inline element gaps |
| `space-3` | 12px | Compact padding |
| `space-4` | 16px | Default padding |
| `space-5` | 20px | Comfortable padding |
| `space-6` | 24px | Section gaps |
| `space-8` | 32px | Large section gaps |
| `space-10` | 40px | Page section separators |
| `space-12` | 48px | Major page sections |
| `space-16` | 64px | Extra large spacing |

### Page Padding
- Desktop: `32px` horizontal, `24px` vertical
- Tablet: `24px` horizontal, `20px` vertical
- Mobile: `16px` horizontal, `16px` vertical

---

## 5. Border Radius

| Token | Value | Use |
|---|---|---|
| `radius-sm` | 8px | Buttons, chips, inputs |
| `radius-md` | 12px | Cards, dropdowns |
| `radius-lg` | 16px | Hero cards, modals |
| `radius-xl` | 20px | Welcome card, feature cards |
| `radius-full` | 9999px | Avatars, badges, pills |

---

## 6. Shadows & Elevation

```css
/* Light mode */
--shadow-xs: 0 1px 2px rgba(0, 0, 0, 0.03);
--shadow-sm: 0 1px 3px rgba(0, 0, 0, 0.05), 0 1px 2px rgba(0, 0, 0, 0.03);
--shadow-md: 0 4px 6px rgba(0, 0, 0, 0.04), 0 2px 4px rgba(0, 0, 0, 0.03);
--shadow-lg: 0 10px 15px rgba(0, 0, 0, 0.06), 0 4px 6px rgba(0, 0, 0, 0.04);
--shadow-xl: 0 20px 25px rgba(0, 0, 0, 0.08), 0 8px 10px rgba(0, 0, 0, 0.04);

/* Dark mode — softer, less noticeable */
--shadow-sm-dark: 0 1px 3px rgba(0, 0, 0, 0.3);
--shadow-md-dark: 0 4px 6px rgba(0, 0, 0, 0.4);
--shadow-lg-dark: 0 10px 15px rgba(0, 0, 0, 0.5);
```

### Elevation Layers
| Layer | Shadow | Use |
|---|---|---|
| Base | `shadow-xs` | Subtle card borders |
| Card | `shadow-sm` | Content cards |
| Raised | `shadow-md` | Hovered cards, active elements |
| Overlay | `shadow-lg` | Dropdowns, popovers |
| Modal | `shadow-xl` | Modals, sheets |

---

## 7. Glassmorphism

Use glassmorphism for **premium elements** only (header, sidebar, hero cards, modals):

```css
.glass {
  background: rgba(255, 255, 255, 0.65);
  backdrop-filter: blur(16px);
  -webkit-backdrop-filter: blur(16px);
  border: 1px solid rgba(255, 255, 255, 0.2);
}

.glass-dark {
  background: rgba(15, 23, 42, 0.65);
  backdrop-filter: blur(16px);
  -webkit-backdrop-filter: blur(16px);
  border: 1px solid rgba(255, 255, 255, 0.08);
}
```

**Use sparingly**: Header bar, sidebar background, welcome card overlay, notification panel.

---

## 8. Component Patterns

### Cards
```css
.card {
  background: var(--bg-surface);
  border-radius: 12px;
  padding: 20px;
  border: 1px solid var(--border-subtle);
  box-shadow: var(--shadow-sm);
  transition: all 250ms cubic-bezier(0.4, 0, 0.2, 1);
}

.card:hover {
  box-shadow: var(--shadow-md);
  transform: translateY(-1px);
}
```

### Stat Cards
```
┌────────────────────┐
│ 📊  Label          │
│                    │
│   82%              │  ← Large number (heading-xl weight 700)
│   ████████░░       │  ← Optional progress bar
│                    │
│   ↑ 3% from last   │  ← Trend indicator (green/red)
└────────────────────┘
```

### Status Badges
```css
.badge-paid    { background: #D1FAE5; color: #065F46; }
.badge-due     { background: #FEF3C7; color: #92400E; }
.badge-overdue { background: #FEE2E2; color: #991B1B; }
.badge-present { background: #D1FAE5; color: #065F46; }
.badge-absent  { background: #FEE2E2; color: #991B1B; }
.badge-late    { background: #FEF3C7; color: #92400E; }
.badge-holiday { background: #DBEAFE; color: #1E40AF; }
```

### Navigation Links (Sidebar)
```css
.nav-link {
  display: flex;
  align-items: center;
  gap: 12px;
  padding: 10px 16px;
  border-radius: 8px;
  color: var(--text-secondary);
  font-size: 14px;
  font-weight: 500;
  transition: all 200ms;
}

.nav-link:hover {
  background: var(--bg-subtle);
  color: var(--text-primary);
}

.nav-link.active {
  background: var(--brand-primary-light);
  color: var(--brand-primary);
  font-weight: 600;
  border-left: 3px solid var(--brand-primary);
}
```

### Buttons
| Variant | Background | Text | Border | Use |
|---|---|---|---|---|
| Primary | `brand-primary` | White | None | Main CTAs |
| Secondary | Transparent | `brand-primary` | `brand-primary` | Secondary actions |
| Ghost | Transparent | `text-secondary` | None | Tertiary actions |
| Danger | `color-danger` | White | None | Destructive actions |

---

## 9. Animation Guidelines (Framer Motion)

**ALL animations use Framer Motion.** No raw CSS transitions for component animations.

### Page Transitions
```tsx
// Wrap page content with this
<motion.div
  initial={{ opacity: 0, y: 8 }}
  animate={{ opacity: 1, y: 0 }}
  transition={{ duration: 0.3, ease: "easeOut" }}
>
  {children}
</motion.div>
```

### Card Hover
```tsx
<motion.div whileHover={{ y: -2, scale: 1.01 }} transition={{ type: "spring", stiffness: 300 }}>
```

### Staggered List Entry
```tsx
// Parent
<motion.div variants={container} initial="hidden" animate="show">
  {items.map(item => (
    <motion.div key={item.id} variants={listItem}>
```

### Number Count-Up
```tsx
// For stats like attendance %, GPA, marks
<motion.span
  initial={{ opacity: 0 }}
  animate={{ opacity: 1 }}
  transition={{ duration: 0.5 }}
>
  {/* Use a counter library or useMotionValue */}
</motion.span>
```

### Sidebar Drawer (Mobile)
```tsx
// Drawer slide-in
<motion.div
  initial={{ x: -280 }}
  animate={{ x: 0 }}
  exit={{ x: -280 }}
  transition={{ type: "spring", damping: 25, stiffness: 300 }}
>

// Backdrop
<motion.div
  initial={{ opacity: 0 }}
  animate={{ opacity: 0.5 }}
  exit={{ opacity: 0 }}
/>
```

---

## 10. Responsive Breakpoints

| Breakpoint | Width | Layout |
|---|---|---|
| Mobile S | 320px – 374px | Single column, tight padding |
| Mobile M | 375px – 424px | Single column, standard padding |
| Mobile L | 425px – 767px | Single column, comfortable padding |
| Tablet | 768px – 1023px | Two columns where needed, drawer sidebar |
| Desktop | 1024px – 1439px | Full layout, persistent sidebar |
| Desktop L | 1440px+ | Max-width container (1280px), centered |

### Media Query Snippets
```css
/* Mobile-first approach */
@media (min-width: 768px) { /* Tablet */ }
@media (min-width: 1024px) { /* Desktop */ }
@media (min-width: 1440px) { /* Large desktop */ }
```

---

## 11. Icons

Use **Lucide React** icons for consistency with the staff dashboard:
```
npm install lucide-react
```

Common icons used in the student portal:
| Icon | Use |
|---|---|
| `Home` | Dashboard |
| `BarChart3` | Attendance |
| `Wallet` | Fees |
| `FileText` | Notes |
| `ClipboardList` | Exams |
| `Trophy` | Results |
| `Calendar` | Routine |
| `Megaphone` | Notices |
| `User` | Profile |
| `Settings` | Settings |
| `Menu` | Hamburger |
| `Bell` | Notifications |
| `ChevronDown` | Dropdowns |
| `X` | Close |
| `LogOut` | Logout |

---

## 12. Empty States

Every page must have a beautiful empty state:
- Large illustration (SVG or generated image)
- Clear, friendly message (not "No data found")
- Optional action button

Examples:
- Attendance: "Your attendance record will appear here once your classes begin."
- Notes: "No study materials have been uploaded yet. Check back soon!"
- Results: "Your exam results will be published here when ready."

---

## 13. Loading Skeletons

Every page must show animated skeleton loading states:
```css
.skeleton {
  background: linear-gradient(90deg, 
    var(--bg-subtle) 25%, 
    var(--bg-surface) 50%, 
    var(--bg-subtle) 75%
  );
  background-size: 200% 100%;
  animation: skeleton-pulse 1.5s ease-in-out infinite;
  border-radius: 8px;
}

@keyframes skeleton-pulse {
  0% { background-position: 200% 0; }
  100% { background-position: -200% 0; }
}
```

Match the skeleton shapes to the actual content layout (cards, text lines, avatars).

---

## 14. Bangladesh-Specific UX

- **Currency**: Always display in BDT with ৳ symbol: `৳ 5,500`
- **Date format**: `DD MMM YYYY` (e.g., `03 Aug 2026`)
- **Time format**: 12-hour with AM/PM
- **Language**: English primary, Bengali (বাংলা) planned
- **Payment context**: bKash, Nagad references in fee instructions
