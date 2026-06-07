import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { ArrowGlyph, Eyebrow, StackRow } from './Editorial';
import { Reveal } from './ScrollReveal';

export default function FeatureProduct({ p }) {
  const href = `/products/${p.slug}`;

  return (
    <Reveal
      as="article"
      className="prod-feature"
      distance={24}
      duration={860}
      style={{ '--card-accent': p.accent }}
    >
      <Link
        to={href}
        className="prod-feature__media"
        aria-label={`Open ${p.name}`}
      >
        {p.image ? (
          <img src={p.image} alt={p.name} />
        ) : (
          <div className="placeholder">{p.name} · product shot</div>
        )}
      </Link>
      <div className="prod-feature__body">
        <h3
          className="h1"
          style={{ margin: '6px 0 0', fontSize: 'clamp(36px, 4.4vw, 56px)' }}
        >
          {p.name}
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
          <Link to={href} className="link-arrow">
            Read the build <ArrowGlyph />
          </Link>
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
    </Reveal>
  );
}

FeatureProduct.propTypes = {
  p: PropTypes.shape({
    slug: PropTypes.string.isRequired,
    accent: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    image: PropTypes.string,
    oneLiner: PropTypes.string.isRequired,
    problem: PropTypes.string.isRequired,
    stack: PropTypes.arrayOf(PropTypes.string).isRequired,
    updates: PropTypes.arrayOf(PropTypes.object),
  }).isRequired,
};

FeatureProduct.defaultProps = {
  p: undefined,
};
