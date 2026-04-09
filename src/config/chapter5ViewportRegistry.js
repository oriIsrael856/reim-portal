/**
 * Chapter 5 desktop — Figma-ratio styles vs FIGMA_VIEWPORT (1920×1080).
 * Consumed by useChapter5DesktopStyles; same math as Chapter 4 / viewportClamp.
 */
import { FIGMA_VIEWPORT } from '../utils/viewportClamp';

/** `min(figmaPx, figmaPx/1920*100vw)` — caps + scales with ref frame */
export function getCh5MinMaxWidthCss(figmaWidthPx) {
    const pct = ((figmaWidthPx / FIGMA_VIEWPORT.width) * 100).toFixed(2);
    return `min(${figmaWidthPx}px, ${pct}vw)`;
}

/**
 * Registry entries: { values, mins?, maxes? } → computeStyleFromFigma in hook.
 * Figma refs from Chapter5 desktop comments (125:4283, 125:4865, 125:5338, …).
 */
export const CH5_DESKTOP_STYLE_REGISTRY = {
    heroHeader: {
        values: {
            paddingTop: { px: 48, axis: 'height' },
            paddingBottom: { px: 80, axis: 'height' },
            paddingLeft: { px: 200, axis: 'width' },
            paddingRight: { px: 200, axis: 'width' },
            gap: { px: 60, axis: 'height' },
        },
        mins: { paddingTop: 24, paddingBottom: 40, paddingLeft: 24, paddingRight: 24, gap: 32 },
    },
    heroTitleStackGap: {
        values: { gap: { px: 40, axis: 'height' } },
        mins: { gap: 24 },
    },
    heroChapterPill: {
        values: {
            height: { px: 42, axis: 'height' },
            paddingLeft: { px: 24, axis: 'width' },
            paddingRight: { px: 24, axis: 'width' },
        },
        mins: { height: 36, paddingLeft: 16, paddingRight: 16 },
    },
    heroChapterBadge: {
        values: { width: { px: 32, axis: 'width' }, height: { px: 32, axis: 'height' } },
        mins: { width: 24, height: 24 },
    },
    heroChapterNumeralFont: {
        values: { fontSize: { px: 16, axis: 'width' } },
        mins: { fontSize: 12 },
    },
    heroChapterTagFont: {
        values: { fontSize: { px: 20, axis: 'width' } },
        mins: { fontSize: 14 },
    },
    heroOrangeBar: {
        values: {
            height: { px: 17, axis: 'height' },
            width: { px: 350, axis: 'width' },
            top: { px: 43, axis: 'height' },
        },
        mins: { height: 12, width: 200, top: 28 },
    },
    heroH1: {
        values: { fontSize: { px: 60, axis: 'width' } },
        mins: { fontSize: 28 },
        maxes: { fontSize: 60 },
    },
    heroCollageHeight: {
        values: { height: { px: 400, axis: 'height' } },
        mins: { height: 260 },
    },
    heroMainPhoto: {
        values: { height: { px: 400, axis: 'height' }, width: { px: 800, axis: 'width' } },
        mins: { height: 240, width: 280 },
        maxes: { width: 800, height: 400 },
    },
    heroSidePhotoSm: {
        values: { width: { px: 186, axis: 'width' }, height: { px: 186, axis: 'width' } },
        mins: { width: 120, height: 120 },
    },
    heroSidePhotoLg: {
        values: { width: { px: 240, axis: 'width' }, height: { px: 240, axis: 'width' } },
        mins: { width: 160, height: 160 },
    },
    heroCollageDigit: {
        values: { fontSize: { px: 120, axis: 'width' } },
        mins: { fontSize: 56 },
        maxes: { fontSize: 120 },
    },
    heroCollageDigitTop: {
        values: { top: { px: 319, axis: 'height' } },
        mins: { top: 180 },
    },
    marketingSection: {
        values: {
            paddingTop: { px: 120, axis: 'height' },
            paddingBottom: { px: 120, axis: 'height' },
            paddingLeft: { px: 200, axis: 'width' },
            paddingRight: { px: 200, axis: 'width' },
            gap: { px: 80, axis: 'width' },
        },
        mins: { paddingTop: 48, paddingBottom: 48, paddingLeft: 24, paddingRight: 24, gap: 32 },
    },
    marketingCol: {
        values: { width: { px: 500, axis: 'width' }, gap: { px: 24, axis: 'height' }, paddingTop: { px: 40, axis: 'height' } },
        mins: { width: 280, gap: 16, paddingTop: 24 },
    },
    marketingHighlight: {
        values: { width: { px: 167, axis: 'width' }, height: { px: 13, axis: 'height' }, top: { px: 29, axis: 'height' } },
        mins: { width: 120, height: 10, top: 20 },
    },
    marketingTitleFont: {
        values: { fontSize: { px: 34, axis: 'width' } },
        mins: { fontSize: 20 },
        maxes: { fontSize: 34 },
    },
    marketingBodyFont: {
        values: { fontSize: { px: 20, axis: 'width' } },
        mins: { fontSize: 14 },
    },
    marketingStepsCol: {
        values: { gap: { px: 16, axis: 'height' } },
        mins: { gap: 12 },
    },
    marketingStepsTitleFont: {
        values: { fontSize: { px: 24, axis: 'width' } },
        mins: { fontSize: 18 },
    },
    networkingSection: {
        values: {
            marginBottom: { px: 192, axis: 'height' },
            paddingLeft: { px: 24, axis: 'width' },
            paddingRight: { px: 24, axis: 'width' },
        },
        mins: { marginBottom: 80, paddingLeft: 16, paddingRight: 16 },
    },
    networkingTitleFont: {
        values: { fontSize: { px: 36, axis: 'width' } },
        mins: { fontSize: 22 },
        maxes: { fontSize: 36 },
    },
    networkingTitleMargin: {
        values: { marginBottom: { px: 48, axis: 'height' } },
        mins: { marginBottom: 32 },
    },
    networkingGridGap: {
        values: { gap: { px: 32, axis: 'width' } },
        mins: { gap: 20 },
    },
    /** "למי כדאי לפנות" — Figma-aligned with Ch5 mobile cards (#001D26, lime) */
    networkingAudienceCard: {
        values: {
            paddingTop: { px: 40, axis: 'height' },
            paddingBottom: { px: 24, axis: 'height' },
            paddingLeft: { px: 24, axis: 'width' },
            paddingRight: { px: 24, axis: 'width' },
            gap: { px: 8, axis: 'height' },
        },
        mins: { paddingTop: 28, paddingBottom: 16, paddingLeft: 16, paddingRight: 16, gap: 6 },
    },
    networkingAudienceBadge: {
        values: {
            width: { px: 40, axis: 'width' },
            height: { px: 40, axis: 'width' },
        },
        mins: { width: 32, height: 32 },
        maxes: { width: 40, height: 40 },
    },
    networkingAudienceTitleFont: {
        values: { fontSize: { px: 16, axis: 'width' } },
        mins: { fontSize: 14 },
        maxes: { fontSize: 18 },
    },
    networkingAudienceBodyFont: {
        values: { fontSize: { px: 16, axis: 'width' } },
        mins: { fontSize: 13 },
        maxes: { fontSize: 16 },
    },
    /** Newsletter embedded in resources row — bypasses global :root --home-newsletter-* on md+ */
    resourcesNewsletterPadding: {
        values: { padding: { px: 16, axis: 'width' } },
        mins: { padding: 12 },
    },
    resourcesNewsletterStackGap: {
        values: { gap: { px: 14, axis: 'height' } },
        mins: { gap: 10 },
    },
    resourcesNewsletterTitleFont: {
        values: { fontSize: { px: 34, axis: 'width' } },
        mins: { fontSize: 20 },
        maxes: { fontSize: 34 },
    },
    resourcesNewsletterBodyFont: {
        values: { fontSize: { px: 16, axis: 'width' } },
        mins: { fontSize: 13 },
        maxes: { fontSize: 18 },
    },
    resourcesNewsletterInputMinH: {
        values: { minHeight: { px: 52, axis: 'height' } },
        mins: { minHeight: 46 },
    },
    resourcesSection: {
        values: {
            marginBottom: { px: 96, axis: 'height' },
            paddingTop: { px: 160, axis: 'height' },
            paddingBottom: { px: 160, axis: 'height' },
            paddingLeft: { px: 200, axis: 'width' },
            paddingRight: { px: 200, axis: 'width' },
        },
        mins: { marginBottom: 48, paddingTop: 60, paddingBottom: 60, paddingLeft: 24, paddingRight: 24 },
    },
    resourcesRowGap: {
        values: { gap: { px: 24, axis: 'width' } },
        mins: { gap: 16 },
    },
    /**
     * Figma 125:5338 — one row height for library | newsletter | side image.
     * Newsletter col is 400px wide → height must exceed width (portrait tile): 520/400 ≈ 1.3 (~4:3 height vs width).
     */
    resourcesLibraryCard: {
        values: { width: { px: 700, axis: 'width' }, height: { px: 520, axis: 'height' }, padding: { px: 16, axis: 'width' } },
        mins: { width: 320, height: 360, padding: 12 },
        maxes: { width: 700, height: 520 },
    },
    resourcesLibraryPanel: {
        values: {
            width: { px: 260, axis: 'width' },
            paddingTop: { px: 24, axis: 'height' },
            paddingBottom: { px: 36, axis: 'height' },
            paddingLeft: { px: 40, axis: 'width' },
            paddingRight: { px: 40, axis: 'width' },
            gap: { px: 14, axis: 'height' },
        },
        mins: { width: 200, paddingTop: 16, paddingBottom: 28, paddingLeft: 20, paddingRight: 20, gap: 12 },
    },
    resourcesLibraryTitleFont: {
        values: { fontSize: { px: 34, axis: 'width' } },
        mins: { fontSize: 22 },
        maxes: { fontSize: 34 },
    },
    resourcesLibraryBodyFont: {
        values: { fontSize: { px: 20, axis: 'width' } },
        mins: { fontSize: 14 },
    },
    resourcesLibraryBtn: {
        values: { paddingTop: { px: 8, axis: 'height' }, paddingBottom: { px: 8, axis: 'height' }, gap: { px: 12, axis: 'width' } },
        mins: { paddingTop: 6, paddingBottom: 6, gap: 8 },
    },
    resourcesNewsletterCol: {
        values: { width: { px: 400, axis: 'width' } },
        mins: { width: 280 },
        maxes: { width: 400 },
    },
    footerSection: {
        values: { marginTop: { px: 80, axis: 'height' }, marginBottom: { px: 80, axis: 'height' }, paddingLeft: { px: 16, axis: 'width' }, paddingRight: { px: 16, axis: 'width' } },
        mins: { marginTop: 48, marginBottom: 48, paddingLeft: 12, paddingRight: 12 },
    },
    /** Accordion (Chapter 5 marketing steps) */
    ch5AccordionListGap: {
        values: { gap: { px: 16, axis: 'height' } },
        mins: { gap: 10 },
    },
    ch5AccordionBtnMinHeight: {
        values: { minHeight: { px: 80, axis: 'height' } },
        mins: { minHeight: 56 },
    },
    ch5AccordionBtnPadInactive: {
        values: { paddingInlineStart: { px: 24, axis: 'width' }, paddingInlineEnd: { px: 24, axis: 'width' }, gap: { px: 24, axis: 'width' } },
        mins: { paddingInlineStart: 14, paddingInlineEnd: 14, gap: 14 },
    },
    ch5AccordionBtnPadActive: {
        values: { paddingInlineStart: { px: 40, axis: 'width' }, paddingInlineEnd: { px: 40, axis: 'width' }, gap: { px: 24, axis: 'width' } },
        mins: { paddingInlineStart: 20, paddingInlineEnd: 20, gap: 14 },
    },
    ch5AccordionTitleFont: {
        values: { fontSize: { px: 24, axis: 'width' } },
        mins: { fontSize: 16 },
    },
    ch5AccordionContentFont: {
        values: { fontSize: { px: 20, axis: 'width' } },
        mins: { fontSize: 14 },
    },
    ch5AccordionContentPad: {
        values: { paddingBottom: { px: 40, axis: 'height' }, paddingInlineStart: { px: 40, axis: 'width' }, paddingInlineEnd: { px: 40, axis: 'width' } },
        mins: { paddingBottom: 24, paddingInlineStart: 24, paddingInlineEnd: 24 },
    },
};

export { FIGMA_VIEWPORT };
