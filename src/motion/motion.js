import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import Lenis from 'lenis';

gsap.registerPlugin(ScrollTrigger);

export { gsap, ScrollTrigger };

export function prefersReducedMotion() {
  return (
    typeof window !== 'undefined' &&
    typeof window.matchMedia === 'function' &&
    window.matchMedia('(prefers-reduced-motion: reduce)').matches
  );
}

let lenis = null;

/* One Lenis instance for the whole app, driven off the GSAP ticker so
   ScrollTrigger and the virtual scroll never disagree about the frame. */
export function initSmoothScroll() {
  if (lenis || prefersReducedMotion()) return null;

  /* Lenis constructs a ResizeObserver unconditionally. Without this guard a
     missing ResizeObserver throws inside SiteLayout's effect and takes the
     whole app down, when the correct outcome is simply native scrolling. */
  if (typeof ResizeObserver !== 'function') return null;

  lenis = new Lenis({
    duration: 1.05,
    easing: (t) => Math.min(1, 1.001 - 2 ** (-10 * t)),
    smoothWheel: true,
    syncTouch: false,
  });

  lenis.on('scroll', ScrollTrigger.update);

  const tick = (time) => lenis.raf(time * 1000);
  gsap.ticker.add(tick);
  gsap.ticker.lagSmoothing(0);

  lenis.__tick = tick;
  return lenis;
}

export function getLenis() {
  return lenis;
}

export function destroySmoothScroll() {
  if (!lenis) return;
  if (lenis.__tick) gsap.ticker.remove(lenis.__tick);
  lenis.destroy();
  lenis = null;
}

export function stopScroll() {
  lenis?.stop();
  if (!lenis) document.body.style.overflow = 'hidden';
}

export function startScroll() {
  lenis?.start();
  if (!lenis) document.body.style.overflow = '';
}

export function scrollToTop(immediate = true) {
  if (lenis) lenis.scrollTo(0, { immediate });
  else window.scrollTo(0, 0);
}

/* ---------------------------------------------------------------------
   Text splitting. Returns the created elements so callers can animate
   them; rebuilding on resize is the caller's business (line splitting is
   only used on headings that reflow rarely).
   --------------------------------------------------------------------- */

export function splitChars(el) {
  if (!el || el.dataset.split === 'chars') return [];
  const source = el.textContent ?? '';
  el.dataset.split = 'chars';
  el.textContent = '';

  const chars = [];
  source.split(/(\s+)/).forEach((token) => {
    if (!token) return;
    if (/^\s+$/.test(token)) {
      el.appendChild(document.createTextNode(' '));
      return;
    }
    const word = document.createElement('span');
    word.className = 'kt-word';
    const inner = document.createElement('span');
    inner.className = 'kt-inner';
    [...token].forEach((ch) => {
      const c = document.createElement('span');
      c.className = 'kt-char';
      c.textContent = ch;
      inner.appendChild(c);
      chars.push(c);
    });
    word.appendChild(inner);
    el.appendChild(word);
  });
  return chars;
}

export function splitWords(el) {
  if (!el || el.dataset.split === 'words') return [];
  const source = el.textContent ?? '';
  el.dataset.split = 'words';
  el.textContent = '';

  const inners = [];
  source.split(/(\s+)/).forEach((token) => {
    if (!token) return;
    if (/^\s+$/.test(token)) {
      el.appendChild(document.createTextNode(' '));
      return;
    }
    const word = document.createElement('span');
    word.className = 'kt-word';
    const inner = document.createElement('span');
    inner.className = 'kt-inner';
    inner.textContent = token;
    word.appendChild(inner);
    el.appendChild(word);
    inners.push(inner);
  });
  return inners;
}
