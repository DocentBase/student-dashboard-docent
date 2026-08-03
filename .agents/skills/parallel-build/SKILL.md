---
name: parallel-build
description: Orchestrate parallel sub-agent build workflow. The main Antigravity agent spawns 12 sub-agents, each assigned one feature spec .md file from docs/features/. Each sub-agent builds its feature independently. The main agent then assembles, integrates, and deploys. Use when building the full student portal or multiple features simultaneously.
---

# Parallel Build Orchestration Skill

> **When to use**: When the user asks you to "build the full portal", "build all features", "start building", or any request that involves constructing multiple features of the student portal simultaneously.

---

## Workflow Overview

```
Main Agent (Antigravity)
    │
    ├── 1. Initialize project (Next.js + dependencies)
    ├── 2. Build shared foundation (layout, design system, DB lib)
    │
    ├── 3. Fire 12 Sub-Agents in parallel:
    │   │
    │   ├── Sub-Agent 01 → 01-dashboard.md        → builds /
    │   ├── Sub-Agent 02 → 02-attendance.md        → builds /attendance
    │   ├── Sub-Agent 03 → 03-fees-payments.md     → builds /fees
    │   ├── Sub-Agent 04 → 04-notes-resources.md   → builds /notes
    │   ├── Sub-Agent 05 → 05-exams.md             → builds /exams
    │   ├── Sub-Agent 06 → 06-results.md           → builds /results
    │   ├── Sub-Agent 07 → 07-routine.md           → builds /routine
    │   ├── Sub-Agent 08 → 08-notice-board.md      → builds /notices
    │   ├── Sub-Agent 09 → 09-profile.md           → builds /profile
    │   ├── Sub-Agent 10 → 10-settings.md          → builds /settings
    │   ├── Sub-Agent 11 → 11-layout-navigation.md → builds layout shell
    │   └── Sub-Agent 12 → 12-permissions-security.md → builds auth/middleware
    │
    ├── 4. Collect & integrate all sub-agent output
    ├── 5. Resolve conflicts, fix imports, connect routes
    ├── 6. Test build (`npm run build`)
    ├── 7. Git commit & push
    ├── 8. Deploy (`npm run deploy`)
    └── 9. Return Cloudflare URL to user
```

---

## Phase 1: Main Agent — Project Initialization

Before spawning sub-agents, the main Antigravity agent MUST:

1. **Initialize the Next.js project** (if not already done):
   ```bash
   npx -y create-next-app@latest ./ --typescript --app --src-dir --no-tailwind --no-eslint --import-alias "@/*"
   ```

2. **Install shared dependencies**:
   ```bash
   npm install @clerk/nextjs @neondatabase/serverless framer-motion lucide-react
   ```

3. **Create the shared foundation files** that ALL sub-agents will depend on:

   ```
   src/
   ├── lib/
   │   ├── db.ts                    # Neon PostgreSQL client
   │   ├── auth.ts                  # Clerk auth helpers (getCurrentStudent)
   │   └── utils.ts                 # Shared utility functions
   ├── components/
   │   └── ui/                      # Shared UI primitives
   │       ├── Card.tsx
   │       ├── StatCard.tsx
   │       ├── Badge.tsx
   │       ├── Button.tsx
   │       ├── Skeleton.tsx
   │       ├── EmptyState.tsx
   │       └── ProgressRing.tsx
   ├── styles/
   │   └── globals.css              # Design tokens + global styles
   ├── types/
   │   └── index.ts                 # Shared TypeScript interfaces
   ├── middleware.ts                # Clerk middleware
   └── app/
       └── layout.tsx              # Root layout (ClerkProvider, fonts, theme)
   ```

4. **Create the design tokens CSS** based on the `student-portal-ui` skill.

5. **Create shared TypeScript types** from `docs/DATABASE_SCHEMA.md`.

6. **Commit and push foundation** to GitHub before spawning sub-agents.

---

## Phase 2: Sub-Agent Spawning

Spawn **12 sub-agents** with the following prompt template for each. Each sub-agent operates independently and writes only to its assigned directory.

### Sub-Agent Prompt Template

For each sub-agent, use this prompt (replacing `{FEATURE_NUMBER}`, `{FEATURE_NAME}`, `{SPEC_FILE}`, and `{ROUTE_PATH}`):

```
You are building Feature {FEATURE_NUMBER} — {FEATURE_NAME} for the DocentBase Student Portal.

## Your Assignment
Read and implement EVERYTHING in the feature spec file:
  docs/features/{SPEC_FILE}

Also read these for context (DO NOT modify them):
  - docs/features/00-overview.md (project overview, design principles)
  - docs/DATABASE_SCHEMA.md (database tables and query patterns)
  - .agents/skills/student-portal-ui/SKILL.md (design system, colors, typography, animations)

## Your Output Directory
Write all your code to: src/app/(portal)/{ROUTE_PATH}/
  - page.tsx (main page, server component)
  - loading.tsx (skeleton loader)
  - _components/ (all sub-components listed in the spec)

## Rules
1. Follow the feature spec EXACTLY — every section, component, and acceptance criteria.
2. Use the shared design tokens from globals.css (DO NOT hardcode colors).
3. Use the shared components from src/components/ui/ (Card, StatCard, Badge, etc.).
4. Use the shared types from src/types/index.ts.
5. Use Framer Motion for ALL animations (import from 'framer-motion').
6. Use Lucide React for ALL icons (import from 'lucide-react').
7. Server components by default; 'use client' only when needed (interactivity, hooks).
8. Database queries go through src/lib/db.ts.
9. Auth checks go through src/lib/auth.ts.
10. DO NOT modify any files outside your assigned directory.
11. DO NOT create duplicate shared components — use existing ones.
12. Include the loading.tsx skeleton that matches the page layout.
13. Handle empty states with friendly messages.
14. Support dark mode via CSS variables.
15. Ensure responsive design (320px — 1920px).

## When Done
Report back with:
- List of files created
- Any shared components or types you needed but were missing
- Any issues or questions
```

### Sub-Agent Assignment Table

| Sub-Agent | Spec File | Output Directory | Notes |
|---|---|---|---|
| 01 | `01-dashboard.md` | `src/app/(portal)/page.tsx` + `_components/` | Dashboard is at the portal root |
| 02 | `02-attendance.md` | `src/app/(portal)/attendance/` | |
| 03 | `03-fees-payments.md` | `src/app/(portal)/fees/` | |
| 04 | `04-notes-resources.md` | `src/app/(portal)/notes/` | |
| 05 | `05-exams.md` | `src/app/(portal)/exams/` | |
| 06 | `06-results.md` | `src/app/(portal)/results/` | |
| 07 | `07-routine.md` | `src/app/(portal)/routine/` | |
| 08 | `08-notice-board.md` | `src/app/(portal)/notices/` | |
| 09 | `09-profile.md` | `src/app/(portal)/profile/` | |
| 10 | `10-settings.md` | `src/app/(portal)/settings/` | |
| 11 | `11-layout-navigation.md` | `src/components/layout/` + `src/app/(portal)/layout.tsx` | Builds AppShell, Sidebar, Drawer, Header |
| 12 | `12-permissions-security.md` | `src/middleware.ts` + `src/lib/auth.ts` + `src/lib/permissions.ts` | Builds auth layer |

---

## Phase 3: Main Agent — Assembly & Integration

After all 12 sub-agents finish, the main agent MUST:

### Step 1: Collect Results
- Review each sub-agent's output files
- Note any missing shared components or types they reported

### Step 2: Resolve Conflicts
- Fix any duplicate imports or conflicting file names
- Ensure all `import` paths are correct
- Ensure the portal `layout.tsx` (from sub-agent 11) wraps all pages correctly

### Step 3: Fill Gaps
- Create any shared components that sub-agents reported as missing
- Add any missing TypeScript types to `src/types/index.ts`
- Ensure `src/lib/db.ts` has all necessary query functions

### Step 4: Connect Navigation
- Verify all sidebar links point to correct routes
- Verify all "View All" links on dashboard navigate correctly
- Ensure the Course Switcher context flows to all pages

### Step 5: Build Test
```bash
npm run build
```
- Fix any TypeScript errors
- Fix any missing imports
- Fix any build failures

### Step 6: Commit, Push & Deploy
```bash
git add .
git commit -m "Build complete student portal — all 12 features assembled"
git push
npm run deploy
```

### Step 7: Report
- Update `README.md` Activity List
- Provide the Cloudflare deployment URL to the user
- List what was built and any known TODOs

---

## Dependency Order (If Sequential Build Needed)

If parallel spawning is not possible, build in this order:

```
Priority 1 (Foundation — must build first):
  12 → Permissions & Auth (middleware, auth helpers)
  11 → Layout & Navigation (AppShell, Sidebar, Header)

Priority 2 (Core pages — can be parallel):
  01 → Dashboard
  07 → Routine
  02 → Attendance

Priority 3 (Content pages — can be parallel):
  08 → Notice Board
  04 → Notes & Resources
  05 → Exams
  06 → Results

Priority 4 (Utility pages — can be parallel):
  03 → Fees & Payments
  09 → Profile
  10 → Settings
```

---

## Error Recovery

If a sub-agent fails or produces broken output:
1. Read the sub-agent's error report
2. Fix the issue in the main agent context
3. Re-run only the failed sub-agent's spec (do not rebuild everything)
4. Re-assemble and re-test

If `npm run build` fails after assembly:
1. Read the build error output carefully
2. Fix each error (usually missing imports, type mismatches, or path issues)
3. Re-run `npm run build` until clean
4. Then deploy
