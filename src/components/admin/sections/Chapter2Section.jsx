import React from 'react';
import { StickyNote, Users, Smile } from 'lucide-react';
import { SmartField, UniversalCardEditor } from '../VisualBlock';

/**
 * Helper to safely resolve an array from multiple possible nested paths.
 * Returns the first array found and the exact path it was read from.
 * If nothing is found, returns an empty array and defaults to the first path.
 */
const getSmartArray = (getValue, paths) => {
  for (const path of paths) {
    const value = getValue(path);
    if (Array.isArray(value)) {
      return { items: value, path };
    }
  }
  return { items: [], path: paths[0] };
};

/**
 * Chapter 2 – ״המשתתפים״ section editor.
 */
const Chapter2Section = ({ getValue, update }) => {
  // Sticky notes: support multiple legacy locations
  const stickySource = getSmartArray(getValue, [
    'chapter2.stickyNotes.items',
    'chapter2.stickyNotes',
    'chapter2.cards.items',
    'chapter2.cards',
  ]);

  // Target audience: prefer existing schema under contentBox.ageGroups, then targetAudience fallbacks
  const targetAudienceSource = getSmartArray(getValue, [
    'chapter2.contentBox.ageGroups',
    'chapter2.targetAudience.items',
    'chapter2.targetAudience',
  ]);

  // Goals: prefer existing schema under contentBox.goals, then goals fallbacks
  const goalsSource = getSmartArray(getValue, [
    'chapter2.contentBox.goals',
    'chapter2.goals.items',
    'chapter2.goals',
  ]);

  // When goals are stored as a simple array of strings (current contentBox.goals schema),
  // adapt them into objects for the editor, and convert back to strings on save.
  const goalsArePlainStrings =
    Array.isArray(goalsSource.items) &&
    goalsSource.items.length > 0 &&
    goalsSource.items.every((item) => typeof item === 'string');

  const goalsItemsForEditor = goalsArePlainStrings
    ? goalsSource.items.map((text) => ({
        title: '',
        text,
        icon: 'Star',
      }))
    : goalsSource.items;

  return (
    <div className="space-y-6 animate-in fade-in">
      <div className="bg-white p-8 rounded-[32px] shadow-sm">
        <SmartField
          label="כותרת"
          value={getValue('chapter2.hero.title')}
          onChange={(v) => update('chapter2.hero.title', v)}
        />
        <SmartField
          label="תיאור"
          value={getValue('chapter2.hero.subtitle')}
          onChange={(v) => update('chapter2.hero.subtitle', v)}
        />
      </div>

      <UniversalCardEditor
        title="כרטיסיות דביקות (Stickies)"
        items={stickySource.items}
        onUpdate={(v) => update(stickySource.path, v)}
        newItemTemplate={{ title: 'חדש', text: '', color: 'yellow' }}
        icon={StickyNote}
      />

      <UniversalCardEditor
        title="קהל יעד"
        items={targetAudienceSource.items}
        onUpdate={(v) => update(targetAudienceSource.path, v)}
        // Respect existing ageGroups schema when editing that path
        newItemTemplate={
          targetAudienceSource.path === 'chapter2.contentBox.ageGroups'
            ? { label: '', age: '' }
            : { title: 'חדש', text: '' }
        }
        icon={Users}
      />

      <UniversalCardEditor
        title="מטרות התוכנית"
        items={goalsItemsForEditor}
        onUpdate={(v) => {
          if (
            goalsArePlainStrings &&
            goalsSource.path === 'chapter2.contentBox.goals'
          ) {
            // Persist back as a simple string array to avoid changing the schema
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
    </div>
  );
};

export default Chapter2Section;

