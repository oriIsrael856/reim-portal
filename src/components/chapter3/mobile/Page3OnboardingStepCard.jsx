import React from 'react';
import { ArrowLeft, Star } from 'lucide-react';

export default function Page3OnboardingStepCard({ step, isLast }) {
    if (!step) return null;
    const items = step.items ?? [];
    const labelNum = step.id != null ? String(step.id).padStart(2, '0') : '';

    return (
        <article className={`ch3-stepCard${isLast ? ' ch3-stepCard--last' : ''}`}>
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
                            <ArrowLeft size={14} strokeWidth={3} aria-hidden />
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
