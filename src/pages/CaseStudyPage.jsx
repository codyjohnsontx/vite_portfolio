import { Link, Navigate, useParams } from 'react-router-dom';
import { ArrowGlyph, Eyebrow } from '../components/Editorial';
import { getCaseStudyBySlug } from '../content/caseStudies';

function CaseSection({ num, title, body }) {
  return (
    <section className="section section--tight">
      <div className="container case-section-grid">
        <div>
          <span className="numeral" style={{ fontSize: 'clamp(48px, 6vw, 84px)' }}>
            {num}
          </span>
        </div>
        <div>
          <h2 className="h2" style={{ margin: '0 0 16px' }}>
            {title}
          </h2>
          <p className="lead" style={{ margin: 0, maxWidth: '60ch', color: 'var(--ink)' }}>
            {body}
          </p>
        </div>
        <div />
      </div>
    </section>
  );
}

function CaseListSection({ num, title, items }) {
  if (!items?.length) return null;
  return (
    <section className="section section--tight">
      <div className="container case-section-grid">
        <div>
          <span className="numeral" style={{ fontSize: 'clamp(48px, 6vw, 84px)' }}>
            {num}
          </span>
        </div>
        <div>
          <h2 className="h2" style={{ margin: '0 0 24px' }}>
            {title}
          </h2>
          <ul style={{ margin: 0, padding: 0, listStyle: 'none' }}>
            {items.map((it, i) => (
              <li
                key={it}
                style={{
                  padding: '18px 0',
                  borderTop: '1px solid var(--rule-2)',
                  display: 'flex',
                  gap: 20,
                  alignItems: 'baseline',
                }}
              >
                <span
                  className="mono small"
                  style={{ color: 'var(--ink-3)', minWidth: 32 }}
                >
                  0{i + 1}
                </span>
                <span
                  className="body"
                  style={{ color: 'var(--ink)', fontSize: 17, lineHeight: 1.5 }}
                >
                  {it}
                </span>
              </li>
            ))}
          </ul>
        </div>
        <div />
      </div>
    </section>
  );
}

export default function CaseStudyPage() {
  const { slug } = useParams();
  const study = getCaseStudyBySlug(slug);

  if (!study) return <Navigate to="/not-found" replace />;
  const c = study;
  const s = c.sections;

  return (
    <div className="fade-in">
      <section className="page-hero">
        <div className="container">
          <div className="crumbs">
            <Link to="/">Index</Link>
            <span>/</span>
            <Link to="/case-studies">Case Studies</Link>
            <span>/</span>
            <span>{c.company}</span>
          </div>
          <Eyebrow>
            {c.company} · {c.timeframe} · {c.role}
          </Eyebrow>
          <h1
            className="display"
            style={{ margin: '24px 0 0', fontSize: 'clamp(40px, 5.6vw, 84px)' }}
          >
            {c.title}
          </h1>
          <p className="lead" style={{ marginTop: 24, maxWidth: '60ch' }}>
            {c.tagline}
          </p>
        </div>
      </section>

      <section className="section">
        <div className="container">
          <div className="case-stats">
            <div style={{ borderTop: '1px solid var(--rule)', paddingTop: 20 }}>
              <Eyebrow>Team</Eyebrow>
              <p className="body" style={{ margin: '8px 0 0', color: 'var(--ink)' }}>
                {c.team}
              </p>
            </div>
            <div style={{ borderTop: '1px solid var(--rule)', paddingTop: 20 }}>
              <Eyebrow>Role</Eyebrow>
              <p className="body" style={{ margin: '8px 0 0', color: 'var(--ink)' }}>
                {c.role}
              </p>
            </div>
            <div style={{ borderTop: '1px solid var(--rule)', paddingTop: 20 }}>
              <Eyebrow>Outcome</Eyebrow>
              <p className="body" style={{ margin: '8px 0 0', color: 'var(--ink)' }}>
                {c.featuredOutcome}
              </p>
            </div>
          </div>

          <div className="case-grid-2">
            <div>
              <Eyebrow>Challenge</Eyebrow>
              <p className="lead drop-cap" style={{ marginTop: 16, color: 'var(--ink)' }}>
                {c.challenge}
              </p>
            </div>
            <div>
              <Eyebrow>Impact highlights</Eyebrow>
              <ul style={{ marginTop: 16, padding: 0, listStyle: 'none' }}>
                {c.impactHighlights.map((h, i) => (
                  <li
                    key={h}
                    style={{
                      padding: '14px 0',
                      borderTop: '1px solid var(--rule-2)',
                      display: 'flex',
                      gap: 16,
                      alignItems: 'baseline',
                    }}
                  >
                    <span className="mono small" style={{ color: 'var(--ink-3)' }}>
                      0{i + 1}
                    </span>
                    <span className="body" style={{ color: 'var(--ink)' }}>{h}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>

      <CaseSection num="01" title="Context" body={s.context} />
      <CaseSection num="02" title="The problem" body={s.problem} />
      <CaseSection num="03" title="The goal" body={s.goal} />

      <CaseListSection num="04" title="Decisions" items={s.decisions} />
      <CaseListSection num="05" title="Tradeoffs" items={s.tradeoffs} />
      <CaseListSection num="06" title="Execution" items={s.execution} />
      <CaseListSection num="07" title="Outcomes" items={s.outcomes} />
      <CaseListSection num="08" title="Lessons" items={s.lessons} />

      <section className="section">
        <div
          className="container"
          style={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'baseline',
            borderTop: '1px solid var(--rule)',
            paddingTop: 32,
            flexWrap: 'wrap',
            gap: 16,
          }}
        >
          <Link className="link-arrow" to="/case-studies">
            ← All case studies
          </Link>
          <a className="link-arrow" href="mailto:codyjohnsontx@gmail.com">
            Discuss this work <ArrowGlyph />
          </a>
        </div>
      </section>
    </div>
  );
}
