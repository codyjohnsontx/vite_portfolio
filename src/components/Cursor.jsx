import { useEffect, useRef } from 'react';
import { gsap, prefersReducedMotion } from '../motion/motion';

/* Two-body cursor: a hard dot that tracks 1:1 and a soft ring that lags
   behind on a spring. The ring swells and picks up a label when it is over
   anything carrying data-cursor. */
export default function Cursor() {
  const dotRef = useRef(null);
  const ringRef = useRef(null);
  const labelRef = useRef(null);

  useEffect(() => {
    if (prefersReducedMotion()) return undefined;
    if (!window.matchMedia('(hover: hover) and (pointer: fine)').matches) return undefined;

    const dot = dotRef.current;
    const ring = ringRef.current;
    const label = labelRef.current;
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

    const setState = (state, text) => {
      ring.dataset.state = state || '';
      if (label) {
        label.textContent = text || '';
        gsap.to(label, { opacity: text ? 1 : 0, duration: 0.25 });
      }
      gsap.to(ring, {
        scale: text ? 2.7 : state === 'hover' ? 1.7 : 1,
        duration: 0.5,
        ease: 'expo.out',
      });
      gsap.to(dot, { scale: state ? 0 : 1, duration: 0.35, ease: 'expo.out' });
    };

    const onOver = (e) => {
      const target = e.target.closest?.('[data-cursor], a, button');
      if (!target) return;
      setState('hover', target.getAttribute?.('data-cursor') || '');
    };

    const onOut = (e) => {
      const target = e.target.closest?.('[data-cursor], a, button');
      if (!target) return;
      const next = e.relatedTarget?.closest?.('[data-cursor], a, button');
      if (next) return;
      setState('', '');
    };

    const onDown = () => gsap.to(ring, { scale: 0.75, duration: 0.2, ease: 'power2.out' });
    const onUp = () => gsap.to(ring, { scale: ring.dataset.state ? 1.7 : 1, duration: 0.35 });
    const onLeaveWindow = () => gsap.to([dot, ring], { opacity: 0, duration: 0.3 });
    const onEnterWindow = () => gsap.to([dot, ring], { opacity: 1, duration: 0.3 });

    window.addEventListener('pointermove', onMove, { passive: true });
    document.addEventListener('pointerover', onOver, true);
    document.addEventListener('pointerout', onOut, true);
    window.addEventListener('pointerdown', onDown, { passive: true });
    window.addEventListener('pointerup', onUp, { passive: true });
    document.addEventListener('mouseleave', onLeaveWindow);
    document.addEventListener('mouseenter', onEnterWindow);

    return () => {
      document.documentElement.classList.remove('has-custom-cursor');
      window.removeEventListener('pointermove', onMove);
      document.removeEventListener('pointerover', onOver, true);
      document.removeEventListener('pointerout', onOut, true);
      window.removeEventListener('pointerdown', onDown);
      window.removeEventListener('pointerup', onUp);
      document.removeEventListener('mouseleave', onLeaveWindow);
      document.removeEventListener('mouseenter', onEnterWindow);
      gsap.killTweensOf([dot, ring, label]);
    };
  }, []);

  return (
    <div className="cursor" aria-hidden="true">
      <div ref={ringRef} className="cursor__ring">
        <span ref={labelRef} className="cursor__label" />
      </div>
      <div ref={dotRef} className="cursor__dot" />
    </div>
  );
}
