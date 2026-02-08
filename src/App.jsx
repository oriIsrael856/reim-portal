import React, { useState, useEffect } from 'react';
import { db, auth } from './firebase';
import { doc, onSnapshot, setDoc } from 'firebase/firestore'; // מחקתי updateDoc אם לא בשימוש, או שתחזיר
import { onAuthStateChanged, signOut, signInWithEmailAndPassword } from 'firebase/auth';
import { Lock, X, Menu } from 'lucide-react'; // מחקתי Save אם לא בשימוש

// ייבוא קבצים פנימיים
import { INITIAL_DATA } from './data';
import { Sidebar, MenuOverlay } from './components/layout/Sidebar';
import Footer from './components/layout/Footer';
import Header from './components/layout/Header'; 

// עמודים
import HomePage from './pages/HomePage';
import Chapter1 from './pages/Chapter1'; 
import Chapter2 from './pages/Chapter2'; 
import Chapter3 from './pages/Chapter3'; // <--- הוספתי את פרק 3

const App = () => {
    const [content, setContent] = useState(null);
    const [user, setUser] = useState(null);
    const [currentPage, setCurrentPage] = useState('home');
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    
    // Auth State
    const [showLogin, setShowLogin] = useState(false);
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    // טעינת נתונים
    useEffect(() => {
        // שים לב: שיניתי את שם המסמך ל-v6 כדי שלא יתנגש עם גרסאות ישנות, 
        // או שתוודא ש-v5 מעודכן ב-Firebase עם המידע של פרק 3
        const unsub = onSnapshot(doc(db, "site_content", "v6"), (doc) => {
            if (doc.exists()) {
                setContent(doc.data());
            } else {
                // אם המסמך לא קיים, טען את הנתונים הראשוניים
                setContent(INITIAL_DATA);
            }
        });
        
        onAuthStateChanged(auth, setUser);
        return () => unsub();
    }, []);

    // ניווט
    const navigateTo = (page) => {
        setCurrentPage(page);
        window.scrollTo({ top: 0, behavior: 'smooth' });
        setIsMenuOpen(false); // סגירת תפריט מובייל במעבר
    };

    // פונקציות ניהול
    const resetData = async () => {
        if(window.confirm("זהירות: זה יאפס את כל הנתונים למקור (כולל פרק 3). להמשיך?")) {
            await setDoc(doc(db, "site_content", "v5"), INITIAL_DATA);
            window.location.reload();
        }
    };

    const handleLogin = async (e) => {
        e.preventDefault();
        try { 
            await signInWithEmailAndPassword(auth, email, password); 
            setShowLogin(false); 
        } catch (e) { 
            alert("שגיאה בהתחברות"); 
        }
    };

    if (!content) return <div className="h-screen flex items-center justify-center font-bold text-2xl text-[#46319B]">טוען...</div>;

    return (
        <div dir="rtl" className="font-sans text-[#2D2D44] bg-[#F3F0FF]">
            <style>{`@import url('https://fonts.googleapis.com/css2?family=Rubik:wght@300;400;500;700;900&family=Salsa&display=swap');`}</style>

            {/* --- ADMIN LAYER --- */}
            {user ? (
                <div className="fixed top-0 left-0 right-0 h-12 bg-[#2D2D44] text-white flex items-center justify-between px-4 z-[9999]">
                    <div className="flex items-center gap-2">
                        <span className="text-xs font-mono text-green-400 border border-green-400 px-2 rounded">ADMIN MODE</span>
                        <span className="text-xs text-gray-400 hidden md:inline">עורך: {user.email}</span>
                    </div>
                    <div className="flex gap-2">
                        <button onClick={resetData} className="bg-yellow-600 px-3 py-1 text-xs rounded hover:bg-yellow-500">איפוס נתונים</button>
                        <button onClick={() => signOut(auth)} className="bg-red-600 px-3 py-1 text-xs rounded hover:bg-red-500">יציאה</button>
                    </div>
                </div>
            ) : (
                <button onClick={() => setShowLogin(true)} className="fixed bottom-4 left-4 z-[9999] bg-white p-3 rounded-full shadow-xl border hover:text-[#46319B] transition">
                    <Lock size={20} />
                </button>
            )}

            {/* --- LOGIN MODAL --- */}
            {showLogin && (
                <div className="fixed inset-0 z-[10000] bg-black/50 flex items-center justify-center backdrop-blur-sm">
                    <div className="bg-white p-8 rounded-2xl shadow-2xl w-full max-w-sm relative">
                        <button onClick={() => setShowLogin(false)} className="absolute top-4 left-4"><X/></button>
                        <h2 className="text-xl font-bold mb-4 text-center">כניסת מנהל</h2>
                        <form onSubmit={handleLogin} className="flex flex-col gap-4">
                            <input type="email" placeholder="Email" className="p-2 border rounded" value={email} onChange={e=>setEmail(e.target.value)} />
                            <input type="password" placeholder="Password" className="p-2 border rounded" value={password} onChange={e=>setPassword(e.target.value)} />
                            <button type="submit" className="bg-[#46319B] text-white py-2 rounded font-bold">התחבר</button>
                        </form>
                    </div>
                </div>
            )}

            {/* --- HEADER --- */}
            <Header />

            {/* --- NAVIGATION (Sidebar) --- */}
            <Sidebar navigateTo={navigateTo} toggleMenu={() => setIsMenuOpen(true)} currentPage={currentPage} />
            
            <MenuOverlay 
                isOpen={isMenuOpen} 
                closeMenu={() => setIsMenuOpen(false)} 
                menuItems={content.menu || []} 
                navigateTo={navigateTo} 
                isAdmin={!!user}
            />

            {/* --- MOBILE HEADER TOGGLE --- */}
            {/* זה רק הכפתור למובייל, כי ההדר החדש הוא שקוף/מעוצב */}
            <div className="md:hidden fixed top-4 right-4 z-[501]">
                 <button onClick={() => setIsMenuOpen(true)} className="bg-white/80 backdrop-blur-md p-2 rounded-full shadow-md text-[#46319B]">
                    <Menu className="w-6 h-6"/>
                </button>
            </div>

            {/* --- MAIN CONTENT --- */}
            {/* הוספתי את ה-onNext לכל העמודים כדי שהכפתורים יעבדו */}
            <div className={`transition-all duration-500 ${user ? 'mt-12' : ''} md:pr-20`}>
                
                {currentPage === 'home' && (
                    <HomePage 
                        data={content.home} 
                        onStart={() => navigateTo('chapter1')} 
                        // תמיכה לאחור אם HomePage משתמש ב-navigateTo ישירות
                        navigateTo={navigateTo} 
                    />
                )}
                
                {currentPage === 'chapter1' && (
                    <Chapter1 
                        data={content.chapter1} 
                        onNext={() => navigateTo('chapter2')} 
                    />
                )}
                
                {currentPage === 'chapter2' && (
                    <Chapter2 
                        data={content.chapter2} 
                        onNext={() => navigateTo('chapter3')} 
                    />
                )}
                
                {/* כאן הוספתי את פרק 3 */}
                {currentPage === 'chapter3' && (
                    <Chapter3 
                        data={content.chapter3} 
                        onNext={() => navigateTo('home')} 
                    />
                )}

            </div>

            {/* --- FOOTER --- */}
            <div className="md:pr-20">
                <Footer data={content.footer} /> 
            </div>
        </div>
    );
};

export default App;