import { useState } from 'react';
import { HiArrowUpRight, HiBars3, HiXMark } from 'react-icons/hi2';
import { Link, Outlet } from 'react-router-dom';
import { profile } from '../content/profile';
import { resumeMeta } from '../content/resumeMeta';

const navItems = [
  { label: 'Products', href: '/products' },
  { label: 'Case Studies', href: '/#case-studies' },
  { label: 'Resume', href: '/resume' },
  { label: 'Contact', href: '/#contact' },
];

function SiteLayout() {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <div className="min-h-screen">
      <header className="sticky top-0 z-50 border-b border-[color:var(--line)] bg-[rgba(234,241,246,0.78)] backdrop-blur-xl">
        <div className="section-shell flex items-center justify-between py-4">
          <Link to="/" className="min-w-0">
            <div className="text-lg font-semibold text-[color:var(--ink)] md:text-xl">
              {profile.name}
            </div>
            <div className="text-sm text-[color:var(--ink-muted)]">
              {profile.targetRole}
            </div>
          </Link>

          <nav className="hidden items-center gap-6 md:flex">
            {navItems.map((item) => (
              <Link
                key={item.label}
                to={item.href}
                className="text-sm font-medium text-[color:var(--ink-muted)] transition hover:text-[color:var(--ink)]"
              >
                {item.label}
              </Link>
            ))}
            <a
              href={resumeMeta.downloadPath}
              className="cta-primary px-4 py-2"
              download
            >
              Download resume
              <HiArrowUpRight className="text-base" />
            </a>
          </nav>

          <button
            type="button"
            className="inline-flex items-center justify-center rounded-full border border-[color:var(--line)] p-2 md:hidden"
            aria-expanded={menuOpen}
            aria-label="Toggle navigation"
            onClick={() => setMenuOpen((open) => !open)}
          >
            {menuOpen ? <HiXMark className="text-xl" /> : <HiBars3 className="text-xl" />}
          </button>
        </div>

        {menuOpen ? (
          <div className="border-t border-[color:var(--line)] bg-[rgba(234,241,246,0.94)] md:hidden">
            <div className="section-shell flex flex-col gap-3 py-4">
              {navItems.map((item) => (
                <Link
                  key={item.label}
                  to={item.href}
                  className="rounded-2xl border border-[color:var(--line)] px-4 py-3 text-sm font-medium"
                  onClick={() => setMenuOpen(false)}
                >
                  {item.label}
                </Link>
              ))}
              <a
                href={resumeMeta.downloadPath}
                className="cta-primary justify-center"
                onClick={() => setMenuOpen(false)}
                download
              >
                Download resume
              </a>
            </div>
          </div>
        ) : null}
      </header>

      <main>
        <Outlet />
      </main>

      <footer className="border-t border-[color:var(--line)] py-10">
        <div className="section-shell flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
          <div>
            <p className="text-lg font-semibold">{profile.name}</p>
            <p className="max-w-xl text-sm leading-6 text-[color:var(--ink-muted)]">
              {profile.footerNote}
            </p>
          </div>
          <div className="flex flex-wrap gap-4 text-sm font-medium text-[color:var(--ink-muted)]">
            {profile.contactLinks.map((link) => (
              <a key={link.label} href={link.href} target={link.external ? '_blank' : undefined} rel={link.external ? 'noreferrer' : undefined}>
                {link.label}
              </a>
            ))}
          </div>
        </div>
      </footer>
    </div>
  );
}

export default SiteLayout;
