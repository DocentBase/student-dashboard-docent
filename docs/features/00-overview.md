# Student Portal — Feature Overview & Navigation Map

## Project Context

This is a **dedicated Student Portal** completely separate from any Staff/Admin system. It is focused exclusively on the student's academic journey.

- **Tech Stack**: Next.js (App Router) on OpenNext/Cloudflare, Neon PostgreSQL, Clerk (auth only), Resend (emails)
- **Design**: Premium, minimal, mobile-first, distraction-free
- **Deployment**: Cloudflare Workers via `npm run deploy`

---

## Navigation Structure

```
Login (Clerk)
    │
    ▼
Dashboard (/)
    ├── Attendance        (/attendance)
    ├── Fees & Payments   (/fees)
    ├── Notes & Resources (/notes)
    ├── Exams             (/exams)
    ├── Results           (/results)
    ├── Routine           (/routine)
    ├── Notice Board      (/notices)
    ├── Profile           (/profile)
    └── Settings          (/settings)
```

Every page must allow the user to return to the Dashboard in **one click**.

---

## Design Principles

1. **Premium & Minimal UI** — No cluttered admin-panel aesthetic.
2. **Mobile-First** — Every layout must work beautifully on phones first, then scale up.
3. **Fast Loading** — Minimal client-side JS; leverage server components.
4. **Clean Typography** — Use Inter or similar modern sans-serif from Google Fonts.
5. **Spacious Layouts** — Generous padding, whitespace, and breathing room.
6. **Simple Navigation** — Bottom tab bar on mobile, sidebar on desktop.
7. **Student-Focused** — Every page answers one clear question with zero complexity.
8. **No Business/Admin Appearance** — This should feel like a polished educational app.

---

## Color & Theme Direction

- Light mode default with dark mode toggle
- Primary: A calm, trustworthy blue or indigo
- Accent: A warm complementary color for CTAs
- Backgrounds: Off-white / soft gray (light), deep charcoal (dark)
- Cards: Subtle shadows, rounded corners (12–16px), glassmorphism on hero elements
- Status Colors: Green (present/paid), Red (absent/due), Amber (warning), Blue (info)

---

## Shared Layout Components

| Component | Description |
|---|---|
| `AppShell` | Main layout wrapper with sidebar/bottom-nav + header |
| `BottomNav` | Mobile bottom navigation bar (5 primary tabs) |
| `Sidebar` | Desktop side navigation with all links |
| `Header` | Top bar with search, notifications, profile avatar |
| `PageHeader` | Reusable page title + breadcrumb component |
| `Card` | Reusable content card with consistent styling |
| `StatCard` | Metric display card (number + label + trend) |
| `EmptyState` | Friendly empty state illustration + message |
| `LoadingSkeleton` | Skeleton loading states for every page |

---

## Feature Spec Files

Each feature is documented in its own file inside this directory:

| # | File | Route | Page |
|---|---|---|---|
| 01 | `01-dashboard.md` | `/` | Dashboard (Home) |
| 02 | `02-attendance.md` | `/attendance` | Attendance |
| 03 | `03-fees-payments.md` | `/fees` | Fees & Payments |
| 04 | `04-notes-resources.md` | `/notes` | Notes & Resources |
| 05 | `05-exams.md` | `/exams` | Exams |
| 06 | `06-results.md` | `/results` | Results |
| 07 | `07-routine.md` | `/routine` | Routine |
| 08 | `08-notice-board.md` | `/notices` | Notice Board |
| 09 | `09-profile.md` | `/profile` | Profile |
| 10 | `10-settings.md` | `/settings` | Settings |
| 11 | `11-layout-navigation.md` | — | Layout & Navigation |
| 12 | `12-permissions-security.md` | — | Permissions & Security |

---

## Permissions Summary

**Students CAN**: View their own attendance, fees, exams, results, routine, notices, notes, and profile.

**Students CANNOT**: Edit attendance, edit fees, edit marks, view other students, access staff pages, manage batches/users, or access organization settings.

---

## Build Order (Recommended)

1. Layout & Navigation (`11-layout-navigation.md`)
2. Dashboard (`01-dashboard.md`)
3. Routine (`07-routine.md`)
4. Attendance (`02-attendance.md`)
5. Notice Board (`08-notice-board.md`)
6. Fees & Payments (`03-fees-payments.md`)
7. Exams (`05-exams.md`)
8. Results (`06-results.md`)
9. Notes & Resources (`04-notes-resources.md`)
10. Profile (`09-profile.md`)
11. Settings (`10-settings.md`)
12. Permissions & Security (`12-permissions-security.md`)
