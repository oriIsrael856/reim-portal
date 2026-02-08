import React from 'react';
import { Facebook, Instagram, Linkedin, Twitter } from 'lucide-react';

const Footer = ({ data }) => {
    return (
        <footer className="bg-[#F3F0FF] pt-16 pb-8 px-8 md:px-20 border-t border-[#5E3BEE]/5 mt-20">
            <div className="max-w-[1600px] mx-auto">
                
                {/* חלק עליון: לוגואים ופרטים */}
                <div className="flex flex-col md:flex-row justify-between items-start mb-16">
                    
                    {/* צד ימין: לוגואים וטקסט */}
                    <div className="text-right mb-10 md:mb-0">
                        <div className="flex items-center gap-4 mb-4 justify-end">
                            <img src="/Logo (1).png" alt="Reim" className="h-10 object-contain" />
                            <div className="h-8 w-[1px] bg-gray-300"></div>
                            <img src="/Matnasim.png" alt="Matnasim" className="h-10 object-contain grayscale opacity-60" />
                        </div>
                        <div className="text-[#2D2D44] text-sm space-y-1 font-medium">
                            <p>תוכנית רעים מבית החברה למתנ"סים</p>
                            <p>טלפון: {data.contact.phone}</p>
                            <p>פקס: {data.contact.fax}</p>
                            <p>מייל: <a href={`mailto:${data.contact.email}`} className="underline hover:text-[#5E3BEE]">{data.contact.email}</a></p>
                        </div>
                    </div>

                    {/* צד שמאל: עמודות לינקים */}
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

                {/* חלק תחתון: סושיאל וזכויות יוצרים */}
                <div className="flex flex-col-reverse md:flex-row justify-between items-center pt-8 border-t border-gray-200">
                    <div className="flex gap-4 mt-4 md:mt-0">
                        {[Facebook, Instagram, Linkedin, Twitter].map((Icon, i) => (
                            <a key={i} href="#" className="bg-[#EBE5FC] p-2 rounded-full text-[#5E3BEE] hover:bg-[#5E3BEE] hover:text-white transition-colors">
                                <Icon size={18} />
                            </a>
                        ))}
                    </div>
                    
                    <div className="flex gap-8 text-sm text-gray-500 font-medium">
                        <a href="#" className="hover:text-[#5E3BEE] underline">מדיניות פרטיות</a>
                        <a href="#" className="hover:text-[#5E3BEE] underline">תקנון אתר</a>
                        <span>© כל הזכויות שמורות לחברה למתנ"סים</span>
                    </div>
                </div>
            </div>
        </footer>
    );
};
export default Footer;