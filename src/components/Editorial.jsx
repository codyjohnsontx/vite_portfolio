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
      {items.map((s) => (
        <span key={s} className="chip">
          {s}
        </span>
      ))}
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
