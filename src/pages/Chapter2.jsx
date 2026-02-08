import React, { useState } from 'react';
import { Check, ArrowLeft, Plus, Minus } from 'lucide-react';
import NextChapterButton from '../components/common/NextChapterButton';
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
        <div className="text-[#5E3BEE] font-black text-3xl font-['Salsa'] leading-none">{age}</div>
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
    <div className="relative pt-10 pb-12 text-center max-w-[1400px] mx-auto px-4">
        <div className="hidden lg:block pointer-events-none">
            <div className="absolute top-20 left-20 w-64 h-56 rotate-[-6deg] rounded-3xl overflow-hidden border-[3px] border-[#2D2D44] shadow-[8px_8px_0px_#2D2D44] z-10 bg-gray-200"><img src={data.image1} alt="Group" className="w-full h-full object-cover" /></div>
            <div className="absolute top-0 right-32 w-52 h-40 rotate-[4deg] rounded-3xl overflow-hidden border-[3px] border-[#2D2D44] shadow-[-6px_6px_0px_#2D2D44] z-10 bg-gray-200"><img src={data.image2} alt="Game" className="w-full h-full object-cover" /></div>
            <div className="absolute top-48 right-16 w-64 h-48 rotate-[-3deg] rounded-3xl overflow-hidden border-[3px] border-[#2D2D44] shadow-[-6px_6px_0px_#2D2D44] z-10 bg-gray-200"><img src={data.image3} alt="Stage" className="w-full h-full object-cover" /></div>
        </div>
        <div className="relative z-20 mt-10 lg:mt-32">
            <div className="inline-flex items-center gap-2 bg-[#C5E080] border-2 border-black px-5 py-1.5 rounded-full mb-6 shadow-[3px_3px_0px_black] transform -rotate-1">
                <span className="font-bold text-[#2D2D44]">{data.tag}</span>
                <div className="w-6 h-6 bg-white/40 rounded-full flex items-center justify-center text-xs font-bold border border-black/10">02</div>
            </div>
            <h1 className="text-5xl md:text-7xl font-black text-[#2D2D44] leading-[1.1] mb-4">מי משתתפות <br /><span className="text-[#5E3BEE] relative inline-block">ומשתתפים ברעים<span className="absolute bottom-2 left-0 w-full h-4 bg-[#FFB84C] -z-10 rounded-sm transform -rotate-1"></span></span></h1>
            <div className="flex lg:hidden gap-4 overflow-x-auto mt-10 pb-4 px-4 snap-x no-scrollbar">
                {[data.image1, data.image2, data.image3].map((img, i) => (<div key={i} className="w-64 h-48 rounded-2xl border-2 border-black overflow-hidden snap-center flex-shrink-0 bg-gray-200 shadow-[4px_4px_0px_black]"><img src={img} className="w-full h-full object-cover" /></div>))}
            </div>
        </div>
        <div className="absolute bottom-10 left-10 text-[140px] font-black text-[#5E3BEE]/10 font-['Salsa'] hidden md:block select-none -z-10">02</div>
    </div>
);

const UnifiedOrangeSection = ({ data }) => (
    <div className="w-full max-w-[1300px] mx-auto px-4 mb-32 relative z-20">
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
        <div className="w-full max-w-[1400px] mx-auto px-6 mb-32">
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
        <div className="w-full bg-[#FDFBFF] py-24 border-y border-[#816AFE]/5 relative mb-32">
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
        <SplitStickyLayout stickyContent={StickyHeader} className="mb-32">
            
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
const Chapter2 = ({ data, onNext }) => {
    if (!data) return <div className="text-center p-20 text-[#816AFE]">טוען פרק 2...</div>;
    return (
        <div className="min-h-screen bg-[#FFFDF5] pt-32 pb-0 font-['Rubik'] overflow-x-clip">
            <HeroSection data={data.hero} />
            {data.contentBox && <UnifiedOrangeSection data={data.contentBox} />}
            {data.groupsIntro && <div className="mb-20"><GroupsIntroSection data={data.groupsIntro} /></div>}
            {data.group01 && <GroupDetailsSection data={data.group01} />}
            
            {/* הסקשן האחרון - עכשיו משתמש ב-Layout הגנרי */}
            {data.whyTogether && <WhyTogetherSection data={data.whyTogether} />}
            
            <div className="my-20 px-4"><NextChapterButton title="לפרק הבא" subtitle="פרק 03 - הפעילות שלנו" onClick={onNext} /></div>
        </div>
    );
};

export default Chapter2;