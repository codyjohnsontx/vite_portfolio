import { Link } from 'react-router-dom';
import { Eyebrow } from '../components/Editorial';
import { experience } from '../content/experience';
import { products } from '../content/projects';
import { resumeContent } from '../content/resumeContent';

export default function ResumePage() {
  const r = resumeContent;
  const featuredProducts = products
    .filter((p) => p.tier === 'flagship' || p.tier === 'concept')
    .slice(0, 4);

  return (
    <div className="fade-in">
      <section className="page-hero">
        <div className="container">
          <div className="crumbs">
            <Link to="/">Index</Link>
            <span>/</span>
            <span>Resume</span>
          </div>
          <div
            style={{
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'baseline',
              flexWrap: 'wrap',
              gap: 16,
            }}
          >
            <h1 className="display" style={{ margin: 0 }}>
              Resume.
            </h1>
            <span className="mono small uppercase">Last updated · Apr 2026</span>
          </div>
          <p className="lead" style={{ marginTop: 24, maxWidth: '60ch' }}>
            Cody Johnson — Product Manager, Austin, TX. PSPO I. Open to roles.
          </p>
        </div>
      </section>

      <section className="section">
        <div className="container">
          <div className="r-grid">
            <Eyebrow>Summary</Eyebrow>
            <div>
              {r.summary.map((p, i) => (
                <p
                  key={p}
                  className="lead"
                  style={{ margin: i === 0 ? 0 : '16px 0 0', color: 'var(--ink)' }}
                >
                  {p}
                </p>
              ))}
            </div>
          </div>

          <div className="r-grid">
            <Eyebrow>Strengths</Eyebrow>
            <div className="strengths-grid">
              {r.strengths.map((g) => (
                <div key={g.label}>
                  <h3 className="h3" style={{ margin: '0 0 12px', fontSize: 18 }}>
                    {g.label}
                  </h3>
                  <ul style={{ margin: 0, padding: 0, listStyle: 'none' }}>
                    {g.items.map((it) => (
                      <li
                        key={it}
                        style={{
                          fontFamily: 'var(--mono)',
                          fontSize: 12,
                          letterSpacing: '0.06em',
                          color: 'var(--ink-2)',
                          padding: '4px 0',
                        }}
                      >
                        {it}
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </div>

          <div className="r-grid">
            <Eyebrow>Experience</Eyebrow>
            <div>
              {experience.map((e) => (
                <article key={`${e.company}-${e.role}`} className="exp-row">
                  <div>
                    <h3 className="role">{e.role}</h3>
                    <p className="company">{e.company}</p>
                    <p className="dates">{e.dates}</p>
                  </div>
                  <div>
                    <ul>
                      {e.evidence.map((b) => (
                        <li key={b}>{b}</li>
                      ))}
                    </ul>
                  </div>
                  <div className="right">
                    {e.tags.map((t) => (
                      <span key={t}>{t}</span>
                    ))}
                  </div>
                </article>
              ))}
            </div>
          </div>

          <div className="r-grid">
            <Eyebrow>Selected products</Eyebrow>
            <div>
              {featuredProducts.map((p, i) => (
                <div
                  key={p.slug}
                  style={{
                    padding: '14px 0',
                    borderTop: '1px solid var(--rule-2)',
                    display: 'grid',
                    gridTemplateColumns: '32px 1fr auto',
                    gap: 16,
                    alignItems: 'baseline',
                  }}
                >
                  <span className="mono small" style={{ color: 'var(--ink-3)' }}>
                    0{i + 1}
                  </span>
                  <span>
                    <span style={{ fontFamily: 'var(--serif)', fontSize: 19 }}>
                      {p.name}
                    </span>{' '}
                    <span
                      className="italic"
                      style={{ color: 'var(--ink-3)', fontFamily: 'var(--serif)' }}
                    >
                      — {p.oneLiner}
                    </span>
                  </span>
                  <Link
                    to={`/products/${p.slug}`}
                    className="mono small uppercase"
                    style={{ color: 'var(--ink-3)' }}
                  >
                    Open ↗
                  </Link>
                </div>
              ))}
            </div>
          </div>

          <div className="r-grid" style={{ marginBottom: 0 }}>
            <Eyebrow>Credentials</Eyebrow>
            <ul style={{ margin: 0, padding: 0, listStyle: 'none' }}>
              {r.credentials.map((c) => (
                <li
                  key={c}
                  style={{
                    padding: '10px 0',
                    borderTop: '1px solid var(--rule-2)',
                    fontFamily: 'var(--serif)',
                    fontSize: 18,
                    letterSpacing: '-0.005em',
                  }}
                >
                  {c}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>
    </div>
  );
}
