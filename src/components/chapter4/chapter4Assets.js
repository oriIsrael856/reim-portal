/** Static exports from Figma — served from `public/assets/chapter4/icons` */
export const CH4_ICONS_BASE = '/assets/chapter4/icons';

export const CH4_ASSETS = {
    featureFiles: `${CH4_ICONS_BASE}/feature-strip-files.svg`,
    featureCommittees: `${CH4_ICONS_BASE}/feature-strip-committees.svg`,
    featureNativBrand: `${CH4_ICONS_BASE}/feature-strip-nativ-brand.png`,
    featureCorner: `${CH4_ICONS_BASE}/feature-strip-corner-arrow.svg`,
    heroDecoA: `${CH4_ICONS_BASE}/hero-deco-star-a.svg`,
    heroDecoB: `${CH4_ICONS_BASE}/hero-deco-star-b.svg`,
    nativPrinciple: `${CH4_ICONS_BASE}/nativ-principle-bullet.svg`,
    nativMock: `${CH4_ICONS_BASE}/nativ-section-mock.png`,
    nativMockBadge: `${CH4_ICONS_BASE}/nativ-screenshot-corner.svg`,
    faqPlus: `${CH4_ICONS_BASE}/faq-row-plus.svg`,
    fileDownloadPill: `${CH4_ICONS_BASE}/file-card-download-pill.svg`,
    fileThumbPlaceholder: `${CH4_ICONS_BASE}/file-card-thumb-placeholder.png`,
};

export function featureStripIconSrc(featureId) {
    if (featureId === '01') return CH4_ASSETS.featureNativBrand;
    if (featureId === '02') return CH4_ASSETS.featureCommittees;
    return CH4_ASSETS.featureFiles;
}
