/**
 * Scroll to the visible Chapter 2 group block (mobile Figma shell or desktop).
 * Both trees stay in the DOM; only one has layout — pick the first with a real box.
 * @param {string} numStr e.g. "01", "02" (digits only, two chars)
 */
export function scrollToChapter2GroupSection(numStr) {
    const nodes = document.querySelectorAll(`[data-ch2-group="${numStr}"]`);
    for (const el of nodes) {
        const rect = el.getBoundingClientRect();
        if (rect.width > 0 && rect.height > 0) {
            el.scrollIntoView({ behavior: 'smooth', block: 'start' });
            return;
        }
    }
}
