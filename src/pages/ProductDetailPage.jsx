import { useEffect, useState } from 'react';
import { Link, Navigate, useParams } from 'react-router-dom';
import { ArrowGlyph, Eyebrow, StackRow } from '../components/Editorial';
import { getProductBySlug } from '../content/projects';

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

  if (!product) return <Navigate to="/not-found" replace />;
  const p = product;
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
              {(p.updates ?? []).map((u) => (
                <article key={`${u.date}-${u.tag}-${u.title}`} className="update">
                  <div className="update__body">
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
    </div>
  );
}
