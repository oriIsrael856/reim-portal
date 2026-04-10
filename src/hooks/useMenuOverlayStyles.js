import { useCallback, useEffect, useMemo, useState } from 'react';
import {
    computeStyleFromFigma,
    getCurrentViewport,
    scaleFigmaPxToViewport,
    FIGMA_VIEWPORT,
} from '../utils/viewportClamp';
import { MENU_OVERLAY_STYLE_SPECS, menuOverlayMinMaxWidth } from '../config/menuOverlayViewportRegistry';

function computeBundle(viewport) {
    const out = {};

    for (const [key, spec] of Object.entries(MENU_OVERLAY_STYLE_SPECS)) {
        if (!spec?.values) continue;
        out[key] = computeStyleFromFigma({
            values: spec.values,
            viewport,
            mins: spec.mins ?? {},
            maxes: spec.maxes ?? {},
        });
    }

    const homeIconPx = scaleFigmaPxToViewport({ figmaPx: 32, axis: 'width', viewport });
    const railWidthPx = scaleFigmaPxToViewport({ figmaPx: 80, axis: 'width', viewport });
    /** Figma 50:4490 — left -4px; +nudge ימינה כדי שלא ייחתכו בהובר (scale מקצה שמאל) */
    const digitLeftPullPx = Math.max(0, Math.round(scaleFigmaPxToViewport({ figmaPx: 4, axis: 'width', viewport })));
    const digitLeftNudgeRightPx = Math.round(scaleFigmaPxToViewport({ figmaPx: 10, axis: 'width', viewport }));
    const digitLeftCssPx = Math.max(2, Math.round(digitLeftNudgeRightPx - digitLeftPullPx));
    const digitTopPullPx = Math.max(12, Math.round(scaleFigmaPxToViewport({ figmaPx: 33, axis: 'height', viewport })));

    return {
        panelPaddingStyle: out.panelPadding,
        navGapHomeStyle: out.navGapHomeToChapters,
        chapterListGapStyle: out.chapterListGap,
        menuRowStyle: out.menuRow,
        menuLabelStyle: out.menuLabel,
        menuDigitStyle: out.menuDigit,
        railLabelStyle: out.railLabel,
        homeIconPx: Math.max(22, Math.round(homeIconPx)),
        railWidthPx: Math.max(64, Math.round(railWidthPx)),
        digitLeftCssPx,
        digitTopPullPx,
        drawerWidthCss: menuOverlayMinMaxWidth(600),
        rowMaxWidthCss: menuOverlayMinMaxWidth(440),
    };
}

/**
 * Figma-ratio styles for MenuOverlay (resize-safe), matching Ch4/Ch5 pipeline.
 */
export function useMenuOverlayStyles() {
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
