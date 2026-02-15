import React, { useState } from 'react';
import { Plus, Trash2, Edit3, Type, List, Eye, EyeOff, CheckSquare } from 'lucide-react';

// --- רכיב 1: שדה חכם ---
export const SmartField = ({ label, value, onChange }) => {
    const isLong = String(value).length > 60 || label.toLowerCase().includes('text') || label.toLowerCase().includes('desc') || label.toLowerCase().includes('content');
    
    return (
        <div className="mb-4 w-full">
            <label className="flex items-center gap-2 text-[10px] font-black text-[#2D2D44]/40 mb-1 uppercase tracking-wider">
                {label}
            </label>
            {isLong ? (
                <textarea 
                    className="w-full p-3 bg-[#F8F9FC] border-2 border-[#Eef0f5] rounded-xl focus:border-[#5E3BEE] focus:bg-white outline-none transition-all text-sm leading-relaxed min-h-[80px]"
                    value={value || ""}
                    onChange={(e) => onChange(e.target.value)}
                />
            ) : (
                <input 
                    type="text"
                    className="w-full p-3 bg-[#F8F9FC] border-2 border-[#Eef0f5] rounded-lg focus:border-[#5E3BEE] focus:bg-white outline-none transition-all text-sm font-bold"
                    value={value || ""}
                    onChange={(e) => onChange(e.target.value)}
                />
            )}
        </div>
    );
};

// --- רכיב 2: עורך רשימות פשוטות (הפתרון לעמוד 4) ---
export const SimpleListEditor = ({ title, items = [], onUpdate, icon: Icon = List }) => {
    // הגנה: אם זה לא מערך, נהפוך למערך ריק. אם זה מחרוזת, נכניס אותה כפריט ראשון.
    const safeItems = Array.isArray(items) ? items : (typeof items === 'string' ? [items] : []);

    const updateItem = (idx, val) => {
        const next = [...safeItems];
        next[idx] = val;
        onUpdate(next);
    };

    return (
        <div className="bg-white border border-gray-200 rounded-[30px] p-8 mb-8 shadow-sm">
            <div className="flex justify-between items-center mb-6 pb-4 border-b border-gray-100">
                <div className="flex items-center gap-3">
                    <div className="p-2 bg-[#E0F7FA] rounded-lg text-[#006064]"><Icon size={20}/></div>
                    <h3 className="font-black text-lg text-[#2D2D44]">{title}</h3>
                </div>
                <button onClick={() => onUpdate([...safeItems, ""])} className="bg-[#00BCD4] text-white px-4 py-2 rounded-full font-black text-xs flex items-center gap-2 hover:brightness-105">
                    <Plus size={14}/> הוסף שורה
                </button>
            </div>
            <div className="space-y-3">
                {safeItems.map((item, idx) => (
                    <div key={idx} className="flex gap-3 items-center group">
                        <div className="bg-gray-100 text-gray-400 w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold">{idx + 1}</div>
                        <input 
                            className="flex-grow p-3 bg-[#F8F9FC] border border-gray-200 rounded-xl focus:border-[#00BCD4] outline-none text-sm font-medium"
                            value={item}
                            placeholder="הזן תוכן..."
                            onChange={(e) => updateItem(idx, e.target.value)}
                        />
                        <button onClick={() => onUpdate(safeItems.filter((_, i) => i !== idx))} className="text-gray-300 hover:text-red-500 p-2"><Trash2 size={18}/></button>
                    </div>
                ))}
                {safeItems.length === 0 && <div className="text-gray-400 text-sm text-center">הוסיפי שורות לרשימה באמצעות כפתור ההוספה.</div>}
            </div>
        </div>
    );
};

// מחזיר את המספר הבא לפורמט "01", "02", ... לפי המקסימום הקיים או המיקום
const getNextCardId = (existingItems) => {
    const numericIds = (existingItems || [])
        .map((item) => item && item.id != null && String(item.id))
        .filter(Boolean)
        .map((id) => parseInt(id, 10))
        .filter((n) => !Number.isNaN(n));
    const nextNum = numericIds.length > 0 ? Math.max(...numericIds) + 1 : 1;
    return nextNum.toString().padStart(2, '0');
};

// --- רכיב 3: עורך כרטיסים אוניברסלי (לכל השאר) ---
export const UniversalCardEditor = ({ title, items = [], onUpdate, newItemTemplate = {}, icon: Icon = List }) => {
    const safeItems = Array.isArray(items) ? items : [];
    const [showRaw, setShowRaw] = useState(false);

    const updateItem = (idx, key, val) => {
        const next = [...safeItems];
        next[idx] = { ...next[idx], [key]: val };
        onUpdate(next);
    };

    const handleAddCard = () => {
        const nextId = getNextCardId(safeItems);
        const newItem = { ...newItemTemplate, id: nextId };
        onUpdate([...safeItems, newItem]);
    };

    return (
        <div className="bg-white border border-gray-200 rounded-[30px] p-8 mb-8 shadow-sm">
            <div className="flex justify-between items-center mb-6 pb-4 border-b border-gray-100">
                <div className="flex items-center gap-3">
                    <div className="p-2 bg-[#F0F2FF] rounded-lg text-[#5E3BEE]"><Icon size={20}/></div>
                    <h3 className="font-black text-lg text-[#2D2D44]">{title}</h3>
                </div>
                <div className="flex gap-2">
                    <button onClick={() => setShowRaw(!showRaw)} className="text-gray-300 hover:text-[#5E3BEE]"><Eye size={16}/></button>
                    <button onClick={handleAddCard} className="bg-[#C5E080] text-[#2D2D44] px-4 py-2 rounded-full font-black text-xs flex items-center gap-2 hover:brightness-105">
                        <Plus size={14}/> הוסף כרטיס
                    </button>
                </div>
            </div>

            <div className="grid grid-cols-1 gap-6">
                {safeItems.length === 0 && <div className="text-center text-gray-300 py-8">אין פריטים להצגה. לחץ "הוסף כרטיס" כדי להתחיל.</div>}
                
                {safeItems.map((item, idx) => (
                    <div key={idx} className="relative bg-white p-6 rounded-2xl border-2 border-gray-100 hover:border-[#5E3BEE]/20 transition-all shadow-sm group">
                        <button onClick={() => { if(window.confirm("למחוק?")) onUpdate(safeItems.filter((_, i) => i !== idx)); }} className="absolute top-2 left-2 text-red-300 hover:text-red-500 p-2 opacity-0 group-hover:opacity-100 transition-opacity">
                            <Trash2 size={16}/>
                        </button>

                        <div className="space-y-2">
                            {Object.keys(item).map(key => {
                                if (key === 'id') return null;
                                // טיפול במערכים פנימיים
                                if (Array.isArray(item[key])) {
                                    return (
                                        <SimpleListEditor 
                                            key={key} 
                                            title={key === 'items' ? 'רשימה פנימית' : key} 
                                            items={item[key]} 
                                            onUpdate={(newArr) => updateItem(idx, key, newArr)}
                                            icon={CheckSquare}
                                        />
                                    );
                                }
                                return <SmartField key={key} label={key} value={item[key]} onChange={(val) => updateItem(idx, key, val)} />;
                            })}
                        </div>
                        {showRaw && <pre className="mt-4 p-2 bg-gray-900 text-green-400 text-[10px] rounded dir-ltr text-left overflow-auto">{JSON.stringify(item, null, 2)}</pre>}
                    </div>
                ))}
            </div>
        </div>
    );
};