import React from 'react';
import { Send } from 'lucide-react';

const HomeIntro = ({ data }) => {
    return (
        <div className="relative w-full mx-auto z-20" style={{ maxWidth: 'min(1100px, 92vw)', paddingLeft: '0', paddingRight: '0', marginTop: 'clamp(1.5rem, 4vh, 3rem)', marginBottom: 'clamp(1rem, 4vh, 2rem)' }}>
            <div className="absolute left-1/2 transform -translate-x-1/2 z-20" style={{ top: '-1.25rem' }}>
                <div className="bg-[#FFB84C] md:bg-[#FFD028] rounded-lg rotate-12 shadow-[2px_2px_0px_rgba(0,0,0,0.1)] border-2 border-white" style={{ padding: 'clamp(0.25rem, 1vw, 0.5rem)' }}>
                    <Send className="text-white transform rotate-45" style={{ width: 'clamp(14px, 2vw, 20px)', height: 'clamp(14px, 2vw, 20px)' }} fill="white" />
                </div>
            </div>

            <div className="bg-[#5E3BEE] text-white rounded-2xl text-right md:text-center shadow-xl relative overflow-hidden" style={{ padding: 'clamp(1rem, 4vh, 1.5rem) clamp(1rem, 4%, 3rem)' }}>
                <div className="relative z-10 font-['Rubik']">
                    <h3 className="text-purple-200 font-bold tracking-widest uppercase" style={{ fontSize: 'clamp(0.55rem, 1.2vw, 0.65rem)', marginBottom: '0.25rem' }}>{data.subtitle}</h3>
                    <h2 className="font-black mb-2" style={{ fontSize: 'clamp(1.1rem, 2.5vw, 1.9rem)' }}>{data.title}</h2>
                    <p className="leading-snug opacity-90 font-light whitespace-pre-line md:mx-auto" style={{ fontSize: 'clamp(0.7rem, 1.4vw, 0.9rem)', maxWidth: '48rem' }}>
                        {data.text}
                    </p>
                </div>

                <div className="absolute top-[-50%] left-[-10%] w-[40vw] h-[40vw] max-w-[500px] max-h-[500px] bg-white/5 rounded-full blur-3xl pointer-events-none" />
                <div className="absolute bottom-[-50%] right-[-10%] w-[40vw] h-[40vw] max-w-[500px] max-h-[500px] bg-[#FFD028]/10 rounded-full blur-3xl pointer-events-none" />
            </div>
        </div>
    );
};
export default HomeIntro;