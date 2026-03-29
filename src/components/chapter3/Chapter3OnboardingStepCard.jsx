import React from 'react';
import { ArrowLeft, Star } from 'lucide-react';

/**
 * Single reusable step card for Chapter 3 onboarding (desktop + mobile).
 * Pass CMS `step` { id, step, title, items[] } and `isLast` for the star decoration.
 */
export default function Chapter3OnboardingStepCard({ step, isLast = false, arrowSize = 18 }) {
    if (!step) return null;
    const items = step.items ?? [];
    const labelNum = step.id != null ? String(step.id).padStart(2, '0') : '';

    return (
        <article className={`ch3-stepCard h-full${isLast ? ' ch3-stepCard--last' : ''}`}>
            <div className="ch3-stepCard__chapterChip" aria-hidden>
                <div className="ch3-stepCard__chapterChipPill">
                    <span className="ch3-stepCard__chapterChipNum">{labelNum}</span>
                </div>
            </div>
            <header className="ch3-stepCard__head">
                <p className="ch3-stepCard__stepLabel">{step.step}</p>
                <h3 className="ch3-stepCard__stepTitle">{step.title}</h3>
            </header>
            <div className="ch3-stepCard__body">
                {items.map((text, idx) => (
                    <div key={idx} className="ch3-stepCard__item">
                        <div className="ch3-stepCard__itemIcon">
                            <ArrowLeft size={arrowSize} strokeWidth={arrowSize >= 18 ? 2.5 : 3} aria-hidden />
                        </div>
                        <span className="ch3-stepCard__itemText">{text}</span>
                    </div>
                ))}
            </div>
            {isLast ? (
                <Star
                    className="ch3-stepCard__decoStar"
                    size={56}
                    strokeWidth={1.5}
                    fill="var(--ch3-yellow-accent)"
                    color="var(--ch3-yellow-accent)"
                    aria-hidden
                />
            ) : null}
        </article>
    );
}
