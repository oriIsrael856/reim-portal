import React from 'react';
import NewsletterCard from '../common/NewsletterCard';

const HomeNewsletter = ({ data, photoGrid }) => {
    if (!data) return null;

    // Correct images come from Frame 8 (photo grid).
    // Keep NewsletterCard (middle) untouched; only swap right/left images.
    const rightImg = photoGrid?.right || '/assets/home/home-photo-grid-right-423e80.png';
    const leftImg = photoGrid?.left || '/assets/home/home-photo-grid-left.png';

    const sideFrameClass =
        'relative overflow-hidden rounded-2xl border-[1.5px] border-[#001D26] shadow-[2px_2px_0_0_#001D26] group';

    return (
        <div
            className="mx-auto w-full"
            style={{
                maxWidth: 'min(1400px, 96vw)',
                paddingInline: '4%',
                marginTop: 'clamp(0.75rem, 3vw, 1.5rem)',
                marginBottom: 'clamp(1rem, 3vw, 2rem)',
            }}
        >
            {/* Figma 191:9422 — column gap 16px: newsletter block + Frame 8 */}
            <div className="flex w-full flex-col" style={{ gap: '16px' }}>
                {/* מובייל: כמו פרק 5 — כרטיס ניוזלטר בלבד, רוחב מקסימלי אחיד */}
                <div className="mx-auto w-full max-w-[359px] md:mx-0 md:max-w-none">
                    <div className="md:hidden">
                        <NewsletterCard data={data} className="w-full" />
                    </div>

                    {/* דסקטופ: כרטיס מרכזי + תמונות בצדדים */}
                    <div
                        className="hidden min-h-[clamp(220px,30vh,360px)] w-full grid-cols-[0.75fr_1fr_1.5fr] items-stretch md:grid"
                        style={{ gap: 'clamp(0.5rem, 1.5vw, 1.5rem)' }}
                    >
                        <div className={`${sideFrameClass} h-full min-h-0 w-full`}>
                            <img
                                src={rightImg}
                                alt=""
                                className="block h-full w-full object-cover object-center transition-transform duration-700 group-hover:scale-105"
                            />
                        </div>

                        <div className="flex min-h-0 w-full items-stretch">
                            <NewsletterCard data={data} className="w-full min-h-0" />
                        </div>

                        <div className={`${sideFrameClass} h-full min-h-0 w-full`}>
                            <img
                                src={leftImg}
                                alt=""
                                className="block h-full w-full object-cover object-center transition-transform duration-700 group-hover:scale-105"
                            />
                        </div>
                    </div>
                </div>

            </div>
        </div>
    );
};

export default HomeNewsletter;
