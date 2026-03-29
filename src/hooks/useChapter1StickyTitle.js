import { useEffect, useRef, useState } from 'react';

/** Viewport Y at which the sticky hero-title is released / re-acquired (desktop ≥1024px only). */
const UNSTICK_Y = 200;
const RESTICK_Y = 248;

/**
 * Tracks whether the Chapter 1 hero title should remain sticky.
 * Attaches scroll + resize listeners via rAF and cleans up on unmount.
 *
 * @param {unknown} dep - Value from the data tree that should retrigger the effect when it changes.
 * @returns {{ ref: React.RefObject, isSticky: boolean }}
 */
export function useChapter1StickyTitle(dep) {
    const ref = useRef(null);
    const [isSticky, setIsSticky] = useState(true);

    useEffect(() => {
        const el = ref.current;
        if (!el || typeof window === 'undefined') return;

        const mq = window.matchMedia('(min-width: 1024px)');
        let raf = 0;

        const tick = () => {
            raf = 0;
            if (!mq.matches) { setIsSticky(true); return; }
            const top = el.getBoundingClientRect().top;
            setIsSticky((prev) => {
                if (top <= UNSTICK_Y) return false;
                if (top >= RESTICK_Y) return true;
                return prev;
            });
        };

        const schedule = () => { if (!raf) raf = window.requestAnimationFrame(tick); };

        tick();
        window.addEventListener('scroll', schedule, { passive: true });
        window.addEventListener('resize', schedule);
        mq.addEventListener?.('change', schedule);

        return () => {
            window.removeEventListener('scroll', schedule);
            window.removeEventListener('resize', schedule);
            mq.removeEventListener?.('change', schedule);
            if (raf) window.cancelAnimationFrame(raf);
        };
    }, [dep]);

    return { ref, isSticky };
}
