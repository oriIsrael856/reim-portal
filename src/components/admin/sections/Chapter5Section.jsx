import React from 'react';
import { ClipboardList, Smile } from 'lucide-react';
import { SmartField, ImageField, UniversalCardEditor } from '../VisualBlock';

/**
 * Chapter 5 – ״כלים מעשיים״ section editor.
 */
const Chapter5Section = ({ getValue, update }) => {
  const heroImages = getValue('chapter5.hero.images') || [];
  const setHeroImage = (index, url) => {
    const next = [...heroImages];
    next[index] = url;
    update('chapter5.hero.images', next);
  };
  return (
    <div className="space-y-6 animate-in fade-in">
      <div className="bg-white p-8 rounded-[32px] shadow-sm">
        <SmartField
          label="טקסט שיווק"
          value={getValue('chapter5.marketing.text')}
          onChange={(v) => update('chapter5.marketing.text', v)}
        />
        <h3 className="font-black text-xl mb-4 mt-6">תמונות Hero</h3>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          {[0, 1, 2].map((i) => (
            <ImageField key={i} label={`תמונה ${i + 1}`} value={heroImages[i]} onChange={(v) => setHeroImage(i, v)} />
          ))}
        </div>
        <ImageField label="הרכזיה - תמונה" value={getValue('chapter5.resources.library.image')} onChange={(v) => update('chapter5.resources.library.image', v)} />
      </div>

      <UniversalCardEditor
        title="צעדי פעולה (אקורדיון)"
        items={getValue('chapter5.marketing.steps')}
        onUpdate={(v) => update('chapter5.marketing.steps', v)}
        icon={ClipboardList}
      />

      <UniversalCardEditor
        title="כרטיסי Networking"
        items={getValue('chapter5.networking.cards')}
        onUpdate={(v) => update('chapter5.networking.cards', v)}
        icon={Smile}
      />
    </div>
  );
};

export default Chapter5Section;

