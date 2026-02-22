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
            {/* שלושה כרטיסים ריבועיים – עמודות שוות, כל כרטיס גובה = רוחב */}
            <div
                className="grid grid-cols-1 md:grid-cols-3 gap-[clamp(0.5rem, 1.5vw, 1rem)] w-full"
                style={{ minHeight: 'clamp(200px, 28vh, 320px)' }}
            >
                <div className="hidden md:block rounded-2xl overflow-hidden border-2 border-transparent relative shadow-sm group w-full aspect-square max-w-full">
                    <img src={rightImg} alt="" className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" />
                </div>

                <NewsletterCard
                    data={data}
                    className="w-full md:aspect-square md:max-w-full min-h-[clamp(220px,30vh,360px)] md:min-h-0"
                />

                <div className="hidden md:block rounded-2xl overflow-hidden border-2 border-transparent relative shadow-sm group w-full aspect-square max-w-full">
                    <img src={leftImg} alt="" className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" />
                </div>
            </div>

            {/* מובייל: גלריה */}
            <div className="md:hidden grid grid-cols-4 grid-rows-3 gap-2 mx-auto aspect-[4/3] w-[92%] max-w-[min(360px,90vw)]" style={{ marginTop: 'clamp(0.75rem, 3vw, 1.25rem)', maxHeight: 'min(280px, 60vh)' }}>
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