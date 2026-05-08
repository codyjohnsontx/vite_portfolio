import { useEffect, useState } from 'react';
import { Link, Navigate, useParams } from 'react-router-dom';
import { ArrowGlyph, Eyebrow, StackRow } from '../components/Editorial';
import { getProductAnalysisBySlug } from '../content/productAnalyses';
import { getProductBySlug } from '../content/projects';

const SECTIONS = [
  { id: 'overview', label: '01 Overview' },
  { id: 'workflow', label: '02 Workflow' },
  { id: 'bet', label: '03 Product bet' },
  { id: 'scope', label: '04 MVP scope' },
  { id: 'metrics', label: '05 Metrics' },
  { id: 'shipped', label: '06 Shipped' },
  { id: 'learnings', label: '07 Learnings' },
];

function AnalysisList({ items, className = '' }) {
  if (!items?.length) return null;

  return (
    <ul className={`analysis-list ${className}`.trim()}>
      {items.map((item, index) => (
        <li key={item}>
          <span className="mono small" style={{ color: 'var(--ink-3)', minWidth: 36 }}>
            0{index + 1}
          </span>
          <span className="body" style={{ color: 'var(--ink)' }}>
            {item}
          </span>
        </li>
      ))}
    </ul>
  );
}

export default function ProductAnalysisPage() {
  const { slug } = useParams();
  const product = getProductBySlug(slug);
  const analysis = getProductAnalysisBySlug(slug);
  const [active, setActive] = useState(SECTIONS[0].id);

  useEffect(() => {
    if (!product || !analysis) return undefined;

    const onScroll = () => {
      let current = SECTIONS[0].id;
      for (const section of SECTIONS) {
        const node = document.getElementById(section.id);
        if (node && node.getBoundingClientRect().top < 200) current = section.id;
      }
      setActive(current);
    };

    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, [analysis, product]);

  if (!product || !analysis) return <Navigate to="/not-found" replace />;

  return (
    <div className="fade-in">
      <section className="page-hero">
        <div className="container">
          <div className="crumbs">
            <Link to="/">Index</Link>
            <span>/</span>
            <Link to="/products">Products</Link>
            <span>/</span>
            <Link to={`/products/${product.slug}`}>{product.name}</Link>
            <span>/</span>
            <span>Analysis</span>
          </div>
          <h1
            className="display"
            style={{ margin: 0, fontSize: 'clamp(44px, 6vw, 92px)' }}
          >
            {analysis.title}
          </h1>
          <p className="lead" style={{ marginTop: 24, maxWidth: '60ch' }}>
            {analysis.tagline}
          </p>
          <div className="analysis-hero">
            <div>
              <Eyebrow>Summary</Eyebrow>
              <p className="body" style={{ marginTop: 12, maxWidth: '64ch', color: 'var(--ink)' }}>
                {analysis.summary}
              </p>
            </div>
            <div className="analysis-hero__meta">
              <div>
                <Eyebrow>Build</Eyebrow>
                <p className="body" style={{ margin: '8px 0 0', color: 'var(--ink)' }}>
                  {product.oneLiner}
                </p>
              </div>
              <div>
                <Eyebrow>Stack</Eyebrow>
                <div style={{ marginTop: 12 }}>
                  <StackRow items={product.stack} />
                </div>
              </div>
              <Link to={`/products/${product.slug}`} className="link-arrow">
                Back to build <ArrowGlyph />
              </Link>
            </div>
          </div>
        </div>
      </section>

      <section className="section section--tight">
        <div className="container pd-layout">
          <aside className="sidenav">
            {SECTIONS.map((section) => (
              <a
                key={section.id}
                href={`#${section.id}`}
                className={active === section.id ? 'active' : ''}
              >
                <span className="dash" />
                {section.label}
              </a>
            ))}
          </aside>

          <div style={{ minWidth: 0 }}>
            <div id="overview" style={{ marginBottom: 88 }}>
              <Eyebrow>01 — Overview</Eyebrow>
              <h2 className="h2" style={{ margin: '12px 0 20px' }}>
                The problem worth solving
              </h2>
              <p className="lead" style={{ margin: 0, color: 'var(--ink)' }}>
                {analysis.problem}
              </p>
              <div className="analysis-user-grid">
                <div>
                  <Eyebrow>Primary user</Eyebrow>
                  <p className="body" style={{ marginTop: 10 }}>{analysis.users.primary}</p>
                </div>
                <div>
                  <Eyebrow>Secondary user</Eyebrow>
                  <p className="body" style={{ marginTop: 10 }}>{analysis.users.secondary}</p>
                </div>
                <div>
                  <Eyebrow>Buyer</Eyebrow>
                  <p className="body" style={{ marginTop: 10 }}>{analysis.users.buyer}</p>
                </div>
              </div>
            </div>

            <div id="workflow" style={{ marginBottom: 88 }}>
              <Eyebrow>02 — Workflow</Eyebrow>
              <h2 className="h2" style={{ margin: '12px 0 24px' }}>
                Current behavior and market gap
              </h2>
              <div className="analysis-dual-grid">
                <div>
                  <Eyebrow>Current workflow</Eyebrow>
                  <AnalysisList items={analysis.currentWorkflow} />
                </div>
                <div>
                  <Eyebrow>Opportunity</Eyebrow>
                  <AnalysisList items={analysis.opportunity} />
                </div>
              </div>
            </div>

            <div id="bet" style={{ marginBottom: 88 }}>
              <Eyebrow>03 — Product bet</Eyebrow>
              <h2 className="h2" style={{ margin: '12px 0 20px' }}>
                Win the trackside loop first
              </h2>
              <p className="lead" style={{ margin: 0, color: 'var(--ink)' }}>
                {analysis.productBet}
              </p>
            </div>

            <div id="scope" style={{ marginBottom: 88 }}>
              <Eyebrow>04 — MVP scope</Eyebrow>
              <h2 className="h2" style={{ margin: '12px 0 24px' }}>
                What shipped and what stayed out
              </h2>
              <div className="analysis-dual-grid">
                <div>
                  <Eyebrow>Shipped in MVP</Eyebrow>
                  <AnalysisList items={analysis.mvp.shipped} />
                </div>
                <div>
                  <Eyebrow>Cut from MVP</Eyebrow>
                  <AnalysisList items={analysis.mvp.cut} />
                </div>
              </div>
              <div style={{ marginTop: 40 }}>
                <Eyebrow>Prioritization</Eyebrow>
                <div className="priority-grid" role="table" aria-label="Track Tuner prioritization">
                  {analysis.priorities.map((item) => (
                    <article key={item.initiative} className="priority-card">
                      <p className="priority-card__kicker">{item.value} value · {item.effort} effort</p>
                      <h3>{item.initiative}</h3>
                      <p>{item.decision}</p>
                    </article>
                  ))}
                </div>
              </div>
            </div>

            <div id="metrics" style={{ marginBottom: 88 }}>
              <Eyebrow>05 — Metrics</Eyebrow>
              <h2 className="h2" style={{ margin: '12px 0 24px' }}>
                Measure whether the loop sticks
              </h2>
              <div className="metric-grid">
                {analysis.successMetrics.map((metric) => (
                  <article key={metric.label} className="metric-card">
                    <p className="metric-card__label">{metric.label}</p>
                    <p className="metric-card__body">{metric.detail}</p>
                  </article>
                ))}
              </div>
              <div className="analysis-observability">
                <div>
                  <Eyebrow>Event plan</Eyebrow>
                  <AnalysisList items={analysis.analyticsPlan.events} className="analysis-list--dense" />
                </div>
                <div>
                  <Eyebrow>Core funnel</Eyebrow>
                  <AnalysisList items={analysis.analyticsPlan.funnel} className="analysis-list--dense" />
                </div>
                <div>
                  <Eyebrow>Cohorts and dashboards</Eyebrow>
                  <AnalysisList
                    items={[
                      ...analysis.analyticsPlan.cohorts,
                      ...analysis.analyticsPlan.dashboards,
                    ]}
                    className="analysis-list--dense"
                  />
                </div>
              </div>
              <div style={{ marginTop: 28 }}>
                <Eyebrow>AI observability</Eyebrow>
                <p className="body" style={{ marginTop: 10, maxWidth: '66ch' }}>
                  {analysis.analyticsPlan.observability}
                </p>
              </div>
            </div>

            <div id="shipped" style={{ marginBottom: 88 }}>
              <Eyebrow>06 — What shipped</Eyebrow>
              <h2 className="h2" style={{ margin: '12px 0 12px' }}>
                The milestones that changed the product
              </h2>
              <p
                className="body"
                style={{ marginTop: 0, marginBottom: 28, color: 'var(--ink-2)', maxWidth: '60ch' }}
              >
                Fourteen pull requests landed in the first public build cycle. These are the ones that most clearly changed the product story, monetization path, and trust model.
              </p>
              {analysis.shippedHighlights.map((item) => (
                <article key={item.label} className="update">
                  <div className="update__body">
                    <p className="update__meta">{item.label}</p>
                    <h4>
                      {item.url ? (
                        <a href={item.url} target="_blank" rel="noreferrer">
                          {item.detail}
                        </a>
                      ) : (
                        item.detail
                      )}
                    </h4>
                  </div>
                </article>
              ))}
            </div>

            <div id="learnings">
              <Eyebrow>07 — Learnings</Eyebrow>
              <h2 className="h2" style={{ margin: '12px 0 24px' }}>
                What changed my product view
              </h2>
              <AnalysisList items={analysis.learnings} />
              <div style={{ marginTop: 40 }}>
                <Eyebrow>Next iteration</Eyebrow>
                <AnalysisList items={analysis.nextIterations} />
              </div>
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
              <Link className="link-arrow" to={`/products/${product.slug}`}>
                ← Back to build
              </Link>
              <a className="link-arrow" href="mailto:codyjohnsontx@gmail.com">
                Talk product strategy <ArrowGlyph />
              </a>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

