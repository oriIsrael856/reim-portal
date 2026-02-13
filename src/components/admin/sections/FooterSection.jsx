import React from 'react';
import { SmartField } from '../VisualBlock';

/**
 * Footer contact section editor.
 */
const FooterSection = ({ getValue, update }) => {
  return (
    <div className="bg-white p-8 rounded-[32px] shadow-sm animate-in fade-in">
      <h3 className="font-black text-xl mb-4">יצירת קשר</h3>
      <SmartField
        label="טלפון"
        value={getValue('footer.contact.phone')}
        onChange={(v) => update('footer.contact.phone', v)}
      />
      <SmartField
        label="אימייל"
        value={getValue('footer.contact.email')}
        onChange={(v) => update('footer.contact.email', v)}
      />
      <SmartField
        label="פקס"
        value={getValue('footer.contact.fax')}
        onChange={(v) => update('footer.contact.fax', v)}
      />
    </div>
  );
};

export default FooterSection;

