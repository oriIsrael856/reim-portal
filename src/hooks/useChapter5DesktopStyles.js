import { useCallback, useEffect, useMemo, useState } from 'react';
import { computeStyleFromFigma, getCurrentViewport, scaleFigmaPxToViewport } from '../utils/viewportClamp';
import { CH5_DESKTOP_STYLE_REGISTRY, FIGMA_VIEWPORT, getCh5MinMaxWidthCss } from '../config/chapter5ViewportRegistry';

function computeDesktopBundle(viewport) {
    const styles = {};
    for (const [key, spec] of Object.entries(CH5_DESKTOP_STYLE_REGISTRY)) {
        if (!spec?.values) continue;
        styles[key] = computeStyleFromFigma({
            values: spec.values,
            viewport,
            mins: spec.mins ?? {},
            maxes: spec.maxes ?? {},
        });
    }

    const wPurple = scaleFigmaPxToViewport({ figmaPx: 1360, axis: 'width', viewport });
    const hPurple = scaleFigmaPxToViewport({ figmaPx: 1040, axis: 'height', viewport });
    const tPurple = scaleFigmaPxToViewport({ figmaPx: -50, axis: 'height', viewport });

    return {
        styles,
        resourcesPurpleBlurStyle: {
            width: `${wPurple}px`,
            height: `${hPurple}px`,
            top: `${tPurple}px`,
            left: '50%',
            transform: 'translateX(-50%) rotate(-5.85deg)',
        },
    };
}

/**
 * Chapter 5 desktop — Figma-ratio clamps (1920×1080 ref) + scaled decorative blur.
 */
export function useChapter5DesktopStyles() {
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
            resourcesPurpleBlurStyle: bundle.resourcesPurpleBlurStyle,
            /** Static vw caps (no resize listener needed; vw tracks viewport). */
            heroMainPhotoMaxWidth: getCh5MinMaxWidthCss(800),
            networkingContainerMaxWidth: getCh5MinMaxWidthCss(1280),
            footerContentMaxWidth: getCh5MinMaxWidthCss(896),
            heroAmberBlurSize: getCh5MinMaxWidthCss(1184),
        }),
        [bundle],
    );
}
