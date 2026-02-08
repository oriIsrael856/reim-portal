import React from 'react';
import { Check } from 'lucide-react';

// תת-רכיב: כרטיס מטרה
const GoalCard = ({ text }) => (
    <div className="relative bg-[#F8F9FA] rounded-[20px] border-2 border-[#2D2D44] p-6 pt-10 text-center flex items-center justify-center min-h-[140px] group hover:bg-white transition-colors">
        {/* אייקון ה-V הצף למעלה */}
        <div className="absolute -top-5 left-1/2 transform -translate-x-1/2 w-10 h-10 bg-[#C5E080] border-2 border-[#2D2D44] rounded-lg flex items-center justify-center rotate-3 group-hover:rotate-0 transition-transform duration-300 shadow-sm">
            <Check size={20} strokeWidth={3} className="text-[#2D2D44]" />
        </div>
        
        <p className="text-[#2D2D44] font-medium leading-snug">
            {text}
        </p>
    </div>
);

const GoalsSection = ({ data }) => {
    return (
        <div className="max-w-[1200px] mx-auto px-6 mb-32 text-center">
            <h2 className="text-4xl md:text-5xl font-black text-[#2D2D44] mb-2">
                מטרות
            </h2>
            <h3 className="text-4xl md:text-5xl font-black text-[#2D2D44] mb-16 relative inline-block">
                תכנית רעים
                <span className="absolute bottom-2 left-0 w-full h-4 bg-[#C5E080] -z-10 opacity-60 rounded-sm"></span>
            </h3>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-8 gap-y-12">
                {data.items.map((item, index) => (
                    <GoalCard key={index} text={item} />
                ))}
            </div>
        </div>
    );
};

export default GoalsSection;