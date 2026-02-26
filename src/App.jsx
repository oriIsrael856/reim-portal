import React, { useState, Suspense, lazy } from 'react';
import { useFirebaseContent } from './hooks/useFirebaseContent';
import { useAuth } from './hooks/useAuth';
import { resetContent, DATA_VERSION } from './services/contentService';
import { INITIAL_DATA } from './data';
import { Lock } from 'lucide-react';

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
    home:     { component: HomePage,    contentKey: 'home', next: 'chapter1' },
    chapter1: { component: Chapter1,    contentKey: 'chapter1', next: 'chapter2', prev: 'home' },
    chapter2: { component: Chapter2,    contentKey: 'chapter2', next: 'chapter3', prev: 'chapter1' },
    chapter3: { component: Chapter3,    contentKey: 'chapter3', next: 'chapter4', prev: 'chapter2' },
    chapter4: { component: Chapter4,    contentKey: 'chapter4', next: 'chapter5', prev: 'chapter3' },
    chapter5: { component: Chapter5,    contentKey: 'chapter5', next: 'home', prev: 'chapter4' },
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
                content={content}
                onNext={route.next ? () => navigateTo(route.next) : undefined}
                onPrev={route.prev ? () => navigateTo(route.prev) : undefined}
                navigateTo={navigateTo}
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
        <div dir="rtl" className="font-['Rubik'] text-[#2D2D44] min-h-screen" style={{ background: 'var(--Purple-Dark, #46319B)' }}>
            {/* קונטיינר פנימי – פס סגול תמיד נראה למעלה, שמאל ולמטה */}
            <div
                className="min-h-screen rounded-[12px] md:rounded-[16px] flex flex-col overflow-hidden"
                style={{
                    marginTop: '12px',
                    marginBottom: '12px',
                    marginLeft: '12px',
                    marginRight: 0,
                    background: 'linear-gradient(to bottom, #fff 0%, #F5F3FA 100%)'
                }}
            >

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

            <Header
                onLogoClick={() => navigateTo('home')}
                onMenuClick={() => setIsMenuOpen((prev) => !prev)}
                isMenuOpen={isMenuOpen}
                logoUrl={content?.header?.logo}
            />

            {/* סרגל צף – רק מדסקטופ כדי לא להסתיר תוכן במובייל */}
            <div className="hidden md:block">
                <Sidebar
                    navigateTo={navigateTo}
                    toggleMenu={() => setIsMenuOpen(true)}
                    currentPage={currentPage}
                />
            </div>

            <MenuOverlay
                isOpen={isMenuOpen}
                closeMenu={() => setIsMenuOpen(false)}
                menuItems={content.menu || []}
                navigateTo={navigateTo}
                isAdmin={!!user}
            />

            <main className="transition-all duration-500 px-4 md:px-0 md:pr-20 pt-[130px] md:pt-[116px]">
                <Suspense fallback={
                    <div className="h-[60vh] flex items-center justify-center font-bold text-[#5E3BEE] animate-pulse">
                        טוען תוכן...
                    </div>
                }>
                    {renderPage()}
                </Suspense>
            </main>

            {currentPage !== 'admin' && (
                <div className="md:pr-20 px-0">
                    <Footer data={content.footer} />
                </div>
            )}

            {showLogin && <LoginModal onClose={() => setShowLogin(false)} onLogin={login} />}
            </div>
            {/* פס סגול קבוע בתחתית העמוד */}
            <div className="h-3 shrink-0" style={{ background: 'var(--Purple-Dark, #46319B)' }} aria-hidden />
        </div>
    );
};

export default App;
