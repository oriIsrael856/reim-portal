import React, { useState, useEffect, useCallback } from 'react';
import {
  Save,
  Home,
  Menu as MenuIcon,
  Smile,
  Users,
  Briefcase,
  ClipboardList,
  Wrench,
  Phone,
  Settings,
  AlignJustify,
  CheckCircle,
  AlertCircle,
} from 'lucide-react';
import { useAdminDraft } from '../hooks/useAdminDraft';
import AdminSidebar from '../components/admin/AdminSidebar';
import AdminContentRouter from '../components/admin/AdminContentRouter';

const TABS = [
  { id: 'menu',     label: 'תפריט ראשי',       icon: MenuIcon },
  { id: 'header',   label: 'כותרת אתר',         icon: Settings },
  { id: 'home',     label: 'עמוד הבית',          icon: Home },
  { id: 'chapter1', label: '01. נעים להכיר',     icon: Smile },
  { id: 'chapter2', label: '02. המשתתפים',       icon: Users },
  { id: 'chapter3', label: '03. תפקיד הרכזת',   icon: Briefcase },
  { id: 'chapter4', label: '04. עבודה מנהלית',   icon: ClipboardList },
  { id: 'chapter5', label: '05. כלים מעשיים',    icon: Wrench },
  { id: 'footer',   label: 'פוטר',               icon: Phone },
];

// Tabs shown in the mobile bottom bar (most used)
const BOTTOM_BAR_TABS = ['home', 'chapter1', 'chapter2', 'chapter3', 'chapter4'];

const formatTime = (date) =>
  date
    ? date.toLocaleTimeString('he-IL', { hour: '2-digit', minute: '2-digit' })
    : null;

const AdminPanelShell = ({ content, version }) => {
  const {
    getValue,
    update,
    save,
    draft,
    hasUnsavedChanges,
    isSaving,
    error,
    lastSavedAt,
  } = useAdminDraft(content, version);

  const [activeTab, setActiveTab]     = useState('menu');
  const [toast, setToast]             = useState(null);
  const [drawerOpen, setDrawerOpen]   = useState(false);

  /* ── Toast helper ── */
  const showToast = useCallback((type, message) => {
    setToast({ type, message });
    setTimeout(() => setToast(null), 3500);
  }, []);

  /* ── Save handler ── */
  const handleSave = useCallback(async () => {
    try {
      await save();
      showToast('success', 'הנתונים נשמרו בהצלחה!');
      window.dispatchEvent(new CustomEvent('reim-content-saved'));
    } catch (e) {
      showToast('error', 'שגיאה בשמירה: ' + (e?.message || 'אירעה שגיאה בלתי צפויה'));
    }
  }, [save, showToast]);

  /* ── Cmd/Ctrl + S keyboard shortcut ── */
  useEffect(() => {
    const handler = (e) => {
      if ((e.metaKey || e.ctrlKey) && e.key === 's') {
        e.preventDefault();
        if (hasUnsavedChanges && !isSaving) handleSave();
      }
    };
    window.addEventListener('keydown', handler);
    return () => window.removeEventListener('keydown', handler);
  }, [handleSave, hasUnsavedChanges, isSaving]);

  /* ── Tab switch with unsaved guard ── */
  const handleTabChange = useCallback(
    (id) => {
      if (id === activeTab) return;
      if (hasUnsavedChanges) {
        const ok = window.confirm(
          'יש שינויים שלא נשמרו. האם לעבור ללשונית בכל זאת? (השינויים ישמרו בזיכרון ולא יאבדו)'
        );
        if (!ok) return;
      }
      setActiveTab(id);
    },
    [activeTab, hasUnsavedChanges]
  );

  /* ── Close drawer on Escape ── */
  useEffect(() => {
    if (!drawerOpen) return;
    const handler = (e) => { if (e.key === 'Escape') setDrawerOpen(false); };
    window.addEventListener('keydown', handler);
    return () => window.removeEventListener('keydown', handler);
  }, [drawerOpen]);

  const bottomBarTabs = TABS.filter((t) => BOTTOM_BAR_TABS.includes(t.id));

  return (
    <div className="min-h-screen bg-[#F4F5F9] font-['Rubik']" dir="rtl">

      {/* ══ Mobile drawer overlay ══ */}
      {drawerOpen && (
        <div
          className="fixed inset-0 z-40 bg-black/40 lg:hidden"
          onClick={() => setDrawerOpen(false)}
          aria-hidden
        />
      )}

      {/* ══ Mobile slide-in drawer ══ */}
      <div
        className={`fixed top-0 right-0 h-full w-72 max-w-[85vw] bg-white shadow-2xl z-50 transition-transform duration-300 ease-out lg:hidden overflow-y-auto ${
          drawerOpen ? 'translate-x-0' : 'translate-x-full'
        }`}
        role="dialog"
        aria-modal="true"
        aria-label="תפריט ניווט ניהול"
      >
        <AdminSidebar
          tabs={TABS}
          activeTab={activeTab}
          onTabChange={handleTabChange}
          mobile
          onClose={() => setDrawerOpen(false)}
        />
      </div>

      {/* ══ Sticky top bar ══ */}
      <header className="sticky top-0 lg:top-24 z-20 bg-white border-b border-gray-100 shadow-sm">
        <div className="max-w-[1600px] mx-auto px-4 sm:px-6 py-4 flex items-center gap-3">

          {/* Hamburger (mobile only) */}
          <button
            onClick={() => setDrawerOpen(true)}
            aria-label="פתח תפריט ניווט"
            className="lg:hidden p-2 rounded-xl bg-[#F4F5F9] text-gray-600 hover:bg-[#E8E9FF] hover:text-[#5E3BEE] transition-colors shrink-0"
          >
            <AlignJustify size={20} />
          </button>

          {/* Title + status */}
          <div className="flex-1 min-w-0">
            <h1 className="text-lg sm:text-2xl font-black text-[#2D2D44] leading-tight truncate">
              ניהול מערכת ויזואלי
            </h1>
            <div className="flex items-center gap-2 text-[10px] text-gray-400 mt-0.5 flex-wrap">
              <span>גרסה: {version}</span>
              <span className="w-1 h-1 rounded-full bg-gray-300 hidden sm:block" />
              {hasUnsavedChanges ? (
                <span className="flex items-center gap-1 text-amber-500 font-semibold">
                  <span className="w-2 h-2 rounded-full bg-amber-400 animate-pulse" />
                  יש שינויים שלא נשמרו
                </span>
              ) : (
                <span className="flex items-center gap-1 text-emerald-500">
                  <span className="w-2 h-2 rounded-full bg-emerald-400" />
                  כל השינויים שמורים
                  {lastSavedAt && (
                    <span className="text-[10px] text-gray-400 hidden sm:inline">
                      (נשמר ב-{formatTime(lastSavedAt)})
                    </span>
                  )}
                </span>
              )}
            </div>
          </div>

          {/* Error badge */}
          {error && (
            <span className="text-xs text-red-500 max-w-[160px] text-right hidden sm:block shrink-0">
              {error.message || 'שגיאה בשמירה'}
            </span>
          )}

          {/* Save button */}
          <button
            onClick={handleSave}
            disabled={isSaving || !hasUnsavedChanges}
            aria-label="שמור שינויים (Ctrl+S)"
            title="שמור שינויים (Ctrl+S)"
            className={`flex items-center gap-2 px-4 sm:px-6 py-2.5 rounded-full font-black text-sm shadow-md transition-all shrink-0 ${
              isSaving || !hasUnsavedChanges
                ? 'bg-gray-200 text-gray-400 cursor-not-allowed'
                : 'bg-[#5E3BEE] text-white hover:scale-105 active:scale-95'
            }`}
          >
            <Save size={16} />
            <span className="hidden sm:inline">{isSaving ? 'שומר...' : 'שמור'}</span>
          </button>
        </div>
      </header>

      {/* ══ Toast — RTL-correct (start-6) ══ */}
      {toast && (
        <div className="fixed top-20 start-6 z-30 pointer-events-none">
          <div
            className={`px-4 py-3 rounded-2xl shadow-xl text-sm flex items-center gap-3 pointer-events-auto ${
              toast.type === 'success'
                ? 'bg-emerald-50 text-emerald-700 border border-emerald-200'
                : 'bg-red-50 text-red-700 border border-red-200'
            }`}
            role="alert"
          >
            {toast.type === 'success' ? (
              <CheckCircle size={16} className="text-emerald-500 shrink-0" />
            ) : (
              <AlertCircle size={16} className="text-red-500 shrink-0" />
            )}
            <span>{toast.message}</span>
          </div>
        </div>
      )}

      {/* ══ Main layout ══ */}
      <div className="max-w-[1600px] mx-auto px-4 sm:px-6 py-6 pb-24 lg:pb-6">
        <div className="flex flex-col lg:flex-row gap-6">

          {/* Desktop sidebar */}
          <aside className="hidden lg:block">
            <AdminSidebar
              tabs={TABS}
              activeTab={activeTab}
              onTabChange={handleTabChange}
            />
          </aside>

          {/* Content area */}
          <main className="flex-grow min-w-0 min-h-[600px]">
            <AdminContentRouter
              activeTab={activeTab}
              getValue={getValue}
              update={update}
              draft={draft}
            />
          </main>
        </div>
      </div>

      {/* ══ Mobile bottom tab bar ══ */}
      <nav
        className="fixed bottom-0 inset-x-0 z-20 bg-white border-t border-gray-100 shadow-[0_-2px_12px_rgba(0,0,0,0.06)] flex lg:hidden"
        aria-label="ניווט מהיר"
      >
        {bottomBarTabs.map((tab) => {
          const Icon = tab.icon;
          const isActive = activeTab === tab.id;
          return (
            <button
              key={tab.id}
              onClick={() => handleTabChange(tab.id)}
              className={`flex-1 flex flex-col items-center justify-center gap-1 py-2 transition-colors ${
                isActive ? 'text-[#5E3BEE]' : 'text-gray-400'
              }`}
              aria-label={tab.label}
              aria-current={isActive ? 'page' : undefined}
            >
              <Icon size={20} />
              <span className="text-[9px] font-bold leading-none">{tab.label.split(' ')[0]}</span>
              {isActive && (
                <span className="absolute top-0 w-8 h-0.5 bg-[#5E3BEE] rounded-b-full" />
              )}
            </button>
          );
        })}
        {/* "More" button opens drawer */}
        <button
          onClick={() => setDrawerOpen(true)}
          className="flex-1 flex flex-col items-center justify-center gap-1 py-2 text-gray-400"
          aria-label="כל הסקשנים"
        >
          <AlignJustify size={20} />
          <span className="text-[9px] font-bold leading-none">עוד</span>
        </button>
      </nav>
    </div>
  );
};

export default AdminPanelShell;
