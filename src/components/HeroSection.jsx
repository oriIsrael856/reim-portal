import React from 'react';

const HeroSection = ({ data }) => {
    return (
        <div className="relative pt-10 pb-20 text-center max-w-[1400px] mx-auto px-4">
            {/* תמונות מרחפות (דקורציה) - מותאמות למסכים גדולים */}
            <div className="hidden lg:block">
                {/* תמונה שמאלית - קבוצה */}
                <div className="absolute top-20 left-10 w-64 h-48 rotate-[-6deg] rounded-2xl overflow-hidden border-4 border-[#2D2D44] shadow-[8px_8px_0px_#2D2D44] z-10">
                    <img src={data.image1} alt="Group" className="w-full h-full object-cover" />
                </div>
                {/* תמונה ימנית עליונה - משחק */}
                <div className="absolute top-0 right-20 w-56 h-40 rotate-[3deg] rounded-2xl overflow-hidden border-4 border-[#2D2D44] shadow-[-8px_8px_0px_#2D2D44] z-10">
                    <img src={data.image2} alt="Game" className="w-full h-full object-cover" />
                </div>
                {/* תמונה ימנית תחתונה - במה */}
                <div className="absolute top-48 right-10 w-60 h-44 rotate-[-3deg] rounded-2xl overflow-hidden border-4 border-[#2D2D44] shadow-[-8px_8px_0px_#2D2D44] z-10">
                    <img src={data.image3} alt="Theater" className="w-full h-full object-cover" />
                </div>
            </div>

            {/* תוכן מרכזי */}
            <div className="relative z-20 mt-10 lg:mt-32">
                 {/* תגית ירוקה */}
                <div className="inline-block bg-[#C5E080] border-2 border-black px-6 py-1 rounded-full mb-6 shadow-[3px_3px_0px_black] transform -rotate-2">
                    <span className="font-bold text-[#2D2D44]">{data.tag}</span>
                </div>

                <h1 className="text-5xl md:text-7xl font-black text-[#2D2D44] leading-tight mb-4">
                    מי משתתפות
                    <br />
                    <span className="text-[#5E3BEE] relative">
                        ומשתתפים ברעים
                        {/* קו תחתון כתום */}
                        <span className="absolute bottom-2 left-0 w-full h-4 bg-[#FFD028] -z-10 rounded-sm transform -rotate-1"></span>
                    </span>
                </h1>
                
                {/* במובייל - נציג את התמונות כגלריה פשוטה מתחת לכותרת */}
                <div className="flex lg:hidden gap-4 overflow-x-auto mt-8 pb-4 snap-x">
                    <img src={data.image1} className="w-64 h-48 rounded-xl border-2 border-black object-cover snap-center flex-shrink-0" />
                    <img src={data.image2} className="w-64 h-48 rounded-xl border-2 border-black object-cover snap-center flex-shrink-0" />
                    <img src={data.image3} className="w-64 h-48 rounded-xl border-2 border-black object-cover snap-center flex-shrink-0" />
                </div>
            </div>

            {/* אלמנט דקורטיבי - מספר 02 */}
            <div className="absolute bottom-0 left-10 text-[120px] font-black text-[#5E3BEE]/10 font-['Salsa'] hidden md:block select-none">
                02
            </div>
        </div>
    );
};

export default HeroSection;