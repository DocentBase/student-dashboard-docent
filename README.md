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
- **2026-08-17**: Added official DocentBase brand favicon pack (`favicon.ico`, `16x16`, `32x32`, `apple-touch-icon`, `site.webmanifest`) from `/Users/solaman/Downloads/docent_logo/favicon-1`. (Antigravity)
- **2026-08-17**: Implemented the complete Conversora / Calm Operator UI/UX Design System (`docs/UI_UX_DESIGN_SYSTEM_PROMPT.md`) across the entire student portal: configured Instrument Sans & Geist Mono typography, motion tokens, refined cobalt/slate/zinc color tokens, upgraded StatCards with sparklines & KPI pills, StatusBadges, ProductFrame showcase, and redesigned all 10+ student cockpit pages (Dashboard, Attendance, Exams, Fees, Notes, Notices, Results, Routine, Profile, Settings). Verified with clean `npm run build`. (Antigravity)
- **2026-08-04**: Added `context/UI-HARMONY-BLUEPRINT.md` — the ecosystem-wide UI design contract (design tokens, components, motion, responsive rules) so every DocentBase subdomain ships an identical, harmonious UI. (OpenCode)
- **2026-08-04**: Rebuilt the student portal UI foundation from scratch: refreshed global design tokens, responsive layout utilities, premium app shell, redesigned sidebar/header navigation, and a new dashboard experience. No npm build or npm scripts were run. (Codex)
- **2026-08-03**: Built "My Enrolled Coaching & Batches" feature (`/coaching`). Created UI components (`CoachingHeader`, `BatchCard`, `CoachingCenterCard`, `BatchDetailModal`, `BatchTransferModal`), added navigation link in Sidebar, and extended TypeScript schemas. Verified cleanly with `npm run build`.
