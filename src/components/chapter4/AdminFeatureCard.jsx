import React from 'react';
import { ArrowUpLeft, Award, File, FileText, HeartHandshake, Inbox, UserCheck } from 'lucide-react';
import { CH4_ASSETS } from './chapter4Assets';

const ICON_MAP = { HeartHandshake, UserCheck, FileText, File };

/** Figma 120:6180 — desktop feature row: Award / Inbox match file icons; 01 uses Nativ brand image */
function Chapter4DesktopCardIcon({ id, iconName }) {
    if (id === '01') {
        return (
            <img
                src={CH4_ASSETS.featureNativBrand}
                alt=""
                className="size-8 object-contain object-center"
                width={32}
                height={32}
            />
        );
    }
    const MapIcon = iconName === 'UserCheck' ? Award : iconName === 'FileText' ? Inbox : ICON_MAP[iconName] || File;
    return <MapIcon className="size-8 shrink-0 text-[#001d26] transition-colors duration-200 group-hover:text-[#FFB23B]" strokeWidth={1.5} aria-hidden />;
}

const AdminFeatureCard = ({ id, title, desc, iconName, variant, onClick }) => {
    const Icon = ICON_MAP[iconName] || File;
    const isCh4Desktop = variant === 'chapter4Desktop';

    if (isCh4Desktop) {
        return (
            <button
                type="button"
                dir="rtl"
                onClick={onClick}
                className="group relative flex h-[280px] w-full max-w-[320px] shrink-0 cursor-pointer flex-col items-end justify-between overflow-hidden rounded-[16px] border-[1.5px] border-[rgba(101,70,222,0.16)] bg-white p-6 text-right transition-all duration-200 ease-out hover:-translate-y-1.5 hover:border-[#FFB23B] hover:bg-gradient-to-b hover:from-[rgba(255,178,59,0.22)] hover:to-[rgba(255,178,59,0.04)] hover:shadow-[2px_12px_32px_rgba(255,178,59,0.32)] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#FFB23B]"
            >
                <p className="min-w-0 w-full text-start font-['Salsa'] text-[40px] font-normal leading-[1.28] tracking-[0.15px] text-[#001d26] transition-colors duration-200 group-hover:text-[#FFB23B]">
                    <span dir="ltr">{id}</span>
                </p>
                <div className="flex w-full shrink-0 flex-col items-end gap-4">
                    <div className="flex size-8 items-center justify-center overflow-hidden transition-transform duration-200 group-hover:scale-110">
                        <Chapter4DesktopCardIcon id={id} iconName={iconName} />
                    </div>
                    <div className="flex w-full flex-col gap-1 text-start text-[#001d26]">
                        <p className="text-[24px] font-bold leading-[1.334] transition-colors duration-200 group-hover:text-[#FFB23B]">{title}</p>
                        <p className="text-[16px] font-normal leading-[1.32] tracking-[0.15px]">{desc}</p>
                    </div>
                </div>
                <div
                    className="absolute left-[-40px] top-[25.5px] flex h-9 items-center overflow-hidden rounded-[32px] bg-[#FFB23B] p-1.5 transition-all duration-200 group-hover:left-[10px]"
                    aria-hidden
                >
                    <ArrowUpLeft className="size-6 shrink-0 text-white" strokeWidth={2} />
                </div>
            </button>
        );
    }

    return (
        <div className="group relative flex h-full flex-col items-center overflow-hidden rounded-[24px] border-2 border-transparent bg-white p-8 text-center shadow-sm transition-all hover:border-[#816AFE]/20 hover:shadow-md">
            <span className="absolute top-4 right-6 font-['Rubik'] text-2xl font-black text-[#2D2D44]/10">{id}</span>
            <div className="mt-2 flex flex-1 flex-col items-center justify-center gap-4">
                <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-[#F3F0FF] transition-transform group-hover:scale-110">
                    <Icon className="h-8 w-8 text-[#816AFE]" />
                </div>
                <h3 className="text-2xl font-black text-[#2D2D44]">{title}</h3>
                <p className="max-w-[14rem] text-sm font-medium text-[#2D2D44]/60">{desc}</p>
            </div>
        </div>
    );
};

export default AdminFeatureCard;
