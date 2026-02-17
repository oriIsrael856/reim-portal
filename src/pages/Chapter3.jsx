import React from 'react';
import { ArrowLeft, ChevronDown, Facebook, Instagram, Linkedin, Plus, Star, Twitter } from 'lucide-react';
import NextChapterButton from '../components/common/NextChapterButton';
import PrevChapterButton from '../components/common/PrevChapterButton';
import StickyCard from '../components/common/StickyCard';
import SplitStickyLayout from '../components/layout/SplitStickyLayout';
import ProcessCard from '../components/common/ProcessCard';
import Accordion from '../components/common/Accordion';

const MOBILE_TAGLINE = 'שווה לחיות ביחד';

const Chapter3 = ({ data, content, onNext, onPrev }) => {
    // הגנה מפני קריסה במקרה של חוסר בנתונים
    if (!data) return <div className="text-center p-20 text-[#816AFE] font-bold">טוען נתוני פרק 3...</div>;

    // --- מובייל בלבד: חלק 1 – כרטיס הגדרת תפקיד ---
    const MobilePart1 = () => (
        <div className="md:hidden w-full max-w-lg mx-auto px-2 pb-8">
            <div className="rounded-[40px] overflow-hidden bg-[#FFFDF5] border-2 border-[#2D2D44]/10 shadow-[6px_6px_0px_rgba(45,45,68,0.08)]">
                {/* פס סגול + לוגו ותגית */}
                <div className="bg-[#5E3BEE] px-5 py-4 flex items-center gap-3">
                    <div className="w-12 h-12 rounded-xl bg-white flex items-center justify-center flex-shrink-0 overflow-hidden">
                        <img src="/Logo (1).png" alt="" className="w-8 h-8 object-contain" onError={(e) => { e.target.style.display = 'none'; }} />
                    </div>
                    <div className="flex-1 min-w-0">
                        <p className="text-white font-black text-lg leading-tight">רעים</p>
                        <p className="text-white/90 text-sm">{MOBILE_TAGLINE}</p>
                    </div>
                </div>
                <div className="p-6 pt-5">
                    {/* תגית פרק */}
                    <div className="flex items-center gap-2 mb-6">
                        <span className="text-[#EF4444] text-xl" aria-hidden>✶</span>
                        <div className="inline-flex items-center gap-2 bg-[#C5E080] border-2 border-black px-4 py-2 rounded-full shadow-[3px_3px_0px_black] transform -rotate-1">
                            <span className="font-bold text-[#2D2D44] text-sm">{data.hero?.tag}</span>
                            <span className="bg-[#2D2D44] text-white text-xs font-bold w-6 h-6 rounded-full flex items-center justify-center">03</span>
                        </div>
                        <span className="w-2 h-2 rounded-full bg-[#C5E080]" aria-hidden />
                    </div>
                    {/* כותרת */}
                    <h1 className="text-2xl font-black text-[#2D2D44] text-right mb-2">
                        {data.hero?.titleTop}
                    </h1>
                    <p className="text-right mb-4">
                        <span className="text-xl font-bold text-[#2D2D44] relative inline-block">
                            {data.hero?.titleBottom}
                            <span className="absolute bottom-0 right-0 w-full h-2 bg-[#FFD028] -z-10 rounded-sm transform -rotate-1" aria-hidden />
                        </span>
                        <Star className="inline-block w-5 h-5 text-[#2D2D44]/40 mr-1 align-middle" strokeWidth={1.5} />
                    </p>
                    <p className="text-[#2D2D44] text-base leading-relaxed text-right">
                        {data.hero?.description}
                    </p>
                    {/* קו מקווקו דקורטיבי בתחתית */}
                    <div className="mt-8 pt-4 border-t border-dashed border-[#2D2D44]/10" aria-hidden />
                </div>
            </div>
        </div>
    );

    // --- מובייל בלבד: חלק 2 – מדריך לרכזת מתחילה ---
    const MobilePart2 = () => {
        if (!data.onboarding) return null;
        const { titleTop, titleBottom, description, steps } = data.onboarding;
        return (
            <div className="md:hidden w-full px-4 pb-8">
                <div className="max-w-lg mx-auto rounded-[40px] overflow-hidden bg-[#F3F0FF] border-2 border-[#2D2D44]/10 shadow-[6px_6px_0px_rgba(45,45,68,0.08)]">
                    <div className="p-6 md:p-8">
                        <p className="text-[#2D2D44]/60 font-bold text-sm text-center mb-1">{titleTop}</p>
                        <h2 className="text-2xl md:text-3xl font-black text-[#5E3BEE] text-center mb-2">
                            {titleBottom}
                        </h2>
                        <span className="block w-16 h-1 bg-[#FFB84C] rounded-full mx-auto mb-4" aria-hidden />
                        <p className="text-[#2D2D44] text-base leading-relaxed text-center whitespace-pre-line mb-8">
                            {description}
                        </p>
                        <div className="flex flex-col gap-6">
                            {steps && steps.map((step, index) => (
                                <ProcessCard
                                    key={index}
                                    number={step.id}
                                    step={step.step}
                                    title={step.title}
                                    items={step.items || []}
                                />
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        );
    };

    // --- מובייל בלבד: חלק 3 – האחריות היומיומית בלבד ---
    const MobilePart3 = () => {
        if (!data.responsibilities?.length) return null;
        const part3Cards = data.responsibilities.filter((_, index) => index === 0);
        return (
            <div className="md:hidden w-full px-4 pb-8">
                <div className="max-w-lg mx-auto flex flex-col gap-6">
                    {part3Cards.map((card, index) => (
                        <div
                            key={index}
                            className="rounded-[40px] overflow-hidden bg-white border-2 border-[#2D2D44]/10 shadow-[6px_6px_0px_rgba(45,45,68,0.08)]"
                        >
                            <div className="p-6">
                                <h3 className={`text-xl font-black text-right mb-6 ${card.titleColor || 'text-[#5E3BEE]'}`}>
                                    {card.title}
                                </h3>
                                <ul className="flex flex-col gap-4 pr-0">
                                    {card.items.map((item, idx) => (
                                        <li key={idx} className="flex items-start gap-3 text-right text-[#2D2D44] text-base leading-snug">
                                            <div className="mt-1 flex-shrink-0 bg-[#EBE5FC] p-1 rounded-full text-[#5E3BEE]">
                                                <ArrowLeft size={16} strokeWidth={3} />
                                            </div>
                                            <span>{item}</span>
                                        </li>
                                    ))}
                                </ul>
                                {card.action && (
                                    <div className="mt-6 text-center">
                                        <button
                                            type="button"
                                            className="bg-[#5E3BEE] text-white px-6 py-3 rounded-full font-bold hover:bg-[#4a2ec6] transition-colors shadow-md flex items-center gap-2 mx-auto"
                                        >
                                            {card.action.text}
                                            <ArrowLeft size={18} />
                                        </button>
                                    </div>
                                )}
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        );
    };

    // --- מובייל בלבד: חלק 4 – למידה והדרכה (כרטיס ייעודי עם לוגו וכותרת בכתום) ---
    const MobilePart4 = () => {
        const card = data.responsibilities?.find((c) => c.title === 'למידה והדרכה');
        if (!card) return null;
        return (
            <div className="md:hidden w-full max-w-lg mx-auto px-4 pb-8">
                <div className="rounded-[40px] overflow-hidden bg-white border-2 border-[#2D2D44]/10 shadow-[6px_6px_0px_rgba(45,45,68,0.08)]">
                    {/* פס לוגו בראש הכרטיס */}
                    <div className="bg-white border-b border-[#2D2D44]/5 px-5 py-4 flex items-center gap-3">
                        <div className="w-12 h-12 rounded-xl bg-[#5E3BEE] flex items-center justify-center flex-shrink-0 overflow-hidden">
                            <img src="/Logo (1).png" alt="" className="w-8 h-8 object-contain opacity-90" onError={(e) => { e.target.style.display = 'none'; }} />
                        </div>
                        <div className="flex-1 min-w-0">
                            <p className="text-[#5E3BEE] font-black text-lg leading-tight">רעים</p>
                            <p className="text-[#2D2D44]/70 text-sm">{MOBILE_TAGLINE}</p>
                        </div>
                    </div>
                    <div className="p-6">
                        <h3 className="text-2xl font-black text-[#FFB84C] text-right mb-6 leading-tight">
                            למידה<br />והדרכה
                        </h3>
                        <ul className="flex flex-col gap-4 pr-0">
                            {card.items.map((item, idx) => (
                                <li key={idx} className="flex items-start gap-3 text-right text-[#2D2D44] text-base leading-snug">
                                    <div className="mt-1 flex-shrink-0 bg-[#FFB84C]/20 p-1 rounded-full text-[#FFB84C]">
                                        <ArrowLeft size={16} strokeWidth={3} />
                                    </div>
                                    <span>{item}</span>
                                </li>
                            ))}
                        </ul>
                    </div>
                </div>
            </div>
        );
    };

    // --- מובייל בלבד: חלק 5 – עבודה מנהלית (כרטיס ייעודי עם לוגו וכותרת באדום) ---
    const MobilePart5 = () => {
        const card = data.responsibilities?.find((c) => c.title === 'עבודה מנהלית');
        if (!card) return null;
        return (
            <div className="md:hidden w-full max-w-lg mx-auto px-4 pb-8">
                <div className="rounded-[40px] overflow-hidden bg-white border-2 border-[#2D2D44]/10 shadow-[6px_6px_0px_rgba(45,45,68,0.08)]">
                    {/* פס לוגו בראש הכרטיס */}
                    <div className="bg-white border-b border-[#2D2D44]/5 px-5 py-4 flex items-center gap-3">
                        <div className="w-12 h-12 rounded-xl bg-[#5E3BEE] flex items-center justify-center flex-shrink-0 overflow-hidden">
                            <img src="/Logo (1).png" alt="" className="w-8 h-8 object-contain opacity-90" onError={(e) => { e.target.style.display = 'none'; }} />
                        </div>
                        <div className="flex-1 min-w-0">
                            <p className="text-[#5E3BEE] font-black text-lg leading-tight">רעים</p>
                            <p className="text-[#2D2D44]/70 text-sm">{MOBILE_TAGLINE}</p>
                        </div>
                    </div>
                    <div className="p-6">
                        <h3 className="text-2xl font-black text-[#EF4444] text-right mb-6 leading-tight">
                            עבודה<br />מנהלית
                        </h3>
                        <ul className="flex flex-col gap-4 pr-0">
                            {card.items.map((item, idx) => (
                                <li key={idx} className="flex items-start gap-3 text-right text-[#2D2D44] text-base leading-snug">
                                    <div className="mt-1 flex-shrink-0 bg-[#EF4444]/15 p-1 rounded-full text-[#EF4444]">
                                        <ArrowLeft size={16} strokeWidth={3} />
                                    </div>
                                    <span>{item}</span>
                                </li>
                            ))}
                        </ul>
                        {card.action && (
                            <div className="mt-6 text-center">
                                <button
                                    type="button"
                                    className="bg-[#5E3BEE] text-white px-6 py-3 rounded-full font-bold hover:bg-[#4a2ec6] transition-colors shadow-md flex items-center gap-2 mx-auto"
                                >
                                    {card.action.text}
                                    <ArrowLeft size={18} />
                                </button>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        );
    };

    // --- מובייל בלבד: חלק 6 – מבנה המפגש (אקורדיון) ---
    const MobilePart6 = () => {
        const session = data.sessionStructure;
        if (!session?.items?.length) return null;
        return (
            <div className="md:hidden w-full max-w-lg mx-auto px-4 pb-8">
                <div className="rounded-[40px] overflow-hidden bg-white border-2 border-[#2D2D44]/10 shadow-[6px_6px_0px_rgba(45,45,68,0.08)]">
                    <div className="p-6">
                        {session.recommendation && (
                            <span className="text-[#5E3BEE] font-bold text-xs tracking-widest uppercase block text-center mb-2">
                                {session.recommendation}
                            </span>
                        )}
                        <h2 className="text-2xl font-black text-[#2D2D44] text-center mb-6">
                            {session.title}
                        </h2>
                        <div className="bg-[#FDFBFF] rounded-2xl border border-[#816AFE]/10 p-3">
                            <Accordion items={session.items} />
                        </div>
                    </div>
                </div>
            </div>
        );
    };

    // --- רכיב עזר: כרטיס זרימה לצעד בודד ---
    const MobileFlowStepCard = ({ step, showConnector }) => (
        <>
            <div className="relative bg-white border-2 border-[#2D2D44]/10 rounded-2xl p-5 mb-4 shadow-sm">
                <div className="absolute top-4 left-4 w-10 h-10 bg-[#C5E080] border-2 border-[#2D2D44] rounded-full flex items-center justify-center font-black text-sm text-[#2D2D44] shadow-[2px_2px_0px_#2D2D44]">
                    {step.id}
                </div>
                <div className="pr-12 text-right">
                    <span className="text-sm font-bold text-[#2D2D44]/60 block">{step.step}</span>
                    <h3 className="text-xl font-black text-[#2D2D44] mt-0.5 mb-4">{step.title}</h3>
                    <ul className="flex flex-col gap-3">
                        {(step.items || []).map((item, idx) => (
                            <li key={idx} className="flex items-start gap-3 text-right text-[#2D2D44] text-sm leading-snug">
                                <div className="mt-0.5 flex-shrink-0 bg-[#C5E080]/40 p-1 rounded-full text-[#2D2D44]">
                                    <ArrowLeft size={14} strokeWidth={3} />
                                </div>
                                <span>{item}</span>
                            </li>
                        ))}
                    </ul>
                </div>
            </div>
            {showConnector && (
                <div className="flex flex-col items-center py-1 mb-2">
                    <div className="h-4 w-0 border-r-2 border-dashed border-[#2D2D44]/30" aria-hidden />
                    <ChevronDown className="w-5 h-5 text-[#5E3BEE] shrink-0" aria-hidden />
                    <div className="h-4 w-0 border-r-2 border-dashed border-[#2D2D44]/30" aria-hidden />
                </div>
            )}
        </>
    );

    // --- מובייל בלבד: חלק 7 – צעדים 1–3 (תצוגת זרימה) ---
    const MobilePart7 = () => {
        const { steps } = data.onboarding || {};
        if (!steps?.length) return null;
        const part7Steps = steps.slice(0, 3);
        const firstStepTitle = part7Steps[0]?.title || 'כניסה למרכז קהילתי';
        return (
            <div className="md:hidden w-full max-w-lg mx-auto px-4 pb-8">
                <div className="rounded-[40px] overflow-hidden bg-white border-2 border-[#2D2D44]/10 shadow-[6px_6px_0px_rgba(45,45,68,0.08)]">
                    <div className="bg-[#F3F0FF] border-b border-[#2D2D44]/5 px-5 py-4">
                        <div className="flex items-center gap-3 mb-3">
                            <div className="w-12 h-12 rounded-xl bg-[#5E3BEE] flex items-center justify-center flex-shrink-0 overflow-hidden">
                                <img src="/Logo (1).png" alt="" className="w-8 h-8 object-contain opacity-90" onError={(e) => { e.target.style.display = 'none'; }} />
                            </div>
                            <div className="flex-1 min-w-0">
                                <p className="text-[#5E3BEE] font-black text-lg leading-tight">רעים</p>
                                <p className="text-[#2D2D44]/70 text-sm">{MOBILE_TAGLINE}</p>
                            </div>
                        </div>
                        <p className="text-[#2D2D44] font-bold text-center">{firstStepTitle}</p>
                    </div>
                    <div className="p-4">
                        {part7Steps.map((step, index) => (
                            <React.Fragment key={index}>
                                <MobileFlowStepCard step={step} showConnector={index < part7Steps.length - 1} />
                            </React.Fragment>
                        ))}
                    </div>
                </div>
            </div>
        );
    };

    // --- מובייל בלבד: חלק 8 – צעדים 4–10 (המשך זרימה) ---
    const MobilePart8 = () => {
        const { steps } = data.onboarding || {};
        if (!steps?.length) return null;
        const part8Steps = steps.slice(3);
        if (part8Steps.length === 0) return null;
        const sectionTitle = part8Steps[0]?.title || 'המשך הצעדים';
        return (
            <div className="md:hidden w-full max-w-lg mx-auto px-4 pb-8">
                <div className="rounded-[40px] overflow-hidden bg-white border-2 border-[#2D2D44]/10 shadow-[6px_6px_0px_rgba(45,45,68,0.08)]">
                    <div className="bg-[#F3F0FF] border-b border-[#2D2D44]/5 px-5 py-4">
                        <div className="flex items-center gap-3 mb-3">
                            <div className="w-12 h-12 rounded-xl bg-[#5E3BEE] flex items-center justify-center flex-shrink-0 overflow-hidden">
                                <img src="/Logo (1).png" alt="" className="w-8 h-8 object-contain opacity-90" onError={(e) => { e.target.style.display = 'none'; }} />
                            </div>
                            <div className="flex-1 min-w-0">
                                <p className="text-[#5E3BEE] font-black text-lg leading-tight">רעים</p>
                                <p className="text-[#2D2D44]/70 text-sm">{MOBILE_TAGLINE}</p>
                            </div>
                        </div>
                        <p className="text-[#2D2D44] font-bold text-center">{sectionTitle}</p>
                    </div>
                    <div className="p-4">
                        {part8Steps.map((step, index) => (
                            <React.Fragment key={index}>
                                <MobileFlowStepCard step={step} showConnector={index < part8Steps.length - 1} />
                            </React.Fragment>
                        ))}
                    </div>
                </div>
            </div>
        );
    };

    // --- מובייל בלבד: חלק 9 – צעד תשיעי: פתיחת הקבוצה (כרטיס ייעודי) ---
    const MobilePart9 = () => {
        const step = data.onboarding?.steps?.find((s) => s.id === '09');
        if (!step) return null;
        return (
            <div className="md:hidden w-full max-w-lg mx-auto px-4 pb-8">
                <div className="rounded-[40px] overflow-hidden bg-white border-2 border-[#2D2D44]/10 shadow-[6px_6px_0px_rgba(45,45,68,0.08)]">
                    <div className="bg-[#F3F0FF] border-b border-[#2D2D44]/5 px-5 py-4">
                        <div className="flex items-center gap-3 mb-3">
                            <div className="w-12 h-12 rounded-xl bg-[#5E3BEE] flex items-center justify-center flex-shrink-0 overflow-hidden">
                                <img src="/Logo (1).png" alt="" className="w-8 h-8 object-contain opacity-90" onError={(e) => { e.target.style.display = 'none'; }} />
                            </div>
                            <div className="flex-1 min-w-0">
                                <p className="text-[#5E3BEE] font-black text-lg leading-tight">רעים</p>
                                <p className="text-[#2D2D44]/70 text-sm">{MOBILE_TAGLINE}</p>
                            </div>
                        </div>
                        <p className="text-[#2D2D44] font-bold text-center">{step.title}</p>
                    </div>
                    <div className="p-6">
                        <div className="flex items-center gap-2 mb-4">
                            <div className="w-12 h-12 bg-[#C5E080] border-2 border-[#2D2D44] rounded-full flex items-center justify-center font-black text-lg text-[#2D2D44] shadow-[3px_3px_0px_#2D2D44]">
                                {step.id}
                            </div>
                            <span className="text-sm font-bold text-[#2D2D44]/60">{step.step}</span>
                        </div>
                        <h3 className="text-2xl font-black text-[#2D2D44] text-right mb-6">{step.title}</h3>
                        <ul className="flex flex-col gap-4 pr-0">
                            {(step.items || []).map((item, idx) => (
                                <li key={idx} className="flex items-start gap-3 text-right text-[#2D2D44] text-base leading-snug">
                                    <div className="mt-1 flex-shrink-0 bg-[#C5E080]/40 p-1 rounded-full text-[#2D2D44]">
                                        <ArrowLeft size={16} strokeWidth={3} />
                                    </div>
                                    <span>{item}</span>
                                </li>
                            ))}
                        </ul>
                    </div>
                </div>
            </div>
        );
    };

    // --- מובייל בלבד: חלק 10 – צעד עשירי: תוכן ותהליך קבוצתי (כרטיס ייעודי) ---
    const MobilePart10 = () => {
        const step = data.onboarding?.steps?.find((s) => s.id === '10');
        if (!step) return null;
        return (
            <div className="md:hidden w-full max-w-lg mx-auto px-4 pb-8">
                <div className="rounded-[40px] overflow-hidden bg-white border-2 border-[#2D2D44]/10 shadow-[6px_6px_0px_rgba(45,45,68,0.08)]">
                    <div className="bg-[#F3F0FF] border-b border-[#2D2D44]/5 px-5 py-4">
                        <div className="flex items-center gap-3 mb-3">
                            <div className="w-12 h-12 rounded-xl bg-[#5E3BEE] flex items-center justify-center flex-shrink-0 overflow-hidden">
                                <img src="/Logo (1).png" alt="" className="w-8 h-8 object-contain opacity-90" onError={(e) => { e.target.style.display = 'none'; }} />
                            </div>
                            <div className="flex-1 min-w-0">
                                <p className="text-[#5E3BEE] font-black text-lg leading-tight">רעים</p>
                                <p className="text-[#2D2D44]/70 text-sm">{MOBILE_TAGLINE}</p>
                            </div>
                        </div>
                        <p className="text-[#2D2D44] font-bold text-center">{step.title}</p>
                    </div>
                    <div className="p-6">
                        <div className="flex items-center gap-2 mb-4">
                            <div className="w-12 h-12 bg-[#C5E080] border-2 border-[#2D2D44] rounded-full flex items-center justify-center font-black text-lg text-[#2D2D44] shadow-[3px_3px_0px_#2D2D44]">
                                {step.id}
                            </div>
                            <span className="text-sm font-bold text-[#2D2D44]/60">{step.step}</span>
                        </div>
                        <h3 className="text-2xl font-black text-[#2D2D44] text-right mb-6">{step.title}</h3>
                        <ul className="flex flex-col gap-4 pr-0">
                            {(step.items || []).map((item, idx) => (
                                <li key={idx} className="flex items-start gap-3 text-right text-[#2D2D44] text-base leading-snug">
                                    <div className="mt-1 flex-shrink-0 bg-[#C5E080]/40 p-1 rounded-full text-[#2D2D44]">
                                        <ArrowLeft size={16} strokeWidth={3} />
                                    </div>
                                    <span>{item}</span>
                                </li>
                            ))}
                        </ul>
                    </div>
                </div>
            </div>
        );
    };

    // --- מובייל בלבד: חלק 11 – צעד עשירי + תמונת מפגש (פיצה) ---
    const MobilePart11 = () => {
        const step = data.onboarding?.steps?.find((s) => s.id === '10');
        const pizzaImage = data.sessionStructure?.images?.[0];
        if (!step && !pizzaImage) return null;
        return (
            <div className="md:hidden w-full max-w-lg mx-auto px-4 pb-8 space-y-6">
                {step && (
                    <div className="rounded-[40px] overflow-hidden bg-white border-2 border-[#2D2D44]/10 shadow-[6px_6px_0px_rgba(45,45,68,0.08)]">
                        <div className="bg-[#F3F0FF] border-b border-[#2D2D44]/5 px-5 py-4">
                            <div className="flex items-center gap-3 mb-3">
                                <div className="w-12 h-12 rounded-xl bg-[#5E3BEE] flex items-center justify-center flex-shrink-0 overflow-hidden">
                                    <img src="/Logo (1).png" alt="" className="w-8 h-8 object-contain opacity-90" onError={(e) => { e.target.style.display = 'none'; }} />
                                </div>
                                <div className="flex-1 min-w-0">
                                    <p className="text-[#5E3BEE] font-black text-lg leading-tight">רעים</p>
                                    <p className="text-[#2D2D44]/70 text-sm">{MOBILE_TAGLINE}</p>
                                </div>
                            </div>
                            <p className="text-[#2D2D44] font-bold text-center">{step.title}</p>
                        </div>
                        <div className="p-6">
                            <div className="flex items-center gap-2 mb-4">
                                <div className="w-12 h-12 bg-[#C5E080] border-2 border-[#2D2D44] rounded-full flex items-center justify-center font-black text-lg text-[#2D2D44] shadow-[3px_3px_0px_#2D2D44]">
                                    {step.id}
                                </div>
                                <span className="text-sm font-bold text-[#2D2D44]/60">{step.step}</span>
                            </div>
                            <h3 className="text-2xl font-black text-[#2D2D44] text-right mb-6">{step.title}</h3>
                            <ul className="flex flex-col gap-4 pr-0">
                                {(step.items || []).map((item, idx) => (
                                    <li key={idx} className="flex items-start gap-3 text-right text-[#2D2D44] text-base leading-snug">
                                        <div className="mt-1 flex-shrink-0 bg-[#C5E080]/40 p-1 rounded-full text-[#2D2D44]">
                                            <ArrowLeft size={16} strokeWidth={3} />
                                        </div>
                                        <span>{item}</span>
                                    </li>
                                ))}
                            </ul>
                            <div className="flex justify-center mt-4" aria-hidden>
                                <span className="text-2xl text-[#FFB84C]">✶</span>
                            </div>
                        </div>
                    </div>
                )}
                {pizzaImage && (
                    <div className="relative rounded-[40px] overflow-hidden border-2 border-[#2D2D44]/10 shadow-[6px_6px_0px_rgba(45,45,68,0.08)] bg-[#FFFDF5]">
                        <img
                            src={pizzaImage}
                            alt="מפגש רעים - שיתוף ביחד"
                            className="w-full aspect-[4/3] object-cover"
                        />
                        <div className="absolute bottom-3 right-3 w-2 h-2 rounded-full bg-[#C5E080]" aria-hidden />
                    </div>
                )}
            </div>
        );
    };

    // --- מובייל בלבד: חלק 12 – קולאז' תמונות + כיצד נראה מפגש רעים ---
    const MobilePart12 = () => {
        const session = data.sessionStructure;
        const images = session?.images ?? [];
        if (!session?.title && images.length === 0) return null;
        return (
            <div className="md:hidden w-full max-w-lg mx-auto px-4 pb-8">
                <div className="rounded-[40px] overflow-hidden bg-white border-2 border-[#2D2D44]/10 shadow-[6px_6px_0px_rgba(45,45,68,0.08)]">
                    <div className="bg-[#F3F0FF] border-b border-[#2D2D44]/5 px-5 py-4">
                        <div className="flex items-center gap-3">
                            <div className="w-12 h-12 rounded-xl bg-[#5E3BEE] flex items-center justify-center flex-shrink-0 overflow-hidden">
                                <img src="/Logo (1).png" alt="" className="w-8 h-8 object-contain opacity-90" onError={(e) => { e.target.style.display = 'none'; }} />
                            </div>
                            <div className="flex-1 min-w-0">
                                <p className="text-[#5E3BEE] font-black text-lg leading-tight">רעים</p>
                                <p className="text-[#2D2D44]/70 text-sm">{MOBILE_TAGLINE}</p>
                            </div>
                        </div>
                    </div>
                    <div className="p-5 relative">
                        {images.length > 0 && (
                            <div className="relative min-h-[220px] mb-6">
                                {images[0] && (
                                    <div className="absolute top-0 right-0 w-[85%] aspect-[4/3] rounded-[24px] overflow-hidden border-2 border-[#2D2D44] shadow-[8px_8px_0px_rgba(45,45,68,0.1)] transform -rotate-[3deg] z-10">
                                        <img src={images[0]} alt="מפגש רעים" className="w-full h-full object-cover" />
                                        <div className="absolute bottom-2 right-2 w-2 h-2 rounded-full bg-[#C5E080]" aria-hidden />
                                    </div>
                                )}
                                {images[1] && (
                                    <div className="absolute bottom-0 left-0 w-[65%] aspect-[4/3] rounded-[24px] overflow-hidden border-2 border-[#2D2D44] shadow-[8px_8px_0px_rgba(45,45,68,0.1)] transform rotate-[4deg] z-20">
                                        <img src={images[1]} alt="מפגש קבוצתי" className="w-full h-full object-cover" />
                                    </div>
                                )}
                                <span className="absolute top-2 left-2 text-[#EF4444] text-xl z-30" aria-hidden>✶</span>
                            </div>
                        )}
                        {session.recommendation && (
                            <p className="text-[#5E3BEE] font-bold text-sm tracking-wide text-center mb-1">
                                {session.recommendation}
                            </p>
                        )}
                        {session.title && (
                            <h2 className="text-2xl font-black text-[#5E3BEE] text-center">
                                {session.title}
                            </h2>
                        )}
                    </div>
                </div>
            </div>
        );
    };

    // --- מובייל בלבד: חלק 13 – כיצד נראה מפגש רעים (לוגו + אקורדיון) ---
    const MobilePart13 = () => {
        const session = data.sessionStructure;
        if (!session?.items?.length) return null;
        return (
            <div className="md:hidden w-full max-w-lg mx-auto px-4 pb-8">
                <div className="rounded-[40px] overflow-hidden bg-white border-2 border-[#2D2D44]/10 shadow-[6px_6px_0px_rgba(45,45,68,0.08)]">
                    <div className="bg-[#F3F0FF] border-b border-[#2D2D44]/5 px-5 py-4">
                        <div className="flex items-center gap-3">
                            <div className="w-12 h-12 rounded-xl bg-[#5E3BEE] flex items-center justify-center flex-shrink-0 overflow-hidden">
                                <img src="/Logo (1).png" alt="" className="w-8 h-8 object-contain opacity-90" onError={(e) => { e.target.style.display = 'none'; }} />
                            </div>
                            <div className="flex-1 min-w-0">
                                <p className="text-[#5E3BEE] font-black text-lg leading-tight">רעים</p>
                                <p className="text-[#2D2D44]/70 text-sm">{MOBILE_TAGLINE}</p>
                            </div>
                        </div>
                    </div>
                    <div className="p-6">
                        {session.recommendation && (
                            <p className="text-[#5E3BEE] font-bold text-sm tracking-wide text-center mb-1">
                                {session.recommendation}
                            </p>
                        )}
                        <h2 className="text-2xl font-black text-[#2D2D44] text-center mb-6">
                            {session.title}
                        </h2>
                        <div className="bg-[#FDFBFF] rounded-2xl border border-[#816AFE]/10 p-3">
                            <Accordion items={session.items} />
                        </div>
                    </div>
                </div>
            </div>
        );
    };

    // --- מובייל בלבד: חלק 14 – לוגו סגול + רשימת נושאים (סגורה בסגנון אקורדיון) ---
    const MobilePart14 = () => {
        const session = data.sessionStructure;
        const items = session?.items ?? [];
        return (
            <div className="md:hidden w-full max-w-lg mx-auto px-4 pb-8">
                <div className="rounded-[40px] overflow-hidden bg-white border-2 border-[#2D2D44]/10 shadow-[6px_6px_0px_rgba(45,45,68,0.08)]">
                    <div className="bg-[#5E3BEE] px-5 py-4 flex items-center gap-3">
                        <div className="flex-1 min-w-0">
                            <p className="text-white font-black text-lg leading-tight">רעים</p>
                            <p className="text-white/90 text-sm">{MOBILE_TAGLINE}</p>
                        </div>
                        <div className="w-12 h-12 rounded-xl bg-white/20 flex items-center justify-center flex-shrink-0">
                            <img src="/Logo (1).png" alt="" className="w-8 h-8 object-contain opacity-90" onError={(e) => { e.target.style.display = 'none'; }} />
                        </div>
                    </div>
                    <div className="p-4">
                        {items.length > 0 && (
                            <div className="space-y-1">
                                {items.map((item, index) => (
                                    <div
                                        key={index}
                                        className="flex items-center justify-between gap-3 py-4 px-4 rounded-xl bg-[#2D2D44]/5 border border-[#2D2D44]/10 text-right"
                                    >
                                        <div className="w-8 h-8 rounded-full bg-[#2D2D44]/10 flex items-center justify-center flex-shrink-0 text-[#2D2D44]">
                                            <Plus size={18} strokeWidth={2.5} />
                                        </div>
                                        <span className="text-[#2D2D44] font-bold flex-1">{item.title}</span>
                                    </div>
                                ))}
                            </div>
                        )}
                    </div>
                </div>
            </div>
        );
    };

    // --- מובייל בלבד: חלק 15 – לוגו + לפרק הבא + פוטר (פרטי קשר, סושיאל, זכויות) ---
    const MobilePart15 = () => {
        const footer = content?.footer ?? {};
        const contact = footer.contact ?? {};
        const bottomLinks = footer.bottomLinks ?? [
            { text: 'מדיניות פרטיות', url: '#' },
            { text: 'תקנון אתר', url: '#' }
        ];
        const organization = footer.organization ?? 'תוכנית רעים מבית החברה למתנ"סים';
        const copyright = footer.copyright ?? '© כל הזכויות שמורות לחברה למתנ"סים';
        return (
            <div className="md:hidden w-full max-w-lg mx-auto px-4 pb-8 space-y-6">
                <div className="rounded-[40px] overflow-hidden bg-white border-2 border-[#2D2D44]/10 shadow-[6px_6px_0px_rgba(45,45,68,0.08)] p-6 text-center">
                    <div className="flex justify-center gap-2 mb-4">
                        <img src="/Logo (1).png" alt="רעים" className="h-10 object-contain" onError={(e) => { e.target.style.display = 'none'; }} />
                        <div className="text-right">
                            <p className="text-[#5E3BEE] font-black text-lg leading-tight">רעים</p>
                            <p className="text-[#2D2D44]/70 text-sm">{MOBILE_TAGLINE}</p>
                        </div>
                    </div>
                </div>
                {onNext && (
                    <NextChapterButton
                        title={data.nextButton?.title ?? 'לפרק הבא'}
                        subtitle={data.nextButton?.subtitle ?? 'פרק 04 - עבודה מנהלית'}
                        onClick={onNext}
                    />
                )}
                <div className="rounded-[32px] overflow-hidden bg-white border border-[#2D2D44]/5 shadow-lg p-6 text-center">
                    <div className="flex flex-wrap justify-center items-center gap-4 mb-4">
                        <img src="/Logo (1).png" alt="רעים" className="h-10 object-contain" onError={(e) => { e.target.style.display = 'none'; }} />
                        <img src="/matnasimLogo.png" alt="החברה למתנ&quot;סים" className="h-10 object-contain" style={{ filter: 'invert(32%) sepia(89%) saturate(1582%) hue-rotate(231deg)' }} />
                    </div>
                    <p className="text-[#2D2D44] text-sm font-medium mb-4">{organization}</p>
                    <div className="text-[#2D2D44] text-sm space-y-1 mb-4">
                        <p>טלפון: {contact.phone}</p>
                        <p>פקס: {contact.fax}</p>
                        <p>מייל: <a href={`mailto:${contact.email}`} className="text-[#5E3BEE] underline">{contact.email}</a></p>
                    </div>
                    <div className="flex justify-center gap-3 mb-4">
                        {[Facebook, Instagram, Linkedin, Twitter].map((Icon, i) => (
                            <a key={i} href="#" className="bg-[#EBE5FC] p-2.5 rounded-xl text-[#5E3BEE] hover:bg-[#5E3BEE] hover:text-white transition-colors" aria-label="רשתות חברתיות">
                                <Icon size={20} />
                            </a>
                        ))}
                    </div>
                    <div className="flex flex-wrap justify-center gap-2 text-sm text-[#2D2D44]/80 mb-3">
                        {bottomLinks.map((link, i) => (
                            <React.Fragment key={i}>
                                {i > 0 && <span className="text-gray-300">•</span>}
                                <a href={link.url} className="text-[#5E3BEE] underline hover:no-underline">{link.text}</a>
                            </React.Fragment>
                        ))}
                    </div>
                    <p className="text-xs text-[#2D2D44]/60">{copyright}</p>
                </div>
            </div>
        );
    };

    // --- 1. הגדרת התוכן הדביק לצד ימין ---
    const StickyHeader = (
        <div className="flex flex-col items-start pl-4 md:pl-10">
            {/* תגית פרק */}
            <div className="inline-flex items-center gap-2 bg-[#C5E080] border-2 border-black px-4 py-1.5 rounded-full mb-8 shadow-[3px_3px_0px_black] transform -rotate-1">
                <span className="font-bold text-[#2D2D44] tracking-wide text-sm">{data.hero?.tag}</span>
                <div className="bg-white/40 px-2 rounded-full text-xs font-bold border border-black/10">03</div>
            </div>

            {/* כותרת ראשית */}
            <h1 className="text-5xl md:text-7xl font-black text-[#2D2D44] leading-[1.1] mb-8 text-right">
                {data.hero?.titleTop}
                <br />
                <span className="text-[#5E3BEE] relative inline-block mt-2">
                    {data.hero?.titleBottom}
                    <span className="absolute bottom-2 left-0 w-full h-4 bg-[#FFB84C] -z-10 rounded-sm transform -rotate-1"></span>
                </span>
            </h1>

            {/* תיאור */}
            <p className="text-xl md:text-2xl text-[#2D2D44] font-medium leading-relaxed max-w-lg text-right">
                {data.hero?.description}
            </p>
            
            {/* אלמנטים דקורטיביים */}
            <div className="absolute top-40 -right-10 text-6xl text-[#EF4444] animate-pulse hidden md:block">✶</div>
            <div className="absolute bottom-0 left-10 text-4xl text-[#C5E080] hidden md:block">✦</div>
        </div>
    );

    return (
        <div className="min-h-screen bg-[#FFFDF5] pt-32 pb-0 font-['Rubik']">
            {onPrev && (
                <div className="pt-6 pb-4 px-4">
                    <PrevChapterButton title="לפרק הקודם" subtitle="פרק 02 - המשתתפים" onClick={onPrev} />
                </div>
            )}

            {/* מובייל בלבד: חלק 1 – הגדרת תפקיד */}
            <MobilePart1 />

            {/* מובייל בלבד: חלק 2 – מדריך לרכזת מתחילה */}
            <MobilePart2 />

            {/* מובייל בלבד: חלק 3 – אחריות */}
            <MobilePart3 />

            {/* מובייל בלבד: חלק 4 – למידה והדרכה */}
            <MobilePart4 />

            {/* מובייל בלבד: חלק 5 – עבודה מנהלית */}
            <MobilePart5 />

            {/* מובייל בלבד: חלק 6 – מבנה המפגש */}
            <MobilePart6 />

            {/* מובייל בלבד: חלק 7 – צעדים 1–3 (זרימה) */}
            <MobilePart7 />

            {/* מובייל בלבד: חלק 8 – צעדים 4–10 (המשך זרימה) */}
            <MobilePart8 />

            {/* מובייל בלבד: חלק 9 – צעד תשיעי: פתיחת הקבוצה */}
            <MobilePart9 />

            {/* מובייל בלבד: חלק 10 – צעד עשירי: תוכן ותהליך קבוצתי */}
            <MobilePart10 />

            {/* מובייל בלבד: חלק 11 – צעד עשירי + תמונת מפגש */}
            <MobilePart11 />

            {/* מובייל בלבד: חלק 12 – קולאז' תמונות + כיצד נראה מפגש רעים */}
            <MobilePart12 />

            {/* מובייל בלבד: חלק 13 – כיצד נראה מפגש רעים (לוגו + אקורדיון) */}
            <MobilePart13 />

            {/* מובייל בלבד: חלק 14 – לוגו סגול + רשימת נושאים (סגורה) */}
            <MobilePart14 />

            {/* מובייל בלבד: חלק 15 – לוגו + לפרק הבא + פוטר */}
            <MobilePart15 />

            {/* דסקטופ: כל תוכן הפרק */}
            <div className="hidden md:block">
            {/* --- חלק א': תפקיד ואחריות (Split Sticky) --- */}
            <SplitStickyLayout stickyContent={StickyHeader}>
                
                {/* כרטיס תמונה ראשי */}
                <StickyCard top="100px">
                    <div className="relative w-full h-full min-h-[500px] rounded-[20px] overflow-hidden bg-gray-100 border-4 border-white shadow-inner group">
                        <img 
                            src={data.hero?.image} 
                            alt="רכזת רעים" 
                            className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                        />
                        <div className="absolute bottom-6 left-6 flex flex-col items-center">
                            <span className="text-[80px] font-black text-[#5E3BEE] font-['Salsa'] leading-none drop-shadow-sm bg-white/80 px-4 rounded-xl backdrop-blur-sm">
                                03
                            </span>
                        </div>
                    </div>
                </StickyCard>

                {/* כרטיסי אחריות נערמים */}
                {data.responsibilities && data.responsibilities.map((card, index) => (
                    <StickyCard key={index} top={`${140 + (index * 40)}px`}>
                        <div className="flex flex-col h-full justify-center p-4">
                            <h3 className={`text-3xl md:text-4xl font-black mb-8 text-center ${card.titleColor || 'text-[#2D2D44]'}`}>
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
                                    <button className="bg-[#5E3BEE] text-white px-6 py-3 rounded-full font-bold hover:bg-[#4a2ec6] transition-colors shadow-md flex items-center gap-2 mx-auto transition-transform hover:scale-105">
                                        {card.action.text}
                                        <ArrowLeft size={18} />
                                    </button>
                                </div>
                            )}
                        </div>
                    </StickyCard>
                ))}
            </SplitStickyLayout>

            {/* --- חלק ב': מדריך לרכזת מתחילה (קונטיינר סגול) --- */}
            {data.onboarding && (
                <div className="w-full bg-[#F3F0FF] border-t border-[#2D2D44]/5 py-24 relative mt-32">
                    <div className="absolute top-0 right-0 w-64 h-64 bg-[#EBE5FC] rounded-bl-full opacity-50 pointer-events-none"></div>

                    <div className="max-w-[1600px] mx-auto px-6 md:px-12 relative z-10">
                        <div className="text-center mb-16">
                            <h2 className="text-2xl font-bold text-[#2D2D44]/60 mb-2">{data.onboarding.titleTop}</h2>
                            <h3 className="text-5xl md:text-6xl font-black text-[#5E3BEE]">
                                {data.onboarding.titleBottom}
                                <span className="block w-24 h-2 bg-[#FFB84C] mx-auto mt-4 rounded-full"></span>
                            </h3>
                            <p className="mt-6 text-xl text-[#2D2D44] max-w-2xl mx-auto whitespace-pre-line leading-relaxed">
                                {data.onboarding.description}
                            </p>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-x-8 gap-y-12">
                            {data.onboarding.steps.map((step, index) => (
                                <div key={index} className="h-full">
                                    <ProcessCard 
                                        number={step.id} 
                                        step={step.step} 
                                        title={step.title} 
                                        items={step.items} 
                                    />
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            )}

            {/* --- חלק ג': מבנה המפגש (אקורדיון ותמונות) --- */}
            {data.sessionStructure && (
                <div className="w-full bg-white py-32 px-6 overflow-hidden border-t border-gray-100">
                    <div className="max-w-[1400px] mx-auto">
                        <div className="text-center mb-20">
                            <span className="text-[#5E3BEE] font-bold text-sm tracking-widest uppercase mb-2 block">
                                {data.sessionStructure.recommendation}
                            </span>
                            <h2 className="text-4xl md:text-5xl font-black text-[#2D2D44]">
                                {data.sessionStructure.title}
                            </h2>
                        </div>

                        <div className="flex flex-col lg:flex-row items-start gap-16 md:gap-24">
                            {/* תמונות מרחפות */}
                            <div className="w-full lg:w-5/12 relative min-h-[500px] hidden md:block">
                                <div className="absolute top-0 right-0 w-[85%] aspect-video rounded-[30px] overflow-hidden border-[3px] border-[#2D2D44] shadow-[12px_12px_0px_rgba(45,45,68,0.1)] rotate-[-3deg] hover:rotate-0 transition-transform duration-500 z-20">
                                    <img src={data.sessionStructure.images[0]} alt="פיצה" className="w-full h-full object-cover" />
                                </div>
                                <div className="absolute -bottom-10 left-0 w-[70%] aspect-video rounded-[30px] overflow-hidden border-[3px] border-[#2D2D44] shadow-[12px_12px_0px_rgba(45,45,68,0.1)] rotate-[4deg] hover:rotate-0 transition-transform duration-500 z-30">
                                    <img src={data.sessionStructure.images[1]} alt="מעגל" className="w-full h-full object-cover" />
                                </div>
                            </div>

                            {/* אקורדיון */}
                            <div className="w-full lg:w-7/12">
                                <div className="bg-[#FDFBFF] p-2 md:p-8 rounded-[40px] border-2 border-[#816AFE]/5 shadow-sm">
                                    <Accordion items={data.sessionStructure.items} />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            )}

            {/* כפתור מעבר לפרק הבא / סיום */}
            <div className="my-32 px-4 max-w-4xl mx-auto">
                 <NextChapterButton 
                    title="סיימנו את פרק 3"
                    subtitle="פרק 04 - עבודה מנהלית"
                    onClick={onNext} 
                />
            </div>
            </div>

            {/* מובייל: כפתור לפרק הבא */}
            {onNext && (
                <div className="md:hidden my-8 px-4">
                    <NextChapterButton 
                        title="סיימנו את פרק 3"
                        subtitle="פרק 04 - עבודה מנהלית"
                        onClick={onNext} 
                    />
                </div>
            )}
        </div>
    );
};

export default Chapter3;