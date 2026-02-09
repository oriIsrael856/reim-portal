import React from 'react';
import { ArrowLeft } from 'lucide-react';

const ProcessCard = ({ number, step, title, items }) => {
    return (
        <div className="relative bg-[#FFFDF5] border-[3px] border-[#2D2D44] rounded-2xl p-6 pt-12 h-full hover:-translate-y-1 transition-transform duration-300 shadow-sm hover:shadow-md">
            
            {/* התגית הירוקה עם המספר למעלה */}
            <div className="absolute -top-5 right-8 bg-[#C5E080] border-[3px] border-[#2D2D44] w-12 h-12 flex items-center justify-center rounded-xl font-black text-xl text-[#2D2D44] shadow-[3px_3px_0px_#2D2D44] z-10">
                {number}
            </div>

            {/* תוכן הכרטיס */}
            <div className="text-right">
                <span className="text-sm font-bold text-[#2D2D44]/60 tracking-wide">{step}</span>
                <h3 className="text-2xl font-black text-[#2D2D44] mb-6 mt-1 leading-tight">{title}</h3>
                
                <ul className="flex flex-col gap-4">
                    {items.map((item, index) => (
                        <li key={index} className="flex items-start gap-3 group">
                            {/* עיגול החץ */}
                            <div className="mt-1 flex-shrink-0 w-6 h-6 rounded-full bg-[#C5E080]/30 border border-[#2D2D44]/10 flex items-center justify-center group-hover:bg-[#C5E080] transition-colors">
                                <ArrowLeft size={14} className="text-[#2D2D44]" strokeWidth={3} />
                            </div>
                            <span className="text-[#2D2D44] font-medium leading-snug">{item}</span>
                        </li>
                    ))}
                </ul>
            </div>
        </div>
    );
};

export default ProcessCard;