import React from 'react';
import { Check } from 'lucide-react';

/**
 * @param {{ title: string, text: string, ch5AudienceDesktop?: object | null }} props
 * When `ch5AudienceDesktop` is set (Chapter 5 desktop viewport bundle), uses Reim Ch5 tokens (#001D26, #BCE079).
 */
const CheckCard = ({ title, text, ch5AudienceDesktop = null }) => {
    if (ch5AudienceDesktop?.networkingAudienceCard) {
        const s = ch5AudienceDesktop;
        return (
            <article
                className="relative flex h-full min-h-0 flex-col items-stretch rounded-lg border-[1.5px] border-[#001D26] bg-[linear-gradient(180deg,rgba(188,224,121,0.08)_0%,#fff_100%)] shadow-[2px_2px_0_#001D26] transition-shadow hover:shadow-[3px_3px_0_#001D26]"
                style={s.networkingAudienceCard}
            >
                <span
                    aria-hidden
                    className="absolute -top-6 left-1/2 flex -translate-x-1/2 items-center justify-center rounded-lg border-[1.5px] border-[#001D26] bg-[#BCE079] shadow-[2px_2px_0_#001D26]"
                    style={{
                        width: s.networkingAudienceBadge.width,
                        height: s.networkingAudienceBadge.height,
                    }}
                >
                    <Check size={20} strokeWidth={3} className="text-white" aria-hidden />
                </span>
                <h3
                    className="text-center font-medium leading-[1.22] tracking-[0.009375em] text-[#001D26]"
                    style={s.networkingAudienceTitleFont}
                >
                    {title}
                </h3>
                <p
                    className="text-center font-normal leading-[1.32] tracking-[0.009375em] text-[#001D26]"
                    style={s.networkingAudienceBodyFont}
                >
                    {text}
                </p>
            </article>
        );
    }

    return (
        <div className="bg-white border-2 border-[#2D2D44] rounded-2xl p-6 relative pt-10 h-full shadow-sm hover:shadow-md transition-all group">
            <div className="absolute -top-5 left-1/2 -translate-x-1/2 bg-[#C5E080] border-2 border-[#2D2D44] w-10 h-10 flex items-center justify-center rounded-lg shadow-[2px_2px_0px_#2D2D44] group-hover:scale-110 transition-transform">
                <Check size={24} strokeWidth={4} className="text-[#2D2D44]" />
            </div>
            <div className="text-center">
                <h4 className="font-black text-lg mb-3 text-[#2D2D44] leading-tight">{title}</h4>
                <p className="text-sm text-[#2D2D44]/70 font-medium leading-relaxed">{text}</p>
            </div>
        </div>
    );
};

export default CheckCard;
