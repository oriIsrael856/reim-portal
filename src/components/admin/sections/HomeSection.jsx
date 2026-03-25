import React from 'react';
import { Home } from 'lucide-react';
import { SmartField, ImageField, UniversalCardEditor } from '../VisualBlock';

/**
 * Home page content editing section.
 */
const HomeSection = ({ getValue, update }) => {
  const heroImages = getValue('home.hero.images') || [];
  const setHeroImage = (index, url) => {
    const next = [...heroImages];
    next[index] = url;
    update('home.hero.images', next);
  };

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
          label="כותרת 1.5 (שורה אמצעית)"
          value={getValue('home.hero.titleLine2') || ''}
          onChange={(v) => update('home.hero.titleLine2', v)}
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
          label="אינטרו - תת־כותרת (מעל הכותרת)"
          value={getValue('home.intro.subtitle') || ''}
          onChange={(v) => update('home.intro.subtitle', v)}
        />
        <SmartField
          label="אינטרו - טקסט"
          value={getValue('home.intro.text')}
          onChange={(v) => update('home.intro.text', v)}
        />
        <h3 className="font-black text-xl mb-4 mt-8">גריד תמונות (מעל הקרוסלה — Figma 191:11486)</h3>
        <p className="text-[#2D2D44]/70 text-sm mb-4">
          עמודה רחבה (שמאל בפיגמה) ועמודה צרה; רווח 16px, מסגרת וצל כמו בעיצוב.
        </p>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <ImageField
            label="תמונה — עמודה רחבה"
            value={getValue('home.photoGrid.left') ?? getValue('home.photoGrid')?.left}
            onChange={(v) => update('home.photoGrid.left', v)}
          />
          <ImageField
            label="תמונה — עמודה צרה"
            value={getValue('home.photoGrid.right') ?? getValue('home.photoGrid')?.right}
            onChange={(v) => update('home.photoGrid.right', v)}
          />
        </div>
        <h3 className="font-black text-xl mb-4 mt-8">תמונות Hero (קרוסלה)</h3>
        <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
          {[0, 1, 2, 3, 4].map((i) => (
            <ImageField
              key={i}
              label={`תמונה ${i + 1}`}
              value={heroImages[i]}
              onChange={(v) => setHeroImage(i, v)}
            />
          ))}
        </div>
      </div>

      <div className="bg-white p-8 rounded-[32px] shadow-sm">
        <h3 className="font-black text-xl mb-4">ניוזלטר – טקסטים (כרטיס Figma 191:9424)</h3>
        <p className="text-[#2D2D44]/70 text-sm mb-4">
          כל השדות נשמרים ב-Firestore; בהמשך ניתן לחבר את שליחת המייל לרשימת תפוצה.
        </p>
        <SmartField
          label="תת־כותרת (מעל הכותרת)"
          value={getValue('home.newsletter.subtitle') || ''}
          onChange={(v) => update('home.newsletter.subtitle', v)}
        />
        <SmartField
          label="כותרת"
          value={getValue('home.newsletter.title') || ''}
          onChange={(v) => update('home.newsletter.title', v)}
        />
        <SmartField
          label="טקסט גוף"
          value={getValue('home.newsletter.text') || ''}
          onChange={(v) => update('home.newsletter.text', v)}
        />
        <SmartField
          label="מציין מקום בשדה המייל"
          value={getValue('home.newsletter.placeholder') || ''}
          onChange={(v) => update('home.newsletter.placeholder', v)}
        />
        <h3 className="font-black text-xl mb-4 mt-8">ניוזלטר – תמונות (דסקטופ)</h3>
        <p className="text-[#2D2D44]/70 text-sm mb-4">תמונות משני צדי כרטיס הניוזלטר בעמוד הבית.</p>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <ImageField
            label="תמונה מצד ימין לניוזלטר"
            value={getValue('home.newsletter.images.right') ?? getValue('home.newsletter.images')?.right}
            onChange={(v) => update('home.newsletter.images.right', v)}
          />
          <ImageField
            label="תמונה מצד שמאל לניוזלטר"
            value={getValue('home.newsletter.images.left') ?? getValue('home.newsletter.images')?.left}
            onChange={(v) => update('home.newsletter.images.left', v)}
          />
        </div>
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

