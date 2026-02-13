import React from 'react';
import MenuSection from './sections/MenuSection';
import HomeSection from './sections/HomeSection';
import Chapter1Section from './sections/Chapter1Section';
import Chapter2Section from './sections/Chapter2Section';
import Chapter3Section from './sections/Chapter3Section';
import Chapter4Section from './sections/Chapter4Section';
import Chapter5Section from './sections/Chapter5Section';
import FooterSection from './sections/FooterSection';

/**
 * Decides which admin section to render based on the active tab.
 * All chapter/footer editors are now split into dedicated components.
 */
const AdminContentRouter = ({ activeTab, getValue, update }) => {
  switch (activeTab) {
    case 'menu':
      return <MenuSection getValue={getValue} update={update} />;
    case 'home':
      return <HomeSection getValue={getValue} update={update} />;
    case 'chapter1':
      return <Chapter1Section getValue={getValue} update={update} />;
    case 'chapter2':
      return <Chapter2Section getValue={getValue} update={update} />;
    case 'chapter3':
      return <Chapter3Section getValue={getValue} update={update} />;
    case 'chapter4':
      return <Chapter4Section getValue={getValue} update={update} />;
    case 'chapter5':
      return <Chapter5Section getValue={getValue} update={update} />;
    case 'footer':
      return <FooterSection getValue={getValue} update={update} />;
    default:
      return null;
  }
};

export default AdminContentRouter;

