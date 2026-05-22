import PropTypes from 'prop-types';
import { useEffect, useState } from 'react';
import { Link, Navigate, useParams } from 'react-router-dom';
import { ArrowGlyph, Eyebrow } from '../components/Editorial';
import { getProductBySlug } from '../content/projects';
import { getProductResearchBySlug } from '../content/productResearch';

const SECTIONS = [
  { id: 'problem', label: '01 Problem' },
  { id: 'dimensions', label: '02 Dimensions' },
  { id: 'archetypes', label: '03 Archetypes' },
  { id: 'priority', label: '04 Priority' },
  { id: 'insights', label: '05 Insights' },
  { id: 'system', label: '06 Research' },
];

const valueClass = {
  High: 'research-heatmap__value--high',
  Medium: 'research-heatmap__value--medium',
  Low: 'research-heatmap__value--low',
};

function ResearchList({ items }) {
  return (
    <ul className="research-list">
      {items.map((item, index) => (
        <li key={item}>
          <span className="mono small">0{index + 1}</span>
          <span>{item}</span>
        </li>
      ))}
    </ul>
  );
}

ResearchList.propTypes = {
  items: PropTypes.arrayOf(PropTypes.string).isRequired,
};

export default function ProductResearchPage() {
  const { slug } = useParams();
  const product = getProductBySlug(slug);
  const research = getProductResearchBySlug(slug);
  const [activeSection, setActiveSection] = useState(SECTIONS[0].id);
  const [activePersona, setActivePersona] = useState(0);
  const archetypes = Array.isArray(research?.archetypes) ? research.archetypes : [];

  useEffect(() => {
    if (!product || !research) return undefined;

    const onScroll = () => {
      let current = SECTIONS[0].id;
      for (const section of SECTIONS) {
        const node = document.getElementById(section.id);
        if (node && node.getBoundingClientRect().top < 200) current = section.id;
      }
      setActiveSection(current);
    };

    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, [product, research]);

  useEffect(() => {
    if (archetypes.length > 0 && (activePersona < 0 || activePersona >= archetypes.length)) {
      setActivePersona(0);
    }
  }, [activePersona, archetypes.length]);

  if (!product || !research) return <Navigate to="/not-found" replace />;

  const selectedPersona = archetypes[activePersona] ?? archetypes[0] ?? null;

  return (
    <div className="fade-in">
      <section className="page-hero research-hero">
        <div className="container">
          <div className="crumbs">
            <Link to="/">Index</Link>
            <span>/</span>
            <Link to="/products">Products</Link>
            <span>/</span>
            <Link to={`/products/${product.slug}`}>{product.name}</Link>
            <span>/</span>
            <span>Research</span>
          </div>

          <div className="research-hero__grid">
            <div>
              <Eyebrow>Product strategy case study</Eyebrow>
              <h1
                className="display"
                style={{ margin: '14px 0 0', fontSize: 'clamp(44px, 6vw, 96px)' }}
              >
                {research.title}
              </h1>
              <p className="lead" style={{ marginTop: 24, maxWidth: '62ch' }}>
                {research.tagline}
              </p>
              <p className="body" style={{ marginTop: 18, maxWidth: '68ch' }}>
                {research.summary}
              </p>
              <div className="research-proof" aria-label="Research proof points">
                {research.proofPoints.map((point) => (
                  <span key={point}>{point}</span>
                ))}
              </div>
              <div style={{ marginTop: 28, display: 'flex', flexWrap: 'wrap', gap: 16 }}>
                <Link to={`/products/${product.slug}/analysis`} className="link-arrow">
                  Read PM analysis <ArrowGlyph />
                </Link>
                <Link to={`/products/${product.slug}`} className="link-arrow">
                  Back to build <ArrowGlyph />
                </Link>
              </div>
            </div>

            <div className="research-hero__media" aria-label={`${product.name} product image`}>
              <img src={product.image} alt={product.name} />
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
                className={activeSection === section.id ? 'active' : ''}
                aria-current={activeSection === section.id ? 'page' : undefined}
              >
                <span className="dash" />
                {section.label}
              </a>
            ))}
          </aside>

          <div style={{ minWidth: 0 }}>
            <div id="problem" className="research-section">
              <Eyebrow>01 — Strategic problem</Eyebrow>
              <h2 className="h2">The opportunity sits between memory and telemetry.</h2>
              <div className="research-dual">
                <p className="lead" style={{ margin: 0, color: 'var(--ink)' }}>
                  {research.strategicProblem}
                </p>
                <div className="research-note">
                  <Eyebrow>Design philosophy</Eyebrow>
                  <p>{research.designPhilosophy}</p>
                </div>
              </div>
            </div>

            <div id="dimensions" className="research-section">
              <Eyebrow>02 — Persona dimensions</Eyebrow>
              <h2 className="h2">A compact atlas for reading trackside behavior.</h2>
              <div className="research-dimension-grid">
                {research.dimensions.map((dimension, index) => (
                  <article key={dimension.label} className="research-dimension">
                    <span className="research-dimension__index">0{index + 1}</span>
                    <h3>{dimension.label}</h3>
                    <p>{dimension.detail}</p>
                  </article>
                ))}
              </div>
            </div>

            <div id="archetypes" className="research-section">
              <Eyebrow>03 — Archetypes</Eyebrow>
              <h2 className="h2">The launch segment is selected by frequency and pain.</h2>
              <div className="research-persona-shell">
                <div className="research-persona-tabs" role="tablist" aria-label="Persona archetypes">
                  {archetypes.map((persona, index) => (
                    <button
                      key={persona.name}
                      type="button"
                      role="tab"
                      aria-selected={activePersona === index}
                      className={activePersona === index ? 'is-active' : ''}
                      onClick={() => setActivePersona(index)}
                    >
                      <span>{persona.name}</span>
                      <small>{persona.segment}</small>
                    </button>
                  ))}
                </div>
                {selectedPersona ? (
                  <article className="research-persona" role="tabpanel">
                    <Eyebrow>{selectedPersona.segment} segment</Eyebrow>
                    <h3>{selectedPersona.name}</h3>
                    <p className="research-persona__summary">{selectedPersona.summary}</p>
                    <div className="research-persona__grid">
                      <div>
                        <Eyebrow>Goals</Eyebrow>
                        <ResearchList items={selectedPersona.goals} />
                      </div>
                      <div>
                        <Eyebrow>Pain points</Eyebrow>
                        <ResearchList items={selectedPersona.painPoints} />
                      </div>
                      <div>
                        <Eyebrow>Opportunities</Eyebrow>
                        <ResearchList items={selectedPersona.opportunities} />
                      </div>
                      <div>
                        <Eyebrow>Feature priorities</Eyebrow>
                        <ResearchList items={selectedPersona.featurePriorities} />
                      </div>
                    </div>
                    <div className="research-persona__meaning">
                      <div>
                        <Eyebrow>JTBD</Eyebrow>
                        <p>{selectedPersona.jtbd}</p>
                      </div>
                      <div>
                        <Eyebrow>Product meaning</Eyebrow>
                        <p>{selectedPersona.productMeaning}</p>
                      </div>
                    </div>
                  </article>
                ) : null}
              </div>
            </div>

            <div id="priority" className="research-section">
              <Eyebrow>04 — Feature priority</Eyebrow>
              <h2 className="h2">A roadmap heatmap by persona value.</h2>
              <div className="research-heatmap-wrap">
                <table className="research-heatmap">
                  <caption>
                    Feature prioritization matrix across Beginner, Amateur, Engineer, Social, Coach,
                    and Organizer segments.
                  </caption>
                  <thead>
                    <tr>
                      <th scope="col">Feature</th>
                      {research.matrix.personas.map((persona) => (
                        <th key={persona} scope="col">{persona}</th>
                      ))}
                    </tr>
                  </thead>
                  <tbody>
                    {research.matrix.features.map((feature) => (
                      <tr key={feature.label}>
                        <th scope="row">{feature.label}</th>
                        {feature.values.map((value, index) => (
                          <td key={`${feature.label}-${research.matrix.personas[index]}`}>
                            <span className={`research-heatmap__value ${valueClass[value]}`}>
                              {value}
                            </span>
                          </td>
                        ))}
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>

            <div id="insights" className="research-section">
              <Eyebrow>05 — Strategic insights</Eyebrow>
              <h2 className="h2">The personas clarify roadmap order and trust boundaries.</h2>
              <div className="research-insights">
                {research.strategicInsights.map((insight, index) => (
                  <article key={insight.title} className="research-insight">
                    <span className="numeral">0{index + 1}</span>
                    <div>
                      <h3>{insight.title}</h3>
                      <p>{insight.detail}</p>
                    </div>
                  </article>
                ))}
              </div>
            </div>

            <div id="system" className="research-section">
              <Eyebrow>06 — Research system</Eyebrow>
              <h2 className="h2">What the next interviews should validate.</h2>
              <div className="analysis-dual-grid">
                <div>
                  <Eyebrow>Interview areas</Eyebrow>
                  <ResearchList items={research.researchSystem.interviewAreas} />
                </div>
                <div>
                  <Eyebrow>Validation questions</Eyebrow>
                  <ResearchList items={research.researchSystem.validationQuestions} />
                </div>
              </div>
            </div>

            <div className="research-footer">
              <Link className="link-arrow" to={`/products/${product.slug}`}>
                ← Back to Track Tuner
              </Link>
              <a className="link-arrow" href="mailto:codyjohnsontx@gmail.com">
                Talk product research <ArrowGlyph />
              </a>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
