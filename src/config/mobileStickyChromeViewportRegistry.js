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
            width: { px: W(84), axis: 'width' },
            height: { px: H(48), axis: 'height' },
            borderRadius: { px: W(8), axis: 'width' },
        },
        mins: { width: 56, height: 32, borderRadius: 4 },
        maxes: { width: 110, height: 64, borderRadius: 14 },
    },
    unionLayer: {
        values: {
            height: { px: H(48), axis: 'height' },
            bottom: { px: H(18), axis: 'height' },
        },
        mins: { height: 32, bottom: 10 },
        maxes: { height: 64, bottom: 26 },
    },
    glyphTray: {
        values: {
            marginBottom: { px: H(36), axis: 'height' },
            paddingBlock: { px: 0, axis: 'height' },
            paddingInline: { px: 0, axis: 'width' },
        },
        mins: { marginBottom: 20, paddingBlock: 0, paddingInline: 0 },
        maxes: { marginBottom: 52, paddingBlock: 0, paddingInline: 0 },
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

/**
 * מידות תמונה Union — ה־SVG מוגדר אינטרינזית 48×84 (גבוה מרוחב) ומסובב ב־CSS ב־-90deg
 * כך שהוא מוצג בפועל 84×48. שני המימדים נמדדים על ציר ה־width של הרולר כי כרום המובייל
 * מעוגן לרוחב המסך.
 */
export const MOBILE_STICKY_CHROME_UNION_SYN = {
    width: W(48),
    height: W(84),
};

/** Hamburger glyph — Figma 191:9792, intrinsic 18×12 (aspect 3:2). */
export const MOBILE_STICKY_CHROME_GLYPH_SYN = {
    size: W(20),
    aspect: 12 / 18,
};
