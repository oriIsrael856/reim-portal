import React from 'react';
import { Check } from 'lucide-react';

const DEFAULT_GOALS_TITLE = 'מטרות\nתכנית רעים';

/** מפרק כותרת לשתי שורות: שורות מ-Enter ב-CMS, או שורה אחת מהשרת → מילה ראשונה / השאר */
function parseGoalsTitleLines(goalsTitle) {
    const raw =
        typeof goalsTitle === 'string' && goalsTitle.trim() !== ''
            ? goalsTitle.replace(/\\n/g, '\n')
            : DEFAULT_GOALS_TITLE;
    const segments = raw
        .split(/\n+/)
        .map((s) => s.trim())
        .filter(Boolean);

    if (segments.length >= 2) {
        return {
            line1: segments[0],
            line2: segments.slice(1).join(' ').trim(),
        };
    }

    if (segments.length === 1) {
        const only = segments[0];
        const space = only.indexOf(' ');
        if (space > 0) {
            return {
                line1: only.slice(0, space),
                line2: only.slice(space + 1).trim(),
            };
        }
        return { line1: only, line2: '' };
    }

    return { line1: '', line2: '' };
}

/** Goals list — mobile (Figma Section 3, node 202:3339) */
export default function Chapter2MobileGoals({ goals, goalsTitle }) {
    if (!goals?.length) return null;

    const { line1: titleLine1, line2: titleLine2 } = parseGoalsTitleLines(goalsTitle);

    return (
        <section className="ch2-mobile-section3" aria-labelledby="ch2-mobile-goals-heading">
            <header className="ch2-mobile-section3__header">
                <h2 id="ch2-mobile-goals-heading" className="ch2-mobile-section3__title">
                    {titleLine1 ? (
                        <span className="ch2-mobile-section3__title-line1">{titleLine1}</span>
                    ) : null}
                    {titleLine2 ? (
                        <span className="ch2-mobile-section3__title-line2">{titleLine2}</span>
                    ) : null}
                </h2>
            </header>
            <div className="ch2-mobile-section3__goals">
                {goals.map((text, index) => (
                    <article key={index} className="ch2-mobile-section3__card">
                        <div className="ch2-mobile-section3__icon-wrap" aria-hidden>
                            <Check
                                size={18}
                                strokeWidth={2.5}
                                className="text-[var(--ch2-text-primary)]"
                            />
                        </div>
                        <p className="ch2-mobile-section3__goal-text">{text}</p>
                    </article>
                ))}
            </div>
        </section>
    );
}
