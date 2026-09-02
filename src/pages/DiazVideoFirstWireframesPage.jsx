import PropTypes from 'prop-types';
import { useEffect, useRef, useState } from 'react';
import { Link, Navigate, useParams } from 'react-router-dom';
import { getProductBySlug } from '../content/projects';
import {
  STILL_SYMBOLS,
  TILE_STATES,
  WIREFRAME_GROUPS,
} from '../content/diazVideoFirstWireframes';
import './DiazVideoFirstWireframesPage.css';

const PRODUCT_SLUG = 'diaz-on-demand';

/* Each wireframe is drawn at the width it was reviewed at - 1280px, or 390px
   for a phone - and scaled to fit its column rather than reflowed, so a
   narrower browser shows the same drawing smaller instead of a layout nobody
   looked at. The artifact did this with its own script; here React owns it. */
function ScaledFrame({ html, width }) {
  const holderRef = useRef(null);
  const innerRef = useRef(null);
  const [scale, setScale] = useState(1);
  const [height, setHeight] = useState(0);

  useEffect(() => {
    const holder = holderRef.current;
    const inner = innerRef.current;
    if (!holder || !inner) return undefined;

    const update = () => {
      const available = holder.clientWidth;
      const next = available > 0 ? Math.min(1, available / width) : 1;
      setScale(next);
      setHeight(Math.round(inner.scrollHeight * next));
    };

    update();
    // Web fonts land after first paint and change every frame's height.
    if (typeof document !== 'undefined' && document.fonts?.ready) {
      document.fonts.ready.then(update).catch(() => {});
    }

    // A window listener rather than only a ResizeObserver, because update()
    // writes the holder's own height: observing the element being resized is
    // how a ResizeObserver loop starts, and a dropped notification would leave
    // a frame scaled for a width it no longer has.
    window.addEventListener('resize', update);
    if (typeof ResizeObserver === 'undefined') {
      return () => window.removeEventListener('resize', update);
    }

    // Observe the inner only. It never changes size - it is a fixed-width box
    // under a transform - so this fires once when its content settles, and
    // never in response to the height written above.
    const observer = new ResizeObserver(update);
    observer.observe(inner);
    return () => {
      window.removeEventListener('resize', update);
      observer.disconnect();
    };
  }, [html, width]);

  return (
    <div className="dvf-frame dvf-canvas" ref={holderRef} style={{ height: height || undefined }}>
      <div
        className="dvf-frame__inner"
        ref={innerRef}
        style={{ width, transform: `scale(${scale})` }}
        /* Every string in diazVideoFirstWireframes.js is a module-level
           literal. Nothing interpolated, fetched, or read from a route param
           may ever reach it. */
        dangerouslySetInnerHTML={{ __html: html }}
      />
    </div>
  );
}

ScaledFrame.propTypes = {
  html: PropTypes.string.isRequired,
  width: PropTypes.number.isRequired,
};

export default function DiazVideoFirstWireframesPage() {
  const { slug } = useParams();
  const product = getProductBySlug(slug);

  if (!product || product.slug !== PRODUCT_SLUG) {
    return <Navigate to="/not-found" replace />;
  }

  return (
    <div className="fade-in">
      <div className="dvf-page">
        <div
          className="dvf-inner"
          dangerouslySetInnerHTML={{ __html: STILL_SYMBOLS }}
          aria-hidden="true"
          style={{ height: 0, marginBottom: 0 }}
        />
        <div className="dvf-inner">
          <div className="dvf-backbar">
            <Link to={`/products/${product.slug}/video-first`}>&larr; Back to the brief</Link>
            <span>Diaz on Demand / Video-first / Wireframes</span>
          </div>

          <header>
            <p className="dvf-eyebrow">Browse &amp; watch &middot; wireframes</p>
            <h1 className="dvf-title">Every screen, drawn twice</h1>
            <p className="dvf-intro">
              Diaz on Demand sells access to video, and three of its 67 lessons have a video that
              plays. So every screen below exists in two versions: the{' '}
              <strong>populated</strong> target, and the <strong>sparse</strong> version, which is
              the one that actually ships. The sparse pane is not a degraded copy of the other. It
              is the design.
            </p>
            <div className="dvf-legend">
              <span>
                <i className="is-target" /> Populated &mdash; the target
              </span>
              <span>
                <i className="is-ship" /> Sparse &mdash; what ships first
              </span>
              <span>Drawn at 1280px and 390px, scaled to fit</span>
            </div>
          </header>

          <section className="dvf-section">
            <p className="dvf-eyebrow">01 &middot; the spine</p>
            <h2 className="dvf-section-title">Four states, and only four</h2>
            <p className="dvf-note">
              Every screen below falls out of these. The app already computes all four, so none of
              this needs new logic; it needs a shape for each state so that a mostly-empty library
              still looks deliberate. The rule the sparse screens hang on:{' '}
              <strong>a tile with artwork means the lesson plays, and a tile without one does not</strong>
              . The moment a placeholder looks like a poster, artwork stops carrying information and
              every real thumbnail added later is worth less.
            </p>
            <div className="dvf-tiles">
              {TILE_STATES.map((tile) => (
                <div key={tile.id}>
                  <p className="dvf-tile__name">{tile.title}</p>
                  <div
                    className="dvf-canvas"
                    dangerouslySetInnerHTML={{ __html: tile.html }}
                  />
                  <p
                    className="dvf-tile__note"
                    dangerouslySetInnerHTML={{ __html: tile.note }}
                  />
                </div>
              ))}
            </div>
          </section>

          {WIREFRAME_GROUPS.map((group) => (
            <section className="dvf-section" key={group.id}>
              <p className="dvf-eyebrow">{group.eyebrow}</p>
              <h2 className="dvf-section-title">{group.title}</h2>
              <p className="dvf-note" dangerouslySetInnerHTML={{ __html: group.note }} />
              <div
                className={[
                  'dvf-panes',
                  group.frames.length === 1 ? 'dvf-panes--one' : '',
                  group.frames.length === 4 ? 'dvf-panes--phones' : '',
                ]
                  .filter(Boolean)
                  .join(' ')}
              >
                {group.frames.map((frame) => (
                  <div className={`dvf-pane dvf-pane--${frame.tone}`} key={frame.id}>
                    <div className="dvf-pane__head">
                      <span className="dvf-pane__dot" />
                      <span className="dvf-pane__label">{frame.label}</span>
                    </div>
                    {frame.sub ? <p className="dvf-pane__sub">{frame.sub}</p> : null}
                    <ScaledFrame html={frame.html} width={frame.width} />
                  </div>
                ))}
              </div>
            </section>
          ))}

          <footer className="dvf-footer">
            <Link to={`/products/${product.slug}/video-first`}>&larr; Back to the brief</Link>
            <Link to={`/products/${product.slug}`}>Diaz on Demand &rarr;</Link>
          </footer>
        </div>
      </div>
    </div>
  );
}
