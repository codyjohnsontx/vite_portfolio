import { useEffect, useRef, useState } from 'react';
import { createPortal } from 'react-dom';
import { Link, Navigate, useParams } from 'react-router-dom';
import { ArrowGlyph, Eyebrow, StackRow } from '../components/Editorial';
import { Reveal } from '../components/ScrollReveal';
import { getProductAnalysisBySlug } from '../content/productAnalyses';
import { getProductBySlug } from '../content/projects';
import { getProductResearchBySlug } from '../content/productResearch';

const SECTIONS = [
  { id: 'overview', label: '01 Overview' },
  { id: 'workflow', label: '02 Workflow' },
  { id: 'scope', label: '03 MVP scope' },
  { id: 'updates', label: '04 Updates' },
  { id: 'whats-next', label: "05 What's next" },
];

export default function ProductDetailPage() {
  const { slug } = useParams();
  const product = getProductBySlug(slug);
  const [active, setActive] = useState('overview');
  const [selectedVisualAsset, setSelectedVisualAsset] = useState(null);
  const closeBtnRef = useRef(null);
  const dialogRef = useRef(null);
  const previousActiveElementRef = useRef(null);

  useEffect(() => {
    if (!product) return undefined;
    const onScroll = () => {
      let cur = SECTIONS[0].id;
      for (const s of SECTIONS) {
        const el = document.getElementById(s.id);
        if (el && el.getBoundingClientRect().top < 200) cur = s.id;
      }
      setActive(cur);
    };
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, [product]);

  useEffect(() => {
    setSelectedVisualAsset(null);
  }, [slug]);

  useEffect(() => {
    if (!selectedVisualAsset) return undefined;

    previousActiveElementRef.current =
      document.activeElement instanceof HTMLElement ? document.activeElement : null;
    const originalOverflow = document.body.style.overflow;
    const focusFrame = window.requestAnimationFrame(() => closeBtnRef.current?.focus());
    document.body.style.overflow = 'hidden';

    const onKeyDown = (event) => {
      if (event.key === 'Escape') {
        setSelectedVisualAsset(null);
        return;
      }
      if (event.key !== 'Tab') return;
      const root = dialogRef.current;
      if (!root) return;
      const focusables = root.querySelectorAll(
        'a[href], button:not([disabled]), input:not([disabled]), textarea:not([disabled]), select:not([disabled]), [tabindex]:not([tabindex="-1"])',
      );
      if (focusables.length === 0) {
        event.preventDefault();
        return;
      }
      const first = focusables[0];
      const last = focusables[focusables.length - 1];
      const activeEl = document.activeElement;
      if (event.shiftKey) {
        if (activeEl === first || !root.contains(activeEl)) {
          event.preventDefault();
          last.focus();
        }
      } else if (activeEl === last || !root.contains(activeEl)) {
        event.preventDefault();
        first.focus();
      }
    };

    window.addEventListener('keydown', onKeyDown);
    return () => {
      window.cancelAnimationFrame(focusFrame);
      document.body.style.overflow = originalOverflow;
      window.removeEventListener('keydown', onKeyDown);
      previousActiveElementRef.current?.focus();
      previousActiveElementRef.current = null;
    };
  }, [selectedVisualAsset]);

  if (!product) return <Navigate to="/not-found" replace />;
  const p = product;
  const analysis = getProductAnalysisBySlug(slug);
  const research = getProductResearchBySlug(slug);
  const nextSummary = p.nextStep.split('.')[0] + '.';

  return (
    <div className="fade-in">
      <Reveal as="section" className="page-hero" duration={900}>
        <div className="container">
          <div className="crumbs">
            <Link to="/">Index</Link>
            <span>/</span>
            <Link to="/products">Products</Link>
            <span>/</span>
            <span>{p.name}</span>
          </div>
          <h1
            className="display"
            style={{ margin: 0, fontSize: 'clamp(48px, 7vw, 110px)' }}
          >
            {p.name}
          </h1>
          <p className="lead" style={{ marginTop: 24, maxWidth: '60ch' }}>
            {p.oneLiner}
          </p>
          <div style={{ marginTop: 24, display: 'flex', flexWrap: 'wrap', gap: 8 }}>
            <StackRow items={p.stack} />
          </div>
          {analysis ? (
            <div style={{ marginTop: 24 }}>
              <Link to={`/products/${p.slug}/analysis`} className="link-arrow">
                Read PM analysis <ArrowGlyph />
              </Link>
            </div>
          ) : null}
          {research ? (
            <div style={{ marginTop: 12 }}>
              <Link to={`/products/${p.slug}/research`} className="link-arrow">
                View persona research <ArrowGlyph />
              </Link>
            </div>
          ) : null}
          {p.slug === 'ridesense' ? (
            <div style={{ marginTop: 12 }}>
              <Link to={`/products/${p.slug}/wireframes`} className="link-arrow">
                View lo-fi wireframes <ArrowGlyph />
              </Link>
            </div>
          ) : null}
          {p.slug === 'track-tuner' ? (
            <>
              <div style={{ marginTop: 12 }}>
                <Link to={`/products/${p.slug}/session-compare`} className="link-arrow">
                  Read Session Compare brief <ArrowGlyph />
                </Link>
              </div>
              <div style={{ marginTop: 12 }}>
                <Link
                  to={`/products/${p.slug}/session-compare/wireframes`}
                  className="link-arrow"
                >
                  View Session Compare wireframes <ArrowGlyph />
                </Link>
              </div>
            </>
          ) : null}
        </div>
      </Reveal>

      {p.image ? (
        <Reveal style={{ borderBottom: '1px solid var(--rule)' }} delay={80} distance={22}>
          <div
            className="container"
            style={{ padding: 'clamp(24px, 3vw, 56px) var(--gutter)' }}
          >
            <div
              style={{
                border: '1px solid var(--rule-2)',
                background: 'var(--bg-2)',
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                padding: 'clamp(16px, 3vw, 48px)',
              }}
            >
              <img
                src={p.image}
                alt={p.name}
                style={{
                  maxWidth: '100%',
                  maxHeight: '70vh',
                  height: 'auto',
                  width: 'auto',
                  display: 'block',
                }}
              />
            </div>
          </div>
        </Reveal>
      ) : null}

      {p.featurePresentations?.length ? (
        <Reveal
          as="section"
          className="section section--tight"
          style={{ borderBottom: '1px solid var(--rule)' }}
        >
          <div className="container">
            <Eyebrow>Feature presentations</Eyebrow>
            <h2 className="h2" style={{ margin: '12px 0 12px' }}>
              Working briefs and wireframes
            </h2>
            <p className="body" style={{ margin: 0, maxWidth: '58ch', color: 'var(--ink-2)' }}>
              PM briefs and lo-fi storyboards for features in flight. Each one starts as a small
              hypothesis and ends with a wireframe a developer could build from.
            </p>
            <div
              style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 320px), 1fr))',
                gap: 'clamp(18px, 3vw, 32px)',
                marginTop: 32,
              }}
            >
              {p.featurePresentations.map((feature, index) => (
                <Reveal
                  as="article"
                  key={feature.slug}
                  delay={(index % 4) * 80}
                  style={{
                    border: '1px solid var(--rule-2)',
                    background: 'var(--bg-2)',
                    padding: 'clamp(20px, 3vw, 32px)',
                    display: 'flex',
                    flexDirection: 'column',
                    gap: 14,
                  }}
                >
                  <Eyebrow>{feature.eyebrow}</Eyebrow>
                  <h3
                    className="h3"
                    style={{ margin: 0, fontSize: 'clamp(24px, 2.4vw, 32px)' }}
                  >
                    {feature.title}
                  </h3>
                  <p className="body" style={{ margin: 0, color: 'var(--ink-2)' }}>
                    {feature.summary}
                  </p>
                  <div
                    style={{ display: 'flex', flexWrap: 'wrap', gap: 16, marginTop: 'auto' }}
                  >
                    {feature.links.map((link) => (
                      <Link key={link.href} to={link.href} className="link-arrow">
                        {link.label} <ArrowGlyph />
                      </Link>
                    ))}
                  </div>
                </Reveal>
              ))}
            </div>
          </div>
        </Reveal>
      ) : null}

      {p.visualAssets?.items?.length ? (
        <Reveal
          as="section"
          className="section section--tight"
          style={{ borderBottom: '1px solid var(--rule)' }}
        >
          <div className="container">
            <Eyebrow>Visual proof</Eyebrow>
            <h2 className="h2" style={{ margin: '12px 0 12px' }}>
              {p.visualAssets.heading ?? 'Product screenshots'}
            </h2>
            {p.visualAssets.note ? (
              <p className="body" style={{ margin: 0, maxWidth: '58ch' }}>
                {p.visualAssets.note}
              </p>
            ) : null}
            <div
              style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 320px), 1fr))',
                gap: 'clamp(18px, 3vw, 32px)',
                alignItems: 'start',
                marginTop: 32,
              }}
            >
              {p.visualAssets.items.map((asset, index) => (
                <Reveal
                  as="figure"
                  key={asset.src}
                  delay={(index % 5) * 90}
                  style={{
                    margin: 0,
                    border: '1px solid var(--rule-2)',
                    background: 'var(--bg-2)',
                    padding: 'clamp(10px, 2vw, 18px)',
                  }}
                >
                  {asset.href ? (
                    <a
                      href={asset.href}
                      target="_blank"
                      rel="noreferrer"
                      aria-label={`Open ${asset.label}`}
                      style={{
                        width: '100%',
                        display: 'block',
                      }}
                    >
                      <img
                        src={asset.src}
                        alt={asset.alt}
                        style={{
                          width: '100%',
                          height: 'auto',
                          display: 'block',
                          border: '1px solid var(--rule-2)',
                        }}
                      />
                    </a>
                  ) : (
                    <button
                      type="button"
                      aria-label={`Zoom ${asset.label}`}
                      onClick={() => setSelectedVisualAsset(asset)}
                      style={{
                        width: '100%',
                        display: 'block',
                        cursor: 'zoom-in',
                      }}
                    >
                      <img
                        src={asset.src}
                        alt={asset.alt}
                        style={{
                          width: '100%',
                          height: 'auto',
                          display: 'block',
                          border: '1px solid var(--rule-2)',
                        }}
                      />
                    </button>
                  )}
                  <figcaption
                    className="mono small uppercase"
                    style={{ marginTop: 12, color: 'var(--ink-3)' }}
                  >
                    {asset.href ? `${asset.label} ↗` : asset.label}
                  </figcaption>
                </Reveal>
              ))}
            </div>
          </div>
        </Reveal>
      ) : null}

      <section className="section section--tight">
        <div className="container pd-layout">
          <aside className="sidenav">
            {SECTIONS.map((it) => (
              <a
                key={it.id}
                href={`#${it.id}`}
                className={active === it.id ? 'active' : ''}
              >
                <span className="dash" />
                {it.label}
              </a>
            ))}
          </aside>

          <div style={{ minWidth: 0 }}>
            <Reveal id="overview" style={{ marginBottom: 80 }}>
              <Eyebrow>01 · Overview</Eyebrow>
              <h2 className="h2" style={{ margin: '12px 0 24px' }}>
                The problem
              </h2>
              <p className="lead" style={{ margin: 0, color: 'var(--ink)' }}>
                {p.problem}
              </p>
              <div className="pd-grid">
                <Reveal delay={100}>
                  <Eyebrow>Audience</Eyebrow>
                  <p className="body" style={{ marginTop: 8 }}>{p.audience}</p>
                </Reveal>
                <Reveal delay={180}>
                  <Eyebrow>Job to be done</Eyebrow>
                  <p className="body" style={{ marginTop: 8 }}>{p.jtbd}</p>
                </Reveal>
              </div>
            </Reveal>

            <Reveal id="workflow" style={{ marginBottom: 80 }}>
              <Eyebrow>02 · Workflow</Eyebrow>
              <h2 className="h2" style={{ margin: '12px 0 24px' }}>
                How it works end-to-end
              </h2>
              <ol style={{ margin: 0, padding: 0, listStyle: 'none' }}>
                {p.coreWorkflow.map((step, i) => (
                  <Reveal
                    as="li"
                    key={step}
                    delay={(i % 4) * 80}
                    style={{
                      display: 'grid',
                      gridTemplateColumns: '60px 1fr',
                      gap: 24,
                      padding: '20px 0',
                      borderTop: '1px solid var(--rule-2)',
                    }}
                  >
                    <span
                      className="numeral"
                      style={{ fontSize: 36, color: p.accent }}
                    >
                      0{i + 1}
                    </span>
                    <p
                      className="body"
                      style={{ margin: 0, color: 'var(--ink)', fontSize: 17 }}
                    >
                      {step}
                    </p>
                  </Reveal>
                ))}
              </ol>
            </Reveal>

            <Reveal id="scope" style={{ marginBottom: 80 }}>
              <Eyebrow>03 · MVP scope</Eyebrow>
              <h2 className="h2" style={{ margin: '12px 0 24px' }}>
                What ships first
              </h2>
              <ul style={{ margin: 0, padding: 0, listStyle: 'none' }}>
                {p.mvpScope.map((s, i) => (
                  <Reveal
                    as="li"
                    key={s}
                    delay={(i % 4) * 70}
                    style={{
                      padding: '14px 0',
                      borderTop: '1px solid var(--rule-2)',
                      display: 'flex',
                      alignItems: 'baseline',
                      gap: 16,
                    }}
                  >
                    <span
                      className="mono small"
                      style={{ color: 'var(--ink-3)', minWidth: 32 }}
                    >
                      0{i + 1}
                    </span>
                    <span
                      style={{
                        fontFamily: 'var(--serif)',
                        fontSize: 19,
                        letterSpacing: '-0.005em',
                      }}
                    >
                      {s}
                    </span>
                  </Reveal>
                ))}
              </ul>
            </Reveal>

            <Reveal id="updates" style={{ marginBottom: 80 }}>
              <Eyebrow>04 · Updates</Eyebrow>
              <h2 className="h2" style={{ margin: '12px 0 12px' }}>
                Working in public
              </h2>
              <p
                className="body"
                style={{
                  marginTop: 0,
                  marginBottom: 32,
                  color: 'var(--ink-2)',
                  maxWidth: '60ch',
                }}
              >
                Pull requests, notes, and decisions as they happen. Updated weekly.
              </p>
              {(p.updates ?? []).map((u, i) => (
                <Reveal
                  as="article"
                  key={u.url || u.id || u.title || `update-${i}`}
                  className="update"
                  delay={(i % 4) * 80}
                >
                  <div className="update__body">
                    {u.date || u.tag ? (
                      <p className="update__meta">
                        {[u.date, u.tag].filter(Boolean).join(' · ')}
                      </p>
                    ) : null}
                    <h4>
                      {u.url ? (
                        <a href={u.url} target="_blank" rel="noreferrer">
                          {u.title}
                        </a>
                      ) : (
                        u.title
                      )}
                    </h4>
                    <p>{u.body}</p>
                  </div>
                </Reveal>
              ))}
              {!p.updates?.length ? (
                <p className="body italic" style={{ color: 'var(--ink-3)' }}>
                  No updates yet.
                </p>
              ) : null}
            </Reveal>

            <Reveal id="whats-next">
              <Eyebrow>05 · What&rsquo;s next</Eyebrow>
              <h2 className="h2" style={{ margin: '12px 0 16px' }}>
                {nextSummary}
              </h2>
              <p
                className="body"
                style={{ color: 'var(--ink-2)', maxWidth: '60ch' }}
              >
                {p.nextStep}
              </p>
              {p.brandDisclaimer ? (
                <p
                  className="small italic"
                  style={{ color: 'var(--ink-3)', marginTop: 32 }}
                >
                  {p.brandDisclaimer}
                </p>
              ) : null}
            </Reveal>

            <Reveal
              style={{
                marginTop: 80,
                paddingTop: 32,
                borderTop: '1px solid var(--rule)',
                display: 'flex',
                justifyContent: 'space-between',
                flexWrap: 'wrap',
                gap: 16,
              }}
            >
              <Link className="link-arrow" to="/products">
                ← All products
              </Link>
              <a className="link-arrow" href="mailto:codyjohnsontx@gmail.com">
                Talk about this build <ArrowGlyph />
              </a>
            </Reveal>
          </div>
        </div>
      </section>

      {selectedVisualAsset
        ? createPortal(
            <div
              ref={dialogRef}
              role="dialog"
              aria-modal="true"
              aria-label={`${selectedVisualAsset.label} enlarged screenshot`}
              onMouseDown={(event) => {
                if (event.target === event.currentTarget) setSelectedVisualAsset(null);
              }}
              style={{
                position: 'fixed',
                inset: 0,
                zIndex: 1000,
                background: 'rgba(24, 21, 18, 0.88)',
                padding: 'clamp(16px, 4vw, 48px)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
              }}
            >
              <figure
                style={{
                  margin: 0,
                  width: 'min(100%, 1200px)',
                  maxHeight: 'calc(100vh - clamp(32px, 8vw, 96px))',
                  display: 'flex',
                  flexDirection: 'column',
                  gap: 12,
                }}
              >
                <div
                  style={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    gap: 16,
                  }}
                >
                  <figcaption className="mono small uppercase" style={{ color: '#f4efe6' }}>
                    {selectedVisualAsset.label}
                  </figcaption>
                  <button
                    ref={closeBtnRef}
                    type="button"
                    className="mono small uppercase"
                    onClick={() => setSelectedVisualAsset(null)}
                    style={{
                      color: '#f4efe6',
                      border: '1px solid rgba(244, 239, 230, 0.36)',
                      borderRadius: 999,
                      padding: '8px 12px',
                    }}
                  >
                    Close
                  </button>
                </div>
                <img
                  src={selectedVisualAsset.src}
                  alt={selectedVisualAsset.alt}
                  style={{
                    maxWidth: '100%',
                    maxHeight: 'calc(100vh - 140px)',
                    objectFit: 'contain',
                    background: '#f4efe6',
                    border: '1px solid rgba(244, 239, 230, 0.28)',
                    boxShadow: '0 24px 90px rgba(0, 0, 0, 0.45)',
                  }}
                />
              </figure>
            </div>,
            document.body,
          )
        : null}
    </div>
  );
}
