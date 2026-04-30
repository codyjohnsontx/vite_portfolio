import { useState } from 'react';
import { Link } from 'react-router-dom';
import { ArrowGlyph, Eyebrow, StackRow } from './Editorial';

export default function ProductList({ products, startIndex = 1 }) {
  const [openSlug, setOpenSlug] = useState(null);

  return (
    <div>
      {products.map((p, i) => {
        const isOpen = openSlug === p.slug;
        const toggle = () => setOpenSlug(isOpen ? null : p.slug);
        return (
          <article
            key={p.slug}
            className={'prod-card' + (isOpen ? ' is-open' : '')}
            style={{ '--card-accent': p.accent }}
            onClick={toggle}
            onKeyDown={(e) => {
              if (e.key === 'Enter' || e.key === ' ') {
                e.preventDefault();
                toggle();
              }
            }}
            role="button"
            tabIndex={0}
            aria-expanded={isOpen}
          >
            <span className="num">0{startIndex + i}</span>
            <div className="prod-card__main">
              <h3 className="prod-card__title">
                {p.name}
              </h3>
              <p className="prod-card__one">{p.oneLiner}</p>
              <div className="prod-card__expand">
                <div className="prod-card__expand-inner">
                  <div className="prod-card__detail-grid">
                    <div>
                      <Eyebrow>The problem</Eyebrow>
                      <p
                        className="body"
                        style={{ marginTop: 8, color: 'var(--ink-2)' }}
                      >
                        {p.problem}
                      </p>
                    </div>
                    <div>
                      <Eyebrow>Audience</Eyebrow>
                      <p
                        className="body"
                        style={{ marginTop: 8, color: 'var(--ink-2)' }}
                      >
                        {p.audience}
                      </p>
                    </div>
                    <div>
                      <Eyebrow>Stack</Eyebrow>
                      <div style={{ marginTop: 8 }}>
                        <StackRow items={p.stack} />
                      </div>
                      <div style={{ marginTop: 16 }}>
                        <Link
                          to={`/products/${p.slug}`}
                          className="link-arrow"
                          onClick={(e) => e.stopPropagation()}
                        >
                          Open project <ArrowGlyph />
                        </Link>
                      </div>
                    </div>
                  </div>
                  {p.brandDisclaimer ? (
                    <p
                      className="small italic"
                      style={{ marginTop: 24, color: 'var(--ink-3)' }}
                    >
                      {p.brandDisclaimer}
                    </p>
                  ) : null}
                </div>
              </div>
            </div>
            <span className="prod-card__caret" aria-hidden="true">
              +
            </span>
          </article>
        );
      })}
    </div>
  );
}
