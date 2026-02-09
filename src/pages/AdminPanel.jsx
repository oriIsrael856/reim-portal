import React, { useState } from 'react';
import { Save, RefreshCcw, Home, Menu as MenuIcon, BookOpen, Info, Settings } from 'lucide-react';
import ArrayEditor from '../components/admin/ArrayEditor';
import { db } from '../firebase';
import { doc, updateDoc } from 'firebase/firestore';

const AdminPanel = ({ content, version }) => {
    const [draft, setDraft] = useState(content);
    const [isSaving, setIsSaving] = useState(false);
    const [activeTab, setActiveTab] = useState('menu');

    /**
     * פונקציית שליפת ערך בטוחה (Safe Access)
     * מונעת קריסות כמו "Cannot read properties of undefined"
     */
    const getValue = (path) => {
        if (!path) return undefined;
        return path.split('.').reduce((obj, key) => (obj && obj[key] !== undefined) ? obj[key] : undefined, draft);
    };

    /**
     * ארכיטקטורת עדכון "בונה מסלול"
     * אם ננסה לעדכן את chapter2.targetAudience.items והוא לא קיים, הפונקציה תיצור את האובייקטים בדרך
     */
    const updateNested = (path, value) => {
        setDraft(prev => {
            const newDraft = { ...prev };
            const keys = path.split('.');
            let current = newDraft;

            for (let i = 0; i < keys.length - 1; i++) {
                const key = keys[i];
                // אם המסלול לא קיים, ניצור אובייקט חדש
                if (!current[key] || typeof current[key] !== 'object') {
                    current[key] = {};
                }
                // נשכפל את האובייקט כדי לשמור על Immutability
                current[key] = { ...current[key] };
                current = current[key];
            }

            current[keys[keys.length - 1]] = value;
            return newDraft;
        });
    };

    const handleSave = async () => {
        setIsSaving(true);
        try {
            await updateDoc(doc(db, "site_content", version), draft);
            alert("הנתונים נשמרו ב-Firebase!");
            window.location.reload(); 
        } catch (error) {
            alert("שגיאה בסנכרון מול הענן: " + error.message);
        } finally {
            setIsSaving(false);
        }
    };

    const Field = ({ label, path, type = "text" }) => (
        <div className="flex flex-col gap-1 mb-6">
            <label className="text-xs font-black text-gray-400 uppercase tracking-wider">{label}</label>
            {type === "textarea" ? (
                <textarea 
                    className="p-4 border-2 border-gray-100 rounded-2xl focus:border-[#5E3BEE] outline-none min-h-[120px] text-sm leading-relaxed"
                    value={getValue(path) || ""}
                    onChange={(e) => updateNested(path, e.target.value)}
                />
            ) : (
                <input 
                    type="text"
                    className="p-4 border-2 border-gray-100 rounded-2xl focus:border-[#5E3BEE] outline-none text-sm font-medium"
                    value={getValue(path) || ""}
                    onChange={(e) => updateNested(path, e.target.value)}
                />
            )}
        </div>
    );

    return (
        <div className="min-h-screen bg-[#F3F0FF] pt-24 pb-20 px-6 font-['Rubik'] text-right" dir="rtl">
            <div className="max-w-[1600px] mx-auto">
                
                {/* --- בר ניהול עליון --- */}
                <div className="flex flex-col md:flex-row justify-between items-center mb-10 bg-white p-8 rounded-[35px] shadow-sm border border-gray-100">
                    <div className="flex items-center gap-6">
                        <div className="w-16 h-16 bg-[#F3F0FF] rounded-3xl flex items-center justify-center text-[#5E3BEE]">
                            <Settings size={32} />
                        </div>
                        <div>
                            <h1 className="text-3xl font-black text-[#2D2D44]">מרכז ניהול התוכן</h1>
                            <p className="text-sm text-gray-400 font-medium">עריכת גרסה: <span className="font-bold text-[#5E3BEE]">{version}</span></p>
                        </div>
                    </div>
                    <button 
                        onClick={handleSave} 
                        disabled={isSaving}
                        className="bg-[#5E3BEE] text-white px-12 py-5 rounded-full font-black flex items-center gap-3 hover:bg-[#4a2ec6] transition-all disabled:opacity-50 shadow-xl shadow-[#5E3BEE]/20"
                    >
                        {isSaving ? <RefreshCcw className="animate-spin" /> : <Save />}
                        עדכן את כל האתר
                    </button>
                </div>

                <div className="flex flex-col lg:flex-row gap-10">
                    {/* Navigation Tabs */}
                    <div className="w-full lg:w-80 flex flex-col gap-3">
                        {[
                            { id: 'menu', label: 'ניהול תפריט', icon: MenuIcon },
                            { id: 'home', label: 'עמוד הבית', icon: Home },
                            { id: 'chapter1', label: '01: נעים להכיר', icon: BookOpen },
                            { id: 'chapter2', label: '02: המשתתפים', icon: BookOpen },
                            { id: 'chapter3', label: '03: תפקיד הרכזת', icon: BookOpen },
                            { id: 'chapter4', label: '04: עבודה מנהלית', icon: BookOpen },
                            { id: 'chapter5', label: '05: כלים מעשיים', icon: BookOpen },
                            { id: 'footer', label: 'יצירת קשר', icon: Info },
                        ].map(tab => (
                            <button 
                                key={tab.id} 
                                onClick={() => setActiveTab(tab.id)} 
                                className={`flex items-center gap-4 p-5 rounded-[22px] font-bold transition-all text-right ${activeTab === tab.id ? 'bg-[#5E3BEE] text-white shadow-lg scale-105' : 'bg-white text-[#2D2D44] hover:bg-white/60 shadow-sm'}`}
                            >
                                <tab.icon size={22} />
                                <span className="flex-grow">{tab.label}</span>
                            </button>
                        ))}
                    </div>

                    {/* Main Editor Section */}
                    <div className="flex-grow bg-white rounded-[45px] p-12 shadow-sm border border-gray-50 min-h-[700px]">
                        
                        {/* תפריט */}
                        {activeTab === 'menu' && (
                            <ArrayEditor label="עריכת פריטי התפריט" items={getValue('menu')} template={{ id: "01", title: "", page: "" }} onUpdate={(v) => updateNested('menu', v)} />
                        )}

                        {/* עמוד הבית */}
                        {activeTab === 'home' && (
                            <div className="animate-in fade-in duration-500">
                                <h2 className="text-2xl font-black mb-8 border-b pb-4 text-[#5E3BEE]">עמוד הבית</h2>
                                <Field label="כותרת Hero 1" path="home.hero.title1" />
                                <Field label="כותרת Hero 2" path="home.hero.title2" />
                                <Field label="תיאור Hero" path="home.hero.subtitle" />
                                <Field label="כותרת אינטרו" path="home.intro.title" />
                                <Field label="טקסט אינטרו" path="home.intro.text" type="textarea" />
                                <ArrayEditor label="כרטיסי קרוסלה" items={getValue('home.carousel')} template={{ id: "01", title: "", desc: "", icon: "Star" }} onUpdate={(v) => updateNested('home.carousel', v)} />
                            </div>
                        )}

                        {/* פרק 1 */}
                        {activeTab === 'chapter1' && (
                            <div className="animate-in fade-in duration-500">
                                <h2 className="text-2xl font-black mb-8 border-b pb-4 text-[#5E3BEE]">פרק 01 - נעים להכיר</h2>
                                <Field label="כותרת Hero" path="chapter1.hero.title" />
                                <Field label="תיאור Hero" path="chapter1.hero.description" type="textarea" />
                                <ArrayEditor label="ניהול סקשנים" items={getValue('chapter1.sections')} template={{ id: "01", title: "", content: "", tag: "" }} onUpdate={(v) => updateNested('chapter1.sections', v)} />
                            </div>
                        )}

                        {/* פרק 2 - המקום שבו הייתה השגיאה */}
                        {activeTab === 'chapter2' && (
                            <div className="animate-in fade-in duration-500">
                                <h2 className="text-2xl font-black mb-8 border-b pb-4 text-[#5E3BEE]">פרק 02 - המשתתפים</h2>
                                <Field label="כותרת ראשית" path="chapter2.hero.title" />
                                <Field label="תיאור" path="chapter2.hero.subtitle" type="textarea" />
                                <ArrayEditor label="קהל יעד (Target Audience)" items={getValue('chapter2.targetAudience.items')} template={{ title: "", text: "" }} onUpdate={(v) => updateNested('chapter2.targetAudience.items', v)} />
                                <ArrayEditor label="מטרות התוכנית (Goals)" items={getValue('chapter2.goals.items')} template={{ title: "", text: "", icon: "Check" }} onUpdate={(v) => updateNested('chapter2.goals.items', v)} />
                            </div>
                        )}

                        {/* פרק 3 */}
                        {activeTab === 'chapter3' && (
                            <div className="animate-in fade-in duration-500">
                                <h2 className="text-2xl font-black mb-8 border-b pb-4 text-[#5E3BEE]">פרק 03 - תפקיד הרכזת</h2>
                                <Field label="תיאור הפרק" path="chapter3.hero.description" type="textarea" />
                                <ArrayEditor label="כרטיסי אחריות" items={getValue('chapter3.responsibilities')} template={{ title: "", titleColor: "text-[#5E3BEE]", items: [""] }} onUpdate={(v) => updateNested('chapter3.responsibilities', v)} />
                                <ArrayEditor label="מדריך הצעדים" items={getValue('chapter3.onboarding.steps')} template={{ id: "00", step: "", title: "", items: [""] }} onUpdate={(v) => updateNested('chapter3.onboarding.steps', v)} />
                                <ArrayEditor label="מבנה המפגש" items={getValue('chapter3.sessionStructure.items')} template={{ title: "", content: "" }} onUpdate={(v) => updateNested('chapter3.sessionStructure.items', v)} />
                            </div>
                        )}

                        {/* פרק 4 */}
                        {activeTab === 'chapter4' && (
                            <div className="animate-in fade-in duration-500">
                                <h2 className="text-2xl font-black mb-8 border-b pb-4 text-[#5E3BEE]">פרק 04 - עבודה מנהלית</h2>
                                <Field label="תיאור נתיב" path="chapter4.nativSystem.description" type="textarea" />
                                <ArrayEditor label="שלבי הוועדות" items={getValue('chapter4.committees.steps')} template={{ id: "01", title: "", desc: "" }} onUpdate={(v) => updateNested('chapter4.committees.steps', v)} />
                                <ArrayEditor label="שאלות ותשובות (QA)" items={getValue('chapter4.qa')} template={{ title: "", content: "" }} onUpdate={(v) => updateNested('chapter4.qa', v)} />
                            </div>
                        )}

                        {/* פרק 5 */}
                        {activeTab === 'chapter5' && (
                            <div className="animate-in fade-in duration-500">
                                <h2 className="text-2xl font-black mb-8 border-b pb-4 text-[#5E3BEE]">פרק 05 - כלים מעשיים</h2>
                                <Field label="טקסט שיווק" path="chapter5.marketing.text" type="textarea" />
                                <ArrayEditor label="כרטיסי Networking" items={getValue('chapter5.networking.cards')} template={{ title: "", text: "" }} onUpdate={(v) => updateNested('chapter5.networking.cards', v)} />
                                <Field label="תיאור הרכזיה" path="chapter5.resources.library.desc" type="textarea" />
                                <Field label="טקסט ניוזלטר" path="chapter5.resources.newsletter.text" type="textarea" />
                            </div>
                        )}

                        {/* פוטר */}
                        {activeTab === 'footer' && (
                            <div className="animate-in fade-in">
                                <h2 className="text-2xl font-black mb-8 border-b pb-4 text-[#5E3BEE]">פוטר ויצירת קשר</h2>
                                <Field label="טלפון" path="footer.contact.phone" />
                                <Field label="אימייל" path="footer.contact.email" />
                                <Field label="פקס" path="footer.contact.fax" />
                            </div>
                        )}

                    </div>
                </div>
            </div>
        </div>
    );
};

export default AdminPanel;