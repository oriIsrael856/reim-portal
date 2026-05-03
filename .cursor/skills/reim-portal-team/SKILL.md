---
name: reim-portal-team
description: Team rules and skills for the Reim portal — React, Tailwind v4, Hebrew RTL, Firestore CMS, manual routing, Figma alignment, and agent handoff. Use when working in this repo, onboarding, or splitting tasks across people/agents.
---

# Reim portal — team rules & skills

## Authority in this repo

- **Single source of truth:** root `CLAUDE.md` — covers routing, Firestore, admin, mobile shell, RTL rules, Figma workflow, tokens, sizing, guardrails, and definition of done.
- Read `CLAUDE.md` in full before implementation work. It is the mandatory reference for all agents and team members.

## What every team member should know

### Product & stack

- **Hebrew RTL** is the default reading context; **`dir="rtl"`** on the app shell. Some subtrees are **`dir="ltr"`** on purpose (scroll strips, coordinate-based collages, icon rows) — **do not remove** without re-testing scroll, arrows, and layout math.
- **Routing:** `currentPage` + `navigateTo(page)` in `App.jsx` — **no React Router** unless explicitly requested.
- **Content:** Firestore `site_content/<DATA_VERSION>`; defaults and shape in `src/data.js`. **Schema-safe** changes only (no silent key renames in production paths).
- **Pages:** `React.lazy` + `Suspense` for page components.

### Layout & tokens

- **Desktop gutter:** `var(--reim-desktop-gutter-x)` in `src/index.css` — **do not** duplicate with ad-hoc `px-[200px]` / `11%` for the same role.
- **Reuse** `--reim-home-*`, `--reim-desktop-section-gap-*`, `--home-desktop-hero-*`, chapter tokens before inventing new CSS variables; new tokens need a **one-line Figma reference**.
- **`min-w-0`** (and `min-h-0` when needed) on flex/grid children that should shrink or live inside scrollers.
- **Single horizontal row on desktop (Figma):** `flex-nowrap` — **no** `flex-wrap` / **no** `flex-col` for that row at the desktop tier. Overflow → **localized** `overflow-x-auto` + `snap-x`, not page-wide clipping hacks.
- **Chapter desktop:** no **`zoom`** scaling of whole pages — proportional CSS only.
- **Chapter 4 desktop viewport scaling:** documented in **`CLAUDE.md` §2c** — registry (`src/config/chapter4ViewportRegistry.js`), `useChapter4DesktopStyles`, and `viewportClamp.js`. Use that section when changing responsive math for Chapter 4 `md+` UI.

### CSS discipline (RTL)

- **Structural layout:** logical utilities only — `ps`/`pe`, `ms`/`me`, `border-s`/`border-e`, `text-start`/`text-end`, `inset-inline-*`, `start`/`end`.
- **Avoid** `flex-row-reverse` / `order-*` to fake direction; **reorder JSX** when visual order must change.
- **`flex-col` in RTL:** `items-start` = physical right, `items-end` = physical left (opposite to LTR).

### Layout-measurement effects (do not "fix" loops by stripping deps)

- A small number of layout effects (e.g. the menu-row offset math in `src/components/layout/SiteMobileStickyChrome.jsx`) intentionally list their own state in the deps array AND call `setState` inside. The math closes over the current value to subtract a previously-applied transform, then converges in 1–2 iterations thanks to a `prev === needed` short-circuit.
- If such an effect loops forever in one surface (e.g. React #185 on desktop), the root cause is the **measurement context being invalid** — not the deps. Most common: the host element is `display:none` (e.g. `lg:hidden`) so its rects are 0 while a sibling is still visible, making the formula diverge.
- **Correct fix:** add an early bail inside the effect for the invalid context (canonical: `if (header.offsetParent === null) return;`). **Do NOT** remove the state from the dep array — that silently breaks convergence on the working surface (mobile).
- Always test both the broken surface and the working surface after changing deps of layout-measurement effects.

### Figma handoff

- **DOM order** should match Auto Layout child order unless an exception is documented.
- Bug reports: **frame name + node id** or screenshot with clear "expected / actual".
- Prefer **tokens** and `min()`/`clamp()` over raw structural `w-[412px]`-style widths.

### Definition of done (implementation)

- `npm run build` must pass for changes you merge.
- Run `npm run lint` for substantive UI work; fix **your** new issues.
- Manually check **RTL**, **no unintended horizontal page scroll**, **keyboard** on controls you touched, **CMS strings** still render.

## Skills checklist (by role)

| Skill | Dev | Design QA | PM |
|------|:---:|:---------:|:--:|
| Understand mobile vs desktop split for the screen you touch | ✓ | ✓ | ○ |
| Verify RTL / logical alignment vs "mirrored LTR" | ✓ | ✓ | ○ |
| Use shared gutter token; no duplicate gutter math | ✓ | ✓ | ○ |
| Single-row desktop = nowrap + `min-w-0`; local scroll if needed | ✓ | ✓ | ○ |
| Do not break `navigateTo` or Firestore/CMS keys | ✓ | — | ○ |
| File bugs with Figma node id + frame | ○ | ✓ | ✓ |

## Key file map (quick)

| Area | Files |
|------|--------|
| Routing / shell | `src/App.jsx`, `src/components/layout/Sidebar.jsx`, mobile chrome in `App.jsx` |
| Tokens | `src/index.css` (`:root`, `@theme`), optional `src/theme.js` |
| Home | `src/pages/HomePage.jsx`, `src/components/home/*` |
| Chapters | `src/pages/Chapter1.jsx` … `Chapter5.jsx`, `src/components/chapter*/` |
| CMS | `src/pages/AdminPanel*.jsx`, `src/data.js` |

## When training an AI sub-agent

Load root **`CLAUDE.md`** (full file) and add a **page-specific** task list (files + acceptance criteria). The sub-agent must **preserve existing `dir` islands** and **all interactive behavior** unless the task explicitly changes behavior.

### Team agent IDs (optional shorthand)

When splitting work, **Agent 2** in this repo commonly maps to **Chapter 2** (`src/pages/Chapter2.jsx`, `src/components/chapter2/*`, Figma frame **106:3189**). **Agent 3** → Chapter 3 (**120:3198**). Use the same global rules + gutters + RTL conventions for every chapter agent.
