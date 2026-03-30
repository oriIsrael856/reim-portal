import React from 'react';
import { X } from 'lucide-react';

/**
 * Admin CMS navigation sidebar.
 *
 * On desktop (lg+): renders as a sticky left sidebar.
 * On mobile: rendered inside a slide-in drawer controlled by the parent.
 *
 * Props:
 *   tabs        — array of { id, label, icon }
 *   activeTab   — currently active tab id
 *   onTabChange — (id: string) => void
 *   mobile      — when true, shows a close button (for use inside the drawer)
 *   onClose     — () => void — called when the close button is pressed
 */
const AdminSidebar = ({ tabs, activeTab, onTabChange, mobile = false, onClose }) => {
  return (
    <nav
      className={`flex flex-col gap-1 ${
        mobile ? 'w-full p-4' : 'w-full lg:w-72 shrink-0 h-fit sticky top-48'
      }`}
      aria-label="ניווט ניהול"
    >
      {mobile && (
        <div className="flex items-center justify-between mb-4 pb-3 border-b border-gray-100">
          <span className="font-black text-[#2D2D44]">ניהול מערכת</span>
          <button
            onClick={onClose}
            aria-label="סגור תפריט"
            className="p-2 text-gray-400 hover:text-[#2D2D44] rounded-full hover:bg-gray-100"
          >
            <X size={20} />
          </button>
        </div>
      )}

      {tabs.map((tab) => {
        const Icon = tab.icon;
        const isActive = activeTab === tab.id;
        return (
          <button
            key={tab.id}
            onClick={() => {
              onTabChange(tab.id);
              if (mobile && onClose) onClose();
            }}
            className={`flex items-center gap-3 p-4 rounded-xl font-bold transition-all text-right w-full ${
              isActive
                ? 'bg-[#F0F2FF] border-2 border-[#5E3BEE] text-[#5E3BEE] shadow-sm'
                : 'bg-white text-gray-500 hover:bg-gray-50 border-2 border-transparent'
            }`}
            aria-current={isActive ? 'page' : undefined}
          >
            {Icon && <Icon size={18} className="shrink-0" />}
            <span className="truncate">{tab.label}</span>
            {isActive && (
              <span className="ms-auto w-2 h-2 rounded-full bg-[#5E3BEE] shrink-0" />
            )}
          </button>
        );
      })}
    </nav>
  );
};

export default AdminSidebar;
