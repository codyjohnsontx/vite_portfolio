import { Link } from 'react-router-dom';
import { ArrowGlyph, Eyebrow } from '../components/Editorial';
import { caseStudies } from '../content/caseStudies';

export default function CaseStudyIndexPage() {
  return (
    <div className="fade-in">
      <section className="page-hero">
        <div className="container">
          <div className="crumbs">
            <Link to="/">Index</Link>
            <span>/</span>
            <span>Case Studies</span>
          </div>
          <h1 className="display" style={{ margin: 0 }}>
            Case <span className="italic">studies</span>.
          </h1>
          <p className="lead" style={{ marginTop: 24, maxWidth: '60ch' }}>
            Two long-form write-ups. The work itself, the constraints, the calls I made, what I
            would do differently next time.
          </p>
        </div>
      </section>

      <section className="section">
        <div className="container">
          {caseStudies.map((c, i) => (
            <Link
              key={c.slug}
              to={`/case-studies/${c.slug}`}
              className="case-row"
            >
              <span className="numeral" style={{ fontSize: 60 }}>
                0{i + 1}
              </span>
              <div>
                <Eyebrow>
                  {c.company} · {c.timeframe}
                </Eyebrow>
                <h2 className="h2" style={{ margin: '8px 0 12px' }}>
                  {c.title}
                </h2>
                <p
                  className="body"
                  style={{ color: 'var(--ink-2)', maxWidth: '70ch', margin: 0 }}
                >
                  {c.tagline}
                </p>
              </div>
              <div className="case-row__cta" style={{ textAlign: 'right' }}>
                <span className="link-arrow" style={{ borderColor: 'transparent' }}>
                  Read <ArrowGlyph />
                </span>
              </div>
            </Link>
          ))}
        </div>
      </section>
    </div>
  );
}
