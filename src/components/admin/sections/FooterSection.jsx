import React from 'react';
import { Phone, Globe, Share2, Link } from 'lucide-react';
import { SmartField, ImageField, UniversalCardEditor, SimpleListEditor } from '../VisualBlock';

/**
 * Full footer editor — contact, logos, links, social, copyright.
 */
const FooterSection = ({ getValue, update }) => {
  return (
    <div className="space-y-6 animate-in fade-in">

      {/* Contact */}
      <div className="bg-white p-8 rounded-[32px] shadow-sm">
        <div className="flex items-center gap-3 mb-6">
          <div className="p-2 bg-[#F0FDF4] rounded-lg text-emerald-600"><Phone size={20} /></div>
          <h3 className="font-black text-xl text-[#2D2D44]">יצירת קשר</h3>
        </div>
        <SmartField label="טלפון" value={getValue('footer.contact.phone')} onChange={(v) => update('footer.contact.phone', v)} />
        <SmartField label="אימייל" value={getValue('footer.contact.email')} onChange={(v) => update('footer.contact.email', v)} />
        <SmartField label="פקס"   value={getValue('footer.contact.fax')}   onChange={(v) => update('footer.contact.fax', v)} />
      </div>

      {/* Logos */}
      <div className="bg-white p-8 rounded-[32px] shadow-sm">
        <div className="flex items-center gap-3 mb-6">
          <div className="p-2 bg-[#FFF7ED] rounded-lg text-orange-500"><Globe size={20} /></div>
          <h3 className="font-black text-xl text-[#2D2D44]">לוגואים</h3>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <ImageField label="לוגו רעים"      value={getValue('footer.logos.reim')}     onChange={(v) => update('footer.logos.reim', v)} />
          <ImageField label="לוגו מתנסים"    value={getValue('footer.logos.matnasim')} onChange={(v) => update('footer.logos.matnasim', v)} />
        </div>
        <SmartField label="שם הארגון (מתחת ללוגו)" value={getValue('footer.organization')} onChange={(v) => update('footer.organization', v)} />
      </div>

      {/* Copyright */}
      <div className="bg-white p-8 rounded-[32px] shadow-sm">
        <h3 className="font-black text-xl text-[#2D2D44] mb-4">זכויות יוצרים</h3>
        <SmartField label="טקסט copyright" value={getValue('footer.copyright')} onChange={(v) => update('footer.copyright', v)} />
      </div>

      {/* Social links */}
      <div className="bg-white p-8 rounded-[32px] shadow-sm">
        <div className="flex items-center gap-3 mb-6">
          <div className="p-2 bg-[#F0F2FF] rounded-lg text-[#5E3BEE]"><Share2 size={20} /></div>
          <h3 className="font-black text-xl text-[#2D2D44]">רשתות חברתיות</h3>
        </div>
        <UniversalCardEditor
          title="לינקים לרשתות"
          items={getValue('footer.socialLinks')}
          onUpdate={(v) => update('footer.socialLinks', v)}
          newItemTemplate={{ platform: '', url: '#' }}
          icon={Share2}
        />
      </div>

      {/* Bottom links */}
      <div className="bg-white p-8 rounded-[32px] shadow-sm">
        <div className="flex items-center gap-3 mb-6">
          <div className="p-2 bg-[#F0FDF4] rounded-lg text-emerald-600"><Link size={20} /></div>
          <h3 className="font-black text-xl text-[#2D2D44]">לינקים תחתונים (מדיניות / תקנון)</h3>
        </div>
        <UniversalCardEditor
          title="לינקים"
          items={getValue('footer.bottomLinks')}
          onUpdate={(v) => update('footer.bottomLinks', v)}
          newItemTemplate={{ text: '', url: '#' }}
          icon={Link}
        />
      </div>

      {/* Navigation link groups */}
      <div className="bg-white p-8 rounded-[32px] shadow-sm">
        <h3 className="font-black text-xl text-[#2D2D44] mb-6">קבוצות קישורים בפוטר</h3>
        <p className="text-sm text-gray-500 mb-4">כל קבוצה מורכבת מכותרת ורשימת לינקים.</p>
        <UniversalCardEditor
          title="קבוצות קישורים"
          items={getValue('footer.links')}
          onUpdate={(v) => update('footer.links', v)}
          newItemTemplate={{ title: 'כותרת', items: [] }}
          icon={Globe}
        />
      </div>

    </div>
  );
};

export default FooterSection;
