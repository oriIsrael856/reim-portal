import React, { useRef, useState } from 'react';
import { Menu, ArrowDown, Star, ChevronRight, ChevronLeft, Send, ThumbsUp, Users, Layers, Bell, ArrowUpLeft, ArrowLeft, X, Home, Facebook, Linkedin, Instagram, Twitter } from 'lucide-react';

const App = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false); // ניהול מצב התפריט
  const scrollRef = useRef(null);

  const scroll = (direction) => {
    if (scrollRef.current) {
      const { current } = scrollRef;
      const scrollAmount = 340;
      if (direction === 'left') {
        current.scrollBy({ left: -scrollAmount, behavior: 'smooth' });
      } else {
        current.scrollBy({ left: scrollAmount, behavior: 'smooth' });
      }
    }
  };

  const images = ["/Image.png", "/Image (1).png", "/Image (2).png", "/Image (3).png", "/Image (4).png"];

  const cardsData = [
      { id: "01", title: "תוכנית רעים: נעים להכיר", desc: "מהי תוכנית \"רעים\", מאיפה באנו ולאן אנחנו הולכים", icon: <ThumbsUp size={32} strokeWidth={1.5} /> },
      { id: "02", title: "המשתתפים והמשתתפות", desc: "למי מיועדת התכנית, מטרות, אוכלוסיות משתתפות", icon: <Users size={32} strokeWidth={1.5} /> },
      { id: "03", title: "תפקיד הרכזת", desc: "הגדרה, צעדים ראשונים וניהול קבוצה", icon: <Star size={32} strokeWidth={1.5} /> },
      { id: "04", title: "עבודה מנהלית", desc: "נתיב, ועדות, גבייה, נהלים וטפסים", icon: <Layers size={32} strokeWidth={1.5} /> },
      { id: "05", title: "כלים מעשיים", desc: "שיווק, רכזיה וניוזלטר", icon: <Bell size={32} strokeWidth={1.5} /> }
  ];

  return (
    <div dir="rtl" className="flex min-h-screen bg-[#F8F7FF] font-sans select-none text-[#2D2D44]">
      <style>
        {`@import url('https://fonts.googleapis.com/css2?family=Rubik:wght@300;400;500;700;900&family=Salsa&display=swap');
          .no-scrollbar::-webkit-scrollbar { display: none; }
          .no-scrollbar { -ms-overflow-style: none; scrollbar-width: none; }
        `}
      </style>
      
      {/* ==================== תפריט המבורגר נפתח (Overlay) ==================== */}
      <div className={`fixed inset-0 z-[60] transition-opacity duration-300 ${isMenuOpen ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'}`}>
          
          {/* רקע כהה (Backdrop) */}
          <div className="absolute inset-0 bg-[#2D2D44]/60 backdrop-blur-sm" onClick={() => setIsMenuOpen(false)}></div>
          
          {/* פאנל התפריט הלבן */}
          <div className={`absolute top-0 right-20 h-full w-full max-w-[600px] bg-white shadow-2xl rounded-l-[50px] p-12 md:pr-20 overflow-y-auto transition-transform duration-500 ease-out ${isMenuOpen ? 'translate-x-0' : 'translate-x-full'}`}>
              
              {/* כפתור סגירה (X) - לשונית בולטת משמאל */}
              <button 
                onClick={() => setIsMenuOpen(false)}
                className="absolute top-1/2 -translate-y-1/2 -left-14 bg-white w-14 h-24 rounded-l-full flex items-center justify-center shadow-[-5px_0px_20px_rgba(0,0,0,0.05)] hover:bg-slate-50 transition-colors"
              >
                 <X size={32} className="text-[#2D2D44]" strokeWidth={2.5} />
              </button>

              {/* תוכן התפריט */}
              <div className="flex flex-col gap-2 mt-8 font-['Rubik']">
                  
                  {/* דף הבית */}
                  <div className="flex items-center gap-6 p-4 rounded-2xl hover:bg-purple-50 cursor-pointer group transition-colors mb-4">
                      <div className="w-12 h-12 flex items-center justify-center">
                         <Home size={32} className="text-[#EBE5FC] group-hover:text-[#5E3BEE] transition-colors" fill="currentColor" />
                      </div>
                      <span className="text-2xl font-bold text-[#2D2D44]">דף הבית</span>
                  </div>

                  {/* רשימת הפריטים עם המספרים הגדולים */}
                  {cardsData.map((item) => (
                      <div key={item.id} className="relative flex items-center h-28 cursor-pointer group">
                          {/* מספר רקע ענק */}
                          <span className="absolute -right-4 text-[100px] font-black font-['Salsa'] text-[#F3F0FF] group-hover:text-[#EBE5FC] transition-colors select-none -z-10 leading-none">
                              {item.id}
                          </span>
                          
                          {/* טקסט */}
                          <span className="mr-24 text-2xl font-bold text-[#2D2D44] group-hover:text-[#5E3BEE] transition-colors z-10">
                              {item.title.replace('\n', ' ')}
                          </span>
                      </div>
                  ))}
              </div>
          </div>
      </div>


      {/* Sidebar - סרגל צד קבוע */}
      <nav className="sticky top-0 h-screen w-20 bg-[#5E3BEE] text-white flex flex-col items-center py-8 shadow-2xl z-50 rounded-l-3xl font-['Rubik'] flex-shrink-0">
        <div className="mt-24 transform -rotate-90 origin-center whitespace-nowrap font-bold text-lg tracking-wider opacity-90 cursor-pointer hover:opacity-100 transition">
          דף הבית
        </div>
        <div className="w-1 h-8 bg-white/20 my-8 rounded-full"></div>
        
        {/* כפתור המבורגר - פותח את התפריט */}
        <button 
            onClick={() => setIsMenuOpen(true)}
            className="mt-auto bg-white text-[#5E3BEE] p-3 rounded-full shadow-lg hover:bg-purple-50 transition transform hover:scale-110 active:scale-95"
        >
          <Menu size={24} />
        </button>
        
        <div className="absolute left-0 top-1/2 -translate-y-1/2 w-1.5 h-12 bg-white rounded-r-lg opacity-40"></div>
      </nav>

      {/* Main Content Area */}
      <div className="flex-grow flex flex-col font-['Rubik'] bg-[radial-gradient(ellipse_at_top_left,_var(--tw-gradient-stops))] from-purple-100/50 via-transparent to-transparent overflow-y-auto">
        
        {/* HERO */}
        <div className="relative p-8 md:px-16 md:pt-12 md:pb-0 min-h-screen flex flex-col">
            <header className="flex justify-between items-center mb-6 relative z-20">
                <div><img src="/Logo (1).png" alt="לוגו רעים" className="h-16 w-auto object-contain" /></div>
                <button className="hover:scale-105 transition-transform cursor-pointer">
                    <img src="/Animated button.png" alt="הרשמה לניוזלטר" className="h-14 w-auto object-contain" />
                </button>
            </header>

            <main className="flex-grow flex flex-col items-center justify-start text-center relative z-10 pt-4">
                <p className="text-[#2D2D44]/70 text-xl mb-1 font-medium tracking-wide">ברוכים.ות הבאים.ות</p>
                <h1 className="text-5xl md:text-[5rem] font-black leading-[1.1] mb-2 relative z-20">לפורטל הרכזים והרכזות</h1>
                <div className="relative inline-block mb-24 z-20">
                    <h1 className="text-5xl md:text-[5rem] font-black text-[#5E3BEE] relative z-10 leading-[1.1]">של תוכנית רעים</h1>
                    <div className="absolute bottom-3 right-0 w-[105%] h-6 bg-[#FFD028] -z-0 transform -rotate-1 rounded-full opacity-90 -translate-x-2"></div>
                </div>

                {/* Decorative Elements */}
                <img src="/Vector 1.png" className="absolute top-24 right-[15%] w-16 md:w-20 opacity-90 animate-pulse" style={{transform: 'rotate(-15deg)'}} alt="" />
                <img src="/Vector 1.png" className="absolute top-48 left-[20%] w-14 md:w-16 opacity-90" style={{transform: 'scaleX(-1) rotate(15deg)'}} alt="" />
                <img src="/Vector 3.png" className="absolute top-60 left-[18%] w-20 md:w-24 opacity-60 rotate-12" alt="" />
                <Star className="absolute top-16 left-[25%] text-[#FFD028] fill-[#FFD028] rotate-12" size={24} />
                <Star className="absolute top-40 right-[28%] text-[#FFD028] fill-[#FFD028] -rotate-12 opacity-80" size={16} />
                <div className="absolute top-32 left-[15%] w-2.5 h-2.5 bg-[#FF5C5C] rounded-full opacity-80"></div>
                <div className="absolute top-52 right-[20%] w-2 h-2 bg-[#4FD1C5] rounded-full opacity-80"></div>

                <div className="flex justify-center items-end gap-3 relative w-full max-w-7xl h-[380px] mt-auto mb-16 px-4 z-30">
                    {images.map((imgSrc, i) => {
                        const isCenter = i === 2;
                        const rotateDeg = isCenter ? 0 : (i < 2 ? -6 + (i*3) : 3 + ((i-2)*3));
                        const translateY = isCenter ? 0 : (i === 1 || i === 3 ? 30 : 60);
                        const zIndex = isCenter ? 30 : (i === 1 || i === 3 ? 20 : 10);
                        return (
                            <div key={i} className="relative transition-all duration-500 ease-out hover:scale-110 hover:z-40 hover:-translate-y-12 cursor-pointer group"
                                style={{transform: `rotate(${rotateDeg}deg) translateY(${translateY}px)`, zIndex: zIndex, width: isCenter ? '22%' : '17%', maxWidth: isCenter ? '260px' : '200px', flexShrink: 0}}>
                                <img src={imgSrc} className="w-full h-auto object-contain drop-shadow-2xl hover:drop-shadow-[0_20px_20px_rgba(0,0,0,0.25)] transition-all" alt="" />
                            </div>
                        )
                    })}
                </div>
            </main>
            
            <div className="absolute bottom-10 left-1/2 transform -translate-x-1/2 z-40">
                <button className="bg-[#A4D96C] rounded-full p-3 cursor-pointer shadow-xl hover:bg-[#95c960] transition-all animate-bounce"><ArrowDown className="text-white" size={28} strokeWidth={3} /></button>
            </div>
        </div>

        {/* SECTION 2 & 3 (Rest of the content) */}
        <div className="relative px-8 md:px-16 pb-20 pt-10 bg-gradient-to-b from-[#F8F7FF] via-purple-50 to-white">
            <div className="relative w-full max-w-[1100px] mx-auto z-10 mb-20">
                <div className="absolute -top-12 left-1/2 transform -translate-x-1/2 z-20">
                     <div className="bg-[#FFD028] p-4 rounded-2xl border-2 border-black rotate-12 shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]"><Send className="text-white fill-white transform rotate-45" size={32} /></div>
                     <img src="/Vector 3.png" className="absolute -top-6 -right-20 w-20 opacity-40 rotate-12" alt="" />
                </div>
                <div className="bg-[#5E3BEE] rounded-[40px] px-8 py-16 md:px-24 md:py-20 text-center text-white border-2 border-black shadow-[10px_10px_0px_0px_rgba(0,0,0,1)]">
                    <p className="text-purple-200 text-lg font-medium mb-4 tracking-wide">אז, איפה מתחילים?</p>
                    <h2 className="text-5xl md:text-6xl font-black mb-8 tracking-tight">התחלה חדשה בפתח</h2>
                    <div className="max-w-4xl mx-auto space-y-6 text-lg md:text-xl leading-relaxed opacity-90 font-light">
                        <p className="font-bold">תפקיד הרכזות ברעים הוא תפקיד משמעותי וייחודי:</p>
                        <p>להוביל קבוצה של משתתפים ומשתתפות מהמגוון האוטיסטי או עם לקויות למידה מורכבות, ליצירת חיי חברה, תחושת שייכות לקבוצה וקהילה.</p>
                        <p className="pt-4 text-base md:text-lg opacity-80 max-w-3xl mx-auto">האוגדן שלפניך מרכז את כל המידע הדרוש לתחילת הדרך: הרקע על התוכנית, מטרותיה, המשתתפים והמשתתפות, לצד כלים פרקטיים לניהול שוטף, שיווק, עבודה מנהלית ותהליכים מקצועיים.</p>
                    </div>
                </div>
            </div>

            <div className="flex justify-between items-end max-w-7xl mx-auto px-4 mb-8">
                 <div className="flex gap-3 pb-2">
                    <button onClick={() => scroll('left')} className="bg-[#EBE5FC] p-3 rounded-full hover:bg-purple-200 text-[#5E3BEE] transition active:scale-95 shadow-sm"><ChevronLeft size={28} /></button>
                    <button onClick={() => scroll('right')} className="bg-[#EBE5FC] p-3 rounded-full hover:bg-purple-200 text-[#5E3BEE] transition active:scale-95 shadow-sm"><ChevronRight size={28} /></button>
                </div>
                <div className="text-right">
                    <p className="text-slate-500 text-lg font-medium mb-1 tracking-wide">כל מה שכדאי לדעת</p>
                    <h3 className="text-4xl md:text-5xl font-black text-[#2D2D44]">המדריכה לרכזות ורכזים</h3>
                </div>
            </div>

            <div ref={scrollRef} className="flex gap-6 overflow-x-auto pb-16 pt-4 max-w-[100vw] md:max-w-7xl mx-auto px-4 no-scrollbar snap-x scroll-smooth">
                {cardsData.map((item) => (
                    <div key={item.id} className="min-w-[280px] w-[300px] h-[400px] bg-white rounded-2xl p-8 flex flex-col relative transition-all duration-300 cursor-pointer group snap-center border-2 border-transparent hover:border-black hover:bg-[#FFF9F0] hover:shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] hover:-translate-y-2">
                        <div className="absolute top-6 left-6 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                             <div className="bg-[#FFB020] rounded-full p-2"><ArrowUpLeft className="text-white transform -rotate-45" size={20} /></div>
                        </div>
                        <span className="text-[40px] font-['Salsa'] font-normal leading-[1.28] tracking-[0.15px] text-[#2D2D44] group-hover:text-[#FFB020] transition-colors mb-auto">{item.id}</span>
                        <div className="mt-auto text-right">
                            <div className="mb-6 text-[#2D2D44] group-hover:text-[#FFB020] transition-colors">{item.icon}</div>
                            <h4 className="text-2xl font-black text-[#2D2D44] group-hover:text-[#FFB020] mb-3 leading-tight whitespace-pre-line transition-colors">{item.title}</h4>
                            <p className="text-slate-500 group-hover:text-[#2D2D44] text-sm leading-relaxed whitespace-pre-line font-medium">{item.desc}</p>
                        </div>
                    </div>
                ))}
            </div>
        </div>

        {/* Footer & Newsletter Section */}
        <div className="bg-white">
            <div className="px-8 md:px-16 pt-10 pb-20">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-7xl mx-auto h-auto md:h-[500px]">
                    <div className="h-[400px] md:h-full rounded-[32px] overflow-hidden border border-slate-100 shadow-md relative group">
                        <img src="https://images.unsplash.com/photo-1556761175-5973dc0f32e7?w=800&auto=format&fit=crop&q=60" alt="" className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" />
                    </div>
                    <div className="h-[500px] md:h-full bg-[#D1E68F] rounded-[32px] border-2 border-black shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] p-8 flex flex-col items-center justify-center text-center relative overflow-hidden group">
                        <div className="absolute top-16"><Star className="text-[#FFB020] fill-[#FFB020] animate-spin-slow" size={40} /></div>
                        <img src="/Vector 1.png" className="absolute bottom-32 left-8 w-20 opacity-60 rotate-12 group-hover:-translate-x-2 transition-transform" alt="" />
                        <img src="/Vector 3.png" className="absolute bottom-10 right-10 w-24 opacity-40 rotate-45" alt="" />
                        <p className="font-bold text-[#2D2D44] mb-2 text-lg">השראות מיוחדות ישירות לתיבה שלך</p>
                        <h3 className="text-5xl font-black text-[#2D2D44] mb-6">ניוזלטר רעים</h3>
                        <p className="text-[#2D2D44] text-lg max-w-xs mb-12 leading-relaxed font-medium">מנה חודשית מרוכזת של חדשות, משחק ומיטב ההשראה מהשטח.</p>
                        <div className="relative w-full max-w-xs">
                            <input type="email" placeholder="הקלידי את כתובת המייל שלך" className="w-full bg-white border-2 border-black rounded-full py-3.5 px-6 pr-4 pl-14 text-right focus:outline-none focus:ring-2 focus:ring-[#5E3BEE] placeholder:text-slate-400 font-medium" />
                            <button className="absolute top-1/2 left-2 transform -translate-y-1/2 bg-[#A090E0] hover:bg-[#8e7dd6] rounded-full p-2 border border-black transition-colors shadow-sm"><ArrowLeft className="text-white" size={20} /></button>
                        </div>
                    </div>
                    <div className="h-[400px] md:h-full rounded-[32px] overflow-hidden border border-slate-100 shadow-md relative group">
                        <img src="https://images.unsplash.com/photo-1522071820081-009f0129c71c?w=800&auto=format&fit=crop&q=60" alt="" className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" />
                    </div>
                </div>
            </div>

            <footer className="bg-[#F3F0FF] py-12 px-8 border-t border-purple-100">
                <div className="max-w-7xl mx-auto">
                    <div className="flex flex-col md:flex-row justify-between gap-12 mb-12">
                        <div className="flex flex-col gap-6">
                            <div className="flex items-center gap-6">
                                <img src="/Logo (1).png" alt="לוגו רעים" className="h-10 w-auto object-contain" />
                                <div className="h-8 w-[1px] bg-[#2D2D44]/20"></div>
                                <div className="text-right">
                                    <p className="font-bold text-[#2D2D44] text-sm">החברה למתנ״סים</p>
                                    <p className="text-xs text-[#2D2D44]/70">מרכזים קהילתיים בישראל</p>
                                </div>
                            </div>
                            <div className="text-sm text-[#2D2D44]/80 space-y-1 font-medium">
                                <p>תוכנית רעים מבית החברה למתנ"סים</p>
                                <p>טלפון: <span dir="ltr">073-2870187</span></p>
                                <p>פקס: <span dir="ltr">073-2870387</span></p>
                                <p>מייל: reim@matnasim.org.il</p>
                            </div>
                        </div>
                        <div className="flex flex-wrap gap-x-12 gap-y-4 text-sm font-bold text-[#2D2D44]">
                            <div className="flex flex-col gap-3"><span className="text-[#5E3BEE] mb-1">התוכנית</span><a href="#" className="hover:text-[#5E3BEE] transition">מתי תכנית רעים</a><a href="#" className="hover:text-[#5E3BEE] transition">מאיפה באנו</a></div>
                            <div className="flex flex-col gap-3"><span className="text-[#5E3BEE] mb-1">כותרת</span><a href="#" className="hover:text-[#5E3BEE] transition">לינק 1</a><a href="#" className="hover:text-[#5E3BEE] transition">לינק 1</a></div>
                            <div className="flex flex-col gap-3"><span className="text-[#5E3BEE] mb-1">כותרת</span><a href="#" className="hover:text-[#5E3BEE] transition">לינק 1</a><a href="#" className="hover:text-[#5E3BEE] transition">לינק 1</a></div>
                        </div>
                    </div>
                    <div className="h-[1px] bg-[#2D2D44]/10 w-full mb-8"></div>
                    <div className="flex flex-col-reverse md:flex-row justify-between items-center gap-6">
                        <div className="flex gap-4">
                            {[Facebook, Linkedin, Instagram, Twitter].map((Icon, i) => (
                                <a key={i} href="#" className="bg-[#EBE5FC] p-2.5 rounded-full text-[#5E3BEE] hover:bg-[#5E3BEE] hover:text-white transition-colors"><Icon size={18} /></a>
                            ))}
                        </div>
                        <div className="flex flex-wrap justify-center gap-6 text-xs font-medium text-[#2D2D44]/60">
                            <a href="#" className="hover:text-[#5E3BEE]">מדיניות פרטיות</a><span>•</span><a href="#" className="hover:text-[#5E3BEE]">תקנון אתר</a><span className="mr-4">© כל הזכויות שמורות לחברה למתנ"סים</span>
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