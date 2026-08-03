# Student Dashboard Project

A clean, modern, premium, and mobile-first Student Portal built for Cloudflare.

## Tech Stack
- **Framework**: Next.js (OpenNext for Cloudflare)
- **Database**: Neon PostgreSQL
- **Authentication**: Clerk
- **Email**: Resend
- **Deployment**: Cloudflare Workers / Pages

## Feature Specs

All feature specifications live in `docs/features/`:

| # | File | Page |
|---|---|---|
| 00 | `00-overview.md` | Master Overview & Navigation Map |
| 01 | `01-dashboard.md` | Dashboard (Home) |
| 02 | `02-attendance.md` | Attendance |
| 03 | `03-fees-payments.md` | Fees & Payments |
| 04 | `04-notes-resources.md` | Notes & Resources |
| 05 | `05-exams.md` | Exams |
| 06 | `06-results.md` | Results |
| 07 | `07-routine.md` | Routine |
| 08 | `08-notice-board.md` | Notice Board |
| 09 | `09-profile.md` | Profile |
| 10 | `10-settings.md` | Settings |
| 11 | `11-layout-navigation.md` | Layout & Navigation |
| 12 | `12-permissions-security.md` | Permissions & Security |

---

## Skills & Sub-Agents

| Skill | Location | Purpose |
|---|---|---|
| `pusher-fixer` | `.agents/skills/pusher-fixer/` | Low-power agent (Gemini 3.6 Flash Low) for README docs, git commit, and GitHub push |
| `student-portal-ui` | `.agents/skills/student-portal-ui/` | Complete UI/UX design system — colors, typography, spacing, components, animations |
| `parallel-build` | `.agents/skills/parallel-build/` | Orchestration: spawn 12 sub-agents to build all features in parallel, then assemble & deploy |

---

## Activity List
- `[2026-08-03 11:34]` - Initialized project documentation and system prompt guidelines (`AGENTS.md`) (Antigravity)
- `[2026-08-03 11:40]` - Granted Codex full power to run all commands and updated agent configuration files (Antigravity)
- `[2026-08-03 11:41]` - Created 13 detailed feature specification files in `docs/features/` covering all portal pages, layout, and security (Antigravity)
- `[2026-08-03 11:50]` - Created `pusher-fixer` sub-agent skill (`Gemini 3.6 Flash Low`) for automated documentation, bug fixes, git commit, and GitHub push (pusher-fixer)
- `[2026-08-03 12:08]` - Major spec rewrite: added DocentBase ecosystem compatibility (shared DB with dashboard.docentbase.com), multi-course/batch architecture, sidebar-only navigation (no bottom nav, Facebook-style drawer on mobile), aesthetics-first design priority, Clerk vs DB data source rules, React Native + Expo mobile stack info, and Framer Motion animation guidelines (Antigravity)
- `[2026-08-03 12:17]` - Created shared DATABASE_SCHEMA.md (11 tables compatible with staff dashboard), student-portal-ui design system skill, and parallel-build orchestration skill (12 sub-agents) (Antigravity)
