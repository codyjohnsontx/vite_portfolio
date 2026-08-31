import { Fragment } from 'react';
import { Link } from 'react-router-dom';
import { ArrowGlyph, Eyebrow } from '../components/Editorial';
import { Reveal } from '../components/ScrollReveal';
import { CASE_STUDY, KIND_LABEL, writing } from '../content/writing';

/* The public section is Notes, and it holds two kinds: case studies first,
   then the shorter notes. The data module stays `writing` because "note" is
   also one of the two kinds inside it, and naming the collection after one of
   its members would be worse than the mismatch.

   Numbering runs across the whole list, so the position a reader sees is the
   position in `writing`; the label between the two groups names the second one
   without restarting the count. Rows stay direct children of the container so
   the hairline rules `.case-row` draws from :last-child keep working. */
export default function NotesIndexPage() {
  const firstNoteIndex = writing.findIndex((piece) => piece.kind !== CASE_STUDY);

  return (
    <div className="fade-in">
      <Reveal as="section" className="page-hero" duration={900}>
        <div className="container">
          <div className="crumbs">
            <Link to="/">Index</Link>
            <span>/</span>
            <span>Notes</span>
          </div>
          <h1 className="display" style={{ margin: 0 }}>
            Notes<span className="italic">.</span>
          </h1>
          <p className="lead" style={{ marginTop: 24, maxWidth: '62ch' }}>
            Case studies and shorter notes on the decisions behind the work: scope, tradeoffs,
            and what happened next.
          </p>
        </div>
      </Reveal>

      <Reveal as="section" className="section">
        <div className="container">
          {writing.map((piece, i) => (
            <Fragment key={piece.href}>
              {i === firstNoteIndex && firstNoteIndex > 0 ? (
                <Reveal className="writing-group">
                  <span className="mono">Notes</span>
                </Reveal>
              ) : null}
              <Reveal as={Link} to={piece.href} className="case-row" delay={(i % 4) * 90}>
                <span className="numeral" style={{ fontSize: 60 }}>
                  {String(i + 1).padStart(2, '0')}
                </span>
                <div>
                  <Eyebrow>
                    <span className="writing-kind">{KIND_LABEL[piece.kind]}</span>{' '}
                    {piece.meta.filter(Boolean).join(' · ')}
                  </Eyebrow>
                  <h2 className="h2" style={{ margin: '8px 0 12px' }}>
                    {piece.title}
                  </h2>
                  <p
                    className="body"
                    style={{ color: 'var(--ink-2)', maxWidth: '70ch', margin: 0 }}
                  >
                    {piece.deck}
                  </p>
                </div>
                <div className="case-row__cta" style={{ textAlign: 'right' }}>
                  <span className="link-arrow" style={{ borderColor: 'transparent' }}>
                    Read <ArrowGlyph />
                  </span>
                </div>
              </Reveal>
            </Fragment>
          ))}
        </div>
      </Reveal>
    </div>
  );
}
