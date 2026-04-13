import React, { useState } from 'react';
import { Minus, Plus } from 'lucide-react';
import AccordionRichContent from '../chapter2/AccordionRichContent';

/**
 * Marketing steps — mobile Ch5.
 * Same row model as Ch4 FAQ mobile (Figma 254:12264 Collapse Item).
 */
export default function Page5MarketingStepsAccordion({ items }) {
    const [openIndex, setOpenIndex] = useState(null);
    if (!items?.length) return null;

    return (
        <div className="ch5-steps-acc">
            {items.map((item, index) => {
                const isOpen = openIndex === index;
                return (
                    <div
                        key={index}
                        className={`ch5-steps-acc__item ${isOpen ? 'ch5-steps-acc__item--open' : 'ch5-steps-acc__item--closed'}`}
                    >
                        <button
                            type="button"
                            className="ch5-steps-acc__btn"
                            dir="rtl"
                            onClick={() => setOpenIndex(isOpen ? null : index)}
                            aria-expanded={isOpen}
                        >
                            <span className="ch5-steps-acc__title">{item.title}</span>
                            <span
                                className={`ch5-steps-acc__icon ${isOpen ? 'ch5-steps-acc__icon--open' : 'ch5-steps-acc__icon--closed'}`}
                            >
                                {isOpen ? (
                                    <Minus size={16} strokeWidth={2} aria-hidden />
                                ) : (
                                    <Plus size={16} strokeWidth={2} aria-hidden />
                                )}
                            </span>
                        </button>
                        {isOpen ? (
                            <div className="ch5-steps-acc__panel">
                                <AccordionRichContent>{item.content}</AccordionRichContent>
                            </div>
                        ) : null}
                    </div>
                );
            })}
        </div>
    );
}
