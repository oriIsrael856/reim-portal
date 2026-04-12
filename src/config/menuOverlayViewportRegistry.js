/**
 * Side menu overlay styles:
 * - Desktop: Figma 36:1324 / 36:1325 (ref 1920×1080).
 * - Mobile: Figma [191:15815](https://www.figma.com/design/pCQsVHvp5kYNlIvoXTlqqf?node-id=191-15815) — `computeStyleFromFigma` + `FIGMA_VIEWPORT` like Ch4 desktop.
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

/**
 * Mobile overlay — Figma 191:15815 Side menu (375×812 ref).
 * White `window` (191:15825) uses horizontal margin 12 vs viewport; top bar full-bleed with asymmetric padding 16/24.
 */
export const MENU_OVERLAY_MOBILE_STYLE_SPECS = {
    /** Root column: padding below white sheet — Figma `pb-[12px]` */
    overlayRoot: {
        values: {
            paddingBlockEnd: { px: 12, axis: 'height' },
        },
        mins: { paddingBlockEnd: 8 },
    },
    /** White card inset — Figma `window` x=12, width 351 → marginInline 12 */
    windowMargin: {
        values: {
            marginInlineStart: { px: 12, axis: 'width' },
            marginInlineEnd: { px: 12, axis: 'width' },
        },
        mins: { marginInlineStart: 8, marginInlineEnd: 8 },
    },
    /** 191:15825 — inner padding 24 */
    panelPadding: {
        values: {
            paddingInlineStart: { px: 24, axis: 'width' },
            paddingInlineEnd: { px: 24, axis: 'width' },
            paddingBlockStart: { px: 24, axis: 'height' },
            paddingBlockEnd: { px: 24, axis: 'height' },
        },
        mins: {
            paddingInlineStart: 16,
            paddingInlineEnd: 16,
            paddingBlockStart: 16,
            paddingBlockEnd: 16,
        },
    },
    /** 191:15816 Top Sidebar — Frame 9 inset from full width: start 16, end 24 */
    topSidebarPadding: {
        values: {
            paddingInlineStart: { px: 16, axis: 'width' },
            paddingInlineEnd: { px: 24, axis: 'width' },
        },
        mins: { paddingInlineStart: 12, paddingInlineEnd: 16 },
    },
    /** 191:15828 — gap between chapter MenuItems */
    chapterListGap: {
        values: { gap: { px: 32, axis: 'height' } },
        mins: { gap: 20 },
    },
    /** 191:15834 Animated button — pill row */
    newsletterCta: {
        values: {
            minHeight: { px: 48, axis: 'height' },
            paddingInlineStart: { px: 6, axis: 'width' },
            paddingInlineEnd: { px: 24, axis: 'width' },
            paddingBlock: { px: 8, axis: 'height' },
            gap: { px: 12, axis: 'width' },
        },
        mins: { minHeight: 44, paddingBlock: 6, gap: 8 },
    },
    /** 191:15834 icon wrapper — h 36, p 6 */
    newsletterIconBox: {
        values: {
            minHeight: { px: 36, axis: 'height' },
            paddingBlock: { px: 6, axis: 'height' },
            paddingInline: { px: 6, axis: 'width' },
        },
        mins: { minHeight: 32, paddingBlock: 4, paddingInline: 4 },
    },
};
