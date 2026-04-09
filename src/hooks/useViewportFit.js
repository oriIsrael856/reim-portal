import { useState, useEffect, useCallback } from 'react';
import { fitToViewport, computeStyleFromFigma, getCurrentViewport } from '../utils/viewportClamp';

/**
 * useViewportFit
 * Full pipeline (fn1→fn2→fn3) for one element.
 * Pass Figma element dimensions + content height → get clamp() style object.
 *
 * @example
 * const cardStyle = useViewportFit({
 *   elWidth: 1264, elHeight: 443, contentPx: 200,
 *   slots: { paddingTop: 0.38, paddingBottom: 0.30, gap: 0.32 },
 *   mins:  { paddingTop: 14, paddingBottom: 12, gap: 8 },
 * });
 * <div style={cardStyle}>…</div>
 */
export function useViewportFit({ elWidth, elHeight, contentPx = 0, slots, mins } = {}) {
    const run = useCallback(() => {
        const { _debug, ...style } = fitToViewport({ elWidth, elHeight, contentPx, slots, mins });
        return style;
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [elWidth, elHeight, contentPx, JSON.stringify(slots), JSON.stringify(mins)]);

    const [style, setStyle] = useState(() => typeof window !== 'undefined' ? run() : {});

    useEffect(() => {
        setStyle(run());
        const handler = () => setStyle(run());
        window.addEventListener('resize', handler, { passive: true });
        return () => window.removeEventListener('resize', handler);
    }, [run]);

    return style;
}

/**
 * useComponentStyle
 * Per-property pipeline: each CSS prop gets its own Figma px value + axis.
 * Returns a clamp()-based style object, re-computed on resize.
 *
 * axis:'width'  → scales with viewport WIDTH  (padding-left/right, gap in row, font-size)
 * axis:'height' → scales with viewport HEIGHT (padding-top/bottom, gap in col, row-height)
 *
 * @param {object} figmaValues  { cssProperty: { px: number, axis: 'width'|'height' } }
 * @param {object} [opts]       { mins, maxes } per-property overrides
 *
 * @example
 * const nativStyle = useComponentStyle({
 *   paddingTop:    { px: 120, axis: 'height' },
 *   paddingBottom: { px: 200, axis: 'height' },
 *   paddingLeft:   { px: 200, axis: 'width'  },
 *   paddingRight:  { px: 200, axis: 'width'  },
 *   gap:           { px: 200, axis: 'width'  },
 * });
 * <section style={nativStyle}>…</section>
 *
 * const headingStyle = useComponentStyle({ fontSize: { px: 34, axis: 'width' } });
 * <p style={headingStyle}>…</p>
 */
export function useComponentStyle(figmaValues, { mins, maxes } = {}) {
    const run = useCallback(() =>
        computeStyleFromFigma({ values: figmaValues, viewport: getCurrentViewport(), mins, maxes }),
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [JSON.stringify(figmaValues), JSON.stringify(mins), JSON.stringify(maxes)]);

    const [style, setStyle] = useState(() => typeof window !== 'undefined' ? run() : {});

    useEffect(() => {
        setStyle(run());
        const handler = () => setStyle(run());
        window.addEventListener('resize', handler, { passive: true });
        return () => window.removeEventListener('resize', handler);
    }, [run]);

    return style;
}
