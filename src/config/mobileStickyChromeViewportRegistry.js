/**
 * כרום מובייל כשהתפריט סגור — Figma 191:9787, בערך חצי מהמידות הקודמות.
 * מספרים על “רולר” 375×812 ואז מומרים ל־1920×1080 כדי ש־`computeStyleFromFigma` יתנהג כמו בשאר הפורטל.
 */
import { FIGMA_VIEWPORT } from '../utils/viewportClamp';

export const FIGMA_MOBILE_CHROME_W = 375;
export const FIGMA_MOBILE_CHROME_H = 812;

export function mobileChromeWidthToFigmaRuler(pxOn375) {
    return Math.round((pxOn375 * FIGMA_VIEWPORT.width) / FIGMA_MOBILE_CHROME_W);
}

export function mobileChromeHeightToFigmaRuler(pxOn812) {
    return Math.round((pxOn812 * FIGMA_VIEWPORT.height) / FIGMA_MOBILE_CHROME_H);
}

const W = mobileChromeWidthToFigmaRuler;
const H = mobileChromeHeightToFigmaRuler;

/** מפרטים ל־computeStyleFromFigma — הערכים ב־px הם על רולר 1920/1080 (אחרי המרה מ־375/812) */
export const MOBILE_STICKY_CHROME_SPECS = {
    purpleInner: {
        values: {
            gap: { px: H(4), axis: 'height' },
            paddingInlineStart: { px: W(8), axis: 'width' },
            paddingInlineEnd: { px: W(12), axis: 'width' },
        },
        mins: { gap: 4, paddingInlineStart: 6, paddingInlineEnd: 8 },
    },
    chromeTopRow: {
        values: {
            gap: { px: H(4), axis: 'height' },
        },
        mins: { gap: 4 },
    },
    menuRow: {
        values: {
            minHeight: { px: H(24), axis: 'height' },
        },
        mins: { minHeight: 22 },
        maxes: { minHeight: 48 },
    },
    menuFrame: {
        values: {
            width: { px: W(42), axis: 'width' },
            height: { px: H(24), axis: 'height' },
            borderRadius: { px: W(6), axis: 'width' },
        },
        mins: { width: 36, height: 20, borderRadius: 4 },
        maxes: { width: 84, height: 48, borderRadius: 12 },
    },
    unionLayer: {
        values: {
            height: { px: H(24), axis: 'height' },
        },
        mins: { height: 20 },
        maxes: { height: 48 },
    },
    glyphTray: {
        values: {
            marginBottom: { px: H(4), axis: 'height' },
            paddingBlock: { px: H(2), axis: 'height' },
            paddingInline: { px: W(2), axis: 'width' },
        },
        mins: { marginBottom: 2, paddingBlock: 2, paddingInline: 2 },
    },
    title: {
        values: {
            fontSize: { px: W(13), axis: 'width' },
        },
        mins: { fontSize: 11 },
        maxes: { fontSize: 16 },
    },
    logoutBtn: {
        values: {
            width: { px: W(22), axis: 'width' },
            height: { px: H(22), axis: 'height' },
            borderRadius: { px: W(6), axis: 'width' },
        },
        mins: { width: 28, height: 28, borderRadius: 4 },
        maxes: { width: 44, height: 44, borderRadius: 12 },
    },
};

/** מידות תמונה Union (48×84 → 24×42) — סינתטי לרולר, מימדים בפיקסלים נספרים ב־hook */
export const MOBILE_STICKY_CHROME_UNION_SYN = {
    width: W(24),
    height: H(42),
};

export const MOBILE_STICKY_CHROME_GLYPH_SYN = {
    size: W(12),
};
