import { useEffect, useRef, useState } from 'react';
import { createPortal } from 'react-dom';
import { Link, Navigate, useParams } from 'react-router-dom';
import { ArrowGlyph, Eyebrow, StackRow } from '../components/Editorial';
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
      if (event.key === 'Escape') setSelectedVisualAsset(null);
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
      <section className="page-hero">
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
        </div>
      </section>

      {p.image ? (
        <div style={{ borderBottom: '1px solid var(--rule)' }}>
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
        </div>
      ) : null}

      {p.visualAssets?.items?.length ? (
        <section className="section section--tight" style={{ borderBottom: '1px solid var(--rule)' }}>
          <div className="container">
            <Eyebrow>Visual proof</Eyebrow>
            <h2 className="h2" style={{ margin: '12px 0 12px' }}>
              Seeded demo dashboard
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
              {p.visualAssets.items.map((asset) => (
                <figure
                  key={asset.src}
                  style={{
                    margin: 0,
                    border: '1px solid var(--rule-2)',
                    background: 'var(--bg-2)',
                    padding: 'clamp(10px, 2vw, 18px)',
                  }}
                >
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
                  <figcaption
                    className="mono small uppercase"
                    style={{ marginTop: 12, color: 'var(--ink-3)' }}
                  >
                    {asset.label}
                  </figcaption>
                </figure>
              ))}
            </div>
          </div>
        </section>
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
            <div id="overview" style={{ marginBottom: 80 }}>
              <Eyebrow>01 — Overview</Eyebrow>
              <h2 className="h2" style={{ margin: '12px 0 24px' }}>
                The problem
              </h2>
              <p className="lead" style={{ margin: 0, color: 'var(--ink)' }}>
                {p.problem}
              </p>
              <div className="pd-grid">
                <div>
                  <Eyebrow>Audience</Eyebrow>
                  <p className="body" style={{ marginTop: 8 }}>{p.audience}</p>
                </div>
                <div>
                  <Eyebrow>Job to be done</Eyebrow>
                  <p className="body" style={{ marginTop: 8 }}>{p.jtbd}</p>
                </div>
              </div>
            </div>

            <div id="workflow" style={{ marginBottom: 80 }}>
              <Eyebrow>02 — Workflow</Eyebrow>
              <h2 className="h2" style={{ margin: '12px 0 24px' }}>
                How it works end-to-end
              </h2>
              <ol style={{ margin: 0, padding: 0, listStyle: 'none' }}>
                {p.coreWorkflow.map((step, i) => (
                  <li
                    key={step}
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
                  </li>
                ))}
              </ol>
            </div>

            <div id="scope" style={{ marginBottom: 80 }}>
              <Eyebrow>03 — MVP scope</Eyebrow>
              <h2 className="h2" style={{ margin: '12px 0 24px' }}>
                What ships first
              </h2>
              <ul style={{ margin: 0, padding: 0, listStyle: 'none' }}>
                {p.mvpScope.map((s, i) => (
                  <li
                    key={s}
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
                  </li>
                ))}
              </ul>
            </div>

            <div id="updates" style={{ marginBottom: 80 }}>
              <Eyebrow>04 — Updates</Eyebrow>
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
                <article key={u.url || u.id || u.title || `update-${i}`} className="update">
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
                </article>
              ))}
              {!p.updates?.length ? (
                <p className="body italic" style={{ color: 'var(--ink-3)' }}>
                  No updates yet.
                </p>
              ) : null}
            </div>

            <div id="whats-next">
              <Eyebrow>05 — What&rsquo;s next</Eyebrow>
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
            </div>

            <div
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
            </div>
          </div>
        </div>
      </section>

      {selectedVisualAsset
        ? createPortal(
            <div
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
