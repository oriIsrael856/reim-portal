# Figma — `194:16427` “Right Sidebar” vs containers (Chapter 2 mobile, Copy file)

**Source:** [Figma — node `194:16427`](https://www.figma.com/design/C2NkiNoHtXbBcYwBG3u0Ad/?node-id=194-16427) (תוכנית רעים — Copy)

This note describes **layout hierarchy only** (from Figma API export). It does **not** prescribe changes to the global `Header.jsx` component.

---

## Where this node lives

| Figma node        | Name          | Parent           | Role |
|-------------------|---------------|------------------|------|
| `194:16426`       | Chapter 2     | —                | Purple page frame **375×812**, fill `#46319B`, column `alignItems: center`, padding `48 0 12`, `borderRadius` 16px |
| **`194:16427`**   | **Right Sidebar** | **Child of `194:16426`** | Toolbar row on the **purple** frame — **not** inside the white “Main content” column |
| `194:16436`       | Main content  | **Sibling** of `194:16427` (also under `194:16426`) | White column **359px** wide, scroll, `borderRadius` 24px, negative stack gap `-24px` with sections |

So: **Right Sidebar = chrome on the purple rail.** The **white card** is a **separate** sibling frame, not a parent of `194:16427`.

---

## Right Sidebar (`194:16427`) layout tokens

From Figma `globalVars` (Copy export):

- **Mode:** row  
- **`justifyContent`:** `space-between`  
- **`alignItems`:** `flex-end`  
- **Gap:** `10px`  
- **Padding:** `0px 24px 0px 16px` (file LTR: **16px** on one inline edge, **24px** on the other)  
- **Width:** `375` (full frame width)  
- **Height:** hug contents  

### Children (conceptual)

1. **Icon** block — row with **IconButton** (Material, Small, Dark) + **Screen name** text (`Typography/Body 1`, fill `#FFFFFF`, e.g. “משתתפות.ים”) and a small decorative line.  
2. **Menu icon** — group `194:16433` with **absolute** placement inside the sidebar (`locationRelativeToParent` ~ **x: 145, y: 0**, size **84×48**): white menu graphic + **IconButton** instance.

The menu control is **part of the purple-frame toolbar**, not the inner white column.

---

## “Top bar” in Figma (`194:16482`) — different node

| Node        | Name     | Parent        | Role |
|-------------|----------|---------------|------|
| `194:16482` | Top bar  | **`194:16436` Main content** | **Inside the white column**: `position: absolute`, **x: 12, y: 12**, **335×56**, pill (`borderRadius` 200px), fill `rgba(255,255,255,0.4)`, stroke `1px rgba(0,29,38,0.08)`, shadow `0 4px 24px rgba(101,70,222,0.04)`, padding `14px 8px` — holds **Logo** in the file tree |

So in Figma there are **two** distinct layers:

1. **Purple** — `194:16427` (status / title / menu affordances on `#46319B`).  
2. **White column** — `194:16482` glass **logo pill** anchored to the main content card.

Do not merge these mentally with a single global header bar unless the product explicitly wants parity.

---

## Engineering map

| Concern | In this repo |
|--------|----------------|
| Purple + white shell for **Chapter 2 mobile** | `Chapter2MobileShell.jsx` + `--ch2-*` in `index.css` |
| Sticky chrome + **84×48** menu frame | `Chapter2MobileStickyChrome.jsx`, classes `ch2-mobile-menu-frame*` |
| אייקון תפריט (ייצוא צומת ‎`194:16433`‎) | `public/assets/chapter2/menu-icon-figma.png` (מומלץ לעדכן ע״י ‎Figma MCP‎ / ייצוא מחדש) |
| ייחוס ויזואלי מלא לשורה | `public/assets/chapter2/right-sidebar-194-16427-ref.png` (ייצוא ‎`194:16427`‎ @2x) |
| Logo pill **194:16482** | `Chapter2MobileTopBarPill` + `figma16482` + `ch2-mobile-top-bar-pill--figma-16482` |
| **Global** fixed header (all routes) | `src/components/layout/Header.jsx` — **separate** from Figma `194:16427` / `194:16482` unless we intentionally mirror them later |
| Full mobile spec | `FIGMA_CHAPTER2_MOBILE_SPEC.md`, `README.md` in this folder |

---

## Node ID for tools

```text
FIGMA_CH2_NODES.rightSidebar = '194:16427'  // optional — add in chapter2Mobile.js if needed
```
