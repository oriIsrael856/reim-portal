import React from 'react';

const StickyCard = ({
    children,
    top,
    className = '',
    innerClassName = '',
    programCard = false,
    programExpandToContent = false,
}) => {
    const innerDefault =
        'bg-white border-[#2D2D44] shadow-[0px_4px_0px_#2D2D44]';
    const standardInnerBase =
        'flex min-h-[600px] flex-col rounded-[40px] border-2 p-10 transition-transform duration-500 md:p-20';
    const programInnerFixed =
        'flex h-[600px] min-h-0 shrink-0 flex-col gap-[14px] rounded-[24px] border-[1.5px] border-[#001D26] pt-10 pb-10 ps-[60px] pe-[80px] text-start shadow-[2px_2px_0_#001D26] transition-transform duration-500 [background:color-mix(in_srgb,#6546DE_4%,white)]';
    const programInnerNatural =
        'flex min-h-[600px] h-auto shrink-0 flex-col gap-[14px] rounded-[24px] border-[1.5px] border-[#001D26] pt-10 pb-10 ps-[60px] pe-[80px] text-start shadow-[2px_2px_0_#001D26] transition-transform duration-500 [background:color-mix(in_srgb,#6546DE_4%,white)]';

    const programInnerBase = programExpandToContent ? programInnerNatural : programInnerFixed;
    const innerBase = programCard ? programInnerBase : standardInnerBase;
    const innerAccent = programCard ? innerClassName : innerClassName || innerDefault;

    return (
        <div
            className={`sticky z-10 ${className}`}
            style={{ top: top }}
        >
            <div className={`${innerBase} ${innerAccent}`.trim()}>
                {children}
            </div>
        </div>
    );
};

export default StickyCard;
