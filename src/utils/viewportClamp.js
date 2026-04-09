/**
 * viewportClamp.js — 3-function pipeline + per-property helpers
 * ─────────────────────────────────────────────────────────────────────
 *
 * PIPELINE
 *  fn1  calcFigmaPercent    → % of Figma viewport for the whole element
 *  fn2  getCurrentViewport  → real CSS viewport right now
 *  fn3  computeClamps       → clamp() strings for padding/gap slots
 *
 * PER-PROPERTY
 *  computeSingleClamp       → one Figma px value → one clamp() string
 *  computeStyleFromFigma    → map of CSS props with Figma values → style object
 *
 * FIGMA REFERENCE: 1920 × 1080 px
 *  axis:'width'  — horizontal values (paddingLeft/Right, gap in flex-row, width)
 *                  targetPx = figmaPx / 1920 × currentViewportWidth
 *  axis:'height' — vertical values   (paddingTop/Bottom, gap in flex-col, height)
 *                  targetPx = figmaPx / 1080 × currentViewportHeight
 *                  vw coeff  = targetPx / currentViewportWidth × 100
 * ─────────────────────────────────────────────────────────────────────
 */

export const FIGMA_VIEWPORT = { width: 1920, height: 1080 };

// ─── fn1 ─────────────────────────────────────────────────────────────
/**
 * calcFigmaPercent
 * What % of the Figma viewport does this element occupy?
 *
 * @param {{ elWidth, elHeight, figmaW?, figmaH? }} opts
 * @returns {{ widthPercent, heightPercent }}
 *
 * @example
 * calcFigmaPercent({ elWidth: 1264, elHeight: 443 })
 * // → { widthPercent: 65.83, heightPercent: 41.02 }
 */
export function calcFigmaPercent({
    elWidth,
    elHeight,
    figmaW = FIGMA_VIEWPORT.width,
    figmaH = FIGMA_VIEWPORT.height,
}) {
    return {
        widthPercent:  parseFloat(((elWidth  / figmaW) * 100).toFixed(2)),
        heightPercent: parseFloat(((elHeight / figmaH) * 100).toFixed(2)),
    };
}

// ─── fn2 ─────────────────────────────────────────────────────────────
/**
 * getCurrentViewport
 * Real CSS viewport (physical px ÷ devicePixelRatio × zoom).
 * 1920×1080 at 125% → 1536×864 CSS px.
 *
 * @returns {{ width, height }}
 */
export function getCurrentViewport() {
    return { width: window.innerWidth, height: window.innerHeight };
}

/** @returns {number} CSS viewport width (same as getCurrentViewport().width) */
export function getViewportWidth() {
    return getCurrentViewport().width;
}

/** @returns {number} CSS viewport height (same as getCurrentViewport().height) */
export function getViewportHeight() {
    return getCurrentViewport().height;
}

/**
 * Ratio-preserving Figma px → current viewport px on one axis.
 * Same formula as the middle term inside computeSingleClamp (before vw coefficient).
 *
 * @param {{ figmaPx: number, axis?: 'width'|'height', viewport: { width: number, height: number } }} opts
 * @returns {number} rounded CSS px
 */
export function scaleFigmaPxToViewport({ figmaPx, axis = 'width', viewport }) {
    const figmaAxis   = axis === 'height' ? FIGMA_VIEWPORT.height : FIGMA_VIEWPORT.width;
    const currentAxis = axis === 'height' ? viewport.height : viewport.width;
    return Math.round((figmaPx / figmaAxis) * currentAxis);
}

// ─── fn3 ─────────────────────────────────────────────────────────────
/**
 * computeClamps
 * Given the element's % (fn1) + real viewport (fn2), distribute the
 * tunable space (targetHeight − contentPx) across slots and return
 * a CSS clamp() string for each.
 *
 * @param {{ heightPercent, widthPercent?, contentPx, viewport, slots, mins?, maxMultiplier? }} opts
 * @returns {object}  style-ready clamp strings + maxWidth + _debug
 *
 * @example
 * const pct    = calcFigmaPercent({ elWidth: 1264, elHeight: 443 });
 * const vp     = getCurrentViewport();
 * const clamps = computeClamps({
 *   ...pct, contentPx: 200, viewport: vp,
 *   slots: { paddingTop: 0.38, paddingBottom: 0.30, gap: 0.32 },
 *   mins:  { paddingTop: 14, paddingBottom: 12, gap: 8 },
 * });
 */
export function computeClamps({
    heightPercent,
    widthPercent,
    contentPx,
    viewport,
    slots,
    mins          = {},
    maxMultiplier = 1.6,
}) {
    const { width: vw, height: vh } = viewport;
    const targetH   = Math.round(vh * heightPercent / 100);
    const available = Math.max(0, targetH - contentPx);

    const result = {};
    const _debug = {
        viewport:     `${vw}×${vh}`,
        targetHeight: `${targetH}px (${heightPercent}% of ${vh}px)`,
        available:    `${available}px`,
    };

    for (const [prop, weight] of Object.entries(slots)) {
        const slotPx  = Math.round(available * weight);
        const vwCoeff = ((slotPx / vw) * 100).toFixed(2);
        const lo      = mins[prop] ?? 8;
        const hi      = Math.round(slotPx * maxMultiplier);
        result[prop]  = `clamp(${lo}px, ${vwCoeff}vw, ${hi}px)`;
        _debug[prop]  = `${slotPx}px → ${vwCoeff}vw`;
    }

    if (widthPercent != null) result.maxWidth = `${widthPercent}vw`;
    result._debug = _debug;
    return result;
}

// ─── Per-property helpers ─────────────────────────────────────────────

/**
 * computeSingleClamp
 * One Figma px value → one CSS clamp() string.
 *
 * axis:'width'  → targetPx = figmaPx/1920 × vw  → vwCoeff = targetPx/vw
 * axis:'height' → targetPx = figmaPx/1080 × vh  → vwCoeff = targetPx/vw
 *
 * @param {{ figmaPx, axis?, viewport, min?, max? }} opts
 * @returns {string}  e.g. "clamp(40px, 5.27vw, 120px)"
 *
 * @example
 * computeSingleClamp({ figmaPx: 120, axis: 'height', viewport: getCurrentViewport() })
 * // at 1536×730 → targetPx=81 → 5.27vw → "clamp(40px, 5.27vw, 120px)"
 *
 * computeSingleClamp({ figmaPx: 200, axis: 'width', viewport: getCurrentViewport() })
 * // at 1536 → targetPx=160 → 10.42vw → "clamp(80px, 10.42vw, 200px)"
 */
export function computeSingleClamp({ figmaPx, axis = 'width', viewport, min, max }) {
    const { width: vw } = viewport;
    const targetPx = scaleFigmaPxToViewport({ figmaPx, axis, viewport });
    const vwCoeff  = ((targetPx / vw) * 100).toFixed(2);
    const lo          = min ?? Math.round(figmaPx * 0.35);
    const hi          = max ?? Math.round(figmaPx * 1.1);
    return `clamp(${lo}px, ${vwCoeff}vw, ${hi}px)`;
}

/**
 * computeStyleFromFigma
 * Map of CSS props with Figma values → full style object of clamp() strings.
 *
 * @param {{ values, viewport, mins?, maxes? }} opts
 * values shape: { cssProperty: { px: number, axis: 'width'|'height' } }
 * @returns {object}  style-ready object
 *
 * @example
 * computeStyleFromFigma({
 *   values: {
 *     paddingTop:    { px: 120, axis: 'height' },
 *     paddingBottom: { px: 200, axis: 'height' },
 *     paddingLeft:   { px: 200, axis: 'width'  },
 *     paddingRight:  { px: 200, axis: 'width'  },
 *     gap:           { px: 200, axis: 'width'  },
 *     fontSize:      { px: 34,  axis: 'width'  },
 *   },
 *   viewport: getCurrentViewport(),
 * })
 */
export function computeStyleFromFigma({ values, viewport, mins = {}, maxes = {} }) {
    const result = {};
    for (const [prop, { px, axis }] of Object.entries(values)) {
        result[prop] = computeSingleClamp({
            figmaPx: px, axis, viewport,
            min: mins[prop],
            max: maxes[prop],
        });
    }
    return result;
}

// ─── Convenience: full pipeline in one call ──────────────────────────
/**
 * fitToViewport — chains fn1 → fn2 → fn3.
 */
export function fitToViewport({ elWidth, elHeight, contentPx = 0, slots, mins, figmaW, figmaH }) {
    const pct      = calcFigmaPercent({ elWidth, elHeight, figmaW, figmaH });
    const viewport = getCurrentViewport();
    return computeClamps({ ...pct, contentPx, viewport, slots, mins });
}

// ─── Dev helper ──────────────────────────────────────────────────────
/**
 * measureElement — print live size as % of viewport.
 * Usage: import { measureElement } from '/src/utils/viewportClamp.js'
 *        measureElement('#ch4-committees-section > div:first-child')
 */
export function measureElement(selector) {
    const el = document.querySelector(selector);
    if (!el) { console.error(`[measureElement] not found: ${selector}`); return; }
    const rect = el.getBoundingClientRect();
    const vp   = getCurrentViewport();
    const cs   = getComputedStyle(el);
    console.group(`[measureElement] ${selector}`);
    console.log(`Size:      ${Math.round(rect.width)} × ${Math.round(rect.height)} px`);
    console.log(`Viewport:  ${vp.width} × ${vp.height} px`);
    console.log(`Width:     ${((rect.width  / vp.width)  * 100).toFixed(1)}% of vw`);
    console.log(`Height:    ${((rect.height / vp.height) * 100).toFixed(1)}% of vh`);
    console.log(`Padding:   top=${cs.paddingTop} bottom=${cs.paddingBottom} left=${cs.paddingLeft} right=${cs.paddingRight}`);
    console.log(`Gap:       ${cs.gap}`);
    console.groupEnd();
}
