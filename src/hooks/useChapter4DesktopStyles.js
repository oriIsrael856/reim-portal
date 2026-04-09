import { useCallback, useEffect, useMemo, useState } from 'react';
import {
    computeStyleFromFigma,
    getCurrentViewport,
    scaleFigmaPxToViewport,
} from '../utils/viewportClamp';
import { CH4_DESKTOP_STYLE_REGISTRY } from '../config/chapter4ViewportRegistry';

function computeDesktopBundle() {
    const viewport = getCurrentViewport();
    const styles = {};
    for (const [key, spec] of Object.entries(CH4_DESKTOP_STYLE_REGISTRY)) {
        if (!spec?.values) continue;
        styles[key] = computeStyleFromFigma({
            values: spec.values,
            viewport,
            mins: spec.mins ?? {},
            maxes: spec.maxes ?? {},
        });
    }

    const w1044 = scaleFigmaPxToViewport({ figmaPx: 1044, axis: 'width', viewport });
    const h711 = scaleFigmaPxToViewport({ figmaPx: 711, axis: 'height', viewport });
    const t39 = scaleFigmaPxToViewport({ figmaPx: 39, axis: 'height', viewport });

    return {
        styles,
        filesScrollStep:
            scaleFigmaPxToViewport({ figmaPx: 320, axis: 'width', viewport }) +
            scaleFigmaPxToViewport({ figmaPx: 24, axis: 'width', viewport }),
        filesGlowStyle: {
            width: `${w1044}px`,
            height: `${h711}px`,
            top: `${-t39}px`,
            right: 'calc(996 / 1424 * 100%)',
        },
    };
}

/**
 * Single resize listener for all Chapter 4 desktop Figma-ratio styles (1920×1080 ref).
 */
export function useChapter4DesktopStyles() {
    const compute = useCallback(() => computeDesktopBundle(), []);

    const [bundle, setBundle] = useState(() =>
        typeof window !== 'undefined' ? compute() : { styles: {}, filesScrollStep: 344, filesGlowStyle: {} },
    );

    useEffect(() => {
        const run = () => setBundle(compute());
        run();
        window.addEventListener('resize', run, { passive: true });
        return () => window.removeEventListener('resize', run);
    }, [compute]);

    return useMemo(
        () => ({
            ...bundle.styles,
            filesScrollStep: bundle.filesScrollStep,
            filesGlowStyle: bundle.filesGlowStyle,
        }),
        [bundle],
    );
}
