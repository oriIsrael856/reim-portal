import React from 'react';
import { Trash2, Plus, ListPlus } from 'lucide-react';

const ArrayEditor = ({ label, items = [], onUpdate, template }) => {
    // הגנה: אם items הוא undefined או null, נהפוך אותו למערך ריק
    const safeItems = Array.isArray(items) ? items : [];

    const addItem = () => onUpdate([...safeItems, { ...template }]);
    
    const removeItem = (idx) => onUpdate(safeItems.filter((_, i) => i !== idx));

    const updateField = (idx, key, value) => {
        const next = [...safeItems];
        next[idx] = { ...next[idx], [key]: value };
        onUpdate(next);
    };

    const updateNestedArray = (idx, key, subIdx, value) => {
        const next = [...safeItems];
        const subArray = Array.isArray(next[idx][key]) ? [...next[idx][key]] : [""];
        subArray[subIdx] = value;
        next[idx] = { ...next[idx], [key]: subArray };
        onUpdate(next);
    };

    const addNestedItem = (idx, key) => {
        const next = [...safeItems];
        const currentSub = Array.isArray(next[idx][key]) ? next[idx][key] : [];
        next[idx] = { ...next[idx], [key]: [...currentSub, ""] };
        onUpdate(next);
    };

    return (
        <div className="p-6 bg-gray-50/50 rounded-[24px] border-2 border-dashed border-gray-200 mb-8">
            <div className="flex justify-between mb-6 items-center">
                <h4 className="font-black text-[#2D2D44]">{label}</h4>
                <button onClick={addItem} className="bg-green-500 text-white p-2 rounded-full hover:bg-green-600 transition-all shadow-md">
                    <Plus size={20}/>
                </button>
            </div>
            <div className="space-y-6">
                {safeItems.map((item, idx) => (
                    <div key={idx} className="bg-white p-5 rounded-2xl border border-gray-200 shadow-sm flex gap-4 items-start relative group">
                        <div className="flex-grow grid grid-cols-1 gap-4">
                            {template && typeof template === 'object' && Object.keys(template).map(key => (
                                <div key={key} className="flex flex-col gap-1">
                                    <label className="text-[10px] font-bold text-gray-400 uppercase">{key}</label>
                                    
                                    {Array.isArray(item[key]) ? (
                                        <div className="space-y-2 border-r-2 border-gray-100 pr-3 text-right">
                                            {item[key].map((subItem, sIdx) => (
                                                <div key={sIdx} className="flex gap-2">
                                                    <input 
                                                        value={subItem} 
                                                        onChange={(e) => updateNestedArray(idx, key, sIdx, e.target.value)}
                                                        className="flex-grow p-2 bg-gray-50 border rounded-lg text-xs outline-none focus:border-[#5E3BEE]"
                                                    />
                                                    <button onClick={() => {
                                                        const next = [...safeItems];
                                                        next[idx][key] = next[idx][key].filter((_, i) => i !== sIdx);
                                                        onUpdate(next);
                                                    }} className="text-red-300 hover:text-red-500"><Trash2 size={12}/></button>
                                                </div>
                                            ))}
                                            <button onClick={() => addNestedItem(idx, key)} className="text-[10px] text-[#5E3BEE] font-bold flex items-center gap-1 mt-1">
                                                <ListPlus size={12}/> הוסף שורה
                                            </button>
                                        </div>
                                    ) : (
                                        <input 
                                            value={item[key] || ""} 
                                            onChange={(e) => updateField(idx, key, e.target.value)} 
                                            className="w-full p-2 border rounded-lg text-sm outline-none focus:border-[#5E3BEE]" 
                                        />
                                    )}
                                </div>
                            ))}
                        </div>
                        <button onClick={() => removeItem(idx)} className="text-red-400 hover:text-red-600 p-2 mt-4"><Trash2 size={20}/></button>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default ArrayEditor;