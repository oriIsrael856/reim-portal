import React from 'react';
import { Briefcase, List as ListIcon } from 'lucide-react';
import { SmartField, UniversalCardEditor } from '../VisualBlock';

/**
 * Chapter 3 – ״תפקיד הרכזת״ section editor.
 */
const Chapter3Section = ({ getValue, update }) => {
  return (
    <div className="space-y-6 animate-in fade-in">
      <div className="bg-white p-8 rounded-[32px] shadow-sm">
        <SmartField
          label="כותרת עליונה"
          value={getValue('chapter3.hero.titleTop')}
          onChange={(v) => update('chapter3.hero.titleTop', v)}
        />
        <SmartField
          label="כותרת תחתונה"
          value={getValue('chapter3.hero.titleBottom')}
          onChange={(v) => update('chapter3.hero.titleBottom', v)}
        />
        <SmartField
          label="תיאור"
          value={getValue('chapter3.hero.description')}
          onChange={(v) => update('chapter3.hero.description', v)}
        />
      </div>

      <UniversalCardEditor
        title="כרטיסי אחריות"
        items={getValue('chapter3.responsibilities')}
        onUpdate={(v) => update('chapter3.responsibilities', v)}
        newItemTemplate={{ title: 'חדש', items: [''] }}
        icon={Briefcase}
      />

      <UniversalCardEditor
        title="שלבי המפגש (אקורדיון)"
        items={getValue('chapter3.sessionStructure.items')}
        onUpdate={(v) => update('chapter3.sessionStructure.items', v)}
        icon={ListIcon}
      />
    </div>
  );
};

export default Chapter3Section;

