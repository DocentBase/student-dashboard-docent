# Feature 11 — Layout & Navigation

## Purpose
Define the shared application shell that wraps all pages. Uses a **sidebar on both desktop and mobile** (Facebook-style slide-in drawer on mobile). **NO bottom navigation bar.** The layout must feel premium, aesthetic, and polished on every screen size.

---

## Layout Architecture

```
┌────────────────────────────────────────────────┐
│ DESKTOP (≥ 1024px)                             │
├──────────┬─────────────────────────────────────┤
│          │ Header                              │
│          │ [Course Switcher] [🔔] [Avatar]     │
│ Sidebar  ├─────────────────────────────────────┤
│ (Fixed)  │                                     │
│          │                                     │
│ Logo     │        Page Content                 │
│          │        (scrollable area)            │
│ • Home   │                                     │
│ • Attend │                                     │
│ • Fees   │                                     │
│ • Notes  │                                     │
│ • Exams  │                                     │
│ • Result │                                     │
│ • Routine│                                     │
│ • Notice │                                     │
│ ─────────│                                     │
│ • Profile│                                     │
│ • Setting│                                     │
│          │                                     │
├──────────┴─────────────────────────────────────┤
└────────────────────────────────────────────────┘

┌────────────────────────┐
│ TABLET (768–1023px)    │
├────────────────────────┤
│ Header                 │
│ [☰] [Title] [🔔] [👤] │
├────────────────────────┤
│                        │
│  Page Content          │
│  (scrollable)          │
│                        │
│  Sidebar = Drawer      │
│  (swipe/tap ☰ to open)│
│                        │
└────────────────────────┘

┌────────────────────────┐
│ MOBILE (< 768px)       │
├────────────────────────┤
│ Header                 │
│ [☰] [Title] [🔔] [👤] │
├────────────────────────┤
│                        │
│  Page Content          │
│  (scrollable)          │
│                        │
│  Sidebar = Drawer      │
│  (swipe from left edge │
│   or tap ☰ to open)   │
│                        │
└────────────────────────┘

┌────────────────────────┐
│ SIDEBAR DRAWER (Open)  │
├────────────────────────┤
│ ┌──────────────┐  ░░░░ │
│ │ Logo + Close │  ░░░░ │
│ │──────────────│  ░░░░ │
│ │ Course Switch│  ░░░░ │
│ │──────────────│  ░░░░ │
│ │ 🏠 Dashboard │ Overlay│
│ │ 📊 Attendance│  ░░░░ │
│ │ 💰 Fees      │  ░░░░ │
│ │ 📝 Notes     │  ░░░░ │
│ │ 📋 Exams     │  ░░░░ │
│ │ 📊 Results   │  ░░░░ │
│ │ 📅 Routine   │  ░░░░ │
│ │ 📢 Notices   │  ░░░░ │
│ │──────────────│  ░░░░ │
│ │ 👤 Profile   │  ░░░░ │
│ │ ⚙️ Settings  │  ░░░░ │
│ │ 🚪 Logout    │  ░░░░ │
│ └──────────────┘  ░░░░ │
└────────────────────────┘
```

---

## Components

### 1. AppShell (`src/components/layout/AppShell.tsx`)
- Wraps all authenticated pages
- Contains Sidebar (desktop) + SidebarDrawer (mobile/tablet) + Header
- Manages responsive breakpoint switching
- Provides scroll area for page content
- Handles **active course/batch context** (passed to all child pages)

### 2. Sidebar (Desktop — Persistent)
- **Width**: 260px expanded, 72px collapsed (icon rail)
- **Position**: Fixed left
- **Collapse toggle**: Button at bottom of sidebar to collapse/expand (persisted in localStorage)
- **Content**:
  - **Top**: App logo ("DocentBase" or institution logo) + collapse button
  - **Course Switcher**: Dropdown showing active course/batch name (if student is in multiple courses)
  - **Navigation links** with icons (Lucide React):
    - 🏠 Dashboard → `/`
    - 📊 Attendance → `/attendance`
    - 💰 Fees → `/fees`
    - 📝 Notes → `/notes`
    - 📋 Exams → `/exams`
    - 📊 Results → `/results`
    - 📅 Routine → `/routine`
    - 📢 Notices → `/notices`
    - ─── Divider ───
    - 👤 Profile → `/profile`
    - ⚙️ Settings → `/settings`
  - **Active link**: Accent background fill + left border bar + bold text
  - **Hover**: Subtle background lift + scale micro-animation
  - **Badge**: Unread count on Notices link, fee due indicator on Fees link
- **Design**: Premium feel — subtle glassmorphism background, smooth border, elegant shadows. White in light mode, deep charcoal in dark mode.
- **Animations**: Framer Motion for collapse/expand transition

### 3. Sidebar Drawer (Mobile & Tablet — Overlay)
- **Trigger**: Hamburger (☰) icon in the header OR swipe gesture from left screen edge
- **Width**: 280px (approximately 80% of screen on small phones)
- **Position**: Slides in from the left with Framer Motion animation
- **Overlay**: Dark semi-transparent backdrop behind the drawer (tap to close)
- **Close**: X button in drawer header, tap overlay, swipe left
- **Content**: Same navigation links as desktop sidebar
- **Course Switcher**: Prominent at top of drawer (below logo)
- **User section at bottom**: Profile photo mini + name + logout button
- **Design**: Same premium aesthetic as desktop sidebar
- **Gesture**: Supports swipe-to-close (drag left to dismiss)
- **Animation**: Spring-based slide-in via Framer Motion, backdrop fade

### 4. Header Bar
- **Position**: Fixed top (full width on mobile/tablet, right of sidebar on desktop)
- **Height**: 60px
- **Content**:
  - **Mobile/Tablet Left**: Hamburger ☰ button + Page title
  - **Desktop Left**: Page title (or breadcrumb if nested)
  - **Center (Mobile)**: Course/batch name (if in multi-course mode)
  - **Right**: 🔔 Notification bell (with unread badge) + 👤 Profile avatar (small circle)
- **Design**: Clean, premium — subtle glass blur background, thin bottom border or shadow
- **Actions**:
  - Bell → Opens notification panel
  - Avatar → Dropdown with Profile, Settings, Logout links

### 5. Course/Batch Switcher
- **Location**: Inside sidebar (both desktop and mobile drawer)
- **Design**: Dropdown with current course name + chevron
- **Content per option**: Course/batch name + subject/class info
- **Behavior**: Switching course refreshes all page data for the new context
- **Single course**: If student is enrolled in only one course, the switcher is hidden
- **Animation**: Smooth dropdown with Framer Motion

### 6. Notification Panel
- Triggered by bell icon in header
- **Desktop**: Side panel sliding in from right (320px wide)
- **Mobile**: Full-screen or bottom sheet
- **Content**: List of recent notifications
- **Types**: Exam reminders, notice alerts, fee due alerts, new notes, result published
- **Each item**: Icon + title + time ago + read/unread indicator
- **Action**: Tap to navigate to related page
- **Design**: Premium card list with subtle dividers

### 7. User Menu (Avatar Dropdown)
- Triggered by avatar click in header
- **Design**: Floating dropdown card with shadow
- **Content**:
  - Student name + email
  - Profile photo (large)
  - Quick links: Profile, Settings
  - Logout button (red accent)

---

## Route Group Structure

```
src/app/
├── (auth)/                     # Public auth pages (Clerk)
│   ├── sign-in/
│   └── sign-up/
├── (portal)/                   # Protected portal pages (wrapped in AppShell)
│   ├── layout.tsx              # AppShell layout wrapper + CourseProvider
│   ├── page.tsx                # Dashboard
│   ├── attendance/
│   ├── fees/
│   ├── notes/
│   ├── exams/
│   ├── results/
│   ├── routine/
│   ├── notices/
│   ├── profile/
│   └── settings/
├── course-select/              # Course selector page (if multi-enrolled)
│   └── page.tsx
└── layout.tsx                  # Root layout (ClerkProvider, ThemeProvider, fonts)
```

---

## File Structure

```
src/components/layout/
├── AppShell.tsx                # Main layout wrapper
├── Sidebar.tsx                 # Desktop persistent sidebar
├── SidebarDrawer.tsx           # Mobile/tablet slide-in drawer sidebar
├── Header.tsx                  # Top header bar
├── CourseSwitcher.tsx          # Course/batch context switcher
├── NotificationPanel.tsx       # Notification side panel / sheet
├── NavLink.tsx                 # Reusable navigation link component
├── UserMenu.tsx                # Profile avatar dropdown
└── SidebarContent.tsx          # Shared navigation content (used by both Sidebar & SidebarDrawer)
```

---

## Design Tokens

```css
:root {
  /* Layout */
  --sidebar-width: 260px;
  --sidebar-collapsed: 72px;
  --header-height: 60px;
  --drawer-width: 280px;

  /* Colors - Light */
  --bg-primary: #FAFBFC;
  --bg-secondary: #FFFFFF;
  --bg-sidebar: #FFFFFF;
  --bg-sidebar-hover: #F1F5F9;
  --bg-glass: rgba(255, 255, 255, 0.72);
  --text-primary: #1A1A2E;
  --text-secondary: #64748B;
  --text-muted: #94A3B8;
  --accent: #4F46E5;
  --accent-light: #EEF2FF;
  --accent-hover: #4338CA;

  /* Colors - Dark */
  --bg-primary-dark: #0B1120;
  --bg-secondary-dark: #151D2E;
  --bg-sidebar-dark: #111827;
  --bg-sidebar-hover-dark: #1E293B;
  --bg-glass-dark: rgba(15, 23, 42, 0.80);
  --text-primary-dark: #F1F5F9;
  --text-secondary-dark: #94A3B8;
  --text-muted-dark: #64748B;

  /* Status Colors */
  --color-success: #10B981;
  --color-danger: #EF4444;
  --color-warning: #F59E0B;
  --color-info: #3B82F6;

  /* Borders & Shadows */
  --border-color: #E2E8F0;
  --border-color-dark: #1E293B;
  --shadow-sm: 0 1px 3px rgba(0, 0, 0, 0.04);
  --shadow-md: 0 4px 12px rgba(0, 0, 0, 0.06);
  --shadow-lg: 0 8px 24px rgba(0, 0, 0, 0.08);
  --shadow-xl: 0 16px 48px rgba(0, 0, 0, 0.12);
  --radius-sm: 8px;
  --radius-md: 12px;
  --radius-lg: 16px;
  --radius-xl: 20px;
  --radius-full: 9999px;

  /* Typography */
  --font-family: 'Inter', -apple-system, BlinkMacSystemFont, sans-serif;
  --font-size-xs: 0.75rem;    /* 12px */
  --font-size-sm: 0.875rem;   /* 14px */
  --font-size-base: 1rem;     /* 16px */
  --font-size-lg: 1.125rem;   /* 18px */
  --font-size-xl: 1.25rem;    /* 20px */
  --font-size-2xl: 1.5rem;    /* 24px */
  --font-size-3xl: 1.875rem;  /* 30px */
  --font-size-4xl: 2.25rem;   /* 36px */
  --line-height-tight: 1.25;
  --line-height-normal: 1.5;
  --line-height-relaxed: 1.75;

  /* Transitions */
  --transition-fast: 150ms cubic-bezier(0.4, 0, 0.2, 1);
  --transition-normal: 250ms cubic-bezier(0.4, 0, 0.2, 1);
  --transition-slow: 350ms cubic-bezier(0.4, 0, 0.2, 1);
  --spring-bounce: cubic-bezier(0.34, 1.56, 0.64, 1);

  /* Glassmorphism */
  --glass-bg: rgba(255, 255, 255, 0.6);
  --glass-bg-dark: rgba(15, 23, 42, 0.6);
  --glass-blur: 16px;
  --glass-border: 1px solid rgba(255, 255, 255, 0.18);
}
```

---

## Animation Guidelines (Framer Motion)

All animations must use **Framer Motion** for consistency and premium feel:

| Element | Animation |
|---|---|
| Sidebar Drawer open | `x: [-280, 0]` with spring damping |
| Sidebar Drawer close | `x: [0, -280]` with spring damping |
| Backdrop fade | `opacity: [0, 0.5]` on overlay |
| Sidebar collapse | `width: [260, 72]` with spring |
| Nav link hover | `scale: 1.02`, `backgroundColor` transition |
| Nav link active | Left border bar slide-in |
| Page transitions | `opacity` + `y: [8, 0]` fade-up on mount |
| Notification panel | `x: [320, 0]` slide-in from right |
| User menu dropdown | `opacity` + `scale: [0.95, 1]` + `y: [-4, 0]` |
| Course switcher | `height: auto` + `opacity` on options list |

---

## Acceptance Criteria

- [ ] Desktop sidebar is persistent and collapsible (260px ↔ 72px)
- [ ] Mobile/tablet uses a sidebar drawer (NO bottom navigation bar)
- [ ] Sidebar drawer opens via hamburger tap OR left-edge swipe gesture
- [ ] Sidebar drawer closes via X button, overlay tap, or swipe-left gesture
- [ ] Active navigation link highlighted with accent color + left bar
- [ ] Course/batch switcher visible in sidebar (hidden if single course)
- [ ] Switching course refreshes all page data
- [ ] Unread notification badge on bell icon and notices link
- [ ] Profile avatar dropdown shows Profile, Settings, Logout
- [ ] Header is fixed and always visible
- [ ] Page content scrolls independently beneath fixed header
- [ ] All transitions use Framer Motion (no CSS-only animations)
- [ ] Glassmorphism applied to header and sidebar backgrounds
- [ ] Dark mode applies to all layout components seamlessly
- [ ] Safe area padding on mobile (notch/home indicator devices)
- [ ] All interactive elements have hover/focus/active states
- [ ] Navigation is keyboard-accessible (Tab + Enter)
- [ ] Premium aesthetic maintained across 320px–1920px
- [ ] Sidebar drawer has the same nav items as desktop sidebar
- [ ] Web and mobile layouts are both given equal design attention
