import React from 'react';

const FlowStep = ({ id, title, desc }) => (
    <div className="bg-white border-2 border-[#2D2D44] rounded-2xl p-6 relative pt-10 h-full shadow-[6px_6px_0px_#2D2D44] hover:translate-y-[-4px] transition-transform">
        {/* אינדיקטור מספרי */}
        <div className="absolute -top-5 right-1/2 translate-x-1/2 md:right-6 md:translate-x-0 bg-[#C5E080] border-2 border-[#2D2D44] w-12 h-12 flex items-center justify-center rounded-full font-black text-[#2D2D44] shadow-[2px_2px_0px_#2D2D44]">
            {id}
        </div>
        <div className="text-center md:text-right">
            <h4 className="font-black text-xl mb-3 text-[#2D2D44] leading-tight">{title}</h4>
            <p className="text-sm text-[#2D2D44]/70 font-medium leading-relaxed">{desc}</p>
        </div>
    </div>
);

export default FlowStep;