import React from 'react';

/**
 * Isolated scroll container for Section 6 sticky stacking cards.
 * Required when the app shell uses overflow:hidden — sticky is relative to this element, not the viewport.
 */
export default function Chapter2MobileWhyStickyRegion({ children }) {
    return (
        <div className="ch2-mobile-why-sticky-region" dir="rtl">
            {children}
        </div>
    );
}
