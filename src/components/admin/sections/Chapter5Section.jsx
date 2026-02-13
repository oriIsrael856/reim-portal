import React from 'react';
import { ClipboardList, Smile } from 'lucide-react';
import { SmartField, UniversalCardEditor } from '../VisualBlock';

/**
 * Chapter 5 – ״כלים מעשיים״ section editor.
 */
const Chapter5Section = ({ getValue, update }) => {
  return (
    <div className="space-y-6 animate-in fade-in">
      <div className="bg-white p-8 rounded-[32px] shadow-sm">
        <SmartField
          label="טקסט שיווק"
          value={getValue('chapter5.marketing.text')}
          onChange={(v) => update('chapter5.marketing.text', v)}
        />
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

