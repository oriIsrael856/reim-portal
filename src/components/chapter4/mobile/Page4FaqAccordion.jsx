import React, { useState } from 'react';
import { Minus, Plus } from 'lucide-react';
import AccordionRichContent from '../../chapter2/AccordionRichContent';

/**
 * Committees FAQ — mobile Ch4.
 * Collapse row: Figma 254:12264 / `Collapse Item` — h 52px, px 16, inner gap 24px, 16px add icon, Body 1 title.
 */
export default function Page4FaqAccordion({ items }) {
    const [openIndex, setOpenIndex] = useState(null);
    if (!items?.length) return null;

    return (
        <div className="ch4-faq-acc">
            {items.map((item, index) => {
                const isOpen = openIndex === index;
                return (
                    <div
                        key={index}
                        className={`ch4-faq-acc__item ${isOpen ? 'ch4-faq-acc__item--open' : 'ch4-faq-acc__item--closed'}`}
                    >
                        <button
                            type="button"
                            className="ch4-faq-acc__btn"
                            dir="rtl"
                            onClick={() => setOpenIndex(isOpen ? null : index)}
                            aria-expanded={isOpen}
                        >
                            <span className="ch4-faq-acc__title">{item.title}</span>
                            <span
                                className={`ch4-faq-acc__icon ${isOpen ? 'ch4-faq-acc__icon--open' : 'ch4-faq-acc__icon--closed'}`}
                            >
                                {isOpen ? (
                                    <Minus size={16} strokeWidth={2} aria-hidden />
                                ) : (
                                    <Plus size={16} strokeWidth={2} aria-hidden />
                                )}
                            </span>
                        </button>
                        {isOpen ? (
                            <div className="ch4-faq-acc__panel">
                                <AccordionRichContent>{item.content}</AccordionRichContent>
                            </div>
                        ) : null}
                    </div>
                );
            })}
        </div>
    );
}
