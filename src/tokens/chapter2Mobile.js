/**
 * Design tokens — Chapter 2 Mobile
 * Source: Figma file yFlNPGkCOnVPjFCuc8Kb1T (shell nodes match Copy: C2NkiNoHtXbBcYwBG3u0Ad)
 * Root frame: 194:16426 "Chapter 2" (375×812) — purple rail
 * Main scroll surface: 194:16436 "Main content" (359px, white card, overflow-y)
 *
 * All numeric values are read from Figma node layout / text styles (Feb 2026 export).
 * Section 2 layout (202:3293) is mirrored in `index.css` under `--ch2-section2-*` and `.ch2-mobile-section2*`.
 * Section 3 goals (202:3339) — `index.css` `--ch2-section3-*` and `.ch2-mobile-section3*`.
 * Section 4 groups intro (202:3379) — `index.css` `--ch2-section4-*` and `.ch2-mobile-section4*`.
 * Section 5 group accordions (202:10011) — `index.css` `--ch2-section5-*` and `.ch2-mobile-section5*`.
 */

export const FIGMA_CH2_NODES = {
    pageFrame: '194:16426',
    /** Right Sidebar — toolbar row on purple frame only (not inside Main content) */
    rightSidebar: '194:16427',
    mainContent: '194:16436',
    section1Hero: '194:16437',
    section2Audience: '202:3293',
    /** מטרות תכנית רעים — כרטיסים + אייקון */
    section3Goals: '202:3339',
    /** הקבוצות ברעים — תמונה + רשימת אוכלוסיות */
    section4GroupsIntro: '202:3379',
    /** פירוט קבוצות 01/02 — כותרות + אקורדיון (מובייל) */
    section5GroupAccordions: '202:10011',
    /** Section 6 "למה יחד" — אותו node בקובץ Copy: C2NkiNoHtXbBcYwBG3u0Ad */
    section6WhyTogetherCopy: '202:10011',
    /** Section 6 — כרטיס רשימה (מסגרת חיצונית + שורות פנימיות) — Copy */
    section6WhyListCard: '202:10016',
};

/** @type {const} */
export const CH2_MOBILE_LAYOUT = {
    page: {
        widthPx: 375,
        heightPx: 812,
        padding: { top: 48, right: 0, bottom: 12, left: 0 },
        alignItems: 'center',
        flexDirection: 'column',
    },
    topBar: {
        widthPx: 375,
        padding: { top: 0, right: 24, bottom: 0, left: 16 },
        justifyContent: 'space-between',
        alignItems: 'flex-end',
        gapPx: 10,
    },
    mainContent: {
        widthPx: 359,
        borderRadiusPx: 24,
        overflowY: 'scroll',
        columnGapPx: -24, // Figma negative stack between sections
    },
    /** Section 1 — layout_BHDVF9 / ZCDEKN / 03OB72 / 3U64B4 */
    section1: {
        padding: { top: 120, right: 24, bottom: 0, left: 24 },
        columnGapPx: 8,
        textColumn: { maxWidthPx: 303, gapPx: 16 },
        collageStack: { heightPx: 560, gapPx: 8 },
        chapterLabel: {
            padding: { top: 8, right: 24, bottom: 4, left: 24 },
            innerGapPx: 16,
            borderRadiusPx: 24,
            badgeSizePx: 28,
        },
    },
    /** Main column negative stack — layout_L5PV5Q */
    sectionOverlapPx: -24,
    heroImageStack: {
        heightPx: 560,
        justifyContent: 'space-between',
        alignItems: 'center',
        gapPx: 8,
    },
    /** Section 2 frame 202:3293 — כרטיס כתום יחיד; גילאים בעמודה (לא רשת) */
    section2: {
        padding: { top: 60, right: 24, bottom: 60, left: 24 },
        borderTop: { widthPx: 2, color: '#FFB23B' },
    },
    section2TitleCard: {
        paddingPx: 24,
        titleToLowerGapPx: 12,
        borderRadiusPx: 24,
    },
    section2Lower: {
        bodyToAgeGapPx: 14,
    },
    section2TextBlock: {
        gapPx: 8,
    },
    section2AgeStack: {
        gapPx: 12,
    },
    /** Section 3 — layout_FVZ8T4 / WCKC54 / 8NZX7P */
    section3: {
        padding: { top: 60, right: 24, bottom: 80, left: 24 },
        headerToGoalsGapPx: 40,
        goalsStackGapPx: 32,
        titleLine: { widthPx: 80, heightPx: 8 },
    },
    section3GoalCard: {
        padding: { top: 32, right: 0, bottom: 16, left: 0 },
        borderRadiusPx: 8,
        iconSizePx: 40,
        iconOffsetTopPx: -20,
    },
    /** Section 4 — layout_D48Q1O / RTX1G7 / FRCMUP / SABD2X */
    section4: {
        padding: { top: 60, right: 24, bottom: 60, left: 24 },
        imageToContentGapPx: 40,
        imageHeightPx: 205,
        imageRadiusPx: 24,
        groupInfoGapPx: 24,
        bodyStackGapPx: 16,
        popListGapPx: 12,
        itemRowGapPx: 24,
        itemPadding: { top: 8, right: 12, bottom: 8, left: 8 },
        labelAndIdGapPx: 8,
        iconFrame: { widthPx: 40, heightPx: 32 },
    },
    /** Section 5 — 202:10011 (values mirror tokens in index.css; re-measure in Figma when API available) */
    section5: {
        padding: { top: 60, right: 24, bottom: 60, left: 24 },
        betweenGroupsGapPx: 56,
        headingEyebrowToTitleGapPx: 4,
        titleBlockToSnippetGapPx: 24,
        snippetToAccordionGapPx: 24,
        accordionStackGapPx: 12,
        accordionTriggerPadPx: 16,
        accordionBodyInsetStartPx: 20,
    },
};

/** @type {const} */
export const CH2_MOBILE_COLOR = {
    pageBackground: '#46319B',
    surface: '#FFFFFF',
    textPrimary: '#001D26',
    textAccentPurple: '#6546DE',
    textAccentRed: '#C4213B',
    limeTag: '#BCE079',
    limeTagBorder: '#001D26',
    oliveBadge: '#839C54',
    orangeFill: '#FFB23B',
    section2GradientTop: 'rgba(255, 178, 59, 0.08)',
    glowPurple: 'rgba(101, 70, 222, 0.12)',
    glowOrange: 'rgba(255, 178, 59, 0.08)',
    iconPeopleTint: 'rgba(196, 33, 59, 0.12)',
    mainShadow: '0px 4px 24px rgba(101, 70, 222, 0.04)',
    imageStroke: '#001D26',
    imageStrokeWidth: 1.5,
    chapterLabelShadow: '2px 2px 0px 0px rgba(0, 29, 38, 1)',
};

/** Typography — Figma text styles */
export const CH2_MOBILE_TYPE = {
    body1: {
        fontFamily: "'Rubik', sans-serif",
        fontWeight: 400,
        fontSizePx: 16,
        lineHeight: 1.32,
        letterSpacing: '0.009375em',
    },
    h4: {
        fontFamily: "'Rubik', sans-serif",
        fontWeight: 700,
        fontSizePx: 34,
        lineHeight: 1.1,
        letterSpacing: '0.00735294em',
    },
    h5: {
        fontFamily: "'Rubik', sans-serif",
        fontWeight: 700,
        fontSizePx: 24,
        lineHeight: 1.334,
    },
    subtitle1: {
        fontFamily: "'Rubik', sans-serif",
        fontWeight: 500,
        fontSizePx: 16,
        lineHeight: 1.22,
        letterSpacing: '0.009375em',
    },
    chapterSmall: {
        fontFamily: "var(--font-salsa), cursive",
        fontWeight: 400,
        fontSizePx: 16,
        lineHeight: 1.28,
        letterSpacing: '0.009375em',
    },
    displayChapter: {
        fontFamily: "var(--font-salsa), cursive",
        fontWeight: 400,
        fontSizePx: 80,
        lineHeight: 1.28,
        letterSpacing: '0.001045em',
    },
};
