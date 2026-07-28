import { useCallback, useEffect, useState } from 'react';
import { Outlet, useLocation } from 'react-router-dom';
import AuroraField from '../webgl/AuroraField';
import Cursor from './Cursor';
import Footer from './Footer';
import Grain from './Grain';
import Preloader from './Preloader';
import TopBar from './TopBar';
import {
  ScrollTrigger,
  destroySmoothScroll,
  initSmoothScroll,
  scrollToTop,
} from '../motion/motion';

const STORAGE_KEY = 'cj-theme';

function getInitialTheme() {
  if (typeof window === 'undefined') return 'dark';
  try {
    const stored = window.localStorage?.getItem?.(STORAGE_KEY);
    // migrate the previous paper/ink naming
    if (stored === 'paper') return 'light';
    if (stored === 'ink') return 'dark';
    if (stored === 'light' || stored === 'dark') return stored;
  } catch {
    /* private mode - fall through to the default */
  }
  // Dark is the art direction this site was designed in, so it is the
  // default for first-time visitors regardless of OS preference. The
  // toggle persists whatever they pick from there.
  return 'dark';
}

export default function SiteLayout() {
  const [theme, setTheme] = useState(getInitialTheme);
  const [loaded, setLoaded] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const location = useLocation();

  /* Owned here rather than in TopBar because the top fade needs it too. */
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme);
    try {
      window.localStorage?.setItem?.(STORAGE_KEY, theme);
    } catch {
      /* ignore */
    }
  }, [theme]);

  useEffect(() => {
    initSmoothScroll();
    return () => destroySmoothScroll();
  }, []);

  // route change: jump to top, then let the new page's triggers re-measure
  useEffect(() => {
    scrollToTop(true);
    const id = requestAnimationFrame(() => ScrollTrigger.refresh());
    return () => cancelAnimationFrame(id);
  }, [location.pathname]);

  const toggleTheme = useCallback(() => {
    const next = theme === 'dark' ? 'light' : 'dark';
    // View Transitions gives the theme flip a real cross-fade for free
    if (document.startViewTransition) {
      document.startViewTransition(() => setTheme(next));
    } else {
      setTheme(next);
    }
  }, [theme]);

  const isHome = location.pathname === '/';

  const onLoaded = useCallback(() => {
    setLoaded(true);
    ScrollTrigger.refresh();
  }, []);

  return (
    <>
      <a className="skip-link" href="#main">Skip to content</a>

      {/* The field is a hero device. Interior pages are reading surfaces, so
          it sits back to a dim wash there instead of competing with body
          copy. */}
      <AuroraField intensity={loaded ? (isHome ? 1 : 0.3) : 0.24} />
      <Grain />
      <Cursor />
      <Preloader onDone={onLoaded} />

      {/* Dissolves page content into the background as it approaches the
          bar, so nothing ever slides up and collides with it. */}
      <div className={'topfade' + (scrolled ? ' is-on' : '')} aria-hidden="true" />

      <TopBar theme={theme} onToggleTheme={toggleTheme} scrolled={scrolled} />

      <main id="main" key={location.pathname}>
        <Outlet context={{ loaded }} />
      </main>

      {/* Dev Mode is a full-screen terminal; the site chrome would break the
          conceit, so it keeps its own ending. */}
      {location.pathname.startsWith('/dev-mode') ? null : <Footer />}
    </>
  );
}
