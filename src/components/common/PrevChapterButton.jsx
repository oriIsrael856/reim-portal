import React from 'react';
import { ArrowRight } from 'lucide-react';

const PrevChapterButton = ({ title = 'חזור', subtitle, onClick }) => {
    if (typeof onClick !== 'function') return null;
    return (
        <div className="w-full max-w-5xl mx-auto px-6 mb-8 relative z-30 flex justify-center">
            <button
                type="button"
                onClick={onClick}
                className="
                    group flex items-center gap-4
                    h-14 rounded-2xl px-6
                    bg-[#EBE5FC] hover:bg-[#816AFE] text-[#2D2D44] hover:text-white
                    border border-[#816AFE]/30 hover:border-transparent
                    transition-all duration-300 cursor-pointer
                "
            >
                <div className="w-10 h-10 rounded-xl bg-white/80 group-hover:bg-white/20 flex items-center justify-center transition-colors">
                    <ArrowRight size={22} className="text-[#816AFE] group-hover:text-white" strokeWidth={2.5} />
                </div>
                <div className="text-right">
                    <span className="font-black text-lg block">{title}</span>
                    {subtitle && <span className="text-sm opacity-90 block">{subtitle}</span>}
                </div>
            </button>
        </div>
    );
};

export default PrevChapterButton;
