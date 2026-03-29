import React from 'react';
import { Send } from 'lucide-react';
import ChapterDigitSvg from '../common/ChapterDigitSvg';

/**
 * Figma — פריים ראשון דסקטופ פרק 1: קולאז' משמאל, "01" + גלים אדומים, מטוס/כוכב דקורטיביים.
 * מיכל חיצוני קובע רוחב (עמודה שמאלית ב־ltr).
 */
export default function Chapter1DesktopCollage({ hero }) {
    if (!hero?.image1) return null;
    const W = 852;
    const H = 616;

    return (
        <div className="relative mx-auto w-full max-w-[640px] overflow-visible lg:mx-0 lg:max-w-none">
            <div className="relative w-full" style={{ aspectRatio: `${W} / ${H}` }}>
                <div className="absolute inset-0">
                    <div
                        className="absolute overflow-hidden rounded-[24px] border-[1.5px] border-[#001D26] shadow-[2px_2px_0_#001D26]"
                        style={{
                            left: 0,
                            top: 0,
                            width: `${(684 / W) * 100}%`,
                            height: `${(429 / H) * 100}%`,
                        }}
                    >
                        <img src={hero.image1} alt="" className="h-full w-full object-cover" decoding="async" />
                    </div>
                    <div
                        className="absolute overflow-hidden rounded-[24px] border-[1.5px] border-[#001D26] shadow-[2px_2px_0_#001D26]"
                        style={{
                            left: `${(480 / W) * 100}%`,
                            top: `${(164 / H) * 100}%`,
                            width: `${(372.09 / W) * 100}%`,
                            height: `${(452.19 / H) * 100}%`,
                        }}
                    >
                        <img src={hero.image2} alt="" className="h-full w-full object-cover" decoding="async" />
                    </div>

                    {/* מספר פרק */}
                    <ChapterDigitSvg
                        digits="01"
                        className="absolute z-[2]"
                        style={{
                            left: 0,
                            bottom: `${(24 / H) * 100}%`,
                            transform: 'translateY(10%)',
                            width: 'clamp(90px,8vw,140px)',
                        }}
                    />
                </div>

                {/* דקורציה: מטוס נייר + נקודות (כמו אב טיפוס Figma) */}
                <div
                    className="pointer-events-none absolute right-[2%] top-[8%] z-[3] flex items-center gap-0.5 text-[#816AFE]"
                    aria-hidden
                >
                    <svg className="h-9 w-9 opacity-75" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeDasharray="4 2">
                        <path d="M5 19 L19 5 M19 5 L19 12 M19 5 L12 5" />
                    </svg>
                    <Send className="h-5 w-5 rotate-45" strokeWidth={2.5} />
                </div>
                <div
                    className="pointer-events-none absolute left-[4%] top-[18%] z-[3] h-2 w-2 rounded-full bg-[#FF5C5C]"
                    aria-hidden
                />
                <div
                    className="pointer-events-none absolute right-[28%] top-[4%] z-[3] h-2 w-2 rounded-full bg-[#7BC96F]"
                    aria-hidden
                />
            </div>
        </div>
    );
}
