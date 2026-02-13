import React from 'react';
import { Menu as MenuIcon } from 'lucide-react';
import { UniversalCardEditor } from '../VisualBlock';

/**
 * Menu management section.
 * Controls the main navigation menu items.
 */
const MenuSection = ({ getValue, update }) => {
  return (
    <div className="space-y-6 animate-in fade-in">
      <UniversalCardEditor
        title="פריטי תפריט"
        items={getValue('menu')}
        onUpdate={(v) => update('menu', v)}
        newItemTemplate={{ title: 'חדש', page: 'home' }}
        icon={MenuIcon}
      />
    </div>
  );
};

export default MenuSection;

