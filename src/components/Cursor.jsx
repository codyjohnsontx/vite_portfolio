import { useEffect, useRef } from 'react';
import { gsap, prefersReducedMotion } from '../motion/motion';

/* Two-body cursor: a hard dot that tracks the pointer closely and a soft
   ring that trails it on a spring. Both stay a fixed size at all times -
   over links the ring only brightens. Nothing scales, so the cursor never
   grows into the content it is pointing at. */
export default function Cursor() {
  const dotRef = useRef(null);
  const ringRef = useRef(null);

  useEffect(() => {
    if (prefersReducedMotion()) return undefined;
    if (!window.matchMedia('(hover: hover) and (pointer: fine)').matches) return undefined;

    const dot = dotRef.current;
    const ring = ringRef.current;
    if (!dot || !ring) return undefined;

    document.documentElement.classList.add('has-custom-cursor');

    const dotX = gsap.quickTo(dot, 'x', { duration: 0.12, ease: 'power3.out' });
    const dotY = gsap.quickTo(dot, 'y', { duration: 0.12, ease: 'power3.out' });
    const ringX = gsap.quickTo(ring, 'x', { duration: 0.55, ease: 'power3.out' });
    const ringY = gsap.quickTo(ring, 'y', { duration: 0.55, ease: 'power3.out' });

    let shown = false;

    const onMove = (e) => {
      if (!shown) {
        shown = true;
        gsap.to([dot, ring], { opacity: 1, duration: 0.4 });
      }
      dotX(e.clientX);
      dotY(e.clientY);
      ringX(e.clientX);
      ringY(e.clientY);
    };

    const onOver = (e) => {
      if (!e.target.closest?.('a, button, [role="button"], input, textarea, select')) return;
      ring.dataset.state = 'hover';
    };

    const onOut = (e) => {
      if (!e.target.closest?.('a, button, [role="button"], input, textarea, select')) return;
      if (e.relatedTarget?.closest?.('a, button, [role="button"], input, textarea, select')) return;
      delete ring.dataset.state;
    };

    const hide = () => gsap.to([dot, ring], { opacity: 0, duration: 0.3 });
    const show = () => gsap.to([dot, ring], { opacity: 1, duration: 0.3 });

    window.addEventListener('pointermove', onMove, { passive: true });
    document.addEventListener('pointerover', onOver, true);
    document.addEventListener('pointerout', onOut, true);
    document.addEventListener('mouseleave', hide);
    document.addEventListener('mouseenter', show);

    return () => {
      document.documentElement.classList.remove('has-custom-cursor');
      window.removeEventListener('pointermove', onMove);
      document.removeEventListener('pointerover', onOver, true);
      document.removeEventListener('pointerout', onOut, true);
      document.removeEventListener('mouseleave', hide);
      document.removeEventListener('mouseenter', show);
      gsap.killTweensOf([dot, ring]);
    };
  }, []);

  return (
    <div className="cursor" aria-hidden="true">
      <div ref={ringRef} className="cursor__ring" />
      <div ref={dotRef} className="cursor__dot" />
    </div>
  );
}
