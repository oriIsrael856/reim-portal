# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

ReimPlease analyze the current architecture of the Reim project. Create a Plan for improving modularity and ensuring we follow SOLID principles in our services. CSS 4.

## Commands

```bash
npm run dev        # Start Vite dev server with HMR
npm run build      # Production build
npm run lint       # ESLint check
npm run preview    # Preview production build
```

No test framework is configured.

## Architecture

### Routing & State
There is **no React Router** in use despite it being installed. Routing is handled manually via `currentPage` state in `App.jsx`. Navigation uses a `navigateTo(page)` function that sets state and scrolls to top. Pages are lazy-loaded with `React.lazy()` and `Suspense`.

Valid page values: `'home'`, `'chapter1'` through `'chapter5'`, `'admin'`.

### Data Flow
- **Firebase Firestore** stores all site content at document path `site_content/v11` (version controlled via `DATA_VERSION` constant in `App.jsx`).
- `App.jsx` sets up a real-time Firestore listener (`onSnapshot`) that syncs content to `content` state.
- Content is passed down via props to all page components — no Context API or state management library.
- `src/data.js` contains `INITIAL_DATA`, the full default content structure used to seed Firestore.

### CMS / Admin
- `AdminPanel.jsx` provides a visual CMS for editing all site content.
- Uses dot-notation paths (e.g., `'home.hero.title1'`) for nested field updates.
- Key admin components: `SmartField` (auto-detects input type), `UniversalCardEditor` (generic object editor), `SimpleListEditor` (array management), `ArrayEditor`.
- Admin login is triggered via a hidden lock icon in the bottom-right corner of the footer.
- Authentication: Firebase email/password auth via `signInWithEmailAndPassword`.

### Page Structure
Pages follow a chapter-based flow: `HomePage → Chapter1 → Chapter2 → Chapter3 → Chapter4 → Chapter5 → HomePage`. Each chapter page typically uses a hero section, sticky sidebar layout (`SplitStickyLayout`), accordion Q&A sections, and a `NextChapterButton`.

### Styling
- **Tailwind CSS 4** with PostCSS integration (not the older config-based setup).
- Theme constants in `src/theme.js`: primary purple `#5E3BEE`, secondary yellow `#FFD028`, newsletter green `#D1E68F`.
- Fonts: Rubik (primary), Salsa (decorative) — loaded via Google Fonts in `index.html`.
- RTL: `dir="rtl"` set on the main container in `App.jsx`.
- Common patterns: large rounded corners (`rounded-[40px]`), 3D offset shadows, glassmorphism header with `backdrop-blur`.

### Firebase Config
Firebase is initialized in `src/firebase.js` with persistent local cache and multi-tab support. Project ID: `reim-portal`.
