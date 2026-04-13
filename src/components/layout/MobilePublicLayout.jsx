import React from 'react';
import SiteMobileStickyChrome from './SiteMobileStickyChrome';

/**
 * Mobile-only Figma-style shell: purple rail + sticky chrome + white main column.
 * On `lg+` collapses to transparent pass-through so page layout matches desktop (same 1024px as MenuOverlay).
 */
export default function MobilePublicLayout({
    children,
    isMenuOpen,
    onMenuToggle,
    screenTitle,
    onExitClick,
    logoUrl,
    onLogoClick,
}) {
    return (
        <div
            className="ch2-mobile-page -mx-4 flex w-[calc(100%+2rem)] max-w-none shrink-0 flex-col items-center lg:contents lg:mx-0 lg:w-auto lg:max-w-none ch2-mobile-page--figma-chrome"
            data-menu-open={isMenuOpen ? 'true' : undefined}
        >
            <SiteMobileStickyChrome
                isMenuOpen={isMenuOpen}
                onMenuClick={onMenuToggle}
                screenTitle={screenTitle}
                onExitClick={onExitClick}
                logoUrl={logoUrl}
                onLogoClick={onLogoClick}
            />
            <div className="ch2-mobile-main-content ch2-mobile-main-surface ch2-mobile-main-content--below-sticky-chrome flex min-h-0 w-full max-w-none flex-1 flex-col lg:!mt-0 lg:!max-w-none lg:!min-h-0 lg:!w-full lg:!flex-none lg:!overflow-visible lg:!rounded-none lg:!border-0 lg:!bg-transparent lg:!p-0 lg:!shadow-none">
                {children}
            </div>
        </div>
    );
}
