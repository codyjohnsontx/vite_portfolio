import { useEffect, useRef, useState } from 'react';

export function useMediaMotion({ amplitude = 22 } = {}) {
  const wrapRef = useRef(null); // .prod-feature__media
  const imgRef = useRef(null); // inner <img data-parallax>
  const [revealed, setRevealed] = useState(false);

  useEffect(() => {
    const wrap = wrapRef.current;
    const img = imgRef.current;
    if (!wrap || !img) return undefined;

    const reduce = window.matchMedia?.('(prefers-reduced-motion: reduce)').matches;
    if (reduce) {
      setRevealed(true);
      return undefined;
    }

    // clip reveal (one-shot). Driven through React state so the class survives
    // re-renders — the wrapper is a React-managed element whose className would
    // otherwise be reconciled back, wiping an imperatively-added class.
    let io;
    if ('IntersectionObserver' in window) {
      io = new IntersectionObserver(
        ([entry]) => {
          if (entry.isIntersecting) {
            setRevealed(true);
            io.disconnect();
          }
        },
        { threshold: 0.14, rootMargin: '0px 0px -10% 0px' },
      );
      io.observe(wrap);
    } else {
      setRevealed(true);
    }

    // parallax (rAF, damped within the frame). Writes img.style directly — the
    // <img> has no style prop, so React does not reconcile (and clobber) it.
    let raf;
    const tick = () => {
      const r = wrap.getBoundingClientRect();
      const vh = window.innerHeight;
      const off = (r.top + r.height / 2 - vh / 2) / vh;
      img.style.transform = `translateY(${(-off * amplitude).toFixed(2)}px)`;
      raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);

    // tilt on pointer move (very slight, editorial)
    const onMove = (ev) => {
      const r = wrap.getBoundingClientRect();
      const rx = ((ev.clientY - r.top) / r.height - 0.5) * -4;
      const ry = ((ev.clientX - r.left) / r.width - 0.5) * 4;
      wrap.style.transform = `perspective(1200px) rotateX(${rx}deg) rotateY(${ry}deg)`;
    };
    const onLeave = () => {
      wrap.style.transform = 'perspective(1200px)';
    };
    wrap.addEventListener('mousemove', onMove);
    wrap.addEventListener('mouseleave', onLeave);

    return () => {
      io?.disconnect();
      cancelAnimationFrame(raf);
      wrap.removeEventListener('mousemove', onMove);
      wrap.removeEventListener('mouseleave', onLeave);
    };
  }, [amplitude]);

  return { wrapRef, imgRef, revealed };
}
