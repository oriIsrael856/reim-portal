import React, { useRef, useState } from 'react';
import { Menu, Star, ChevronRight, ChevronLeft, Send, ThumbsUp, Users, Layers, Bell, ArrowUpLeft, ArrowLeft, X, Home, Facebook, Linkedin, Instagram, Twitter, Lock, Plus, Trash2, Save, Image as ImageIcon, Type, MousePointer } from 'lucide-react';

// ==========================================
// 🛠️ רכיבי עריכה (UI COMPONENTS)
// ==========================================

const adminHoverStyle = "hover:bg-yellow-100/80 hover:ring-2 hover:ring-yellow-400 hover:rounded cursor-text transition-all duration-200";

// 1. טקסט קצר (כותרות)
const EditableText = ({ section, field, value, update, isAdmin, className, tag = 'span', index = null, placeholder = '' }) => {
    if (!isAdmin) return React.createElement(tag, { className }, value);
    
    return (
        <input 
            type="text" 
            value={value} 
            placeholder={placeholder}
            onChange={(e) => update(section, field, e.target.value, index)} 
            onClick={(e) => e.stopPropagation()} 
            className={`bg-transparent border-b-2 border-dashed border-[#5E3BEE]/30 outline-none text-inherit min-w-[30px] w-full ${adminHoverStyle} ${className}`}
        />
    );
};

// 2. טקסט ארוך (פסקאות)
const EditableArea = ({ section, field, value, update, isAdmin, className, index = null }) => {
    if (!isAdmin) return <p className={`whitespace-pre-line ${className}`}>{value}</p>;
    
    return (
        <textarea 
            value={value} 
            onChange={(e) => update(section, field, e.target.value, index)} 
            onClick={(e) => e.stopPropagation()}
            className={`bg-transparent border-2 border-dashed border-[#5E3BEE]/30 rounded-lg p-2 outline-none w-full min-h-[100px] text-inherit resize-y ${adminHoverStyle} ${className}`}
        />
    );
};

// 3. תמונה ניתנת לעריכה
const EditableImage = ({ section, field, src, update, isAdmin, className, alt }) => {
    const handleClick = (e) => {
        if (!isAdmin) return;
        e.stopPropagation();
        const newSrc = prompt("הכנס קישור חדש לתמונה:", src);
        if (newSrc) update(section, field, newSrc);
    };

    return (
        <div className={`relative ${className} ${isAdmin ? 'cursor-pointer group hover:ring-4 hover:ring-yellow-400 rounded-xl transition-all' : ''}`} onClick={handleClick}>
            <img src={src} alt={alt} className="w-full h-full object-cover" />
            {isAdmin && (
                <div className="absolute inset-0 bg-black/40 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity backdrop-blur-sm rounded-xl">
                    <div className="bg-white text-black px-4 py-2 rounded-full text-sm font-bold flex gap-2 items-center shadow-lg transform scale-90 group-hover:scale-100 transition-transform">
                        <ImageIcon size={18} /> החלף תמונה
                    </div>
                </div>
            )}
        </div>
    );
};

// ==========================================
// 🏗️ בונה תוכן דינמי (Dynamic Builder)
// ==========================================

const DynamicContentBuilder = ({ blocks, setBlocks, isAdmin }) => {
    
    // הוספת בלוק חדש
    const addBlock = (type) => {
        const newBlock = { 
            id: Date.now(), 
            type: type, 
            content: type === 'button' ? 'לחץ כאן' : type === 'title' ? 'כותרת חדשה' : 'כותרת משנית חדשה' 
        };
        setBlocks([...blocks, newBlock]);
    };

    // עדכון תוכן בלוק
    const updateBlock = (id, newContent) => {
        setBlocks(blocks.map(b => b.id === id ? { ...b, content: newContent } : b));
    };

    // מחיקת בלוק
    const deleteBlock = (id) => {
        if(window.confirm('למחוק את האלמנט הזה?')) {
            setBlocks(blocks.filter(b => b.id !== id));
        }
    };

    return (
        <div className="w-full max-w-7xl mx-auto px-8 mb-20 relative">
            
            {/* סרגל כלים להוספה (מופיע רק למנהל) */}
            {isAdmin && (
                <div className="flex justify-center gap-4 mb-8 bg-white p-4 rounded-2xl shadow-lg border border-purple-100">
                    <span className="text-sm font-bold text-gray-400 flex items-center ml-2">הוספת רכיבים:</span>
                    <button onClick={() => addBlock('title')} className="flex items-center gap-2 bg-purple-100 text-purple-700 px-4 py-2 rounded-lg hover:bg-purple-200 transition font-bold"><Type size={18}/> כותרת</button>
                    <button onClick={() => addBlock('subtitle')} className="flex items-center gap-2 bg-blue-100 text-blue-700 px-4 py-2 rounded-lg hover:bg-blue-200 transition font-bold"><Type size={16}/> כותרת משנית</button>
                    <button onClick={() => addBlock('button')} className="flex items-center gap-2 bg-green-100 text-green-700 px-4 py-2 rounded-lg hover:bg-green-200 transition font-bold"><MousePointer size={18}/> כפתור</button>
                </div>
            )}

            {/* הצגת הבלוקים */}
            <div className="space-y-6 flex flex-col items-center text-center">
                {blocks.map((block) => (
                    <div key={block.id} className="relative group w-full max-w-4xl">
                        
                        {/* כפתור מחיקה לבלוק */}
                        {isAdmin && (
                            <button 
                                onClick={() => deleteBlock(block.id)} 
                                className="absolute -right-10 top-1/2 -translate-y-1/2 bg-red-100 text-red-500 p-2 rounded-full opacity-0 group-hover:opacity-100 transition hover:bg-red-200"
                                title="מחק אלמנט"
                            >
                                <Trash2 size={16}/>
                            </button>
                        )}

                        {/* רנדר לפי סוג */}
                        {block.type === 'title' && (
                            <h2 className="text-4xl md:text-6xl font-black text-[#2D2D44]">
                                <EditableText isAdmin={isAdmin} value={block.content} update={(s, f, val) => updateBlock(block.id, val)} section="dynamic" field="content" />
                            </h2>
                        )}

                        {block.type === 'subtitle' && (
                            <h3 className="text-2xl md:text-3xl font-medium text-[#5E3BEE]">
                                <EditableText isAdmin={isAdmin} value={block.content} update={(s, f, val) => updateBlock(block.id, val)} section="dynamic" field="content" />
                            </h3>
                        )}

                        {block.type === 'button' && (
                            <button className="bg-[#FFD028] text-[#2D2D44] text-xl font-bold px-8 py-3 rounded-full border-2 border-black shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] hover:translate-y-1 hover:shadow-none transition-all active:scale-95 mt-4">
                                <EditableText isAdmin={isAdmin} value={block.content} update={(s, f, val) => updateBlock(block.id, val)} section="dynamic" field="content" />
                            </button>
                        )}
                    </div>
                ))}
                
                {blocks.length === 0 && isAdmin && (
                    <div className="text-gray-400 border-2 border-dashed border-gray-200 rounded-xl p-8 w-full text-center">
                        האזור הזה ריק. השתמשי בכפתורים למעלה להוספת תוכן.
                    </div>
                )}
            </div>
        </div>
    );
};

// ==========================================
// 🏠 רכיבי דף הבית
// ==========================================

const HeroSection = ({ content, update, isAdmin }) => {
    return (
        <div className="relative p-8 md:px-16 md:pt-12 md:pb-0 flex flex-col">
            <main className="flex-grow flex flex-col items-center justify-start text-center relative z-10 pt-4">
                <div className="mb-2">
                    <EditableText isAdmin={isAdmin} section="home" field="heroSubtitle" value={content.heroSubtitle} update={update} className="text-[#2D2D44]/70 text-xl font-medium tracking-wide" tag="p" />
                </div>
                <h1 className="text-5xl md:text-[5rem] font-black leading-[1.1] mb-2 relative z-20">
                    <EditableText isAdmin={isAdmin} section="home" field="heroTitle1" value={content.heroTitle1} update={update} />
                </h1>
                <div className="relative inline-block mb-24 z-20">
                    <h1 className="text-5xl md:text-[5rem] font-black text-[#5E3BEE] relative z-10 leading-[1.1]">
                        <EditableText isAdmin={isAdmin} section="home" field="heroTitle2" value={content.heroTitle2} update={update} />
                    </h1>
                    <div className="absolute bottom-3 right-0 w-[105%] h-6 bg-[#FFD028] -z-0 transform -rotate-1 rounded-full opacity-90 -translate-x-2"></div>
                </div>

                <Star className="absolute top-16 left-[25%] text-[#FFD028] fill-[#FFD028] rotate-12" size={24} />
                <div className="absolute top-32 left-[15%] w-2.5 h-2.5 bg-[#FF5C5C] rounded-full opacity-80"></div>
                <div className="absolute top-52 right-[20%] w-2 h-2 bg-[#4FD1C5] rounded-full opacity-80"></div>

                <div className="flex justify-center items-end gap-3 relative w-full max-w-7xl h-[380px] mt-auto mb-16 px-4 z-30">
                    {["/Image.png", "/Image (1).png", "/Image (2).png", "/Image (3).png", "/Image (4).png"].map((imgSrc, i) => {
                         const isCenter = i === 2;
                         const rotateDeg = isCenter ? 0 : (i < 2 ? -6 + (i*3) : 3 + ((i-2)*3));
                         const translateY = isCenter ? 0 : (i === 1 || i === 3 ? 30 : 60);
                         return (
                             <div key={i} className="relative transition-all duration-500 ease-out hover:scale-110 hover:z-40 hover:-translate-y-12 cursor-pointer"
                                 style={{transform: `rotate(${rotateDeg}deg) translateY(${translateY}px)`, width: isCenter ? '22%' : '17%', maxWidth: isCenter ? '260px' : '200px'}}>
                                 <img src={imgSrc} className="w-full h-auto object-contain drop-shadow-2xl" alt="" />
                             </div>
                         )
                    })}
                </div>
            </main>
        </div>
    );
};

const IntroSection = ({ content, update, isAdmin }) => {
    return (
        <div className="relative w-full max-w-[1100px] mx-auto z-10 mb-20 mt-10 px-8">
            <div className="absolute -top-12 left-1/2 transform -translate-x-1/2 z-20">
                <div className="bg-[#FFD028] p-4 rounded-2xl border-2 border-black rotate-12 shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]"><Send className="text-white fill-white transform rotate-45" size={32} /></div>
            </div>
            <div className="bg-[#5E3BEE] rounded-[40px] px-8 py-16 md:px-24 md:py-20 text-center text-white border-2 border-black shadow-[10px_10px_0px_0px_rgba(0,0,0,1)]">
                <div className="mb-4">
                    <EditableText isAdmin={isAdmin} section="home" field="introSubtitle" value={content.introSubtitle} update={update} className="text-purple-200 text-lg font-medium tracking-wide bg-transparent" />
                </div>
                <div className="mb-8">
                    <EditableText isAdmin={isAdmin} section="home" field="introTitle" value={content.introTitle} update={update} className="text-5xl md:text-6xl font-black tracking-tight bg-transparent" />
                </div>
                <div className="max-w-4xl mx-auto text-lg md:text-xl leading-relaxed opacity-90 font-light">
                    <EditableArea isAdmin={isAdmin} section="home" field="introText" value={content.introText} update={update} className="bg-transparent border-white/30 text-white" />
                </div>
            </div>
        </div>
    );
};

const CarouselSection = ({ cards, setCards, isAdmin, navigateTo }) => {
    const scrollRef = useRef(null);

    const scroll = (direction) => {
        if (scrollRef.current) {
            scrollRef.current.scrollBy({ left: direction === 'right' ? 340 : -340, behavior: 'smooth' });
        }
    };

    const updateCard = (index, field, value) => {
        const newCards = [...cards];
        newCards[index][field] = value;
        setCards(newCards);
    };

    const deleteCard = (index) => {
        if(window.confirm("למחוק כרטיסייה?")) setCards(cards.filter((_, i) => i !== index));
    };

    const addNewCard = () => {
        setCards([...cards, { id: String(cards.length + 1).padStart(2,'0'), title: "כרטיס חדש", desc: "תיאור...", icon: <Star size={32}/> }]);
    };

    return (
        <div className="pb-20">
             <div className="flex justify-between items-end max-w-7xl mx-auto px-8 mb-8">
                <div className="flex gap-3 pb-2 items-center">
                    <button onClick={() => scroll('right')} className="bg-[#EBE5FC] p-3 rounded-full text-[#5E3BEE] hover:bg-purple-200"><ChevronRight size={28} /></button>
                    <button onClick={() => scroll('left')} className="bg-[#EBE5FC] p-3 rounded-full text-[#5E3BEE] hover:bg-purple-200"><ChevronLeft size={28} /></button>
                    {isAdmin && <button onClick={addNewCard} className="bg-[#A4D96C] px-4 py-2 rounded-full text-white font-bold border-2 border-black flex gap-2 mr-4 hover:scale-105 transition"><Plus/> הוסף</button>}
                </div>
                <div className="text-right">
                    <p className="text-slate-500 text-lg font-medium">כל מה שכדאי לדעת</p>
                    <h3 className="text-4xl md:text-5xl font-black text-[#2D2D44]">המדריכה לרכזות ורכזים</h3>
                </div>
            </div>

            <div ref={scrollRef} className="flex gap-6 overflow-x-auto pb-16 pt-4 max-w-[100vw] md:max-w-7xl mx-auto px-4 no-scrollbar snap-x scroll-smooth">
                {cards.map((item, index) => (
                    <div key={index} 
                         onClick={() => { if(!isAdmin && item.id === "01") navigateTo('chapter1'); }}
                         className={`min-w-[280px] w-[300px] h-[400px] bg-white rounded-2xl p-8 flex flex-col relative transition-all duration-300 group snap-center border-2 border-transparent hover:border-black hover:bg-[#FFF9F0] hover:shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] hover:-translate-y-2 cursor-pointer ${isAdmin ? 'hover:ring-4 hover:ring-yellow-200' : ''}`}>
                        
                        {isAdmin && <button onClick={(e) => {e.stopPropagation(); deleteCard(index)}} className="absolute -top-3 -right-3 bg-red-500 text-white p-2 rounded-full z-50 hover:bg-red-600 transition shadow-md"><Trash2 size={16}/></button>}
                        
                        <div className="absolute top-6 left-6 opacity-0 group-hover:opacity-100 transition-opacity"><div className="bg-[#FFB020] rounded-full p-2"><ArrowUpLeft className="text-white transform -rotate-45" size={20} /></div></div>
                        
                        <span className="text-[40px] font-['Salsa'] text-[#2D2D44] group-hover:text-[#FFB020] mb-auto block w-full">
                            {isAdmin ? <input value={item.id} onChange={(e) => updateCard(index, 'id', e.target.value)} onClick={(e) => e.stopPropagation()} className={`w-20 bg-transparent border-b border-dashed border-blue-500 ${adminHoverStyle}`} /> : item.id}
                        </span>
                        
                        <div className="mt-auto text-right w-full">
                            <div className="mb-6 text-[#2D2D44] group-hover:text-[#FFB020]">{item.icon}</div>
                            <h4 className="text-2xl font-black text-[#2D2D44] group-hover:text-[#FFB020] mb-3 leading-tight w-full">
                                {isAdmin ? <input value={item.title} onChange={(e) => updateCard(index, 'title', e.target.value)} onClick={(e) => e.stopPropagation()} className={`w-full bg-transparent border-b border-dashed border-blue-500 ${adminHoverStyle}`} /> : item.title}
                            </h4>
                            <div className="text-slate-500 group-hover:text-[#2D2D44] text-sm font-medium w-full">
                                {isAdmin ? <textarea value={item.desc} onChange={(e) => updateCard(index, 'desc', e.target.value)} onClick={(e) => e.stopPropagation()} className={`w-full h-20 bg-transparent border border-dashed border-blue-500 ${adminHoverStyle}`} /> : item.desc}
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

// ==========================================
// 📖 רכיבי פרק 1
// ==========================================

const Chapter1Hero = ({ content, update, isAdmin }) => {
    return (
        <div className="p-8 md:px-20 md:py-12 flex flex-col items-center relative z-10">
            <div className="flex flex-col md:flex-row items-center justify-between w-full max-w-7xl gap-12 mt-10">
                <div className="w-full md:w-5/12 text-right relative z-10">
                    <div className="inline-block bg-[#C5E080] border-2 border-black rounded-full px-6 py-1.5 mb-8 shadow-[2px_2px_0px_0px_rgba(0,0,0,1)]">
                        <span className="font-bold text-[#2D2D44] tracking-wide">
                             <EditableText isAdmin={isAdmin} section="chapter1" field="tag" value={content.tag} update={update} />
                        </span>
                    </div>
                    <h1 className="text-6xl md:text-8xl font-black text-[#2D2D44] leading-[1.1] mb-4">
                        <EditableText isAdmin={isAdmin} section="chapter1" field="title1" value={content.title1} update={update} />
                    </h1>
                    <div className="relative inline-block">
                        <h1 className="text-6xl md:text-8xl font-black text-[#5E3BEE] leading-[1.1]">
                            <EditableText isAdmin={isAdmin} section="chapter1" field="title2" value={content.title2} update={update} />
                        </h1>
                        <div className="absolute -bottom-2 right-0 w-full h-4 bg-[#FFD028] -z-10 transform -rotate-1"></div>
                    </div>
                </div>

                <div className="relative w-full md:w-6/12 h-[500px] flex items-center justify-center">
                     <div className="relative z-10 w-[90%] h-[320px] rounded-[30px] overflow-hidden border-2 border-black shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] rotate-[-2deg] bg-white">
                        <EditableImage isAdmin={isAdmin} section="chapter1" field="mainImage" src={content.mainImage} update={update} alt="Main" className="w-full h-full" />
                     </div>
                     <div className="absolute z-20 -right-2 -bottom-4 w-44 h-56 bg-white p-2 pb-8 shadow-2xl rotate-[4deg] rounded-lg border border-gray-200">
                        <div className="w-full h-full bg-slate-100 rounded overflow-hidden relative">
                             <EditableImage isAdmin={isAdmin} section="chapter1" field="secondaryImage" src={content.secondaryImage} update={update} alt="Secondary" className="w-full h-full" />
                        </div>
                     </div>
                </div>
            </div>
        </div>
    );
};

const Chapter1Cards = ({ content, update, isAdmin }) => {
    return (
        <div className="relative z-20 px-8 md:px-20 pb-0 w-full max-w-5xl mx-auto flex flex-col gap-12 mt-10">
            <div className="sticky top-32 z-0 bg-white rounded-[40px] border-2 border-[#2D2D44] shadow-[8px_8px_0px_0px_rgba(45,45,68,1)] p-8 md:p-16 text-right mb-[400px]">
                <h2 className="text-4xl md:text-5xl font-black text-[#5E3BEE] mb-4">
                    <EditableText isAdmin={isAdmin} section="chapter1" field="card1Title" value={content.card1Title} update={update} />
                </h2>
                <h3 className="text-xl md:text-2xl font-bold text-[#5E3BEE] mb-8 leading-relaxed max-w-3xl">
                     <EditableArea isAdmin={isAdmin} section="chapter1" field="card1Subtitle" value={content.card1Subtitle} update={update} />
                </h3>
                <div className="space-y-6 text-[#2D2D44] text-lg leading-relaxed md:pl-12">
                     <EditableArea isAdmin={isAdmin} section="chapter1" field="card1Text" value={content.card1Text} update={update} />
                </div>
            </div>

            <div className="relative z-10 bg-white rounded-[40px] border-2 border-[#2D2D44] shadow-[8px_8px_0px_0px_rgba(45,45,68,1)] p-8 md:p-16 text-right">
                <h2 className="text-4xl md:text-5xl font-black text-[#5E3BEE] mb-12 text-center md:text-right">
                    <EditableText isAdmin={isAdmin} section="chapter1" field="card2MainTitle" value={content.card2MainTitle} update={update} />
                </h2>
                
                <div className="mb-16">
                    <div className="flex justify-start mb-6">
                         <div className="inline-flex items-center gap-3 bg-[#C5E080] border-2 border-black rounded-full px-6 py-2 shadow-[2px_2px_0px_0px_rgba(0,0,0,1)]">
                             <span className="font-black text-[#2D2D44] text-xl">
                                 <EditableText isAdmin={isAdmin} section="chapter1" field="card2Sec1Title" value={content.card2Sec1Title} update={update} />
                             </span>
                             <ArrowLeft size={24} className="text-[#2D2D44]" />
                         </div>
                    </div>
                    <div className="space-y-6 text-[#2D2D44] text-lg leading-relaxed md:pl-12">
                        <EditableArea isAdmin={isAdmin} section="chapter1" field="card2Sec1Text" value={content.card2Sec1Text} update={update} />
                    </div>
                </div>

                <div>
                    <div className="flex justify-end mb-6">
                         <div className="inline-flex items-center flex-row-reverse gap-3 bg-[#C5E080] border-2 border-black rounded-full px-6 py-2 shadow-[2px_2px_0px_0px_rgba(0,0,0,1)]">
                             <span className="font-black text-[#2D2D44] text-xl">
                                 <EditableText isAdmin={isAdmin} section="chapter1" field="card2Sec2Title" value={content.card2Sec2Title} update={update} />
                             </span>
                             <ArrowLeft size={24} className="text-[#2D2D44] rotate-180" />
                         </div>
                    </div>
                    <div className="space-y-6 text-[#2D2D44] text-lg leading-relaxed md:pr-12" dir="rtl">
                        <EditableArea isAdmin={isAdmin} section="chapter1" field="card2Sec2Text" value={content.card2Sec2Text} update={update} />
                    </div>
                </div>
            </div>
        </div>
    );
};

const ExpandingBanner = ({ content, update, isAdmin }) => {
    return (
        <div className="w-full flex justify-center mt-20 mb-12 px-4">
             <div className="bg-[#5E3BEE] w-full max-w-5xl hover:max-w-[98vw] rounded-[40px] border-2 border-black shadow-[8px_8px_0px_0px_rgba(45,45,68,1)] h-64 flex flex-col items-center justify-center relative overflow-hidden group cursor-pointer transition-all duration-700 ease-[cubic-bezier(0.25,1,0.5,1)]">
                <div className="text-center z-10 min-w-max">
                    <h2 className="text-white text-5xl font-black mb-3">
                        <EditableText isAdmin={isAdmin} section="chapter1" field="bannerTitle" value={content.bannerTitle} update={update} className="bg-transparent border-white text-white" />
                    </h2>
                    <p className="text-purple-200 text-xl font-medium tracking-wide opacity-90">
                        <EditableText isAdmin={isAdmin} section="chapter1" field="bannerSubtitle" value={content.bannerSubtitle} update={update} className="bg-transparent border-white/50 text-purple-200" />
                    </p>
                </div>
                <div className="absolute left-12 top-1/2 -translate-y-1/2 bg-white w-16 h-24 rounded-2xl border-2 border-black flex items-center justify-center shadow-lg group-hover:-translate-x-4 transition-transform duration-500 delay-100 ease-out z-20">
                        <ArrowLeft className="text-[#5E3BEE] group-hover:scale-110 transition-transform duration-300" size={32} />
                </div>
            </div>
        </div>
    );
};

// ==========================================
// 🚀 האפליקציה הראשית
// ==========================================

const App = () => {
  const [currentPage, setCurrentPage] = useState('home'); 
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isAdmin, setIsAdmin] = useState(false); 

  // --- STATE מרכזי ---
  const [siteContent, setSiteContent] = useState({
      home: {
          heroSubtitle: "ברוכים.ות הבאים.ות",
          heroTitle1: "לפורטל הרכזים והרכזות",
          heroTitle2: "של תוכנית רעים",
          introSubtitle: "אז, איפה מתחילים?",
          introTitle: "התחלה חדשה בפתח",
          introText: "תפקיד הרכזות ברעים הוא תפקיד משמעותי וייחודי: להוביל קבוצה של משתתפים ומשתתפות מהמגוון האוטיסטי או עם לקויות למידה מורכבות, ליצירת חיי חברה, תחושת שייכות לקבוצה וקהילה."
      },
      chapter1: {
          tag: "פרק ראשון",
          title1: "תכנית רעים:",
          title2: "נעים להכיר",
          mainImage: "/page1.png",
          secondaryImage: "/Image (3).png",
          card1Title: "התוכנית",
          card1Subtitle: "תכנית רעים מקיימת קבוצות שייכות חברתיות עבור משתתפים ומשתתפות מהמגוון האוטיסטי ועם לקויות למידה נרחבות.",
          card1Text: "המשתתפים והמשתתפות נפגשים אחת לשבוע במסגרת קבועה, למפגש חברתי בהנחיית רכזת מקצועית. המפגש הקבוע יוצר מרחב בטוח שבו כל אחד ואחת מביאים את עצמם, חוזקות, תחומי עניין, יצירתיות וניסיון חיים, ותורמים לעושר הקבוצתי.\n\nהמודל הייחודי של רעים מבוסס על בניית קבוצת השתייכות.",
          card2MainTitle: "מאיפה באנו ולאן אנחנו הולכות",
          card2Sec1Title: "מאיפה באנו?",
          card2Sec1Text: "רעים נולדה בשנת 2002 בירושלים, כיוזמה של אם שחיפשה מקום של שייכות לבתה, נערה צעירה שחוותה בדידות ותחושת חוסר שייכות.",
          card2Sec2Title: "לאן אנחנו הולכות?",
          card2Sec2Text: "\"רעים\" שואפת להמשיך להיות בית של שייכות בכל קהילה בארץ- מקום שבו יש מקום לשונות. הקבוצות נועדו לאפשר מרחב אמיתי של קשרים ושייכות.",
          bannerTitle: "לפרק הבא",
          bannerSubtitle: "פרק 02 - מי משתתפות ומשתתפים ברעים"
      }
  });

  // כרטיסי קרוסלה
  const [cards, setCards] = useState([
      { id: "01", title: "תוכנית רעים:\nנעים להכיר", desc: "מהי תוכנית \"רעים\",\nמאיפה באנו ולאן אנחנו הולכים", icon: <ThumbsUp size={32} strokeWidth={1.5} /> },
      { id: "02", title: "מי משתתפות\nומשתתפים ברעים", desc: "למי מיועדת התכנית, מטרות, אוכלוסיות משתתפות", icon: <Users size={32} strokeWidth={1.5} /> },
      { id: "03", title: "תפקיד הרכזת", desc: "הגדרה, צעדים ראשונים וניהול קבוצה", icon: <Star size={32} strokeWidth={1.5} /> },
      { id: "04", title: "עבודה מנהלית", desc: "נתיב, ועדות, גבייה, נהלים וטפסים", icon: <Layers size={32} strokeWidth={1.5} /> },
      { id: "05", title: "כלים מעשיים", desc: "שיווק, רכזיה וניוזלטר", icon: <Bell size={32} strokeWidth={1.5} /> }
  ]);

  // פריטי תפריט
  const [menuItems, setMenuItems] = useState([
      { id: "01", title: "תוכנית רעים: נעים להכיר", page: "chapter1" },
      { id: "02", title: "המשתתפים והמשתתפות", page: "home" },
      { id: "03", title: "תפקיד הרכזת", page: "home" },
      { id: "04", title: "עבודה מנהלית", page: "home" },
      { id: "05", title: "כלים מעשיים", page: "home" }
  ]);

  // בלוקים דינמיים חדשים
  const [dynamicBlocks, setDynamicBlocks] = useState([]);

  // --- ניהול פונקציונליות --- //

  const updateContent = (section, field, value) => {
      setSiteContent(prev => ({
          ...prev,
          [section]: {
              ...prev[section],
              [field]: value
          }
      }));
  };

  const updateMenuItem = (index, field, value) => {
      const newItems = [...menuItems];
      newItems[index][field] = value;
      setMenuItems(newItems);
  };

  const addMenuItem = () => {
      const nextId = String(menuItems.length + 1).padStart(2, '0');
      setMenuItems([...menuItems, { id: nextId, title: "פריט תפריט חדש", page: "home" }]);
  };

  const deleteMenuItem = (index) => {
      if(window.confirm('למחוק פריט מהתפריט?')) {
          setMenuItems(menuItems.filter((_, i) => i !== index));
      }
  };

  const navigateTo = (page) => {
      if(isAdmin && page !== currentPage) return;
      setCurrentPage(page);
      setIsMenuOpen(false);
      window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleAdminLogin = () => {
      if (isAdmin) {
          setIsAdmin(false);
      } else {
          const pass = prompt("הכנס סיסמת מנהל:");
          if (pass === "admin123") setIsAdmin(true);
      }
  };

  return (
    <div dir="rtl" className="flex min-h-screen bg-[#F8F7FF] font-sans select-none text-[#2D2D44]">
      <style>
        {`@import url('https://fonts.googleapis.com/css2?family=Rubik:wght@300;400;500;700;900&family=Salsa&display=swap');
          .no-scrollbar::-webkit-scrollbar { display: none; }
          .no-scrollbar { -ms-overflow-style: none; scrollbar-width: none; }
        `}
      </style>
      
      {isAdmin && (
          <div className="fixed top-0 left-0 right-0 h-16 bg-[#2D2D44] text-white z-[100] flex items-center justify-between px-8 shadow-2xl">
              <div className="flex items-center gap-4">
                  <div className="bg-red-500 px-3 py-1 rounded font-bold text-sm animate-pulse">מצב עריכה</div>
                  <span className="text-sm opacity-70">לחצי על טקסט או תמונה כדי לערוך</span>
              </div>
              <button onClick={() => setIsAdmin(false)} className="flex items-center gap-2 bg-slate-600 hover:bg-slate-500 px-4 py-2 rounded-lg transition">
                  <Save size={18} /> שמירה ויציאה
              </button>
          </div>
      )}

      {/* כפתור מנהל - צף למטה משמאל */}
      <button 
          onClick={handleAdminLogin}
          className="fixed bottom-5 left-5 z-[9999] bg-white p-3 rounded-full shadow-xl border border-gray-200 text-gray-400 hover:text-[#5E3BEE] hover:scale-110 transition-all"
          title="כניסת מנהל"
      >
          <Lock size={20} />
      </button>

      {/* MENU OVERLAY */}
      <div className={`fixed inset-0 z-[60] transition-opacity duration-300 ${isMenuOpen ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'}`}>
          <div className="absolute inset-0 bg-[#2D2D44]/60 backdrop-blur-sm" onClick={() => setIsMenuOpen(false)}></div>
          <div className={`absolute top-0 right-0 h-full w-full max-w-[600px] bg-white shadow-2xl rounded-l-[50px] p-12 md:pr-20 overflow-y-auto transition-transform duration-500 ease-out ${isMenuOpen ? 'translate-x-0' : 'translate-x-full'}`}>
              <button onClick={() => setIsMenuOpen(false)} className="absolute top-1/2 -translate-y-1/2 -left-14 bg-white w-14 h-24 rounded-l-full flex items-center justify-center shadow-[-5px_0px_20px_rgba(0,0,0,0.05)] hover:bg-slate-50 transition-colors">
                 <X size={32} className="text-[#2D2D44]" strokeWidth={2.5} />
              </button>
              <div className="flex flex-col gap-2 mt-8 font-['Rubik']">
                  <div onClick={() => navigateTo('home')} className="flex items-center gap-6 p-4 rounded-2xl hover:bg-purple-50 cursor-pointer group transition-colors mb-4">
                      <div className="w-12 h-12 flex items-center justify-center"><Home size={32} className="text-[#EBE5FC] group-hover:text-[#5E3BEE] transition-colors" fill="currentColor" /></div>
                      <span className="text-2xl font-bold text-[#2D2D44]">דף הבית</span>
                  </div>
                  
                  {/* רשימת תפריט דינמית */}
                  {menuItems.map((item, index) => (
                      <div key={item.id} onClick={() => navigateTo(item.page)} className={`relative flex items-center h-28 cursor-pointer group ${isAdmin ? 'hover:bg-yellow-50 rounded-lg p-2' : ''}`}>
                          {isAdmin && (
                              <button onClick={(e) => {e.stopPropagation(); deleteMenuItem(index)}} className="absolute left-4 z-50 bg-red-100 text-red-500 p-2 rounded-full hover:bg-red-200">
                                  <Trash2 size={16}/>
                              </button>
                          )}
                          <span className="absolute -right-4 text-[100px] font-black font-['Salsa'] text-[#F3F0FF] group-hover:text-[#EBE5FC] transition-colors select-none -z-10 leading-none">
                              {isAdmin ? (
                                  <input 
                                    value={item.id} 
                                    onChange={(e) => updateMenuItem(index, 'id', e.target.value)} 
                                    onClick={(e) => e.stopPropagation()}
                                    className="bg-transparent border-b-2 border-dashed border-blue-300 w-32"
                                  />
                              ) : item.id}
                          </span>
                          <span className="mr-24 text-2xl font-bold text-[#2D2D44] group-hover:text-[#5E3BEE] transition-colors z-10 w-full">
                               {isAdmin ? (
                                  <input 
                                    value={item.title} 
                                    onChange={(e) => updateMenuItem(index, 'title', e.target.value)} 
                                    onClick={(e) => e.stopPropagation()}
                                    className="bg-transparent border-b-2 border-dashed border-blue-300 w-full"
                                  />
                              ) : item.title}
                          </span>
                      </div>
                  ))}

                  {/* כפתור הוספת פריט לתפריט (רק למנהל) */}
                  {isAdmin && (
                      <button onClick={addMenuItem} className="mt-4 flex items-center justify-center gap-2 bg-[#5E3BEE] text-white p-3 rounded-xl hover:bg-[#4c30bf] transition w-full">
                          <Plus size={20} /> הוספת פריט לתפריט
                      </button>
                  )}
              </div>
          </div>
      </div>

      {/* SIDEBAR - RIGHT SIDE */}
      <nav className={`sticky top-0 h-screen w-20 bg-[#5E3BEE] text-white flex flex-col items-center py-8 shadow-2xl z-50 rounded-l-3xl flex-shrink-0 order-first ${isAdmin ? 'mt-16' : ''}`}>
        <div onClick={() => navigateTo('home')} className="mt-24 transform -rotate-90 origin-center whitespace-nowrap font-bold text-lg tracking-wider opacity-90 cursor-pointer hover:opacity-100 transition">
          {currentPage === 'home' ? 'דף הבית' : 'תכנית רעים'}
        </div>
        <div className="w-1 h-8 bg-white/20 my-8 rounded-full"></div>
        <button onClick={() => setIsMenuOpen(true)} className="mt-auto bg-white text-[#5E3BEE] p-3 rounded-full shadow-lg hover:bg-purple-50 transition transform hover:scale-110 active:scale-95">
          <Menu size={24} />
        </button>
        <div className="absolute left-0 top-1/2 -translate-y-1/2 w-1.5 h-12 bg-white rounded-r-lg opacity-40"></div>
      </nav>

      {/* CONTENT AREA */}
      <div className={`flex-grow flex flex-col font-['Rubik'] bg-[radial-gradient(ellipse_at_top_left,_var(--tw-gradient-stops))] from-purple-100/50 via-transparent to-transparent overflow-y-auto ${isAdmin ? 'mt-16' : ''}`}>
          
          <header className="flex justify-between items-center p-8 md:px-16 md:pt-12 relative z-20">
                <div onClick={() => navigateTo('home')} className="cursor-pointer"><img src="/Logo (1).png" alt="לוגו רעים" className="h-16 w-auto object-contain" /></div>
                <button className="hover:scale-105 transition-transform cursor-pointer">
                    <img src="/Animated button.png" alt="הרשמה לניוזלטר" className="h-14 w-auto object-contain" />
                </button>
          </header>

          {currentPage === 'home' && (
              <>
                <HeroSection content={siteContent.home} update={updateContent} isAdmin={isAdmin} />
                <div className="relative px-8 md:px-16 pb-20 pt-10 bg-gradient-to-b from-[#F8F7FF] via-purple-50 to-white">
                    <IntroSection content={siteContent.home} update={updateContent} isAdmin={isAdmin} />
                    <CarouselSection cards={cards} setCards={setCards} isAdmin={isAdmin} navigateTo={navigateTo} />
                    
                    {/* --- אזור תוכן דינמי (Dynamic Builder) --- */}
                    <div className="mt-20 border-t border-purple-100 pt-10">
                        <h3 className="text-center text-2xl font-black text-[#2D2D44] mb-8 opacity-50">אזור תוכן דינמי</h3>
                        <DynamicContentBuilder blocks={dynamicBlocks} setBlocks={setDynamicBlocks} isAdmin={isAdmin} />
                    </div>
                </div>
              </>
          )}

          {currentPage === 'chapter1' && (
              <div className="relative min-h-screen bg-[#F8F7FF] font-['Rubik'] overflow-x-hidden">
                  <Chapter1Hero content={siteContent.chapter1} update={updateContent} isAdmin={isAdmin} />
                  <Chapter1Cards content={siteContent.chapter1} update={updateContent} isAdmin={isAdmin} />
                  <ExpandingBanner content={siteContent.chapter1} update={updateContent} isAdmin={isAdmin} />
              </div>
          )}
          
          {/* FOOTER */}
          <div className="bg-white">
            {currentPage === 'home' && (
                <div className="px-8 md:px-16 pt-10 pb-20">
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-7xl mx-auto h-auto md:h-[500px]">
                        <div className="h-[400px] md:h-full rounded-[32px] overflow-hidden border border-slate-100 shadow-md relative group">
                            <img src="https://images.unsplash.com/photo-1556761175-5973dc0f32e7?w=800&auto=format&fit=crop&q=60" alt="" className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" />
                        </div>
                        <div className="h-[500px] md:h-full bg-[#D1E68F] rounded-[32px] border-2 border-black shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] p-8 flex flex-col items-center justify-center text-center relative overflow-hidden group">
                            <h3 className="text-5xl font-black text-[#2D2D44] mb-6">ניוזלטר רעים</h3>
                            <p className="text-[#2D2D44] text-lg max-w-xs mb-12 leading-relaxed font-medium">מנה חודשית מרוכזת של חדשות, משחק ומיטב ההשראה מהשטח.</p>
                        </div>
                        <div className="h-[400px] md:h-full rounded-[32px] overflow-hidden border border-slate-100 shadow-md relative group">
                            <img src="https://images.unsplash.com/photo-1522071820081-009f0129c71c?w=800&auto=format&fit=crop&q=60" alt="" className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" />
                        </div>
                    </div>
                </div>
            )}

            <footer className="bg-[#F3F0FF] py-12 px-8 border-t border-purple-100">
                <div className="max-w-7xl mx-auto">
                    <div className="flex flex-col md:flex-row justify-between gap-12 mb-12">
                        <div className="flex flex-col gap-6">
                            <div className="flex items-center gap-6">
                                <img src="/Logo (1).png" alt="לוגו רעים" className="h-10 w-auto object-contain" />
                                <div className="h-8 w-[1px] bg-[#2D2D44]/20"></div>
                                <div className="text-right"><p className="font-bold text-[#2D2D44] text-sm">החברה למתנ״סים</p><p className="text-xs text-[#2D2D44]/70">מרכזים קהילתיים בישראל</p></div>
                            </div>
                        </div>
                    </div>
                </div>
            </footer>
          </div>
      </div>
    </div>
  );
};

export default App;