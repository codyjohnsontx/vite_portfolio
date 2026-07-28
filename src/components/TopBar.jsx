import PropTypes from 'prop-types';
import { useCallback, useEffect, useRef, useState } from 'react';
import { Link, NavLink, useLocation } from 'react-router-dom';
import { gsap, prefersReducedMotion, startScroll, stopScroll } from '../motion/motion';
import { useMagnetic } from '../motion/hooks';
import { profile } from '../content/profile';
import { flagshipProducts } from '../content/projects';

const NAV = [
  { to: '/products', label: 'Work' },
  { to: '/case-studies', label: 'Case Studies' },
  { to: '/blog', label: 'Blog' },
  { to: '/dev-mode', label: 'Dev Mode' },
];

function LocalClock() {
  const [now, setNow] = useState('');

  useEffect(() => {
    const tick = () => {
      setNow(
        new Intl.DateTimeFormat('en-US', {
          timeZone: 'America/Chicago',
          hour: 'numeric',
          minute: '2-digit',
        }).format(new Date()),
      );
    };
    tick();
    const id = setInterval(tick, 15000);
    return () => clearInterval(id);
  }, []);

  return (
    <span className="topbar__clock mono tabular">
      <span className="topbar__clock-city">ATX</span> {now}
    </span>
  );
}

function ThemeToggle({ theme, onToggle }) {
  const ref = useMagnetic({ strength: 0.3 });
  const isDark = theme === 'dark';
  return (
    <button
      ref={ref}
      type="button"
      className="topbar__icon-btn"
      onClick={onToggle}
      aria-label={isDark ? 'Switch to light mode' : 'Switch to dark mode'}
      aria-pressed={!isDark}
      data-cursor=""
    >
      <span className={'topbar__theme-glyph' + (isDark ? '' : ' is-light')} aria-hidden="true" />
    </button>
  );
}

export default function TopBar({ theme, onToggleTheme }) {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const location = useLocation();
  const overlayRef = useRef(null);
  const btnRef = useRef(null);
  const firstLinkRef = useRef(null);
  const menuMagnet = useMagnetic({ strength: 0.28 });

  const close = useCallback(() => setOpen(false), []);

  useEffect(() => {
    close();
  }, [location.pathname, close]);

  /* Once content is running underneath, the bar's glyphs need their own
     backing or they collide with whatever scrolls past. */
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  // overlay open/close: scroll lock, focus, escape, inert background
  useEffect(() => {
    const overlay = overlayRef.current;
    if (!overlay) return undefined;

    if (!open) {
      startScroll();
      return undefined;
    }

    stopScroll();
    const backdrop = [document.querySelector('main'), document.querySelector('.site-footer')].filter(
      Boolean,
    );
    backdrop.forEach((el) => el.setAttribute('inert', ''));

    const onKey = (e) => {
      if (e.key === 'Escape') close();
    };
    window.addEventListener('keydown', onKey);
    firstLinkRef.current?.focus();

    let ctx;
    if (!prefersReducedMotion()) {
      ctx = gsap.context(() => {
        gsap
          .timeline()
          .fromTo(
            overlay,
            { clipPath: 'inset(0% 0% 100% 0%)' },
            { clipPath: 'inset(0% 0% 0% 0%)', duration: 0.85, ease: 'expo.inOut' },
          )
          .from(
            '.menu__link-inner',
            { yPercent: 115, duration: 0.9, ease: 'expo.out', stagger: 0.055 },
            '-=0.45',
          )
          .from(
            '.menu__pill',
            { opacity: 0, y: 14, duration: 0.6, ease: 'expo.out', stagger: 0.035 },
            '-=0.6',
          )
          .from(
            '.menu__card',
            { opacity: 0, y: 24, duration: 0.7, ease: 'expo.out', stagger: 0.07 },
            '-=0.65',
          )
          .from('.menu__foot > *', { opacity: 0, duration: 0.5, stagger: 0.05 }, '-=0.5');
      }, overlay);
    }

    return () => {
      window.removeEventListener('keydown', onKey);
      backdrop.forEach((el) => el.removeAttribute('inert'));
      ctx?.revert();
      startScroll();
      btnRef.current?.focus();
    };
  }, [open, close]);

  return (
    <>
      <header
        className={'topbar' + (open ? ' is-open' : '') + (scrolled && !open ? ' is-scrolled' : '')}
      >
        <div className="topbar__slot topbar__slot--start">
          <button
            ref={(node) => {
              btnRef.current = node;
              menuMagnet.current = node;
            }}
            type="button"
            className="pill topbar__menu"
            aria-expanded={open}
            aria-controls="site-menu"
            onClick={() => setOpen((v) => !v)}
            data-cursor=""
          >
            {open ? 'Close' : 'Menu'}
            <span className={'topbar__menu-glyph' + (open ? ' is-open' : '')} aria-hidden="true">
              <i />
              <i />
            </span>
          </button>
        </div>

        <div className="topbar__slot topbar__slot--center">
          <Link to="/" className="topbar__wordmark" aria-label="Cody Johnson, home" data-cursor="">
            Cody Johnson
          </Link>
        </div>

        <div className="topbar__slot topbar__slot--end topbar__cluster">
          <LocalClock />
          <ThemeToggle theme={theme} onToggle={onToggleTheme} />
          <a
            href="mailto:codyjohnsontx@gmail.com"
            className="topbar__icon-btn"
            aria-label="Email Cody"
            data-cursor="Say hi"
          >
            <svg viewBox="0 0 20 16" width="15" height="12" aria-hidden="true" fill="none">
              <rect x="0.6" y="0.6" width="18.8" height="14.8" rx="2.4" stroke="currentColor" strokeWidth="1.2" />
              <path d="M1.6 2.4 10 8.6l8.4-6.2" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" />
            </svg>
          </a>
        </div>
      </header>

      <div
        id="site-menu"
        ref={overlayRef}
        className={'menu' + (open ? ' is-open' : '')}
        aria-hidden={!open}
      >
        <div className="menu__grid">
          <nav className="menu__nav" aria-label="Primary">
            <ul>
              {NAV.map((item, i) => (
                <li key={item.to}>
                  <NavLink
                    to={item.to}
                    ref={i === 0 ? firstLinkRef : undefined}
                    tabIndex={open ? 0 : -1}
                    className={({ isActive }) => 'menu__link' + (isActive ? ' is-active' : '')}
                    data-cursor=""
                  >
                    <span className="menu__link-mask">
                      <span className="menu__link-inner">{item.label}</span>
                    </span>
                  </NavLink>
                </li>
              ))}
            </ul>
          </nav>

          <div className="menu__side">
            <span className="mono">Selected builds</span>
            <div className="menu__pills">
              {flagshipProducts.map((p) => (
                <Link
                  key={p.slug}
                  to={`/products/${p.slug}`}
                  className="pill menu__pill"
                  tabIndex={open ? 0 : -1}
                  data-cursor=""
                >
                  {p.name}
                </Link>
              ))}
              <Link
                to="/products"
                className="pill menu__pill pill--solid"
                tabIndex={open ? 0 : -1}
                data-cursor=""
              >
                All work
              </Link>
            </div>
          </div>

          <div className="menu__cards">
            {flagshipProducts.slice(0, 3).map((p) => {
              const latest = p.updates?.[0];
              return (
                <Link
                  key={p.slug}
                  to={`/products/${p.slug}`}
                  className="card menu__card"
                  tabIndex={open ? 0 : -1}
                  data-cursor="Open"
                >
                  <span className="mono">{p.name}</span>
                  <p className="body">{latest?.title || p.oneLiner}</p>
                </Link>
              );
            })}
          </div>

          <div className="menu__foot">
            {profile.contactLinks.map((l) => (
              <a
                key={l.label}
                href={l.href}
                target={l.external ? '_blank' : undefined}
                rel={l.external ? 'noreferrer' : undefined}
                className="menu__foot-link mono"
                tabIndex={open ? 0 : -1}
                data-cursor=""
              >
                {l.label}
                {l.external ? <span aria-hidden="true"> ↗</span> : null}
              </a>
            ))}
            <span className="mono">Austin, Texas</span>
          </div>
        </div>
      </div>
    </>
  );
}

ThemeToggle.propTypes = {
  theme: PropTypes.string.isRequired,
  onToggle: PropTypes.func.isRequired,
};

TopBar.propTypes = {
  theme: PropTypes.string.isRequired,
  onToggleTheme: PropTypes.func.isRequired,
};
