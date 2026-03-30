import React from 'react';
import { StickyNote, Layout, BookOpen } from 'lucide-react';
import { SmartField, ImageField, UniversalCardEditor } from '../VisualBlock';

/**
 * Chapter 1 – ״נעים להכיר״ section editor.
 */
const Chapter1Section = ({ getValue, update }) => {
  return (
    <div className="space-y-6 animate-in fade-in">

      {/* Hero */}
      <div className="bg-white p-8 rounded-[32px] shadow-sm">
        <h3 className="font-black text-xl mb-6 text-[#2D2D44]">Hero — כותרות ותמונות</h3>
        <SmartField
          label="תגית פרק"
          value={getValue('chapter1.hero.tag')}
          onChange={(v) => update('chapter1.hero.tag', v)}
          maxLength={30}
        />
        <SmartField
          label="כותרת (שורה ראשונה – שחור)"
          value={getValue('chapter1.hero.title1') || getValue('chapter1.hero.title')}
          onChange={(v) => update('chapter1.hero.title1', v)}
          maxLength={60}
        />
        <SmartField
          label="כותרת (שורה שנייה – סגול + קו כתום)"
          value={getValue('chapter1.hero.title2')}
          onChange={(v) => update('chapter1.hero.title2', v)}
          maxLength={60}
        />
        <SmartField
          label="הנחיית גלילה (למשל: גוללים למטה ומגלים...)"
          value={getValue('chapter1.hero.instruction')}
          onChange={(v) => update('chapter1.hero.instruction', v)}
        />
        <SmartField
          label="כיתוב תמונה (caption)"
          value={getValue('chapter1.hero.imageCaption')}
          onChange={(v) => update('chapter1.hero.imageCaption', v)}
        />
        <h4 className="font-black text-base mb-3 mt-6 text-[#2D2D44]">תמונות</h4>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <ImageField label="תמונה 1" value={getValue('chapter1.hero.image1')} onChange={(v) => update('chapter1.hero.image1', v)} />
          <ImageField label="תמונה 2" value={getValue('chapter1.hero.image2')} onChange={(v) => update('chapter1.hero.image2', v)} />
        </div>
      </div>

      {/* Cards */}
      <UniversalCardEditor
        title="כרטיסיות 'לאן אנחנו הולכות'"
        items={getValue('chapter1.stickyNotes') || getValue('chapter1.cards')}
        onUpdate={(v) => update('chapter1.cards', v)}
        newItemTemplate={{
          title: 'חדש',
          subtitle: '',
          text: '',
          sec1Title: '',
          sec1Text: '',
          sec2Title: '',
          sec2Text: '',
        }}
        icon={StickyNote}
      />

      {/* Sections */}
      <UniversalCardEditor
        title="סקשנים של תוכן"
        items={getValue('chapter1.sections')}
        onUpdate={(v) => update('chapter1.sections', v)}
        newItemTemplate={{ title: 'חדש', content: '' }}
        icon={Layout}
      />

      {/* Next button */}
      <div className="bg-white p-8 rounded-[32px] shadow-sm">
        <div className="flex items-center gap-3 mb-4">
          <div className="p-2 bg-[#E0F7FA] rounded-lg text-[#006064]"><BookOpen size={20} /></div>
          <h3 className="font-black text-xl text-[#2D2D44]">כפתור פרק הבא</h3>
        </div>
        <SmartField label="כותרת הכפתור" value={getValue('chapter1.nextButton.title')}    onChange={(v) => update('chapter1.nextButton.title', v)} />
        <SmartField label="תת-כותרת"      value={getValue('chapter1.nextButton.subtitle')} onChange={(v) => update('chapter1.nextButton.subtitle', v)} />
      </div>
    </div>
  );
};

export default Chapter1Section;
