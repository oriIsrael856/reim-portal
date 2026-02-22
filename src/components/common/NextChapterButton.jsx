import React from 'react';
import { ArrowLeft } from 'lucide-react';

const NextChapterButton = ({ title, subtitle, onClick }) => {
    const handleClick = () => {
        if (typeof onClick === 'function') onClick();
    };

    return (
        <>
            {/* מובייל: כרטיס סגול עם כותרת, תת־כותרת וכפתור חץ לבן במרכז למטה */}
            <div className="md:hidden w-full px-4 mt-12 mb-8">
                <button
                    type="button"
                    onClick={handleClick}
                    disabled={!onClick}
                    className="
                        w-full disabled:opacity-50 disabled:cursor-not-allowed
                        flex flex-col items-center justify-center
                        bg-[#5E3BEE] hover:bg-[#4a2ec6]
                        rounded-[40px] shadow-xl
                        pt-6 pb-4 px-5
                        text-white text-center
                        transition-colors
                    "
                >
                    <h2 className="text-xl font-black mb-1">{title}</h2>
                    <p className="text-sm font-medium opacity-90 mb-4">{subtitle}</p>
                    <div className="flex justify-center">
                        <span className="bg-white rounded-[16px] p-3 inline-flex items-center justify-center shadow-md">
                            <ArrowLeft size={24} color="#5E3BEE" strokeWidth={3} />
                        </span>
                    </div>
                </button>
            </div>

            {/* דסקטופ: עיצוב קיים */}
            <div className="hidden md:flex w-full max-w-5xl mx-auto px-6 mt-32 mb-24 relative z-30 justify-center items-center h-[200px]">
                <button
                    type="button"
                    onClick={handleClick}
                    disabled={!onClick}
                    className="
                        disabled:opacity-50 disabled:cursor-not-allowed
                        group relative
                        flex items-center justify-between
                        h-[160px] rounded-[40px] px-6 md:px-12
                        cursor-pointer overflow-hidden
                        w-[90%] md:w-[650px] hover:w-full
                        bg-[#816AFE]/70 hover:bg-[#816AFE]
                        backdrop-blur-sm hover:backdrop-blur-none
                        border border-white/20 hover:border-transparent
                        shadow-xl hover:shadow-[0px_20px_60px_rgba(129,106,254,0.6)]
                        transition-all duration-700 ease-[cubic-bezier(0.25,1,0.5,1)]
                    "
                >
                    <div className="bg-white h-16 w-16 md:h-20 md:w-20 group-hover:w-28 rounded-[24px] flex items-center justify-center shadow-md transition-all duration-500 ease-out flex-shrink-0 z-20">
                        <ArrowLeft size={32} color="#816AFE" strokeWidth={3} className="group-hover:-translate-x-1 transition-transform duration-500" />
                    </div>
                    <div className="flex flex-col justify-center text-right text-white flex-grow pr-6 md:pr-8 z-10">
                        <h2 className="text-3xl md:text-5xl font-black mb-1 leading-tight whitespace-nowrap">{title}</h2>
                        <p className="text-lg md:text-xl font-medium opacity-90 tracking-wide whitespace-nowrap pt-1">{subtitle}</p>
                    </div>
                </button>
            </div>
        </>
    );
};

export default NextChapterButton;
