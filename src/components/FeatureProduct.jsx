import { useNavigate } from 'react-router-dom';
import { ArrowGlyph, Eyebrow, StackRow } from './Editorial';

export default function FeatureProduct({ p }) {
  const navigate = useNavigate();
  const open = () => navigate(`/products/${p.slug}`);
  const onKey = (e) => {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      open();
    }
  };

  return (
    <article className="prod-feature" style={{ '--card-accent': p.accent }}>
      <div
        className="prod-feature__media"
        onClick={open}
        onKeyDown={onKey}
        role="button"
        tabIndex={0}
        aria-label={`Open ${p.name}`}
      >
        {p.image ? (
          <img src={p.image} alt={p.name} />
        ) : (
          <div className="placeholder">{p.name} · product shot</div>
        )}
      </div>
      <div className="prod-feature__body">
        <Eyebrow>
          {p.year} · {p.tier === 'flagship' ? 'Flagship' : 'Concept'}
        </Eyebrow>
        <h3
          className="h1"
          style={{ margin: '6px 0 0', fontSize: 'clamp(36px, 4.4vw, 56px)' }}
        >
          {p.name}
          <span
            aria-hidden="true"
            style={{
              display: 'inline-block',
              width: 10,
              height: 10,
              borderRadius: '50%',
              background: p.accent,
              transform: 'translateY(-8px)',
              marginLeft: 6,
            }}
          />
        </h3>
        <p className="lead" style={{ margin: 0 }}>{p.oneLiner}</p>

        <div style={{ marginTop: 8 }}>
          <Eyebrow>The problem</Eyebrow>
          <p className="body" style={{ marginTop: 8, color: 'var(--ink)' }}>
            {p.problem}
          </p>
        </div>

        <StackRow items={p.stack} />

        <div style={{ display: 'flex', gap: 28, marginTop: 8, flexWrap: 'wrap' }}>
          <button type="button" className="link-arrow" onClick={open}>
            Read the build <ArrowGlyph />
          </button>
          {p.updates?.length ? (
            <span
              className="mono small uppercase"
              style={{ color: 'var(--ink-3)' }}
            >
              {p.updates.length} recent updates
            </span>
          ) : null}
        </div>
      </div>
    </article>
  );
}
