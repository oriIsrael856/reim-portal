import React, { useState } from 'react';
import { Minus, Plus } from 'lucide-react';
import { THEME } from '../theme';

export const SectionTitle = ({ title, subtitle, color = THEME.colors.textMain, align = 'center' }) => (
    <div className={`text-${align} mb-8`}>
        {subtitle && <h3 className="text-xl font-bold opacity-80 mb-2" style={{color}}>{subtitle}</h3>}
        {title && <h2 className="text-4xl md:text-5xl font-black leading-tight" style={{color}}>{title}</h2>}
    </div>
);

export const AccordionRow = ({ title, text, isOpen, onClick }) => (
    <div className="bg-white/50 rounded-xl mb-3 overflow-hidden border border-transparent hover:border-purple-200 transition-all">
        <button onClick={onClick} className="flex items-center justify-between w-full p-4 text-right">
            <div className="flex items-center gap-4 w-full">
                <div className={`w-8 h-8 rounded-full flex items-center justify-center transition-colors flex-shrink-0 ${isOpen ? 'bg-[#46319B] text-white' : 'bg-[#EBE5FC] text-[#46319B]'}`}>
                    {isOpen ? <Minus size={18} /> : <Plus size={18} />}
                </div>
                <span className="text-lg font-bold text-[#2D2D44]">{title}</span>
            </div>
        </button>
        {isOpen && (
            <div className="px-4 pb-6 pr-16 text-[#2D2D44] leading-relaxed whitespace-pre-line text-right">
                {text}
            </div>
        )}
    </div>
);

export const StickyContentCard = ({ title, subtitle, content, color, index }) => {
    const [openIndex, setOpenIndex] = useState(0); 
    const stickyTop = 100 + (index * 40); 

    return (
        <div className="sticky w-full mb-12" style={{ top: `${stickyTop}px`, zIndex: 10 + index }}>
            <div className="bg-white rounded-[40px] p-8 md:p-16 border border-slate-100 relative min-h-[600px]" style={{boxShadow: THEME.shadows.soft}}>
                <div className="text-right mb-8 border-b border-gray-100 pb-4">
                    <span className="text-sm font-bold text-[#2D2D44] opacity-60 block mb-2">{subtitle}</span>
                    <h2 className="text-4xl md:text-5xl font-black" style={{color: color || THEME.colors.textMain}}>{title}</h2>
                </div>
                <div className="space-y-2">
                    {content.map((item, i) => (
                        <AccordionRow 
                            key={i} 
                            title={item.title} 
                            text={item.text} 
                            isOpen={openIndex === i} 
                            onClick={() => setOpenIndex(openIndex === i ? -1 : i)} 
                        />
                    ))}
                </div>
            </div>
        </div>
    );
};