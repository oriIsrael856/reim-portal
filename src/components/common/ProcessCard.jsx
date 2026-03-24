import React from 'react';
import { ArrowLeft, Star } from 'lucide-react';

/**
 * Chapter 3 onboarding step — matches Figma Section 3 / `ch3-stepCard` in chapter3-mobile.css
 * (only referenced from Chapter3.jsx)
 */
const ProcessCard = ({ number, step, title, items, showStar }) => {
    const labelNum = number != null ? String(number).padStart(2, '0') : '';

    return (
        <article className={`ch3-stepCard h-full${showStar ? ' ch3-stepCard--last' : ''}`}>
            <div className="ch3-stepCard__chapterChip" aria-hidden>
                <div className="ch3-stepCard__chapterChipPill">
                    <span className="ch3-stepCard__chapterChipNum">{labelNum}</span>
                </div>
            </div>
            <header className="ch3-stepCard__head">
                <p className="ch3-stepCard__stepLabel">{step}</p>
                <h3 className="ch3-stepCard__stepTitle">{title}</h3>
            </header>
            <div className="ch3-stepCard__body">
                {items.map((item, index) => (
                    <div key={index} className="ch3-stepCard__item">
                        <div className="ch3-stepCard__itemIcon">
                            <ArrowLeft size={14} strokeWidth={3} aria-hidden />
                        </div>
                        <span className="ch3-stepCard__itemText">{item}</span>
                    </div>
                ))}
            </div>
            {showStar ? (
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
};

export default ProcessCard;
