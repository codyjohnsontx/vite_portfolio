import PropTypes from 'prop-types';
import { useEffect, useRef, useState } from 'react';
import { Link, NavLink, Outlet, useLocation } from 'react-router-dom';
import { profile } from '../content/profile';
import { flagshipProducts } from '../content/projects';

const THEMES = [
  { id: 'paper', label: 'Light' },
  { id: 'ink', label: 'Dark' },
];

const NAV = [
  { to: '/products', label: 'Products' },
  { to: '/case-studies', label: 'Case Studies' },
  { to: '/blog', label: 'Blog' },
  { to: '/dev-mode', label: 'Dev Mode' },
];

function getInitialTheme() {
  if (typeof window === 'undefined') return 'paper';
  try {
    const storage = window.localStorage;
    if (typeof storage?.getItem !== 'function') return 'paper';
    const stored = storage.getItem('cj-theme');
    if (stored === 'dark') return 'ink';
    if (stored === 'paper' || stored === 'ink') return stored;
  } catch {
    return 'paper';
  }
  return 'paper';
}

function ThemeToggle({ theme, onChange }) {
  return (
    <div className="theme-toggle" role="group" aria-label="Theme">
      {THEMES.map((m) => (
        <button
          key={m.id}
          type="button"
          aria-pressed={theme === m.id}
          className={theme === m.id ? 'active' : ''}
          onClick={() => onChange(m.id)}
        >
          {m.label}
        </button>
      ))}
    </div>
  );
}

ThemeToggle.propTypes = {
  theme: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
};

function SiteLayout() {
  const [theme, setTheme] = useState(getInitialTheme);
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const location = useLocation();
  const menuBtnRef = useRef(null);
  const firstLinkRef = useRef(null);

  useEffect(() => {
    const root = document.documentElement;
    root.setAttribute('data-theme', theme);
    try {
      const storage = window.localStorage;
      if (typeof storage?.setItem === 'function') storage.setItem('cj-theme', theme);
    } catch {
      /* ignore */
    }
  }, [theme]);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 30);
    window.addEventListener('scroll', onScroll, { passive: true });
    onScroll();
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  // close the menu whenever the route changes
  useEffect(() => {
    setMenuOpen(false);
  }, [location.pathname]);

  // while open: lock body scroll, close on Escape, and manage focus. The
  // background (page content behind the overlay) is made inert so Tab can't
  // move focus into content hidden beneath the menu — the top bar and the menu
  // itself stay interactive.
  useEffect(() => {
    if (!menuOpen) return undefined;
    const menuBtn = menuBtnRef.current;
    const backdropEls = [
      document.querySelector('main'),
      document.querySelector('.site-footer'),
    ].filter(Boolean);
    const onKey = (e) => {
      if (e.key === 'Escape') setMenuOpen(false);
    };
    window.addEventListener('keydown', onKey);
    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    backdropEls.forEach((el) => el.setAttribute('inert', ''));
    firstLinkRef.current?.focus();
    return () => {
      window.removeEventListener('keydown', onKey);
      document.body.style.overflow = prevOverflow;
      backdropEls.forEach((el) => el.removeAttribute('inert'));
      menuBtn?.focus();
    };
  }, [menuOpen]);

  const onProductCaseOrBlog =
    location.pathname.startsWith('/products') ||
    location.pathname.startsWith('/case-studies') ||
    location.pathname.startsWith('/blog');
  const inDevMode = location.pathname.startsWith('/dev-mode');

  return (
    <>
      <nav className={'topnav' + (scrolled ? ' is-scrolled' : '')}>
        <div className="topnav__inner">
          <Link to="/" className="topnav__brand" aria-label="Cody Johnson, home">
            <span>Cody Johnson</span>
          </Link>
          <div className="topnav__actions">
            <ThemeToggle theme={theme} onChange={setTheme} />
            <button
              type="button"
              ref={menuBtnRef}
              className={'topnav__menu-btn' + (menuOpen ? ' is-open' : '')}
              aria-expanded={menuOpen}
              aria-controls="nav-menu"
              aria-label={menuOpen ? 'Close menu' : 'Open menu'}
              onClick={() => setMenuOpen((open) => !open)}
            >
              <span className="topnav__menu-lines" aria-hidden="true">
                <span />
                <span />
              </span>
            </button>
          </div>
        </div>
      </nav>

      <div
        id="nav-menu"
        className={'nav-menu' + (menuOpen ? ' is-open' : '')}
        onClick={() => setMenuOpen(false)}
      >
        <nav className="nav-menu__inner" aria-label="Primary">
          <ul className="nav-menu__links">
            {NAV.map((it, i) => (
              <li key={it.to} style={{ '--i': i }}>
                <NavLink
                  to={it.to}
                  end={it.end}
                  ref={i === 0 ? firstLinkRef : undefined}
                  className={({ isActive }) => (isActive ? 'active' : '')}
                >
                  {it.label}
                </NavLink>
              </li>
            ))}
          </ul>
          <div className="nav-menu__social">
            {profile.contactLinks
              .filter((l) => l.external)
              .map((l) => (
                <a
                  key={l.label}
                  href={l.href}
                  target="_blank"
                  rel="noreferrer"
                  className="nav-menu__social-link mono uppercase"
                >
                  {l.label} <span aria-hidden="true" className="muted">↗</span>
                </a>
              ))}
          </div>
        </nav>
      </div>

      <main key={onProductCaseOrBlog ? location.pathname : undefined}>
        <Outlet />
      </main>

      {inDevMode ? null : (
      <footer className="site-footer">
        <div className="site-footer__inner">
          <div>
            <h4>Index</h4>
            <ul>
              <li>
                <Link to="/">Home</Link>
              </li>
              <li>
                <Link to="/products">Products</Link>
              </li>
              <li>
                <Link to="/case-studies">Case Studies</Link>
              </li>
              <li>
                <Link to="/blog">Blog</Link>
              </li>
            </ul>
          </div>
          <div>
            <h4>Active builds</h4>
            <ul>
              {flagshipProducts.map((p) => (
                <li key={p.slug}>
                  <Link to={`/products/${p.slug}`}>{p.name}</Link>
                </li>
              ))}
            </ul>
          </div>
          <div>
            <h4>Contact</h4>
            <ul aria-label="primary contact links">
              {profile.contactLinks.map((l) => (
                <li key={l.label}>
                  <a
                    href={l.href}
                    target={l.external ? '_blank' : undefined}
                    rel={l.external ? 'noreferrer' : undefined}
                  >
                    {l.label} {l.external ? <span className="muted">↗</span> : null}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>
        <div className="site-footer__bottom">
          <span>© {new Date().getFullYear()} Cody Johnson</span>
        </div>
      </footer>
      )}
    </>
  );
}

export default SiteLayout;
