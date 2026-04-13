import React, { useState } from 'react';
import { Plus, Minus } from 'lucide-react';

const AccordionItem = ({ title, content, isOpen, onClick, viewportCh5Styles }) => {
    const [isHovered, setIsHovered] = useState(false);
    const active = isOpen || isHovered;

    const ch5 = viewportCh5Styles?.ch5AccordionBtnMinHeight ? viewportCh5Styles : null;

    const pad = ch5 ? (active ? ch5.ch5AccordionBtnPadActive : ch5.ch5AccordionBtnPadInactive) : null;

    const buttonStyle = ch5
        ? {
              minHeight: ch5.ch5AccordionBtnMinHeight.minHeight,
              gap: pad.gap,
              paddingInlineStart: pad.paddingInlineStart,
              paddingInlineEnd: pad.paddingInlineEnd,
          }
        : { minHeight: '80px', paddingInline: active ? '40px' : '24px', gap: '24px' };

    const contentOpenStyle = ch5
        ? {
              ...ch5.ch5AccordionContentPad,
              fontSize: ch5.ch5AccordionContentFont.fontSize,
          }
        : { paddingBottom: '40px', paddingInline: '40px' };

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
                borderInlineStart: active ? '2px solid #6546DE' : undefined,
            }}
        >
            <button
                type="button"
                dir="rtl"
                onClick={onClick}
                className="flex w-full items-center justify-between outline-none transition-all duration-200"
                style={buttonStyle}
            >
                <span
                    className={`min-w-0 flex-1 leading-[1.334] text-end transition-all duration-200 ${ch5 ? '' : 'text-[24px]'}`}
                    style={{
                        ...(ch5 ? { fontSize: ch5.ch5AccordionTitleFont.fontSize } : {}),
                        color: active ? '#6546DE' : '#001d26',
                        fontWeight: active ? 700 : 400,
                    }}
                >
                    {title}
                </span>
                {isOpen ? (
                    <div className="flex size-6 shrink-0 items-center justify-center rounded-full bg-[rgba(101,70,222,0.08)]">
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
                className={`whitespace-pre-line leading-[1.28] tracking-[0.15px] text-end text-[#001d26] overflow-hidden transition-all duration-300 ${ch5 ? 'font-semibold' : 'text-[20px] font-normal'} ${isOpen ? 'max-h-[400px] opacity-100' : 'max-h-0 opacity-0'}`}
                style={isOpen ? contentOpenStyle : {}}
            >
                {content}
            </div>
        </div>
    );
};

/** @param {{ items: Array<{ title: string, content: string }>, viewportCh5Styles?: object }} props */
const Accordion = ({ items, viewportCh5Styles }) => {
    const [openIndex, setOpenIndex] = useState(null);
    const ch5 = viewportCh5Styles?.ch5AccordionListGap ? viewportCh5Styles : null;

    return (
        <div
            className={`flex w-full flex-col ${ch5 ? '' : 'gap-[16px]'}`}
            style={ch5?.ch5AccordionListGap}
        >
            {items.map((item, index) => (
                <AccordionItem
                    key={index}
                    title={item.title}
                    content={item.content}
                    isOpen={openIndex === index}
                    onClick={() => setOpenIndex((prev) => (prev === index ? null : index))}
                    viewportCh5Styles={ch5}
                />
            ))}
        </div>
    );
};

export default Accordion;
