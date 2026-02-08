import React from 'react';
import { ArrowLeft } from 'lucide-react';

const NextChapterButton = ({ title, subtitle, onClick }) => {
    return (
        // הקונטיינר החיצוני - דואג למרכז את הכפתור
        <div className="w-full max-w-5xl mx-auto px-6 mt-32 mb-24 relative z-30 flex justify-center items-center h-[200px]">
            <button 
                onClick={onClick}
                className="
                    group relative 
                    flex items-center justify-between 
                    h-[160px] rounded-[40px] px-6 md:px-12 
                    cursor-pointer overflow-hidden
                    
                    /* --- אנימציית הרוחב --- */
                    /* במצב רגיל: רחב מספיק לטקסט (600px). בהובר: מתרחב לכל המסך (100%) */
                    w-[90%] md:w-[650px] hover:w-full
                    
                    /* --- אנימציית הצבע והשקיפות --- */
                    bg-[#816AFE]/70 hover:bg-[#816AFE]
                    backdrop-blur-sm hover:backdrop-blur-none
                    border border-white/20 hover:border-transparent
                    
                    /* --- צללית --- */
                    shadow-xl hover:shadow-[0px_20px_60px_rgba(129,106,254,0.6)]
                    
                    /* --- תזמון --- */
                    transition-all duration-700 ease-[cubic-bezier(0.25,1,0.5,1)]
                "
            >
                {/* צד שמאל: הקופסה הלבנה עם החץ */}
                <div className="
                    bg-white h-16 w-16 md:h-20 md:w-20 
                    /* החץ מתרחב מעט בהובר */
                    group-hover:w-28
                    rounded-[24px] 
                    flex items-center justify-center 
                    shadow-md 
                    transition-all duration-500 ease-out
                    flex-shrink-0 z-20
                ">
                    <ArrowLeft 
                        size={32} 
                        color="#816AFE" 
                        strokeWidth={3} 
                        className="group-hover:-translate-x-1 transition-transform duration-500"
                    />
                </div>

                {/* צד ימין: טקסטים - תמיד גלויים */}
                {/* flex-grow דואג שהטקסט יתפוס את שאר המקום, text-right מצמיד לימין */}
                <div className="
                    flex flex-col justify-center text-right text-white 
                    flex-grow pr-6 md:pr-8
                    z-10
                ">
                    <h2 className="text-3xl md:text-5xl font-black mb-1 leading-tight whitespace-nowrap">
                        {title}
                    </h2>
                    
                    {/* הטקסט הזה נשאר גלוי תמיד */}
                    <p className="text-lg md:text-xl font-medium opacity-90 tracking-wide whitespace-nowrap pt-1">
                        {subtitle}
                    </p>
                </div>
            </button>
        </div>
    );
};

export default NextChapterButton;