import { useEffect, useState } from 'react';
import { Link, NavLink, Outlet, useLocation } from 'react-router-dom';
import { profile } from '../content/profile';
import { flagshipProducts } from '../content/projects';
import { ArrowGlyph } from './Editorial';

const THEMES = [
  { id: 'paper', label: 'Paper' },
  { id: 'ink', label: 'Ink' },
  { id: 'dark', label: 'Dark' },
];

const NAV = [
  { to: '/', label: 'Index', end: true },
  { to: '/products', label: 'Products' },
  { to: '/case-studies', label: 'Case Studies' },
  { to: '/resume', label: 'Resume' },
];

function getInitialTheme() {
  if (typeof window === 'undefined') return 'paper';
  const storage = window.localStorage;
  const stored = typeof storage?.getItem === 'function' ? storage.getItem('cj-theme') : null;
  if (stored === 'paper' || stored === 'ink' || stored === 'dark') return stored;
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

function SiteLayout() {
  const [theme, setTheme] = useState(getInitialTheme);
  const location = useLocation();

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

  const onProductOrCase =
    location.pathname.startsWith('/products') || location.pathname.startsWith('/case-studies');

  return (
    <>
      <nav className="topnav">
        <div className="topnav__inner">
          <Link to="/" className="topnav__brand" aria-label="Cody Johnson — home">
            <span>Cody Johnson</span>
          </Link>
          <div className="topnav__links">
            {NAV.map((it) => (
              <NavLink
                key={it.to}
                to={it.to}
                end={it.end}
                className={({ isActive }) => (isActive ? 'active' : '')}
              >
                {it.label}
              </NavLink>
            ))}
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
            <ThemeToggle theme={theme} onChange={setTheme} />
            <a className="topnav__cta" href="mailto:codyjohnsontx@gmail.com">
              Get in touch <ArrowGlyph />
            </a>
          </div>
        </div>
      </nav>

      <main key={onProductOrCase ? location.pathname : undefined}>
        <Outlet />
      </main>

      <footer className="site-footer">
        <div className="site-footer__inner">
          <div>
            <h4>Currently</h4>
            <p className="lead" style={{ fontSize: 22, margin: 0, maxWidth: '38ch' }}>
              Open to product manager and product owner roles. Based in Austin, TX. Working in
              public.
            </p>
            <div style={{ marginTop: 24 }}>
              <a className="link-arrow" href="mailto:codyjohnsontx@gmail.com">
                codyjohnsontx@gmail.com <ArrowGlyph />
              </a>
            </div>
          </div>
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
                <Link to="/resume">Resume</Link>
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
            <h4>Elsewhere</h4>
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
          <span>Designed in Austin · Built in public</span>
          <span>Last update — Apr 2026</span>
        </div>
      </footer>
    </>
  );
}

export default SiteLayout;
