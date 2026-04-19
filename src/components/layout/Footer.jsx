import React from 'react';
import { Facebook, Instagram, Linkedin, Twitter } from 'lucide-react';

// סדר מימין לשמאל (RTL): איקס, אינסטגרם, לינקדאין, פייסבוק
const SOCIAL_LINKS = [
    { Icon: Twitter, href: '#', label: 'איקס (טוויטר)' },
    { Icon: Instagram, href: '#', label: 'אינסטגרם' },
    { Icon: Linkedin, href: '#', label: 'לינקדאין' },
    { Icon: Facebook, href: 'https://www.facebook.com/reimprogram/', label: 'פייסבוק – תוכנית רעים' }
];

const FOOTER_NAV_LINKS = [
    { title: 'התוכנית', page: 'chapter1', items: [
        { text: 'מהי התוכנית?', anchor: 'ch1-program' },
        { text: 'מאיפה באנו?', anchor: 'ch1-history' },
        { text: 'לאן אנחנו הולכות?', anchor: 'ch1-future' },
    ]},
    { title: 'משתתפים ומשתתפות', page: 'chapter2', items: [
        { text: 'למי מיועדת התוכנית?', anchor: 'ch2-audience' },
        { text: 'מטרות התוכנית', anchor: 'ch2-goals' },
        { text: 'המגוון האוטיסטי', anchor: 'ch2-group01' },
        { text: 'לקויות למידה', anchor: 'ch2-group02' },
    ]},
    { title: 'תפקיד הרכז/ת', page: 'chapter3', items: [
        { text: 'הגדרת התפקיד', anchor: 'ch3-definition' },
        { text: 'צעדים ראשונים בתפקיד', anchor: 'ch3-onboarding' },
        { text: 'איך נראה מפגש?', anchor: 'ch3-session' },
    ]},
    { title: 'עבודה מנהלית', page: 'chapter4', items: [
        { text: 'מערכת נתיב', anchor: 'ch4-nativ-section' },
        { text: 'הועדות', anchor: 'ch4-committees-section' },
        { text: 'נהלים וטפסים', anchor: 'ch4-files-section' },
    ]},
    { title: 'כלים שימושיים', page: 'chapter5', items: [
        { text: 'שיווק וגיוס', anchor: 'ch5-marketing' },
        { text: 'הרכזייה', anchor: 'ch5-library' },
        { text: 'ניוזלטר', anchor: 'ch5-newsletter' },
    ]},
];

const Footer = ({ data, variant, suppressMobileCard, navigateTo }) => {
    const chapter2Mobile = variant === 'chapter2Mobile';
    const showDefaultMobileCard = chapter2Mobile || !suppressMobileCard;
    const contact = data?.contact ?? {};
    const bottomLinks = data?.bottomLinks ?? [
        { text: 'מדיניות פרטיות', url: '#' },
        { text: 'תקנון אתר', url: '#' }
    ];
    const copyright = data?.copyright ?? '© כל הזכויות שמורות לחברה למתנ"סים';
    const organization = data?.organization ?? 'תוכנית רעים מבית החברה למתנ"סים';
    const logos = data?.logos ?? { reim: '/Logo (1).png', matnasim: '/matnasimLogo.png' };

    return (
        <footer
            className={
                chapter2Mobile
                    ? 'ch2-mobile-footer mt-auto w-full shrink-0 border-0 bg-transparent px-3 pb-4 pt-4'
                    : 'bg-[#F3F0FF] pt-10 pb-6 px-6 border-t border-[#5E3BEE]/5 mt-12'
            }
            style={
                chapter2Mobile
                    ? undefined
                    : { paddingInline: 'clamp(24px, 3.13vw, 80px)' }
            }
        >
            <div className={chapter2Mobile ? 'mx-auto w-full max-w-none' : 'mx-auto'} style={chapter2Mobile ? undefined : { maxWidth: 'var(--home-desktop-footer-max-w)' }}>
                {/* מובייל: כרטיס — בפרק 2 בתוך העמודה הלבנה משתמשים ברקע סגול עדין (Figma Footer); בדף הבית הכרטיס בתוך `HomeMobileFigma191View` */}
                {showDefaultMobileCard ? (
                <div
                    className={
                        chapter2Mobile
                            ? 'md:hidden rounded-3xl border border-[#6546DE]/12 bg-[rgba(101,70,222,0.08)] p-5 text-center'
                            : 'md:hidden bg-white rounded-[32px] shadow-xl border border-[#2D2D44]/5 p-6 mb-8 text-center'
                    }
                >
                        <div className="flex flex-nowrap justify-center items-center gap-3 mb-4">
                        <img src={logos.reim || '/Logo (1).png'} alt="רֵעִים" className="h-5 shrink-0 object-contain" />
                        <div className="h-4 w-px bg-gray-200 shrink-0" />
                        <img src="/matnasimLogo.png" alt="החברה למתנ&quot;סים" className="h-5 shrink-0 object-contain" style={{ filter: 'invert(32%) sepia(89%) saturate(1582%) hue-rotate(231deg)' }} />
                    </div>
                    <p className="text-[#2D2D44] text-sm font-medium mb-6">{organization}</p>
                    <div className="text-[#2D2D44] text-sm space-y-1 mb-6">
                        <p>טלפון: {contact.phone}</p>
                        <p>פקס: {contact.fax}</p>
                        <p>מייל: <a href={`mailto:${contact.email}`} className="text-[#5E3BEE] underline">{contact.email}</a></p>
                    </div>
                    <div className="flex justify-center gap-3 mb-6">
                        {SOCIAL_LINKS.map((link, i) => {
                            const ItemIcon = link.Icon;
                            return (
                                <a key={i} href={link.href} target="_blank" rel="noopener noreferrer" aria-label={link.label} className="bg-[#EBE5FC] p-2.5 rounded-xl text-[#5E3BEE] hover:bg-[#5E3BEE] hover:text-white transition-colors">
                                    <ItemIcon size={20} />
                                </a>
                            );
                        })}
                    </div>
                    <div className="flex flex-wrap justify-center gap-2 text-sm text-[#2D2D44]/80 mb-4">
                        {bottomLinks.map((link, i) => (
                            <React.Fragment key={i}>
                                {i > 0 && <span className="text-gray-300">•</span>}
                                <a href={link.url} className="text-[#5E3BEE] underline hover:no-underline">{link.text}</a>
                            </React.Fragment>
                        ))}
                    </div>
                    <p className="text-xs text-[#2D2D44]/60">{copyright}</p>
                </div>
                ) : null}

                {/* דסקטופ: לוגואים ופרטים */}
                <div className="hidden md:flex flex-col md:flex-row justify-between items-start mb-16">
                    <div className="text-right mb-10 md:mb-0">
                        <div className="flex items-center gap-4 mb-4 justify-end">
                            <img src={logos.reim || '/Logo (1).png'} alt="רֵעִים" className="h-5 object-contain" />
                            <div className="h-4 w-[1px] bg-gray-300"></div>
                            <img src="/matnasimLogo.png" alt="החברה למתנ&quot;סים" className="h-5 object-contain" style={{ filter: 'invert(32%) sepia(89%) saturate(1582%) hue-rotate(231deg)' }} />
                        </div>
                        <div className="text-[#2D2D44] text-sm space-y-1 font-medium">
                            <p>{organization}</p>
                            <p>טלפון: {contact.phone}</p>
                            <p>פקס: {contact.fax}</p>
                            <p>מייל: <a href={`mailto:${contact.email}`} className="underline hover:text-[#5E3BEE]">{contact.email}</a></p>
                        </div>
                    </div>
                    <div className="flex flex-wrap gap-8 md:gap-12 text-right me-8">
                        {FOOTER_NAV_LINKS.map((col, i) => (
                            <div key={i} className="flex flex-col gap-3">
                                <h4
                                    className="font-bold text-[#2D2D44] text-base cursor-pointer hover:text-[#5E3BEE] transition-colors"
                                    onClick={() => navigateTo?.(col.page)}
                                >
                                    {col.title}
                                </h4>
                                <ul className="space-y-2 text-sm text-gray-500">
                                    {col.items.map((item, j) => (
                                        <li key={j}>
                                            <button
                                                type="button"
                                                className="text-start hover:text-[#5E3BEE] transition-colors"
                                                onClick={() => navigateTo?.(col.page, item.anchor)}
                                            >
                                                {item.text}
                                            </button>
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        ))}
                    </div>
                </div>

                {/* דסקטופ: סושיאל וזכויות */}
                <div className="hidden md:flex flex-col-reverse md:flex-row justify-between items-center pt-8 border-t border-gray-200">
                    <div className="flex gap-4 mt-4 md:mt-0">
                        {SOCIAL_LINKS.map((link, i) => {
                            const ItemIcon = link.Icon;
                            return (
                                <a key={i} href={link.href} target="_blank" rel="noopener noreferrer" aria-label={link.label} className="bg-[#EBE5FC] p-2 rounded-full text-[#5E3BEE] hover:bg-[#5E3BEE] hover:text-white transition-colors">
                                    <ItemIcon size={18} />
                                </a>
                            );
                        })}
                    </div>
                    <div className="flex gap-8 text-sm text-gray-500 font-medium">
                        {bottomLinks.map((link, i) => (
                            <a key={i} href={link.url} className="hover:text-[#5E3BEE] underline">{link.text}</a>
                        ))}
                        <span>{copyright}</span>
                    </div>
                </div>
            </div>
        </footer>
    );
};
export default Footer;