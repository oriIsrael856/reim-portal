---
name: fit-to-viewport
description: Adapt UI element proportions to match a target % of viewport width or height using clamp(min, Xvw, max). Use when a section, card, or font is too large or too small at a specific screen size and needs to scale proportionally across all screen sizes.
---

# Fit to Viewport — Proportional Scaling

## When to use this skill

- A section/card is too tall or too short at the user's viewport
- Fonts don't scale proportionally across screen sizes
- You need an element to be exactly X% of viewport width or height
- Stepped breakpoints (md:/xl:) produce jarring jumps instead of smooth scaling

---

## The formula

```css
clamp(min, Xvw, max)
```

- **min** — smallest acceptable value on narrow desktop (~768px)
- **Xvw** — linear scaling factor (the proportional middle range)
- **max** — Figma design value or largest acceptable value

---

## Step 1 — Get the user's actual viewport

Ask the user to run in the browser console:
```js
console.log(window.innerWidth, window.innerHeight)
```
This gives **CSS pixels** (physical pixels ÷ devicePixelRatio × zoom).
Common setup: 1920×1080 at 125% Windows scaling = **1536×864 CSS px**.

---

## Step 2 — Derive the vw coefficient

```
X = (target_value_px / viewport_width_px) × 100
```

**Examples:**
- Figma padding 64px, Figma frame 1424px wide → `64/1424 × 100 = 4.5vw`
- Padding that should be 36px at 1536px viewport → `36/1536 × 100 = 2.34vw`

---

## Step 3 — Target a % of viewport HEIGHT

When the goal is "element should be ~N% of viewport height":

1. `target_px = viewport_height × (N/100)`
   Example: 41% of 730px = **299px**

2. Subtract fixed content (text lines, borders, inner gaps you don't control) to isolate the tunable space (padding, outer gap).

3. Solve: `vw_coeff = available_pad_px / viewport_width_px × 100`

4. Set `min` to a sensible floor (prevents collapse on small screens), `max` to the Figma value or slightly above.

**Worked example — committees card at 1536×730:**
```
target height  = 41% × 730 = 299px
content height ≈ 200px (fixed)
available for padding+gaps ≈ 99px

pt target = 36px → 36/1536 × 100 = 2.34vw → clamp(14px, 2.34vw, 44px)
pb target = 28px → 28/1536 × 100 = 1.82vw → clamp(12px, 1.82vw, 36px)
gap target = 16px → 16/1536 × 100 = 1.04vw → clamp(8px, 1.04vw, 18px)
```

---

## Step 4 — Target a % of viewport WIDTH

Simply cap the container:
```jsx
<div className="max-w-[74vw] mx-auto">
```
No clamp needed — `vw` units alone work for width since horizontal overflow is visible.

---

## Step 5 — Font sizes

Same formula applies:
```
font_vw = (figma_font_px / figma_frame_width_px) × 100
```

**Common values for this project (1424px Figma frame):**
| Figma size | vw coefficient | clamp |
|---|---|---|
| 34px heading | 2.39vw | `clamp(18px, 2vw, 34px)` |
| 20px body | 1.4vw | `clamp(14px, 1.4vw, 20px)` |
| 18px card title | 1.26vw | `clamp(12px, 1.26vw, 18px)` |
| 16px UI text | 1.12vw | `clamp(12px, 1vw, 16px)` |
| 14px small | 0.98vw | `clamp(11px, 0.98vw, 14px)` |

---

## Rules

### Height ≠ Width axis
Never use a `vw` formula to solve a height problem directly.
The two axes are independent — derive the vw value from the WIDTH dimension, then verify it achieves the desired height result at the known viewport.

### Don't use pure `vw` without clamp
Pure `vw` causes elements to be too large on wide screens and invisible on small ones. Always add `min` and `max`.

### Don't use stepped breakpoints for proportional scaling
`md:/lg:/xl:` produce step changes, not smooth scaling. Use `clamp()` instead.

### Tailwind arbitrary value syntax
```jsx
// padding
className="pt-[clamp(14px,2.34vw,44px)]"

// font size
className="text-[clamp(12px,1.26vw,18px)]"

// height
className="h-[clamp(28px,2.9vw,56px)]"

// max width
className="max-w-[74vw]"
```

---

## Runtime utility — `src/utils/viewportClamp.js`

Three functions available. Use in browser console while dev server runs (`npm run dev`):

### `vwClamp(designPx, { min, max })` — design value → clamp string
```js
import { vwClamp } from '/src/utils/viewportClamp.js'

vwClamp(64, { min: 14 })          // "clamp(14px, 4.50vw, 64px)"
vwClamp(18, { min: 12 })          // "clamp(12px, 1.26vw, 18px)"
```

### `fitHeightPercent({ targetPercent, contentPx })` — real-time height targeting
Reads `window.innerWidth / innerHeight` at call time.
```js
import { fitHeightPercent } from '/src/utils/viewportClamp.js'

// "I want this card to be 41% of viewport height.
//  Its inner content is ~200px tall."
const clamps = fitHeightPercent({ targetPercent: 41, contentPx: 200 })
console.log(clamps)
// → {
//     pt:  "clamp(14px, 2.34vw, 44px)",
//     pb:  "clamp(12px, 1.82vw, 36px)",
//     gap: "clamp(8px,  1.04vw, 20px)",
//     _debug: { viewport: "1536×730", targetPx: 299, available: 99 }
//   }
```

Custom slot distribution (e.g. more top padding than bottom):
```js
fitHeightPercent({
  targetPercent: 41,
  contentPx: 200,
  slots: { pt: 0.45, pb: 0.35, gap: 0.20 },
  mins:  { pt: 14,  pb: 12,  gap: 8 },
})
```

### `fitWidthPercent({ targetPercent, contentPx })` — real-time width targeting
Reads `window.innerWidth` at call time. Returns clamp values for horizontal padding + a ready `maxWidth`.
```js
import { fitWidthPercent } from '/src/utils/viewportClamp.js'

// "I want this section to be 74% of viewport width.
//  Its inner content (cards + gaps) is ~800px wide."
const clamps = fitWidthPercent({ targetPercent: 74, contentPx: 800 })
console.log(clamps)
// → {
//     maxWidth: "74vw",
//     ps:  "clamp(24px, 2.19vw, 50px)",
//     pe:  "clamp(24px, 2.19vw, 50px)",
//     _debug: { viewport: "1536×730", targetPx: 1136, available: 336 }
//   }

// Asymmetric (more padding on one side):
fitWidthPercent({ targetPercent: 74, contentPx: 800, slots: { ps: 0.6, pe: 0.4 } })

// Just cap width, no inner padding calculation needed:
fitWidthPercent({ targetPercent: 74, contentPx: 0 })
// → { maxWidth: "74vw", ... }
```

### `measureElement(selector)` — inspect existing element live
```js
import { measureElement } from '/src/utils/viewportClamp.js'

// Prints current size as % of viewport + computed padding + suggested call
measureElement('#ch4-committees-section > div:first-child')
// [measureElement] #ch4-committees-section > div:first-child
//   Size:     1136 × 299 px
//   Viewport: 1536 × 730 px
//   Width:    74.0% of vw
//   Height:   40.9% of vh
//   Padding:  top=36px right=61px bottom=28px left=61px
//   Gap:      16px
```

---

## Reim portal — production implementation (read this in-repo)

The **canonical agent documentation** for how this repo applies Figma-ratio scaling on **Chapter 4 desktop** is **`CLAUDE.md` → §2c (Chapter 4 desktop — Figma-ratio viewport registry)**. It explains the reference frame (1920×1080), registry layout, `useChapter4DesktopStyles`, `useViewportFit` for the purple card, and max-width helpers—written for maintainers and coding agents.

**Code map:**

| Piece | Location |
|--------|----------|
| Math + `FIGMA_VIEWPORT`, clamps | `src/utils/viewportClamp.js` |
| Chapter 4 token registry | `src/config/chapter4ViewportRegistry.js` |
| Single `resize` → full style map | `src/hooks/useChapter4DesktopStyles.js` |
| Page wiring | `src/pages/Chapter4.jsx` |

When editing Chapter 4 desktop scaling, **change the registry** rather than scattering new magic numbers in JSX, unless the task is explicitly one-off.

---

## Verification checklist

- [ ] Run `window.innerWidth` / `window.innerHeight` in browser to confirm actual CSS viewport
- [ ] At target viewport: `Xvw` resolves to ~target_px (verify with DevTools computed styles)
- [ ] `min` value looks reasonable at 768px viewport
- [ ] `max` value doesn't look oversized at 1920px viewport
- [ ] Height result is ~N% of viewport height as intended
- [ ] `npm run build` passes
