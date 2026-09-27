# Portfolio

## Why

Personal site for Manoj Malviya: resume, work history, and interactive project demos
in one place, instead of scattered across a PDF and GitHub links.

## Vision

- SSR to reduce rendering time since its predefined texts and less dynamicity.
- Visually appealing and focus on more important contributions.
- Few UI based project gets a live, interactive demo, not just a screenshot.
- Content (resume, work history, projects) stays data-driven so pages update without rewrites.
- Keep the stack minimal: Next.js, no extra state/UI frameworks.

## Architecture

- `app/` — Next.js App Router pages (`page.tsx` home, `projects/`, `resume/`, `api/`).
- `lib/data/` — static content: profile, work experience, projects, organizations, images.
- `lib/projects/` — project listing and detail views (`project_card.tsx`, `project_content.tsx`).
- `lib/resume/` — resume/work history rendering.
- `lib/shared.tsx`, `lib/helper.tsx` — shared UI primitives and utilities.
- Uses `@manoj-malviya-96/atom` as the component library, `@tanstack/react-query` for data fetching.

## Plan

- [ ] Add more interactive project demos.
- [ ] Expand test coverage.

## Setup

Prerequisites: Node >=22, pnpm.

```bash
pnpm install
pnpm dev
```

Other scripts:

```bash
pnpm build        # production build
pnpm lint         # biome check --write
pnpm typecheck    # tsc --noEmit
```
