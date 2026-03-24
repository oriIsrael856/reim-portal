# Chapter 2 — Mobile screen (Figma “Page 2”) — extraction spec

**Figma file:** [`yFlNPGkCOnVPjFCuc8Kb1T`](https://www.figma.com/design/yFlNPGkCOnVPjFCuc8Kb1T) — תוכנית רעים  
**Copy (same shell nodes):** [`C2NkiNoHtXbBcYwBG3u0Ad`](https://www.figma.com/design/C2NkiNoHtXbBcYwBG3u0Ad/) — e.g. [`194:16426`](https://www.figma.com/design/C2NkiNoHtXbBcYwBG3u0Ad/?node-id=194-16426), [`194:16436`](https://www.figma.com/design/C2NkiNoHtXbBcYwBG3u0Ad/?node-id=194-16436)

**Two containers (mandatory structure):**

| Node | Name | Role |
|------|------|------|
| `194:16426` | Chapter 2 | **Purple** `#46319B`, column `alignItems: center`, padding `48 0 12`, width **375** — page rail |
| `194:16436` | Main content | **White** `#FFFFFF`, width **359**, `border-radius: 24`, `overflow-y` scroll, shadow `0 4 24 rgba(101,70,222,0.04)` — all chapter sections live here |

**Code:** `.ch2-mobile-page` (purple) + `.ch2-mobile-main-content` (white) in `Chapter2MobileShell.jsx`; tokens `--ch2-page-bg`, `--ch2-mobile-page-pad-*`, `--ch2-main-*`.

**`194:16427` “Right Sidebar”** (toolbar on **purple** only) vs **`194:16482` “Top bar”** (logo pill **inside** white `194:16436`) — see **`FIGMA_RIGHT_SIDEBAR_19416427.md`** ([Figma link](https://www.figma.com/design/C2NkiNoHtXbBcYwBG3u0Ad/?node-id=194-16427)).

**Main scroll surface** uses **column gap `-24px`** (stack overlap between sections).

> **Note:** Live Figma MCP was unavailable during the last sync; this document is generated from the repository’s cached Figma API export (`globalVars` + node tree). Re-validate with MCP when the quota resets.

### כלל סדר אלמנטים (Figma ↔ React)

- **כלל בסיס:** סדר ילדים ב־Auto Layout בפיגמה משקף את **סדר ה־DOM** בקומפוננטה, **כל עוד** כיוון המסמך זהה (או שאין היפוך משמעותי).
- **RTL (`dir="rtl"`):** ציר Flex בשורה מתחיל מ־**ימין**. אם רשימת הילדים בפיגמה היא לפי LTR והתוצאה בעברית צריכה להיות אחרת — **משנים סדר ב־JSX** (לא `order` ב־CSS) כדי להגיע לאותו **מיקום ויזואלי** כמו בעיצוב. דוגמה: מספר אוכלוסייה **מימין** לטקסט ⇒ ב־DOM המספר (`item-id`) **לפני** התווית (`item-label`).
- **מתועד גם ב־** `CLAUDE.md` — *Figma to code: layer order*.

---

## 1. Content & copy (source of truth)

**Runtime:** All user-facing strings MUST come from Firestore / `src/data.js` via props. Do not hardcode marketing copy in JSX.

**Accordion body (Chapter 2 groups):** In `item.content`, use `**phrase**` for emphasis (maps to `<strong>`). When a line is **only** a `**subsection title**` (DSM-style under “מאפיינים מרכזיים”), the **list disc** is on that heading; following lines are body text (optional leading `- ` is stripped — no bullets on body). If there are no such title-only lines, lines starting with `- ` still become a classic `<ul>`. Reconcile `**…**` with Figma when syncing copy.

**Figma reference strings** (for QA diff only):

| Node | Text |
|------|------|
| `194:16431` | `משתתפות.ים` (status bar — not implemented 1:1) |
| `I194:16442;191:16307` | `פרק שני` |
| `I194:16442;191:16309` | `02` |
| `194:16443` | `מי משתתפות ומשתתפים ברעים` |
| `202:3296` | `למי מיועדת התכנית?` |
| `202:3299` | (long body — see Figma `Description`) |
| `202:3300` | `הפעילות מתקיימת בקבוצות בהתאם לגיל ולאזור:` |
| `202:3344` | `מטרות` + line break + `תכנית רעים` |
| `202:3383`–`202:3390` | Groups intro block (subtitle, title, lead, list, long description) |
| Section 3 goal cards `202:3348`–`202:3369` | Six goal paragraphs (see tree) |

---

## 2. Page shell (`194:16426` / `194:16436`)

| Property | Figma | Token / class |
|----------|--------|----------------|
| Page fill | `#46319B` | `--ch2-page-bg` |
| Page padding | `48px 0 12px` | Shell: `pb-3`; top padding via `PrevChapterButton` wrapper |
| Main width | `359px` | `--ch2-main-max-width`, shell `max-w-[359px]` |
| Main radius | `24px` | `--ch2-main-radius` |
| Main fill | `#FFFFFF` | `--ch2-surface` |
| Main shadow | `0 4 24 rgba(101,70,222,0.04)` | `--ch2-main-shadow` |
| Top bar row | `padding: 0 24 0 16`, `gap: 10`, `alignItems: flex-end` | Approximated by `Chapter2MobileShell` header |

---

## 3. Section 1 — Hero (`194:16437`)

| Property | Figma layout | Token / implementation |
|----------|----------------|-------------------------|
| Section auto-layout | `layout_BHDVF9`: column, stretch, **gap 8**, **padding `120px 24px 0`** | `--ch2-section1-padding`, `--ch2-section1-stack-gap` |
| Text column | `layout_ZCDEKN`: width **303**, center, **gap 16** | `--ch2-hero-text-col-max-w`, `--ch2-hero-text-col-gap` |
| Image stack | `layout_3U64B4`: **height 560**, **gap 8**, `space-between`, center | `--ch2-hero-stack-h`, collage `min-height` |
| Chapter label (instance `191:16305` Mobile / Center) | `layout_03OB72`: column `flex-end`, center, **gap 16**, **padding `8px 24px 4px`**, radius **24**, lime fill, stroke `1.5px #001D26`, shadow “No blur” | `--ch2-chapter-label-*` + `Chapter2MobileChapterLabel` |
| Chapter digit badge | `layout_OU6DL0`: **28×28**, olive `#839C54`, digit **white** `Chapter/Small` | `--ch2-olive`, badge in label component |
| H1 | `Typography/H4`: Rubik **700**, **34px**, lh **1.1**, ls **~0.735%**, `#001D26` | `--ch2-type-h4-*`, `.ch2-mobile-type-h4` |
| Body in label | `Typography/Body 1` on tag | `--ch2-type-body-*` |

**Images:** Figma image frames use **fill + `objectFit: cover`**, stroke `1.5px #001D26`, radius **16px** on collage cells (`194:16729`, `194:16730`, `194:16741`). Decorative vectors (stars, person, plane) are positioned in the collage — approximated with SVG icons in code.

---

## 4. Section stack overlap

Main column `layout_L5PV5Q` / `layout_XJS6WL`: **gap `-24px`**.  
Sections use **`margin-top: -24px`** (`-mt-6` in Tailwind 4 default scale) after the first block to pull each section under the previous one.

Token: `--ch2-section-overlap-y: -24px` (reference for future refactors).

---

## 5. Typography suite (global styles used on this page)

| Style | Family | Weight | Size | Line height | Letter spacing | Default fill |
|---------|--------|--------|------|-------------|----------------|--------------|
| Typography/Body 1 | Rubik | 400 | 16px | ~1.32em | ~0.9375% | `#001D26` |
| Typography/Subtitle 1 | Rubik | 500 | 16px | ~1.22em | (body ls) | `#001D26` |
| Typography/H4 | Rubik | 700 | 34px | ~1.1em | ~0.735% | `#001D26` |
| Typography/H5 | Rubik | 700 | 24px | ~1.334em | — | `#001D26` |
| Typography/H6 | Rubik | 600 | 20px | ~1.28em | ~0.75% | `#001D26` |
| Chapter/Small | Salsa | 400 | 16px | ~1.28em | ~0.9375% | contextual |
| Chapter/Medium | Salsa | 400 | 40px | ~1.28em | ~0.375% | `#6546DE` (+ white stroke on age cells) |

Mapped in `:root` as `--ch2-type-*` and component classes under `@layer components`.

---

## 6. Sections 2–5 (node IDs)

| Section | Node | Key layouts |
|---------|------|-------------|
| Audience | `202:3293` | Orange card `layout_9KE32Z`, age column `layout_8BBKT9` / `layout_TQW9XA` |
| Goals | `202:3339` | `layout_FVZ8T4`, cards `layout_8NZX7P` |
| Groups intro | `202:3379` | `layout_D48Q1O`, image `layout_RTX1G7`, items `layout_SABD2X` |
| Group details + accordions | `202:10011` *(main file)* | See `--ch2-section5-*`; padding `60×24`, accordion gap `12`. |
| **Section 6 — למה יחד** | `202:10011` *(Copy file)* | [Figma Copy](https://www.figma.com/design/C2NkiNoHtXbBcYwBG3u0Ad/) — frame padding `80×24×0`, cards `24px` radius, `1.5px #001D26` stroke, fill `rgba(255,178,59,0.04)`→`#fff`, card padding `40×24`, inner gaps list `24` / text `14`, titles Subtitle 1, body Typography/Body 2 (`14px`). Code: `.ch2-mobile-section6`, `--ch2-why-*`. |
| List card inner rows | `202:10016` → `202:10020` | `8px` radius, `1.5px #001D26`, fill `rgba(188,224,121,0.08)`→`#fff`, row padding `12`, row gap `12`; icon frame `32×32`, `#BCE079`, `6px` radius, `1px #001D26` stroke. **RTL / DOM:** Figma lists Subtitle then Icon; on the site the check must stay on the **physical right** → put **`.ch2-mobile-why-card__check` before** `.ch2-mobile-why-card__row-text` in JSX (no `flex-row-reverse`). |

Implementation: `.ch2-mobile-section2*` … `.ch2-mobile-section5*`, `.ch2-mobile-section6` / `.ch2-mobile-why-*` in `src/index.css`.

**Sticky stacking (engineering, not Figma):** Cards live in `Chapter2MobileWhyStickyRegion` — a **local** `overflow-y: auto` scrollport so `position: sticky` works while the app shell stays `overflow-hidden`. Tokens: `--ch2-why-sticky-offset-base`, `--ch2-why-sticky-stack-step`, `--ch2-why-sticky-viewport-max-h`, `--ch2-why-sticky-exit-runway`, `--ch2-why-stack-padding-bottom`. Use `overscroll-behavior-y: auto` (not `contain`) so scroll can continue to the document after the inner scroller ends.

---

## 7. Engineering map (SOLID / DRY)

| Concern | Location |
|---------|----------|
| Design tokens | `src/index.css` `:root` (`--ch2-*`) |
| Numeric layout reference | `src/tokens/chapter2Mobile.js` (`FIGMA_CH2_NODES`, `CH2_MOBILE_LAYOUT`) |
| Composition | `Chapter2MobileView.jsx` |
| Presentational sections | `Chapter2Mobile*.jsx` |
| Shared label atom | `Chapter2MobileChapterLabel.jsx` |

---

## 8. Assets

Collage bitmaps: `public/assets/chapter2/hero-collage-*.png` (referenced from `data.js`). Replace when design exports change; keep **`object-fit: cover`** and **1.5px** dark stroke to match Figma image frames.
