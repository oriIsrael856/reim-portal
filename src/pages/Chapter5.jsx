import React from 'react';
import { ArrowLeft, Plus } from 'lucide-react';
import SplitStickyLayout from '../components/layout/SplitStickyLayout';
import Accordion from '../components/common/Accordion';
import CheckCard from '../components/chapter5/CheckCard';
import NextChapterButton from '../components/common/NextChapterButton';
import PrevChapterButton from '../components/common/PrevChapterButton';
import NewsletterCard from '../components/common/NewsletterCard';

const Chapter5 = ({ data, onNext, onPrev }) => {
    if (!data) return <div className="p-20 text-center font-bold text-[#816AFE]">טוען נתוני כלים מעשיים...</div>;

    const marketingParagraphs = (data.marketing?.text ?? '').split(/\n\n+/).filter(Boolean);
    const networkingCardsReversed = [...(data.networking?.cards ?? [])].reverse();

    const MarketingHeader = (
        <div className="text-right pr-4 md:pr-10">
            <h2 className="text-[#5E3BEE] font-black text-4xl mb-4">
                שיווק וגיוס
                <br />
                <span className="text-[#2D2D44]">משתתפים ומשתתפות</span>
            </h2>
            <div className="w-20 h-1.5 bg-[#C5E080] rounded-full mb-8"></div>
            <p className="text-lg leading-relaxed text-[#2D2D44]/80 whitespace-pre-line font-medium">
                {data.marketing?.text}
            </p>
        </div>
    );

    return (
        <div className="min-h-screen bg-[#FFFDF5] pt-24 pb-12 font-['Rubik']">
            {onPrev && (
                <div className="pt-6 pb-4 px-4">
                    <PrevChapterButton title="לפרק הקודם" subtitle="פרק 04 - עבודה מנהלית" onClick={onPrev} />
                </div>
            )}

            {/* ========== מובייל בלבד ========== */}
            <div className="md:hidden">
                {/* 1. Hero */}
                <section className="max-w-lg mx-auto px-4 pb-8">
                    <div className="rounded-[40px] overflow-hidden bg-[#FFFDF5] border-2 border-[#2D2D44]/10 shadow-[6px_6px_0px_rgba(45,45,68,0.08)] p-6 text-center">
                        <div className="inline-flex items-center gap-2 bg-[#C5E080] border-2 border-[#2D2D44] px-4 py-2 rounded-full mb-4 font-bold text-sm shadow-[3px_3px_0px_#2D2D44]">
                            <span>05</span>
                            <span>{data.hero?.tag}</span>
                        </div>
                        <h1 className="text-3xl font-black text-[#2D2D44] mb-2">
                            {data.hero?.title}
                        </h1>
                        <span className="inline-block w-24 h-2 bg-[#FFB84C] rounded-full" aria-hidden />
                    </div>
                </section>

                {/* 2. שיווק וגיוס משתתפים ומשתתפות */}
                <section className="max-w-lg mx-auto px-4 pb-8">
                    <div className="rounded-[40px] overflow-hidden bg-white border-2 border-[#2D2D44]/10 shadow-[6px_6px_0px_rgba(45,45,68,0.08)] p-6">
                        <h2 className="text-right mb-6">
                            <span className="text-[#5E3BEE] font-black text-xl">שיווק וגיוס</span>
                            <span className="block w-16 h-1 bg-[#C5E080] rounded-full mt-1 mb-2" aria-hidden />
                            <span className="text-[#2D2D44] font-black text-xl">משתתפים ומשתתפות</span>
                        </h2>
                        {marketingParagraphs.map((para, i) => (
                            <p key={i} className="text-[#2D2D44] text-base leading-relaxed text-right mb-4">
                                {para}
                            </p>
                        ))}
                        <h3 className="font-black text-lg text-[#2D2D44] text-right mb-4 mt-6">
                            {data.marketing?.stepsTitle}
                        </h3>
                        <div className="rounded-2xl overflow-hidden">
                            <Accordion items={data.marketing?.steps || []} />
                        </div>
                    </div>
                </section>

                {/* 3. למי כדאי לפנות? */}
                <section className="max-w-lg mx-auto px-4 pb-8">
                    <h2 className="text-2xl font-black text-[#2D2D44] text-center mb-6">
                        {data.networking?.title}
                    </h2>
                    <div className="space-y-4">
                        {networkingCardsReversed.map((c, i) => (
                            <div
                                key={i}
                                className="rounded-2xl overflow-hidden bg-[#F5F9ED] border-2 border-[#9AD063] p-5 pt-8 relative"
                            >
                                <div className="absolute -top-3 right-1/2 translate-x-1/2 w-10 h-10 rounded-xl bg-[#9AD063] flex items-center justify-center shadow-[2px_2px_0px_#2D2D44]">
                                    <span className="text-white font-black text-lg">✓</span>
                                </div>
                                <div className="text-right">
                                    <h4 className="font-black text-[#2D2D44] text-lg mb-2">{c.title}</h4>
                                    <p className="text-[#2D2D44]/80 text-sm leading-relaxed">{c.text}</p>
                                </div>
                            </div>
                        ))}
                    </div>
                </section>

                {/* 4. הרכזיה */}
                <section className="max-w-lg mx-auto px-4 pb-8">
                    <div className="rounded-[40px] overflow-hidden bg-white border-2 border-[#2D2D44]/10 shadow-[6px_6px_0px_rgba(45,45,68,0.08)]">
                        <div className="aspect-[4/3] bg-[#2D2D44]/5 overflow-hidden">
                            <img
                                src={data.resources?.library?.image}
                                alt=""
                                className="w-full h-full object-cover"
                            />
                        </div>
                        <div className="p-6 text-right">
                            <h3 className="text-2xl font-black text-[#2D2D44] mb-3">
                                {data.resources?.library?.title}
                            </h3>
                            <p className="text-[#2D2D44]/80 text-base leading-relaxed mb-6">
                                {data.resources?.library?.desc}
                            </p>
                            <button
                                type="button"
                                className="w-full sm:w-auto bg-[#5E3BEE] text-white px-6 py-3 rounded-full font-bold inline-flex items-center justify-center gap-2 hover:bg-[#4a2ec6] transition-colors shadow-md"
                            >
                                {data.resources?.library?.btnText}
                                <ArrowLeft size={20} strokeWidth={3} />
                            </button>
                        </div>
                    </div>
                </section>

                {/* 5. ניוזלטר רעים – אותן פרופורציות כמו בעמוד הבית */}
                <section className="max-w-lg mx-auto px-4 pb-8">
                    <NewsletterCard
                        data={data.resources?.newsletter}
                        className="w-full min-h-[clamp(220px,30vh,360px)] rounded-[40px] shadow-[6px_6px_0px_rgba(45,45,68,0.08)]"
                    />
                </section>

                {/* 6. כפתור סיום */}
                <div className="px-4 pb-8">
                    <NextChapterButton
                        title={data.nextButton?.title ?? 'סיימנו את האוגדן!'}
                        subtitle={data.nextButton?.subtitle ?? 'חזרה לעמוד הבית'}
                        onClick={onNext}
                    />
                </div>
            </div>

            {/* ========== דסקטופ בלבד ========== */}
            <div className="hidden md:block">
                <header className="max-w-7xl mx-auto px-6 text-center mb-40 relative">
                    <div className="inline-flex items-center gap-2 bg-[#C5E080] border-2 border-[#2D2D44] px-4 py-1.5 rounded-full mb-8 font-bold text-sm shadow-[3px_3px_0px_#2D2D44]">
                        <span>{data.hero?.tag}</span>
                        <div className="bg-white/40 px-2 rounded-full text-xs">05</div>
                    </div>
                    <h1 className="text-5xl md:text-6xl font-black text-[#2D2D44] relative z-10 mb-12">
                        {data.hero?.title}
                        <span className="absolute bottom-4 right-0 w-full h-6 bg-[#FFB84C] -z-10 rounded-sm"></span>
                    </h1>
                    <div className="relative max-w-5xl mx-auto h-[500px]">
                        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-3/5 h-full rounded-[40px] overflow-hidden border-4 border-white shadow-2xl z-20">
                            <img src={data.hero?.images?.[0]} className="w-full h-full object-cover" alt="כלים מעשיים" />
                        </div>
                        <div className="absolute top-20 left-10 w-1/4 aspect-square rounded-3xl overflow-hidden border-4 border-white shadow-xl rotate-[-6deg] z-10">
                            <img src={data.hero?.images?.[1]} className="w-full h-full object-cover" alt="פעילות קבוצתית" />
                        </div>
                        <div className="absolute bottom-10 right-10 w-1/4 aspect-square rounded-3xl overflow-hidden border-4 border-white shadow-xl rotate-[6deg] z-30">
                            <img src={data.hero?.images?.[2]} className="w-full h-full object-cover" alt="חברי רעים" />
                        </div>
                    </div>
                    <div className="text-[180px] font-black text-[#816AFE] absolute top-10 left-0 opacity-[0.05] font-['Rubik'] pointer-events-none">05</div>
                </header>

                <section className="mb-24">
                    <SplitStickyLayout stickyContent={MarketingHeader}>
                        <div className="bg-white rounded-[40px] p-8 md:p-12 shadow-sm border border-[#2D2D44]/5">
                            <h4 className="font-black text-2xl mb-8 text-center text-[#2D2D44] underline decoration-[#C5E080] decoration-4 underline-offset-8">
                                {data.marketing?.stepsTitle}
                            </h4>
                            <Accordion items={data.marketing?.steps || []} />
                        </div>
                    </SplitStickyLayout>
                </section>

                <section className="max-w-7xl mx-auto px-6 mb-48 text-center">
                    <h2 className="text-4xl font-black text-[#2D2D44] mb-12">{data.networking?.title}</h2>
                    <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-8">
                        {data.networking?.cards?.map((c, i) => (
                            <CheckCard key={i} title={c.title} text={c.text} />
                        ))}
                    </div>
                </section>

                {/* משאבים: שלושה כרטיסים ריבועיים – ספרייה | ניוזלטר (פרופורציות כמו בעמוד הבית) | תמונה */}
                <section className="max-w-[min(1600px,96vw)] mx-auto px-[4%] mb-24 grid grid-cols-1 lg:grid-cols-3 gap-[clamp(0.5rem,1.5vw,1rem)] w-full" style={{ minHeight: 'clamp(200px, 28vh, 320px)' }}>
                    <div className="w-full aspect-square max-w-full rounded-2xl overflow-hidden border-2 border-[#2D2D44] bg-white shadow-[8px_8px_0px_rgba(45,45,68,0.05)] flex flex-col">
                        <div className="flex-1 min-h-0 overflow-hidden">
                            <img src={data.resources?.library?.image} className="w-full h-full object-cover" alt="הרכזיה" />
                        </div>
                        <div className="p-4 lg:p-5 flex flex-col justify-between text-right shrink-0">
                            <div>
                                <h3 className="text-xl lg:text-2xl font-black mb-2 text-[#2D2D44]" style={{ fontSize: 'clamp(1rem, 1.8vw, 1.5rem)' }}>{data.resources?.library?.title}</h3>
                                <p className="text-[#2D2D44]/80 text-sm leading-relaxed font-medium line-clamp-2">
                                    {data.resources?.library?.desc}
                                </p>
                            </div>
                            <button type="button" className="mt-4 bg-[#5E3BEE] text-white px-5 py-2.5 rounded-full font-bold inline-flex items-center gap-2 hover:bg-[#4a2ec6] transition-all shadow-md hover:-translate-y-1 self-end text-sm">
                                <span className="w-6 h-6 rounded-full bg-white/20 flex items-center justify-center"><Plus size={14} strokeWidth={3} /></span>
                                {data.resources?.library?.btnText}
                            </button>
                        </div>
                    </div>

                    <NewsletterCard
                        data={data.resources?.newsletter}
                        className="w-full lg:aspect-square lg:max-w-full min-h-[clamp(220px,30vh,360px)] lg:min-h-0 rounded-2xl shadow-[8px_8px_0px_rgba(45,45,68,0.05)]"
                    />

                    <div className="w-full aspect-square max-w-full rounded-2xl overflow-hidden border-2 border-[#2D2D44] bg-white shadow-[8px_8px_0px_rgba(45,45,68,0.05)]">
                        {data.resources?.sideImage && (
                            <img src={data.resources.sideImage} alt="" className="w-full h-full object-cover" />
                        )}
                    </div>
                </section>

                <footer className="my-20 px-4 max-w-4xl mx-auto">
                    <NextChapterButton
                        title="סיימנו את האוגדן!"
                        subtitle="חזרה לעמוד הבית"
                        onClick={onNext}
                    />
                </footer>
            </div>
        </div>
    );
};

export default Chapter5;
