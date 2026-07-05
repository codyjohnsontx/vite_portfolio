import PropTypes from 'prop-types';
import { useEffect, useMemo, useState } from 'react';
import { Link, Navigate, useParams } from 'react-router-dom';
import { ArrowGlyph, Eyebrow, StackRow } from '../components/Editorial';
import { Reveal } from '../components/ScrollReveal';
import { getProductAnalysisBySlug } from '../content/productAnalyses';
import { getProductBySlug } from '../content/projects';
import { getProductResearchBySlug } from '../content/productResearch';

const BASE_SECTIONS = [
  { id: 'overview', label: '01 Overview' },
  { id: 'workflow', label: '02 Workflow' },
  { id: 'bet', label: '03 Product bet' },
  { id: 'scope', label: '04 MVP scope' },
  { id: 'metrics', label: '05 Metrics' },
  { id: 'shipped', label: '06 Shipped' },
  { id: 'learnings', label: '07 Learnings' },
];

function getSections(hasRoadmap) {
  if (!hasRoadmap) return BASE_SECTIONS;

  return [
    ...BASE_SECTIONS.slice(0, 6),
    { id: 'roadmap', label: '07 Roadmap' },
    { id: 'learnings', label: '08 Learnings' },
  ];
}

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

AnalysisList.propTypes = {
  items: PropTypes.arrayOf(PropTypes.string).isRequired,
  className: PropTypes.string,
};

AnalysisList.defaultProps = {
  className: '',
};

export default function ProductAnalysisPage() {
  const { slug } = useParams();
  const product = getProductBySlug(slug);
  const analysis = getProductAnalysisBySlug(slug);
  const research = getProductResearchBySlug(slug);
  const sections = useMemo(() => getSections(Boolean(analysis?.roadmap)), [analysis?.roadmap]);
  const [active, setActive] = useState(BASE_SECTIONS[0].id);

  useEffect(() => {
    if (!product || !analysis) return undefined;

    const onScroll = () => {
      let current = sections[0].id;
      for (const section of sections) {
        const node = document.getElementById(section.id);
        if (node && node.getBoundingClientRect().top < 200) current = section.id;
      }
      setActive(current);
    };

    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, [analysis, product, sections]);

  if (!product || !analysis) return <Navigate to="/not-found" replace />;

  return (
    <div className="fade-in">
      <Reveal as="section" className="page-hero" duration={900}>
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
            <Reveal delay={80}>
              <Eyebrow>Summary</Eyebrow>
              <p className="body" style={{ marginTop: 12, maxWidth: '64ch', color: 'var(--ink)' }}>
                {analysis.summary}
              </p>
            </Reveal>
            <Reveal className="analysis-hero__meta" delay={180}>
              <div>
                <Eyebrow>Why this matters</Eyebrow>
                <div className="meta-row meta-row--stacked">
                  {[
                    ['Product bet', analysis.betHeading ?? 'Product bet'],
                    ['Measurement', analysis.metricsHeading ?? 'Measurement plan'],
                    ['No overclaim', analysis.users.buyer],
                  ].map(([label, value]) => (
                    <span key={label} className="meta-row__item">
                      <strong>{label}</strong>
                      {value}
                    </span>
                  ))}
                </div>
              </div>
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
              {research ? (
                <Link to={`/products/${product.slug}/research`} className="link-arrow">
                  View persona research <ArrowGlyph />
                </Link>
              ) : null}
            </Reveal>
          </div>
        </div>
      </Reveal>

      <section className="section section--tight">
        <div className="container pd-layout">
          <aside className="sidenav">
            {sections.map((section) => (
              <a
                key={section.id}
                href={`#${section.id}`}
                className={active === section.id ? 'active' : ''}
                aria-current={active === section.id ? 'page' : undefined}
              >
                <span className="dash" />
                {section.label}
              </a>
            ))}
          </aside>

          <div style={{ minWidth: 0 }}>
            <Reveal id="overview" style={{ marginBottom: 88 }}>
              <Eyebrow>01 — Overview</Eyebrow>
              <h2 className="h2" style={{ margin: '12px 0 20px' }}>
                The problem worth solving
              </h2>
              <p className="lead" style={{ margin: 0, color: 'var(--ink)' }}>
                {analysis.problem}
              </p>
              <div className="analysis-user-grid">
                <Reveal delay={0}>
                  <Eyebrow>Primary user</Eyebrow>
                  <p className="body" style={{ marginTop: 10 }}>{analysis.users.primary}</p>
                </Reveal>
                <Reveal delay={90}>
                  <Eyebrow>Secondary user</Eyebrow>
                  <p className="body" style={{ marginTop: 10 }}>{analysis.users.secondary}</p>
                </Reveal>
                <Reveal delay={180}>
                  <Eyebrow>Buyer</Eyebrow>
                  <p className="body" style={{ marginTop: 10 }}>{analysis.users.buyer}</p>
                </Reveal>
              </div>
            </Reveal>

            <Reveal id="workflow" style={{ marginBottom: 88 }}>
              <Eyebrow>02 — Workflow</Eyebrow>
              <h2 className="h2" style={{ margin: '12px 0 24px' }}>
                Current behavior and market gap
              </h2>
              <div className="analysis-dual-grid">
                <Reveal delay={100}>
                  <Eyebrow>Current workflow</Eyebrow>
                  <AnalysisList items={analysis.currentWorkflow} />
                </Reveal>
                <Reveal delay={180}>
                  <Eyebrow>Opportunity</Eyebrow>
                  <AnalysisList items={analysis.opportunity} />
                </Reveal>
              </div>
            </Reveal>

            <Reveal id="bet" style={{ marginBottom: 88 }}>
              <Eyebrow>03 — Product bet</Eyebrow>
              <h2 className="h2" style={{ margin: '12px 0 20px' }}>
                {analysis.betHeading ?? 'Win the trackside loop first'}
              </h2>
              <p className="lead" style={{ margin: 0, color: 'var(--ink)' }}>
                {analysis.productBet}
              </p>
            </Reveal>

            <Reveal id="scope" style={{ marginBottom: 88 }}>
              <Eyebrow>04 — MVP scope</Eyebrow>
              <h2 className="h2" style={{ margin: '12px 0 24px' }}>
                What shipped and what stayed out
              </h2>
              <div className="analysis-dual-grid">
                <Reveal delay={100}>
                  <Eyebrow>Shipped in MVP</Eyebrow>
                  <AnalysisList items={analysis.mvp.shipped} />
                </Reveal>
                <Reveal delay={180}>
                  <Eyebrow>Cut from MVP</Eyebrow>
                  <AnalysisList items={analysis.mvp.cut} />
                </Reveal>
              </div>
              <div style={{ marginTop: 40 }}>
                <Eyebrow>Prioritization</Eyebrow>
                <div className="priority-grid" role="list" aria-label={`${product.name} prioritization`}>
                  {analysis.priorities.map((item, index) => (
                    <Reveal
                      as="article"
                      key={item.initiative}
                      className="priority-card"
                      role="listitem"
                      delay={(index % 3) * 90}
                    >
                      <p className="priority-card__kicker">{item.value} value · {item.effort} effort</p>
                      <h3>{item.initiative}</h3>
                      <p>{item.decision}</p>
                    </Reveal>
                  ))}
                </div>
              </div>
            </Reveal>

            <Reveal id="metrics" style={{ marginBottom: 88 }}>
              <Eyebrow>05 — Metrics</Eyebrow>
              <h2 className="h2" style={{ margin: '12px 0 24px' }}>
                {analysis.metricsHeading ?? 'Measure whether the loop sticks'}
              </h2>
              <div className="metric-grid">
                {analysis.successMetrics.map((metric, index) => (
                  <Reveal
                    as="article"
                    key={metric.label}
                    className="metric-card"
                    delay={(index % 3) * 90}
                  >
                    <p className="metric-card__label">{metric.label}</p>
                    <p className="metric-card__body">{metric.detail}</p>
                  </Reveal>
                ))}
              </div>
              <Reveal className="analysis-observability" delay={100}>
                <Reveal delay={0}>
                  <Eyebrow>Event plan</Eyebrow>
                  <AnalysisList items={analysis.analyticsPlan.events} className="analysis-list--dense" />
                </Reveal>
                <Reveal delay={90}>
                  <Eyebrow>Core funnel</Eyebrow>
                  <AnalysisList items={analysis.analyticsPlan.funnel} className="analysis-list--dense" />
                </Reveal>
                <Reveal delay={180}>
                  <Eyebrow>Cohorts and dashboards</Eyebrow>
                  <AnalysisList
                    items={[
                      ...analysis.analyticsPlan.cohorts,
                      ...analysis.analyticsPlan.dashboards,
                    ]}
                    className="analysis-list--dense"
                  />
                </Reveal>
              </Reveal>
              <div style={{ marginTop: 28 }}>
                <Eyebrow>{analysis.analyticsPlan.observabilityLabel ?? 'AI observability'}</Eyebrow>
                <p className="body" style={{ marginTop: 10, maxWidth: '66ch' }}>
                  {analysis.analyticsPlan.observability}
                </p>
              </div>
            </Reveal>

            <Reveal id="shipped" style={{ marginBottom: 88 }}>
              <Eyebrow>06 — What shipped</Eyebrow>
              <h2 className="h2" style={{ margin: '12px 0 12px' }}>
                The milestones that changed the product
              </h2>
              <p
                className="body"
                style={{ marginTop: 0, marginBottom: 28, color: 'var(--ink-2)', maxWidth: '60ch' }}
              >
                {analysis.shippedIntro ??
                  'Fourteen pull requests landed in the first public build cycle. These are the ones that most clearly changed the product story, monetization path, and trust model.'}
              </p>
              {analysis.shippedHighlights.map((item, index) => (
                <Reveal as="article" key={item.label} className="update" delay={(index % 4) * 80}>
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
                </Reveal>
              ))}
              {analysis.decisionStory ? (
                <Reveal style={{ marginTop: 40 }}>
                  <Eyebrow>Problem -&gt; decision -&gt; outcome</Eyebrow>
                  <h3 className="h3" style={{ margin: '12px 0 20px' }}>
                    {analysis.decisionStory.heading}
                  </h3>
                  <div className="analysis-dual-grid">
                    {[
                      ['Problem', analysis.decisionStory.problem],
                      ['Decision', analysis.decisionStory.decision],
                      ['Outcome', analysis.decisionStory.outcome],
                    ].map(([label, body], index) => (
                      <Reveal
                        as="article"
                        key={label}
                        className="priority-card"
                        delay={index * 90}
                      >
                        <p className="priority-card__kicker">{label}</p>
                        <p>{body}</p>
                      </Reveal>
                    ))}
                  </div>
                </Reveal>
              ) : null}
            </Reveal>

            {analysis.roadmap ? (
              <Reveal id="roadmap" style={{ marginBottom: 88 }}>
                <Eyebrow>07 — Roadmap</Eyebrow>
                <h2 className="h2" style={{ margin: '12px 0 16px' }}>
                  {analysis.roadmap.heading}
                </h2>
                <p
                  className="body"
                  style={{ marginTop: 0, marginBottom: 28, color: 'var(--ink-2)', maxWidth: '66ch' }}
                >
                  {analysis.roadmap.intro}
                </p>
                <div
                  className="priority-grid"
                  role="list"
                  aria-label={`${product.name} roadmap phases`}
                >
                  {analysis.roadmap.phases.map((phase, index) => (
                    <Reveal
                      as="article"
                      key={phase.label}
                      className="priority-card"
                      role="listitem"
                      delay={(index % 3) * 90}
                    >
                      <p className="priority-card__kicker">{phase.horizon}</p>
                      <h3>{phase.label}</h3>
                      <ul style={{ margin: '14px 0 0', paddingLeft: 18 }}>
                        {phase.items.map((item) => (
                          <li key={item} className="body" style={{ color: 'var(--ink-2)', marginTop: 8 }}>
                            {item}
                          </li>
                        ))}
                      </ul>
                    </Reveal>
                  ))}
                </div>
                <div
                  className="analysis-dual-grid"
                  role="list"
                  aria-label={`${product.name} AI roadmap guardrails`}
                  style={{ marginTop: 32 }}
                >
                  {[
                    { item: analysis.roadmap.aiPrep, kicker: 'Foundation' },
                    { item: analysis.roadmap.laterAi, kicker: 'Later' },
                  ].filter(({ item }) => Boolean(item)).map(({ item, kicker }, index) => (
                    <Reveal
                      as="article"
                      key={item.label}
                      className="priority-card"
                      role="listitem"
                      delay={index * 90}
                    >
                      <p className="priority-card__kicker">{kicker}</p>
                      <h3>{item.label}</h3>
                      <p>{item.detail}</p>
                      {item.items?.length ? (
                        <ul style={{ margin: '14px 0 0', paddingLeft: 18 }}>
                          {item.items.map((subItem) => (
                            <li
                              key={subItem}
                              className="body"
                              style={{ color: 'var(--ink-2)', marginTop: 8 }}
                            >
                              {subItem}
                            </li>
                          ))}
                        </ul>
                      ) : null}
                    </Reveal>
                  ))}
                </div>
              </Reveal>
            ) : null}

            <Reveal id="learnings">
              <Eyebrow>{analysis.roadmap ? '08 — Learnings' : '07 — Learnings'}</Eyebrow>
              <h2 className="h2" style={{ margin: '12px 0 24px' }}>
                What changed my product view
              </h2>
              <AnalysisList items={analysis.learnings} />
              <div style={{ marginTop: 40 }}>
                <Eyebrow>Next iteration</Eyebrow>
                <AnalysisList items={analysis.nextIterations} />
              </div>
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
              <Link className="link-arrow" to={`/products/${product.slug}`}>
                ← Back to build
              </Link>
              {research ? (
                <Link className="link-arrow" to={`/products/${product.slug}/research`}>
                  View persona research <ArrowGlyph />
                </Link>
              ) : null}
              <a className="link-arrow" href="mailto:codyjohnsontx@gmail.com">
                Talk product strategy <ArrowGlyph />
              </a>
            </Reveal>
          </div>
        </div>
      </section>
    </div>
  );
}
