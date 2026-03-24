import React, { useState } from 'react';
import { Minus, Plus } from 'lucide-react';
import AccordionRichContent from '../AccordionRichContent';

/**
 * Accordion — mobile Chapter 2 (Figma 202:10011 — group detail collapse items).
 * Styles: `index.css` `.ch2-mobile-section5-accordion*`
 */
export default function AccordionMobileFigma({ items }) {
    const [openIndex, setOpenIndex] = useState(0);
    const toggle = (index) => setOpenIndex(openIndex === index ? null : index);

    return (
        <div className="ch2-mobile-section5-accordion">
            {items.map((item, index) => {
                const isOpen = openIndex === index;
                return (
                    <div
                        key={index}
                        className={`ch2-mobile-section5-accordion__item ${
                            isOpen ? 'ch2-mobile-section5-accordion__item--open' : ''
                        }`}
                    >
                        <button
                            type="button"
                            onClick={() => toggle(index)}
                            className="ch2-mobile-section5-accordion__trigger"
                        >
                            <div
                                className={`ch2-mobile-section5-accordion__icon-wrap ${
                                    isOpen ? 'ch2-mobile-section5-accordion__icon-wrap--open' : ''
                                }`}
                            >
                                {isOpen ? (
                                    <Minus
                                        size={16}
                                        strokeWidth={2}
                                        className="text-[var(--ch2-text-purple)]"
                                        aria-hidden
                                    />
                                ) : (
                                    <Plus
                                        size={16}
                                        strokeWidth={2}
                                        className="text-[var(--ch2-text-primary)]"
                                        aria-hidden
                                    />
                                )}
                            </div>
                            <span
                                className={`ch2-mobile-section5-accordion__label ${
                                    isOpen
                                        ? 'ch2-mobile-section5-accordion__label--open'
                                        : 'ch2-mobile-section5-accordion__label--closed'
                                }`}
                            >
                                {item.title}
                            </span>
                        </button>
                        <div
                            className={`ch2-mobile-section5-accordion__body ${
                                isOpen
                                    ? 'ch2-mobile-section5-accordion__body--open'
                                    : 'ch2-mobile-section5-accordion__body--collapsed'
                            }`}
                        >
                            <div className="ch2-mobile-section5-accordion__body-inner">
                                <AccordionRichContent>{item.content}</AccordionRichContent>
                            </div>
                        </div>
                    </div>
                );
            })}
        </div>
    );
}
