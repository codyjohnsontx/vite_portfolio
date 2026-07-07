import { useEffect, useRef, useState } from 'react';

export function useMediaMotion({ amplitude = 22 } = {}) {
  const wrapRef = useRef(null); // .prod-feature__media
  const imgRef = useRef(null); // inner <img data-parallax> (absent for placeholder cards)
  const [revealed, setRevealed] = useState(false);

  useEffect(() => {
    const wrap = wrapRef.current;
    if (!wrap) return undefined; // reveal only needs the frame; img is optional

    const reduce = window.matchMedia?.('(prefers-reduced-motion: reduce)').matches;
    if (reduce) {
      setRevealed(true);
      return undefined;
    }

    const img = imgRef.current; // may be null when the card renders a placeholder

    // Observe the parent, not the frame itself: the frame starts clipped to zero
    // height (clip-path: inset(0 0 100% 0)) and Chromium clips a target's IO rect
    // by its own clip-path, so observing the frame reports ratio 0 forever and it
    // could never reveal itself. The parent tracks the same on-screen position.
    const observeTarget = wrap.parentElement || wrap;

    // Single rAF loop shared by parallax + tilt, gated on intersection so
    // off-screen cards don't read layout every frame. One getBoundingClientRect
    // per frame feeds both effects. Reveal is driven through React state so the
    // class survives the Reveal wrapper's re-render.
    let raf = null;
    let mouseX = null;
    let mouseY = null;

    const tick = () => {
      const r = wrap.getBoundingClientRect();
      if (img) {
        const vh = window.innerHeight;
        const off = (r.top + r.height / 2 - vh / 2) / vh;
        img.style.transform = `translateY(${(-off * amplitude).toFixed(2)}px)`;
      }
      if (mouseX !== null) {
        const rx = ((mouseY - r.top) / r.height - 0.5) * -4;
        const ry = ((mouseX - r.left) / r.width - 0.5) * 4;
        wrap.style.transform = `perspective(1200px) rotateX(${rx}deg) rotateY(${ry}deg)`;
      }
      raf = requestAnimationFrame(tick);
    };
    const startLoop = () => {
      if (raf === null) raf = requestAnimationFrame(tick);
    };
    const stopLoop = () => {
      if (raf !== null) {
        cancelAnimationFrame(raf);
        raf = null;
      }
    };

    let io;
    if ('IntersectionObserver' in window) {
      io = new IntersectionObserver(
        ([entry]) => {
          if (entry.isIntersecting) {
            setRevealed(true);
            startLoop();
          } else {
            stopLoop();
          }
        },
        { threshold: 0.14, rootMargin: '0px 0px -10% 0px' },
      );
      io.observe(observeTarget);
    } else {
      setRevealed(true);
      startLoop();
    }

    // Cache pointer position only - the layout read happens once per frame in tick().
    const onMove = (ev) => {
      mouseX = ev.clientX;
      mouseY = ev.clientY;
    };
    const onLeave = () => {
      mouseX = null;
      mouseY = null;
      wrap.style.transform = 'perspective(1200px)';
    };
    wrap.addEventListener('mousemove', onMove);
    wrap.addEventListener('mouseleave', onLeave);

    return () => {
      io?.disconnect();
      stopLoop();
      wrap.removeEventListener('mousemove', onMove);
      wrap.removeEventListener('mouseleave', onLeave);
    };
  }, [amplitude]);

  return { wrapRef, imgRef, revealed };
}
