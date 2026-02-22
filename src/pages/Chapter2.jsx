import React, { useState } from 'react';
import { Check, ArrowLeft, Plus, Minus, Send } from 'lucide-react';
import NextChapterButton from '../components/common/NextChapterButton';
import PrevChapterButton from '../components/common/PrevChapterButton';
import StickyCard from '../components/common/StickyCard'; 
// ייבוא הרכיב הארכיטקטוני החדש
import SplitStickyLayout from '../components/layout/SplitStickyLayout'; 

/* ==============================================================================
   1. רכיבי עזר (ללא שינוי)
   ============================================================================== */
const AgeCard = ({ label, age }) => (
    <div className="bg-white rounded-xl border-2 border-[#2D2D44] p-4 text-center shadow-[4px_4px_0px_rgba(45,45,68,0.1)] flex flex-col items-center justify-center min-h-[110px] transform hover:-translate-y-1 transition-transform duration-300">
        <h3 className="font-black text-[#2D2D44] text-xl mb-1">{label}</h3>
        <div className="bg-[#EBE5FC] px-3 py-0.5 rounded-md mb-1">
            <span className="text-xs font-bold text-[#2D2D44]/70">גילאי</span>
        </div>
        <div className="text-[#5E3BEE] font-black text-3xl font-['Rubik'] leading-none">{age}</div>
    </div>
);

const GoalCard = ({ text }) => (
    <div className="relative bg-[#F8F9FA] rounded-[16px] border-2 border-[#2D2D44] p-6 pt-10 text-center flex items-center justify-center min-h-[120px] group hover:bg-white transition-all duration-300">
        <div className="absolute -top-4 left-1/2 transform -translate-x-1/2 w-8 h-8 bg-[#C5E080] border-2 border-[#2D2D44] rounded-lg flex items-center justify-center rotate-3 group-hover:rotate-0 transition-transform duration-300 shadow-sm z-10">
            <Check size={18} strokeWidth={3} className="text-[#2D2D44]" />
        </div>
        <p className="text-[#2D2D44] font-bold text-sm md:text-base leading-tight">{text}</p>
    </div>
);

const AccordionItem = ({ title, content, isOpen, onClick }) => (
    <div className={`mb-4 rounded-xl transition-all duration-300 overflow-hidden ${isOpen ? 'bg-white shadow-[0px_4px_20px_rgba(129,106,254,0.1)] border-r-4 border-[#816AFE]' : 'bg-white/60 hover:bg-white border border-transparent'}`}>
        <button onClick={onClick} className="w-full flex items-center justify-between p-6 text-right outline-none cursor-pointer">
            <div className="flex items-center gap-4">
                <div className={`w-8 h-8 rounded-full flex items-center justify-center transition-colors duration-300 ${isOpen ? 'bg-[#5E3BEE]/10 text-[#5E3BEE]' : 'bg-[#2D2D44]/5 text-[#2D2D44]'}`}>
                    {isOpen ? <Minus size={18} /> : <Plus size={18} />}
                </div>
                <span className={`text-lg md:text-xl font-bold ${isOpen ? 'text-[#5E3BEE]' : 'text-[#2D2D44]'}`}>{title}</span>
            </div>
        </button>
        <div className={`px-6 mr-12 ml-6 text-[#2D2D44]/80 leading-relaxed overflow-hidden transition-all duration-500 ease-in-out whitespace-pre-line ${isOpen ? 'max-h-[800px] opacity-100 pb-8' : 'max-h-0 opacity-0'}`}>
            {content}
        </div>
    </div>
);

const Accordion = ({ items }) => {
    const [openIndex, setOpenIndex] = useState(0); 
    const handleItemClick = (index) => setOpenIndex(openIndex === index ? null : index);
    return <div className="w-full max-w-4xl mx-auto flex flex-col gap-2">{items.map((item, index) => <AccordionItem key={index} title={item.title} content={item.content} isOpen={openIndex === index} onClick={() => handleItemClick(index)} />)}</div>;
};

/* ==============================================================================
   2. הסקשנים הגדולים
   ============================================================================== */

const HeroSection = ({ data }) => (
    <div className="relative pt-10 pb-12 text-center max-w-[1400px] mx-auto px-4 hidden md:block">
        <div className="hidden lg:block pointer-events-none">
            {/* שמאל למעלה – תמונה גדולה */}
            <div className="absolute top-8 left-12 w-72 h-56 rotate-[-6deg] rounded-3xl overflow-hidden border-[3px] border-[#2D2D44] shadow-[8px_8px_0px_#2D2D44] z-10 bg-gray-200"><img src={data.image1} alt="" className="w-full h-full object-cover" /></div>
            {/* שמאל למטה – תמונה קטנה מרובעת, חופפת ליד התמונה הגדולה */}
            <div className="absolute top-44 left-28 w-[240px] h-[240px] rotate-[8deg] rounded-3xl overflow-hidden border-[3px] border-[#2D2D44] shadow-[6px_6px_0px_#2D2D44] z-20 bg-gray-200"><img src={data.image4} alt="" className="w-full h-full object-cover" /></div>
            {/* ימין למעלה */}
            <div className="absolute top-0 right-24 w-56 h-44 rotate-[4deg] rounded-3xl overflow-hidden border-[3px] border-[#2D2D44] shadow-[-6px_6px_0px_#2D2D44] z-10 bg-gray-200"><img src={data.image2} alt="" className="w-full h-full object-cover" /></div>
            {/* ימין למטה – חופף לתמונה הימנית העליונה */}
            <div className="absolute top-36 right-12 w-64 h-48 rotate-[-3deg] rounded-3xl overflow-hidden border-[3px] border-[#2D2D44] shadow-[-6px_6px_0px_#2D2D44] z-20 bg-gray-200"><img src={data.image3} alt="" className="w-full h-full object-cover" /></div>
        </div>
        <div className="relative z-20 mt-10 lg:mt-32">
            <div className="inline-flex items-center gap-2 bg-[#C5E080] border-2 border-black px-5 py-1.5 rounded-full mb-6 shadow-[3px_3px_0px_black] transform -rotate-1">
                <span className="font-bold text-[#2D2D44]">{data.tag}</span>
                <div className="w-6 h-6 bg-white/40 rounded-full flex items-center justify-center text-xs font-bold border border-black/10">02</div>
            </div>
            <h1 className="text-5xl md:text-7xl font-black text-[#2D2D44] leading-[1.1] mb-4">מי משתתפות <br /><span className="text-[#5E3BEE] relative inline-block">ומשתתפים ברעים<span className="absolute bottom-2 left-0 w-full h-4 bg-[#FFB84C] -z-10 rounded-sm transform -rotate-1"></span></span></h1>
            <div className="flex lg:hidden gap-4 overflow-x-auto mt-10 pb-4 px-4 snap-x no-scrollbar">
                {[data.image1, data.image2, data.image3, data.image4].map((img, i) => (<div key={i} className="w-64 h-48 rounded-2xl border-2 border-black overflow-hidden snap-center flex-shrink-0 bg-gray-200 shadow-[4px_4px_0px_black]"><img src={img} className="w-full h-full object-cover" /></div>))}
            </div>
        </div>
        <div className="absolute bottom-10 left-10 text-[140px] font-black text-[#5E3BEE]/10 font-['Rubik'] hidden md:block select-none -z-10">02</div>
    </div>
);

const UnifiedOrangeSection = ({ data }) => (
    <div className="w-full max-w-[1300px] mx-auto px-4 mb-20 relative z-20">
        <div className="bg-[#FFF9F0] rounded-[40px] border-[3px] border-[#2D2D44] p-6 md:p-12 shadow-[10px_10px_0px_#2D2D44]">
            <div className="bg-[#FFB84C] rounded-[30px] border-[2px] border-[#2D2D44] p-8 md:p-12 mb-16 shadow-[4px_4px_0px_rgba(45,45,68,0.1)]">
                <div className="text-center">
                    <h2 className="text-3xl md:text-4xl font-black text-[#2D2D44] mb-4">{data.audienceTitle}</h2>
                    <p className="text-[#2D2D44] font-medium text-lg md:text-lg max-w-4xl mx-auto leading-relaxed mb-10 whitespace-pre-line">{data.audienceText}</p>
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6 max-w-5xl mx-auto">
                        {data.ageGroups.map((group, index) => <AgeCard key={index} label={group.label} age={group.age} />)}
                    </div>
                </div>
            </div>
            <div className="text-center">
                <div className="inline-block relative mb-12">
                    <h2 className="text-3xl md:text-4xl font-black text-[#2D2D44] relative z-10">מטרות <br /><span className="text-[#5E3BEE]">תכנית רעים</span></h2>
                    <div className="absolute top-9 left-0 w-full h-3 bg-[#C5E080]/50 -z-0 rounded-full transform -rotate-1"></div>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-x-6 gap-y-10 max-w-6xl mx-auto">
                    {data.goals.map((item, index) => <GoalCard key={index} text={item} />)}
                </div>
            </div>
        </div>
    </div>
);

const GroupsIntroSection = ({ data }) => {
    if (!data) return null; 
    return (
        <div className="w-full max-w-[1400px] mx-auto px-6 mb-20">
            <div className="flex flex-col md:flex-row items-center gap-12 md:gap-20">
                <div className="w-full md:w-1/2 text-right">
                    <div className="text-sm font-bold text-[#2D2D44]/60 mb-2 tracking-wide">{data.subheading}</div>
                    <h2 className="text-4xl md:text-5xl font-black text-[#2D2D44] mb-8">{data.title}</h2>
                    <p className="text-lg text-[#2D2D44] font-medium mb-6">{data.intro}</p>
                    <div className="flex flex-col gap-4 mb-10">
                        {data.populations && data.populations.map((pop, index) => (
                            <div key={index} className="flex items-center justify-between bg-[#F3F0FF] hover:bg-[#EBE5FC] p-4 px-6 rounded-2xl border border-[#2D2D44]/5 hover:border-[#816AFE]/30 transition-all duration-300 cursor-pointer group shadow-sm hover:shadow-md">
                                <div className="flex items-center gap-6"><span className="font-black text-[#816AFE]/30 text-2xl font-mono">{pop.id}</span><span className="font-bold text-[#2D2D44] text-xl">{pop.text}</span></div>
                                <div className="w-10 h-10 rounded-full bg-white flex items-center justify-center group-hover:bg-[#816AFE] group-hover:text-white transition-all shadow-sm"><ArrowLeft size={20} /></div>
                            </div>
                        ))}
                    </div>
                    <p className="text-[#2D2D44]/80 leading-relaxed text-lg">{data.description}</p>
                </div>
                <div className="w-full md:w-1/2">
                    <div className="relative">
                        <div className="rounded-[30px] overflow-hidden border-[3px] border-[#2D2D44] shadow-[12px_12px_0px_rgba(45,45,68,0.1)] h-[400px] md:h-[500px]">
                            <img src={data.image} alt="קבוצת רעים" className="w-full h-full object-cover" />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

const GroupDetailsSection = ({ data }) => {
    if (!data) return null;
    return (
        <div className="w-full bg-[#FDFBFF] py-24 border-y border-[#816AFE]/5 relative mb-20">
            <div className="absolute top-0 right-0 w-64 h-64 bg-[#816AFE]/5 rounded-bl-[100px] -z-0"></div>
            <div className="max-w-[1000px] mx-auto px-6 relative z-10">
                <div className="text-right mb-12">
                    <div className="text-sm font-bold text-[#816AFE] mb-2 tracking-widest uppercase">{data.id}</div>
                    <h2 className="text-4xl md:text-5xl font-black text-[#2D2D44]">{data.title}</h2>
                </div>
                <Accordion items={data.items} />
            </div>
        </div>
    );
};

/* ==============================================================================
   סקשן 5 המעודכן: ארכיטקטורה נכונה עם SplitStickyLayout
   ============================================================================== */
const WhyTogetherSection = ({ data }) => {
    if (!data) return null;

    // הגדרת התוכן הדביק (צד ימין)
    const StickyHeader = (
        <h2 className="text-5xl md:text-7xl font-black text-[#2D2D44] leading-[1.1] relative inline-block">
            למה שתי
            <br />
            האוכלוסיות יחד?
            <span className="absolute bottom-2 left-0 w-full h-4 bg-[#C5E080] -z-10 rounded-sm"></span>
        </h2>
    );

    return (
        // שימוש ברכיב ה-Layout הגנרי שיצרנו
        <SplitStickyLayout stickyContent={StickyHeader} className="mb-20">
            
            {/* הזרקת הכרטיסים (צד שמאל) */}
            {data.cards && data.cards.map((card, index) => (
                <StickyCard key={index} top={`${120 + (index * 40)}px`}>
                    
                    {card.type === 'list' ? (
                        <>
                            <h3 className="text-2xl md:text-3xl font-bold text-[#2D2D44] text-center mb-10 whitespace-pre-line leading-relaxed">
                                {card.title}
                            </h3>
                            <div className="flex flex-col gap-6">
                                {card.items.map((item, idx) => (
                                    <div key={idx} className="relative bg-white border-2 border-[#2D2D44] rounded-2xl p-5 md:p-6 shadow-sm hover:shadow-md transition-shadow group pr-16">
                                        <div className="absolute top-1/2 -translate-y-1/2 right-[-20px] w-12 h-12 bg-[#C5E080] border-2 border-[#2D2D44] rounded-xl flex items-center justify-center rotate-6 group-hover:rotate-0 transition-transform duration-300 shadow-[2px_2px_0px_#2D2D44]">
                                            <Check size={24} strokeWidth={3} className="text-[#2D2D44]" />
                                        </div>
                                        <p className="text-[#2D2D44] font-medium text-lg leading-snug">{item}</p>
                                    </div>
                                ))}
                            </div>
                        </>
                    ) : (
                        <>
                            <h3 className="text-3xl md:text-4xl font-black text-[#2D2D44] mb-8 text-right border-b-2 border-[#2D2D44]/10 pb-4 inline-block">
                                {card.title}
                            </h3>
                            <p className="text-lg md:text-xl text-[#2D2D44] leading-relaxed whitespace-pre-line text-right">
                                {card.text}
                            </p>
                        </>
                    )}

                </StickyCard>
            ))}
        </SplitStickyLayout>
    );
};

/* ==============================================================================
   הרכיב הראשי
   ============================================================================== */
const Chapter2 = ({ data, onNext, onPrev }) => {
    if (!data) return <div className="text-center p-20 text-[#816AFE]">טוען פרק 2...</div>;
    const hero = data.hero || {};
    const contentBox = data.contentBox;
    const groupsIntro = data.groupsIntro;
    const goals = contentBox?.goals || [];

    return (
        <div className="min-h-screen bg-[#FFFDF5] pt-24 pb-0 font-['Rubik']">
            {onPrev && (
                <div className="pt-6 pb-4 px-4">
                    <PrevChapterButton title="לפרק הקודם" subtitle="פרק 01 - נעים להכיר" onClick={onPrev} />
                </div>
            )}

            {/* מובייל בלבד: חלק 1 – קו מקווקו + נייר, תג 02, כותרת, קולאז' תמונות */}
            <div className="md:hidden mx-4 mt-4 mb-12">
                <div className="bg-white rounded-[32px] shadow-xl border border-[#2D2D44]/5 p-6 relative overflow-hidden">
                    <div className="flex items-center gap-2 mb-6 text-[#816AFE]/60">
                        <svg className="w-full h-4 flex-1 min-w-0" viewBox="0 0 200 8" fill="none" stroke="currentColor" strokeWidth="1.5" strokeDasharray="6 4"><path d="M0 4 L200 4" /></svg>
                        <Send className="w-5 h-5 shrink-0 rotate-45" strokeWidth={2} />
                    </div>
                    <div className="inline-flex items-center gap-2 bg-[#C5E080] border-2 border-black px-5 py-2 rounded-full mb-6 shadow-[3px_3px_0px_black]">
                        <span className="w-6 h-6 bg-white/50 rounded-full flex items-center justify-center text-xs font-bold border border-black/10">02</span>
                        <span className="font-bold text-[#2D2D44]">{hero.tag}</span>
                    </div>
                    <h1 className="text-2xl md:text-3xl font-black text-[#2D2D44] leading-tight mb-6 text-center">
                        מי משתתפות
                        <br />
                        <span className="text-[#5E3BEE] relative inline-block mt-0.5">
                            ומשתתפים ברעים
                            <span className="absolute bottom-1 left-0 w-full h-3 bg-[#FFB84C] opacity-50 -z-10 rounded-sm" />
                        </span>
                    </h1>
                    <div className="relative min-h-[260px]">
                        <div className="absolute top-0 right-0 w-[75%] aspect-[3/4] max-h-[220px] rounded-2xl overflow-hidden border-4 border-white shadow-xl z-10">
                            <img src={hero.image1} alt="" className="w-full h-full object-cover" />
                        </div>
                        <div className="absolute top-2 left-2 w-[38%] aspect-square max-h-[100px] rounded-xl overflow-hidden border-2 border-white shadow-lg z-20 bg-gray-100">
                            <img src={hero.image2} alt="" className="w-full h-full object-cover" />
                        </div>
                        <div className="absolute bottom-2 left-2 w-[40%] aspect-[4/3] max-h-[90px] rounded-xl overflow-hidden border-2 border-white shadow-lg z-20 bg-gray-100">
                            <img src={hero.image3} alt="" className="w-full h-full object-cover" />
                        </div>
                        <div className="absolute bottom-4 right-4 text-6xl font-black text-[#816AFE] font-['Rubik'] leading-none opacity-20 select-none">02</div>
                    </div>
                </div>
            </div>

            {/* מובייל בלבד: חלק 2 – למי מיועדת התכנית, תפוז, כרטיסי גילאים */}
            {contentBox && (
                <div className="md:hidden mx-4 mb-12">
                    <div className="bg-[#FFF9F0] rounded-[32px] border-2 border-[#2D2D44]/10 p-6 shadow-lg">
                        <div className="bg-[#FFB84C] rounded-[24px] border-2 border-[#2D2D44]/20 p-6 mb-6">
                            <h2 className="text-xl font-black text-[#2D2D44] mb-3 text-center">{contentBox.audienceTitle}</h2>
                            <p className="text-[#2D2D44] text-sm leading-relaxed whitespace-pre-line text-center">{contentBox.audienceText}</p>
                        </div>
                        <div className="grid grid-cols-2 gap-4">
                            {contentBox.ageGroups.map((group, index) => (
                                <AgeCard key={index} label={group.label} age={group.age} />
                            ))}
                        </div>
                    </div>
                </div>
            )}

            {/* מובייל בלבד: חלק 3 – מטרות תכנית רעים, לוגו, רשימת מטרות עם V */}
            {contentBox && goals.length > 0 && (
                <div className="md:hidden mx-4 mb-12">
                    <div className="text-center mb-6">
                        <h2 className="text-2xl font-black text-[#5E3BEE] inline-block relative mb-2">
                            מטרות
                            <span className="absolute bottom-0 left-0 w-full h-2 bg-[#C5E080]/70 -z-10 rounded-full" />
                        </h2>
                        <span className="block text-[#5E3BEE] font-bold text-sm mt-1">תכנית רעים</span>
                    </div>
                    <div className="flex flex-col gap-6">
                        {goals.map((text, index) => (
                            <div key={index} className="relative bg-[#FFF9F0] rounded-2xl border-2 border-[#2D2D44] p-6 pt-10 text-right shadow-[4px_4px_0px_rgba(45,45,68,0.08)]">
                                <div className="absolute -top-3 left-1/2 -translate-x-1/2 w-8 h-8 bg-[#C5E080] border-2 border-[#2D2D44] rounded-lg flex items-center justify-center shadow-sm z-10">
                                    <Check size={18} strokeWidth={3} className="text-[#2D2D44]" />
                                </div>
                                <p className="text-[#2D2D44] font-bold text-sm leading-tight">{text}</p>
                            </div>
                        ))}
                    </div>
                </div>
            )}

            {/* דסקטופ: הירו + בלוק תפוז + מטרות */}
            <HeroSection data={data.hero} />
            {data.contentBox && <div className="hidden md:block"><UnifiedOrangeSection data={data.contentBox} /></div>}
            {groupsIntro && <div className="hidden md:block mb-20"><GroupsIntroSection data={data.groupsIntro} /></div>}

            {/* מובייל בלבד: חלק 4 – תיבת מטרה אחרונה, לוגו, תמונה, הקבוצות ברעים + אוכלוסיות */}
            {groupsIntro && (
                <div className="md:hidden mx-4 mb-12">
                    {goals.length > 0 && (
                        <div className="bg-[#C5E080] rounded-2xl border-2 border-[#2D2D44] px-4 py-3 mb-6 shadow-[3px_3px_0px_#2D2D44]">
                            <p className="text-[#2D2D44] font-bold text-sm text-center leading-snug">{goals[goals.length - 1]}</p>
                        </div>
                    )}
                    <div className="rounded-[24px] overflow-hidden border-2 border-[#2D2D44]/10 shadow-lg mb-6 aspect-[4/3] max-h-[280px] bg-gray-100">
                        <img src={groupsIntro.image} alt="" className="w-full h-full object-cover" />
                    </div>
                    <div className="bg-white rounded-[32px] shadow-xl border border-[#2D2D44]/5 p-6 text-right">
                        <p className="text-sm font-bold text-[#2D2D44]/60 mb-1">{groupsIntro.subheading}</p>
                        <h2 className="text-2xl font-black text-[#2D2D44] mb-2">{groupsIntro.title}</h2>
                        <p className="text-[#2D2D44] text-sm mb-6 leading-relaxed">{groupsIntro.intro}</p>
                        <div className="flex flex-col gap-3 mb-6">
                            {groupsIntro.populations.map((pop) => (
                                <div key={pop.id} className="flex items-center justify-between bg-[#F3F0FF] hover:bg-[#EBE5FC] p-4 rounded-2xl border border-[#2D2D44]/5">
                                    <span className="font-bold text-[#2D2D44]">{pop.id} {pop.text}</span>
                                    <div className="w-10 h-10 rounded-full bg-white flex items-center justify-center shadow-sm shrink-0">
                                        <ArrowLeft size={20} className="text-[#5E3BEE]" />
                                    </div>
                                </div>
                            ))}
                        </div>
                        <p className="text-[#2D2D44]/80 text-sm leading-relaxed">{groupsIntro.description}</p>
                    </div>
                </div>
            )}

            {/* מובייל בלבד: חלק 5 – קבוצה 01 אוטיסטים ואוטיסטיות: כותרת, באנר רעים, אקורדיון */}
            {data.group01 && (
                <div className="md:hidden mx-4 mb-12">
                    <div className="mb-6">
                        <p className="text-sm font-bold text-[#5E3BEE] mb-1">02</p>
                        <h2 className="text-2xl font-black text-[#2D2D44] mb-2">{data.group01.title}</h2>
                        {groupsIntro && (
                            <p className="text-[#2D2D44]/80 text-sm leading-relaxed">{groupsIntro.description.split('.')[0]}.</p>
                        )}
                    </div>
                    <p className="text-[#2D2D44] text-sm leading-relaxed mb-6">
                        לעיתים המפגש עם מערכות חינוך, חברה ותעסוקה שמבוססות על נורמות אחידות, עלול להוביל לתחושת חוסר שייכות ולחוויות בדידות.
                    </p>
                    <div className="mb-4">
                        <p className="text-xs font-bold text-[#816AFE] mb-1">{data.group01.id}</p>
                        <h3 className="text-xl font-black text-[#2D2D44]">{data.group01.title}</h3>
                    </div>
                    <Accordion items={data.group01.items} />
                </div>
            )}

            {/* מובייל בלבד: חלק 6 – קבוצה 02 לקויות למידה נרחבות: כותרת, באנר רעים, אקורדיון */}
            {data.group02 && (
                <div className="md:hidden mx-4 mb-12">
                    <div className="mb-6">
                        <p className="text-sm font-bold text-[#5E3BEE] mb-1">02</p>
                        <h2 className="text-2xl font-black text-[#2D2D44] mb-2">{data.group02.title}</h2>
                        {groupsIntro && (
                            <p className="text-[#2D2D44]/80 text-sm leading-relaxed">{groupsIntro.description.split('.')[0]}.</p>
                        )}
                    </div>
                    <p className="text-[#2D2D44] text-sm leading-relaxed mb-6">
                        לעיתים המפגש עם מערכות חינוך, חברה ותעסוקה שמבוססות על נורמות אחידות, עלול להוביל לתחושת חוסר שייכות ולחוויות בדידות.
                    </p>
                    <div className="mb-4">
                        <p className="text-xs font-bold text-[#816AFE] mb-1">{data.group02.id}</p>
                        <h3 className="text-xl font-black text-[#2D2D44]">{data.group02.title}</h3>
                    </div>
                    <Accordion items={data.group02.items} />
                </div>
            )}

            {/* דסקטופ: פרטי קבוצה 01 */}
            {data.group01 && <div className="hidden md:block"><GroupDetailsSection data={data.group01} /></div>}
            {/* דסקטופ: פרטי קבוצה 02 */}
            {data.group02 && <div className="hidden md:block"><GroupDetailsSection data={data.group02} /></div>}

            {/* מובייל בלבד: חלק 7 – באנר רעים (סגול בהיר), אקורדיון סיכום, שאלה "למה שתי האוכלוסיות יחד?" */}
            {data.part7Accordion && data.part7Accordion.length > 0 && (
                <div className="md:hidden mx-4 mb-12">
                    <div className="mb-8">
                        <Accordion items={data.part7Accordion} />
                    </div>
                    {data.whyTogether?.title && (
                        <h2 className="text-xl font-black text-[#2D2D44] text-center">
                            למה שתי האוכלוסיות{' '}
                            <span className="text-[#C5E080] relative inline-block">
                                יחד?
                                <span className="absolute bottom-0 left-0 w-full h-2 bg-[#C5E080]/60 -z-10 rounded-full" />
                            </span>
                        </h2>
                    )}
                </div>
            )}

            {/* מובייל בלבד: חלק 8 – באנר לוגו, כרטיס "למרות ההבדלים... חוויות דומות" עם 3 סעיפים ו-V ירוק */}
            {data.whyTogether?.cards?.some(c => c.type === 'list') && (() => {
                const listCard = data.whyTogether.cards.find(c => c.type === 'list');
                if (!listCard?.items?.length) return null;
                return (
                    <div className="md:hidden mx-4 mb-12">
                        <div className="bg-[#FFFDF5] rounded-[24px] border-2 border-[#C5E080]/60 p-6 shadow-sm">
                            <h3 className="text-lg font-black text-[#2D2D44] mb-6 text-center whitespace-pre-line leading-relaxed">{listCard.title}</h3>
                            <div className="flex flex-col gap-4">
                                {listCard.items.map((item, idx) => (
                                    <div key={idx} className="flex items-center justify-between gap-4 bg-white rounded-xl border-2 border-[#C5E080]/50 p-4 pl-14 text-right relative">
                                        <p className="text-[#2D2D44] font-medium text-sm leading-snug flex-1">{item}</p>
                                        <div className="absolute right-4 top-1/2 -translate-y-1/2 w-10 h-10 bg-[#C5E080] border-2 border-[#2D2D44] rounded-xl flex items-center justify-center shadow-[2px_2px_0px_#2D2D44] shrink-0">
                                            <Check size={22} strokeWidth={3} className="text-[#2D2D44]" />
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                );
            })()}

            {/* דסקטופ: למה שתי האוכלוסיות יחד */}
            {data.whyTogether && <div className="hidden md:block"><WhyTogetherSection data={data.whyTogether} /></div>}

            {/* מובייל בלבד: חלק 9 – באנר לוגו + כרטיס "חיזוק השייכות החברתית" */}
            {data.whyTogether?.cards?.filter(c => c.type === 'text')?.[0] && (() => {
                const card = data.whyTogether.cards.find(c => c.type === 'text');
                if (!card) return null;
                return (
                    <div className="md:hidden mx-4 mb-12">
                        <div className="bg-white rounded-[24px] border-2 border-[#2D2D44]/10 p-6 shadow-sm text-right">
                            <h3 className="text-xl font-black text-[#2D2D44] mb-4 border-b-2 border-[#2D2D44]/10 pb-3 inline-block">{card.title}</h3>
                            <p className="text-[#2D2D44] leading-relaxed whitespace-pre-line">{card.text}</p>
                        </div>
                    </div>
                );
            })()}

            {/* מובייל בלבד: חלק 10 – באנר לוגו + כרטיס "תיקון, שוויון ושייכות" (כותרת סגולה במרכז) */}
            {data.whyTogether?.cards?.filter(c => c.type === 'text')?.[1] && (() => {
                const textCards = data.whyTogether.cards.filter(c => c.type === 'text');
                const card = textCards[1];
                if (!card) return null;
                return (
                    <div className="md:hidden mx-4 mb-12">
                        <div className="bg-white rounded-[24px] border-2 border-[#2D2D44]/10 p-6 shadow-sm">
                            <h3 className="text-xl font-black text-[#5E3BEE] mb-6 text-center">{card.title}</h3>
                            <p className="text-[#2D2D44] leading-relaxed whitespace-pre-line text-right">{card.text}</p>
                        </div>
                    </div>
                );
            })()}

            <div className="my-20 px-4">
                <NextChapterButton
                    title={data.nextButton?.title ?? 'לפרק הבא'}
                    subtitle={data.nextButton?.subtitle ?? 'פרק 03 - תפקיד הרכזת'}
                    onClick={onNext}
                />
            </div>
        </div>
    );
};

export default Chapter2;