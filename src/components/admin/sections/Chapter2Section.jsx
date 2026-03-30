import React from 'react';
import { StickyNote, Users, Smile, BookOpen, Heart } from 'lucide-react';
import { SmartField, ImageField, UniversalCardEditor, SimpleListEditor } from '../VisualBlock';

/**
 * Helper to safely resolve an array from multiple possible nested paths.
 */
const getSmartArray = (getValue, paths) => {
  for (const path of paths) {
    const value = getValue(path);
    if (Array.isArray(value)) return { items: value, path };
  }
  return { items: [], path: paths[0] };
};

/**
 * Chapter 2 – ״המשתתפים״ section editor.
 */
const Chapter2Section = ({ getValue, update }) => {
  const stickySource = getSmartArray(getValue, [
    'chapter2.stickyNotes.items',
    'chapter2.stickyNotes',
    'chapter2.cards.items',
    'chapter2.cards',
  ]);

  const targetAudienceSource = getSmartArray(getValue, [
    'chapter2.contentBox.ageGroups',
    'chapter2.targetAudience.items',
    'chapter2.targetAudience',
  ]);

  const goalsSource = getSmartArray(getValue, [
    'chapter2.contentBox.goals',
    'chapter2.goals.items',
    'chapter2.goals',
  ]);

  const goalsArePlainStrings =
    Array.isArray(goalsSource.items) &&
    goalsSource.items.length > 0 &&
    goalsSource.items.every((item) => typeof item === 'string');

  const goalsItemsForEditor = goalsArePlainStrings
    ? goalsSource.items.map((text) => ({ title: '', text, icon: 'Star' }))
    : goalsSource.items;

  return (
    <div className="space-y-6 animate-in fade-in">

      {/* Hero */}
      <div className="bg-white p-8 rounded-[32px] shadow-sm">
        <h3 className="font-black text-xl mb-6 text-[#2D2D44]">Hero</h3>
        <SmartField label="כותרת" value={getValue('chapter2.hero.title')} onChange={(v) => update('chapter2.hero.title', v)} />
        <SmartField label="כותרת בשורת הכרום (מובייל)" value={getValue('chapter2.hero.chromeTitle')} onChange={(v) => update('chapter2.hero.chromeTitle', v)} />
        <SmartField label="תגית" value={getValue('chapter2.hero.tag')} onChange={(v) => update('chapter2.hero.tag', v)} />
        <h4 className="font-black text-base mb-3 mt-6 text-[#2D2D44]">תמונות Hero</h4>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          <ImageField label="תמונה 1" value={getValue('chapter2.hero.image1')} onChange={(v) => update('chapter2.hero.image1', v)} />
          <ImageField label="תמונה 2" value={getValue('chapter2.hero.image2')} onChange={(v) => update('chapter2.hero.image2', v)} />
          <ImageField label="תמונה 3" value={getValue('chapter2.hero.image3')} onChange={(v) => update('chapter2.hero.image3', v)} />
          <ImageField label="תמונה 4" value={getValue('chapter2.hero.image4')} onChange={(v) => update('chapter2.hero.image4', v)} />
        </div>
      </div>

      {/* Content box */}
      <div className="bg-white p-8 rounded-[32px] shadow-sm">
        <h3 className="font-black text-xl mb-6 text-[#2D2D44]">בלוק קהל יעד ומטרות</h3>
        <SmartField label="כותרת קהל יעד" value={getValue('chapter2.contentBox.audienceTitle')} onChange={(v) => update('chapter2.contentBox.audienceTitle', v)} />
        <SmartField label="טקסט קהל יעד"  value={getValue('chapter2.contentBox.audienceText')}  onChange={(v) => update('chapter2.contentBox.audienceText', v)} />
        <SmartField label="כותרת מטרות"   value={getValue('chapter2.contentBox.goalsTitle')}    onChange={(v) => update('chapter2.contentBox.goalsTitle', v)} />
      </div>

      {/* Stickies */}
      <UniversalCardEditor
        title="כרטיסיות דביקות (Stickies)"
        items={stickySource.items}
        onUpdate={(v) => update(stickySource.path, v)}
        newItemTemplate={{ title: 'חדש', text: '', color: 'yellow' }}
        icon={StickyNote}
      />

      {/* Age groups */}
      <UniversalCardEditor
        title="קבוצות גיל"
        items={targetAudienceSource.items}
        onUpdate={(v) => update(targetAudienceSource.path, v)}
        newItemTemplate={
          targetAudienceSource.path === 'chapter2.contentBox.ageGroups'
            ? { label: '', age: '' }
            : { title: 'חדש', text: '' }
        }
        icon={Users}
      />

      {/* Goals */}
      <UniversalCardEditor
        title="מטרות התוכנית"
        items={goalsItemsForEditor}
        onUpdate={(v) => {
          if (goalsArePlainStrings && goalsSource.path === 'chapter2.contentBox.goals') {
            const asStrings = (v || []).map((item) =>
              typeof item === 'string' ? item : item.text || ''
            );
            update(goalsSource.path, asStrings);
          } else {
            update(goalsSource.path, v);
          }
        }}
        newItemTemplate={{ title: 'חדש', text: '', icon: 'Star' }}
        icon={Smile}
      />

      {/* Groups intro */}
      <div className="bg-white p-8 rounded-[32px] shadow-sm">
        <h3 className="font-black text-xl mb-6 text-[#2D2D44]">הקבוצות ברעים — פתיח</h3>
        <SmartField label="כותרת משנה"  value={getValue('chapter2.groupsIntro.subheading')}  onChange={(v) => update('chapter2.groupsIntro.subheading', v)} />
        <SmartField label="כותרת ראשית" value={getValue('chapter2.groupsIntro.title')}       onChange={(v) => update('chapter2.groupsIntro.title', v)} />
        <SmartField label="פתיח"        value={getValue('chapter2.groupsIntro.intro')}        onChange={(v) => update('chapter2.groupsIntro.intro', v)} />
        <SmartField label="תיאור"       value={getValue('chapter2.groupsIntro.description')}  onChange={(v) => update('chapter2.groupsIntro.description', v)} />
        <ImageField label="תמונה"       value={getValue('chapter2.groupsIntro.image')}        onChange={(v) => update('chapter2.groupsIntro.image', v)} />
      </div>

      {/* Populations */}
      <UniversalCardEditor
        title="אוכלוסיות (populations)"
        items={getValue('chapter2.groupsIntro.populations')}
        onUpdate={(v) => update('chapter2.groupsIntro.populations', v)}
        newItemTemplate={{ id: '', text: '' }}
        icon={Users}
      />

      {/* Group 01 */}
      <div className="bg-white p-8 rounded-[32px] shadow-sm">
        <h3 className="font-black text-xl mb-4 text-[#2D2D44]">קבוצה 01 — אוטיסטים</h3>
        <SmartField label="כותרת"  value={getValue('chapter2.group01.title')} onChange={(v) => update('chapter2.group01.title', v)} />
      </div>
      <UniversalCardEditor
        title="פריטי קבוצה 01"
        items={getValue('chapter2.group01.items')}
        onUpdate={(v) => update('chapter2.group01.items', v)}
        newItemTemplate={{ title: 'חדש', content: '' }}
        icon={BookOpen}
      />

      {/* Group 02 */}
      <div className="bg-white p-8 rounded-[32px] shadow-sm">
        <h3 className="font-black text-xl mb-4 text-[#2D2D44]">קבוצה 02 — לקויות למידה</h3>
        <SmartField label="כותרת"  value={getValue('chapter2.group02.title')} onChange={(v) => update('chapter2.group02.title', v)} />
      </div>
      <UniversalCardEditor
        title="פריטי קבוצה 02"
        items={getValue('chapter2.group02.items')}
        onUpdate={(v) => update('chapter2.group02.items', v)}
        newItemTemplate={{ title: 'חדש', content: '' }}
        icon={BookOpen}
      />

      {/* Why together */}
      <div className="bg-white p-8 rounded-[32px] shadow-sm">
        <h3 className="font-black text-xl mb-4 text-[#2D2D44]">למה שתי האוכלוסיות יחד?</h3>
        <SmartField label="כותרת" value={getValue('chapter2.whyTogether.title')} onChange={(v) => update('chapter2.whyTogether.title', v)} />
      </div>
      <UniversalCardEditor
        title="כרטיסי 'למה יחד'"
        items={getValue('chapter2.whyTogether.cards')}
        onUpdate={(v) => update('chapter2.whyTogether.cards', v)}
        newItemTemplate={{ type: 'text', title: 'חדש', text: '' }}
        icon={Heart}
      />

    </div>
  );
};

export default Chapter2Section;
