import React from 'react';

/**
 * Chapter 2 mobile: body + next + footer inside global `MobilePublicLayout` (App).
 * Sticky chrome is no longer rendered here.
 */
export default function Chapter2MobileShell({ children, nextSlot, footer }) {
    return (
        <div className="flex min-h-0 flex-1 flex-col md:hidden">
            <div className="ch2-mobile-main-content__body">{children}</div>
            {nextSlot ? <div className="ch2-mobile-next-chapter shrink-0 px-4 pb-2 pt-10">{nextSlot}</div> : null}
            {footer}
        </div>
    );
}
