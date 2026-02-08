import React from 'react';

// תת-רכיב: כרטיס גיל
const AgeCard = ({ label, age }) => (
    <div className="bg-white rounded-2xl border-2 border-[#2D2D44] p-4 text-center shadow-[4px_4px_0px_rgba(0,0,0,0.1)] flex flex-col items-center justify-center h-full min-h-[100px]">
        <h3 className="font-black text-[#2D2D44] text-xl mb-1">{label}</h3>
        <div className="text-sm font-bold text-[#2D2D44]/60 mb-1">גילאי</div>
        <div className="text-[#5E3BEE] font-black text-2xl font-['Salsa']">{age}</div>
    </div>
);

const TargetAudienceSection = ({ data }) => {
    return (
        <div className="w-full max-w-[1200px] mx-auto px-4 mb-24">
            <div className="bg-[#FFB84C] rounded-[40px] border-2 border-[#2D2D44] p-8 md:p-16 shadow-[8px_8px_0px_#2D2D44] relative overflow-hidden">
                
                <h2 className="text-3xl md:text-4xl font-black text-[#2D2D44] text-center mb-6">
                    {data.title}
                </h2>
                
                <p className="text-center text-[#2D2D44] font-medium text-lg md:text-xl max-w-3xl mx-auto leading-relaxed mb-12 whitespace-pre-line">
                    {data.description}
                </p>

                {/* גריד כרטיסי הגיל - הופך לטור במובייל 1-2-4 */}
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6">
                    {data.groups.map((group, index) => (
                        <AgeCard key={index} label={group.label} age={group.age} />
                    ))}
                </div>
            </div>
        </div>
    );
};

export default TargetAudienceSection;