import React from 'react';
import { Briefcase, List as ListIcon, Footprints, BookOpen } from 'lucide-react';
import { SmartField, ImageField, UniversalCardEditor } from '../VisualBlock';

/**
 * Chapter 3 – ״תפקיד הרכזת״ section editor.
 */
const Chapter3Section = ({ getValue, update }) => {
  return (
    <div className="space-y-6 animate-in fade-in">

      {/* Hero */}
      <div className="bg-white p-8 rounded-[32px] shadow-sm">
        <h3 className="font-black text-xl mb-6 text-[#2D2D44]">Hero</h3>
        <SmartField label="תגית"           value={getValue('chapter3.hero.tag')}         onChange={(v) => update('chapter3.hero.tag', v)} />
        <SmartField label="כותרת עליונה"   value={getValue('chapter3.hero.titleTop')}    onChange={(v) => update('chapter3.hero.titleTop', v)} />
        <SmartField label="כותרת תחתונה"   value={getValue('chapter3.hero.titleBottom')} onChange={(v) => update('chapter3.hero.titleBottom', v)} />
        <SmartField label="תיאור"          value={getValue('chapter3.hero.description')} onChange={(v) => update('chapter3.hero.description', v)} />
        <ImageField label="תמונת Hero"     value={getValue('chapter3.hero.image')}       onChange={(v) => update('chapter3.hero.image', v)} />
      </div>

      {/* Responsibilities */}
      <UniversalCardEditor
        title="כרטיסי אחריות"
        items={getValue('chapter3.responsibilities')}
        onUpdate={(v) => update('chapter3.responsibilities', v)}
        newItemTemplate={{ title: 'חדש', titleColor: 'text-[#5E3BEE]', items: [''], action: null }}
        icon={Briefcase}
      />

      {/* Session structure — images */}
      <div className="bg-white p-8 rounded-[32px] shadow-sm">
        <h3 className="font-black text-xl mb-2 text-[#2D2D44]">מבנה המפגש – תמונות</h3>
        <p className="text-[#2D2D44]/70 text-sm mb-4">
          התמונות שמוצגות ליד האקורדיון בסקשן &quot;כיצד נראה מפגש רעים?&quot;
        </p>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <ImageField
            label="תמונה 1 (מעל)"
            value={(getValue('chapter3.sessionStructure.images') ?? [])[0]}
            onChange={(v) => {
              const imgs = [...(getValue('chapter3.sessionStructure.images') ?? ['', ''])];
              imgs[0] = v;
              update('chapter3.sessionStructure.images', imgs);
            }}
          />
          <ImageField
            label="תמונה 2 (מתחת)"
            value={(getValue('chapter3.sessionStructure.images') ?? [])[1]}
            onChange={(v) => {
              const imgs = [...(getValue('chapter3.sessionStructure.images') ?? ['', ''])];
              imgs[1] = v;
              update('chapter3.sessionStructure.images', imgs);
            }}
          />
        </div>
      </div>

      {/* Session structure — accordion */}
      <UniversalCardEditor
        title="שלבי המפגש (אקורדיון)"
        items={getValue('chapter3.sessionStructure.items')}
        onUpdate={(v) => update('chapter3.sessionStructure.items', v)}
        newItemTemplate={{ title: 'חדש', content: '' }}
        icon={ListIcon}
      />

      {/* Onboarding */}
      <div className="bg-white p-8 rounded-[32px] shadow-sm">
        <div className="flex items-center gap-3 mb-6">
          <div className="p-2 bg-[#FFF7ED] rounded-lg text-orange-500"><Footprints size={20} /></div>
          <h3 className="font-black text-xl text-[#2D2D44]">Onboarding — צעדים ראשונים</h3>
        </div>
        <SmartField label="כותרת עליונה"  value={getValue('chapter3.onboarding.titleTop')}           onChange={(v) => update('chapter3.onboarding.titleTop', v)} />
        <SmartField label="כותרת תחתונה" value={getValue('chapter3.onboarding.titleBottom')}          onChange={(v) => update('chapter3.onboarding.titleBottom', v)} />
        <SmartField label="מילת הדגשה"   value={getValue('chapter3.onboarding.titleBottomAccent')}    onChange={(v) => update('chapter3.onboarding.titleBottomAccent', v)} />
        <SmartField label="תיאור"         value={getValue('chapter3.onboarding.description')}          onChange={(v) => update('chapter3.onboarding.description', v)} />
      </div>

      <UniversalCardEditor
        title="שלבי Onboarding"
        items={getValue('chapter3.onboarding.steps')}
        onUpdate={(v) => update('chapter3.onboarding.steps', v)}
        newItemTemplate={{ id: '', title: 'שלב חדש', content: '' }}
        icon={BookOpen}
      />

      {/* Next button */}
      <div className="bg-white p-8 rounded-[32px] shadow-sm">
        <h3 className="font-black text-xl mb-4 text-[#2D2D44]">כפתור פרק הבא</h3>
        <SmartField label="כותרת" value={getValue('chapter3.nextButton.title')}    onChange={(v) => update('chapter3.nextButton.title', v)} />
        <SmartField label="תת-כותרת" value={getValue('chapter3.nextButton.subtitle')} onChange={(v) => update('chapter3.nextButton.subtitle', v)} />
      </div>
    </div>
  );
};

export default Chapter3Section;
