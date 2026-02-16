import React from 'react';
import { Facebook, Instagram, Linkedin, Twitter } from 'lucide-react';

const Footer = ({ data }) => {
    const contact = data?.contact ?? {};
    const bottomLinks = data?.bottomLinks ?? [
        { text: 'מדיניות פרטיות', url: '#' },
        { text: 'תקנון אתר', url: '#' }
    ];
    const copyright = data?.copyright ?? '© כל הזכויות שמורות לחברה למתנ"סים';
    const organization = data?.organization ?? 'תוכנית רעים מבית החברה למתנ"סים';

    return (
        <footer className="bg-[#F3F0FF] pt-16 pb-8 px-8 md:px-20 border-t border-[#5E3BEE]/5 mt-20">
            <div className="max-w-[1600px] mx-auto">
                
                {/* מובייל: כרטיס לבן מעוגל – לוגואים, פרטי קשר, סושיאל, לינקים, זכויות */}
                <div className="md:hidden bg-white rounded-[32px] shadow-xl border border-[#2D2D44]/5 p-6 mb-8 text-center">
                    <div className="flex flex-wrap justify-center items-center gap-4 mb-4">
                        <div className="flex items-center gap-2">
                            <img src="/Logo (1).png" alt="רֵעִים" className="h-10 object-contain" />
                        </div>
                        <div className="h-8 w-px bg-gray-200 hidden sm:block" />
                        <div className="flex items-center justify-center">
                            <img src="/matnasimLogo.png" alt="החברה למתנ&quot;סים" className="h-10 object-contain" style={{ filter: 'invert(32%) sepia(89%) saturate(1582%) hue-rotate(231deg)' }} />
                        </div>
                    </div>
                    <p className="text-[#2D2D44] text-sm font-medium mb-6">{organization}</p>
                    <div className="text-[#2D2D44] text-sm space-y-1 mb-6">
                        <p>טלפון: {contact.phone}</p>
                        <p>פקס: {contact.fax}</p>
                        <p>מייל: <a href={`mailto:${contact.email}`} className="text-[#5E3BEE] underline">{contact.email}</a></p>
                    </div>
                    <div className="flex justify-center gap-3 mb-6">
                        {[Facebook, Instagram, Linkedin, Twitter].map((Icon, i) => (
                            <a key={i} href="#" className="bg-[#EBE5FC] p-2.5 rounded-xl text-[#5E3BEE] hover:bg-[#5E3BEE] hover:text-white transition-colors">
                                <Icon size={20} />
                            </a>
                        ))}
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

                {/* דסקטופ: לוגואים ופרטים */}
                <div className="hidden md:flex flex-col md:flex-row justify-between items-start mb-16">
                    <div className="text-right mb-10 md:mb-0">
                        <div className="flex items-center gap-4 mb-4 justify-end">
                            <img src="/Logo (1).png" alt="רֵעִים" className="h-10 object-contain" />
                            <div className="h-8 w-[1px] bg-gray-300"></div>
                            <img src="/matnasimLogo.png" alt="החברה למתנ&quot;סים" className="h-10 object-contain" style={{ filter: 'invert(32%) sepia(89%) saturate(1582%) hue-rotate(231deg)' }} />
                        </div>
                        <div className="text-[#2D2D44] text-sm space-y-1 font-medium">
                            <p>{organization}</p>
                            <p>טלפון: {contact.phone}</p>
                            <p>פקס: {contact.fax}</p>
                            <p>מייל: <a href={`mailto:${contact.email}`} className="underline hover:text-[#5E3BEE]">{contact.email}</a></p>
                        </div>
                    </div>
                    <div className="flex flex-wrap gap-16 md:gap-24 text-right">
                        {[1, 2, 3, 4].map((col) => (
                            <div key={col} className="flex flex-col gap-3">
                                <h4 className="font-bold text-[#2D2D44] text-base">כותרת</h4>
                                <ul className="space-y-2 text-sm text-gray-500">
                                    <li><a href="#" className="hover:text-[#5E3BEE]">לינק 1</a></li>
                                    <li><a href="#" className="hover:text-[#5E3BEE]">לינק 1</a></li>
                                    <li><a href="#" className="hover:text-[#5E3BEE]">לינק 1</a></li>
                                    <li><a href="#" className="hover:text-[#5E3BEE]">לינק 1</a></li>
                                </ul>
                            </div>
                        ))}
                    </div>
                </div>

                {/* דסקטופ: סושיאל וזכויות */}
                <div className="hidden md:flex flex-col-reverse md:flex-row justify-between items-center pt-8 border-t border-gray-200">
                    <div className="flex gap-4 mt-4 md:mt-0">
                        {[Facebook, Instagram, Linkedin, Twitter].map((Icon, i) => (
                            <a key={i} href="#" className="bg-[#EBE5FC] p-2 rounded-full text-[#5E3BEE] hover:bg-[#5E3BEE] hover:text-white transition-colors">
                                <Icon size={18} />
                            </a>
                        ))}
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