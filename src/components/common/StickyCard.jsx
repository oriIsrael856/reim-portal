import React from 'react';

const StickyCard = ({ children, top, className = "" }) => {
    return (
        <div 
            className={`sticky z-10 ${className}`} 
            style={{ top: top }}
        >
            <div className="bg-white rounded-[40px] border-2 border-[#2D2D44] p-10 md:p-20 shadow-[0px_4px_0px_#2D2D44] min-h-[600px] flex flex-col transition-transform duration-500">
                {children}
            </div>
        </div>
    );
};

export default StickyCard;