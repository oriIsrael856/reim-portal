import React from 'react';
import FigmaAgeRow from './FigmaAgeRow';

/**
 * מפרק את audienceText לפסקאות: השורה האחרונה כטקסט Subtitle 1 (כמו בפיגמה).
 * @param {string | undefined | null} text
 */
function splitAudienceText(text) {
    if (text == null || typeof text !== 'string') return { main: '', note: null };
    const lines = text.split('\n').map((l) => l.trim()).filter(Boolean);
    if (lines.length <= 1) return { main: text.trim(), note: null };
    return {
        main: lines.slice(0, -1).join('\n'),
        note: lines[lines.length - 1],
    };
}

/**
 * Section 2 — קהל יעד (Figma node 202:3293, קובץ תוכנית רעים).
 * מבנה: מסגרת גרדיאנט → כרטיס כתום אחד (כותרת H5, גוף + הערה, עמודת כרטיסי גיל).
 */
export default function Chapter2MobileAudience({ contentBox }) {
    if (!contentBox) return null;

    const headingId = 'ch2-section2-audience-title';
    const { main, note } = splitAudienceText(contentBox.audienceText);

    return (
        <section className="ch2-mobile-section2" aria-labelledby={headingId}>
            <div className="ch2-mobile-section2__title-card">
                <h2 id={headingId} className="ch2-mobile-section2__title">
                    {contentBox.audienceTitle}
                </h2>
                <div className="ch2-mobile-section2__lower">
                    <div className="ch2-mobile-section2__body-stack">
                        {note ? (
                            <>
                                <p className="ch2-mobile-section2__body">{main}</p>
                                <p className="ch2-mobile-section2__note">{note}</p>
                            </>
                        ) : (
                            <p className="ch2-mobile-section2__body">{contentBox.audienceText}</p>
                        )}
                    </div>
                    <div className="ch2-mobile-section2__age-stack" role="list">
                        {contentBox.ageGroups.map((group, index) => (
                            <div key={group.label ?? index} role="listitem">
                                <FigmaAgeRow label={group.label} age={group.age} />
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </section>
    );
}
