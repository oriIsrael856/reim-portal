/** Static exports from Figma — served from `public/assets/chapter4/` */
export const CH4_BASE = '/assets/chapter4';
export const CH4_ICONS_BASE = `${CH4_BASE}/icons`;

export const CH4_ASSETS = {
    /* mobile feature-strip icons */
    featureFiles: `${CH4_ICONS_BASE}/feature-strip-files.svg`,
    featureCommittees: `${CH4_ICONS_BASE}/feature-strip-committees.svg`,
    featureNativBrand: `${CH4_ICONS_BASE}/feature-strip-nativ-brand.png`,
    featureCorner: `${CH4_ICONS_BASE}/feature-strip-corner-arrow.svg`,

    /* hero stars */
    heroDecoA: `${CH4_ICONS_BASE}/hero-deco-star-a.svg`,
    heroDecoB: `${CH4_ICONS_BASE}/hero-deco-star-b.svg`,

    /* desktop feature card icons (Figma 120:6184-6186) */
    featureDesktopNativ: `${CH4_BASE}/feature-desktop-nativ.png`,
    featureDesktopCommittees: `${CH4_BASE}/feature-desktop-committees.png`,
    featureDesktopFiles: `${CH4_BASE}/feature-desktop-files.png`,

    /* nativ section */
    nativPrinciple: `${CH4_ICONS_BASE}/nativ-principle-bullet.svg`,
    nativMock: `${CH4_ICONS_BASE}/nativ-section-mock.png`,
    nativMockBadge: `${CH4_ICONS_BASE}/nativ-screenshot-corner.svg`,
    nativHero: `${CH4_BASE}/nativ-hero.png`,
    nativHeroImage: `${CH4_BASE}/nativ-hero-image.png`,
    nativDiagonalArrow: `${CH4_BASE}/nativ-diagonal-arrow.svg`,
    nativArrowLeftOutline: `${CH4_BASE}/nativ-arrow-left-outline.svg`,

    /* desktop hero layers icon (Figma 120:5457) */
    outlineLayers: `${CH4_BASE}/outline-layers.svg`,

    /* files section */
    faqPlus: `${CH4_ICONS_BASE}/faq-row-plus.svg`,
    fileDownloadPill: `${CH4_ICONS_BASE}/file-card-download-pill.svg`,
    fileThumbPlaceholder: `${CH4_ICONS_BASE}/file-card-thumb-placeholder.png`,
    filesCardDefault: `${CH4_BASE}/files-card-default.png`,
    filesGlow: `${CH4_BASE}/files-glow.png`,
    filesArrowLeft: `${CH4_BASE}/files-arrow-left.svg`,
    filesArrowRight: `${CH4_BASE}/files-arrow-right.svg`,
};

export function featureStripIconSrc(featureId) {
    if (featureId === '01') return CH4_ASSETS.featureNativBrand;
    if (featureId === '02') return CH4_ASSETS.featureCommittees;
    return CH4_ASSETS.featureFiles;
}

export function featureDesktopIconSrc(featureId) {
    if (featureId === '01') return CH4_ASSETS.featureDesktopNativ;
    if (featureId === '02') return CH4_ASSETS.featureDesktopCommittees;
    return CH4_ASSETS.featureDesktopFiles;
}
