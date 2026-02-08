import React from 'react';
import NextChapterButton from '../components/common/NextChapterButton';
import StickyCard from '../components/common/StickyCard';
// וודא שהנתיב הזה נכון!
import SplitStickyLayout from '../components/layout/SplitStickyLayout';

const Chapter3 = ({ data, onNext }) => {
    // 1. הגנה: אם אין דאטה, הצג שגיאה ברורה
    if (!data) return <div className="text-center p-20 text-red-500 font-bold">Error: נתונים חסרים לפרק 3 (Data Missing)</div>;

    // 2. הגדרת התוכן הדביק (צד ימין)
    const StickyHeader = (
        <div className="flex flex-col items-start pl-4 md:pl-10">
            <div className="inline-flex items-center gap-2 bg-[#C5E080] border-2 border-black px-4 py-1.5 rounded-full mb-8 shadow-[3px_3px_0px_black] transform -rotate-1">
                <span className="font-bold text-[#2D2D44] tracking-wide text-sm">{data.hero?.tag}</span>
                <div className="bg-white/40 px-2 rounded-full text-xs font-bold border border-black/10">03</div>
            </div>

            <h1 className="text-5xl md:text-7xl font-black text-[#2D2D44] leading-[1.1] mb-8 text-right">
                {data.hero?.titleTop}
                <br />
                <span className="text-[#5E3BEE] relative inline-block mt-2">
                    {data.hero?.titleBottom}
                    <span className="absolute bottom-2 left-0 w-full h-4 bg-[#FFB84C] -z-10 rounded-sm transform -rotate-1"></span>
                </span>
            </h1>

            <p className="text-xl md:text-2xl text-[#2D2D44] font-medium leading-relaxed max-w-lg text-right">
                {data.hero?.description}
            </p>
        </div>
    );

    return (
        <div className="min-h-screen bg-[#FFFDF5] pt-32 pb-20 font-['Rubik'] overflow-x-clip">
            
            {/* 3. שימוש ב-Layout */}
            <SplitStickyLayout stickyContent={StickyHeader}>
                
                {/* צד שמאל: כרטיס אחד בודד (לכן אין map) */}
                <StickyCard top="120px">
                    <div className="relative w-full h-full min-h-[500px] rounded-[20px] overflow-hidden bg-gray-100 border-4 border-white shadow-inner group">
                        
                        {/* תמונה - שים לב לשימוש ב-optional chaining (?) למניעת קריסה */}
                        {data.hero?.image && (
                            <img 
                                src={data.hero.image} 
                                alt="רכזת רעים" 
                                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                            />
                        )}

                        <div className="absolute bottom-6 left-6 flex flex-col items-center">
                            <span className="text-[80px] font-black text-[#5E3BEE] font-['Salsa'] leading-none drop-shadow-sm bg-white/80 px-4 rounded-xl backdrop-blur-sm">
                                03
                            </span>
                        </div>
                    </div>
                </StickyCard>

            </SplitStickyLayout>

            <div className="mt-20 px-4 max-w-4xl mx-auto">
                 <NextChapterButton 
                    title="לפרק הבא"
                    subtitle="סיכום והגשת מועמדות"
                    onClick={onNext} 
                />
            </div>
        </div>
    );
};

export default Chapter3;