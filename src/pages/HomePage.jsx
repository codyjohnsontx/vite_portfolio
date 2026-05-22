import { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import {
  ArrowGlyph,
  Eyebrow,
  SectionHead,
} from '../components/Editorial';
import FeatureProduct from '../components/FeatureProduct';
import ProductList from '../components/ProductList';
import { caseStudies } from '../content/caseStudies';
import { conceptProducts, flagshipProducts } from '../content/projects';

const VERBS = ['shipping', 'building', 'shaping', 'tuning', 'scoping'];

function Hero() {
  const [verbIdx, setVerbIdx] = useState(0);
  useEffect(() => {
    const t = setInterval(() => setVerbIdx((v) => (v + 1) % VERBS.length), 2400);
    return () => clearInterval(t);
  }, []);

  return (
    <section
      className="section"
      id="home"
      style={{ paddingTop: 'clamp(64px, 9vw, 140px)' }}
    >
      <div className="container">
        <h1 className="display" style={{ margin: 0 }}>
          Currently{' '}
          <span
            className="italic"
            style={{ display: 'inline-block', minWidth: '5.6ch', position: 'relative' }}
          >
            <span
              key={verbIdx}
              style={{ display: 'inline-block', animation: 'fade .55s ease both' }}
            >
              {VERBS[verbIdx]}
            </span>
          </span>{' '}
          product systems with engineering depth and operating range.
        </h1>

      </div>
    </section>
  );
}

function LatestUpdate() {
  return (
    <section className="latest-update" aria-labelledby="latest-update-title">
      <div className="container latest-update__inner">
        <div className="latest-update__label mono uppercase">Latest update</div>
        <div className="latest-update__copy">
          <h2 id="latest-update-title" className="latest-update__title">
            Track Tuner persona research
          </h2>
          <p className="latest-update__body">
            A clearer view of the riders, drivers, and coaches Track Tuner needs to serve first.
          </p>
        </div>
        <Link to="/products/track-tuner/research" className="link-arrow latest-update__link">
          Read the persona research <ArrowGlyph />
        </Link>
      </div>
    </section>
  );
}

export default function HomePage() {
  const navigate = useNavigate();

  return (
    <div className="fade-in">
      <Hero />
      <LatestUpdate />

      <section className="section" id="active">
        <div className="container">
          {flagshipProducts.map((p) => (
            <FeatureProduct key={p.slug} p={p} />
          ))}
        </div>
      </section>

      <section className="section" id="concepts">
        <div className="container">
          <SectionHead
            num="02"
            eyebrow="Concepts & prototypes"
            title={<>Smaller bets, sharper questions.</>}
            sub="Concepts I prototyped to push on a single hypothesis — usability under pressure, lifecycle modeling, micro-interactions in social products."
          />
          <ProductList
            products={conceptProducts}
            startIndex={flagshipProducts.length + 1}
          />
        </div>
      </section>

      <section className="section" id="case-studies">
        <div className="container">
          <div className="section-head" style={{ marginBottom: 32 }}>
            <div className="index">
              <Eyebrow>Case studies</Eyebrow>
              <span className="num">03</span>
            </div>
            <div>
              <h2 className="sr-only">Case studies</h2>
            </div>
          </div>
          <div className="case-grid">
            {caseStudies.map((c) => (
              <button
                key={c.slug}
                type="button"
                className="case-card"
                onClick={() => navigate(`/case-studies/${c.slug}`)}
                style={{ textAlign: 'left', font: 'inherit' }}
              >
                <h3
                  className="h3"
                  style={{ margin: 0, fontSize: 'clamp(22px, 2.4vw, 32px)' }}
                >
                  {c.title}
                </h3>
                <p className="body" style={{ margin: 0, color: 'var(--ink-2)' }}>
                  {c.tagline}
                </p>
                <div
                  style={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    marginTop: 'auto',
                    paddingTop: 16,
                  }}
                >
                  <span className="mono small uppercase">{c.company}</span>
                  <span className="link-arrow" style={{ borderColor: 'transparent' }}>
                    Read <ArrowGlyph />
                  </span>
                </div>
              </button>
            ))}
          </div>
        </div>
      </section>

    </div>
  );
}
