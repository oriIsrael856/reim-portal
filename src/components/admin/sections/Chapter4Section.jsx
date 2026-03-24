import React from 'react';
import { List as ListIcon, Layout, Layers, Info } from 'lucide-react';
import { SmartField, ImageField, UniversalCardEditor, SimpleListEditor } from '../VisualBlock';

/**
 * Chapter 4 – ״עבודה מנהלית״ section editor.
 */
const Chapter4Section = ({ getValue, update }) => {
  return (
    <div className="space-y-6 animate-in fade-in">
      <div className="bg-white p-8 rounded-[32px] shadow-sm">
        <h3 className="font-black text-xl mb-4">נתיב וניהול</h3>
        <SmartField
          label="נתיב - כותרת"
          value={getValue('chapter4.nativSystem.title')}
          onChange={(v) => update('chapter4.nativSystem.title', v)}
        />
        <SmartField
          label="נתיב - תיאור"
          value={getValue('chapter4.nativSystem.description')}
          onChange={(v) => update('chapter4.nativSystem.description', v)}
        />

        <SimpleListEditor
          title="עקרונות נתיב"
          items={getValue('chapter4.nativSystem.principles')}
          onUpdate={(v) => update('chapter4.nativSystem.principles', v)}
          icon={ListIcon}
        />
        <SmartField
          label="נתיב - תמיכה והדרכה (טקסט)"
          value={getValue('chapter4.nativSystem.support')}
          onChange={(v) => update('chapter4.nativSystem.support', v)}
        />
        <SmartField
          label="נתיב - קישור כפתור (URL)"
          value={getValue('chapter4.nativSystem.ctaUrl')}
          onChange={(v) => update('chapter4.nativSystem.ctaUrl', v)}
        />
        <ImageField label="תמונה Hero" value={getValue('chapter4.hero.image')} onChange={(v) => update('chapter4.hero.image', v)} />
      </div>

      <UniversalCardEditor
        title="כרטיסי פיצ'רים"
        items={getValue('chapter4.features')}
        onUpdate={(v) => update('chapter4.features', v)}
        icon={Layout}
      />

      <UniversalCardEditor
        title="שלבי הוועדות"
        items={getValue('chapter4.committees.steps')}
        onUpdate={(v) => update('chapter4.committees.steps', v)}
        icon={Layers}
      />

      <UniversalCardEditor
        title="שאלות ותשובות"
        items={getValue('chapter4.qa')}
        onUpdate={(v) => update('chapter4.qa', v)}
        icon={Info}
      />
    </div>
  );
};

export default Chapter4Section;

