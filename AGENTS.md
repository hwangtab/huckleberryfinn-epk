# Repository Guidelines

## Project Structure & Module Organization
- `app/` hosts the Next.js App Router; `app/page.tsx` composes section components in `app/_components/`, and shared state lives in `app/contexts/`.
- Shared UI primitives sit in `components/`, long-form copy in `docs/`, and data helpers in `scripts/`.
- Assets belong in `public/` (`images/`, `audio/`, `presskit/`); avoid hand-editing `.next/` or `out/` since they are build outputs.

## Build, Test, and Development Commands
- `npm install` installs dependencies; rerun after `package-lock.json` changes.
- `npm run dev` starts the dev server with fast refresh on `http://localhost:3000`; tailwind styles hot-reload automatically.
- `npm run build` generates the production bundle, and `npm run start` serves that bundle locally to mirror Vercel.
- `npm run lint` runs Next.js ESLint defaults; fix issues plus any TypeScript errors before committing.

## Coding Style & Naming Conventions
- TypeScript strict mode is enabled; annotate component props and exported helpers explicitly.
- Maintain two-space indentation, group imports (framework, third-party, local), and favor root alias `@/` instead of deep relatives.
- Name components in `PascalCase`, hooks/utilities in `camelCase`, and build Tailwind class clusters that align with the tokens in `app/globals.css`.

## Testing Guidelines
- Automated tests are not yet configured; propose coverage when you touch critical flows (audio playback, animated sections).
- Place new specs in `__tests__/` or alongside the source as `.test.tsx`; document any harness configuration in the PR.
- Prefer React Testing Library with Vitest or Jest, and record manual QA such as `npm run build && npm run start` in the review checklist.

## Commit & Pull Request Guidelines
- Follow the existing commit prefixes (`fix:`, `refactor:`, `trigger:`) with an imperative summary, keeping each commit focused.
- Summarize PRs succinctly, add UI screenshots or clips when visuals change, link issues, and list verification commands run.
- Confirm the Vercel preview build succeeds before requesting review and call out configuration or environment needs in the description.

## Assets & Content Updates
- Keep UI copy in sync with the markdown sources in `docs/`; update both when narratives shift.
- Drop optimized replacements into `public/` and update references in `app/data/` or section components during media swaps.
- Audit the diffs from `scripts/addLyrics.js` and `scripts/parseLyrics.js` before committing, because they regenerate runtime data.
