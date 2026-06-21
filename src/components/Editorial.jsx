import PropTypes from 'prop-types';

export function ArrowGlyph() {
  return <span className="arr" aria-hidden="true">→</span>;
}

export function Eyebrow({ children, style }) {
  return <span className="eyebrow" style={style}>{children}</span>;
}

export function Tag({ children, variant }) {
  const cls =
    'tag' +
    (variant === 'active' ? ' tag--active' : variant === 'accent' ? ' tag--accent' : '');
  return (
    <span className={cls}>
      <span className="tag-dot" />
      {children}
    </span>
  );
}

export function StackRow({ items }) {
  return (
    <div className="stack-row">
      {items.flatMap((s, i) => {
        const item = (
          <span key={`${i}-${s}`} className="stack-row__item">
            {s}
          </span>
        );
        if (i === 0) return [item];
        return [
          <span key={`${i}-${s}-sep`} className="stack-row__sep" aria-hidden="true">
            ·
          </span>,
          item,
        ];
      })}
    </div>
  );
}

export function SectionHead({ num, eyebrow, title, sub }) {
  return (
    <div className="section-head">
      <div className="index">
        <Eyebrow>{eyebrow}</Eyebrow>
        <span className="num">{num}</span>
      </div>
      <div>
        <h2 className="h2" style={{ margin: 0 }}>
          {title}
        </h2>
        {sub ? (
          <p className="lead" style={{ marginTop: 16, maxWidth: '60ch' }}>
            {sub}
          </p>
        ) : null}
      </div>
    </div>
  );
}

export function Marquee({ items }) {
  const group = (key) => (
    <span className="marquee__group" key={key}>
      {items.map((t, i) => (
        <span key={`${key}-${i}`} style={{ display: 'inline-flex', alignItems: 'center' }}>
          <span className="marquee__item">{t}</span>
          <span className="marquee__sep" aria-hidden="true">✦</span>
        </span>
      ))}
    </span>
  );

  return (
    <div className="marquee" aria-hidden="true">
      <div className="marquee__track">
        {group('a')}
        {group('b')}
      </div>
    </div>
  );
}

Eyebrow.propTypes = {
  children: PropTypes.node,
  style: PropTypes.object,
};

Eyebrow.defaultProps = {
  children: null,
  style: undefined,
};

Tag.propTypes = {
  children: PropTypes.node,
  variant: PropTypes.oneOf(['active', 'accent']),
};

Tag.defaultProps = {
  children: null,
  variant: undefined,
};

StackRow.propTypes = {
  items: PropTypes.arrayOf(PropTypes.string).isRequired,
};

SectionHead.propTypes = {
  num: PropTypes.string.isRequired,
  eyebrow: PropTypes.node.isRequired,
  title: PropTypes.node.isRequired,
  sub: PropTypes.node,
};

SectionHead.defaultProps = {
  sub: null,
};

Marquee.propTypes = {
  items: PropTypes.arrayOf(PropTypes.string).isRequired,
};
