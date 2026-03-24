# Chapter 2 — Mobile (Figma)

**Primary file:** `yFlNPGkCOnVPjFCuc8Kb1T`  
**Copy (same node IDs for shell):** [`C2NkiNoHtXbBcYwBG3u0Ad`](https://www.figma.com/design/C2NkiNoHtXbBcYwBG3u0Ad/) — תוכנית רעים (Copy)

**Frame:** `194:16426` — **"Chapter 2"** (375×812) — **purple** `#46319B`, padding `48 0 12`, column center  
**Main column:** `194:16436` — **"Main content"** (359px wide, `border-radius` 24px, **white** `#FFFFFF`, vertical scroll, shadow)

## Architecture

| Layer | Figma | Implementation |
|--------|--------|----------------|
| Page (purple) | `194:16426` | `.ch2-mobile-page` — `--ch2-page-bg`, `--ch2-mobile-page-pad-*`, full-bleed `-mx-4` |
| Main content (white) | `194:16436` | `.ch2-mobile-main-content` + `.ch2-mobile-main-surface` — `--ch2-main-*` |
| Sections | Negative gap `-24px` stack (overlap) | Tailwind `-mt-6` / `-mt-4` between sections |

## Tokens

- **CSS:** `src/index.css` → `:root` variables prefixed `--ch2-*`
- **JS (reference):** `src/tokens/chapter2Mobile.js` — layout maps + typography numbers from Figma API

## Figma extraction checklist (full)

See **`FIGMA_CHAPTER2_MOBILE_SPEC.md`** in this folder: copy sources, typography, auto-layout, tokens map, and node IDs. **`FIGMA_RIGHT_SIDEBAR_19416427.md`** — purple-frame toolbar (`194:16427`) vs logo Top bar inside white column (`194:16482`). Re-sync with Figma MCP when available.

### סדר אלמנטים (חובה)

- סדר שכבות בפיגמה = סדר DOM ב־React (לא `order` ב־CSS אלא אם חייבים). פירוט: `FIGMA_CHAPTER2_MOBILE_SPEC.md` → *כלל סדר אלמנטים*, ו־**`CLAUDE.md`** → *Figma → code: סדר שכבות*.

## Components

- `Chapter2MobileView` — composition root (used from `Chapter2.jsx`)
- `Chapter2MobileShell` — purple rail + white card
- `Chapter2MobileChapterLabel` — Section 1 chapter pill + digit (191:16305)
- `Chapter2MobileHero` — Section 1 (194:16437): CMS title (H4), collage, `BigChapterDigits`
- `Chapter2MobileAudience` — Section 2 (202:3293): כרטיס כתום עם טקסט + הערה + עמודת כרטיסי גיל; `.ch2-mobile-section2*` ב־`index.css`
- `Chapter2MobileGoals`, `Chapter2MobileGroupsIntro`, `Chapter2MobileGroupAccordions`, `Chapter2MobileSection6` — wraps Part7 + Why together (Figma Copy `C2NkiNoHtXbBcYwBG3u0Ad`, node `202:10011`)
- `Chapter2MobilePart7`, `Chapter2MobileWhyTogether`
- `AccordionMobileFigma`, `FigmaAgeRow`, `BigChapterDigits`

## RTL

Root app uses `dir="rtl"`. Decorative LTR number (`BigChapterDigits`) uses `dir="ltr"` locally per Figma `textAlign: LEFT` on display numeral.
