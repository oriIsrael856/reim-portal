import React from 'react';
import { HeartHandshake, UserCheck, FileText, File } from 'lucide-react';

const ICON_MAP = { HeartHandshake, UserCheck, FileText, File };

const AdminFeatureCard = ({ id, title, desc, iconName, variant }) => {
    const Icon = ICON_MAP[iconName] || File;
    const isCh4Desktop = variant === 'chapter4Desktop';
    return (
        <div
            className={`group relative flex flex-col items-center overflow-hidden rounded-[24px] border-2 border-transparent bg-white text-center shadow-sm transition-all hover:border-[#816AFE]/20 hover:shadow-md ${
                isCh4Desktop
                    ? 'h-full min-h-[clamp(260px,32vh,400px)] justify-between p-7 md:min-h-[clamp(280px,36vh,440px)] md:p-9'
                    : 'h-full p-8'
            }`}
        >
            <span className="absolute top-4 right-6 font-['Rubik'] text-2xl font-black text-[#2D2D44]/10">{id}</span>
            <div className="mt-2 flex flex-1 flex-col items-center justify-center gap-4">
                <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-[#F3F0FF] group-hover:scale-110 transition-transform md:h-[72px] md:w-[72px]">
                    <Icon className="h-8 w-8 text-[#816AFE] md:h-9 md:w-9" />
                </div>
                <h3 className="text-2xl font-black text-[#2D2D44] md:text-[26px]">{title}</h3>
                <p className="max-w-[14rem] text-sm font-medium text-[#2D2D44]/60 md:text-base">{desc}</p>
            </div>
        </div>
    );
};

export default AdminFeatureCard;
