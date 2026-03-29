import React, { useState } from 'react';
import { Plus, Minus } from 'lucide-react';

const AccordionItem = ({ title, content, isOpen, onClick }) => {
    const [isHovered, setIsHovered] = useState(false);
    const active = isOpen || isHovered;

    return (
        <div
            className="w-full overflow-hidden rounded-[8px] transition-all duration-200"
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
            style={{
                background: active
                    ? 'rgba(101,70,222,0.08)'
                    : 'linear-gradient(90deg,rgba(101,70,222,0.04) 0%,rgba(101,70,222,0.04) 100%),linear-gradient(90deg,#fff 0%,#fff 100%)',
                border: '1px solid rgba(101,70,222,0.08)',
                borderRight: active ? '2px solid #6546DE' : undefined,
            }}
        >
            <button
                type="button"
                dir="rtl"
                onClick={onClick}
                className="flex w-full items-center outline-none transition-all duration-200"
                style={{ minHeight: '80px', paddingInline: active ? '40px' : '24px', gap: '24px' }}
            >
                <span
                    className="flex-1 min-w-0 text-[24px] leading-[1.334] text-right transition-all duration-200"
                    style={{ color: active ? '#6546DE' : '#001d26', fontWeight: active ? 700 : 400 }}
                >
                    {title}
                </span>
                {isOpen ? (
                    <div className="shrink-0 flex items-center justify-center size-[24px] rounded-full bg-[rgba(101,70,222,0.08)]">
                        <Minus size={16} className="text-[#6546DE]" />
                    </div>
                ) : (
                    <Plus
                        size={24}
                        className="shrink-0 transition-colors duration-200"
                        style={{ color: isHovered ? '#6546DE' : '#001d26' }}
                    />
                )}
            </button>
            <div
                className={`whitespace-pre-line text-[20px] font-semibold leading-[1.28] tracking-[0.15px] text-right text-[#001d26] overflow-hidden transition-all duration-300 ${isOpen ? 'max-h-[400px] opacity-100' : 'max-h-0 opacity-0'}`}
                style={isOpen ? { paddingBottom: '40px', paddingInline: '40px' } : {}}
            >
                {content}
            </div>
        </div>
    );
};

const Accordion = ({ items }) => {
    const [openIndex, setOpenIndex] = useState(null);

    return (
        <div className="w-full flex flex-col gap-[16px]">
            {items.map((item, index) => (
                <AccordionItem
                    key={index}
                    title={item.title}
                    content={item.content}
                    isOpen={openIndex === index}
                    onClick={() => setOpenIndex((prev) => (prev === index ? null : index))}
                />
            ))}
        </div>
    );
};

export default Accordion;
