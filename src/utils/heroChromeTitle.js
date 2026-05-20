/** `chapter1` … `chapterN` — same keys as `currentPage` in App */
const CHAPTER_PAGE_RE = /^chapter\d+$/;

/**
 * `hero.chromeTitle` for the mobile chrome strip + desktop purple rail.
 * One path for every chapter: trim, strip a leading "-", drop obvious mistaken hero copy
 * (participant wording without "פרק") so Firestore can fall through to `hero.tag`.
 *
 * @param {string} pageKey
 * @param {{ chromeTitle?: unknown } | null | undefined} hero
 * @returns {string}
 */
export function getEffectiveHeroChromeTitle(pageKey, hero) {
    if (!CHAPTER_PAGE_RE.test(pageKey) || hero?.chromeTitle == null) return '';
    let s = String(hero.chromeTitle).trim();
    if (!s) return '';
    s = s.replace(/^\s*-\s*/, '').trim();
    if (!s) return '';
    if (/משתתפ/.test(s) && !/פרק/.test(s)) return '';
    return s;
}
