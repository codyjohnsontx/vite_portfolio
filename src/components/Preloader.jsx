import PropTypes from 'prop-types';
import { useEffect, useRef, useState } from 'react';
import { gsap, prefersReducedMotion, startScroll, stopScroll } from '../motion/motion';

const WORDMARK = 'CODY JOHNSON';

/* Counts real font + document readiness rather than faking a timer, then
   wipes away on a clip-path curtain. Hands control back through onDone so
   the hero only starts its own timeline once the curtain is clear. */
export default function Preloader({ onDone }) {
  const rootRef = useRef(null);
  const countRef = useRef(null);
  const barRef = useRef(null);
  const [gone, setGone] = useState(false);

  useEffect(() => {
    const root = rootRef.current;
    if (!root) return undefined;

    if (prefersReducedMotion()) {
      setGone(true);
      onDone?.();
      return undefined;
    }

    stopScroll();

    const state = { value: 0 };
    let settled = false;

    const paint = () => {
      const v = Math.round(state.value);
      if (countRef.current) countRef.current.textContent = String(v).padStart(3, '0');
      if (barRef.current) barRef.current.style.transform = `scaleX(${v / 100})`;
    };

    const done = () => {
      setGone(true);
      startScroll();
      onDone?.();
    };

    /* Declared outside the gsap.context so the plain-setTimeout ceiling
       below can reach it. */
    const finish = () => {
      if (settled) return;
      settled = true;

      // Background tabs have requestAnimationFrame throttled to zero and
      // every GSAP tween is ticker-driven, so an animated exit would leave
      // the curtain up until the user came back. Snap it away instead.
      if (document.hidden) {
        done();
        return;
      }

      gsap.to(state, {
        value: 100,
        duration: 0.5,
        ease: 'power2.inOut',
        onUpdate: paint,
        onComplete() {
          gsap
            .timeline({ onComplete: done })
            .to('.preloader__char', {
              yPercent: -120,
              duration: 0.7,
              ease: 'expo.in',
              stagger: 0.018,
            })
            .to('.preloader__meta', { opacity: 0, duration: 0.35 }, '<')
            .to(
              root,
              { clipPath: 'inset(0% 0% 100% 0%)', duration: 1.05, ease: 'expo.inOut' },
              '-=0.25',
            );
        },
      });
    };

    const ready = Promise.all([
      document.fonts?.ready ?? Promise.resolve(),
      new Promise((res) => {
        if (document.readyState === 'complete') res();
        else window.addEventListener('load', res, { once: true });
      }),
    ]);

    const ctx = gsap.context(() => {
      gsap
        .timeline()
        .to(state, { value: 90, duration: 1.5, ease: 'power2.out', onUpdate: paint })
        .from(
          '.preloader__char',
          { yPercent: 120, duration: 1.1, ease: 'expo.out', stagger: 0.03 },
          0.1,
        );
    }, root);

    // let the counter breathe for a beat even on a warm cache
    let graceful;
    ready.then(() => {
      graceful = setTimeout(finish, 300);
    });

    /* Hard ceiling on a real timer rather than gsap.delayedCall: the ticker
       is frozen in exactly the cases this needs to rescue (throttled tab,
       stalled font request). */
    const ceiling = setTimeout(finish, 3500);

    return () => {
      clearTimeout(ceiling);
      clearTimeout(graceful);
      ctx.revert();
      startScroll();
    };
  }, [onDone]);

  if (gone) return null;

  return (
    <div className="preloader" ref={rootRef}>
      <div className="preloader__inner">
        <div className="preloader__wordmark" aria-hidden="true">
          {[...WORDMARK].map((ch, i) => (
            <span className="preloader__char-mask" key={`${ch}-${i}`}>
              <span className="preloader__char">{ch === ' ' ? ' ' : ch}</span>
            </span>
          ))}
        </div>
        <div className="preloader__meta">
          <span className="mono">Product manager · technical builder</span>
          <span className="mono tabular" ref={countRef}>
            000
          </span>
        </div>
        <div className="preloader__bar">
          <span ref={barRef} />
        </div>
      </div>
      <span className="sr-only" role="status">
        Loading
      </span>
    </div>
  );
}

Preloader.propTypes = {
  onDone: PropTypes.func,
};
