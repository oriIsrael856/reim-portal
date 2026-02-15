import React from 'react';
import { Settings } from 'lucide-react';

const AdminBar = ({ version, onNavigateAdmin, onReset, onLogout }) => {
  return (
    <div className="fixed top-0 left-0 right-0 h-12 bg-[#2D2D44] text-white flex items-center justify-between px-3 sm:px-4 gap-2 z-[9999] shadow-lg">
      <div className="flex items-center gap-2 sm:gap-4 min-w-0">
        <span className="text-[10px] sm:text-xs font-mono text-green-400 border border-green-400 px-1.5 sm:px-2 rounded shrink-0">ADMIN {version}</span>
        <button
          onClick={onNavigateAdmin}
          className="flex items-center gap-1.5 sm:gap-2 text-xs bg-[#5E3BEE] hover:bg-[#4a2ec6] px-2 sm:px-3 py-1 rounded transition-colors shrink-0"
        >
          <Settings size={14} /> <span className="hidden sm:inline">לוח בקרה</span>
        </button>
      </div>
      <div className="flex gap-1.5 sm:gap-2 shrink-0">
        <button onClick={onReset} className="bg-yellow-600 px-2 sm:px-3 py-1 text-[10px] sm:text-xs rounded hover:bg-yellow-500 transition-colors whitespace-nowrap">איפוס</button>
        <button onClick={onLogout} className="bg-red-600 px-2 sm:px-3 py-1 text-[10px] sm:text-xs rounded hover:bg-red-500 transition-colors">יציאה</button>
      </div>
    </div>
  );
};

export default AdminBar;
