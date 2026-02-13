import React, { useState, Suspense, lazy } from 'react';
import { useFirebaseContent } from './hooks/useFirebaseContent';
import { useAuth } from './hooks/useAuth';
import { resetContent, DATA_VERSION } from './services/contentService';
import { INITIAL_DATA } from './data';
import { Lock, Menu } from 'lucide-react';

import { Sidebar, MenuOverlay } from './components/layout/Sidebar';
import Footer from './components/layout/Footer';
import Header from './components/layout/Header';
import AdminBar from './components/admin/AdminBar';
import LoginModal from './components/auth/LoginModal';

const HomePage = lazy(() => import('./pages/HomePage'));
const Chapter1 = lazy(() => import('./pages/Chapter1'));
const Chapter2 = lazy(() => import('./pages/Chapter2'));
const Chapter3 = lazy(() => import('./pages/Chapter3'));
const Chapter4 = lazy(() => import('./pages/Chapter4'));
const Chapter5 = lazy(() => import('./pages/Chapter5'));
const AdminPanel = lazy(() => import('./pages/AdminPanel'));

const ROUTES = {
    home:     { component: HomePage,    contentKey: 'home' },
    chapter1: { component: Chapter1,    contentKey: 'chapter1', next: 'chapter2' },
    chapter2: { component: Chapter2,    contentKey: 'chapter2', next: 'chapter3' },
    chapter3: { component: Chapter3,    contentKey: 'chapter3', next: 'chapter4' },
    chapter4: { component: Chapter4,    contentKey: 'chapter4', next: 'chapter5' },
    chapter5: { component: Chapter5,    contentKey: 'chapter5', next: 'home' },
    admin:    { component: AdminPanel,  requiresAuth: true },
};

const App = () => {
    const { content } = useFirebaseContent();
    const { user, login, logout } = useAuth();
    const [currentPage, setCurrentPage] = useState('home');
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const [showLogin, setShowLogin] = useState(false);

    const navigateTo = (page) => {
        setCurrentPage(page);
        window.scrollTo({ top: 0, behavior: 'smooth' });
        setIsMenuOpen(false);
    };

    const handleReset = async () => {
        if (window.confirm(`זהירות: פעולה זו תדרוס את כל השינויים ב-Firebase ותחזיר את האתר לגרסת המקור (${DATA_VERSION}). להמשיך?`)) {
            await resetContent(DATA_VERSION, INITIAL_DATA);
            window.location.reload();
        }
    };

    const renderPage = () => {
        if (!content) return null;
        const route = ROUTES[currentPage] || ROUTES.home;

        if (route.requiresAuth && !user) {
            navigateTo('home');
            return null;
        }

        const PageComponent = route.component;

        if (currentPage === 'admin') {
            return <PageComponent content={content} version={DATA_VERSION} />;
        }

        return (
            <PageComponent
                data={content[route.contentKey]}
                onNext={route.next ? () => navigateTo(route.next) : undefined}
                navigateTo={currentPage === 'home' ? navigateTo : undefined}
            />
        );
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

            {user ? (
                <AdminBar
                    version={DATA_VERSION}
                    onNavigateAdmin={() => navigateTo('admin')}
                    onReset={handleReset}
                    onLogout={logout}
                />
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

            <main className={`transition-all duration-500 ${user ? 'pt-12' : ''} md:pr-20`}>
                <Suspense fallback={
                    <div className="h-[60vh] flex items-center justify-center font-bold text-[#5E3BEE] animate-pulse">
                        טוען תוכן...
                    </div>
                }>
                    {renderPage()}
                </Suspense>
            </main>

            {currentPage !== 'admin' && (
                <div className="md:pr-20">
                    <Footer data={content.footer} />
                </div>
            )}

            {showLogin && <LoginModal onClose={() => setShowLogin(false)} onLogin={login} />}
        </div>
    );
};

export default App;
