import React from 'react';

const SplitStickyLayout = ({ stickyContent, children, className = "" }) => {
    return (
        // המיכל הראשי: דואג לרוחב, ריווחים והגדרת ה-Flex
        <div className={`w-full max-w-[1700px] mx-auto px-6 md:px-12 flex flex-col md:flex-row items-start gap-12 relative ${className}`}>
            
            {/* --- צד ימין (הדביק) --- */}
            {/* sticky top-32: מבטיח שהכותרת תישאר למעלה */}
            {/* h-fit: קריטי כדי שהסטיקי יעבוד ולא יימתח על כל הגובה */}
            <div className="w-full md:w-5/12 sticky top-32 z-40 text-right h-fit pb-10">
                {stickyContent}
            </div>

            {/* --- צד שמאל (הנגלל) --- */}
            {/* כאן ייכנסו ה-StickyCards */}
            <div className="w-full md:w-7/12 flex flex-col gap-24 pb-20">
                {children}
            </div>

        </div>
    );
};

export default SplitStickyLayout;