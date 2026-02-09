import React from 'react';
import { Layers, ArrowLeft, ExternalLink, Download } from 'lucide-react';
import AdminFeatureCard from '../components/chapter4/AdminFeatureCard';
import FlowStep from '../components/chapter4/FlowStep'; // אם עדיין יש שגיאה, שנה ל-'../components/chapter4/FlowStep.jsx'
import Accordion from '../components/common/Accordion';
import NextChapterButton from '../components/common/NextChapterButton';

const Chapter4 = ({ data, onNext }) => {
    if (!data) return <div className="p-20 text-center font-bold text-[#816AFE]">טוען נתוני עבודה מנהלית...</div>;

    return (
        <div className="min-h-screen bg-[#FFFDF5] pt-32 pb-20 font-['Rubik'] overflow-x-clip">
            
            {/* 1. Hero Section */}
            <header className="max-w-7xl mx-auto px-6 text-center mb-32 relative">
                <div className="inline-flex items-center gap-2 bg-[#C5E080] border-2 border-[#2D2D44] px-4 py-1.5 rounded-full mb-8 font-bold text-sm shadow-[3px_3px_0px_#2D2D44]">
                    <span>{data.hero?.tag}</span>
                    <div className="bg-white/40 px-2 rounded-full text-xs">04</div>
                </div>
                
                <div className="relative inline-block">
                    <h1 className="text-6xl md:text-8xl font-black text-[#2D2D44] relative z-10">
                        {data.hero?.title}
                        <span className="absolute bottom-4 right-0 w-full h-6 bg-[#FFB84C] -z-10 rounded-sm"></span>
                    </h1>
                    <Layers className="absolute -top-12 -right-16 text-[#816AFE] w-14 h-14 rotate-12 opacity-40 animate-pulse" />
                </div>
                
                <div className="text-[180px] font-black text-[#816AFE] absolute top-10 left-0 opacity-[0.03] font-['Salsa'] pointer-events-none">
                    04
                </div>
            </header>

            {/* 2. Feature Grid */}
            <section className="max-w-6xl mx-auto px-6 grid grid-cols-1 md:grid-cols-3 gap-10 mb-48">
                {data.features?.map(f => (
                    <AdminFeatureCard key={f.id} {...f} iconName={f.icon} />
                ))}
            </section>

            {/* 3. Nativ System Section */}
            <section className="max-w-7xl mx-auto px-6 mb-48">
                <div className="bg-white rounded-[50px] border-2 border-[#2D2D44] p-8 md:p-20 flex flex-col lg:flex-row gap-16 items-center shadow-[15px_15px_0px_rgba(45,45,68,0.05)]">
                    <div className="w-full lg:w-5/12">
                        <div className="bg-[#FFB84C] rounded-[40px] p-16 relative flex items-center justify-center aspect-square border-2 border-[#2D2D44]/10 shadow-inner">
                            <h2 className="text-6xl font-black text-white drop-shadow-lg">נתיב</h2>
                            <div className="absolute -bottom-6 -right-6 bg-[#C5E080] border-2 border-[#2D2D44] p-5 rounded-[20px] shadow-[4px_4px_0px_#2D2D44] cursor-pointer hover:scale-110 transition-transform">
                                <ExternalLink size={32} strokeWidth={2.5} />
                            </div>
                        </div>
                    </div>
                    
                    <div className="w-full lg:w-7/12 text-right">
                        <span className="text-[#816AFE] font-black tracking-widest text-sm block mb-4">הנחיות לרכזת</span>
                        <h2 className="text-5xl font-black mb-8 text-[#2D2D44]">{data.nativSystem?.title}</h2>
                        <p className="text-xl mb-12 leading-relaxed text-[#2D2D44]/80 font-medium">{data.nativSystem?.description}</p>
                        
                        <div className="space-y-6">
                            {data.nativSystem?.principles?.map((p, i) => (
                                <div key={i} className="flex items-start gap-4">
                                    <div className="mt-1 w-8 h-8 rounded-full bg-[#C5E080] border border-[#2D2D44]/10 flex items-center justify-center flex-shrink-0">
                                        <ArrowLeft size={18} strokeWidth={3} />
                                    </div>
                                    <p className="font-bold text-lg text-[#2D2D44]/90">{p}</p>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </section>

            {/* 4. Committees (Purple Section) */}
            <section className="bg-[#5E3BEE] py-32 mb-48 text-white relative rounded-[60px] md:rounded-none mx-4 md:mx-0 shadow-2xl">
                <div className="max-w-6xl mx-auto px-6 relative z-10">
                    <div className="text-center mb-20">
                        <h2 className="text-5xl md:text-6xl font-black mb-6">{data.committees?.title}</h2>
                        <p className="text-2xl opacity-90 max-w-3xl mx-auto leading-relaxed font-medium">{data.committees?.intro}</p>
                    </div>
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-16 text-[#2D2D44]">
                        {data.committees?.steps?.map(s => (
                            <FlowStep key={s.id} {...s} />
                        ))}
                    </div>
                    
                    <div className="text-center">
                        <p className="font-black text-xl text-[#C5E080] bg-white/10 py-4 px-8 rounded-full inline-block border border-white/20">
                            {data.committees?.footer}
                        </p>
                    </div>
                </div>
            </section>

            {/* 5. Q&A */}
            <section className="max-w-4xl mx-auto px-6 mb-48">
                <div className="text-center mb-16">
                    <h2 className="text-5xl font-black text-[#2D2D44]">שאלות ותשובות</h2>
                </div>
                <div className="bg-white rounded-[40px] p-6 md:p-10 shadow-xl border border-[#2D2D44]/5">
                    <Accordion items={data.qa || []} />
                </div>
            </section>

            {/* 6. Files */}
            <section className="max-w-6xl mx-auto px-6 mb-48">
                <div className="flex items-center gap-8 mb-16">
                    <h2 className="text-4xl font-black">נהלים וטפסים</h2>
                    <div className="h-1.5 flex-grow bg-[#2D2D44]/5 rounded-full"></div>
                </div>
                <div className="grid grid-cols-2 md:grid-cols-5 gap-8">
                    {data.files?.map((f, i) => (
                        <div key={i} className="bg-white border-2 border-dashed border-[#2D2D44]/15 rounded-[30px] p-8 flex flex-col items-center text-center hover:bg-[#F3F0FF] transition-all cursor-pointer group shadow-sm">
                            <Download size={32} className="text-[#816AFE] mb-4 group-hover:scale-110 transition-transform" />
                            <span className="font-black text-[#2D2D44] block mb-2">{f.name}</span>
                            <span className="text-xs font-bold text-[#2D2D44]/40">{f.desc}</span>
                        </div>
                    ))}
                </div>
            </section>

            <footer className="px-6 max-w-5xl mx-auto">
                <NextChapterButton 
                    title="לפרק הבא"
                    subtitle="פרק 05 - כלים מעשיים"
                    onClick={onNext}
                />
            </footer>
        </div>
    );
};

export default Chapter4;