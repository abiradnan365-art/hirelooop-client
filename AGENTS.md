# Commands

- `npm run dev` / `build` / `start` — Next.js (App Router).
- Verification (no test suite exists — don't invent one): `npm run lint` + `npm run typecheck`, then `npm run build` for full validation.
- `npm run format` — Prettier (`**/*.{ts,tsx}`). Config: **no semicolons**, double quotes, LF line endings, 2-space tabs.

# Stack & conventions

- Path alias `@/*` → repo root (not `src/`); e.g. `@/components/ui/button`.
- Tailwind v4 with **CSS-first config**: all theme tokens live in `app/globals.css`; there is no `tailwind.config` file.
- shadcn/ui uses the **"base-nova" style**, which is built on `@base-ui/react`, **not Radix** — don't copy Radix-based component code from older examples. Add components with `npx shadcn@latest add <name>` (aliases configured in `components.json`).
- Auth is [better-auth](https://better-auth.com) wired as: server config `lib/auth.ts` (MongoDB adapter — requires a local MongoDB on `localhost:27017`), client `lib/auth-client.ts`, catch-all route handler `app/api/auth/[...all]/route.ts`.
- Required env vars (`.env`): `BETTER_AUTH_SECRET`, `BETTER_AUTH_URL`; Google OAuth needs `GOOGLE_CLIENT_ID` / `GOOGLE_CLIENT_SECRET` in `lib/auth.ts`.

<!-- BEGIN:nextjs-agent-rules -->

# This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` (resolved from this file's directory; in monorepos the `next` package may not be visible from the repo root) before writing any code. Heed deprecation notices.

This block is written and re-added by `next dev` — verify at `node_modules/next/dist/server/lib/generate-agent-files.js`. Removing it from a diff only re-creates the uncommitted change; committing it with your work keeps the tree clean.

<!-- END:nextjs-agent-rules -->
