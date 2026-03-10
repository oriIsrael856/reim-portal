import React from 'react';
import NewsletterCard from '../common/NewsletterCard';

const HomeNewsletter = ({ data }) => {
    // הגנה אם אין דאטה
    if (!data) return null;

    const rightImg = data.images?.right || '/Image (2).png';
    const leftImg = data.images?.left || '/Image (4).png';
    const galleryImages = data.galleryImages?.length >= 4 ? data.galleryImages : [rightImg, leftImg, rightImg, leftImg];

    return (
        <div className="w-full mx-auto" style={{ paddingLeft: '4%', paddingRight: '4%', marginBottom: 'clamp(1rem, 3vw, 2rem)', marginTop: 'clamp(0.75rem, 3vw, 1.5rem)', maxWidth: 'min(1400px, 96vw)' }}>
            {/* שלושה כרטיסים – רווחים אחידים, כולם ישרים (מיושרים) */}
            <div
                className="grid grid-cols-1 md:grid-cols-[0.75fr_1fr_1.5fr] w-full items-stretch min-h-[clamp(190px,30vh,260px)] md:min-h-[clamp(220px,30vh,360px)]"
                style={{
                    gap: 'clamp(0.5rem, 1.5vw, 1.5rem)'
                }}
            >
                {/* תמונה ימנית – מלבנית גבוהה, ישרה */}
                <div className="hidden md:block rounded-2xl overflow-hidden border-2 border-transparent relative shadow-sm group w-full h-full min-h-0">
                    <img src={rightImg} alt="" className="w-full h-full block object-cover object-center transition-transform duration-700 group-hover:scale-105" />
                </div>

                <div className="w-[82%] max-w-[300px] mx-auto md:w-full md:max-w-full">
                    <NewsletterCard
                        data={data}
                        className="w-full min-h-[clamp(190px,75vh,300px)] md:min-h-0 flex flex-col"
                    />
                </div>

                {/* תמונה שמאלית – מלבנית רחבה, ישרה */}
                <div className="hidden md:block rounded-2xl overflow-hidden border-2 border-transparent relative shadow-sm group w-full h-full min-h-0">
                    <img src={leftImg} alt="" className="w-full h-full block object-cover object-center transition-transform duration-700 group-hover:scale-105" />
                </div>
            </div>

            {/* מובייל: גלריה – באותן פרופורציות: צרה יותר וקצת ארוכה יותר */}
            <div className="md:hidden grid grid-cols-4 grid-rows-3 gap-1.5 mx-auto aspect-[3/2] w-[82%] max-w-[min(300px,72vw)]" style={{ marginTop: 'clamp(0.5rem, 2vw, 1rem)', maxHeight: 'min(230px, 52vh)' }}>
                <div className="col-start-2 col-span-3 row-span-3 rounded-2xl overflow-hidden border-2 border-[#2D2D44]/10 bg-gray-100">
                    <img src={galleryImages[0]} alt="" className="w-full h-full object-cover" />
                </div>
                <div className="col-start-1 row-start-1 rounded-xl overflow-hidden bg-gray-100 border border-[#2D2D44]/10">
                    <img src={galleryImages[1]} alt="" className="w-full h-full object-cover aspect-square" />
                </div>
                <div className="col-start-1 row-start-2 rounded-xl overflow-hidden bg-gray-100 border border-[#2D2D44]/10">
                    <img src={galleryImages[2]} alt="" className="w-full h-full object-cover aspect-square" />
                </div>
                <div className="col-start-1 row-start-3 rounded-xl overflow-hidden bg-gray-100 border border-[#2D2D44]/10">
                    <img src={galleryImages[3]} alt="" className="w-full h-full object-cover aspect-square" />
                </div>
            </div>
        </div>
    );
};

export default HomeNewsletter;