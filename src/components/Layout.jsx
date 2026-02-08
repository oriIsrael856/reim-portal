import React, { useState } from 'react';
import { Menu, X, Home, Lock, Facebook, Instagram } from 'lucide-react';
import { THEME } from '../theme';

export const AdminToolbar = ({ user, onReset, onLogout }) => {
    if (!user) return null;
    return (
        <div className="fixed top-0 left-0 right-0 h-12 bg-[#2D2D44] text-white flex items-center justify-between px-4 z-[9999]">
            <span className="text-xs font-mono text-green-400">ADMIN MODE</span>
            <div className="flex gap-4">
                <button onClick={onReset} className="bg-yellow-600 px-3 py-1 text-xs rounded font-bold hover:bg-yellow-500">⚠️ אפס נתונים</button>
                <button onClick={onLogout} className="bg-red-600 px-3 py-1 text-xs rounded font-bold hover:bg-red-500">יציאה</button>
            </div>
        </div>
    );
};

export const Sidebar = ({ user, navigateTo, openMenu }) => (
    <nav className={`fixed right-0 top-0 h-full w-20 bg-[#46319B] flex flex-col items-center py-8 z-50 rounded-l-[30px] shadow-2xl hidden md:flex ${user ? 'mt-12' : ''}`}>
        <div onClick={()=>navigateTo('home')} className="cursor-pointer text-white -rotate-90 mt-20 whitespace-nowrap font-bold text-xl tracking-wider hover:opacity-80 transition">תכנית רעים</div>
        <button onClick={openMenu} className="mt-auto bg-white p-3 rounded-full text-[#46319B] mb-8 hover:scale-110 transition"><Menu /></button>
    </nav>
);

export const MenuOverlay = ({ isOpen, closeMenu, menuItems, navigateTo }) => (
    <div className={`fixed inset-0 z-[60] bg-black/50 backdrop-blur-sm transition-opacity ${isOpen ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'}`} onClick={closeMenu}>
        <div className={`absolute top-0 right-0 h-full w-full max-w-[400px] bg-white p-12 transition-transform duration-300 ${isOpen ? 'translate-x-0' : 'translate-x-full'}`} onClick={e=>e.stopPropagation()}>
            <button onClick={closeMenu} className="absolute top-8 left-8"><X size={32}/></button>
            <div className="flex flex-col gap-6 mt-12">
                {menuItems.map((item, i) => (
                    <div key={i} onClick={()=>navigateTo(item.page)} className="text-2xl font-bold hover:text-[#46319B] cursor-pointer flex justify-between items-center border-b border-gray-100 pb-4">
                        <span>{item.title}</span>
                        <span className="text-[#EBE5FC] font-['Salsa'] text-4xl font-black">{item.id}</span>
                    </div>
                ))}
            </div>
        </div>
    </div>
);

export const Footer = () => (
    <footer className="bg-[#F3F0FF] py-12 px-8 border-t border-[#46319B]/10 mt-0 text-center md:pr-20">
        <div className="flex justify-center items-center gap-4 mb-4">
            <img src="/Logo (1).png" className="h-8 opacity-50 grayscale hover:grayscale-0 transition" alt="Logo"/>
        </div>
        <div className="flex justify-center gap-4 mb-4">
             <div className="bg-purple-100 p-2 rounded-full text-[#5E3BEE]"><Facebook size={20}/></div>
             <div className="bg-purple-100 p-2 rounded-full text-[#5E3BEE]"><Instagram size={20}/></div>
        </div>
        <p className="font-bold text-[#46319B]">© כל הזכויות שמורות לתוכנית רעים</p>
    </footer>
);