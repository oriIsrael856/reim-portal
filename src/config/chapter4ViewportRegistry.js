/**
 * Chapter 4 desktop — Figma viewport registry (1920×1080 ref: FIGMA_VIEWPORT).
 * Boxes drive useViewportFit; style maps drive useComponentStyle.
 */
import { calcFigmaPercent, FIGMA_VIEWPORT } from '../utils/viewportClamp';

/** Figma element boxes (px) for slot-based viewport fit — Figma 125:2392, 125:2583 */
export const CH4_VIEWPORT_FIT_BOXES = {
    committeesPurpleCard: { figmaWidth: 1264, figmaHeight: 443 },
    committeesFaq: { figmaWidth: 1136, figmaHeight: 648 },
};

/** Tunable content estimate + slot weights + floors — paired with CH4_VIEWPORT_FIT_BOXES */
export const CH4_VIEWPORT_FIT_PRESETS = {
    committeesPurpleCard: {
        contentPx: 200,
        slots: { paddingTop: 0.38, paddingBottom: 0.30, gap: 0.32 },
        mins: { paddingTop: 14, paddingBottom: 12, gap: 8 },
    },
};

/**
 * Args for useViewportFit / fitToViewport (slot model — purple card only).
 * FAQ rows use per-property height-axis scaling in CH4_COMPONENT_STYLE instead.
 * @param {'committeesPurpleCard'} key
 */
export function getCh4ViewportFitArgs(key) {
    const box = CH4_VIEWPORT_FIT_BOXES[key];
    const preset = CH4_VIEWPORT_FIT_PRESETS[key];
    if (!box || !preset) {
        throw new Error(`[chapter4ViewportRegistry] unknown viewport-fit key: ${key}`);
    }
    return {
        elWidth: box.figmaWidth,
        elHeight: box.figmaHeight,
        ...preset,
    };
}

/**
 * Purple card / FAQ column: cap at Figma width, scale below as % of 1920 ref.
 * @param {'committeesPurpleCard' | 'committeesFaq'} boxKey
 */
export function getCh4BoxMaxWidthCss(boxKey) {
    const box = CH4_VIEWPORT_FIT_BOXES[boxKey];
    if (!box) {
        throw new Error(`[chapter4ViewportRegistry] unknown box key: ${boxKey}`);
    }
    const pct = ((box.figmaWidth / FIGMA_VIEWPORT.width) * 100).toFixed(2);
    return `min(${box.figmaWidth}px, ${pct}vw)`;
}

/** Generic cap: `min(figmaPx, figmaPx/1920*100 vw)` for hero / inner max-widths */
export function getCh4MinMaxWidthCss(figmaWidthPx) {
    const pct = ((figmaWidthPx / FIGMA_VIEWPORT.width) * 100).toFixed(2);
    return `min(${figmaWidthPx}px, ${pct}vw)`;
}

/** % of Figma frame width/height for a registered fit box (for debugging / maxWidth). */
export function getCh4FigmaPercentForBox(key) {
    const box = CH4_VIEWPORT_FIT_BOXES[key];
    if (!box) {
        throw new Error(`[chapter4ViewportRegistry] unknown viewport-fit key: ${key}`);
    }
    return calcFigmaPercent({ elWidth: box.figmaWidth, elHeight: box.figmaHeight });
}

/**
 * useComponentStyle({ values, mins }) entries — Figma px + axis per CLAUDE / Chapter 4 nodes.
 */
export const CH4_COMPONENT_STYLE = {
    /** Figma 125:4050 — files section container: pt-120 pb-120 pr-200 (RTL ps) pl-0 */
    filesSection: {
        values: {
            paddingTop: { px: 120, axis: 'height' },
            paddingBottom: { px: 120, axis: 'height' },
            paddingInlineStart: { px: 200, axis: 'width' },
        },
        mins: { paddingTop: 48, paddingBottom: 48, paddingInlineStart: 80 },
    },
    /** Figma 125:4094 — title row: pl-200 in Figma = paddingInlineEnd in RTL */
    filesTitleRow: {
        values: { paddingInlineEnd: { px: 200, axis: 'width' } },
        mins: { paddingInlineEnd: 80 },
    },
    filesHeadingFont: {
        values: { fontSize: { px: 34, axis: 'width' } },
        mins: { fontSize: 20 },
    },
    filesBodyFont: {
        values: { fontSize: { px: 20, axis: 'width' } },
        mins: { fontSize: 14 },
    },
    nativSection: {
        values: {
            paddingTop: { px: 120, axis: 'height' },
            paddingBottom: { px: 200, axis: 'height' },
            paddingLeft: { px: 200, axis: 'width' },
            paddingRight: { px: 200, axis: 'width' },
        },
        mins: { paddingTop: 40, paddingBottom: 40, paddingLeft: 80, paddingRight: 80 },
    },
    nativInnerGap: {
        values: { gap: { px: 200, axis: 'width' } },
        mins: { gap: 24 },
    },
    /** Figma 120:6881 — orange card: px-50 py-100 w-400 */
    nativCard: {
        values: {
            paddingTop: { px: 100, axis: 'height' },
            paddingBottom: { px: 100, axis: 'height' },
            paddingLeft: { px: 50, axis: 'width' },
            paddingRight: { px: 50, axis: 'width' },
            width: { px: 400, axis: 'width' },
            minWidth: { px: 240, axis: 'width' },
        },
        mins: { paddingTop: 28, paddingBottom: 28, paddingLeft: 16, paddingRight: 16, width: 260, minWidth: 200 },
    },
    /** Figma 120:6885 — heading + content frame gap */
    nativFrameGap: {
        values: { gap: { px: 24, axis: 'height' } },
        mins: { gap: 12 },
    },
    /** Figma 120:6890 — content sub-sections gap */
    nativContentGap: {
        values: { gap: { px: 32, axis: 'height' } },
        mins: { gap: 16 },
    },
    /** Figma 120:7027 — description + principles label gap */
    nativDescGap: {
        values: { gap: { px: 8, axis: 'height' } },
        mins: { gap: 4 },
    },
    /** Figma 120:6978 — principle list items gap */
    nativPrincipleListGap: {
        values: { gap: { px: 12, axis: 'height' } },
        mins: { gap: 6 },
    },
    nativHeadingFont: {
        values: { fontSize: { px: 34, axis: 'width' } },
        mins: { fontSize: 20 },
    },
    nativSubtitleFont: {
        values: { fontSize: { px: 16, axis: 'width' } },
        mins: { fontSize: 12 },
    },
    nativBodyFont: {
        values: { fontSize: { px: 20, axis: 'width' } },
        mins: { fontSize: 14 },
    },
    committeesSection: {
        values: {
            paddingTop: { px: 80, axis: 'height' },
            paddingBottom: { px: 80, axis: 'height' },
            paddingLeft: { px: 200, axis: 'width' },
            paddingRight: { px: 200, axis: 'width' },
            gap: { px: 20, axis: 'height' },
        },
        mins: { paddingTop: 32, paddingBottom: 32, paddingLeft: 80, paddingRight: 80, gap: 12 },
    },
    committeesPurpleCardPaddingX: {
        values: {
            paddingLeft: { px: 80, axis: 'width' },
            paddingRight: { px: 80, axis: 'width' },
        },
        mins: { paddingLeft: 24, paddingRight: 24 },
    },
    /** Figma 125:2399 — step cards row gap */
    committeesStepRowGap: {
        values: { gap: { px: 24, axis: 'width' } },
        mins: { gap: 12 },
    },
    /** Figma 125:2463 — step card: pt-32 pb-24 px-16 gap-8 */
    committeesStepCard: {
        values: {
            paddingTop: { px: 32, axis: 'height' },
            paddingBottom: { px: 24, axis: 'height' },
            paddingLeft: { px: 16, axis: 'width' },
            paddingRight: { px: 16, axis: 'width' },
            gap: { px: 8, axis: 'height' },
        },
        mins: { paddingTop: 18, paddingBottom: 14, paddingLeft: 8, paddingRight: 8, gap: 4 },
    },
    /** Figma 125:2466 — step card title: 20px Rubik SemiBold */
    committeesStepTitleFont: {
        values: { fontSize: { px: 20, axis: 'width' } },
        mins: { fontSize: 13 },
    },
    /** Figma 125:2469 — step card desc: 16px Rubik Regular */
    committeesStepDescFont: {
        values: { fontSize: { px: 16, axis: 'width' } },
        mins: { fontSize: 11 },
    },
    /** Figma 125:2480 — step badge: h-42 px-6 */
    committeesStepBadge: {
        values: {
            height: { px: 42, axis: 'height' },
            paddingLeft: { px: 6, axis: 'width' },
            paddingRight: { px: 6, axis: 'width' },
        },
        mins: { height: 32, paddingLeft: 4, paddingRight: 4 },
    },
    /** Figma I125:2480;106:3068 — badge number circle: size-32 */
    committeesStepBadgeCircle: {
        values: { width: { px: 32, axis: 'width' }, height: { px: 32, axis: 'width' } },
        mins: { width: 24, height: 24 },
    },
    /** Figma badge number font: 16px Salsa */
    committeesStepBadgeFont: {
        values: { fontSize: { px: 16, axis: 'width' } },
        mins: { fontSize: 12 },
    },
    /** FAQ closed row — target height vs 1080p ref */
    faqRowHeight: {
        values: { height: { px: 56, axis: 'height' } },
        mins: { height: 36 },
        maxes: { height: 56 },
    },
    /** Vertical gap between accordion items */
    faqListGap: {
        values: { gap: { px: 8, axis: 'height' } },
        mins: { gap: 4 },
        maxes: { gap: 14 },
    },
    /** FAQ row button — horizontal padding + icon/text gap (width axis) */
    faqRowButton: {
        values: {
            paddingInlineStart: { px: 24, axis: 'width' },
            paddingInlineEnd: { px: 24, axis: 'width' },
            gap: { px: 24, axis: 'width' },
        },
        mins: { paddingInlineStart: 12, paddingInlineEnd: 12, gap: 12 },
    },
    /** Open accordion body padding */
    faqExpandedBody: {
        values: {
            paddingInlineStart: { px: 16, axis: 'width' },
            paddingInlineEnd: { px: 16, axis: 'width' },
            paddingBottom: { px: 16, axis: 'height' },
        },
        mins: { paddingInlineStart: 10, paddingInlineEnd: 10, paddingBottom: 10 },
    },
    /** FAQ block heading stack — pt above title */
    faqHeadingBlock: {
        values: { paddingTop: { px: 24, axis: 'height' } },
        mins: { paddingTop: 12 },
    },
};

/** Remaining desktop sections — merged into CH4_DESKTOP_STYLE_REGISTRY for one resize hook */
export const CH4_DESKTOP_STYLE_EXTRA = {
    heroHeader: {
        values: {
            paddingLeft: { px: 40, axis: 'width' },
            paddingRight: { px: 40, axis: 'width' },
            marginBottom: { px: 48, axis: 'height' },
        },
        mins: { paddingLeft: 24, paddingRight: 24, marginBottom: 20 },
    },
    heroStackGap: {
        values: { gap: { px: 28, axis: 'height' } },
        mins: { gap: 20 },
    },
    heroTitleRowFlex: {
        values: { gap: { px: 48, axis: 'width' } },
        mins: { gap: 16 },
    },
    heroChapterPill: {
        values: {
            height: { px: 42, axis: 'height' },
            paddingLeft: { px: 24, axis: 'width' },
            paddingRight: { px: 24, axis: 'width' },
        },
        mins: { height: 36, paddingLeft: 16, paddingRight: 16 },
    },
    heroChapterTagFont: {
        values: { fontSize: { px: 20, axis: 'width' } },
        mins: { fontSize: 14 },
    },
    heroChapterNumeralFont: {
        values: { fontSize: { px: 16, axis: 'width' } },
        mins: { fontSize: 12 },
    },
    heroChapterBadge: {
        values: { width: { px: 32, axis: 'width' }, height: { px: 32, axis: 'height' } },
        mins: { width: 24, height: 24 },
    },
    heroH1: {
        values: { fontSize: { px: 60, axis: 'width' } },
        mins: { fontSize: 28 },
        maxes: { fontSize: 60 },
    },
    heroOrangeBar: {
        values: {
            height: { px: 17, axis: 'height' },
            width: { px: 371, axis: 'width' },
            top: { px: 43, axis: 'height' },
        },
        mins: { height: 12, width: 200, top: 24 },
    },
    heroLayerIcon: {
        values: { width: { px: 32, axis: 'width' }, height: { px: 32, axis: 'width' } },
        mins: { width: 24, height: 24 },
    },
    featureStripSection: {
        values: {
            paddingLeft: { px: 32, axis: 'width' },
            paddingRight: { px: 32, axis: 'width' },
            marginBottom: { px: 48, axis: 'height' },
        },
        mins: { paddingLeft: 20, paddingRight: 20, marginBottom: 20 },
    },
    featureStripPe: {
        values: { paddingInlineEnd: { px: 160, axis: 'width' } },
        mins: { paddingInlineEnd: 72 },
    },
    featureCardsRowGap: {
        values: { gap: { px: 24, axis: 'width' } },
        mins: { gap: 16 },
    },
    featureCardsRowGapStack: {
        values: { gap: { px: 24, axis: 'height' } },
        mins: { gap: 16 },
    },
    featureChapterNumeral: {
        values: { fontSize: { px: 108, axis: 'width' } },
        mins: { fontSize: 48 },
        maxes: { fontSize: 108 },
    },
    adminFeatureCard: {
        values: {
            width: { px: 320, axis: 'width' },
            height: { px: 280, axis: 'height' },
            paddingTop: { px: 24, axis: 'width' },
            paddingBottom: { px: 24, axis: 'width' },
            paddingLeft: { px: 24, axis: 'width' },
            paddingRight: { px: 24, axis: 'width' },
        },
        mins: {
            width: 200,
            height: 180,
            paddingTop: 16,
            paddingBottom: 16,
            paddingLeft: 16,
            paddingRight: 16,
        },
    },
    adminFeatureInnerGap: {
        values: { gap: { px: 16, axis: 'height' } },
        mins: { gap: 12 },
    },
    adminFeatureTitleFont: {
        values: { fontSize: { px: 24, axis: 'width' } },
        mins: { fontSize: 16 },
        maxes: { fontSize: 24 },
    },
    adminFeatureDescFont: {
        values: { fontSize: { px: 16, axis: 'width' } },
        mins: { fontSize: 12 },
    },
    adminFeatureNumeralFont: {
        values: { fontSize: { px: 40, axis: 'width' } },
        mins: { fontSize: 28 },
    },
    adminFeatureTextStackGap: {
        values: { gap: { px: 4, axis: 'height' } },
        mins: { gap: 4 },
    },
    adminFeatureIcon: {
        values: { width: { px: 32, axis: 'width' }, height: { px: 32, axis: 'width' } },
        mins: { width: 24, height: 24 },
    },
    nativPrincipleRowGap: {
        values: { gap: { px: 12, axis: 'width' } },
        mins: { gap: 8 },
    },
    nativPillTrack: {
        values: { width: { px: 32, axis: 'width' }, height: { px: 24, axis: 'height' } },
        mins: { width: 28, height: 20 },
    },
    /** Figma 120:6972 — CTA badge: size-80 p-12 */
    nativCtaBadge: {
        values: {
            width: { px: 80, axis: 'width' },
            height: { px: 80, axis: 'height' },
            paddingTop: { px: 12, axis: 'width' },
            paddingBottom: { px: 12, axis: 'width' },
            paddingLeft: { px: 12, axis: 'width' },
            paddingRight: { px: 12, axis: 'width' },
        },
        mins: { width: 52, height: 52, paddingTop: 8, paddingBottom: 8, paddingLeft: 8, paddingRight: 8 },
    },
    nativCtaIcon: {
        values: { width: { px: 40, axis: 'width' }, height: { px: 40, axis: 'width' } },
        mins: { width: 28, height: 28 },
    },
    committeesPurpleTitleFont: {
        values: { fontSize: { px: 34, axis: 'width' } },
        mins: { fontSize: 18 },
        maxes: { fontSize: 34 },
    },
    committeesPurpleBodyFont: {
        values: { fontSize: { px: 16, axis: 'width' } },
        mins: { fontSize: 12 },
    },
    faqSectionLeadFont: {
        values: { fontSize: { px: 16, axis: 'width' } },
        mins: { fontSize: 12 },
    },
    faqSectionTitleFont: {
        values: { fontSize: { px: 34, axis: 'width' } },
        mins: { fontSize: 18 },
        maxes: { fontSize: 34 },
    },
    faqRowTitleFont: {
        values: { fontSize: { px: 18, axis: 'width' } },
        mins: { fontSize: 13 },
    },
    faqExpandedContentFont: {
        values: { fontSize: { px: 14, axis: 'width' } },
        mins: { fontSize: 11 },
    },
    /** Figma 125:4050 — files section inner gap between title row and cards: 60px */
    filesZ10StackGap: {
        values: { gap: { px: 60, axis: 'height' } },
        mins: { gap: 24 },
    },
    filesTitleDescGap: {
        values: { gap: { px: 24, axis: 'width' } },
        mins: { gap: 16 },
    },
    filesCarouselStrip: {
        values: { height: { px: 432, axis: 'height' }, gap: { px: 24, axis: 'width' } },
        mins: { height: 280, gap: 12 },
    },
    filesScrollButtonsRowGap: {
        values: { gap: { px: 10, axis: 'width' } },
        mins: { gap: 8 },
    },
    filesScrollButtonPadding: {
        values: { padding: { px: 12, axis: 'width' } },
        mins: { padding: 8 },
    },
    fileCard: {
        values: {
            width: { px: 320, axis: 'width' },
            height: { px: 400, axis: 'height' },
            paddingTop: { px: 8, axis: 'height' },
            paddingBottom: { px: 24, axis: 'height' },
            paddingLeft: { px: 8, axis: 'width' },
            paddingRight: { px: 8, axis: 'width' },
            gap: { px: 16, axis: 'height' },
        },
        mins: {
            width: 260,
            height: 320,
            paddingTop: 6,
            paddingBottom: 16,
            paddingLeft: 6,
            paddingRight: 6,
            gap: 12,
        },
    },
    fileCardTitleFont: {
        values: { fontSize: { px: 20, axis: 'width' } },
        mins: { fontSize: 14 },
    },
    fileCardDescFont: {
        values: { fontSize: { px: 16, axis: 'width' } },
        mins: { fontSize: 12 },
    },
    fileCardTextStackGap: {
        values: { gap: { px: 4, axis: 'height' } },
        mins: { gap: 4 },
    },
    fileCardTextCol: {
        values: { paddingLeft: { px: 16, axis: 'width' }, paddingRight: { px: 16, axis: 'width' } },
        mins: { paddingLeft: 10, paddingRight: 10 },
    },
    fileCardDownloadRow: {
        values: {
            fontSize: { px: 16, axis: 'width' },
            gap: { px: 8, axis: 'width' },
            paddingTop: { px: 8, axis: 'height' },
            paddingBottom: { px: 8, axis: 'height' },
            paddingLeft: { px: 24, axis: 'width' },
            paddingRight: { px: 24, axis: 'width' },
        },
        mins: { fontSize: 13, gap: 6, paddingTop: 6, paddingBottom: 6, paddingLeft: 16, paddingRight: 16 },
    },
};

/** Single object consumed by useChapter4DesktopStyles */
export const CH4_DESKTOP_STYLE_REGISTRY = {
    ...CH4_COMPONENT_STYLE,
    ...CH4_DESKTOP_STYLE_EXTRA,
};

export { FIGMA_VIEWPORT };
