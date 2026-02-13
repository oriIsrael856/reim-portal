import React from 'react';
import { Settings } from 'lucide-react';

const AdminBar = ({ version, onNavigateAdmin, onReset, onLogout }) => {
  return (
    <div className="fixed top-0 left-0 right-0 h-12 bg-[#2D2D44] text-white flex items-center justify-between px-4 z-[9999] shadow-lg">
      <div className="flex items-center gap-4">
        <span className="text-xs font-mono text-green-400 border border-green-400 px-2 rounded">ADMIN MODE {version}</span>
        <button
          onClick={onNavigateAdmin}
          className="flex items-center gap-2 text-xs bg-[#5E3BEE] hover:bg-[#4a2ec6] px-3 py-1 rounded transition-colors"
        >
          <Settings size={14} /> לוח בקרה
        </button>
      </div>
      <div className="flex gap-2">
        <button onClick={onReset} className="bg-yellow-600 px-3 py-1 text-xs rounded hover:bg-yellow-500 transition-colors">איפוס נתונים</button>
        <button onClick={onLogout} className="bg-red-600 px-3 py-1 text-xs rounded hover:bg-red-500 transition-colors">יציאה</button>
      </div>
    </div>
  );
};

export default AdminBar;
