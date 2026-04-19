/**
 * Chapter 3 desktop — Figma viewport registry (1920×1080 ref).
 * Original Figma frame was 1824×3705; values scaled to 1920 ref for consistency.
 * Consumed by useChapter3DesktopStyles.
 */
import { FIGMA_VIEWPORT } from '../utils/viewportClamp';

export function getCh3MinMaxWidthCss(figmaWidthPx) {
    const pct = ((figmaWidthPx / FIGMA_VIEWPORT.width) * 100).toFixed(2);
    return `min(${figmaWidthPx}px, ${pct}vw)`;
}

export const CH3_DESKTOP_STYLE_REGISTRY = {
    /* ── Split layout — Figma 120:3721 (1824 frame → scaled to 1920) ── */
    splitGutter: {
        values: {
            paddingInlineStart: { px: 211, axis: 'width' },
            paddingInlineEnd: { px: 211, axis: 'width' },
        },
        mins: { paddingInlineStart: 80, paddingInlineEnd: 80 },
        maxes: { paddingInlineStart: 211, paddingInlineEnd: 211 },
    },
    sidebarW: {
        values: { width: { px: 387, axis: 'width' } },
        mins: { width: 180 },
        maxes: { width: 387 },
    },
    contentW: {
        values: { width: { px: 900, axis: 'width' } },
        mins: { width: 320 },
        maxes: { width: 900 },
    },
    contentPt: {
        values: { paddingTop: { px: 110, axis: 'height' } },
        mins: { paddingTop: 48 },
    },

    /* ── Sticky hero image — Figma 120:3725: 900px / 1824 ≈ 49.34vw ── */
    stickyStripH: {
        values: { height: { px: 950, axis: 'width' } },
        mins: { height: 500 },
    },

    /* ── Responsibility cards — Figma 120:3736 ── */
    respCardOuterH: {
        values: { height: { px: 950, axis: 'width' } },
        mins: { height: 500 },
    },
    respCardOuterPx: {
        values: {
            paddingInlineStart: { px: 42, axis: 'width' },
            paddingInlineEnd: { px: 42, axis: 'width' },
        },
        mins: { paddingInlineStart: 16, paddingInlineEnd: 16 },
    },
    respCardInnerH: {
        values: { minHeight: { px: 550, axis: 'width' } },
        mins: { minHeight: 320 },
    },
    respCardPad: {
        values: {
            paddingInlineEnd: { px: 85, axis: 'width' },
            paddingInlineStart: { px: 63, axis: 'width' },
            paddingTop: { px: 42, axis: 'width' },
            paddingBottom: { px: 42, axis: 'width' },
            gap: { px: 25, axis: 'width' },
        },
        mins: { paddingInlineEnd: 32, paddingInlineStart: 24, paddingTop: 20, paddingBottom: 20, gap: 12 },
    },
    respTitleFont: {
        values: { fontSize: { px: 34, axis: 'width' } },
        mins: { fontSize: 24 },
        maxes: { fontSize: 34 },
    },
    respItemFont: {
        values: { fontSize: { px: 20, axis: 'width' } },
        mins: { fontSize: 14 },
        maxes: { fontSize: 20 },
    },
    respItemFontSmall: {
        values: { fontSize: { px: 16, axis: 'width' } },
        mins: { fontSize: 12 },
        maxes: { fontSize: 16 },
    },

    /* ── Onboarding section — Figma 120:4317 ── */
    onboardGutter: {
        values: {
            paddingInlineStart: { px: 211, axis: 'width' },
            paddingInlineEnd: { px: 211, axis: 'width' },
        },
        mins: { paddingInlineStart: 80, paddingInlineEnd: 80 },
        maxes: { paddingInlineStart: 211, paddingInlineEnd: 211 },
    },

    /* ── Session/collage section — Figma 120:5039 (1824×1068) ── */
    sessionGutter: {
        values: {
            paddingInlineStart: { px: 211, axis: 'width' },
            paddingInlineEnd: { px: 211, axis: 'width' },
        },
        mins: { paddingInlineStart: 80, paddingInlineEnd: 80 },
        maxes: { paddingInlineStart: 211, paddingInlineEnd: 211 },
    },
    sessionMinH: {
        values: { minHeight: { px: 828, axis: 'height' } },
        mins: { minHeight: 500 },
    },
};

export { FIGMA_VIEWPORT };
