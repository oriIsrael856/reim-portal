import React from 'react';
import Chapter2MobilePart7 from './Chapter2MobilePart7';
import Chapter2MobileWhyTogether from './Chapter2MobileWhyTogether';
import Chapter2MobileWhyStickyRegion from './Chapter2MobileWhyStickyRegion';

/**
 * Figma Section 6 (node 202:10011) — "למה יחד" + three cards.
 * Source: file C2NkiNoHtXbBcYwBG3u0Ad (Copy).
 */
export default function Chapter2MobileSection6({ whyTogether }) {
    if (!whyTogether) return null;

    return (
        <section className="ch2-mobile-section6">
            <Chapter2MobileWhyStickyRegion>
                <Chapter2MobilePart7 whyTogether={whyTogether} />
                <Chapter2MobileWhyTogether whyTogether={whyTogether} />
            </Chapter2MobileWhyStickyRegion>
        </section>
    );
}
