import React from 'react';
import { StickyNote, Layout } from 'lucide-react';
import { SmartField, UniversalCardEditor } from '../VisualBlock';

/**
 * Chapter 1 – ״נעים להכיר״ section editor.
 */
const Chapter1Section = ({ getValue, update }) => {
  return (
    <div className="space-y-6 animate-in fade-in">
      <div className="bg-white p-8 rounded-[32px] shadow-sm">
        <h3 className="font-black text-xl mb-4">הגדרות כלליות</h3>
        <SmartField
          label="תגית"
          value={getValue('chapter1.hero.tag')}
          onChange={(v) => update('chapter1.hero.tag', v)}
        />
        <SmartField
          label="כותרת"
          value={getValue('chapter1.hero.title')}
          onChange={(v) => update('chapter1.hero.title', v)}
        />
        <SmartField
          label="תיאור"
          value={getValue('chapter1.hero.description')}
          onChange={(v) => update('chapter1.hero.description', v)}
        />
      </div>

      <UniversalCardEditor
        title="כרטיסיות 'לאן אנחנו הולכות'"
        items={getValue('chapter1.stickyNotes') || getValue('chapter1.cards')}
        onUpdate={(v) => update('chapter1.stickyNotes', v)}
        newItemTemplate={{ title: 'חדש', text: '' }}
        icon={StickyNote}
      />

      <UniversalCardEditor
        title="סקשנים של תוכן"
        items={getValue('chapter1.sections')}
        onUpdate={(v) => update('chapter1.sections', v)}
        newItemTemplate={{ title: 'חדש', content: '' }}
        icon={Layout}
      />
    </div>
  );
};

export default Chapter1Section;

