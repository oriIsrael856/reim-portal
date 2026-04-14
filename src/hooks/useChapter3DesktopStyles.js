import { useCallback, useEffect, useMemo, useState } from 'react';
import { computeStyleFromFigma, getCurrentViewport } from '../utils/viewportClamp';
import { CH3_DESKTOP_STYLE_REGISTRY, FIGMA_VIEWPORT, getCh3MinMaxWidthCss } from '../config/chapter3ViewportRegistry';

function computeDesktopBundle(viewport) {
    const styles = {};
    for (const [key, spec] of Object.entries(CH3_DESKTOP_STYLE_REGISTRY)) {
        if (!spec?.values) continue;
        styles[key] = computeStyleFromFigma({
            values: spec.values,
            viewport,
            mins: spec.mins ?? {},
            maxes: spec.maxes ?? {},
        });
    }
    return { styles };
}

/**
 * Chapter 3 desktop — single resize listener for Figma-ratio styles (1920×1080 ref).
 */
export function useChapter3DesktopStyles() {
    const ssrViewport = useMemo(
        () => ({ width: FIGMA_VIEWPORT.width, height: FIGMA_VIEWPORT.height }),
        [],
    );

    const compute = useCallback(
        () => computeDesktopBundle(typeof window !== 'undefined' ? getCurrentViewport() : ssrViewport),
        [ssrViewport],
    );

    const [bundle, setBundle] = useState(() => compute());

    useEffect(() => {
        const run = () => setBundle(compute());
        run();
        window.addEventListener('resize', run, { passive: true });
        return () => window.removeEventListener('resize', run);
    }, [compute]);

    return useMemo(
        () => ({
            ...bundle.styles,
            onboardMaxWidth: getCh3MinMaxWidthCss(1600),
        }),
        [bundle],
    );
}
