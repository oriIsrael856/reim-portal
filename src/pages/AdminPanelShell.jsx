import React, { useState } from 'react';
import {
  Save,
  Home,
  Menu as MenuIcon,
  Smile,
  Users,
  Briefcase,
  ClipboardList,
  Wrench,
  Layout,
  Phone,
  Info,
  StickyNote,
  List,
  CheckCircle2,
  Layers,
} from 'lucide-react';
import { useAdminDraft } from '../hooks/useAdminDraft';
import AdminSidebar from '../components/admin/AdminSidebar';
import AdminContentRouter from '../components/admin/AdminContentRouter';

const TABS = [
  { id: 'menu', label: 'תפריט ראשי', icon: MenuIcon },
  { id: 'home', label: 'עמוד הבית', icon: Home },
  { id: 'chapter1', label: '01. נעים להכיר', icon: Smile },
  { id: 'chapter2', label: '02. המשתתפים', icon: Users },
  { id: 'chapter3', label: '03. תפקיד הרכזת', icon: Briefcase },
  { id: 'chapter4', label: '04. עבודה מנהלית', icon: ClipboardList },
  { id: 'chapter5', label: '05. כלים מעשיים', icon: Wrench },
  { id: 'footer', label: 'פוטר', icon: Phone },
];

const formatTime = (date) =>
  date
    ? date.toLocaleTimeString('he-IL', {
        hour: '2-digit',
        minute: '2-digit',
      })
    : null;

const AdminPanelShell = ({ content, version }) => {
  const {
    draft,
    getValue,
    update,
    save,
    hasUnsavedChanges,
    isSaving,
    error,
    lastSavedAt,
  } = useAdminDraft(content, version);

  const [activeTab, setActiveTab] = useState('menu');
  const [toast, setToast] = useState(null);

  const handleSave = async () => {
    try {
      await save();
      setToast({
        type: 'success',
        message: 'הנתונים נשמרו בהצלחה!',
      });
      // Tell the app to refresh content from Firestore so the homepage/carousel shows the new card
      window.dispatchEvent(new CustomEvent('reim-content-saved'));
    } catch (e) {
      setToast({
        type: 'error',
        message: 'שגיאה בשמירה: ' + (e?.message || 'אירעה שגיאה בלתי צפויה'),
      });
    } finally {
      setTimeout(() => setToast(null), 3000);
    }
  };

  return (
    <div
      className="min-h-screen bg-[#F4F5F9] pt-24 pb-20 px-6 font-['Rubik']"
      dir="rtl"
    >
      <div className="max-w-[1600px] mx-auto">
        <div className="flex justify-between items-center mb-10 bg-white p-8 rounded-[32px] shadow-sm sticky top-24 z-20">
          <div>
            <h1 className="text-3xl font-black text-[#2D2D44]">
              ניהול מערכת ויזואלי
            </h1>
            <div className="flex items-center gap-3 text-xs text-gray-400 mt-1">
              <span>גרסה פעילה: {version}</span>
              <span className="w-1 h-1 rounded-full bg-gray-300" />
              {hasUnsavedChanges ? (
                <span className="flex items-center gap-1 text-[#D97706] font-semibold">
                  <span className="w-2 h-2 rounded-full bg-[#FBBF24] animate-pulse" />
                  יש שינויים שלא נשמרו
                </span>
              ) : (
                <span className="flex items-center gap-1 text-emerald-500">
                  <span className="w-2 h-2 rounded-full bg-emerald-400" />
                  כל השינויים שמורים
                  {lastSavedAt && (
                    <span className="text-[10px] text-gray-400">
                      (נשמר לאחרונה בשעה {formatTime(lastSavedAt)})
                    </span>
                  )}
                </span>
              )}
            </div>
          </div>

          <div className="flex items-center gap-3">
            {error && (
              <span className="text-xs text-red-500 max-w-[220px] text-right">
                {error.message || 'שגיאה בשמירה'}
              </span>
            )}
            <button
              onClick={handleSave}
              disabled={isSaving || !hasUnsavedChanges}
              className={`flex items-center gap-2 px-7 py-3 rounded-full font-black shadow-lg transition-all ${
                isSaving || !hasUnsavedChanges
                  ? 'bg-gray-200 text-gray-400 cursor-not-allowed'
                  : 'bg-[#5E3BEE] text-white hover:scale-105'
              }`}
            >
              <Save size={18} />
              {isSaving ? 'שומר...' : 'שמור שינויים'}
            </button>
          </div>
        </div>

        {toast && (
          <div className="fixed top-6 right-6 z-30">
            <div
              className={`px-4 py-3 rounded-2xl shadow-xl text-sm flex items-center gap-3 ${
                toast.type === 'success'
                  ? 'bg-emerald-50 text-emerald-700 border border-emerald-200'
                  : 'bg-red-50 text-red-700 border border-red-200'
              }`}
            >
              <div
                className={`w-2 h-2 rounded-full ${
                  toast.type === 'success' ? 'bg-emerald-500' : 'bg-red-500'
                }`}
              />
              <span>{toast.message}</span>
            </div>
          </div>
        )}

        <div className="flex flex-col lg:flex-row gap-8">
          <AdminSidebar
            tabs={TABS}
            activeTab={activeTab}
            onTabChange={setActiveTab}
          />

          <div className="flex-grow min-h-[800px]">
            <AdminContentRouter
              activeTab={activeTab}
              getValue={getValue}
              update={update}
              draft={draft}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminPanelShell;

