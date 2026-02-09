import React from 'react';
import { Check } from 'lucide-react';

const CheckCard = ({ title, text }) => (
    <div className="bg-white border-2 border-[#2D2D44] rounded-2xl p-6 relative pt-10 h-full shadow-sm hover:shadow-md transition-all group">
        {/* תיבת ה-V הירוקה */}
        <div className="absolute -top-5 left-1/2 -translate-x-1/2 bg-[#C5E080] border-2 border-[#2D2D44] w-10 h-10 flex items-center justify-center rounded-lg shadow-[2px_2px_0px_#2D2D44] group-hover:scale-110 transition-transform">
            <Check size={24} strokeWidth={4} className="text-[#2D2D44]" />
        </div>
        <div className="text-center">
            <h4 className="font-black text-lg mb-3 text-[#2D2D44] leading-tight">{title}</h4>
            <p className="text-sm text-[#2D2D44]/70 font-medium leading-relaxed">{text}</p>
        </div>
    </div>
);

export default CheckCard;