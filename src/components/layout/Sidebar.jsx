import React from 'react';
import { Menu, X } from 'lucide-react';

// הפס הצף בצד
export const Sidebar = ({ toggleMenu }) => {
    return (
        <button 
            onClick={toggleMenu} 
            className="fixed right-0 top-1/2 -translate-y-1/2 z-50 bg-white p-4 rounded-l-2xl shadow-xl hover:bg-gray-50 transition-transform hover:-translate-x-1 border border-gray-100 flex items-center justify-center w-16 h-24"
        >
            <Menu size={24} color="#2D2D44" />
        </button>
    );
};

// התפריט הנפתח
export const MenuOverlay = ({ isOpen, closeMenu, menuItems, navigateTo }) => {
    return (
        <div className={`fixed inset-0 z-[60] bg-black/50 backdrop-blur-sm transition-opacity duration-300 ${isOpen ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'}`} onClick={closeMenu}>
            <div 
                className={`absolute top-0 right-0 h-full w-full max-w-[400px] bg-white p-6 sm:p-10 pb-[env(safe-area-inset-bottom)] transition-transform duration-500 ease-out shadow-2xl overflow-y-auto ${isOpen ? 'translate-x-0' : 'translate-x-full'}`} 
                onClick={e => e.stopPropagation()}
            >
                <button onClick={closeMenu} className="absolute top-6 left-6 sm:top-8 sm:left-8 p-2 bg-gray-100 rounded-full hover:bg-gray-200 transition z-10">
                    <X size={24} color="#2D2D44" />
                </button>

                <div className="mt-16 sm:mt-20 flex flex-col gap-4">
                    {menuItems.map((item, index) => (
                        <div key={index} onClick={() => { navigateTo(item.page); closeMenu(); }} className="flex items-center justify-between p-4 border-b border-gray-100 hover:bg-[#F3F0FF] rounded-lg cursor-pointer group transition-all">
                            <span className="text-xl font-bold text-[#2D2D44] group-hover:text-[#5E3BEE]">{item.title}</span>
                            <span className="text-4xl font-black text-[#F3F0FF] group-hover:text-[#EBE5FC] font-['Rubik']">{item.id}</span>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};