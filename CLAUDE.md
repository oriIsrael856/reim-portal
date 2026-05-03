# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

---
## Figma-to-Code Workflow

- When given a Figma spec (YAML from Specs plugin), follow the implementation instructions in the spec header exactly.
- Use `get_screenshot` from the Figma MCP server to capture the design. Save to `.figma/` and reference it — don't re-fetch.
- Read the YAML `chunks` for anatomy (structure), layout (flex/grid), and repeats (deduplicated instances).
- Use `resolved_tokens` to map design token names to actual values (hex, font names).
- Match `instance_of` names to your icon library (Phosphor, Lucide, etc.) — check `package.json`.
- **Placeholders**: If you cannot find a matching icon, SVG, image, or vector asset, use a placeholder (`https://placehold.co/{width}x{height}`) sized to the element's `w` and `h` from specs. Do NOT stop or ask — keep building.
- Detect the framework from `package.json` and build accordingly.
- After building, screenshot your output and compare with the `.figma/*.png` reference. Fix differences.
- Keep implementations minimal — only build what the spec describes.
- **Summary**: After completing the build, list: what was built and file location, any placeholder images/icons used (with the original `instance_of` or element name so the user can replace them), and any assumptions or deviations.

## PRIORITY OVERRIDE: Coding Standard (Based on Chapter 2 Pattern)

The approved reference for how desktop UI should be built is **Chapter 2** (`src/pages/Chapter2.jsx`, `src/components/chapter2/Chapter2DesktopHeroSection.jsx`, `src/components/chapter2/Chapter2DesktopAudienceSection.jsx`). Study it before building any new chapter section. Rules below are derived directly from that code.

### 1. Component Structure
- Break each visual section into its own named component or file (`GoalCard`, `GroupsIntroSection`, `Chapter2DesktopHeroSection`, etc.).
- Repeating elements (cards, rows, items) → small reusable component with props, not copy-paste.
- Comment every significant block with the Figma node ID it implements: `{/* Figma 120:2491 */}`.

### 2. Sizing — Stepped Fluidity

Use **standard Tailwind rem-based utilities** for padding, gaps, and spacing. Scale them up across breakpoints (`md:`, `lg:`, `xl:`). Reserve `clamp()` strictly for hero/decorative typography that must scale pixel-perfectly between two frames.

**Standard layout pattern:**
```jsx
// ✅ Stepped: readable, breakpoint-driven, no math
<div className="flex flex-col gap-4 px-6 py-5 md:gap-6 md:px-10 md:py-8 lg:gap-8 lg:px-16 lg:py-10">

// ✅ clamp() allowed ONLY for large decorative headings
<h1 style={{ fontSize: 'clamp(32px, 4vw, 64px)' }}>
```

**Breakpoint reference** (Tailwind defaults):
- `md` = 768px — mobile→desktop transition
- `lg` = 1024px — standard desktop
- `xl` = 1280px — wide desktop
- `2xl` = 1536px — large/high-res monitors

**Column widths:** Use `w-full max-w-[Npx]` or `max-w-screen-xl` rather than bare `vw` values. Never `w-[367px]` alone without a max constraint.

**Exception (stay as fixed `px`):** Borders (`1.5px`, `2px`), shadow offsets, `border-radius`, small decorative icon sizes.

**Absolute-position `%` (decorative overlays):**
Use the Figma frame's own dimensions as denominator:
`x% = figma_x_px / frame_width × 100`, `y% = figma_y_px / frame_height × 100`

### 2b. Height Responsiveness (Y-Axis)

**Never solve vertical space constraints by shrinking horizontal (`vw`) values.** The two axes are independent.

**Trust the Scroll:** For standard content pages, allow desktop-sized elements to keep their proportional sizing and let the user scroll. Do not aggressively shrink UI to fit above the fold on short viewports.

**When a component must fit within a short viewport without scrolling** (e.g., a dashboard card, a modal, a fixed-height panel), use explicit height-based media queries via Tailwind arbitrary variants:
```jsx
// ✅ Height-aware padding reduction
<div className="py-8 [@media(max-height:800px)]:py-4 [@media(max-height:600px)]:py-2">

// ✅ Height-aware gap reduction
<div className="gap-6 [@media(max-height:800px)]:gap-3">
```
Do **not** use `vw`-based `clamp()` to solve a `vh` problem.

### 2c. Chapter 4 desktop — Figma-ratio viewport registry (intentional exception)

**Scope:** Desktop Chapter 4 only (`md+`, `src/pages/Chapter4.jsx` and related desktop components). This pattern **does not** replace Chapter 2’s stepped Tailwind approach for other chapters unless explicitly extended.

**Goal:** Keep the **same proportional relationship** between UI and the browser window as between the same UI and the **Figma reference frame (1920×1080)**, on any viewport size, with **floors/ceilings** so nothing collapses or explodes.

#### Reference frame (“ruler”)

- **`FIGMA_VIEWPORT`** in [`src/utils/viewportClamp.js`](src/utils/viewportClamp.js) — width **1920**, height **1080**.
- Horizontal measures (widths, horizontal padding, row gaps, many font sizes) scale against **1920**.
- Vertical measures (heights, vertical padding, column gaps when using height axis) scale against **1080**.

#### Core math (conceptual)

1. **Figma value → “how big relative to the frame”**  
   e.g. padding 200px on a 1920-wide frame → same *idea* as \(200/1920\) of the frame width.

2. **Read live viewport** — `window.innerWidth` / `window.innerHeight` (CSS px).

3. **Preserve ratio on the live viewport**  
   - Width-scaled px ≈ `figmaPx × (currentWidth / 1920)`  
   - Height-scaled px ≈ `figmaPx × (currentHeight / 1080)`  

4. **Emit CSS** — usually `clamp(min, Xvw, max)` via `computeSingleClamp` / `computeStyleFromFigma`, with **mins/maxes** from the registry so small/large windows stay usable.

Helper: **`scaleFigmaPxToViewport({ figmaPx, axis, viewport })`** returns the scaled pixel target; clamps add the `vw` middle term and bounds.

#### Where numbers live (registry)

- **[`src/config/chapter4ViewportRegistry.js`](src/config/chapter4ViewportRegistry.js)** — `CH4_COMPONENT_STYLE`, `CH4_DESKTOP_STYLE_EXTRA`, merged into **`CH4_DESKTOP_STYLE_REGISTRY`**. Each entry: `{ values: { cssProp: { px, axis: 'width'|'height' } }, mins?, maxes? }`.
- **Slot-based purple card** — `CH4_VIEWPORT_FIT_BOXES` + `CH4_VIEWPORT_FIT_PRESETS` + **`getCh4ViewportFitArgs('committeesPurpleCard')`** for **`useViewportFit`** (distributes vertical “slack” between padding/gap by **weights**, not per-row FAQ logic).

#### Max widths that must not grow past Figma artboard

- **`getCh4BoxMaxWidthCss('committeesPurpleCard' | 'committeesFaq')`** — `min(figmaWidthPx, widthPercent vw)`.
- **`getCh4MinMaxWidthCss(figmaWidthPx)`** — same idea for arbitrary caps (hero, strip, footer, etc.).

#### Single resize listener (performance)

- **`useChapter4DesktopStyles`** in [`src/hooks/useChapter4DesktopStyles.js`](src/hooks/useChapter4DesktopStyles.js) — one `resize` handler recomputes **all** registry-driven styles into a flat object `d` (plus `filesScrollStep`, `filesGlowStyle`). **`Chapter4.jsx`** consumes `d.*` and passes slices to children (`AdminFeatureCard` `ch4DesktopStyles`, file cards `ch4`, etc.).

#### Two application modes

| Mode | API | Use when |
|------|-----|----------|
| Per-property | `computeStyleFromFigma` / bundle via `useChapter4DesktopStyles` | Most typography, padding, gap, card dimensions |
| Slot fit | `useViewportFit` + `computeClamps` | Purple committees card vertical budget split across padding + gap |

#### Agent checklist when touching this system

- Add or edit **Figma px + axis** in the registry; avoid new magic numbers in JSX.
- Keep **mobile** Chapter 4 (`Chapter4MobileView`) unchanged unless the task says otherwise.
- After changes: `npm run build` and `npm run lint` (scoped eslint on touched files if full lint has unrelated failures).
- Do **not** reintroduce **`zoom`** scaling for chapter layouts.

#### Related files (quick map)

| File | Role |
|------|------|
| [`src/utils/viewportClamp.js`](src/utils/viewportClamp.js) | `FIGMA_VIEWPORT`, `getCurrentViewport`, `scaleFigmaPxToViewport`, `computeSingleClamp`, `computeStyleFromFigma`, `computeClamps`, `fitToViewport` |
| [`src/hooks/useViewportFit.js`](src/hooks/useViewportFit.js) | `useViewportFit`, `useComponentStyle` (still valid for pages that don’t use the bundle) |
| [`src/hooks/useChapter4DesktopStyles.js`](src/hooks/useChapter4DesktopStyles.js) | One listener → full Chapter 4 desktop style map |
| [`src/config/chapter4ViewportRegistry.js`](src/config/chapter4ViewportRegistry.js) | All Chapter 4 desktop tokens + box widths + fit presets |

### 3. RTL — Logical Properties with Context Awareness

- Use `dir="rtl"` on section/container elements. Comments must explain DOM order: `{/* DOM-first = physical right in RTL */}`.
- For structural padding and flex alignment: use logical — `ps-`, `pe-`, `items-start`, `text-start`.
- For absolute-positioned decorative elements inside a **`dir="ltr"` island**:
  - `start-` = physical LEFT, `end-` = physical RIGHT
  - Use percentage values: `start-[17.77%]` not `start-[253px]`
- For absolute-positioned elements inside an **RTL container**:
  - `start-` = physical RIGHT, `end-` = physical LEFT
  - Figma `right: Xpx` → `start-[X/frameW × 100 %]`
  - Figma `left: Xpx` → `end-[X/frameW × 100 %]`
- `<br aria-hidden="true" />` is acceptable for explicit visual title line-breaks.
- `py-`, `px-` (symmetric) are acceptable — only `pl-`/`pr-` on asymmetric structural layout is wrong.

### 4. Colors — Hex vs Tokens
- Raw hex is fine and preferred when it keeps the code readable: `text-[#001d26]`, `border-[#6546de]`, `bg-[#bce079]`.
- Use CSS variables for values shared across many nodes: `var(--ch2-lime)`, `var(--ch2-orange)`.
- Avoid mapping every color through `@theme` tokens if it adds no reuse benefit.
- Gradients and rgba overlays: inline `style` is fine — `backgroundImage: 'linear-gradient(...)'`.

### 5. Positioning Decorative Elements
- Always convert Figma absolute `px` → `%` relative to the known parent frame.
- Preserve exact Figma rotations: `-rotate-[4deg]`, `-scale-y-100`, `rotate-[-166deg]`.
- Z-index: small progressive values only (`z-[1]`, `z-20`). Never arbitrary large numbers.
- Images with rounded corners + border: wrap in `overflow-hidden` container.

### 6. Cleanliness
- No unnecessary wrappers, no commented-out code, no "just in case" classes.
- Don't add code that isn't visible in the Figma design.
- `min-w-0` on flex children only when there's actual overflow risk.

---

## Project Overview

Reim Portal is a Hebrew RTL content portal for coordinators of the "Reim" social program (belonging groups for participants from the autistic spectrum). It's a CMS-driven React SPA deployed on Firebase Hosting with Firestore as the content backend.

## Commands

```bash
npm run dev          # Start Vite dev server with HMR
npm run build        # Production build (must pass before submitting work)
npm run lint         # ESLint check (run after substantive UI changes)
npm run preview      # Preview production build locally
```

No test framework is configured. Validation is: `npm run build` passes + `npm run lint` is clean.

## Communication Language

- Respond in clear, technical English by default — even when the user writes in Hebrew.
- Keep code terms, commands, file paths, and identifiers in English at all times.
- If the user explicitly requests another language, switch for that reply only, then return to English.

## Handling Vague Requests

When a UI or product request is imprecise, ask 2–5 targeted questions before implementing:
1. Which surface? (desktop, mobile, which chapter/page)
2. Which direction or visual relationship is expected?
3. Is there a Figma reference? (node ID, frame name, or screenshot)
4. Is there a specific constraint? (breakpoint, content length, accessibility)

Confirm the answers in one line before writing code. If a value has already been tuned in the codebase, treat it as ground truth — document it and move on.

## Architecture

### Routing (manual — no React Router)

Routing is state-driven via `currentPage` in `App.jsx`. **Do not introduce React Router** unless explicitly asked. Navigation uses `navigateTo(page)` which sets state and scrolls to top. Pages are lazy-loaded with `React.lazy()` and `Suspense`.

Valid page values: `'home'`, `'chapter1'` through `'chapter5'`, `'admin'`.

Route config is defined in the `ROUTES` object in `App.jsx`, mapping page keys to components, content keys, and prev/next chapter links.

### Data Flow

- **Firestore** stores all site content at `site_content/v11` (version controlled via `DATA_VERSION` in `App.jsx`).
- `App.jsx` sets up a real-time listener (`onSnapshot` via `useFirebaseContent` hook) that syncs to `content` state, with 8-second timeout fallback to offline cache.
- Content is passed down via **props only** — no Context API or state management library.
- `src/data.js` contains `INITIAL_DATA`, the full default content structure used to seed Firestore. When extending content, add backward-compatible defaults here. Never remove or rename existing keys without a migration strategy.
- Content services live in `src/services/` — `subscribeToContent`, `saveContent`, `getContent`, `resetContent`.

### CMS / Admin

- `src/pages/AdminPanel.jsx` provides a visual CMS for editing all content.
- Uses dot-notation paths (e.g., `'home.hero.title1'`) for nested field updates. Preserve these key paths.
- Key admin components: `SmartField` (auto-detects input type), `UniversalCardEditor`, `SimpleListEditor`, `ArrayEditor` (drag-and-drop via `@dnd-kit`).
- Admin login is triggered via a hidden lock icon in the footer's bottom-right corner.
- Auth: Firebase email/password via `signInWithEmailAndPassword`.
- Custom `reim-content-saved` event fires on CMS saves.

### Page Structure

Pages follow a chapter flow: `HomePage → Chapter1 → Chapter2 → Chapter3 → Chapter4 → Chapter5 → HomePage`. Each chapter uses hero sections, sticky sidebar layout (`SplitStickyLayout`), accordion Q&A, and `NextChapterButton`.

### Mobile vs Desktop

- **Mobile** (`md` breakpoint and below): `MobilePublicLayout` wraps pages with `SiteMobileStickyChrome` (purple bar, 84x48 menu chip, logo pill). Chapters 2-4 have dedicated `mobile/` subdirectories with Figma-precise implementations.
- **Desktop**: Sticky sidebar layout. `<main>` has `md:pr-20` (80px right sidebar).
- Chapter 2 mobile has the most complex implementation — sticky card stacks use a local scrollport (`.ch2-mobile-why-sticky-region`) so `position: sticky` works without app-shell overflow hacks.

### Key Directories

```
src/components/admin/       # CMS editor components
src/components/chapter1-5/  # Chapter-specific UI (with mobile/ subdirs)
src/components/common/      # Shared UI (Accordion, NextChapterButton, etc.)
src/components/home/        # Homepage components
src/components/layout/      # Header, Footer, Sidebar, MobilePublicLayout
src/hooks/                  # Custom React hooks
src/pages/                  # Page-level components
src/services/               # Firebase services (auth, content, upload)
src/tokens/                 # Design token modules per chapter
src/styles/                 # Chapter-specific CSS files
```

## Styling Rules (Critical)

### Stack
- **Tailwind CSS 4** with `@theme` directive in `src/index.css` (not config-based).
- Fonts: Rubik (primary), Salsa (decorative) — loaded via Google Fonts in `index.html`.
- Design tokens are defined as CSS custom properties in `src/index.css` and `src/theme.js`.

### RTL (non-negotiable)
- `dir="rtl"` is set on the main container in `App.jsx`.
- **Only logical CSS properties** for structural layout: `ps-`/`pe-`, `ms-`/`me-`, `border-s-`/`border-e-`, `text-start`/`text-end`, `start-`/`end-`, `inset-inline-*`.
- **Never** use `pl-`/`pr-`/`ml-`/`mr-`/`left`/`right` for structural layout.
- **`flex-col` alignment is reversed in RTL**: `items-start` → physical right, `items-end` → physical left. To right-align children in an RTL `flex-col`, use `items-start`.
- **`flex-row` in RTL**: first DOM child appears on the physical right. Never use `flex-row-reverse` to fake RTL — reorder JSX instead.
- Physical `left`/`right` is acceptable only for decorative overlays, floating badges, and SVG offsets inside `dir="ltr"` numeral boxes (document when used).
- Mixed-direction `dir="ltr"` islands (e.g., horizontal scroll strips, numeric displays) are intentional when present — preserve them.

### Desktop Layout
- **Desktop horizontal gutter**: use `var(--reim-desktop-gutter-x)` only. Do not introduce parallel formulas (`px-[200px]`, `px-[11%]`) for the same role.
- Reuse existing tokens (`--reim-home-*`, `--reim-desktop-section-gap-*`, chapter tokens) before creating new variables. New tokens need a one-line comment linking to Figma.
- Desktop single rows: `flex-nowrap`, no `flex-col` at desktop tier, `min-w-0` on flex children. Use localized `overflow-x-auto` + `snap-x` if content overflows.
- No `zoom` scaling for chapter layouts — use Tailwind utilities + breakpoints.
- No naked pixel widths for main columns — prefer `w-full max-w-[Npx]` or `max-w-screen-xl`.

### Figma Fidelity
- Exact pixel values from Figma — no rounding. `gap: 21px` → `gap-[21px]`.
- Prefer `@theme` color tokens (e.g., `text-text-purple`, `bg-brand-lime`) for the standard palette; raw hex is acceptable for one-off colors with no matching token.
- DOM order must match Figma Auto Layout child order unless explicitly documented.
- Do not use CSS `order` or `flex-row-reverse` to fix layout — reorder JSX.

## Firebase

- Config in `src/firebase.js`. Project ID: `reim-portal`.
- Persistent local cache with multi-tab support enabled.
- Firestore rules: public read, authenticated write.
- Deployment: Firebase Hosting (`firebase.json` points to `dist/`).

## Guardrails

- **Desktop only**: Unless explicitly asked, only modify desktop views. If a shared component is also used in mobile, keep mobile behavior unchanged.
- Do not introduce React Router or alternate routing frameworks.
- Do not break Firestore paths or `src/data.js` schema.
- Do not add new styling stacks or state management libraries.
- Prefer layout/CSS-only changes for visual tasks; call out behavior changes explicitly.
- Touch only files relevant to the task — no drive-by refactors.
- After UI changes: verify desktop + mobile layouts, RTL behavior, no unintended horizontal scroll, keyboard focus order intact.
- **No CSS `zoom` for chapter layouts** — it causes size mismatches between sections. Use Tailwind utilities + breakpoints. If encountered, remove: `CH4_DESKTOP_*` constants, `getChapter4DesktopScale`, `desktopScale` state, resize event listeners, and `style={{ zoom }}` wrappers.
- **Self-correcting layout effects (do not "simplify" by removing state from deps).** Some `useLayoutEffect`/`useEffect` blocks deliberately include their own state in the deps array AND call `setState` inside, in order to converge over 1–2 iterations against a `prev === needed` short-circuit (canonical example: the menu-row offset math in `[src/components/layout/SiteMobileStickyChrome.jsx](src/components/layout/SiteMobileStickyChrome.jsx)` — math closes over the current offset to subtract the applied transform). If you observe this pattern looping forever in some context (e.g. React error #185 on desktop), the cause is almost always the **measurement context being invalid** — not the deps themselves:
  - Element is `display:none` so `getBoundingClientRect()` returns zeros while a sibling is visible → math diverges.
  - Required image/font/asset has not loaded yet → wrong intermediate values.
  - Fix by adding an **early bail in the effect** for that context (e.g. `if (header.offsetParent === null) return;` for `display:none` elements). **Do NOT** remove the state from the dep array — that breaks the convergence on the surfaces where the effect was working. Always verify both the failing surface (e.g. desktop) and the working surface (e.g. mobile) after changing dep arrays of layout-measurement effects.

---

## Figma MCP Integration Rules

These rules govern every Figma-to-code task. Follow them in order — do not skip steps.

### Required Workflow

1. **`get_design_context`** — fetch structured design data (layout, spacing, colors, typography) for the target node.
2. **`get_screenshot`** — capture visual reference. This is the source of truth for pixel-fidelity validation.
3. If the response is truncated, call **`get_metadata`** to get the node tree, then re-fetch specific child nodes individually.
4. Download any assets returned via `localhost` URLs from the Figma MCP server — use those URLs directly without modification.
5. Translate the Figma output (React + Tailwind) into this project's conventions (see rules below).
6. Validate the final result against the screenshot before marking complete.

### Figma Cache Extraction Checklist

When reading cached Figma design data, extract these 7 categories:

1. **Spacing & rhythm** — padding, margin, gap, section heights, overlaps, scroll container heights.
2. **Repeated components** — identify one canonical template, list all variants, note `componentId` for reuse.
3. **Card / surface sizing** — fixed heights, asymmetric padding (normalize to logical props), border-radius.
4. **Typography** — `fontFamily`, `fontWeight`, `fontSize`, `lineHeight`, `letterSpacing`; map to Tailwind roles (`font-rubik`, `font-salsa`).
5. **Colors** — backgrounds, gradients, text fills, strokes, icon/pill backgrounds; record as hex/rgba and map to nearest token.
6. **Special elements** — shadows, dashed strokes, decorative groups, boolean icon states.
7. **Exportable assets** — `figmaNodeId`, `imageRef`, intended path in `public/assets/`; verify file size > 0.

Keep extracted values backward-compatible with existing CMS keys in `src/data.js` and Firestore.

### Token Mapping (Critical)

Map every Figma color from the standard palette to the nearest `@theme` token in `src/index.css`. Raw hex is acceptable for one-off colors that have no matching token.

Standard palette → token mapping:
- Purple `#6546de` → `text-text-purple` / `bg-brand-purple` / `border-border-purple`
- Dark purple `#46319b` → `bg-surface-page` / `bg-brand-purple-dark`
- Yellow `#ffb23b` → `bg-brand-yellow` / `bg-surface-yellow`
- Lime `#bce079` → `bg-brand-lime` / `bg-surface-lime`
- Black `#001d26` → `text-text-default` / `border-border-default`
- White `#ffffff` → `text-text-on-dark` / `bg-surface-default`
- Muted black `#001d2699` → `text-text-muted`
- Surface overlays (`Purple/4`, `Purple/8`, etc.) → `bg-surface-purple-4`, `bg-surface-purple-8`, etc.

**IMPORTANT: Never hardcode spacing with `px-[200px]` or similar for gutters.** Use `var(--reim-desktop-gutter-x)` or the relevant component token from `src/index.css`.

New layout tokens: add as CSS custom property in `src/index.css` under `:root`, with a one-line comment referencing the Figma node ID.

### Styling Conventions

- **Framework**: Tailwind CSS 4 — use utility classes. No inline styles except for dynamic/computed values.
- **No CSS Modules, no styled-components** — global utilities + component-scoped `[style]` attributes only when needed.
- **Fonts**: `font-rubik` (primary UI), `font-salsa` (decorative headings only).
- **Spacing**: Map Figma px values to the nearest Tailwind scale class (see table in "Fluid Sizing"). Use arbitrary `[Npx]` only when no Tailwind step is close enough (within ~2px).
- **Border radius**: Use `var(--radius-container)` (16px) for cards/containers unless Figma specifies otherwise.
- **`clamp()`** only for large hero/decorative typography. Not for gaps, padding, or section heights.

### RTL Rules (Non-Negotiable)

- The document is `dir="rtl"`. Figma designs are also RTL.
- Use only logical CSS properties: `ps-`/`pe-` (not `pl-`/`pr-`), `ms-`/`me-`, `start-`/`end-`, `border-s-`/`border-e-`.
- **In `flex-col` + RTL**: `items-start` = physical right, `items-end` = physical left.
- **In `flex-row` + RTL**: first DOM child = physical right. Reorder JSX to match Figma — never use `flex-row-reverse`.
- Physical `left`/`right` only for decorative overlays, floating badges, and SVG offsets inside explicit `dir="ltr"` islands.

**Physical coordinates from Figma Dev Mode:**
- Figma Dev Mode `x`/`y` values are authored in LTR file space. Mirror them to the RTL page using physical placement, not logical.
- When the user says "שמאל/ימין" (left/right), treat it as **physical screen edges** unless they explicitly say "inline-start/end".
- Decorative numerals: keep `dir="ltr"` on the numeric group; position via physical or logical coordinates as appropriate.

**RTL badge and title anchoring on cards:**
- Corner chapter/step chips: verify the chip's specified edge physically coincides with the card corner.
- Titles vs badge: headings must be on the reading side; use `padding-inline-start` to clear the badge area.
- List row icons (arrow pills): icon before text in DOM; `justify-content: flex-start` in RTL flows toward the reading side.
- Parent `align-items` on a card column flips which physical side the content hugs — verify after every RTL layout change.

### Component Reuse

- **Always check for existing components first** before creating new ones:
  - Shared UI → `src/components/common/` (Accordion, NextChapterButton, NewsletterCard, StickyCard, etc.)
  - Layout primitives → `src/components/layout/` (SplitStickyLayout, Footer, Header, Sidebar)
  - Chapter-specific → `src/components/chapter{N}/` and `src/components/chapter{N}/mobile/`
  - Homepage → `src/components/home/`
- New components: place in the most specific relevant directory.
- No TypeScript — use plain `.jsx` files.
- No PropTypes required unless the file already uses them.

### Asset Handling

- **IMPORTANT: If the Figma MCP server returns a `localhost` URL for an image or SVG, use it directly** — do not replace with a placeholder or install an icon library.
- Static project assets live in `public/assets/` with chapter-specific subdirs (e.g., `public/assets/home/`, `public/assets/chapter1/`).
- Reference assets via `/assets/...` paths (not relative imports).
- Images referenced in content use paths stored in `src/data.js` under `INITIAL_DATA`.

### Desktop vs Mobile Scope

- **Default scope: desktop only.** Do not modify mobile components unless explicitly asked.
- Desktop breakpoint: `md` and above (Tailwind default 768px).
- If a shared component must change, add `hidden md:block` / `md:hidden` guards rather than altering mobile markup.

### Fluid Sizing — Stepped Fluidity (Updated Approach)

Figma designs are spec'd at 1440px desktop. Translate values to **Tailwind rem-based utilities** and scale them with breakpoints — not `clamp()` math.

**Decision tree for any Figma spacing/size value:**

1. **Standard spacing/padding/gap** → use Tailwind scale (`p-4`, `gap-6`, `py-8`) and step up at `lg:`/`xl:` as needed.
2. **Column or container width** → use `w-full max-w-[Npx]` or `max-w-screen-xl`. Never bare `vw`.
3. **Large hero/display typography** → `clamp()` is acceptable: `clamp(32px, 4vw, 64px)`.
4. **Decorative element that must pixel-track a frame** → `clamp()` acceptable. Document the Figma node ID.
5. **Vertical space on short screens** → height media query, NOT a vw formula. See rule 2b above.

**`clamp()` is NOT permitted for:** gaps, padding, section heights, card padding, gutters, or body/UI font sizes. These must use Tailwind utilities + breakpoints.

**Tailwind scale reference** (most common Figma → Tailwind mappings):
| Figma px | Tailwind class |
|---|---|
| 4px | `gap-1` / `p-1` |
| 8px | `gap-2` / `p-2` |
| 12px | `gap-3` / `p-3` |
| 16px | `gap-4` / `p-4` |
| 20px | `gap-5` / `p-5` |
| 24px | `gap-6` / `p-6` |
| 32px | `gap-8` / `p-8` |
| 40px | `gap-10` / `p-10` |
| 48px | `gap-12` / `p-12` |
| 64px | `gap-16` / `p-16` |
| 80px | `gap-20` / `p-20` |

Fixed `px` is acceptable only for: borders (`1.5px`, `2px`), shadows (`2px 2px 0`), border-radius on small decorative elements.

### Tailwind Class Conflict Prevention (Critical)

When a shared component (e.g. `SplitStickyLayout`) has hardcoded Tailwind classes AND the caller passes overriding classes via props, Tailwind CSS 4 resolves conflicts by **stylesheet order**, not class-string order. Higher-scale values (e.g. `gap-24`) typically come later in the sheet and win over lower-scale values (e.g. `gap-0`) regardless of prop order.

**Rule: All potentially-conflicting classes must live in props with defaults — never hardcoded in the JSX template.**

Pattern for shared layout components:
```jsx
// ✅ Correct — conflicts impossible because template has no competing classes
const Layout = ({ className = "max-w-[1700px] px-6", contentClassName = "flex flex-col gap-24" }) => (
  <div className={`flex relative ${className}`}>        {/* no px/max-w here */}
    <div className={contentClassName}>...</div>         {/* no gap/pb here */}
  </div>
);

// ❌ Wrong — caller's gap-0 will lose to hardcoded gap-24
const Layout = ({ contentClassName = "" }) => (
  <div className={`flex flex-col gap-24 ${contentClassName}`}>...</div>
);
```

Corollary: when calling a shared component, always pass the **full** class string for each prop — don't assume the component's defaults will partially apply.

### DOM Order = Figma Auto Layout Child Order

- Figma Auto Layout child order is the canonical DOM order. First child in Figma → first in JSX.
- In `flex-row` + RTL: first DOM child = physical right (Figma's start side). This is correct — do not reorder.
- In `flex-col` + RTL: `items-start` = physical right, `items-end` = physical left.
- Never use CSS `order`, `flex-row-reverse`, or `direction: ltr` inside an RTL container to compensate for misordered JSX. Fix the JSX order instead.
- When Figma Auto Layout is "horizontal" → use `flex-row`. "Vertical" → use `flex-col`.

### Component Reuse Decision Tree

Before creating a new component:
1. Is the Figma element an **instance** of a known component (diamond icon in Layers panel)? → find and reuse the existing component.
2. Does it structurally match anything in `src/components/common/`, `src/components/layout/`, or `src/components/chapter{N}/`? → reuse it.
3. Is it used 2+ times in the design? → extract to a component.
4. None of the above → build inline in the page file first; extract only if it grows complex or is reused.

Check order: `common/` → `layout/` → `chapter{N}/` → `home/`.

### Validation Checklist

Before marking any Figma implementation complete:
- [ ] Standard palette colors use `@theme` tokens; raw hex only for one-offs without a matching token
- [ ] All logical CSS properties used — no `pl-`/`pr-`/`ml-`/`mr-`
- [ ] Layout values use Tailwind rem utilities + breakpoints — no bare `vw` for gaps/padding/gutters
- [ ] `clamp()` used only for hero/decorative typography, not for structural spacing
- [ ] Short-viewport issues addressed with `[@media(max-height:Npx)]:` variants, not `vw` shrinking
- [ ] Shared components: no conflicting hardcoded classes vs prop classes
- [ ] DOM order matches Figma Auto Layout child order
- [ ] No `flex-row-reverse` or CSS `order` used
- [ ] `npm run build` passes
- [ ] `npm run lint` is clean
- [ ] Visual output matches `get_screenshot` reference
