# Chapter 3 — mobile (Page 3)

- **Spec:** `docs/figma-cache-page3.json` (tokens, layout, accordion reference titles).
- **Styles:** `src/styles/chapter3-mobile.css` — CSS variables `--ch3-*` must stay aligned with the JSON cache.
- **Copy:** All user-visible strings come from CMS / `content.chapter3` (`data` prop), not hardcoded in components.
- **RTL:** Root `dir="rtl"`; rows use `justify-content: flex-end` / `text-align: start` so Hebrew flows “משמאל לימין כמו שכותבים בעברית”.

## Page Content hero image (`253:8650`)

- Spec: `docs/figma-cache-page3.json` → `layout.pageContentHeroImage`.
- Components: `Page3HeroImageBlock.jsx` (chapter digits + red waves via shared `BigChapterDigits`).
- Export: `public/assets/chapter3/page3-hero-photo.png` (`imageRef` in cache); overlay gradient in CSS only.

## Entry

- `Chapter3MobileView.jsx` — composed by `src/pages/Chapter3.jsx` under `md:hidden`.

## Optional token import

- `src/tokens/chapter3Page3.js` imports the JSON for `REFERENCE_SESSION_ACCORDION_TITLES` (parity checks / tooling).
