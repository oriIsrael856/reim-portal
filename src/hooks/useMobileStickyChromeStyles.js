import { useCallback, useEffect, useMemo, useState } from 'react';
import {
    computeStyleFromFigma,
    getCurrentViewport,
    scaleFigmaPxToViewport,
    FIGMA_VIEWPORT,
} from '../utils/viewportClamp';
import {
    MOBILE_STICKY_CHROME_SPECS,
    MOBILE_STICKY_CHROME_UNION_SYN,
    MOBILE_STICKY_CHROME_GLYPH_SYN,
} from '../config/mobileStickyChromeViewportRegistry';

function computeBundle(viewport) {
    const out = {};
    for (const [key, spec] of Object.entries(MOBILE_STICKY_CHROME_SPECS)) {
        if (!spec?.values) continue;
        out[key] = computeStyleFromFigma({
            values: spec.values,
            viewport,
            mins: spec.mins ?? {},
            maxes: spec.maxes ?? {},
        });
    }

    const unionImgW = Math.min(
        64,
        Math.max(
            32,
            Math.round(
                scaleFigmaPxToViewport({
                    figmaPx: MOBILE_STICKY_CHROME_UNION_SYN.width,
                    axis: 'width',
                    viewport,
                }),
            ),
        ),
    );
    const unionImgH = Math.min(
        110,
        Math.max(
            56,
            Math.round(
                scaleFigmaPxToViewport({
                    figmaPx: MOBILE_STICKY_CHROME_UNION_SYN.height,
                    axis: 'width',
                    viewport,
                }),
            ),
        ),
    );
    const glyphImgW = Math.min(
        24,
        Math.max(
            14,
            Math.round(
                scaleFigmaPxToViewport({
                    figmaPx: MOBILE_STICKY_CHROME_GLYPH_SYN.size,
                    axis: 'width',
                    viewport,
                }),
            ),
        ),
    );
    const glyphImgH = Math.max(
        8,
        Math.round(glyphImgW * (MOBILE_STICKY_CHROME_GLYPH_SYN.aspect ?? 1)),
    );
    const glyphImgPx = glyphImgW;
    const logoutIconPx = Math.min(
        20,
        Math.max(
            12,
            Math.round(
                scaleFigmaPxToViewport({
                    figmaPx: MOBILE_STICKY_CHROME_GLYPH_SYN.size * 0.5,
                    axis: 'width',
                    viewport,
                }),
            ),
        ),
    );

    return {
        purpleInnerStyle: out.purpleInner,
        chromeTopRowStyle: out.chromeTopRow,
        menuRowStyle: out.menuRow,
        menuFrameStyle: out.menuFrame,
        unionLayerStyle: out.unionLayer,
        glyphTrayStyle: out.glyphTray,
        titleStyle: out.title,
        logoutBtnStyle: out.logoutBtn,
        unionImgW,
        unionImgH,
        glyphImgPx,
        glyphImgW,
        glyphImgH,
        logoutIconPx,
    };
}

/**
 * פרופורציות כרום מובייל (תפריט סגור) — resize כמו useMenuOverlayStyles / Ch4.
 */
export function useMobileStickyChromeStyles() {
    const ssrViewport = useMemo(
        () => ({ width: FIGMA_VIEWPORT.width, height: FIGMA_VIEWPORT.height }),
        [],
    );

    const compute = useCallback(
        () => computeBundle(typeof window !== 'undefined' ? getCurrentViewport() : ssrViewport),
        [ssrViewport],
    );

    const [bundle, setBundle] = useState(() => compute());

    useEffect(() => {
        const run = () => setBundle(compute());
        run();
        window.addEventListener('resize', run, { passive: true });
        return () => window.removeEventListener('resize', run);
    }, [compute]);

    return bundle;
}
