// src/components/common/StickyCardWrapper.jsx
import React from 'react';

const StickyCardWrapper = ({ children, topOffset, zIndex }) => {
    return (
        // הדיב החיצוני אחראי על המיקום הדביק (Sticky Positioning)
        <div 
            className="sticky" 
            style={{ top: topOffset, zIndex: zIndex }}
        >
            {/* הדיב הפנימי אחראי על העיצוב (רקע, גבול, צללית) */}
            <div className="bg-white rounded-[40px] border-2 border-[#2D2D44] p-10 md:p-20 shadow-[0px_4px_0px_#2D2D44] min-h-[600px] flex flex-col transition-all">
                {children}
            </div>
        </div>
    );
};

export default StickyCardWrapper;