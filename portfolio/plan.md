# Portfolio visual polish — home / projects / resume

## Context

Portfolio is functionally solid but visually flat outside home's `MeshCanvas`
hex-glow background: no card hover feedback, hard-cut page nav, no scroll
motion. Goal: "professional touch" across home/projects/resume, inspired in
tone (not copied) by adhamdannaway.com. Constraints: no new deps
(GSAP/Framer/Three.js), keep README's SSR-first/minimal-stack vision,
respect `prefers-reduced-motion`.

`@manoj-malviya-96/atom` (installed `0.2.9`) ships primitives unused here:
`useScrollEffect`, `ScrollContainer`, `transition`/`morph`, `springEasing`/
`project`/`rubberband`, and — as of atom #109/#114 — an `enter` prop on
every `Atom`-based component (`"fade" | "rise" | "scale-up" | "scale-down" |
"slide-left" | "slide-right"`). It's pure CSS `@starting-style`, fires on
mount, rides `--duration-slow`, and auto-collapses to instant under
reduced-motion — no extra CSS needed. All cards in scope (`LoopCard`,
`ProductCard`, `ProjectCard`, `TrackRow`, education cards) are already
`Flex`/`Atom`-based, so they get `enter` for free.

Scope: `app/page.tsx`, `app/projects/page.tsx`, `app/resume/page.tsx`. Not
truss-opt demo, not a full redesign.

## Steps

1. ~~**Reuse `MeshCanvas` everywhere**~~ — skipped. PR #52 closed unmerged;
   `MeshCanvas` stays bound to the landing page only.

2. [x] **`Reveal` = IntersectionObserver + Atom's `enter`, not custom CSS.**
       (PR #53)
       New `lib/reveal.tsx`: wraps children, observes visibility once via
       `IntersectionObserver` (not `useScrollEffect` — that's a continuous
       window-scroll subscription, wrong tool for one-shot-per-card). Until
       intersecting, render children unwrapped (plain, visible — no FOUC,
       no-JS-safe). On first intersect, swap to `<Atom enter="rise">` with a
       bumped `key` to force a real remount (same technique as atom's own
       "Enters" story Replay button — `@starting-style` only fires on mount).
       No new CSS in `globals.css` — reduced-motion and duration already
       handled by atom. Apply to: `LoopCard`, `ProductCard`, each `ProjectCard`
       (staggered via mount delay), `TrackRow`, education cards.

3. **Card hover-lift + pointer spotlight** — new `.hover-card` utility in
   `app/globals.css`: `translateY` + shadow on `:hover`, gated
   `@media (hover: hover)`. Optional spotlight: small hook (`lib/spotlight.tsx`)
   writing `--x`/`--y` on `pointermove` for a `radial-gradient` sheen — direct
   style write, no RAF, gated `@media (hover: hover) and (pointer: fine)`.
   Same card set as #2.

4. **Magnetic CTA** — new `lib/magnetic.tsx` wrapping the two Hero CTAs on
   home only: `rubberband()`-clamped offset on `pointermove`, `translate3d()`
   via ref (no re-renders), `springEasing()` snap-back on pointer leave.
   Gated `@media (hover: hover) and (pointer: fine)` + reduced-motion
   (renders children unwrapped otherwise).
   **Risk:** these three helpers ship with bare `.d.ts` only, no docs/source
   in this repo — tune empirically in `pnpm dev`.

5. **Typographic accent** — new `Accent` in `lib/shared.tsx` (alongside
   `Eyebrow`/`Prose`): restrained bracket/glyph wrap, existing `ColorToken`,
   no new brand color. 1-2 words in Hero headline, maybe a `SectionHeader`.

6. **(Stretch)** Scroll-spy TOC highlight on Projects — the one legitimate
   `useScrollEffect` use case, in `lib/header_bar.tsx`'s `HeaderToc`
   "projects" branch. Touches shared header — lower priority.

## Verification

- `pnpm lint` + `pnpm typecheck` after each step (no test suite exists).
- Manual in `pnpm dev`: OS reduced-motion toggle, touch/coarse-pointer
  fallback (magnetic + spotlight no-op), `<ViewTransition>` smoke test (#6).

## Critical files

- `portfolio/lib/reveal.tsx` (new)
- `portfolio/lib/shared.tsx` (new `Accent` export)
- `portfolio/app/globals.css` (`.hover-card`, view-transition reduced-motion
  override — no reveal CSS needed, atom covers it)
- `portfolio/app/page.tsx`, `portfolio/app/projects/page.tsx`,
  `portfolio/app/resume/page.tsx`
- `portfolio/lib/header_bar.tsx` (stretch item only)
