/**
 * Chapter 2 desktop — Figma viewport registry (1920×1080 ref).
 * Original Figma frame was 1824px wide; values scaled to 1920 ref for consistency with Ch4/Ch5.
 * Consumed by useChapter2DesktopStyles.
 */
import { FIGMA_VIEWPORT } from '../utils/viewportClamp';

export function getCh2MinMaxWidthCss(figmaWidthPx) {
    const pct = ((figmaWidthPx / FIGMA_VIEWPORT.width) * 100).toFixed(2);
    return `min(${figmaWidthPx}px, ${pct}vw)`;
}

export const CH2_DESKTOP_STYLE_REGISTRY = {
    /* ── Repeating section gutter — Figma 200px @ 1824 ≈ 211px @ 1920 ── */
    sectionGutter: {
        values: {
            paddingInlineStart: { px: 211, axis: 'width' },
            paddingInlineEnd: { px: 211, axis: 'width' },
        },
        mins: { paddingInlineStart: 16, paddingInlineEnd: 16 },
        maxes: { paddingInlineStart: 211, paddingInlineEnd: 211 },
    },

    /* ── Section 3: Goals — Figma 114:2503 ── */
    goalsSectionPad: {
        values: {
            paddingTop: { px: 80, axis: 'height' },
            paddingBottom: { px: 200, axis: 'height' },
        },
        mins: { paddingTop: 40, paddingBottom: 80 },
    },
    goalsTitleMb: {
        values: { marginBottom: { px: 52, axis: 'height' } },
        mins: { marginBottom: 24 },
    },
    goalsRowGap: {
        values: { gap: { px: 40, axis: 'height' } },
        mins: { gap: 24 },
    },
    goalsCardGap: {
        values: { gap: { px: 24, axis: 'width' } },
        mins: { gap: 12 },
    },
    goalsCardPad: {
        values: { paddingTop: { px: 40, axis: 'height' }, paddingBottom: { px: 16, axis: 'height' } },
        mins: { paddingTop: 24, paddingBottom: 12 },
    },
    goalsCardFont: {
        values: { fontSize: { px: 20, axis: 'width' } },
        mins: { fontSize: 16 },
        maxes: { fontSize: 20 },
    },

    /* ── Section 4: Groups intro — Figma 115:2641 ── */
    groupsIntroPad: {
        values: {
            paddingTop: { px: 120, axis: 'height' },
            paddingBottom: { px: 120, axis: 'height' },
        },
        mins: { paddingTop: 48, paddingBottom: 48 },
    },
    groupsIntroGap: {
        values: { gap: { px: 80, axis: 'width' } },
        mins: { gap: 32 },
    },
    groupsIntroTextGap: {
        values: { gap: { px: 52, axis: 'height' } },
        mins: { gap: 24 },
    },
    /* Image wrapper (includes rotation offset) — Figma 115:2712 */
    groupsIntroImgW: {
        values: { width: { px: 654, axis: 'width' } },
        mins: { width: 280 },
        maxes: { width: 654 },
    },
    groupsIntroImgH: {
        values: { height: { px: 400, axis: 'height' } },
        mins: { height: 180 },
        maxes: { height: 400 },
    },
    /* Heading typography — Figma 115:2681 */
    groupsIntroSubFont: {
        values: { fontSize: { px: 16, axis: 'width' } },
        mins: { fontSize: 13 },
        maxes: { fontSize: 16 },
    },
    groupsIntroTitleFont: {
        values: { fontSize: { px: 34, axis: 'width' } },
        mins: { fontSize: 22 },
        maxes: { fontSize: 34 },
    },
    /* Body typography — Figma 115:2685 */
    groupsIntroBodyFont: {
        values: { fontSize: { px: 20, axis: 'width' } },
        mins: { fontSize: 15 },
        maxes: { fontSize: 20 },
    },
    groupsIntroBodyGap: {
        values: { gap: { px: 24, axis: 'height' } },
        mins: { gap: 12 },
    },
    /* Population list — Figma 115:2743 */
    groupsIntroPopListGap: {
        values: { gap: { px: 12, axis: 'height' } },
        mins: { gap: 6 },
    },
    groupsIntroPopBtnGap: {
        values: { gap: { px: 24, axis: 'width' } },
        mins: { gap: 12 },
    },
    groupsIntroPopBtnPad: {
        values: {
            paddingInlineStart: { px: 12, axis: 'width' },
            paddingInlineEnd: { px: 8, axis: 'width' },
            paddingTop: { px: 8, axis: 'height' },
            paddingBottom: { px: 8, axis: 'height' },
        },
        mins: { paddingInlineStart: 8, paddingInlineEnd: 6, paddingTop: 4, paddingBottom: 4 },
    },
    groupsIntroPopBadge: {
        values: { height: { px: 32, axis: 'height' }, width: { px: 40, axis: 'width' } },
        mins: { height: 24, width: 28 },
        maxes: { height: 32, width: 40 },
    },
    groupsIntroPopBadgeFont: {
        values: { fontSize: { px: 16, axis: 'width' } },
        mins: { fontSize: 12 },
        maxes: { fontSize: 16 },
    },
    groupsIntroPopTextFont: {
        values: { fontSize: { px: 20, axis: 'width' } },
        mins: { fontSize: 15 },
        maxes: { fontSize: 20 },
    },

    /* ── Section 5: Group details — Figma 202:10011 ── */
    groupDetailsPad: {
        values: {
            paddingTop: { px: 60, axis: 'height' },
            paddingBottom: { px: 60, axis: 'height' },
        },
        mins: { paddingTop: 32, paddingBottom: 32 },
    },
    groupDetailsTitleMb: {
        values: { marginBottom: { px: 24, axis: 'height' } },
        mins: { marginBottom: 16 },
    },
    groupDetailsSubFont: {
        values: { fontSize: { px: 16, axis: 'width' } },
        mins: { fontSize: 13 },
        maxes: { fontSize: 16 },
    },
    groupDetailsTitleFont: {
        values: { fontSize: { px: 34, axis: 'width' } },
        mins: { fontSize: 22 },
        maxes: { fontSize: 34 },
    },
    /* Accordion row sizing */
    groupDetailsAccRowH: {
        values: { height: { px: 80, axis: 'height' } },
        mins: { height: 52 },
        maxes: { height: 80 },
    },
    groupDetailsAccTitleFont: {
        values: { fontSize: { px: 24, axis: 'width' } },
        mins: { fontSize: 17 },
        maxes: { fontSize: 24 },
    },
    groupDetailsAccPanelPe: {
        values: { paddingInlineEnd: { px: 200, axis: 'width' } },
        mins: { paddingInlineEnd: 40 },
        maxes: { paddingInlineEnd: 200 },
    },
    groupDetailsAccPanelPb: {
        values: { paddingBottom: { px: 40, axis: 'height' } },
        mins: { paddingBottom: 20 },
        maxes: { paddingBottom: 40 },
    },

    /* ── Section 6: Why Together — Figma 120:2475 ── */
    whySectionPt: {
        values: { paddingTop: { px: 80, axis: 'height' } },
        mins: { paddingTop: 40 },
    },
    whyStickyH: {
        values: { height: { px: 800, axis: 'height' } },
        mins: { height: 500 },
    },
    whyStickyPe: {
        values: { paddingInlineEnd: { px: 80, axis: 'width' } },
        mins: { paddingInlineEnd: 32 },
    },
    whyCardColW: {
        values: { width: { px: 852, axis: 'width' } },
        mins: { width: 480 },
        maxes: { width: 852 },
    },
    whyCardInnerH: {
        values: { height: { px: 500, axis: 'height' } },
        mins: { height: 320 },
    },
    whyCardPad: {
        values: {
            paddingInlineStart: { px: 80, axis: 'width' },
            paddingInlineEnd: { px: 80, axis: 'width' },
            paddingTop: { px: 40, axis: 'height' },
            paddingBottom: { px: 40, axis: 'height' },
            gap: { px: 24, axis: 'height' },
        },
        mins: { paddingInlineStart: 32, paddingInlineEnd: 32, paddingTop: 20, paddingBottom: 20, gap: 12 },
    },

    /* ── Typography ── */
    sectionTitleFont: {
        values: { fontSize: { px: 34, axis: 'width' } },
        mins: { fontSize: 24 },
        maxes: { fontSize: 34 },
    },
    bodyFont: {
        values: { fontSize: { px: 20, axis: 'width' } },
        mins: { fontSize: 16 },
        maxes: { fontSize: 20 },
    },
};

export { FIGMA_VIEWPORT };
