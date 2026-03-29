/**
 * Chapter2DesktopHeroSection
 * Figma node 106:3191 — Section 1 (desktop hero, lg+ only)
 *
 * Desktop-only. All decorative and collage assets come from
 * /public/assets/chapter2/ — placed to match Figma exactly.
 * Chapter label text (tag, title) still comes from CMS via props.
 *
 * Collage frame: 1424 × 849 px (Figma).  All % positions:
 *   x% = Figma_px / 1424 × 100   |   y% = Figma_px / 849 × 100
 */

import React from 'react';

/* ── Static asset paths ───────────────────────────────────────────────────── */

const ASSETS = '/assets/chapter2';

const IMG = {
  /* Collage photos (desktop-specific sizing) */
  collage1: `${ASSETS}/hero-collage-d1.png`,
  collage2: `${ASSETS}/hero-collage-d2.png`,
  collage3: `${ASSETS}/hero-collage-d3.png`,
  collage4: `${ASSETS}/hero-collage-d4.png`,

  /* Decorative icons */
  starLime:  `${ASSETS}/hero-deco-star-lime.png`,
  starGreen: `${ASSETS}/hero-deco-star-green.png`,
  person:    `${ASSETS}/hero-deco-person-icon.png`,
  people:    `${ASSETS}/hero-deco-people-icon.png`,
};

/* ── Inline SVG: paper plane (Figma Vector 2 / node I111:2276;38:990) ────── */

const PlaneSvg = () => (
  <svg
    preserveAspectRatio="none"
    width="100%"
    height="100%"
    overflow="visible"
    viewBox="0 0 61.1283 64.5001"
    fill="none"
    aria-hidden
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      d="M22.2959 4.50003L3.19388 12.9405C1.98676 13.4738 1.61673 15.0079 2.45012 16.0312C8.14349 23.0218 27.2925 46.5339 40.2959 62.5M22.2959 4.50003C22.2959 4.50003 33.2664 39.8496 40.2959 62.5M22.2959 4.50003L32.7959 11.5M40.2959 62.5C46.748 43.3092 56.265 15.0022 59.0217 6.8028C59.4237 5.60695 58.6289 4.35041 57.3775 4.18998L40.2959 2.00003M40.2959 62.5C40.2959 38.8733 40.2959 2.00003 40.2959 2.00003M40.2959 62.5C37.367 42.5833 32.7959 11.5 32.7959 11.5M40.2959 2.00003L32.7959 11.5"
      stroke="#6546DE"
      strokeWidth="4"
      strokeLinejoin="round"
    />
  </svg>
);

/* ── Inline SVG: dashed plane trail (Figma Vector 3 / node I111:2276;38:1072) */

const PlaneTrailSvg = () => (
  <svg
    preserveAspectRatio="none"
    width="100%"
    height="100%"
    overflow="visible"
    viewBox="0 0 83.5002 95.0002"
    fill="none"
    aria-hidden
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      d="M1.00015 1.00015C20.5002 4.16682 59.5002 20.3002 59.5002 59.5002C59.5002 108.5 22.6008 93.1053 26.5002 78.5527C31.6053 59.5002 59.5002 65.5002 82.5002 94.0002"
      stroke="#001D26"
      strokeOpacity="0.24"
      strokeWidth="2"
      strokeLinecap="round"
      strokeDasharray="6 6"
    />
  </svg>
);

/* ── Hero title (Figma 114:2497, Typography/H2) ───────────────────────────── */

const FALLBACK_TITLE = 'מי משתתפות ומשתתפים ברעים';

function normalize(raw) {
  if (typeof raw !== 'string') return '';
  return raw.replace(/[\u200e\u200f\u202a-\u202e\ufeff]/g, '').replace(/\s+/g, ' ').trim();
}

function parseTitleParts(str) {
  if (!/^מי\s+משתתפות\s+ומשתתפים\s+ברעים$/u.test(str)) return null;
  return true; // structure is fixed; text is hardcoded in the render below
}

/**
 * CSS gradient that produces a solid yellow bar at the BOTTOM of the element.
 * Applied as `background` on the word span — backgrounds always render behind
 * text content, so no z-index or absolute positioning is needed.
 *
 * Produces:  transparent for the top portion  +  ch2-orange for the last 17px.
 */
const yellowBarBg =
  'linear-gradient(' +
  '  transparent calc(100% - var(--ch2-desktop-hero-yellow-bar-h)),' +
  '  var(--ch2-orange) calc(100% - var(--ch2-desktop-hero-yellow-bar-h))' +
  ')';

/**
 * Figma 114:2497 — Typography/H2, 60 px Rubik Bold, tracking -0.5 px.
 *
 * Uses inline paragraph text (matching Figma's <p> + <br> structure) rather
 * than flex rows.  RTL spaces are preserved naturally in inline text flow;
 * flex items collapse trailing spaces in RTL which causes "מי" to disappear.
 *
 * Each purple word is wrapped in `relative inline-block` so the absolute
 * YellowBar is correctly contained and paints behind the text.
 */
const DesktopHeroTitle = ({ title }) => {
  const str = normalize(title);
  const hasParts = parseTitleParts(str);
  const display = str || FALLBACK_TITLE;

  const titleStyle = {
    fontFamily: 'var(--font-rubik), Rubik, sans-serif',
    fontSize: 'var(--ch2-desktop-hero-title-size)',      /* 60px */
    letterSpacing: 'var(--ch2-desktop-hero-title-tracking)', /* -0.5px */
    lineHeight: 'var(--ch2-desktop-hero-title-lh)',      /* 1 */
  };

  if (!hasParts) {
    return (
      <p
        className="text-center font-bold whitespace-nowrap text-[var(--ch2-text-primary)]"
        style={titleStyle}
        dir="rtl"
      >
        {display}
      </p>
    );
  }

  return (
    /*
     * `whitespace-nowrap` prevents automatic wrapping; the <br> provides the
     * explicit break between line 1 and line 2. `text-center` centers both
     * lines. `dir="rtl"` makes Hebrew flow right-to-left naturally.
     */
    <p
      className="text-center font-bold whitespace-nowrap text-[var(--ch2-text-primary)]"
      style={titleStyle}
      dir="rtl"
    >
      {/* Line 1: מי (black) + space + משתתפות (purple, yellow bar behind) */}
      {'מי '}
      <span
        className="inline-block text-[var(--ch2-text-purple)]"
        style={{ background: yellowBarBg }}
      >
        {'משתתפות'}
      </span>

      <br aria-hidden="true" />

      {/* Line 2: ומשתתפים (purple, yellow bar behind) + space + ברעים (black) */}
      <span
        className="inline-block text-[var(--ch2-text-purple)]"
        style={{ background: yellowBarBg }}
      >
        {'ומשתתפים'}
      </span>
      {' ברעים'}
    </p>
  );
};

/* ── Photo card ──────────────────────────────────────────────────────────── */

const PhotoCard = ({ src, aspect, className = '' }) => (
  <div
    className={`relative overflow-hidden rounded-[length:var(--ch2-desktop-hero-photo-radius)] bg-neutral-200 shadow-[var(--ch2-desktop-hero-card-shadow)] ${aspect} ${className}`}
    style={{ border: 'var(--ch2-image-border)' }}
  >
    <img src={src} alt="" className="size-full object-cover" />
  </div>
);

/* ── Main export (Figma 106:3191) ────────────────────────────────────────── */

/**
 * @param {{ data: object, chapterNumber: string }} props
 *   data.tag    — CMS label e.g. "פרק שני"
 *   data.title  — CMS hero title (parsed for purple/black split)
 *   chapterNumber — badge digit, defaults to "02"
 */
export default function Chapter2DesktopHeroSection({ data, chapterNumber }) {
  const num = chapterNumber ?? '02';

  return (
    /* desktop-only: hidden on mobile/tablet, shown lg+ */
    <section
      className="relative hidden min-h-[length:var(--ch2-desktop-hero-min-h)] w-full overflow-hidden lg:block"
      style={{
        background: 'linear-gradient(180deg, #faf7ff 0%, var(--color-surface-lilac) 100%)',
      }}
      aria-label={data?.tag}
    >
      {/* ── Ambient glows (Figma ellipse2 + ellipse3) ── */}
      <div className="pointer-events-none absolute inset-0 overflow-hidden" aria-hidden>
        <div
          className="absolute -start-[min(219px,12vw)] -top-[min(264px,18vh)] size-[min(1184px,65vw)] rounded-full opacity-90"
          style={{
            background:
              'radial-gradient(circle closest-side, var(--ch2-glow-purple) 0%, transparent 72%)',
          }}
        />
        <div
          className="absolute -bottom-[min(120px,8vh)] -end-[min(80px,5vw)] size-[min(704px,38vw)] rounded-full opacity-80"
          style={{
            background:
              'radial-gradient(circle closest-side, var(--ch2-glow-orange) 0%, transparent 70%)',
          }}
        />
      </div>

      {/* ── Collage container (Figma 106:3194, 1424×849) ── */}
      {/*
       * dir="ltr": Figma coordinate origin is physical left regardless of
       * page RTL direction. start = left inside this wrapper.
       *
       * x% = Figma_px / 1424 × 100   |   y% = Figma_px / 849 × 100
       */}
      <div
        dir="ltr"
        className="pointer-events-none absolute start-1/2 top-[length:var(--ch2-desktop-hero-collage-top)] z-[1] aspect-[1424/849] w-[min(100%,var(--ch2-desktop-hero-collage-w))] max-w-[calc(100%-2rem)] -translate-x-1/2"
      >
        {/* Photo 1 — 400×500, -4 deg (Figma 111:1314) start-[-1.43%] top-[9.79%] */}
        <div className="absolute start-[-1.43%] top-[9.79%] flex w-[28.09%] items-start justify-center">
          <div className="w-full origin-center -rotate-[4deg]">
            <PhotoCard src={IMG.collage1} aspect="aspect-[400/500]" className="w-full" />
          </div>
        </div>

        {/* Photo 2 — 400×400, +4 deg (Figma 111:2270) end-[-0.87%] top-[9%] */}
        <div className="absolute end-[-0.87%] top-[9%] flex w-[28.09%] items-start justify-center">
          <div className="w-full max-w-[400px] origin-center rotate-[4deg]">
            <PhotoCard src={IMG.collage2} aspect="aspect-square" className="w-full" />
          </div>
        </div>

        {/* Photo 3 — 400×300, -4 deg (Figma 111:2274) end-[-4.91%] bottom-[9.51%] */}
        <div className="absolute end-[-4.91%] bottom-[9.51%] flex w-[28.09%] items-end justify-center">
          <div className="w-full origin-center -rotate-[4deg]">
            <PhotoCard src={IMG.collage3} aspect="aspect-[400/300]" className="w-full" />
          </div>
        </div>

        {/* Photo 4 — 240×240, +4 deg (Figma 111:2282) start-[17.77%] bottom-[9.52%] */}
        <div className="absolute start-[17.77%] bottom-[9.52%] flex w-[16.85%] items-end justify-center">
          <div className="w-full origin-center rotate-[4deg]">
            <PhotoCard src={IMG.collage4} aspect="aspect-square" className="w-full" />
          </div>
        </div>

        {/* "02" display numeral + wave overlay — Figma 106:3202 */}
        {/* start:0, top: 619.5/849 = 73% */}
        <div className="absolute start-0 top-[73%]" aria-hidden>
          <div className="relative inline-block whitespace-nowrap">
            <p
              className="leading-[1.28] tracking-[0.15px] text-[var(--ch2-text-purple)]"
              style={{
                fontFamily: 'var(--font-salsa), Salsa, cursive',
                fontSize: 'var(--ch2-desktop-hero-display-num-size)',
              }}
            >
              {num}
            </p>
            <svg
              className="pointer-events-none absolute left-[-2%] top-[14%] h-[72%] w-[104%] text-[var(--ch2-text-red)]"
              viewBox="0 0 100 44"
              fill="none"
              preserveAspectRatio="none"
              aria-hidden
            >
              <path d="M0 7 Q16 3 34 7 T68 7 T100 7" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" vectorEffect="non-scaling-stroke" />
              <path d="M0 22 Q20 17 38 22 T72 22 T100 22" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" vectorEffect="non-scaling-stroke" />
              <path d="M0 37 Q16 33 34 37 T70 37 T100 37" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" vectorEffect="non-scaling-stroke" />
            </svg>
          </div>
        </div>

        {/* ── Decorative icons (static Figma assets) ── */}

        {/* Star (large) — Figma 111:2287 (Star 1 / starLime) */}
        {/* left: calc(50%-330.88px) in 1424px → 26.77%, top: 107/849 = 12.6% */}
        <div className="absolute start-[26.77%] top-[12.6%] flex size-[86px] -translate-x-1/2 items-center justify-center">
          <div className="-scale-y-100 rotate-[-176deg]">
            <img src={IMG.starLime} alt="" className="size-20 object-contain" aria-hidden />
          </div>
        </div>

        {/* Star (small) — Figma 104:3014 (Star 2 / starGreen) */}
        {/* left: calc(50%+304.24px) in 1424px → 71.37%, top: 550/849 = 64.78% */}
        <div className="absolute start-[71.37%] top-[64.78%] flex size-[50px] -translate-x-1/2 items-center justify-center">
          <div className="-scale-y-100 rotate-[-166deg]">
            <img src={IMG.starGreen} alt="" className="size-[50px] object-contain" aria-hidden />
          </div>
        </div>

        {/* Person icon — Figma 114:2310 */}
        {/* right: 1193.62px in 1424px → left center ≈ 15.24%, top: 633.5/849 = 74.6% */}
        <div className="absolute start-[15.24%] top-[74.6%] flex size-[26px] items-center justify-center">
          <div className="-rotate-[174deg] -scale-y-100">
            <img src={IMG.person} alt="" className="size-6 object-contain" aria-hidden />
          </div>
        </div>

        {/* People icon with red-tint badge — Figma 114:2308 */}
        {/* left: 889/1424 = 62.43%, top: 84/849 = 9.9% */}
        <div
          className="absolute start-[62.43%] top-[9.9%] flex items-center justify-center rounded-[80px] p-3"
          style={{ background: 'rgba(196, 33, 59, 0.12)' }}
        >
          <img src={IMG.people} alt="" className="size-8 object-contain" aria-hidden />
        </div>

        {/* Plane + trail — Figma 111:2276 "Plane 2" */}
        {/* Hero position: left calc(50%+84.86px)/1424 → 55.96%, top 744/849 → 87.6% */}
        {/* Structure mirrors the Figma Elements component exactly.
            Container: 59 × 60.5 px (the plane's own frame).
            Trail uses percentage insets relative to that 59×60.5 frame:
              top=-207.44% left=-19.92% right=-85.66% bottom=113.92%
            This places the trail entirely ABOVE the plane.
            Outer transforms on the hero wrapper: -scale-y-100 rotate-[-166deg] */}
        <div
          className="absolute start-[55.96%] top-[87.6%] -translate-x-1/2"
          style={{ width: '59px', height: '60.5px', overflow: 'visible' }}
        >
          <div className="-scale-y-100 rotate-[-166deg] relative size-full">
            {/* Plane (Vector2) — fills container with small bleed */}
            <div className="absolute inset-[0_0.42%_0_-0.42%]">
              <div className="absolute inset-[-3.31%_-2.26%_-3.31%_-1.35%]">
                <PlaneSvg />
              </div>
            </div>
            {/* Trail (Vector3) — positioned above the plane via percentage insets */}
            <div
              className="absolute flex items-center justify-center"
              style={{ inset: '-207.44% -85.66% 113.92% -19.92%' }}
            >
              <div className="rotate-[-120deg] flex-none" style={{ width: '81.5px', height: '93px' }}>
                <div className="relative size-full">
                  <div className="absolute inset-[-1.08%_-1.23%]">
                    <PlaneTrailSvg />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* ── Chapter label + hero title (Figma 114:2495) ── */}
      {/* Centered, nudged up by --ch2-desktop-hero-text-nudge-y (-48px) */}
      <div className="pointer-events-none absolute inset-0 z-20 flex items-center justify-center">
        <div
          className="flex flex-col items-center gap-10"
          style={{ transform: 'translateY(var(--ch2-desktop-hero-text-nudge-y))' }}
        >
          {/* Chapter label pill — Figma 114:2496 */}
          <div className="relative flex flex-col items-center pt-6">
            {/* Badge circle — Figma I114:2496;111:1320 */}
            <div
              className="absolute inset-x-0 top-0 z-[2] flex -translate-y-1/2 justify-center"
              aria-hidden
            >
              <div
                className="flex size-8 items-center justify-center rounded-full text-white shadow-[var(--ch2-desktop-hero-card-shadow)]"
                style={{
                  border: 'var(--ch2-image-border)',
                  background: 'var(--ch2-olive)',
                  fontFamily: 'var(--font-salsa), Salsa, cursive',
                  fontSize: 'var(--ch2-desktop-hero-badge-num-size)',
                  lineHeight: '1.28',
                  letterSpacing: '0.15px',
                }}
              >
                {num}
              </div>
            </div>

            {/* Pill body — Figma I114:2496;111:1322 */}
            <div
              className="relative flex flex-col items-center justify-center rounded-[24px] px-6 pt-3 pb-4 shadow-[var(--ch2-desktop-hero-card-shadow)]"
              style={{ border: 'var(--ch2-image-border)', background: 'var(--ch2-lime)' }}
            >
              <span
                className="font-semibold leading-[1.28] tracking-[0.15px] text-[var(--ch2-text-primary)]"
                style={{
                  fontFamily: 'var(--font-rubik), Rubik, sans-serif',
                  fontSize: 'var(--ch2-desktop-hero-label-type-size)',
                }}
              >
                {data?.tag}
              </span>
            </div>
          </div>

          {/* Hero title — Figma 114:2497 */}
          <DesktopHeroTitle title={data?.title} />
        </div>
      </div>
    </section>
  );
}
