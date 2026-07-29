import { useEffect, useRef } from 'react';
import { gsap, prefersReducedMotion, splitChars, splitWords } from './motion';

/* Masked rise for a heading, split to words or chars.
   `trigger: false` fires immediately (hero copy above the fold). */
export function useKineticText({
  mode = 'words',
  delay = 0,
  stagger = 0.045,
  duration = 1.05,
  trigger = true,
  y = '110%',
  rotate = 0,
} = {}) {
  const ref = useRef(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return undefined;

    if (prefersReducedMotion()) {
      gsap.set(el, { opacity: 1 });
      return undefined;
    }

    // Reveal before the guard: text with nothing to split still has to end
    // up visible, since the element ships at opacity 0.
    gsap.set(el, { opacity: 1 });

    const parts = mode === 'chars' ? splitChars(el) : splitWords(el);
    if (!parts.length) return undefined;

    const ctx = gsap.context(() => {
      gsap.fromTo(
        parts,
        { yPercent: parseFloat(y), rotate },
        {
          yPercent: 0,
          rotate: 0,
          duration,
          delay,
          ease: 'expo.out',
          stagger,
          ...(trigger
            ? { scrollTrigger: { trigger: el, start: 'top 88%', once: true } }
            : {}),
        },
      );
    }, el);

    return () => ctx.revert();
  }, [mode, delay, stagger, duration, trigger, y, rotate]);

  return ref;
}

/* Generic scroll-in for blocks: fade + short rise, once. */
export function useReveal({ delay = 0, y = 26, duration = 1, start = 'top 86%' } = {}) {
  const ref = useRef(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return undefined;

    if (prefersReducedMotion()) {
      gsap.set(el, { opacity: 1, y: 0 });
      return undefined;
    }

    const ctx = gsap.context(() => {
      gsap.fromTo(
        el,
        { opacity: 0, y },
        {
          opacity: 1,
          y: 0,
          duration,
          delay,
          ease: 'expo.out',
          scrollTrigger: { trigger: el, start, once: true },
        },
      );
    }, el);

    return () => ctx.revert();
  }, [delay, y, duration, start]);

  return ref;
}

/* Magnetic pull toward the cursor with spring return. Applied to pills and
   buttons; the element also reports itself to the custom cursor. */
export function useMagnetic({ strength = 0.32, radius = 90 } = {}) {
  const ref = useRef(null);

  useEffect(() => {
    const el = ref.current;
    if (!el || prefersReducedMotion()) return undefined;
    if (!window.matchMedia('(hover: hover)').matches) return undefined;

    const xTo = gsap.quickTo(el, 'x', { duration: 0.5, ease: 'elastic.out(1, 0.45)' });
    const yTo = gsap.quickTo(el, 'y', { duration: 0.5, ease: 'elastic.out(1, 0.45)' });

    const onMove = (e) => {
      const r = el.getBoundingClientRect();
      const cx = r.left + r.width / 2;
      const cy = r.top + r.height / 2;
      const dx = e.clientX - cx;
      const dy = e.clientY - cy;
      if (Math.hypot(dx, dy) > Math.max(r.width, r.height) / 2 + radius) {
        xTo(0);
        yTo(0);
        return;
      }
      xTo(dx * strength);
      yTo(dy * strength);
    };
    const onLeave = () => {
      xTo(0);
      yTo(0);
    };

    window.addEventListener('pointermove', onMove, { passive: true });
    window.addEventListener('pointerdown', onLeave, { passive: true });

    return () => {
      window.removeEventListener('pointermove', onMove);
      window.removeEventListener('pointerdown', onLeave);
      gsap.killTweensOf(el);
      gsap.set(el, { x: 0, y: 0 });
    };
  }, [strength, radius]);

  return ref;
}

/* Depth parallax driven by scroll progress across the element. */
export function useParallax({ distance = 90, scale = 1 } = {}) {
  const ref = useRef(null);

  useEffect(() => {
    const el = ref.current;
    if (!el || prefersReducedMotion()) return undefined;

    const ctx = gsap.context(() => {
      gsap.fromTo(
        el,
        { yPercent: -distance / 20, scale },
        {
          yPercent: distance / 20,
          ease: 'none',
          scrollTrigger: {
            trigger: el.parentElement || el,
            start: 'top bottom',
            end: 'bottom top',
            scrub: true,
          },
        },
      );
    }, el);

    return () => ctx.revert();
  }, [distance, scale]);

  return ref;
}
