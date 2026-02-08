import React from 'react';
import { Send } from 'lucide-react';

const HomeIntro = ({ data }) => {
    return (
        <div className="relative w-full max-w-[1200px] mx-auto px-4 -mt-10 z-20 mb-24">
            {/* אייקון מטוס בנייר */}
            <div className="absolute -top-8 left-1/2 transform -translate-x-1/2 z-20">
                <div className="bg-[#FFD028] p-3 rounded-2xl rotate-12 shadow-[4px_4px_0px_rgba(0,0,0,0.1)] border-2 border-white">
                    <Send className="text-white transform rotate-45" size={28} fill="white" />
                </div>
            </div>

            {/* הבוקסה הסגולה */}
            <div className="bg-[#5E3BEE] text-white rounded-[40px] px-8 py-16 md:px-32 md:py-20 text-center shadow-2xl relative overflow-hidden">
                <div className="relative z-10">
                    <h3 className="text-purple-200 text-sm font-bold mb-3 tracking-widest uppercase">{data.subtitle}</h3>
                    <h2 className="text-4xl md:text-5xl font-black mb-6">{data.title}</h2>
                    <p className="text-lg md:text-xl leading-relaxed opacity-90 max-w-4xl mx-auto font-light whitespace-pre-line">
                        {data.text}
                    </p>
                </div>
                
                {/* אלמנטים גרפיים ברקע (עיגולים עמומים) */}
                <div className="absolute top-[-50%] left-[-10%] w-[500px] h-[500px] bg-white/5 rounded-full blur-3xl pointer-events-none"></div>
                <div className="absolute bottom-[-50%] right-[-10%] w-[500px] h-[500px] bg-[#FFD028]/10 rounded-full blur-3xl pointer-events-none"></div>
            </div>
        </div>
    );
};
export default HomeIntro;