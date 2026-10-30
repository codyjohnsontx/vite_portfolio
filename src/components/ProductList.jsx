import PropTypes from 'prop-types';
import { useState } from 'react';
import { Link } from 'react-router-dom';
import { ArrowGlyph, Eyebrow, StackRow } from './Editorial';
import { Reveal } from './ScrollReveal';

function isInteractiveChild(target, currentTarget) {
  if (!(target instanceof Element)) return false;
  const interactive = target.closest('a, button, input, select, textarea, summary, [role="button"]');
  return Boolean(interactive && interactive !== currentTarget);
}

export default function ProductList({ products, startIndex = 1 }) {
  const [openSlug, setOpenSlug] = useState(null);

  return (
    <div>
      {products.map((p, i) => {
        const isOpen = openSlug === p.slug;
        const toggle = () => setOpenSlug(isOpen ? null : p.slug);
        return (
          <Reveal
            as="article"
            key={p.slug}
            className={'prod-card' + (isOpen ? ' is-open' : '')}
            delay={(i % 4) * 80}
            distance={22}
            style={{ '--card-accent': p.accent }}
            /* The whole row still toggles on a mouse click, but the row is not
               the control: a row that announced itself as a button would make
               the project link and the Source link nested interactive content,
               which assistive tech cannot reach. The caret below is the real
               button, so keyboard and screen reader users get one focusable
               toggle per row, and links stay links. */
            onClick={(e) => {
              if (isInteractiveChild(e.target, e.currentTarget)) return;
              toggle();
            }}
          >
            <span className="num">
              {String(startIndex + i).padStart(2, '0')}
            </span>
            <div className="prod-card__main">
              <h3 className="prod-card__title">{p.name}</h3>
              <p className="prod-card__one">{p.oneLiner}</p>
              <div className="prod-card__expand" id={`prod-card-detail-${p.slug}`}>
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
                      {/* An engagement has no stack to list: what is known
                          about it is the case study, not a repository. */}
                      {p.stack?.length ? (
                        <>
                          <Eyebrow>Stack</Eyebrow>
                          <div style={{ marginTop: 8 }}>
                            <StackRow items={p.stack} />
                          </div>
                        </>
                      ) : null}
                      <div
                        style={{
                          marginTop: p.stack?.length ? 16 : 0,
                          display: 'flex',
                          flexWrap: 'wrap',
                          gap: '8px 24px',
                        }}
                      >
                        <Link
                          to={p.href || `/products/${p.slug}`}
                          className="link-arrow"
                          onClick={(e) => e.stopPropagation()}
                        >
                          {p.ctaLabel || 'Open project'} <ArrowGlyph />
                        </Link>
                        {p.repoUrl ? (
                          <a
                            href={p.repoUrl}
                            target="_blank"
                            rel="noreferrer"
                            className="link-arrow"
                            onClick={(e) => e.stopPropagation()}
                          >
                            Source ↗
                          </a>
                        ) : null}
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
            <button
              type="button"
              className="prod-card__caret"
              aria-expanded={isOpen}
              aria-controls={`prod-card-detail-${p.slug}`}
              aria-label={`${isOpen ? 'Collapse' : 'Expand'} ${p.name}`}
              onClick={(e) => {
                e.stopPropagation();
                toggle();
              }}
            >
              <span aria-hidden="true">+</span>
            </button>
          </Reveal>
        );
      })}
    </div>
  );
}

ProductList.propTypes = {
  products: PropTypes.arrayOf(
    PropTypes.shape({
      slug: PropTypes.string.isRequired,
      accent: PropTypes.string.isRequired,
      name: PropTypes.string.isRequired,
      oneLiner: PropTypes.string.isRequired,
      problem: PropTypes.string.isRequired,
      audience: PropTypes.string.isRequired,
      /* Optional so an engagement, which has no live app, no update feed and
         no product page, can share this row. */
      stack: PropTypes.arrayOf(PropTypes.string),
      liveUrl: PropTypes.string,
      repoUrl: PropTypes.string,
      href: PropTypes.string,
      ctaLabel: PropTypes.string,
      brandDisclaimer: PropTypes.string,
    }),
  ).isRequired,
  startIndex: PropTypes.number,
};

ProductList.defaultProps = {
  startIndex: 1,
};
