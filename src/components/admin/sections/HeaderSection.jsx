import React from 'react';
import { Settings } from 'lucide-react';
import { SmartField, ImageField } from '../VisualBlock';

/**
 * Site header editor — logo, alt text, CTA button text.
 */
const HeaderSection = ({ getValue, update }) => {
  return (
    <div className="space-y-6 animate-in fade-in">
      <div className="bg-white p-8 rounded-[32px] shadow-sm">
        <div className="flex items-center gap-3 mb-6">
          <div className="p-2 bg-[#F0F2FF] rounded-lg text-[#5E3BEE]">
            <Settings size={20} />
          </div>
          <h3 className="font-black text-xl text-[#2D2D44]">כותרת האתר</h3>
        </div>
        <ImageField
          label="לוגו (URL או העלאת קובץ)"
          value={getValue('header.logo')}
          onChange={(v) => update('header.logo', v)}
        />
        <SmartField
          label="טקסט חלופי ללוגו (alt)"
          value={getValue('header.logoAlt')}
          onChange={(v) => update('header.logoAlt', v)}
          maxLength={40}
        />
        <SmartField
          label="טקסט חלופי לוגו (fallback)"
          value={getValue('header.logoFallback')}
          onChange={(v) => update('header.logoFallback', v)}
          maxLength={20}
        />
        <SmartField
          label="טקסט כפתור CTA"
          value={getValue('header.ctaText')}
          onChange={(v) => update('header.ctaText', v)}
          maxLength={40}
        />
      </div>
    </div>
  );
};

export default HeaderSection;
