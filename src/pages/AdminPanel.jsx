import React, { useState } from 'react';
import { Save, Home, Menu as MenuIcon, Smile, Users, Briefcase, ClipboardList, Wrench, Layout, Phone, Info, StickyNote, List, CheckCircle2, Layers } from 'lucide-react';
import { SmartField, UniversalCardEditor, SimpleListEditor } from '../components/admin/VisualBlock';
import { saveContent } from '../services/contentService';
import { getNestedValue, setNestedValue } from '../utils/objectHelpers';

const AdminPanel = ({ content, version }) => {
    const [draft, setDraft] = useState(content || {});
    const [activeTab, setActiveTab] = useState('menu');
    const [isSaving, setIsSaving] = useState(false);

    const getValue = (path) => getNestedValue(draft, path);

    const updateNested = (path, value) => {
        setDraft(prev => setNestedValue(prev, path, value));
    };

    const handleSave = async () => {
        setIsSaving(true);
        try {
            await saveContent(version, draft);
            alert("✅ הנתונים נשמרו בהצלחה!");
            window.location.reload();
        } catch (e) { alert("❌ שגיאה: " + e.message); }
        finally { setIsSaving(false); }
    };

    return (
        <div className="min-h-screen bg-[#F4F5F9] pt-24 pb-20 px-6 font-['Rubik']" dir="rtl">
            <div className="max-w-[1600px] mx-auto">
                <div className="flex justify-between items-center mb-10 bg-white p-8 rounded-[32px] shadow-sm sticky top-24 z-20">
                    <div>
                        <h1 className="text-3xl font-black text-[#2D2D44]">ניהול מערכת ויזואלי</h1>
                        <p className="text-sm text-gray-400">גרסה פעילה: {version}</p>
                    </div>
                    <button onClick={handleSave} disabled={isSaving} className="bg-[#5E3BEE] text-white px-8 py-3 rounded-full font-black shadow-lg hover:scale-105 transition-all">
                        {isSaving ? "שומר..." : "שמור שינויים"}
                    </button>
                </div>

                <div className="flex flex-col lg:flex-row gap-8">
                    <nav className="w-full lg:w-72 flex flex-col gap-2 shrink-0 h-fit sticky top-48">
                        {[{ id: 'menu', label: 'תפריט ראשי', icon: MenuIcon }, { id: 'home', label: 'עמוד הבית', icon: Home }, { id: 'chapter1', label: '01. נעים להכיר', icon: Smile }, { id: 'chapter2', label: '02. המשתתפים', icon: Users }, { id: 'chapter3', label: '03. תפקיד הרכזת', icon: Briefcase }, { id: 'chapter4', label: '04. עבודה מנהלית', icon: ClipboardList }, { id: 'chapter5', label: '05. כלים מעשיים', icon: Wrench }, { id: 'footer', label: 'פוטר', icon: Phone }].map(tab => (
                            <button key={tab.id} onClick={() => setActiveTab(tab.id)} className={`flex items-center gap-3 p-4 rounded-xl font-bold transition-all text-right ${activeTab === tab.id ? 'bg-white border-2 border-[#5E3BEE] text-[#5E3BEE] shadow-md' : 'bg-white text-gray-500 hover:bg-gray-50'}`}>
                                <tab.icon size={18}/> {tab.label}
                            </button>
                        ))}
                    </nav>

                    <div className="flex-grow min-h-[800px]">
                        
                        {activeTab === 'menu' && <UniversalCardEditor title="פריטי תפריט" items={getValue('menu')} onUpdate={v => updateNested('menu', v)} newItemTemplate={{ title: "חדש", page: "home" }} icon={MenuIcon} />}

                        {activeTab === 'home' && (
                            <div className="space-y-6 animate-in fade-in">
                                <div className="bg-white p-8 rounded-[32px] shadow-sm">
                                    <h3 className="font-black text-xl mb-4">כותרות ראשיות</h3>
                                    <SmartField label="כותרת 1" value={getValue('home.hero.title1')} onChange={v => updateNested('home.hero.title1', v)} />
                                    <SmartField label="כותרת 2" value={getValue('home.hero.title2')} onChange={v => updateNested('home.hero.title2', v)} />
                                    <SmartField label="תת-כותרת" value={getValue('home.hero.subtitle')} onChange={v => updateNested('home.hero.subtitle', v)} />
                                    <SmartField label="אינטרו - כותרת" value={getValue('home.intro.title')} onChange={v => updateNested('home.intro.title', v)} />
                                    <SmartField label="אינטרו - טקסט" value={getValue('home.intro.text')} onChange={v => updateNested('home.intro.text', v)} />
                                </div>
                                <UniversalCardEditor title="קרוסלת כרטיסים" items={getValue('home.carousel')} onUpdate={v => updateNested('home.carousel', v)} newItemTemplate={{ title: "", desc: "", icon: "Star" }} icon={Home} />
                            </div>
                        )}

                        {activeTab === 'chapter1' && (
                            <div className="space-y-6 animate-in fade-in">
                                <div className="bg-white p-8 rounded-[32px] shadow-sm">
                                    <h3 className="font-black text-xl mb-4">הגדרות כלליות</h3>
                                    <SmartField label="תגית" value={getValue('chapter1.hero.tag')} onChange={v => updateNested('chapter1.hero.tag', v)} />
                                    <SmartField label="כותרת" value={getValue('chapter1.hero.title')} onChange={v => updateNested('chapter1.hero.title', v)} />
                                    <SmartField label="תיאור" value={getValue('chapter1.hero.description')} onChange={v => updateNested('chapter1.hero.description', v)} />
                                </div>
                                <UniversalCardEditor title="כרטיסיות 'לאן אנחנו הולכות'" items={getValue('chapter1.stickyNotes') || getValue('chapter1.cards')} onUpdate={v => updateNested('chapter1.stickyNotes', v)} newItemTemplate={{ title: "חדש", text: "" }} icon={StickyNote} />
                                <UniversalCardEditor title="סקשנים של תוכן" items={getValue('chapter1.sections')} onUpdate={v => updateNested('chapter1.sections', v)} newItemTemplate={{ title: "חדש", content: "" }} icon={Layout} />
                            </div>
                        )}

                        {activeTab === 'chapter2' && (
                            <div className="space-y-6 animate-in fade-in">
                                <div className="bg-white p-8 rounded-[32px] shadow-sm">
                                    <SmartField label="כותרת" value={getValue('chapter2.hero.title')} onChange={v => updateNested('chapter2.hero.title', v)} />
                                    <SmartField label="תיאור" value={getValue('chapter2.hero.subtitle')} onChange={v => updateNested('chapter2.hero.subtitle', v)} />
                                </div>
                                <UniversalCardEditor title="כרטיסיות דביקות (Stickies)" items={getValue('chapter2.stickyNotes')} onUpdate={v => updateNested('chapter2.stickyNotes', v)} newItemTemplate={{ title: "חדש", text: "", color: "yellow" }} icon={StickyNote} />
                                <UniversalCardEditor title="קהל יעד" items={getValue('chapter2.targetAudience.items')} onUpdate={v => updateNested('chapter2.targetAudience.items', v)} icon={Users} />
                                <UniversalCardEditor title="מטרות התוכנית" items={getValue('chapter2.goals.items')} onUpdate={v => updateNested('chapter2.goals.items', v)} icon={Smile} />
                            </div>
                        )}

                        {activeTab === 'chapter3' && (
                            <div className="space-y-6 animate-in fade-in">
                                <div className="bg-white p-8 rounded-[32px] shadow-sm">
                                    <SmartField label="כותרת עליונה" value={getValue('chapter3.hero.titleTop')} onChange={v => updateNested('chapter3.hero.titleTop', v)} />
                                    <SmartField label="כותרת תחתונה" value={getValue('chapter3.hero.titleBottom')} onChange={v => updateNested('chapter3.hero.titleBottom', v)} />
                                    <SmartField label="תיאור" value={getValue('chapter3.hero.description')} onChange={v => updateNested('chapter3.hero.description', v)} />
                                </div>
                                <UniversalCardEditor title="כרטיסי אחריות" items={getValue('chapter3.responsibilities')} onUpdate={v => updateNested('chapter3.responsibilities', v)} newItemTemplate={{ title: "חדש", items: [""] }} icon={Briefcase} />
                                <UniversalCardEditor title="שלבי המפגש (אקורדיון)" items={getValue('chapter3.sessionStructure.items')} onUpdate={v => updateNested('chapter3.sessionStructure.items', v)} icon={List} />
                            </div>
                        )}

                        {activeTab === 'chapter4' && (
                            <div className="space-y-6 animate-in fade-in">
                                <div className="bg-white p-8 rounded-[32px] shadow-sm">
                                    <h3 className="font-black text-xl mb-4">נתיב וניהול</h3>
                                    <SmartField label="נתיב - כותרת" value={getValue('chapter4.nativSystem.title')} onChange={v => updateNested('chapter4.nativSystem.title', v)} />
                                    <SmartField label="נתיב - תיאור" value={getValue('chapter4.nativSystem.description')} onChange={v => updateNested('chapter4.nativSystem.description', v)} />
                                    
                                    {/* --- התיקון הקריטי לעמוד 4: עורך רשימות פשוטות --- */}
                                    <SimpleListEditor 
                                        title="עקרונות נתיב" 
                                        items={getValue('chapter4.nativSystem.principles')} 
                                        onUpdate={v => updateNested('chapter4.nativSystem.principles', v)} 
                                        icon={List}
                                    />
                                </div>
                                <UniversalCardEditor title="כרטיסי פיצ'רים" items={getValue('chapter4.features')} onUpdate={v => updateNested('chapter4.features', v)} icon={Layout} />
                                <UniversalCardEditor title="שלבי הוועדות" items={getValue('chapter4.committees.steps')} onUpdate={v => updateNested('chapter4.committees.steps', v)} icon={Layers} />
                                <UniversalCardEditor title="שאלות ותשובות" items={getValue('chapter4.qa')} onUpdate={v => updateNested('chapter4.qa', v)} icon={Info} />
                            </div>
                        )}

                        {activeTab === 'chapter5' && (
                            <div className="space-y-6 animate-in fade-in">
                                <div className="bg-white p-8 rounded-[32px] shadow-sm">
                                    <SmartField label="טקסט שיווק" value={getValue('chapter5.marketing.text')} onChange={v => updateNested('chapter5.marketing.text', v)} />
                                    <SmartField label="תיאור הרכזיה" value={getValue('chapter5.resources.library.desc')} onChange={v => updateNested('chapter5.resources.library.desc', v)} />
                                </div>
                                <UniversalCardEditor title="צעדי פעולה (אקורדיון)" items={getValue('chapter5.marketing.steps')} onUpdate={v => updateNested('chapter5.marketing.steps', v)} icon={ClipboardList} />
                                <UniversalCardEditor title="כרטיסי Networking" items={getValue('chapter5.networking.cards')} onUpdate={v => updateNested('chapter5.networking.cards', v)} icon={Smile} />
                            </div>
                        )}

                        {activeTab === 'footer' && (
                            <div className="bg-white p-8 rounded-[32px] shadow-sm animate-in fade-in">
                                <h3 className="font-black text-xl mb-4">יצירת קשר</h3>
                                <SmartField label="טלפון" value={getValue('footer.contact.phone')} onChange={v => updateNested('footer.contact.phone', v)} />
                                <SmartField label="אימייל" value={getValue('footer.contact.email')} onChange={v => updateNested('footer.contact.email', v)} />
                                <SmartField label="פקס" value={getValue('footer.contact.fax')} onChange={v => updateNested('footer.contact.fax', v)} />
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default AdminPanel;