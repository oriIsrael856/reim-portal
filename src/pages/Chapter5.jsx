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
                <section className="mx-auto w-full max-w-[359px] rounded-t-[24px] bg-[linear-gradient(180deg,rgba(255,178,59,0.08)_0%,#fff_100%)] px-6 pb-[100px] pt-[60px]">
                    <div className="flex flex-col gap-[52px]">
                        <div className="flex flex-col gap-6">
                            <div className="relative flex w-full justify-end">
                                <span
                                    aria-hidden
                                    className="absolute right-0 top-5 h-2 w-[119px] rounded-[2px] bg-[#BCE079]"
                                />
                                <h2 className="relative z-[1] whitespace-pre-line text-right text-2xl font-bold leading-[1.334] text-[#001D26]">
                                    {'שיווק וגיוס\nמשתתפים ומשתתפות'}
                                </h2>
                            </div>
                            {marketingParagraphs.map((para, i) => (
                                <p key={i} className="whitespace-pre-line text-right text-base font-normal leading-[1.32] tracking-[0.009375em] text-[#001D26]">
                                    {para}
                                </p>
                            ))}
                        </div>

                        <div className="flex flex-col gap-3">
                            <h3 className="text-right text-xl font-semibold leading-[1.28] tracking-[0.0075em] text-[#001D26]">
                                {data.marketing?.stepsTitle ?? 'צעדי פעולה מרכזיים:'}
                            </h3>
                            <div className="[&_.ch3-acc]:w-full [&_.w-full]:w-full rounded-lg">
                                <Accordion items={data.marketing?.steps || []} />
                            </div>
                        </div>
                    </div>
                </section>

                {/* 3. למי כדאי לפנות? */}
                <section className="mx-auto w-full max-w-[359px] bg-[linear-gradient(180deg,rgba(255,178,59,0.08)_0%,#fff_100%)] px-6 pb-[100px] pt-6">
                    <div className="flex flex-col gap-[52px]">
                        <div className="flex w-full items-center justify-center">
                            <h2 className="text-center text-2xl font-bold leading-[1.334] text-[#001D26]">
                                {data.networking?.title ?? 'למי כדאי לפנות?'}
                            </h2>
                        </div>

                        <div className="flex flex-col gap-8">
                            {networkingCardsReversed.map((c, i) => (
                                <article
                                    key={i}
                                    className="relative flex flex-col items-stretch gap-2 rounded-lg border-[1.5px] border-[#001D26] bg-[linear-gradient(180deg,rgba(188,224,121,0.08)_0%,#fff_100%)] px-6 pb-6 pt-10 shadow-[2px_2px_0_#001D26]"
                                >
                                    <span
                                        aria-hidden
                                        className="absolute -top-6 left-1/2 flex h-10 w-10 -translate-x-1/2 items-center justify-center rounded-lg border-[1.5px] border-[#001D26] bg-[#BCE079]"
                                    >
                                        <span className="text-base leading-none text-white">✓</span>
                                    </span>

                                    <h3 className="text-center text-base font-medium leading-[1.22] tracking-[0.009375em] text-[#001D26]">
                                        {c.title}
                                    </h3>
                                    <p className="text-center text-base font-normal leading-[1.32] tracking-[0.009375em] text-[#001D26]">
                                        {c.text}
                                    </p>
                                </article>
                            ))}
                        </div>
                    </div>
                </section>

                {/* 4+5. משאבים: הרכזיה + ניוזלטר (Figma 254:13614) */}
                <section className="relative mx-auto flex w-full max-w-[359px] flex-col gap-6 px-6 py-20">
                    <div
                        aria-hidden
                        className="pointer-events-none absolute -left-[500px] -top-[50px] h-[1040px] w-[1360px] rounded-full bg-[rgba(101,70,222,0.08)] blur-[200px]"
                    />

                    <article
                        className="relative flex h-[460px] flex-col justify-end overflow-hidden rounded-3xl border-[1.5px] border-[#001D26] p-4"
                        style={{
                            backgroundImage: data.resources?.library?.image
                                ? `url(${data.resources.library.image})`
                                : undefined,
                            backgroundSize: 'cover',
                            backgroundPosition: 'center',
                        }}
                    >
                        <div className="flex flex-col gap-6 rounded-3xl border-[1.5px] border-[#001D26] bg-white p-4 shadow-[2px_2px_0_#001D26]">
                            <div className="flex flex-col gap-2 text-center">
                                <h3 className="text-2xl font-bold leading-[1.334] text-[#001D26]">
                                    {data.resources?.library?.title ?? 'הרכזיה'}
                                </h3>
                                <p className="whitespace-pre-line text-center text-base font-normal leading-[1.32] tracking-[0.009375em] text-[#001D26]">
                                    {data.resources?.library?.desc}
                                </p>
                            </div>
                            <button
                                type="button"
                                className="flex w-full items-center justify-between gap-3 rounded-[100px] border border-[#6546DE] bg-[#6546DE] px-6 py-2 text-white"
                            >
                                <span className="text-base font-bold uppercase leading-[1.625] tracking-[0.02875em]">
                                    {data.resources?.library?.btnText ?? 'הצגת מאגר'}
                                </span>
                                <span className="flex h-6 w-6 items-center justify-center rounded-full bg-white/20">
                                    <ArrowLeft size={14} strokeWidth={2.5} />
                                </span>
                            </button>
                        </div>
                    </article>

                    <NewsletterCard
                        data={{
                            subtitle: data.resources?.newsletter?.subtitle ?? 'השראות מיוחדות ישירות לתיבה שלך',
                            title: data.resources?.newsletter?.title ?? 'ניוזלטר רעים',
                            text:
                                data.resources?.newsletter?.text ??
                                'מנה חודשית מרוכזת של חדשנות, משחק ומיטב השראה מהשטח.',
                            placeholder:
                                data.resources?.newsletter?.placeholder ?? 'הקלידי את כתובת המייל שלך',
                        }}
                        className="w-full"
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
