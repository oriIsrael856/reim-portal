import React from 'react';
import SiteMobileStickyChrome from './SiteMobileStickyChrome';

/**
 * Mobile-only Figma-style shell: purple rail + sticky chrome + white main column.
 * On `md+` collapses to transparent pass-through so page layout matches desktop.
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
            className="ch2-mobile-page -mx-4 flex w-[calc(100%+2rem)] max-w-none shrink-0 flex-col items-center md:contents md:mx-0 md:w-auto md:max-w-none ch2-mobile-page--figma-chrome"
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
            <div className="ch2-mobile-main-content ch2-mobile-main-surface ch2-mobile-main-content--below-sticky-chrome flex min-h-0 w-full max-w-none flex-1 flex-col md:!mt-0 md:!max-w-none md:!min-h-0 md:!w-full md:!flex-none md:!overflow-visible md:!rounded-none md:!border-0 md:!bg-transparent md:!p-0 md:!shadow-none">
                {children}
            </div>
        </div>
    );
}
