import PropTypes from 'prop-types';
import { useEffect, useState } from 'react';
import { Link, Navigate, useParams } from 'react-router-dom';
import { ArrowGlyph, Eyebrow } from '../components/Editorial';
import { Reveal } from '../components/ScrollReveal';
import { getProductAnalysisBySlug } from '../content/productAnalyses';
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
  const analysis = getProductAnalysisBySlug(slug);
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
  const headings = research.headings ?? {};

  return (
    <div className="fade-in">
      <Reveal as="section" className="page-hero research-hero" duration={900}>
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
            <Reveal delay={60} duration={920}>
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
              <div style={{ marginTop: 28, display: 'flex', flexWrap: 'wrap', gap: 16 }}>
                {analysis ? (
                  <Link to={`/products/${product.slug}/analysis`} className="link-arrow">
                    Read PM analysis <ArrowGlyph />
                  </Link>
                ) : null}
                <Link to={`/products/${product.slug}`} className="link-arrow">
                  Back to build <ArrowGlyph />
                </Link>
              </div>
            </Reveal>

            <Reveal
              className="research-hero__media"
              aria-label={`${product.name} product image`}
              delay={180}
              distance={26}
              duration={940}
            >
              <img src={product.image} alt={product.name} />
            </Reveal>
          </div>
        </div>
      </Reveal>

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
            <Reveal id="problem" className="research-section">
              <Reveal delay={0}>
                <Eyebrow>01 — Strategic problem</Eyebrow>
                <h2 className="h2">
                  {headings.problem ?? 'The research frames the product opportunity.'}
                </h2>
              </Reveal>
              <div className="research-dual">
                <Reveal as="p" className="lead" delay={100} style={{ margin: 0, color: 'var(--ink)' }}>
                  {research.strategicProblem}
                </Reveal>
                <Reveal className="research-note" delay={180}>
                  <Eyebrow>Design philosophy</Eyebrow>
                  <p>{research.designPhilosophy}</p>
                </Reveal>
              </div>
            </Reveal>

            <Reveal id="dimensions" className="research-section">
              <Reveal>
                <Eyebrow>02 — Persona dimensions</Eyebrow>
                <h2 className="h2">
                  {headings.dimensions ?? 'The framework defines the behaviors that shape product decisions.'}
                </h2>
              </Reveal>
              <div className="research-dimension-grid">
                {research.dimensions.map((dimension, index) => (
                  <Reveal
                    as="article"
                    key={dimension.label}
                    className="research-dimension"
                    delay={(index % 4) * 90}
                  >
                    <span className="research-dimension__index">0{index + 1}</span>
                    <h3>{dimension.label}</h3>
                    <p>{dimension.detail}</p>
                  </Reveal>
                ))}
              </div>
            </Reveal>

            <Reveal id="archetypes" className="research-section">
              <Reveal>
                <Eyebrow>03 — Archetypes</Eyebrow>
                <h2 className="h2">
                  {headings.archetypes ?? 'The launch segment is selected by frequency and pain.'}
                </h2>
              </Reveal>
              <Reveal className="research-persona-shell" delay={120}>
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
              </Reveal>
            </Reveal>

            <Reveal id="priority" className="research-section">
              <Reveal>
                <Eyebrow>04 — Feature priority</Eyebrow>
                <h2 className="h2">{headings.priority ?? 'A roadmap heatmap by persona value.'}</h2>
              </Reveal>
              <Reveal className="research-heatmap-wrap" delay={120}>
                <table className="research-heatmap">
                  <caption>
                    {research.matrix.caption ?? 'Feature prioritization matrix across persona segments.'}
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
              </Reveal>
            </Reveal>

            <Reveal id="insights" className="research-section">
              <Reveal>
                <Eyebrow>05 — Strategic insights</Eyebrow>
                <h2 className="h2">
                  {headings.insights ?? 'The personas clarify roadmap order and trust boundaries.'}
                </h2>
              </Reveal>
              <div className="research-insights">
                {research.strategicInsights.map((insight, index) => (
                  <Reveal
                    as="article"
                    key={insight.title}
                    className="research-insight"
                    delay={(index % 4) * 90}
                  >
                    <span className="numeral">0{index + 1}</span>
                    <div>
                      <h3>{insight.title}</h3>
                      <p>{insight.detail}</p>
                    </div>
                  </Reveal>
                ))}
              </div>
            </Reveal>

            <Reveal id="system" className="research-section">
              <Reveal>
                <Eyebrow>06 — Research system</Eyebrow>
                <h2 className="h2">{headings.system ?? 'What the next interviews should validate.'}</h2>
              </Reveal>
              <div className="analysis-dual-grid">
                <Reveal delay={100}>
                  <Eyebrow>Interview areas</Eyebrow>
                  <ResearchList items={research.researchSystem.interviewAreas} />
                </Reveal>
                <Reveal delay={180}>
                  <Eyebrow>Validation questions</Eyebrow>
                  <ResearchList items={research.researchSystem.validationQuestions} />
                </Reveal>
              </div>
            </Reveal>

            <Reveal className="research-footer">
              <Link className="link-arrow" to={`/products/${product.slug}`}>
                ← Back to {product.name}
              </Link>
              <a className="link-arrow" href="mailto:codyjohnsontx@gmail.com">
                Talk product research <ArrowGlyph />
              </a>
            </Reveal>
          </div>
        </div>
      </section>
    </div>
  );
}
