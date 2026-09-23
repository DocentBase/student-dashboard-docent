This is a [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://nextjs.org/docs/app/api-reference/cli/create-next-app).

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/app/building-your-application/optimizing/fonts) to automatically optimize and load [Geist](https://vercel.com/font), a new font family for Vercel.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.

## Activity Log
- **2026-08-30**: Completed full 1:1 mobile feature replication for DocentBase Student Portal in `/mobile` with interactive Join Batch 4-step wizard, withdrawal requests, batch transfer modals, subject-wise attendance breakdown, exam blueprints, live tuition checkout simulation, resource keyword search, and routine schedule slots. Verified against the Master Replication Checklist. (Antigravity)
- **2026-08-30**: Initialized and built the complete React Native Expo mobile application in `/mobile` with Expo Router SDK 52, Clerk Expo authentication (`@clerk/clerk-expo` + `expo-secure-store`), Calm Operator / Conversora design tokens, and 1:1 screen replicas for Dashboard, Attendance, Routine, Coaching Batches, Profile, Exams, Results, Fees, Notes, Notices, and Settings. (Antigravity)
- **2026-08-17**: Generated dynamic and static `robots.txt` and `sitemap.xml` with permissive crawling rules allowing and guiding all web indexers, search crawlers (Googlebot, Bingbot, etc.), and AI bots (GPTBot, ClaudeBot, PerplexityBot) across all portal pages for optimal SEO. (Antigravity)
- **2026-08-17**: Added official DocentBase brand logo (`/Users/solaman/Downloads/docent_logo/final_logo.jpg`) into the application header, sidebar cockpit navigation, and landing gateway. (Antigravity)
- **2026-08-17**: Updated Cloudflare deployment worker name from `next-tmp` to `docent-base-students` and created dedicated R2 cache bucket `docent-base-students-opennext-cache` in `wrangler.jsonc`. (Antigravity)
- **2026-08-17**: Added official DocentBase brand favicon pack (`favicon.ico`, `16x16`, `32x32`, `apple-touch-icon`, `site.webmanifest`) from `/Users/solaman/Downloads/docent_logo/favicon-1`. (Antigravity)
- **2026-08-17**: Implemented the complete Conversora / Calm Operator UI/UX Design System (`docs/UI_UX_DESIGN_SYSTEM_PROMPT.md`) across the entire student portal: configured Instrument Sans & Geist Mono typography, motion tokens, refined cobalt/slate/zinc color tokens, upgraded StatCards with sparklines & KPI pills, StatusBadges, ProductFrame showcase, and redesigned all 10+ student cockpit pages (Dashboard, Attendance, Exams, Fees, Notes, Notices, Results, Routine, Profile, Settings). Verified with clean `npm run build`. (Antigravity)
- **2026-08-04**: Added `context/UI-HARMONY-BLUEPRINT.md` — the ecosystem-wide UI design contract (design tokens, components, motion, responsive rules) so every DocentBase subdomain ships an identical, harmonious UI. (OpenCode)
- **2026-08-04**: Rebuilt the student portal UI foundation from scratch: refreshed global design tokens, responsive layout utilities, premium app shell, redesigned sidebar/header navigation, and a new dashboard experience. No npm build or npm scripts were run. (Codex)
- **2026-09-23**: Redesigned Clerk sign-in and sign-up authentication pages with custom responsive layout, full-width block social login buttons (Google, Facebook, Apple), and mobile-first container styling. Added explicit Sign Up buttons across the landing page (topbar, hero, and bottom registration CTA section) pointing to the `/sign-up` endpoint. Verified build cleanly and deployed to Cloudflare. (Antigravity)

