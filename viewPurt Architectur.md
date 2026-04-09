
Here is the **logical story** of the viewport approach in this project, in plain language (minimal frontend jargon).

---

## 1. What problem we’re solving

Designs are drawn in **Figma at a fixed frame** (here: **1920×1080**).  
Real browsers are **any size**: 1536×730, 1920×1080, ultrawide, etc.

We want the page to **feel the same** on any screen: same *proportions* (how big things are relative to the window), not necessarily the same pixel numbers.

---

## 2. The reference frame (“ruler”)

We treat **1920×1080** as the **reference ruler**:

- **Horizontal** things (widths, left/right padding, gaps in a row) are compared to **1920**.
- **Vertical** things (heights, top/bottom padding, gaps in a column) are compared to **1080**.

So: “this padding is 200px in Figma” means “200 out of 1920 wide” or “200 out of 1080 tall”, depending on which axis we chose.

---

## 3. Three small ideas chained together

**A. “What % of the design frame is this?”**  
Example: a card is **1264px** wide in Figma → \(1264 / 1920\) of the frame width.  
That’s a **percentage of the reference**, not of the user’s screen yet.

**B. “How big is the user’s window right now?”**  
We read **`window.innerWidth`** and **`window.innerHeight`** (CSS pixels).  
That’s the **live viewport**.

**C. “Keep the same ratio on the live viewport”**  
If something was **X% of the Figma width**, we want it to be **about X% of the current browser width** (and similarly for height on the height axis).

The math is basically:

- Scale by width: `figmaPx × (currentWidth / 1920)`
- Scale by height: `figmaPx × (currentHeight / 1080)`

So the **relationship** “this element vs the frame” is preserved as “this element vs the current window”.

---

## 4. Why we output `clamp(...)` and not only raw pixels

If we only scaled to pixels, on **very small** windows things could become unreadable, and on **huge** windows they could become absurd.

So each value is usually wrapped as:

**`clamp(minimum, preferred, maximum)`**

- **Preferred** = the scaled value (often expressed with **`vw`** so it moves smoothly when resizing).
- **Min / max** = safety rails from the registry (floors and caps).

So: **same logic as Figma**, but **bounded** for real life.

---

## 5. Where the numbers live: the “registry”

Instead of scattering magic numbers in JSX, we keep a **dictionary** (e.g. [`chapter4ViewportRegistry.js`](src/config/chapter4ViewportRegistry.js)):

- For each **UI piece** (hero title, file card, FAQ row, …) we store **Figma pixel values** and **which axis** (width vs height) each property uses.
- Some blocks also store **min/max** for the clamps.

That’s the **single place** to adjust design tokens for Chapter 4 desktop.

---

## 6. Two ways we apply this (still the same math underneath)

**Per-property scaling** (most of the page)  
Many CSS properties (font size, padding, gap, width, height) each get their own scaled `clamp()` via **`computeStyleFromFigma`**.

**Slot model** (only the purple “committees” card)**  
There we first say: “this card’s **total height** should match the same **% of viewport height** as in Figma,” then we **split** the remaining vertical space between padding and gap with fixed **weights** (e.g. 38% / 30% / 32%).  
That’s **`useViewportFit` + `computeClamps`** — same reference frame, different **packing** problem.

---

## 7. One listener instead of fifty: `useChapter4DesktopStyles`

Each `resize` would be expensive if every component listened separately.

So **`useChapter4DesktopStyles`**:

1. On **resize**, reads the viewport once.
2. Loops over **all** registry entries and builds one big object of style strings (`d.heroH1`, `d.fileCard`, …).
3. **Chapter 4 desktop** reads `d` and passes pieces into layout and child components.

So architecturally: **one place** reacts to the window; **many** UI pieces consume the result.

---

## 8. `min(…px, …vw)` for max widths

For things like “this column is **1136px** in Figma”:

- On a **narrow** screen we want it to scale like **1136/1920 of the width**.
- On a **very wide** screen we don’t want it to grow past **1136px**.

So we use CSS like: **`min(1136px, 59.17vw)`** (numbers from Figma).  
That’s **`getCh4BoxMaxWidthCss` / `getCh4MinMaxWidthCss`**.

---

## 9. What we did *not* try to do

- We did **not** replace **mobile** Chapter 4 with this (only **desktop** `md+`).
- We did **not** use **`zoom`** to scale the whole page (project rule: avoid that).
- We did **not** add a new routing or state library — still React + inline styles built from the registry.

---

## 10. Mental model in one sentence

**Figma is the contract; 1920×1080 is the ruler; the browser viewport is the live sheet; we rescale each measurement along the right axis, clamp it, and centralize definitions in a registry with one resize pass for the whole desktop page.**

If you want the same explanation **in Hebrew** for sharing with a teammate, say so and I’ll mirror this in Hebrew in the next message only.