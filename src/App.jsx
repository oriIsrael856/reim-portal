import React, { useState, useEffect } from 'react';
import { db, auth } from './firebase';
import { doc, onSnapshot, setDoc } from 'firebase/firestore';
import { onAuthStateChanged, signOut, signInWithEmailAndPassword } from 'firebase/auth';
import { Lock, X, Menu, Home } from 'lucide-react';

import { INITIAL_DATA } from './data';
import { Sidebar, MenuOverlay } from './components/layout/Sidebar';
import Footer from './components/layout/Footer';
import Header from './components/layout/Header';

import HomePage from './pages/HomePage';
import Chapter1 from './pages/Chapter1'; 
import Chapter2 from './pages/Chapter2'; 
import Chapter3 from './pages/Chapter3';
import Chapter4 from './pages/Chapter4';
import Chapter5 from './pages/Chapter5';

const App = () => {
    const [content, setContent] = useState(null);
    const [user, setUser] = useState(null);
    const [currentPage, setCurrentPage] = useState('home');
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    
    const [showLogin, setShowLogin] = useState(false);
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    useEffect(() => {
        // גרסה v9 - מבטיחה טעינת פרק 3 ותפריט חדש
        const unsub = onSnapshot(doc(db, "site_content", "v9"), (doc) => {
            if (doc.exists()) setContent(doc.data());
            else setContent(INITIAL_DATA);
        });
        onAuthStateChanged(auth, setUser);
        return () => unsub();
    }, []);

    const navigateTo = (page) => {
        setCurrentPage(page);
        window.scrollTo({ top: 0, behavior: 'smooth' });
        setIsMenuOpen(false);
    };

    const resetData = async () => {
        if(window.confirm("לאפס נתונים לגרסה v9?")) {
            await setDoc(doc(db, "site_content", "v9"), INITIAL_DATA);
            window.location.reload();
        }
    };

    if (!content) return <div className="h-screen flex items-center justify-center font-bold text-2xl text-[#46319B]">טוען את פורטל רעים...</div>;

    return (
        <div dir="rtl" className="font-sans text-[#2D2D44] bg-[#F3F0FF]">
            <style>{`@import url('https://fonts.googleapis.com/css2?family=Rubik:wght@300;400;500;700;900&family=Salsa&display=swap');`}</style>

            {/* Admin Bar */}
            {user && (
                <div className="fixed top-0 left-0 right-0 h-12 bg-[#2D2D44] text-white flex items-center justify-between px-4 z-[9999]">
                    <span className="text-xs font-mono text-green-400">ADMIN MODE v9</span>
                    <div className="flex gap-2">
                        <button onClick={resetData} className="bg-yellow-600 px-3 py-1 text-xs rounded">איפוס v9</button>
                        <button onClick={() => signOut(auth)} className="bg-red-600 px-3 py-1 text-xs rounded">יציאה</button>
                    </div>
                </div>
            )}

            {!user && (
                <button onClick={() => setShowLogin(true)} className="fixed bottom-4 left-4 z-[9999] bg-white p-3 rounded-full shadow-xl border"><Lock size={20}/></button>
            )}

            {/* Header & Navigation */}
            <Header />
            <Sidebar navigateTo={navigateTo} toggleMenu={() => setIsMenuOpen(true)} currentPage={currentPage} />
            <MenuOverlay 
                isOpen={isMenuOpen} 
                closeMenu={() => setIsMenuOpen(false)} 
                menuItems={content.menu || []} 
                navigateTo={navigateTo} 
                isAdmin={!!user}
            />

            {/* Mobile Nav Trigger */}
            <div className="md:hidden fixed top-4 right-4 z-[501]">
                 <button onClick={() => setIsMenuOpen(true)} className="bg-white/80 backdrop-blur-md p-2 rounded-full shadow-md text-[#46319B]"><Menu/></button>
            </div>

            {/* Main Pages */}
            <div className={`transition-all duration-500 ${user ? 'mt-12' : ''} md:pr-20`}>
                {currentPage === 'home' && <HomePage data={content.home} onStart={() => navigateTo('chapter1')} navigateTo={navigateTo} />}
                {currentPage === 'chapter1' && <Chapter1 data={content.chapter1} onNext={() => navigateTo('chapter2')} />}
                {currentPage === 'chapter2' && <Chapter2 data={content.chapter2} onNext={() => navigateTo('chapter3')} />}
                {currentPage === 'chapter3' && <Chapter3 data={content.chapter3} onNext={() => navigateTo('chapter4')} />}
                {currentPage === 'chapter4' && <Chapter4 data={content.chapter4} onNext={() => navigateTo('chapter5')} />}
                {currentPage === 'chapter5' && <Chapter5 data={content.chapter5} onNext={() => navigateTo('home')} />}
            </div>

            <div className="md:pr-20">
                <Footer data={content.footer} /> 
            </div>

            {/* Login Modal */}
            {showLogin && (
                <div className="fixed inset-0 z-[10000] bg-black/50 flex items-center justify-center backdrop-blur-sm">
                    <div className="bg-white p-8 rounded-2xl shadow-2xl w-full max-w-sm relative">
                        <button onClick={() => setShowLogin(false)} className="absolute top-4 left-4"><X/></button>
                        <form onSubmit={async (e) => { e.preventDefault(); try { await signInWithEmailAndPassword(auth, email, password); setShowLogin(false); } catch { alert("שגיאה"); } }} className="flex flex-col gap-4 pt-4">
                            <input type="email" placeholder="Email" className="p-2 border rounded" onChange={e=>setEmail(e.target.value)} />
                            <input type="password" placeholder="Password" className="p-2 border rounded" onChange={e=>setPassword(e.target.value)} />
                            <button type="submit" className="bg-[#46319B] text-white py-2 rounded font-bold">התחבר</button>
                        </form>
                    </div>
                </div>
            )}
        </div>
    );
};

export default App;