import React from 'react';
import { ArrowLeft } from 'lucide-react';
import NextChapterButton from '../components/common/NextChapterButton';
import PrevChapterButton from '../components/common/PrevChapterButton';
import StickyCard from '../components/common/StickyCard';
import SplitStickyLayout from '../components/layout/SplitStickyLayout';
import ProcessCard from '../components/common/ProcessCard';
import Accordion from '../components/common/Accordion';
import { Chapter3MobileView } from '../components/chapter3/mobile';
import '../styles/chapter3-mobile.css';

const Chapter3 = ({ data, content, onNext, onPrev }) => {
    if (!data) return <div className="text-center p-20 text-[#816AFE] font-bold">טוען נתוני פרק 3...</div>;

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

            <div className="absolute top-40 -right-10 text-6xl text-[#EF4444] animate-pulse hidden md:block">✶</div>
            <div className="absolute bottom-0 left-10 text-4xl text-[#C5E080] hidden md:block">✦</div>
        </div>
    );

    return (
        <div className="min-h-screen bg-[#FFFDF5] pt-24 pb-0 font-['Rubik']">
            {onPrev && (
                <div className="pt-6 pb-4 px-4">
                    <PrevChapterButton title="לפרק הקודם" subtitle="פרק 02 - המשתתפים" onClick={onPrev} />
                </div>
            )}

            <Chapter3MobileView data={data} onNext={onNext} footerData={content?.footer} />

            <div className="hidden md:block">
                <SplitStickyLayout stickyContent={StickyHeader}>
                    <StickyCard top="100px">
                        <div className="relative w-full h-full min-h-[500px] rounded-[20px] overflow-hidden bg-gray-100 border-4 border-white shadow-inner group">
                            <img
                                src={data.hero?.image}
                                alt="רכזת רעים"
                                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                            />
                            <div className="absolute bottom-6 left-6 flex flex-col items-center">
                                <span className="text-6xl font-black text-[#5E3BEE] font-['Rubik'] leading-none drop-shadow-sm bg-white/80 px-4 rounded-xl backdrop-blur-sm">
                                    03
                                </span>
                            </div>
                        </div>
                    </StickyCard>

                    {data.responsibilities &&
                        data.responsibilities.map((card, index) => (
                            <StickyCard key={index} top={`${140 + index * 40}px`}>
                                <div className="flex flex-col h-full justify-center p-4">
                                    <h3
                                        className={`text-3xl md:text-4xl font-black mb-8 text-center ${card.titleColor || 'text-[#2D2D44]'}`}
                                    >
                                        {card.title}
                                    </h3>
                                    <ul className="flex flex-col gap-4 pr-4">
                                        {card.items.map((item, idx) => (
                                            <li key={idx} className="flex items-start gap-3 text-lg text-[#2D2D44] leading-snug">
                                                <div className="mt-1 flex-shrink-0 bg-[#EBE5FC] p-1 rounded-full text-[#5E3BEE]">
                                                    <ArrowLeft size={16} strokeWidth={3} />
                                                </div>
                                                <span>{item}</span>
                                            </li>
                                        ))}
                                    </ul>
                                    {card.action && (
                                        <div className="mt-8 text-center">
                                            <button
                                                type="button"
                                                className="bg-[#5E3BEE] text-white px-6 py-3 rounded-full font-bold hover:bg-[#4a2ec6] transition-colors shadow-md flex items-center gap-2 mx-auto transition-transform hover:scale-105"
                                            >
                                                {card.action.text}
                                                <ArrowLeft size={18} />
                                            </button>
                                        </div>
                                    )}
                                </div>
                            </StickyCard>
                        ))}
                </SplitStickyLayout>

                {data.onboarding && (
                    <div className="ch3-desktop-onboard relative mt-32 w-full overflow-hidden border-t border-[#001d26]/10">
                        <div className="ch3-desktop-onboard__blob pointer-events-none absolute" aria-hidden />
                        <div className="relative z-[1] mx-auto max-w-[1600px] px-6 py-16 md:px-12 md:py-24">
                            <div className="ch3-desktop-onboard__intro mx-auto mb-12 max-w-3xl md:mb-16">
                                <div className="ch3-desktop-onboard__headerFrame relative">
                                    <div className="ch3-onboard__accentLine" aria-hidden />
                                    <p className="ch3-onboard__kicker">{data.onboarding.titleTop}</p>
                                    <h2 className="ch3-onboard__title text-3xl md:text-4xl">{data.onboarding.titleBottom}</h2>
                                </div>
                                <p className="ch3-onboard__intro mt-6 text-lg md:text-xl">{data.onboarding.description}</p>
                            </div>

                            <div className="grid grid-cols-1 gap-8 md:grid-cols-2 md:gap-x-8 md:gap-y-10 lg:grid-cols-3 xl:grid-cols-4">
                                {data.onboarding.steps.map((step, index) => (
                                    <div key={step.id ?? index} className="h-full min-h-0">
                                        <ProcessCard
                                            number={step.id}
                                            step={step.step}
                                            title={step.title}
                                            items={step.items}
                                            showStar={index === data.onboarding.steps.length - 1}
                                        />
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                )}

                {data.sessionStructure && (
                    <div className="w-full bg-white py-32 px-6 overflow-hidden border-t border-gray-100">
                        <div className="max-w-[1400px] mx-auto">
                            <div className="mb-20 w-full text-start">
                                <span className="mb-2 block text-sm font-bold uppercase tracking-widest text-[#5E3BEE]">
                                    {data.sessionStructure.recommendation}
                                </span>
                                <h2 className="text-4xl font-black text-[#2D2D44] md:text-5xl">
                                    {data.sessionStructure.title}
                                </h2>
                            </div>

                            <div className="flex flex-col lg:flex-row items-start gap-16 md:gap-24">
                                <div className="w-full lg:w-5/12 relative min-h-[500px] hidden md:block">
                                    <div className="absolute top-0 right-0 w-[85%] aspect-video rounded-[30px] overflow-hidden border-[3px] border-[#2D2D44] shadow-[12px_12px_0px_rgba(45,45,68,0.1)] rotate-[-3deg] hover:rotate-0 transition-transform duration-500 z-20">
                                        <img src={data.sessionStructure.images[0]} alt="פיצה" className="w-full h-full object-cover" />
                                    </div>
                                    <div className="absolute -bottom-10 left-0 w-[70%] aspect-video rounded-[30px] overflow-hidden border-[3px] border-[#2D2D44] shadow-[12px_12px_0px_rgba(45,45,68,0.1)] rotate-[4deg] hover:rotate-0 transition-transform duration-500 z-30">
                                        <img src={data.sessionStructure.images[1]} alt="מעגל" className="w-full h-full object-cover" />
                                    </div>
                                </div>

                                <div className="w-full lg:w-7/12">
                                    <div className="bg-[#FDFBFF] p-2 md:p-8 rounded-[40px] border-2 border-[#816AFE]/5 shadow-sm">
                                        <Accordion items={data.sessionStructure.items} />
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                )}

                <div className="my-32 px-4 max-w-4xl mx-auto">
                    <NextChapterButton
                        title="סיימנו את פרק 3"
                        subtitle="פרק 04 - עבודה מנהלית"
                        onClick={onNext}
                    />
                </div>
            </div>
        </div>
    );
};

export default Chapter3;
