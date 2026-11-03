import PropTypes from 'prop-types';
import { Link, Navigate, useParams } from 'react-router-dom';
import { ArrowGlyph, Eyebrow } from '../components/Editorial';
import { Reveal } from '../components/ScrollReveal';
import { getCaseStudyBySlug } from '../content/caseStudies';
import { getRelatedForWriting } from '../content/writing';
import RelatedLinks from '../components/RelatedLinks';
import Shot from '../components/Shot';

function CaseSection({ num, title, body }) {
  return (
    <Reveal as="section" className="section section--tight">
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
    </Reveal>
  );
}

function withLinks(text) {
  return text.split(/(https:\/\/\S+)/).map((part, i) =>
    i % 2 ? (
      <a key={part} className="case-link" href={part} target="_blank" rel="noreferrer">
        {part}
      </a>
    ) : (
      part
    ),
  );
}

function CaseListSection({ num, title, items }) {
  if (!items?.length) return null;
  return (
    <Reveal as="section" className="section section--tight">
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
                  {String(i + 1).padStart(2, '0')}
                </span>
                <span
                  className="body"
                  style={{ color: 'var(--ink)', fontSize: 17, lineHeight: 1.5 }}
                >
                  {withLinks(it)}
                </span>
              </li>
            ))}
          </ul>
        </div>
        <div />
      </div>
    </Reveal>
  );
}

/* A screenshot figure, drawn at full container width so the images break out
   of the measured text column. `shots` is one image or a pair; a pair shares
   one row, and each column is sized by its image's aspect ratio so two shots
   of different shapes, a 1440 desktop beside a 390 phone or a before beside
   an after, come out the same height. Below 800px the stylesheet stacks them.
   A shot's `label` names a bare value, a width or a date, and nothing else;
   the caption is the one place for prose. */
const FIGURE_COLUMN = 1240;

function CaseFigure({ figure }) {
  const ratios = figure.shots.map((shot) => shot.width / shot.height);
  const total = ratios.reduce((sum, ratio) => sum + ratio, 0);
  // Scaled so the narrowest column is exactly 1fr: fr tracks whose values sum
  // to less than 1 take only that fraction of the row, so two phone crops at
  // 0.23fr each would sit in half the container with the rest empty.
  const narrowest = Math.min(...ratios);
  const columns = ratios.map((r) => `${(r / narrowest).toFixed(3)}fr`).join(' ');
  // A row of portrait shots alone would stretch to the full column and run
  // thousands of pixels tall, so it is capped near the width it was captured at.
  const portrait = ratios.every((r) => r < 1);

  return (
    <Reveal as="section" className="section--tight">
      <div className="container">
        <figure
          className={portrait ? 'case-figure case-figure--portrait' : 'case-figure'}
          style={{ '--case-figure-columns': columns }}
        >
          <div className="case-figure__shots">
            {figure.shots.map((shot, i) => (
              <div key={shot.alt} className="case-figure__shot">
                <Shot
                  source={shot.source}
                  alt={shot.alt}
                  width={shot.width}
                  height={shot.height}
                  sizes={`(max-width: 800px) 92vw, ${Math.round((ratios[i] / total) * FIGURE_COLUMN)}px`}
                  eager={figure.after === 'hero'}
                />
                {shot.label ? (
                  <span className="case-figure__label mono small">{shot.label}</span>
                ) : null}
              </div>
            ))}
          </div>
          <figcaption className="case-figure__caption body">{figure.caption}</figcaption>
        </figure>
      </div>
    </Reveal>
  );
}

const statStyle = { borderTop: '1px solid var(--rule)', paddingTop: 20 };

function CaseStat({ label, value, delay }) {
  return (
    <Reveal delay={delay} style={statStyle}>
      <Eyebrow>{label}</Eyebrow>
      <p className="body" style={{ margin: '8px 0 0', color: 'var(--ink)' }}>
        {value}
      </p>
    </Reveal>
  );
}

/* Everything between the title and the numbered sections. Each block is drawn
   only from fields the entry carries, so a study can open straight onto `01`.
   The stats row is a three-up and needs all three values: an entry can keep
   `role` and `featuredOutcome` for its home page card and still skip the row by
   leaving `team` out. */
function CaseSummary({ study: c }) {
  const hasStats = Boolean(c.role && c.team && c.featuredOutcome);
  const hasHighlights = Boolean(c.impactHighlights?.length);
  const hasSummary = hasStats || Boolean(c.challenge) || hasHighlights;

  if (!hasSummary && !c.diagrams) return null;

  return (
    <Reveal as="section" className={hasSummary ? 'section' : 'section section--tight'}>
      <div className="container">
        {hasStats ? (
          <div className="case-stats">
            <CaseStat label="Role" value={c.role} delay={0} />
            <CaseStat label="Team" value={c.team} delay={90} />
            <CaseStat label="Outcome" value={c.featuredOutcome} delay={180} />
          </div>
        ) : null}

        {c.challenge || hasHighlights ? (
          <div className="case-grid-2">
            {c.challenge ? (
              <Reveal delay={80}>
                <Eyebrow>Challenge</Eyebrow>
                <p className="lead drop-cap" style={{ marginTop: 16, color: 'var(--ink)' }}>
                  {c.challenge}
                </p>
              </Reveal>
            ) : null}
            {hasHighlights ? (
              <Reveal delay={180}>
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
                        {String(i + 1).padStart(2, '0')}
                      </span>
                      <span className="body" style={{ color: 'var(--ink)' }}>{h}</span>
                    </li>
                  ))}
                </ul>
              </Reveal>
            ) : null}
          </div>
        ) : null}

        {c.diagrams ? (
          <Reveal
            delay={hasSummary ? 260 : 0}
            style={{
              // Under a summary the block is ruled off from it. On its own it
              // sits directly beneath the hero, which already draws that rule.
              ...(hasSummary
                ? { marginTop: 56, paddingTop: 32, borderTop: '1px solid var(--rule)' }
                : null),
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'baseline',
              gap: 24,
              flexWrap: 'wrap',
            }}
          >
            <div style={{ maxWidth: '60ch' }}>
              <Eyebrow>{c.diagrams.eyebrow ?? 'System design'}</Eyebrow>
              <p className="body" style={{ margin: '8px 0 0', color: 'var(--ink)' }}>
                {c.diagrams.blurb}
              </p>
            </div>
            <Link className="link-arrow" to={c.diagrams.path}>
              {c.diagrams.label} <ArrowGlyph />
            </Link>
          </Reveal>
        ) : null}
      </div>
    </Reveal>
  );
}

CaseStat.propTypes = {
  label: PropTypes.string.isRequired,
  value: PropTypes.string.isRequired,
  delay: PropTypes.number.isRequired,
};

CaseSummary.propTypes = {
  study: PropTypes.shape({
    role: PropTypes.string,
    team: PropTypes.string,
    featuredOutcome: PropTypes.string,
    challenge: PropTypes.string,
    impactHighlights: PropTypes.arrayOf(PropTypes.string),
    diagrams: PropTypes.shape({
      eyebrow: PropTypes.string,
      path: PropTypes.string.isRequired,
      label: PropTypes.string.isRequired,
      blurb: PropTypes.string.isRequired,
    }),
  }).isRequired,
};

const shotShape = PropTypes.shape({
  source: PropTypes.string.isRequired,
  alt: PropTypes.string.isRequired,
  width: PropTypes.number.isRequired,
  height: PropTypes.number.isRequired,
  label: PropTypes.string,
});

CaseFigure.propTypes = {
  figure: PropTypes.shape({
    after: PropTypes.string.isRequired,
    caption: PropTypes.string.isRequired,
    shots: PropTypes.arrayOf(shotShape).isRequired,
  }).isRequired,
};

CaseSection.propTypes = {
  num: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  body: PropTypes.string.isRequired,
};

CaseListSection.propTypes = {
  num: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  items: PropTypes.arrayOf(PropTypes.string),
};

export default function CaseStudyPage() {
  const { slug } = useParams();
  const study = getCaseStudyBySlug(slug);

  if (!study) return <Navigate to="/not-found" replace />;
  const c = study;
  const s = c.sections;
  const href = `/case-studies/${c.slug}`;
  const { items: related, heading: relatedHeading } = getRelatedForWriting(href);
  /* Each figure names the block it follows: `hero` for the page title, or a
     section key. Figures with the same key keep their array order. */
  const figuresAfter = (key) =>
    (c.figures ?? [])
      .filter((figure) => figure.after === key)
      .map((figure) => <CaseFigure key={figure.caption} figure={figure} />);

  return (
    <div className="fade-in">
      <Reveal as="section" className="page-hero" duration={900}>
        <div className="container">
          <div className="crumbs">
            <Link to="/">Index</Link>
            <span>/</span>
            <Link to="/notes">Notes</Link>
            <span>/</span>
            <span>{c.company}</span>
          </div>
          <h1
            className="display"
            style={{ margin: '24px 0 0', fontSize: 'clamp(40px, 5.6vw, 84px)' }}
          >
            {c.title}
          </h1>
          {c.tagline ? (
            <p className="lead" style={{ marginTop: 24, maxWidth: '60ch' }}>
              {c.tagline}
            </p>
          ) : null}
        </div>
      </Reveal>

      {figuresAfter('hero')}

      <CaseSummary study={c} />

      <CaseSection num="01" title="Context" body={s.context} />
      {figuresAfter('context')}
      <CaseSection num="02" title="The problem" body={s.problem} />
      {figuresAfter('problem')}
      <CaseSection num="03" title="The goal" body={s.goal} />
      {figuresAfter('goal')}

      <CaseListSection num="04" title="Decisions" items={s.decisions} />
      {figuresAfter('decisions')}
      <CaseListSection num="05" title="Tradeoffs" items={s.tradeoffs} />
      {figuresAfter('tradeoffs')}
      <CaseListSection num="06" title="Execution" items={s.execution} />
      {figuresAfter('execution')}
      <CaseListSection num="07" title="Outcomes" items={s.outcomes} />
      {figuresAfter('outcomes')}
      <CaseListSection num="08" title="Lessons" items={s.lessons} />
      {figuresAfter('lessons')}

      {related.length ? (
        <Reveal as="section" className="section section--tight">
          <div className="container">
            <h2 className="h2" style={{ margin: '0 0 32px' }}>
              {relatedHeading}
            </h2>
            <RelatedLinks items={related} />
          </div>
        </Reveal>
      ) : null}

      <Reveal as="section" className="section section--tight">
        <Reveal
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
          <Link className="link-arrow" to="/notes">
            ← All notes
          </Link>
          <a className="link-arrow" href="mailto:codyjohnsontx@gmail.com">
            Discuss this work <ArrowGlyph />
          </a>
        </Reveal>
      </Reveal>
    </div>
  );
}
