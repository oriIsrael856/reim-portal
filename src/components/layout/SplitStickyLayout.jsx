import React from 'react';

/**
 * Two-column sticky layout: sticky sidebar (first DOM child = physical right in RTL)
 * and a scrollable content column (second DOM child = physical left in RTL).
 *
 * All potentially-conflicting classes (padding, max-width, gap, column widths)
 * live in props with defaults — never hardcoded in the template — so callers
 * can override without Tailwind class-conflict bugs.
 */
const SplitStickyLayout = ({
    stickyContent,
    children,
    className = "max-w-[1700px] mx-auto px-6 md:px-12 gap-12",
    classNameStyle,
    sidebarClassName = "w-full md:w-5/12",
    sidebarStyle,
    contentClassName = "w-full md:w-7/12 flex flex-col gap-24 pb-20",
    contentStyle,
}) => {
    return (
        <div className={`w-full flex flex-col md:flex-row items-start relative ${className}`} style={classNameStyle}>

            <div className={`sticky top-32 z-40 text-right h-fit pb-10 ${sidebarClassName}`} style={sidebarStyle}>
                {stickyContent}
            </div>

            <div className={contentClassName} style={contentStyle}>
                {children}
            </div>

        </div>
    );
};

export default SplitStickyLayout;
