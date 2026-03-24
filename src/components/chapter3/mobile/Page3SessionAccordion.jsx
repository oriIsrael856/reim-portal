import React, { useState } from 'react';
import { Minus, Plus } from 'lucide-react';

/**
 * Figma `254:9802` — RTL row + flex-start: title first (physical right), +/- icon second (physical left).
 */
export default function Page3SessionAccordion({ items }) {
    const [openIndex, setOpenIndex] = useState(0);
    if (!items?.length) return null;

    return (
        <div className="ch3-acc">
            {items.map((item, index) => {
                const isOpen = openIndex === index;
                return (
                    <div
                        key={index}
                        className={`ch3-acc__item ${isOpen ? 'ch3-acc__item--open' : 'ch3-acc__item--closed'}`}
                    >
                        <button
                            type="button"
                            className="ch3-acc__btn"
                            dir="rtl"
                            onClick={() => setOpenIndex(isOpen ? null : index)}
                            aria-expanded={isOpen}
                        >
                            <span className="ch3-acc__title">{item.title}</span>
                            <span
                                className={`ch3-acc__icon ${isOpen ? 'ch3-acc__icon--open' : 'ch3-acc__icon--closed'}`}
                            >
                                {isOpen ? <Minus size={14} strokeWidth={2.5} /> : <Plus size={14} strokeWidth={2.5} />}
                            </span>
                        </button>
                        {isOpen ? <div className="ch3-acc__panel">{item.content}</div> : null}
                    </div>
                );
            })}
        </div>
    );
}
