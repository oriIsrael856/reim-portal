import React, { useMemo } from 'react';
import { Check } from 'lucide-react';

/**
 * Section 6 cards — sticky stack inside `.ch2-mobile-why-sticky-region` only.
 * `top` / stacking rhythm from CSS vars + per-slot `--why-sticky-index` (pure CSS sticky).
 */
export default function Chapter2MobileWhyTogether({ whyTogether }) {
    const segments = useMemo(() => {
        if (!whyTogether) return [];
        const listCard = whyTogether.cards?.find((c) => c.type === 'list');
        const textCards = whyTogether.cards?.filter((c) => c.type === 'text') ?? [];
        const out = [];
        if (listCard?.items?.length > 0) {
            out.push({ kind: 'list', data: listCard });
        }
        textCards.forEach((c) => out.push({ kind: 'text', data: c }));
        return out;
    }, [whyTogether]);

    if (segments.length === 0) return null;

    return (
        <div className="ch2-mobile-why-stack">
            {segments.map((seg, index) => {
                const key = seg.kind === 'list' ? 'why-list' : `why-text-${index}`;
                const textIndexBefore = segments.slice(0, index).filter((s) => s.kind === 'text').length;
                const titleClass =
                    seg.kind === 'text'
                        ? textIndexBefore === 0
                            ? 'ch2-mobile-why-card__title--text1'
                            : 'ch2-mobile-why-card__title--text2'
                        : null;

                return (
                    <div
                        key={key}
                        className="ch2-mobile-why-sticky-slot"
                        style={{ '--why-sticky-index': String(index) }}
                    >
                        {seg.kind === 'list' ? (
                            <article className="ch2-mobile-why-card ch2-mobile-why-card--list">
                                <h3 className="ch2-mobile-why-card__title--list">{seg.data.title}</h3>
                                <div className="ch2-mobile-why-card__list">
                                    {seg.data.items.map((item, idx) => (
                                        <div key={idx} className="ch2-mobile-why-card__row">
                                            <div className="ch2-mobile-why-card__check" aria-hidden>
                                                <Check size={16} strokeWidth={2} />
                                            </div>
                                            <p className="ch2-mobile-why-card__row-text">{item}</p>
                                        </div>
                                    ))}
                                </div>
                            </article>
                        ) : (
                            <article className="ch2-mobile-why-card ch2-mobile-why-card--text">
                                <h3 className={titleClass}>{seg.data.title}</h3>
                                <p className="ch2-mobile-why-card__body">{seg.data.text}</p>
                            </article>
                        )}
                    </div>
                );
            })}
        </div>
    );
}
