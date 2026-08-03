# Student Portal — Feature Overview & Navigation Map

## Project Context

This is a **dedicated Student Portal** (`student.docentbase.com`) completely separate from the Staff/Admin Dashboard (`dashboard.docentbase.com`). Both are part of the **DocentBase** ecosystem and **share the same database (Neon PostgreSQL) and authentication provider (Clerk)**. The student portal is focused exclusively on the student's academic journey while the staff dashboard handles all management and administrative functionality.

### Ecosystem Compatibility

| Property | Staff Dashboard (`dashboard.docentbase.com`) | Student Portal (`student.docentbase.com`) |
|---|---|---|
| **Framework** | Next.js 14 (App Router) | Next.js (App Router) |
| **Auth** | Clerk Organizations + Custom Roles | Clerk (student role only) |
| **Database** | Neon PostgreSQL | **Same** Neon PostgreSQL (shared tables) |
| **Deploy** | Cloudflare Workers (OpenNext) | Cloudflare Workers (OpenNext) |
| **Styling** | Tailwind CSS 3 + Framer Motion | Vanilla CSS + Framer Motion |
| **Data Scope** | Full CRUD (all modules) | Read-only (student's own data) |

> **Critical**: Both applications read from and write to the **same Neon PostgreSQL database**. Tables like `students`, `batches`, `attendance`, `fees`, `exams`, `results`, `notices`, `notes`, and `routines` are shared. The student portal is strictly **read-only** while the staff dashboard performs writes. Schema design must ensure compatibility.

- **Tech Stack (Web)**: Next.js (App Router) on OpenNext/Cloudflare, Neon PostgreSQL, Clerk (auth only — student name & profile photo stored in Clerk, everything else in the database), Resend (emails)
- **Tech Stack (Mobile — Future)**: React Native + Expo framework (sharing the same API layer and database)
- **Deployment**: Cloudflare Workers via `npm run deploy`

---

## Navigation Structure

```
Login (Clerk)
    │
    ▼
Course Selector (if enrolled in multiple courses/batches)
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

> **UI/UX aesthetics are the #1 priority. Visual excellence is non-negotiable. Fast loading is important but secondary to delivering a premium, stunning experience.**

1. **Premium & Aesthetic UI** — The portal must look and feel like a high-end consumer app, not a cheap admin panel. Think Apple-quality polish, Notion-like elegance, Linear-like precision. Every pixel matters.
2. **Web & Mobile Are Equal Priority** — Both platforms must be developed to the same standard of excellence. Neither is secondary. Desktop gets the full sidebar experience. Mobile gets a swipe-open sidebar drawer (Facebook-style), NOT a bottom navigation bar.
3. **Visual Excellence Over Performance** — Rich animations (Framer Motion), glassmorphism, gradients, micro-interactions, and beautiful typography come first. Optimize loading speed after achieving the aesthetic vision.
4. **Clean Typography** — Use Inter or similar modern sans-serif from Google Fonts. Careful font sizing hierarchy with generous line heights.
5. **Spacious Layouts** — Generous padding, whitespace, and breathing room. Never cramped.
6. **Sidebar Navigation (Both Desktop & Mobile)** — Desktop: persistent collapsible sidebar. Mobile: hamburger-triggered sidebar drawer that slides in from the left (Facebook-style). **NO bottom navigation bar.**
7. **Student-Focused** — Every page answers one clear question with zero complexity.
8. **No Business/Admin Appearance** — This should feel like a polished educational app, not a management system.

---

## Color & Theme Direction

- Light mode default with dark mode toggle
- Primary: A calm, trustworthy blue or indigo
- Accent: A warm complementary color for CTAs
- Backgrounds: Off-white / soft gray (light), deep charcoal (dark)
- Cards: Subtle shadows, rounded corners (12–16px), glassmorphism on hero elements
- Status Colors: Green (present/paid), Red (absent/due), Amber (warning), Blue (info)
- Gradients: Subtle linear gradients on hero cards and welcome banners
- Micro-animations: Hover lifts, press scales, page transitions, staggered list entrances

---

## Multi-Course/Batch Architecture

> **Critical Design Decision**: A student can be enrolled in **multiple courses/batches** simultaneously (e.g., "Class 10 Math" and "Class 10 Science" at the same coaching center, or even across organizations).

### How Multi-Course Is Solved

1. **Course/Batch Selector**: After login, if a student is enrolled in multiple courses/batches, a course selector screen appears. The student picks which course context to view.
2. **Active Course Context**: The entire portal (attendance, fees, exams, results, routine, notices, notes) displays data for the **currently selected course/batch only**.
3. **Course Switcher**: A persistent course/batch switcher is available in the sidebar header — students can switch context without going back to the selector.
4. **Aggregated Dashboard**: The dashboard homepage can show a summary across ALL enrolled courses (total attendance %, total pending fees) with per-course cards below.
5. **Database Design**: All data tables (`attendance`, `fees`, `results`, etc.) are scoped by `batch_id` + `student_id`, enabling per-course queries.

```
Student → enrolled_in → [Batch A, Batch B, Batch C]
                          │
                          ▼
                 Active Context: Batch A
                 (All pages show Batch A data)
```

---

## Shared Layout Components

| Component | Description |
|---|---|
| `AppShell` | Main layout wrapper with sidebar + header |
| `Sidebar` | Persistent sidebar (desktop) / Drawer sidebar (mobile) |
| `SidebarDrawer` | Mobile slide-in sidebar (hamburger trigger, swipe to open/close) |
| `Header` | Top bar with hamburger (mobile), course switcher, notifications, avatar |
| `CourseSwitcher` | Dropdown/pill to switch active course/batch context |
| `PageHeader` | Reusable page title + breadcrumb component |
| `Card` | Reusable content card with consistent styling |
| `StatCard` | Metric display card (number + label + trend) |
| `EmptyState` | Friendly empty state illustration + message |
| `LoadingSkeleton` | Skeleton loading states for every page |

---

## Data Source Architecture

| Data | Source | Notes |
|---|---|---|
| Student name | Clerk (`user.firstName`, `user.lastName`) | Stored in Clerk profile |
| Profile photo | Clerk (`user.imageUrl`) | Stored in Clerk profile |
| All other student data | Neon PostgreSQL | Class, roll, batch, section, guardian info, etc. |
| Attendance records | Neon PostgreSQL | Written by staff dashboard, read by student portal |
| Fee records | Neon PostgreSQL | Written by staff dashboard, read by student portal |
| Exam schedules | Neon PostgreSQL | Written by staff dashboard, read by student portal |
| Results/marks | Neon PostgreSQL | Written by staff dashboard, read by student portal |
| Routine/schedule | Neon PostgreSQL | Written by staff dashboard, read by student portal |
| Notices | Neon PostgreSQL | Written by staff dashboard, read by student portal |
| Notes/resources | Neon PostgreSQL + file storage | Written by staff dashboard, read by student portal |

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

## Mobile App Stack (Future)

| Layer | Technology |
|---|---|
| **Framework** | React Native |
| **Tooling** | Expo |
| **Navigation** | React Navigation (drawer + stack) |
| **API** | Same Next.js API routes (REST) |
| **Auth** | Clerk React Native SDK |
| **Database** | Same Neon PostgreSQL (via API) |
| **State** | React Query / TanStack Query |
| **Animations** | React Native Reanimated |

The mobile app will consume the **same API endpoints** as the web app, ensuring data consistency across platforms. The sidebar-drawer navigation pattern is chosen specifically to maintain UX parity between web (mobile viewport) and native mobile app.

---

## Permissions Summary

**Students CAN**: View their own attendance, fees, exams, results, routine, notices, notes, and profile — scoped to their enrolled courses/batches.

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
