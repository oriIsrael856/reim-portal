/**
 * Desktop side menu overlay — Figma 36:1324 / 36:1325 (ref viewport 1920×1080).
 * Drives useMenuOverlayStyles (same ratio model as Chapter 4–5).
 */
import { FIGMA_VIEWPORT } from '../utils/viewportClamp';

/** `min(figmaPx, figmaPx/1920*100vw)` — drawer width, row width, etc. */
export function menuOverlayMinMaxWidth(figmaPx) {
    const pct = ((figmaPx / FIGMA_VIEWPORT.width) * 100).toFixed(2);
    return `min(${figmaPx}px, ${pct}vw)`;
}

/** Per-property maps for computeStyleFromFigma */
export const MENU_OVERLAY_STYLE_SPECS = {
    panelPadding: {
        values: {
            paddingInlineStart: { px: 80, axis: 'width' },
            paddingInlineEnd: { px: 80, axis: 'width' },
            paddingBlockStart: { px: 60, axis: 'height' },
            paddingBlockEnd: { px: 60, axis: 'height' },
        },
        mins: {
            paddingInlineStart: 24,
            paddingInlineEnd: 24,
            paddingBlockStart: 24,
            paddingBlockEnd: 24,
        },
    },
    navGapHomeToChapters: {
        values: { gap: { px: 24, axis: 'height' } },
        mins: { gap: 16 },
    },
    chapterListGap: {
        values: { gap: { px: 40, axis: 'height' } },
        mins: { gap: 24 },
    },
    menuRow: {
        values: {
            minHeight: { px: 64, axis: 'height' },
            paddingBlock: { px: 12, axis: 'height' },
            gap: { px: 10, axis: 'width' },
        },
        mins: { minHeight: 48, paddingBlock: 8, gap: 8 },
    },
    menuLabel: {
        values: {
            fontSize: { px: 20, axis: 'width' },
        },
        mins: { fontSize: 16 },
        maxes: { fontSize: 20 },
    },
    menuDigit: {
        values: {
            fontSize: { px: 120, axis: 'width' },
        },
        mins: { fontSize: 72 },
        maxes: { fontSize: 120 },
    },
    railLabel: {
        values: { fontSize: { px: 16, axis: 'width' } },
        mins: { fontSize: 14 },
        maxes: { fontSize: 16 },
    },
};
