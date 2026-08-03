# Feature 11 — Layout & Navigation

## Purpose
Define the shared application shell that wraps all pages, including the sidebar (desktop), bottom navigation (mobile), header, and global UI elements.

---

## Layout Architecture

```
┌──────────────────────────────────────────┐
│ DESKTOP (≥ 768px)                        │
├──────────┬───────────────────────────────┤
│          │ Header (Search + Bell + Avatar)│
│ Sidebar  ├───────────────────────────────┤
│          │                               │
│ • Home   │     Page Content              │
│ • Attend │                               │
│ • Fees   │                               │
│ • Notes  │                               │
│ • Exams  │                               │
│ • Result │                               │
│ • Routine│                               │
│ • Notice │                               │
│ ─────────│                               │
│ • Profile│                               │
│ • Setting│                               │
│          │                               │
├──────────┴───────────────────────────────┤
│                                          │
└──────────────────────────────────────────┘

┌─────────────────────┐
│ MOBILE (< 768px)    │
├─────────────────────┤
│ Header (Logo + Bell)│
├─────────────────────┤
│                     │
│  Page Content       │
│  (Scrollable)       │
│                     │
│                     │
├─────────────────────┤
│ Bottom Nav Bar      │
│ [🏠][📊][📝][📋][≡]│
└─────────────────────┘
```

---

## Components

### 1. AppShell (`src/components/layout/AppShell.tsx`)
- Wraps all authenticated pages
- Contains Sidebar (desktop) + BottomNav (mobile) + Header
- Manages responsive breakpoint switching
- Provides scroll area for page content

### 2. Sidebar (Desktop Only)
- **Width**: 240px collapsed icon-only option: 64px
- **Position**: Fixed left
- **Content**:
  - App logo/name at top
  - Navigation links with icons:
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
  - Active link highlighted with accent background + left border
  - Unread badge on Notices link
- **Design**: Clean, minimal, white/dark background, subtle hover effects

### 3. Bottom Navigation (Mobile Only)
- **Height**: 64px + safe area padding
- **Position**: Fixed bottom
- **Tabs** (5 primary, more in hamburger):
  - 🏠 Home → `/`
  - 📊 Attendance → `/attendance`
  - 📝 Notes → `/notes`
  - 📢 Notices → `/notices`
  - ☰ More → Opens drawer/sheet with remaining links
- **Active tab**: Filled icon + label + accent color
- **Inactive tab**: Outline icon only, muted color
- **Design**: Frosted glass effect / blur backdrop, subtle top border
- **Badge**: Unread count dot on Notices tab

### 4. Header Bar
- **Position**: Fixed top (full width on mobile, right of sidebar on desktop)
- **Height**: 56px
- **Content**:
  - Left: Page title (mobile) or logo (desktop, if sidebar collapsed)
  - Right: 🔍 Search icon (Future), 🔔 Notification bell (with badge), 👤 Profile avatar
- **Design**: Clean, minimal, subtle bottom border or shadow
- **Actions**:
  - Bell → Opens notification drawer/panel
  - Avatar → Dropdown with Profile, Settings, Logout links

### 5. More Menu (Mobile Sheet)
- Triggered by ☰ tab in bottom nav
- **Design**: Bottom sheet or drawer
- **Links**: All navigation items not in the bottom tab bar
  - 💰 Fees
  - 📋 Exams
  - 📊 Results
  - 📅 Routine
  - 👤 Profile
  - ⚙️ Settings
  - 🚪 Logout

### 6. Notification Panel
- Triggered by bell icon in header
- **Design**: Side panel (desktop) or bottom sheet (mobile)
- **Content**: List of recent notifications
- **Types**: Exam reminders, notice alerts, fee due alerts, new notes
- **Each item**: Icon + title + time ago + read/unread indicator
- **Action**: Tap to navigate to related page

---

## Route Group Structure

```
src/app/
├── (auth)/                     # Public auth pages (Clerk)
│   ├── sign-in/
│   └── sign-up/
├── (portal)/                   # Protected portal pages (wrapped in AppShell)
│   ├── layout.tsx              # AppShell layout wrapper
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
└── layout.tsx                  # Root layout (ClerkProvider, ThemeProvider, fonts)
```

---

## File Structure

```
src/components/layout/
├── AppShell.tsx                # Main layout wrapper
├── Sidebar.tsx                 # Desktop sidebar navigation
├── BottomNav.tsx               # Mobile bottom navigation
├── Header.tsx                  # Top header bar
├── MoreMenu.tsx                # Mobile "More" sheet
├── NotificationPanel.tsx       # Notification side panel / sheet
├── NavLink.tsx                 # Reusable navigation link component
└── UserMenu.tsx                # Profile avatar dropdown
```

---

## Design Tokens

```css
:root {
  /* Layout */
  --sidebar-width: 240px;
  --sidebar-collapsed: 64px;
  --header-height: 56px;
  --bottom-nav-height: 64px;

  /* Colors - Light */
  --bg-primary: #FAFBFC;
  --bg-secondary: #FFFFFF;
  --bg-sidebar: #FFFFFF;
  --text-primary: #1A1A2E;
  --text-secondary: #64748B;
  --accent: #4F46E5;
  --accent-light: #EEF2FF;

  /* Colors - Dark */
  --bg-primary-dark: #0F172A;
  --bg-secondary-dark: #1E293B;
  --bg-sidebar-dark: #1E293B;
  --text-primary-dark: #F1F5F9;
  --text-secondary-dark: #94A3B8;

  /* Borders & Shadows */
  --border-color: #E2E8F0;
  --shadow-sm: 0 1px 2px rgba(0,0,0,0.05);
  --shadow-md: 0 4px 6px rgba(0,0,0,0.07);
  --radius-sm: 8px;
  --radius-md: 12px;
  --radius-lg: 16px;

  /* Typography */
  --font-family: 'Inter', sans-serif;
  --font-size-xs: 0.75rem;
  --font-size-sm: 0.875rem;
  --font-size-base: 1rem;
  --font-size-lg: 1.125rem;
  --font-size-xl: 1.25rem;
  --font-size-2xl: 1.5rem;
  --font-size-3xl: 1.875rem;
}
```

---

## Acceptance Criteria

- [ ] Sidebar visible on desktop (≥768px), hidden on mobile
- [ ] Bottom navigation visible on mobile (<768px), hidden on desktop
- [ ] Active navigation link highlighted with accent color
- [ ] Unread notification badge on bell icon and notices link
- [ ] Profile avatar dropdown shows Profile, Settings, Logout
- [ ] "More" tab opens sheet with remaining navigation items
- [ ] Header is fixed and always visible
- [ ] Page content scrolls independently
- [ ] Smooth transitions between pages
- [ ] Dark mode applies to all layout components
- [ ] Safe area padding on mobile (notch devices)
- [ ] All interactive elements have hover/focus states
- [ ] Navigation is keyboard-accessible
- [ ] Responsive and functional from 320px to 1440px
