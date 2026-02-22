import React from 'react';
import { ArrowLeft, ExternalLink, Download, Heart, Layers } from 'lucide-react';
import AdminFeatureCard from '../components/chapter4/AdminFeatureCard';
import FlowStep from '../components/chapter4/FlowStep';
import Accordion from '../components/common/Accordion';
import NextChapterButton from '../components/common/NextChapterButton';
import PrevChapterButton from '../components/common/PrevChapterButton';

const PROCEDURES_INTRO = 'בקבצים המצורפים תוכלו למצוא את נהלי העבודה בתוכנית רעים: נהלים אלה נועדו לסייע בעבודה השוטפת, להעניק סדר וביטחון לפעילות בתוך ומחוץ למרכז הקהילתי.';

const Chapter4 = ({ data, onNext, onPrev }) => {
    if (!data) return <div className="p-20 text-center font-bold text-[#816AFE]">טוען נתוני עבודה מנהלית...</div>;

    const committeesSteps = [...(data.committees?.steps ?? [])].reverse();

    return (
        <div className="min-h-screen bg-[#FFFDF5] pt-24 pb-12 font-['Rubik']">
            {onPrev && (
                <div className="pt-6 pb-4 px-4">
                    <PrevChapterButton title="לפרק הקודם" subtitle="פרק 03 - תפקיד הרכזת" onClick={onPrev} />
                </div>
            )}

            {/* ========== מובייל בלבד ========== */}
            <div className="md:hidden">
                {/* 1. Hero */}
                <section className="max-w-lg mx-auto px-4 pb-8">
                    <div className="rounded-[40px] overflow-hidden bg-[#FFFDF5] border-2 border-[#2D2D44]/10 shadow-[6px_6px_0px_rgba(45,45,68,0.08)] p-6">
                        <div className="flex flex-col items-center text-center mb-6">
                            <div className="inline-flex items-center gap-2 bg-[#C5E080] border-2 border-[#2D2D44] px-4 py-2 rounded-full mb-4 font-bold text-sm shadow-[3px_3px_0px_#2D2D44]">
                                <span>04</span>
                                <span>{data.hero?.tag}</span>
                            </div>
                            <h1 className="text-3xl font-black text-[#5E3BEE] mb-2">
                                {data.hero?.title}
                            </h1>
                            <span className="inline-block w-24 h-2 bg-[#FFB84C] rounded-full" aria-hidden />
                        </div>
                        <div className="flex justify-center gap-3">
                            <a href="#committees" className="flex-1 flex flex-col items-center gap-1 p-3 rounded-2xl bg-white border border-[#2D2D44]/10 shadow-sm">
                                <span className="text-2xl" aria-hidden>👥</span>
                                <span className="text-xs font-bold text-[#2D2D44]">הועדות</span>
                            </a>
                            <a href="#nativ" className="flex-1 flex flex-col items-center gap-1 p-3 rounded-2xl bg-white border border-[#2D2D44]/10 shadow-sm">
                                <Heart className="w-6 h-6 text-[#5E3BEE]" strokeWidth={2} />
                                <span className="text-xs font-bold text-[#2D2D44]">מערכת נתיב</span>
                            </a>
                        </div>
                    </div>
                </section>

                {/* 2. מערכת נתיב */}
                <section id="nativ" className="max-w-lg mx-auto px-4 pb-8">
                    <div className="rounded-[40px] overflow-hidden bg-white border-2 border-[#2D2D44]/10 shadow-[6px_6px_0px_rgba(45,45,68,0.08)] p-6">
                        <p className="text-[#2D2D44]/70 font-bold text-sm text-right mb-1">{data.nativSystem?.label}</p>
                        <h2 className="text-2xl font-black text-[#2D2D44] text-right mb-4">{data.nativSystem?.title}</h2>
                        <p className="text-[#2D2D44] text-base leading-relaxed text-right mb-6">
                            {data.nativSystem?.description}
                        </p>
                        <h3 className="text-lg font-black text-[#2D2D44] text-right mb-4">עקרונות העבודה בנתיב:</h3>
                        <ul className="space-y-4 mb-6">
                            {(data.nativSystem?.principles ?? []).map((p, i) => (
                                <li key={i} className="flex items-start gap-3 text-right">
                                    <span className="flex-shrink-0 w-8 h-8 rounded-full bg-[#C5E080]/50 flex items-center justify-center mt-0.5">
                                        <ArrowLeft size={16} strokeWidth={3} className="text-[#2D2D44]" />
                                    </span>
                                    <span className="text-[#2D2D44] text-base">{p}</span>
                                </li>
                            ))}
                        </ul>
                        <h3 className="text-lg font-black text-[#2D2D44] text-right mb-2">תמיכה והדרכה:</h3>
                        <p className="text-[#2D2D44] text-base leading-relaxed text-right mb-6">
                            {data.nativSystem?.support}
                        </p>
                        <a
                            href="#"
                            className="flex items-center justify-between rounded-[24px] bg-[#FFB84C] border-2 border-[#2D2D44]/20 px-6 py-4 text-white shadow-[4px_4px_0px_rgba(45,45,68,0.15)]"
                        >
                            <span className="text-2xl font-black flex items-center gap-2">
                                <Heart className="w-7 h-7" fill="currentColor" stroke="none" />
                                נתיב
                            </span>
                            <span className="bg-[#C5E080] rounded-xl p-2.5 text-[#2D2D44]">
                                <ExternalLink size={20} strokeWidth={2.5} />
                            </span>
                        </a>
                    </div>
                </section>

                {/* 3. הועדות – כרטיס סגול */}
                <section id="committees" className="max-w-lg mx-auto px-4 pb-8">
                    <div className="rounded-[40px] overflow-hidden bg-[#5E3BEE] text-white p-6 shadow-xl">
                        <h2 className="text-2xl font-black text-center mb-4">{data.committees?.title}</h2>
                        <p className="text-white/95 text-center text-sm leading-relaxed mb-4">
                            {data.committees?.intro}
                        </p>
                        <p className="text-white font-medium text-sm mb-6">שלבי התהליך:</p>
                        <div className="space-y-4">
                            {committeesSteps.map((s) => (
                                <div
                                    key={s.id}
                                    className="bg-white/95 rounded-2xl p-4 pr-14 relative shadow-[4px_4px_0px_rgba(0,0,0,0.08)] text-[#2D2D44]"
                                >
                                    <div className="absolute top-3 right-3 w-10 h-10 rounded-full bg-[#C5E080] border-2 border-[#2D2D44] flex items-center justify-center font-black text-sm text-[#2D2D44] shadow-[2px_2px_0px_#2D2D44]">
                                        {s.id}
                                    </div>
                                    <h4 className="font-black text-lg mb-1">{s.title}</h4>
                                    <p className="text-sm text-[#2D2D44]/80 leading-relaxed">{s.desc}</p>
                                </div>
                            ))}
                        </div>
                        <p className="text-white/95 text-center text-sm mt-6 leading-relaxed">
                            {data.committees?.footer}
                        </p>
                    </div>
                </section>

                {/* 4. שאלות ותשובות */}
                <section className="max-w-lg mx-auto px-4 pb-8">
                    <div className="text-right mb-4">
                        <p className="text-[#2D2D44]/70 font-bold text-sm">כל מה שרצית לשאול</p>
                        <h2 className="text-2xl font-black text-[#2D2D44]">שאלות ותשובות</h2>
                    </div>
                    <div className="rounded-[40px] overflow-hidden bg-white border-2 border-[#2D2D44]/10 shadow-[6px_6px_0px_rgba(45,45,68,0.08)] p-4">
                        <Accordion items={data.qa || []} />
                    </div>
                </section>

                {/* 5. נהלים וטפסים */}
                <section className="max-w-lg mx-auto px-4 pb-8">
                    <div className="rounded-[40px] overflow-hidden bg-[#F7F4FA] border-2 border-[#2D2D44]/5 p-6">
                        <h2 className="text-2xl font-black text-[#2D2D44] text-center mb-3">
                            {data.filesTitle ?? 'נהלים וטפסים'}
                        </h2>
                        <p className="text-[#2D2D44] text-sm leading-relaxed text-right mb-6">
                            {data.proceduresIntro ?? PROCEDURES_INTRO}
                        </p>
                        <div className="flex gap-4 overflow-x-auto pb-2 -mx-1 scrollbar-hide">
                            {(data.files ?? []).map((f, i) => (
                                <div
                                    key={i}
                                    className="flex-shrink-0 w-[220px] rounded-2xl overflow-hidden bg-white border border-[#816AFE]/20 shadow-sm"
                                >
                                    <div className="aspect-[4/3] bg-[#2D2D44]/5 flex items-center justify-center">
                                        <div className="w-full h-full opacity-20 bg-[repeating-conic-gradient(#816AFE_0%_25%,transparent_0%_50%)] [background-size:12px_12px]" aria-hidden />
                                    </div>
                                    <div className="p-4 text-center">
                                        <div className="w-12 h-12 rounded-full bg-[#5E3BEE] flex items-center justify-center mx-auto mb-2">
                                            <Download size={22} className="text-white" />
                                        </div>
                                        <p className="font-bold text-[#2D2D44] text-sm">{f.name}</p>
                                        <p className="text-xs text-[#2D2D44]/60 mt-0.5">{f.desc}</p>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </section>

                {/* 6. כפתור לפרק הבא */}
                <div className="px-4 pb-8">
                    <NextChapterButton
                        title={data.nextButton?.title ?? 'לפרק הבא'}
                        subtitle={data.nextButton?.subtitle ?? 'פרק 05 - כלים מעשיים'}
                        onClick={onNext}
                    />
                </div>
            </div>

            {/* ========== דסקטופ בלבד ========== */}
            <div className="hidden md:block">
                <header className="max-w-7xl mx-auto px-6 text-center mb-20 relative">
                    <div className="inline-flex items-center gap-2 bg-[#C5E080] border-2 border-[#2D2D44] px-4 py-1.5 rounded-full mb-8 font-bold text-sm shadow-[3px_3px_0px_#2D2D44]">
                        <span>{data.hero?.tag}</span>
                        <div className="bg-white/40 px-2 rounded-full text-xs">04</div>
                    </div>
                    <div className="relative inline-block">
                        <h1 className="text-5xl md:text-6xl font-black text-[#2D2D44] relative z-10">
                            {data.hero?.title}
                            <span className="absolute bottom-4 right-0 w-full h-6 bg-[#FFB84C] -z-10 rounded-sm"></span>
                        </h1>
                        <Layers className="absolute -top-12 -right-16 text-[#816AFE] w-14 h-14 rotate-12 opacity-40 animate-pulse" />
                    </div>
                    <div className="text-[180px] font-black text-[#816AFE] absolute top-10 left-0 opacity-[0.03] font-['Rubik'] pointer-events-none">
                        04
                    </div>
                </header>

                <section className="max-w-6xl mx-auto px-6 grid grid-cols-1 md:grid-cols-3 gap-8 mb-24">
                    {data.features?.map(f => (
                        <AdminFeatureCard key={f.id} {...f} iconName={f.icon} />
                    ))}
                </section>

                <section className="max-w-7xl mx-auto px-6 mb-24">
                    <div className="bg-white rounded-[50px] border-2 border-[#2D2D44] p-8 md:p-20 flex flex-col lg:flex-row gap-16 items-center shadow-[15px_15px_0px_rgba(45,45,68,0.05)]">
                        <div className="w-full lg:w-5/12">
                            <div className="bg-[#FFB84C] rounded-[40px] p-16 relative flex items-center justify-center aspect-square border-2 border-[#2D2D44]/10 shadow-inner">
                                <h2 className="text-4xl font-black text-white drop-shadow-lg">נתיב</h2>
                                <div className="absolute -bottom-6 -right-6 bg-[#C5E080] border-2 border-[#2D2D44] p-5 rounded-[20px] shadow-[4px_4px_0px_#2D2D44] cursor-pointer hover:scale-110 transition-transform">
                                    <ExternalLink size={32} strokeWidth={2.5} />
                                </div>
                            </div>
                        </div>
                        <div className="w-full lg:w-7/12 text-right">
                            <span className="text-[#816AFE] font-black tracking-widest text-sm block mb-4">הנחיות לרכזת</span>
                            <h2 className="text-4xl font-black mb-6 text-[#2D2D44]">{data.nativSystem?.title}</h2>
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

                <section className="bg-[#5E3BEE] py-20 mb-24 text-white relative rounded-[60px] md:rounded-none mx-4 md:mx-0 shadow-2xl">
                    <div className="max-w-6xl mx-auto px-6 relative z-10">
                        <div className="text-center mb-12">
                            <h2 className="text-4xl md:text-5xl font-black mb-4">{data.committees?.title}</h2>
                            <p className="text-xl opacity-90 max-w-3xl mx-auto leading-relaxed font-medium">{data.committees?.intro}</p>
                        </div>
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12 text-[#2D2D44]">
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

                <section className="max-w-4xl mx-auto px-6 mb-24">
                    <div className="text-center mb-10">
                        <h2 className="text-4xl font-black text-[#2D2D44]">שאלות ותשובות</h2>
                    </div>
                    <div className="bg-white rounded-[40px] p-6 md:p-10 shadow-xl border border-[#2D2D44]/5">
                        <Accordion items={data.qa || []} />
                    </div>
                </section>

                <section className="max-w-6xl mx-auto px-6 mb-24">
                    <div className="flex items-center gap-6 mb-10">
                        <h2 className="text-3xl font-black">נהלים וטפסים</h2>
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
        </div>
    );
};

export default Chapter4;
