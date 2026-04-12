import { useCallback, useEffect, useMemo, useState } from 'react';

import {

    computeStyleFromFigma,

    getCurrentViewport,

    scaleFigmaPxToViewport,

    FIGMA_VIEWPORT,

} from '../utils/viewportClamp';

import {

    MENU_OVERLAY_STYLE_SPECS,

    MENU_OVERLAY_MOBILE_STYLE_SPECS,

    menuOverlayMinMaxWidth,

} from '../config/menuOverlayViewportRegistry';



/** Tailwind md — same breakpoint as desktop rail / menu chrome */

const MENU_OVERLAY_MD_MIN_PX = 768;



const EMPTY_STYLE = {};



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



    const mobileOut = {};

    for (const [key, spec] of Object.entries(MENU_OVERLAY_MOBILE_STYLE_SPECS)) {

        if (!spec?.values) continue;

        mobileOut[key] = computeStyleFromFigma({

            values: spec.values,

            viewport,

            mins: spec.mins ?? {},

            maxes: spec.maxes ?? {},

        });

    }



    const isDesktop = viewport.width >= MENU_OVERLAY_MD_MIN_PX;



    const homeIconPx = scaleFigmaPxToViewport({ figmaPx: 32, axis: 'width', viewport });

    const railWidthPx = scaleFigmaPxToViewport({ figmaPx: 80, axis: 'width', viewport });

    /** Figma 50:4490 — left -4px; +nudge ימינה כדי שלא ייחתכו בהובר (scale מקצה שמאל) */

    const digitLeftPullPx = Math.max(0, Math.round(scaleFigmaPxToViewport({ figmaPx: 4, axis: 'width', viewport })));

    const digitLeftNudgeRightPx = Math.round(scaleFigmaPxToViewport({ figmaPx: 10, axis: 'width', viewport }));

    const digitLeftCssPx = Math.max(2, Math.round(digitLeftNudgeRightPx - digitLeftPullPx));

    const base = {

        menuRowStyle: out.menuRow,

        menuLabelStyle: out.menuLabel,

        menuDigitStyle: out.menuDigit,

        railLabelStyle: out.railLabel,

        homeIconPx: Math.max(22, Math.round(homeIconPx)),

        railWidthPx: Math.max(64, Math.round(railWidthPx)),

        digitLeftCssPx,

    };



    /** Mobile: Figma 191:15815 — overlay root + window margin + top bar + newsletter CTA from registry */

    if (!isDesktop) {

        return {

            ...base,

            isDesktop: false,

            overlayRootStyle: mobileOut.overlayRoot ?? EMPTY_STYLE,

            windowMarginStyle: mobileOut.windowMargin ?? EMPTY_STYLE,

            topSidebarPaddingStyle: mobileOut.topSidebarPadding ?? EMPTY_STYLE,

            newsletterCtaStyle: mobileOut.newsletterCta ?? EMPTY_STYLE,

            newsletterIconBoxStyle: mobileOut.newsletterIconBox ?? EMPTY_STYLE,

            panelPaddingStyle: mobileOut.panelPadding ?? EMPTY_STYLE,

            /** Figma window: justify-between between home / chapters / CTA — no fixed gap */

            navGapHomeStyle: EMPTY_STYLE,

            chapterListGapStyle: mobileOut.chapterListGap ?? EMPTY_STYLE,

            drawerWidthCss: '100%',

            rowMaxWidthCss: '100%',

        };

    }



    return {

        ...base,

        isDesktop: true,

        overlayRootStyle: EMPTY_STYLE,

        windowMarginStyle: EMPTY_STYLE,

        topSidebarPaddingStyle: EMPTY_STYLE,

        newsletterCtaStyle: EMPTY_STYLE,

        newsletterIconBoxStyle: EMPTY_STYLE,

        panelPaddingStyle: out.panelPadding,

        navGapHomeStyle: out.navGapHomeToChapters,

        chapterListGapStyle: out.chapterListGap,

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

