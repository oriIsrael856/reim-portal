/**
 * Chapter 1 desktop — Figma viewport registry (1920×1080 ref).
 * Consumed by useChapter1DesktopStyles.
 */
import { FIGMA_VIEWPORT } from '../utils/viewportClamp';

/** `min(figmaPx, figmaPx/1920*100 vw)` — width cap that scales down but never exceeds Figma */
export function getCh1MinMaxWidthCss(figmaWidthPx) {
    const pct = ((figmaWidthPx / FIGMA_VIEWPORT.width) * 100).toFixed(2);
    return `min(${figmaWidthPx}px, ${pct}vw)`;
}

export const CH1_DESKTOP_STYLE_REGISTRY = {
    /* ── Layout shell — Figma gutters + columns (@ 1920) ── */
    layoutGutter: {
        values: { paddingInlineStart: { px: 200, axis: 'width' }, paddingInlineEnd: { px: 200, axis: 'width' } },
        mins: { paddingInlineStart: 80, paddingInlineEnd: 80 },
    },
    layoutPt: {
        values: { paddingTop: { px: 64, axis: 'height' } },
        mins: { paddingTop: 32 },
    },
    colGap: {
        values: { gap: { px: 32, axis: 'width' } },
        mins: { gap: 16 },
    },
    leftColMaxW: {
        values: { maxWidth: { px: 680, axis: 'width' } },
        mins: { maxWidth: 400 },
        maxes: { maxWidth: 680 },
    },
    rightColMaxW: {
        values: { maxWidth: { px: 520, axis: 'width' } },
        mins: { maxWidth: 300 },
        maxes: { maxWidth: 520 },
    },

    /* ── Title column typography ── */
    heroH1: {
        values: { fontSize: { px: 60, axis: 'width' } },
        mins: { fontSize: 36 },
        maxes: { fontSize: 60 },
    },
    heroOrangeBar: {
        values: { width: { px: 291, axis: 'width' }, height: { px: 17, axis: 'width' } },
        mins: { width: 160, height: 10 },
        maxes: { width: 291, height: 17 },
    },
    heroPillH: {
        values: { height: { px: 42, axis: 'width' } },
        mins: { height: 36 },
        maxes: { height: 42 },
    },
    heroPillGap: {
        values: { gap: { px: 16, axis: 'width' } },
        mins: { gap: 8 },
    },
    heroPillTagFont: {
        values: { fontSize: { px: 20, axis: 'width' } },
        mins: { fontSize: 16 },
        maxes: { fontSize: 20 },
    },
    heroPillMb: {
        values: { marginBottom: { px: 40, axis: 'height' } },
        mins: { marginBottom: 20 },
    },

    /* ── Collage digit ── */
    collageDigitW: {
        values: { width: { px: 140, axis: 'width' } },
        mins: { width: 90 },
        maxes: { width: 140 },
    },

    /* ── Stacked cards ── */
    cardsStackGap: {
        values: { gap: { px: 96, axis: 'height' } },
        mins: { gap: 48 },
    },
    cardsStackPb: {
        values: { paddingBottom: { px: 128, axis: 'height' } },
        mins: { paddingBottom: 64 },
    },
    stickyTop: {
        values: { top: { px: 132, axis: 'height' } },
        mins: { top: 80 },
        maxes: { top: 132 },
    },
    cardPadding: {
        values: {
            paddingInlineStart: { px: 60, axis: 'width' },
            paddingInlineEnd: { px: 80, axis: 'width' },
            paddingTop: { px: 40, axis: 'height' },
            paddingBottom: { px: 40, axis: 'height' },
        },
        mins: { paddingInlineStart: 32, paddingInlineEnd: 40, paddingTop: 24, paddingBottom: 24 },
    },
    cardMinH: {
        values: { minHeight: { px: 600, axis: 'height' } },
        mins: { minHeight: 360 },
    },
    cardGap: {
        values: { gap: { px: 24, axis: 'height' } },
        mins: { gap: 16 },
    },
    cardTitleFont: {
        values: { fontSize: { px: 34, axis: 'width' } },
        mins: { fontSize: 24 },
        maxes: { fontSize: 34 },
    },
    cardSubtitleFont: {
        values: { fontSize: { px: 24, axis: 'width' } },
        mins: { fontSize: 18 },
        maxes: { fontSize: 24 },
    },
    cardBodyFont: {
        values: { fontSize: { px: 16, axis: 'width' } },
        mins: { fontSize: 14 },
        maxes: { fontSize: 16 },
    },
};

export { FIGMA_VIEWPORT };
