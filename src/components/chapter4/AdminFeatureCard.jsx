import React from 'react';
import { ArrowUpLeft } from 'lucide-react';
import { featureDesktopIconSrc } from './chapter4Assets';

/** Figma 120:6180 — desktop feature card icons */
function Chapter4DesktopCardIcon({ id, iconBoxStyle }) {
    const src = featureDesktopIconSrc(id);
    // Award (02) has inset 8.33% 20.83% per Figma; others use 12.5%
    const inset = id === '02' ? '8.33% 20.83%' : '12.5%';
    return (
        <div className={`relative overflow-clip ${iconBoxStyle ? '' : 'size-8'}`} style={iconBoxStyle}>
            <div className="absolute size-full" style={{ inset }}>
                <img alt="" className="absolute block max-w-none size-full" src={src} />
            </div>
        </div>
    );
}

const AdminFeatureCard = ({ id, title, desc, variant, onClick, ch4DesktopStyles }) => {
    const isCh4Desktop = variant === 'chapter4Desktop';

    if (isCh4Desktop) {
        const s = ch4DesktopStyles;
        return (
            /* Figma 120:6184/6185/6186 — scaled via chapter4ViewportRegistry + useChapter4DesktopStyles */
            <button
                type="button"
                dir="rtl"
                onClick={onClick}
                className="group relative z-0 flex w-full shrink-0 cursor-pointer flex-col items-end justify-between overflow-hidden rounded-[16px] border border-transparent bg-white text-right transition-all duration-300 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#FFB84C]"
                style={{ ...s?.adminFeatureCard, boxShadow: '0 4px 16px rgba(0,0,0,0.04)' }}
                onMouseEnter={e => {
                    e.currentTarget.style.background = '#FFF8EB';
                    e.currentTarget.style.boxShadow = '8px 12px 32px rgba(45,45,68,0.18), 0 4px 12px rgba(0,0,0,0.08)';
                    e.currentTarget.style.transform = 'translateY(-6px) scale(1.08)';
                    e.currentTarget.style.zIndex = '10';
                }}
                onMouseLeave={e => {
                    e.currentTarget.style.background = '';
                    e.currentTarget.style.boxShadow = '0 4px 16px rgba(0,0,0,0.04)';
                    e.currentTarget.style.transform = '';
                    e.currentTarget.style.zIndex = '';
                }}
            >
                {/* Arrow badge — ArrowUpLeft in orange square, fades in on hover (HomeCarousel pattern) */}
                <div
                    className="absolute left-3 top-3 flex size-8 items-center justify-center rounded-lg bg-[#FFB84C] opacity-0 transition-opacity duration-300 group-hover:opacity-100"
                    aria-hidden
                >
                    <ArrowUpLeft className="text-white" size={18} strokeWidth={2.5} />
                </div>

                {/* Chapter numeral — Figma I120:6184;120:6812 */}
                <p
                    className="min-w-0 w-full text-start font-['Salsa'] font-normal leading-[1.28] tracking-[0.15px] text-[#001d26] transition-colors duration-300 group-hover:text-[#FFD028]"
                    style={s?.adminFeatureNumeralFont}
                >
                    <span dir="ltr">{id}</span>
                </p>
                {/* Icon + text block — Figma I120:6184;120:6813 */}
                <div className="flex w-full shrink-0 flex-col items-end" style={s?.adminFeatureInnerGap}>
                    <div className="transition-transform duration-300 group-hover:scale-110">
                        <Chapter4DesktopCardIcon id={id} iconBoxStyle={s?.adminFeatureIcon} />
                    </div>
                    <div className="flex w-full flex-col items-end text-start text-[#001d26]" style={s?.adminFeatureTextStackGap}>
                        <p className="font-bold leading-[1.334] transition-colors duration-300 group-hover:text-[#FFD028]" style={s?.adminFeatureTitleFont}>
                            {title}
                        </p>
                        <p className="font-normal leading-[1.32] tracking-[0.15px]" style={s?.adminFeatureDescFont}>
                            {desc}
                        </p>
                    </div>
                </div>
            </button>
        );
    }

    return (
        <div className="group relative flex h-full flex-col items-center overflow-hidden rounded-[24px] border-2 border-transparent bg-white p-8 text-center shadow-sm transition-all hover:border-[#816AFE]/20 hover:shadow-md">
            <span className="absolute top-4 right-6 font-['Rubik'] text-2xl font-black text-[#2D2D44]/10">{id}</span>
            <div className="mt-2 flex flex-1 flex-col items-center justify-center gap-4">
                <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-[#F3F0FF] transition-transform group-hover:scale-110">
                    <Chapter4DesktopCardIcon id={id} />
                </div>
                <h3 className="text-2xl font-black text-[#2D2D44]">{title}</h3>
                <p className="max-w-[14rem] text-sm font-medium text-[#2D2D44]/60">{desc}</p>
            </div>
        </div>
    );
};

export default AdminFeatureCard;
