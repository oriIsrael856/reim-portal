import React from 'react';

const StickyCard = ({ children, top, className = '', innerClassName = '' }) => {
    const innerDefault =
        'bg-white border-[#2D2D44] shadow-[0px_4px_0px_#2D2D44]';
    return (
        <div
            className={`sticky z-10 ${className}`}
            style={{ top: top }}
        >
            <div
                className={`flex min-h-[600px] flex-col rounded-[40px] border-2 p-10 transition-transform duration-500 md:p-20 ${innerClassName || innerDefault}`}
            >
                {children}
            </div>
        </div>
    );
};

export default StickyCard;