import React from 'react';

/**
 * Sidebar navigation for the admin CMS.
 * Pure presentational component driven entirely by the `tabs` config.
 */
const AdminSidebar = ({ tabs, activeTab, onTabChange }) => {
  return (
    <nav className="w-full lg:w-72 flex flex-col gap-2 shrink-0 h-fit sticky top-48">
      {tabs.map((tab) => {
        const Icon = tab.icon;
        const isActive = activeTab === tab.id;
        return (
          <button
            key={tab.id}
            onClick={() => onTabChange(tab.id)}
            className={`flex items-center gap-3 p-4 rounded-xl font-bold transition-all text-right ${
              isActive
                ? 'bg-white border-2 border-[#5E3BEE] text-[#5E3BEE] shadow-md'
                : 'bg-white text-gray-500 hover:bg-gray-50'
            }`}
          >
            {Icon && <Icon size={18} />}
            {tab.label}
          </button>
        );
      })}
    </nav>
  );
};

export default AdminSidebar;

