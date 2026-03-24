import React, { useState } from 'react';
import { Plus, Minus } from 'lucide-react';

const AccordionItem = ({ title, content, isOpen, onClick, collapsedIconSrc }) => {
    return (
        <div 
            className={`
                mb-4 rounded-xl transition-all duration-300 overflow-hidden
                ${isOpen 
                    ? 'bg-white shadow-[0px_4px_20px_rgba(129,106,254,0.1)] border-r-4 border-[#816AFE]' 
                    : 'bg-white/80 hover:bg-white border border-transparent'}
            `}
        >
            <button
                type="button"
                dir="rtl"
                onClick={onClick}
                className="flex w-full items-center justify-between gap-3 p-6 text-start outline-none"
            >
                <span
                    className={`min-w-0 flex-1 text-start text-lg font-bold md:text-xl ${isOpen ? 'text-[#5E3BEE]' : 'text-[#2D2D44]'}`}
                >
                    {title}
                </span>

                {/* מעגל האייקון — RTL row: title inline-end (ימין), אייקון inline-start (שמאל) */}
                <div
                    className={`
                    w-8 h-8 rounded-full flex items-center justify-center transition-colors duration-300
                    ${isOpen ? 'bg-[#5E3BEE]/10 text-[#5E3BEE]' : 'bg-[#2D2D44]/5 text-[#2D2D44]'}
                `}>
                    {isOpen ? (
                        <Minus size={18} />
                    ) : collapsedIconSrc ? (
                        <img src={collapsedIconSrc} alt="" width={16} height={16} className="block h-4 w-4 object-contain" />
                    ) : (
                        <Plus size={18} />
                    )}
                </div>
            </button>

            {/* תוכן נפתח */}
            <div 
                className={`
                    px-6 text-[#2D2D44]/80 leading-relaxed overflow-hidden transition-all duration-500 ease-in-out
                    ${isOpen ? 'max-h-[500px] opacity-100 pb-6' : 'max-h-0 opacity-0'}
                `}
            >
                {content}
            </div>
        </div>
    );
};

const Accordion = ({ items, collapsedIconSrc }) => {
    // מנהל איזה פריט פתוח כרגע (null = הכל סגור)
    const [openIndex, setOpenIndex] = useState(0); // ברירת מחדל: הראשון פתוח

    const handleItemClick = (index) => {
        // אם לוחצים על פריט פתוח -> סוגרים אותו, אחרת -> פותחים את החדש
        setOpenIndex(openIndex === index ? null : index);
    };

    return (
        <div className="w-full max-w-4xl mx-auto">
            {items.map((item, index) => (
                <AccordionItem
                    key={index}
                    title={item.title}
                    content={item.content}
                    isOpen={openIndex === index}
                    onClick={() => handleItemClick(index)}
                    collapsedIconSrc={collapsedIconSrc}
                />
            ))}
        </div>
    );
};

export default Accordion;