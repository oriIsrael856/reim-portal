import React from 'react';

/**
 * “פרק שני” pill + floating chapter digit — Figma component 191:16305 (Mobile / Center).
 * Copy from CMS (`tag`, `chapterNumber`); styles: `.ch2-mobile-chapter-label*` in `index.css`.
 */
export default function Chapter2MobileChapterLabel({ tag, chapterNumber }) {
    if (!tag && chapterNumber == null) return null;

    return (
        <div className="ch2-mobile-chapter-label">
            <div className="ch2-mobile-chapter-label__stack">
                <div className="ch2-mobile-chapter-label__badge" aria-hidden>
                    <span className="ch2-mobile-chapter-label__digit" dir="ltr">
                        {chapterNumber ?? ''}
                    </span>
                </div>
                {tag ? <span className="ch2-mobile-chapter-label__tag">{tag}</span> : null}
            </div>
        </div>
    );
}
