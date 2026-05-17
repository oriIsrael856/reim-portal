import React from 'react';

function isAppInternalPageKey(page) {
    return typeof page === 'string' && /^(home|admin|chapter[1-5])$/.test(page);
}

const ICONS = {
    purple: '/assets/chapter3/resp-list-icon-arrow.svg',
    learning: '/assets/chapter3/resp-list-icon-arrow-learning.svg',
    admin: '/assets/chapter3/resp-list-icon-arrow-admin.svg',
};

function variantFromCard(card) {
    const tc = card.titleColor || '';
    if (tc.includes('FFB84C') || (card.title && card.title.includes('למידה'))) return 'learning';
    if (tc.includes('EF4444') || tc.includes('C4213B') || (card.title && card.title.includes('מנהלית'))) return 'admin';
    return 'purple';
}

export default function Page3ResponsibilityCard({ card, navigateTo }) {
    if (!card?.items?.length) return null;
    const v = variantFromCard(card);
    const iconSrc = ICONS[v] ?? ICONS.purple;

    const surfaceClass =
        v === 'learning' ? 'ch3-respCard--learning' : v === 'admin' ? 'ch3-respCard--admin' : 'ch3-respCard--purple';
    const titleClass =
        v === 'learning'
            ? 'ch3-respCard__title ch3-respCard__title--learning'
            : v === 'admin'
              ? 'ch3-respCard__title ch3-respCard__title--admin'
              : 'ch3-respCard__title ch3-respCard__title--purple';

    const inner = (
        <>
            <h2 className={titleClass}>{card.title}</h2>
            <ul className="ch3-respCard__list">
                {card.items.map((item, idx) => (
                    <li key={idx} className="ch3-respCard__row">
                        {/* Figma 253:8660: icon first in DOM = physical right in RTL row */}
                        <img src={iconSrc} alt="" className="ch3-respCard__rowIcon" width={32} height={24} decoding="async" />
                        <span className="ch3-respCard__text">{item}</span>
                    </li>
                ))}
            </ul>
        </>
    );

    return (
        <article className={`ch3-respCard ${surfaceClass}`}>
            {v === 'admin' && card.action?.text ? (
                <>
                    <div className="ch3-respCard__body">{inner}</div>
                    <div className="ch3-respCard__cta">
                        {isAppInternalPageKey(card.action.link) ? (
                            <button
                                type="button"
                                className="ch3-respCard__btn"
                                onClick={() => navigateTo?.(card.action.link)}
                            >
                                {card.action.text}
                            </button>
                        ) : (
                            <a href={card.action.link || '#'} className="ch3-respCard__btn">
                                {card.action.text}
                            </a>
                        )}
                    </div>
                </>
            ) : (
                inner
            )}
        </article>
    );
}
