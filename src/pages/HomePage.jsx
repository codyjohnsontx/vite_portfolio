import PropTypes from 'prop-types';
import { useEffect, useRef } from 'react';
import { Link, useOutletContext } from 'react-router-dom';
import Marquee from '../components/Marquee';
import WorkRows from '../components/WorkRows';
import { useKineticText, useMagnetic, useReveal } from '../motion/hooks';
import { gsap, prefersReducedMotion, splitChars } from '../motion/motion';
import { caseStudies } from '../content/caseStudies';
import { experience } from '../content/experience';
import { profile } from '../content/profile';
import { conceptProducts, flagshipProducts } from '../content/projects';

const HERO_LINES = ['Ambiguous', 'to shipped'];

const MARQUEE = [
  'Product ownership',
  'Requirements',
  'Acceptance criteria',
  'RAG prototyping',
  'React',
  'TypeScript',
  'Node.js',
  'SQL',
  'Release coordination',
  'Operational metrics',
];

/* ------------------------------- hero ------------------------------- */

function Hero({ ready }) {
  const rootRef = useRef(null);

  useEffect(() => {
    const root = rootRef.current;
    if (!root || !ready) return undefined;

    if (prefersReducedMotion()) {
      gsap.set(root.querySelectorAll('[data-hero]'), { opacity: 1 });
      return undefined;
    }

    const ctx = gsap.context(() => {
      const lines = gsap.utils.toArray('.hero__line');
      const chars = lines.map((line) => splitChars(line));

      gsap.set('[data-hero]', { opacity: 1 });

      const tl = gsap.timeline({ defaults: { ease: 'expo.out' } });

      tl.from('.hero__eyebrow', { opacity: 0, y: 12, duration: 0.9 })
        .from(
          '.hero__rail-item',
          { opacity: 0, x: -22, duration: 0.9, stagger: 0.055 },
          '-=0.65',
        );

      chars.forEach((set, i) => {
        tl.from(
          set,
          { yPercent: 118, duration: 1.35, stagger: 0.028 },
          i === 0 ? '-=0.75' : '-=1.18',
        );
      });

      tl.from('.hero__support', { opacity: 0, y: 20, duration: 1 }, '-=0.95')
        .from('.hero__affordance', { opacity: 0, y: 14, duration: 0.8 }, '-=0.7')
        .from('.hero__cue', { opacity: 0, duration: 0.8 }, '-=0.6');
    }, root);

    return () => ctx.revert();
  }, [ready]);

  return (
    <section className="hero" ref={rootRef} aria-labelledby="hero-title">
      <div className="hero__rail" aria-label="Active builds">
        {flagshipProducts.slice(0, 5).map((p) => (
          <Link
            key={p.slug}
            to={`/products/${p.slug}`}
            className="pill hero__rail-item"
            data-hero
            style={{ opacity: 0 }}
            data-cursor="View"
          >
            {p.name}
          </Link>
        ))}
        <Link
          to="/products"
          className="pill hero__rail-item pill--solid"
          data-hero
          style={{ opacity: 0 }}
          data-cursor="View"
        >
          All work
        </Link>
      </div>

      <p className="hero__support body" data-hero style={{ opacity: 0 }}>
        {profile.heroSupport}
      </p>

      <div className="hero__title-block">
        <span className="mono hero__eyebrow" data-hero style={{ opacity: 0 }}>
          Product manager · Technical builder · Austin, TX
        </span>
        <h1 className="display hero__title" id="hero-title">
          <span className="sr-only">Ambiguous to shipped</span>
          {HERO_LINES.map((line) => (
            <span className="hero__line-mask" key={line} aria-hidden="true">
              <span className="hero__line" data-hero style={{ opacity: 0 }}>
                {line}
              </span>
            </span>
          ))}
        </h1>
      </div>

      <div className="hero__affordance" data-hero style={{ opacity: 0 }} aria-hidden="true">
        <span className="pill pill--mono pill--live">
          <span className="dot" /> Hover
        </span>
        <span className="pill pill--mono">Drag</span>
      </div>

      <div className="hero__cue" data-hero style={{ opacity: 0 }} aria-hidden="true">
        <span className="mono">Scroll</span>
        <span className="hero__cue-line" />
      </div>
    </section>
  );
}

/* ------------------------------- proof ------------------------------- */

const PROOF = [
  {
    label: 'Requirements clarity',
    body: 'Vague asks become user stories, acceptance criteria, validation rules, and delivery-ready scope.',
  },
  {
    label: 'Cross-team execution',
    body: 'Working across product, engineering, QA, design, operations, and stakeholder groups.',
  },
  {
    label: 'Operational trust',
    body: 'Active builds surface validation, readiness, monitoring, and failure states instead of hiding them.',
  },
  {
    label: 'Measured outcomes',
    body: 'Case studies tie decisions to launch metrics, retention, revenue, and data quality.',
  },
];

function ProofStrip() {
  const ref = useReveal();
  return (
    <section className="proof" ref={ref} style={{ opacity: 0 }} aria-label="How I work">
      <div className="shell proof__grid">
        {PROOF.map((item, i) => (
          <div className="proof__item" key={item.label}>
            <span className="mono tabular proof__num">{String(i + 1).padStart(2, '0')}</span>
            <h3 className="proof__label">{item.label}</h3>
            <p className="body">{item.body}</p>
          </div>
        ))}
      </div>
    </section>
  );
}

/* --------------------------- latest signal --------------------------- */

function LatestSignal() {
  const ref = useReveal();
  const ctaRef = useMagnetic({ strength: 0.22 });

  return (
    <section className="signal-block bay--tight" ref={ref} style={{ opacity: 0 }}>
      <div className="shell signal-block__inner">
        <div className="signal-block__meta">
          <span className="pill pill--mono pill--live">
            <span className="dot" /> Latest
          </span>
          <span className="mono">July 2026</span>
        </div>
        <div className="signal-block__body">
          <h2 className="h2">OncoPath faithfulness eval built and calibrated</h2>
          <p className="lead">
            OncoPath, an AI-assisted cancer trial explainer, now has an accuracy-evaluation
            harness: a frozen test set of real trials, a validator fix that took usable output
            from 0 to 100 percent, and a second-model faithfulness judge. Human calibration
            showed the judge is too lenient, so its 81 percent score is not trusted yet.
          </p>
          <div className="signal-block__links">
            <Link ref={ctaRef} to="/products/oncopath" className="arrow-link" data-cursor="Read">
              Read the build <span className="glyph" aria-hidden="true">→</span>
            </Link>
            <Link to="/products/oncopath/analysis" className="arrow-link" data-cursor="Read">
              PM analysis <span className="glyph" aria-hidden="true">→</span>
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}

/* ------------------------------ section head ------------------------------ */

function SectionHead({ num, eyebrow, title, sub }) {
  const titleRef = useKineticText({ mode: 'words', stagger: 0.05 });
  const subRef = useReveal({ delay: 0.15 });

  return (
    <header className="head">
      <div className="head__index">
        <span className="mono">{eyebrow}</span>
        <span className="mono tabular head__num">{num}</span>
      </div>
      <div className="head__body">
        <h2 className="h1" ref={titleRef} style={{ opacity: 0 }}>
          {title}
        </h2>
        {sub ? (
          <p className="lead head__sub" ref={subRef} style={{ opacity: 0 }}>
            {sub}
          </p>
        ) : null}
      </div>
    </header>
  );
}

/* ---------------------------- case studies ---------------------------- */

function CaseStudies() {
  const ref = useReveal();
  return (
    <section className="bay" id="case-studies">
      <div className="shell">
        <SectionHead
          num="03"
          eyebrow="Case studies"
          title="Shipped with other people, measured after launch."
          sub="Two engagements where the product decisions are traceable to outcomes: scope, tradeoffs, and what the numbers did afterwards."
        />
        <div className="case-grid" ref={ref} style={{ opacity: 0 }}>
          {caseStudies.map((c) => (
            <Link
              key={c.slug}
              to={`/case-studies/${c.slug}`}
              className="card case-card"
              data-cursor="Read"
            >
              <div className="case-card__top">
                <span className="mono">{c.company}</span>
                <span className="mono">{c.role}</span>
              </div>
              <h3 className="h3 case-card__title">{c.title}</h3>
              <p className="body case-card__tag">{c.tagline}</p>
              <div className="case-card__foot">
                <span className="body case-card__outcome">{c.featuredOutcome}</span>
                <span className="arrow-link">
                  Read <span className="glyph" aria-hidden="true">→</span>
                </span>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ------------------------------ toolkit ------------------------------ */

function Toolkit() {
  const ref = useReveal();
  return (
    <section className="bay--tight" id="toolkit">
      <div className="shell">
        <SectionHead num="04" eyebrow="Toolkit" title="What I bring to a team." />
        <div className="toolkit" ref={ref} style={{ opacity: 0 }}>
          {profile.toolkit.map((group) => (
            <div className="toolkit__group" key={group.title}>
              <h3 className="toolkit__title">{group.title}</h3>
              <ul>
                {group.items.map((item) => (
                  <li key={item}>{item}</li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ----------------------------- experience ----------------------------- */

function ExperienceList() {
  const ref = useReveal();
  return (
    <section className="bay" id="experience">
      <div className="shell">
        <SectionHead num="05" eyebrow="Experience" title="Where the reps came from." />
        <ol className="xp" ref={ref} style={{ opacity: 0 }}>
          {experience.map((job) => (
            <li className="xp__row" key={`${job.company}-${job.dates}`}>
              <div className="xp__when">
                <span className="mono">{job.dates}</span>
              </div>
              <div className="xp__what">
                <h3 className="h3">{job.company}</h3>
                <span className="mono xp__role">{job.role}</span>
                <p className="body">{job.summary}</p>
              </div>
              <div className="xp__tags">
                {job.tags.map((t) => (
                  <span className="pill pill--mono" key={t}>{t}</span>
                ))}
              </div>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}

/* -------------------------------- page -------------------------------- */

export default function HomePage() {
  const { loaded } = useOutletContext() ?? { loaded: true };

  return (
    <>
      <Hero ready={loaded} />

      <Marquee items={MARQUEE} />

      <ProofStrip />

      <LatestSignal />

      <section className="bay" id="work">
        <div className="shell">
          <SectionHead
            num="01"
            eyebrow="Active builds"
            title="Products I own end to end."
            sub="Each one is live code with a real scope decision behind it. Open any row for the build log, the PM analysis, and what I would cut next."
          />
        </div>
        <WorkRows products={flagshipProducts} startIndex={1} />
      </section>

      <section className="bay--tight" id="concepts">
        <div className="shell">
          <SectionHead
            num="02"
            eyebrow="Concepts & prototypes"
            title="Smaller bets, sharper questions."
            sub="Concepts prototyped to push on a single hypothesis: usability under pressure, lifecycle modeling, micro-interactions in social products."
          />
        </div>
        <WorkRows products={conceptProducts} startIndex={flagshipProducts.length + 1} />
      </section>

      <CaseStudies />

      <Toolkit />

      <ExperienceList />
    </>
  );
}

Hero.propTypes = {
  ready: PropTypes.bool,
};

SectionHead.propTypes = {
  num: PropTypes.string.isRequired,
  eyebrow: PropTypes.string.isRequired,
  title: PropTypes.node.isRequired,
  sub: PropTypes.string,
};
