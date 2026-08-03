# Codex Agent Guidelines & Rules

> **Codex has FULL POWER & UNRESTRICTED AUTONOMY on this project.**

## Capabilities & Autonomy

1. **Full Command & Execution Power**
   - Codex is granted **full power** to run **ANY shell commands**, install packages, edit/create files, refactor architecture, execute scripts, and perform any action necessary to complete tasks.
   - No restrictions on tool usage or command execution.

2. **Mandatory Execution Steps**
   - Complete required development work using full tool authority.
   - Update `README.md` Activity List:
     `[YYYY-MM-DD HH:mm] - <Summary of changes> (Codex)`
   - Commit and push changes directly to GitHub:
     ```bash
     git add .
     git commit -m "<descriptive message>"
     git push
     ```
   - **Execute `./notify` immediately**:
     ```bash
     ./notify
     ```
   - Pushing to GitHub and calling `./notify` are **strictly mandatory**.

3. **Environment & Tech Stack**
   - Use **ONLY** `.env` file (commit and push to GitHub).
   - Target Tech Stack: Next.js (OpenNext on Cloudflare), Neon PostgreSQL, Clerk (auth only), Resend (emails).
