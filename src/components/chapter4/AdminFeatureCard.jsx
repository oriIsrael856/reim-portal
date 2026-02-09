import React from 'react';
import * as Icons from 'lucide-react';

const AdminFeatureCard = ({ id, title, desc, iconName }) => {
    const Icon = Icons[iconName] || Icons.File;
    return (
        <div className="bg-white rounded-[24px] p-8 border-2 border-transparent hover:border-[#816AFE]/20 shadow-sm hover:shadow-md transition-all group flex flex-col items-center text-center relative overflow-hidden h-full">
            <span className="absolute top-4 right-6 text-2xl font-black text-[#2D2D44]/10 font-['Salsa']">{id}</span>
            <div className="w-16 h-16 bg-[#F3F0FF] rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                <Icon className="text-[#816AFE] w-8 h-8" />
            </div>
            <h3 className="text-2xl font-black text-[#2D2D44] mb-2">{title}</h3>
            <p className="text-[#2D2D44]/60 font-medium">{desc}</p>
        </div>
    );
};

export default AdminFeatureCard;