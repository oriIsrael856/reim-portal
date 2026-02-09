import React, { useState, useEffect, Suspense, lazy } from 'react';
import { db, auth } from './firebase';
import { doc, onSnapshot, setDoc } from 'firebase/firestore';
import { onAuthStateChanged, signOut, signInWithEmailAndPassword } from 'firebase/auth';
import { Lock, X, Menu, Settings } from 'lucide-react';

// --- רכיבי תשתית (Layout) - נשארים בטעינה רגילה כי הם קטנים וחשובים ---
import { INITIAL_DATA } from './data';
import { Sidebar, MenuOverlay } from './components/layout/Sidebar';
import Footer from './components/layout/Footer';
import Header from './components/layout/Header';

// --- עמודים - מעבר לטעינה חכמה (Lazy Loading) לשיפור המהירות ---
const HomePage = lazy(() => import('./pages/HomePage'));
const Chapter1 = lazy(() => import('./pages/Chapter1')); 
const Chapter2 = lazy(() => import('./pages/Chapter2')); 
const Chapter3 = lazy(() => import('./pages/Chapter3'));
const Chapter4 = lazy(() => import('./pages/Chapter4'));
const Chapter5 = lazy(() => import('./pages/Chapter5'));
const AdminPanel = lazy(() => import('./pages/AdminPanel'));

const App = () => {
    // --- State Management ---
    const [content, setContent] = useState(null);
    const [user, setUser] = useState(null);
    const [currentPage, setCurrentPage] = useState('home');
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    
    // Auth State
    const [showLogin, setShowLogin] = useState(false);
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    // קבוע הגרסה לסנכרון מול Firestore
    const DATA_VERSION = "v11"; 

    // --- Effects ---
    useEffect(() => {
        // האזנה בזמן אמת לנתונים מה-Cloud
        const unsub = onSnapshot(doc(db, "site_content", DATA_VERSION), (docSnap) => {
            if (docSnap.exists()) {
                setContent(docSnap.data());
            } else {
                setContent(INITIAL_DATA);
            }
        });
        
        const authUnsub = onAuthStateChanged(auth, setUser);
        
        return () => {
            unsub();
            authUnsub();
        };
    }, []);

    // --- Navigation Logic ---
    const navigateTo = (page) => {
        setCurrentPage(page);
        window.scrollTo({ top: 0, behavior: 'smooth' });
        setIsMenuOpen(false);
    };

    // --- Admin Actions ---
    const resetData = async () => {
        if(window.confirm(`זהירות: פעולה זו תדרוס את כל השינויים ב-Firebase ותחזיר את האתר לגרסת המקור (${DATA_VERSION}). להמשיך?`)) {
            await setDoc(doc(db, "site_content", DATA_VERSION), INITIAL_DATA);
            window.location.reload();
        }
    };

const handleLogin = async (e) => {
    e.preventDefault();
    try { 
        await signInWithEmailAndPassword(auth, email, password); 
        setShowLogin(false); 
    } catch (error) { 
        // זה יגיד לנו אם הסיסמה שגויה, המשתמש לא קיים, או שיש בעיית תקשורת
        console.error("Firebase Auth Error:", error.code);
        alert(`שגיאת התחברות: ${error.code}`); 
    }
};

    // --- Render Helpers ---
    const renderCurrentPage = () => {
        if (!content) return null;

        switch (currentPage) {
            case 'home':
                return <HomePage data={content.home} onStart={() => navigateTo('chapter1')} navigateTo={navigateTo} />;
            case 'chapter1':
                return <Chapter1 data={content.chapter1} onNext={() => navigateTo('chapter2')} />;
            case 'chapter2':
                return <Chapter2 data={content.chapter2} onNext={() => navigateTo('chapter3')} />;
            case 'chapter3':
                return <Chapter3 data={content.chapter3} onNext={() => navigateTo('chapter4')} />;
            case 'chapter4':
                return <Chapter4 data={content.chapter4} onNext={() => navigateTo('chapter5')} />;
            case 'chapter5':
                return <Chapter5 data={content.chapter5} onNext={() => navigateTo('home')} />;
            case 'admin':
                return user ? <AdminPanel content={content} version={DATA_VERSION} /> : navigateTo('home');
            default:
                return <HomePage data={content.home} onStart={() => navigateTo('chapter1')} />;
        }
    };

    if (!content) {
        return (
            <div className="h-screen flex items-center justify-center bg-[#F3F0FF]">
                <div className="flex flex-col items-center gap-4">
                    <div className="w-12 h-12 border-4 border-[#5E3BEE] border-t-transparent rounded-full animate-spin"></div>
                    <span className="font-bold text-xl text-[#46319B]">טוען את פורטל רעים...</span>
                </div>
            </div>
        );
    }

    return (
        <div dir="rtl" className="font-sans text-[#2D2D44] bg-[#F3F0FF] min-h-screen">
            <style>{`@import url('https://fonts.googleapis.com/css2?family=Rubik:wght@300;400;500;700;900&family=Salsa&display=swap');`}</style>

            {/* --- ADMIN LAYER --- */}
            {user ? (
                <div className="fixed top-0 left-0 right-0 h-12 bg-[#2D2D44] text-white flex items-center justify-between px-4 z-[9999] shadow-lg">
                    <div className="flex items-center gap-4">
                        <span className="text-xs font-mono text-green-400 border border-green-400 px-2 rounded">ADMIN MODE {DATA_VERSION}</span>
                        <button 
                            onClick={() => navigateTo('admin')} 
                            className="flex items-center gap-2 text-xs bg-[#5E3BEE] hover:bg-[#4a2ec6] px-3 py-1 rounded transition-colors"
                        >
                            <Settings size={14} /> לוח בקרה
                        </button>
                    </div>
                    <div className="flex gap-2">
                        <button onClick={resetData} className="bg-yellow-600 px-3 py-1 text-xs rounded hover:bg-yellow-500 transition-colors">איפוס נתונים</button>
                        <button onClick={() => signOut(auth)} className="bg-red-600 px-3 py-1 text-xs rounded hover:bg-red-500 transition-colors">יציאה</button>
                    </div>
                </div>
            ) : (
                <button onClick={() => setShowLogin(true)} className="fixed bottom-6 left-6 z-[9999] bg-white p-4 rounded-full shadow-2xl border-2 border-[#F3F0FF] hover:text-[#5E3BEE] transition-all hover:scale-110">
                    <Lock size={20} />
                </button>
            )}

            <Header />
            
            <Sidebar 
                navigateTo={navigateTo} 
                toggleMenu={() => setIsMenuOpen(true)} 
                currentPage={currentPage} 
            />
            
            <MenuOverlay 
                isOpen={isMenuOpen} 
                closeMenu={() => setIsMenuOpen(false)} 
                menuItems={content.menu || []} 
                navigateTo={navigateTo} 
                isAdmin={!!user}
            />

            <div className="md:hidden fixed top-4 right-4 z-[501]">
                 <button onClick={() => setIsMenuOpen(true)} className="bg-white/90 backdrop-blur-md p-3 rounded-2xl shadow-xl text-[#46319B]">
                    <Menu className="w-6 h-6"/>
                </button>
            </div>

            {/* --- MAIN PAGE CONTENT WITH SUSPENSE --- */}
            <main className={`transition-all duration-500 ${user ? 'pt-12' : ''} md:pr-20`}>
                <Suspense fallback={
                    <div className="h-[60vh] flex items-center justify-center font-bold text-[#5E3BEE] animate-pulse">
                        טוען תוכן...
                    </div>
                }>
                    {renderCurrentPage()}
                </Suspense>
            </main>

            {currentPage !== 'admin' && (
                <div className="md:pr-20">
                    <Footer data={content.footer} /> 
                </div>
            )}

            {/* --- LOGIN MODAL --- */}
            {showLogin && (
                <div className="fixed inset-0 z-[10000] bg-black/60 flex items-center justify-center backdrop-blur-md px-4">
                    <div className="bg-white p-10 rounded-[32px] shadow-2xl w-full max-w-sm relative border-4 border-[#F3F0FF]">
                        <button onClick={() => setShowLogin(false)} className="absolute top-6 left-6 text-gray-400 hover:text-black"><X/></button>
                        <div className="text-center mb-8">
                            <div className="w-16 h-16 bg-[#F3F0FF] rounded-2xl flex items-center justify-center mx-auto mb-4 text-[#5E3BEE]">
                                <Lock size={32} />
                            </div>
                            <h2 className="text-2xl font-black text-[#2D2D44]">כניסת מנהל</h2>
                        </div>
                        <form onSubmit={handleLogin} className="flex flex-col gap-4">
                            <input type="email" placeholder="אימייל" className="p-4 bg-gray-50 border-2 border-transparent focus:border-[#5E3BEE] rounded-2xl outline-none transition-all" value={email} onChange={e=>setEmail(e.target.value)} />
                            <input type="password" placeholder="סיסמה" className="p-4 bg-gray-50 border-2 border-transparent focus:border-[#5E3BEE] rounded-2xl outline-none transition-all" value={password} onChange={e=>setPassword(e.target.value)} />
                            <button type="submit" className="bg-[#5E3BEE] text-white py-4 rounded-2xl font-black shadow-lg shadow-[#5E3BEE]/30 hover:bg-[#4a2ec6] transition-all mt-2">
                                התחברות למערכת
                            </button>
                        </form>
                    </div>
                </div>
            )}
        </div>
    );
};

export default App;