import PropTypes from 'prop-types';
import { useEffect, useRef, useState } from 'react';
import { Link, Navigate, useParams } from 'react-router-dom';
import { getProductBySlug } from '../content/projects';
import SESSION_COMPARE_SLIDES from '../content/sessionCompareSlides';
import './SessionComparePage.css';

const SLIDE_WIDTH = 1920;
const SLIDE_HEIGHT = 1080;

function ScaledSlide({ html }) {
  const frameRef = useRef(null);
  const [scale, setScale] = useState(1);

  useEffect(() => {
    const frame = frameRef.current;
    if (!frame) return undefined;

    const update = () => {
      const w = frame.clientWidth;
      if (w > 0) setScale(w / SLIDE_WIDTH);
    };

    update();
    const observer = new ResizeObserver(update);
    observer.observe(frame);
    return () => observer.disconnect();
  }, []);

  return (
    <div
      className="sc-slide__frame"
      ref={frameRef}
      style={{ height: SLIDE_HEIGHT * scale }}
    >
      <div
        className="sc-slide__inner"
        style={{ transform: `scale(${scale})` }}
        dangerouslySetInnerHTML={{ __html: html }}
      />
    </div>
  );
}

ScaledSlide.propTypes = {
  html: PropTypes.string.isRequired,
};

export default function SessionComparePage() {
  const { slug } = useParams();
  const product = getProductBySlug(slug);

  if (!product || product.slug !== 'track-tuner') {
    return <Navigate to="/not-found" replace />;
  }

  return (
    <div className="fade-in">
      <div className="sc-page">
        <div className="sc-backbar">
          <Link to={`/products/${product.slug}`}>← Back to {product.name}</Link>
          <span>Track Tuner / Features / Session Compare</span>
        </div>

        <header className="sc-hero">
          <p className="sc-hero__eyebrow">Concept extension · PM case study</p>
          <h1 className="sc-hero__title">Session Compare</h1>
          <p className="sc-hero__lead">
            Planning the next step for Track Tuner: from setup logging toward trackside decision
            support. Ten-slide product brief walks the problem, scope, workflow, and chart strategy,
            then hands off to lo-fi wireframes for two product directions.
          </p>
          <p style={{ marginTop: 20 }}>
            <Link
              to={`/products/${product.slug}/session-compare/wireframes`}
              className="sc-backbar"
              style={{ margin: 0, color: '#c6f24e', display: 'inline-flex' }}
            >
              View lo-fi wireframes →
            </Link>
          </p>
        </header>

        <div className="sc-deck">
          {SESSION_COMPARE_SLIDES.map((slide) => (
            <article key={slide.screen} className="sc-slide">
              <div className="sc-slide__caption">
                <span>
                  <strong>{slide.screen}</strong> · {slide.label}
                </span>
                <span>1920 × 1080</span>
              </div>
              <ScaledSlide html={slide.html} />
              {slide.notes ? (
                <div className="sc-slide__notes">
                  <span className="sc-slide__notes-label">Speaker notes</span>
                  {slide.notes}
                </div>
              ) : null}
            </article>
          ))}
        </div>
      </div>
    </div>
  );
}
