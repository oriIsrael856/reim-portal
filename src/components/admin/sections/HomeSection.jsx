import React from 'react';
import { Home } from 'lucide-react';
import { SmartField, UniversalCardEditor } from '../VisualBlock';

/**
 * Home page content editing section.
 */
const HomeSection = ({ getValue, update }) => {
  return (
    <div className="space-y-6 animate-in fade-in">
      <div className="bg-white p-8 rounded-[32px] shadow-sm">
        <h3 className="font-black text-xl mb-4">כותרות ראשיות</h3>
        <SmartField
          label="כותרת 1"
          value={getValue('home.hero.title1')}
          onChange={(v) => update('home.hero.title1', v)}
        />
        <SmartField
          label="כותרת 2"
          value={getValue('home.hero.title2')}
          onChange={(v) => update('home.hero.title2', v)}
        />
        <SmartField
          label="תת-כותרת"
          value={getValue('home.hero.subtitle')}
          onChange={(v) => update('home.hero.subtitle', v)}
        />
        <SmartField
          label="אינטרו - כותרת"
          value={getValue('home.intro.title')}
          onChange={(v) => update('home.intro.title', v)}
        />
        <SmartField
          label="אינטרו - טקסט"
          value={getValue('home.intro.text')}
          onChange={(v) => update('home.intro.text', v)}
        />
      </div>

      <UniversalCardEditor
        title="קרוסלת כרטיסים"
        items={getValue('home.carousel')}
        onUpdate={(v) => update('home.carousel', v)}
        newItemTemplate={{ title: '', desc: '', icon: 'Star' }}
        icon={Home}
      />
    </div>
  );
};

export default HomeSection;

