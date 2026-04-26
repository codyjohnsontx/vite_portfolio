import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  ArrowGlyph,
  Eyebrow,
  SectionHead,
} from '../components/Editorial';
import FeatureProduct from '../components/FeatureProduct';
import ProductList from '../components/ProductList';
import { caseStudies } from '../content/caseStudies';
import { experience } from '../content/experience';
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

        <div className="hero-grid">
          <p className="lead" style={{ margin: 0, maxWidth: '40ch' }}>
            I turn vague requests into clear requirements, make practical release decisions, and
            keep execution moving until the result holds up in the real world.
          </p>
        </div>
      </div>
    </section>
  );
}

export default function HomePage() {
  const navigate = useNavigate();

  return (
    <div className="fade-in">
      <Hero />

      <section className="section" id="active">
        <div className="container">
          <SectionHead
            num="01"
            eyebrow="Now building"
            title={
              <>
                Two products <span className="italic">in active build</span>, shipped in public.
              </>
            }
            sub="Both are operating products with real auth, billing, and content workflows — not slideware. Below, a snapshot. Click through for the full project page including a running changelog of pull requests and notes."
          />
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

      <section className="section" id="operator">
        <div className="container">
          <SectionHead
            num="03"
            eyebrow="Operator track"
            title={<>What execution looks like when there is no playbook yet.</>}
            sub="Selected work where I owned outcomes — backlog quality, throughput, automation, retail systems. Metrics where they exist."
          />
          <div>
            {experience.map((e) => (
              <article key={`${e.company}-${e.role}`} className="exp-row">
                <div>
                  <h3 className="role">{e.role}</h3>
                  <p className="company">{e.company}</p>
                  <p className="dates">{e.dates}</p>
                </div>
                <div>
                  <p
                    className="body"
                    style={{ margin: '0 0 12px', color: 'var(--ink)' }}
                  >
                    {e.summary}
                  </p>
                  <ul
                    style={{
                      margin: 0,
                      paddingLeft: 18,
                      color: 'var(--ink-2)',
                      fontSize: 15,
                      lineHeight: 1.55,
                    }}
                  >
                    {e.evidence.map((b) => (
                      <li key={b} style={{ marginBottom: 4 }}>
                        {b}
                      </li>
                    ))}
                  </ul>
                </div>
                <div className="right">
                  {e.tags.map((t) => (
                    <span key={t}>{t}</span>
                  ))}
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="section" id="case-studies">
        <div className="container">
          <SectionHead
            num="04"
            eyebrow="Case studies"
            title={<>Two write-ups, in long form.</>}
          />
          <div className="case-grid">
            {caseStudies.map((c, i) => (
              <button
                key={c.slug}
                type="button"
                className="case-card"
                onClick={() => navigate(`/case-studies/${c.slug}`)}
                style={{ textAlign: 'left', font: 'inherit' }}
              >
                <div
                  style={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'baseline',
                  }}
                >
                  <Eyebrow>Case · 0{i + 1}</Eyebrow>
                  <span className="mono small">{c.timeframe}</span>
                </div>
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

      <section className="section" id="contact">
        <div className="container">
          <div className="closing-grid">
            <div>
              <Eyebrow>Get in touch</Eyebrow>
            </div>
            <div>
              <h2 className="h1" style={{ margin: '0 0 24px' }}>
                If your team needs <span className="italic">clear scope</span>, calm release
                decisions, and a PM who can ship — let&rsquo;s talk.
              </h2>
              <div
                style={{
                  display: 'flex',
                  flexWrap: 'wrap',
                  gap: 24,
                  alignItems: 'baseline',
                }}
              >
                <a className="link-arrow" href="mailto:codyjohnsontx@gmail.com">
                  codyjohnsontx@gmail.com <ArrowGlyph />
                </a>
                <a
                  className="link-arrow"
                  href="https://www.linkedin.com/in/cody-johnson-92460b124/"
                  target="_blank"
                  rel="noreferrer"
                >
                  LinkedIn <ArrowGlyph />
                </a>
                <a
                  className="link-arrow"
                  href="https://github.com/codyjohnsontx"
                  target="_blank"
                  rel="noreferrer"
                >
                  GitHub <ArrowGlyph />
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
