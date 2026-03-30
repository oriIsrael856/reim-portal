import React from 'react';
import { List as ListIcon, Layout, Layers, Info, FileText } from 'lucide-react';
import { SmartField, ImageField, UniversalCardEditor, SimpleListEditor } from '../VisualBlock';

/**
 * Chapter 4 – ״עבודה מנהלית״ section editor.
 */
const Chapter4Section = ({ getValue, update }) => {
  return (
    <div className="space-y-6 animate-in fade-in">

      {/* Hero */}
      <div className="bg-white p-8 rounded-[32px] shadow-sm">
        <h3 className="font-black text-xl mb-6 text-[#2D2D44]">Hero</h3>
        <SmartField label="תגית"        value={getValue('chapter4.hero.tag')}      onChange={(v) => update('chapter4.hero.tag', v)} maxLength={30} />
        <SmartField label="כותרת"       value={getValue('chapter4.hero.title')}    onChange={(v) => update('chapter4.hero.title', v)} maxLength={60} />
        <SmartField label="תת-כותרת"    value={getValue('chapter4.hero.subtitle')} onChange={(v) => update('chapter4.hero.subtitle', v)} />
        <ImageField label="תמונת Hero"  value={getValue('chapter4.hero.image')}    onChange={(v) => update('chapter4.hero.image', v)} />
      </div>

      {/* Nativ system */}
      <div className="bg-white p-8 rounded-[32px] shadow-sm">
        <h3 className="font-black text-xl mb-6 text-[#2D2D44]">מערכת נתיב</h3>
        <SmartField label="תווית (label)" value={getValue('chapter4.nativSystem.label')}       onChange={(v) => update('chapter4.nativSystem.label', v)} />
        <SmartField label="כותרת"          value={getValue('chapter4.nativSystem.title')}       onChange={(v) => update('chapter4.nativSystem.title', v)} />
        <SmartField label="תיאור"          value={getValue('chapter4.nativSystem.description')} onChange={(v) => update('chapter4.nativSystem.description', v)} />
        <SmartField label="תמיכה והדרכה"  value={getValue('chapter4.nativSystem.support')}     onChange={(v) => update('chapter4.nativSystem.support', v)} />
        <SmartField label="קישור כפתור (URL)" value={getValue('chapter4.nativSystem.ctaUrl')}  onChange={(v) => update('chapter4.nativSystem.ctaUrl', v)} />
        <SimpleListEditor
          title="עקרונות נתיב"
          items={getValue('chapter4.nativSystem.principles')}
          onUpdate={(v) => update('chapter4.nativSystem.principles', v)}
          icon={ListIcon}
        />
      </div>

      {/* Features */}
      <UniversalCardEditor
        title="כרטיסי פיצ'רים"
        items={getValue('chapter4.features')}
        onUpdate={(v) => update('chapter4.features', v)}
        icon={Layout}
      />

      {/* Committees */}
      <div className="bg-white p-8 rounded-[32px] shadow-sm">
        <h3 className="font-black text-xl mb-6 text-[#2D2D44]">ועדות — פתיח וסיום</h3>
        <SmartField label="כותרת הסקשן"    value={getValue('chapter4.committees.title')}  onChange={(v) => update('chapter4.committees.title', v)} />
        <SmartField label="טקסט פתיח (intro)" value={getValue('chapter4.committees.intro')} onChange={(v) => update('chapter4.committees.intro', v)} />
        <SmartField label="טקסט סיום (footer)" value={getValue('chapter4.committees.footer')} onChange={(v) => update('chapter4.committees.footer', v)} />
      </div>

      <UniversalCardEditor
        title="שלבי הוועדות"
        items={getValue('chapter4.committees.steps')}
        onUpdate={(v) => update('chapter4.committees.steps', v)}
        newItemTemplate={{ id: '', title: 'שלב חדש', description: '' }}
        icon={Layers}
      />

      {/* Files */}
      <div className="bg-white p-8 rounded-[32px] shadow-sm">
        <h3 className="font-black text-xl mb-4 text-[#2D2D44]">קבצים להורדה</h3>
        <SmartField label="כותרת הסקשן (filesTitle)" value={getValue('chapter4.filesTitle')} onChange={(v) => update('chapter4.filesTitle', v)} />
      </div>

      <UniversalCardEditor
        title="קבצים"
        items={getValue('chapter4.files')}
        onUpdate={(v) => update('chapter4.files', v)}
        newItemTemplate={{ name: 'שם קובץ', desc: 'תיאור', url: '#' }}
        icon={FileText}
      />

      {/* Q&A */}
      <UniversalCardEditor
        title="שאלות ותשובות (FAQ)"
        items={getValue('chapter4.qa')}
        onUpdate={(v) => update('chapter4.qa', v)}
        newItemTemplate={{ title: 'שאלה חדשה', content: 'תשובה...' }}
        icon={Info}
      />

      {/* Next button */}
      <div className="bg-white p-8 rounded-[32px] shadow-sm">
        <h3 className="font-black text-xl mb-4 text-[#2D2D44]">כפתור פרק הבא</h3>
        <SmartField label="כותרת"    value={getValue('chapter4.nextButton.title')}    onChange={(v) => update('chapter4.nextButton.title', v)} />
        <SmartField label="תת-כותרת" value={getValue('chapter4.nextButton.subtitle')} onChange={(v) => update('chapter4.nextButton.subtitle', v)} />
      </div>
    </div>
  );
};

export default Chapter4Section;
