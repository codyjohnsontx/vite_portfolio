import PropTypes from 'prop-types';
import { useEffect, useRef } from 'react';
import { Link, useOutletContext } from 'react-router-dom';
import WorkRows from '../components/WorkRows';
import { useKineticText, useMagnetic, useReveal } from '../motion/hooks';
import { gsap, prefersReducedMotion, splitChars } from '../motion/motion';
import { caseStudies, getCaseStudyDeck } from '../content/caseStudies';
import { experience } from '../content/experience';
import { latestSignal } from '../content/latestSignal';
import { profile } from '../content/profile';
import { conceptProducts, flagshipProducts } from '../content/projects';

const HERO_LINES = ['Ambiguous', 'to shipped'];

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

      tl.from('.hero__support', { opacity: 0, y: 20, duration: 1 }, '-=0.95');
    }, root);

    return () => ctx.revert();
  }, [ready]);

  return (
    <section className="hero" ref={rootRef} aria-labelledby="hero-title">
      {/* nav, not div: aria-label is ignored on a generic element */}
      <nav className="hero__rail" aria-label="Active builds">
        {flagshipProducts.slice(0, 5).map((p) => (
          <Link
            key={p.slug}
            to={`/products/${p.slug}`}
            className="pill hero__rail-item"
            data-hero
            style={{ opacity: 0 }}
          >
            {p.name}
          </Link>
        ))}
        <Link
          to="/products"
          className="pill hero__rail-item pill--solid"
          data-hero
          style={{ opacity: 0 }}
        >
          All work
        </Link>
      </nav>

      <p className="hero__support body" data-hero style={{ opacity: 0 }}>
        {profile.heroSupport}
      </p>

      <div className="hero__title-block">
        <span className="mono hero__eyebrow" data-hero style={{ opacity: 0 }}>
          Full stack software engineer · C#/.NET · TypeScript · React · SQL · Austin, TX
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

    </section>
  );
}

/* ------------------------------- proof ------------------------------- */

/* Four claims, each one backed by something on the resume or in a repository
   on this site: the numbers are the resume's own. */
const PROOF = [
  {
    label: 'Requirements to API',
    body: 'A vague ask becomes requirements, a data model, and the endpoints behind it, with acceptance criteria written before the code and the build supported through testing and deployment.',
  },
  {
    label: 'Integrations that hold',
    body: 'Stripe and Twilio webhooks land behind signature verification and duplicate-event prevention, so a replayed event cannot double-charge or double-send.',
  },
  {
    label: 'Reliability under failure',
    body: 'Active builds define what happens on disconnects, restarts, interrupted delivery, and duplicate events, instead of assuming the happy path.',
  },
  {
    label: 'Verified by tests',
    body: 'Oasis Race Control is verified with 373 xUnit and 1,082 TypeScript tests. In CI, every pull request runs a 33-case RAG evaluation on Trackday Tuner and real-database billing tests on Diaz on Demand.',
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
          <span className="mono">{latestSignal.date}</span>
        </div>
        <div className="signal-block__body">
          <h2 className="h2">{latestSignal.title}</h2>
          <p className="lead">{latestSignal.body}</p>
          <div className="signal-block__links">
            {latestSignal.links.map((link, i) => (
              <Link
                key={link.to}
                ref={i === 0 ? ctaRef : undefined}
                to={link.to}
                className="arrow-link"
              >
                {link.label} <span className="glyph" aria-hidden="true">→</span>
              </Link>
            ))}
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
          num="01"
          eyebrow="Case studies"
          title="Real problems, and the calls I made on them."
          sub="Shipped products, architecture decisions, and an open-source fix: what broke or needed deciding, what I chose and why, and what happened after."
        />
        <div className="case-grid-wrap">
          <div className="case-grid" ref={ref} style={{ opacity: 0 }}>
            {caseStudies.map((c) => (
              <Link
                key={c.slug}
                to={`/case-studies/${c.slug}`}
                className="card case-card"
              >
                <div className="case-card__top">
                  <span className="mono">{c.company}</span>
                  <span className="mono">{c.role}</span>
                </div>
                <h3 className="h3 case-card__title">{c.title}</h3>
                <p className="body case-card__tag">{getCaseStudyDeck(c)}</p>
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
      </div>
    </section>
  );
}

/* ----------------------------- experience ----------------------------- */

function ExperienceList({ num }) {
  const ref = useReveal();
  return (
    <section className="bay" id="experience">
      <div className="shell">
        <SectionHead num={num} eyebrow="Experience" title="Where the reps came from." />
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
  const hasConcepts = conceptProducts.length > 0;

  return (
    <>
      <Hero ready={loaded} />

      {/* Case studies lead, on the owner's call: the first thing under the
          hero is the work that was accepted by other people. */}
      <CaseStudies />

      <ProofStrip />

      <LatestSignal />

      <section className="bay" id="work">
        <div className="shell">
          <SectionHead
            num="02"
            eyebrow="Active builds"
            title="Products I own end to end."
            sub="Each one is live code with a real scope decision behind it. Open any row for the build log, the PM analysis, and what I would cut next."
          />
        </div>
        <WorkRows products={flagshipProducts} startIndex={1} />
      </section>

      {/* Every concept is archived today, and an empty section reads as a
          broken page, so it is drawn only when it has rows. */}
      {hasConcepts ? (
        <section className="bay--tight" id="concepts">
          <div className="shell">
            <SectionHead
              num="03"
              eyebrow="Concepts & prototypes"
              title="Smaller bets, sharper questions."
              sub="Concepts prototyped to push on a single hypothesis: usability under pressure, lifecycle modeling, micro-interactions in social products."
            />
          </div>
          <WorkRows products={conceptProducts} startIndex={flagshipProducts.length + 1} />
        </section>
      ) : null}

      <ExperienceList num={hasConcepts ? '04' : '03'} />
    </>
  );
}

Hero.propTypes = {
  ready: PropTypes.bool,
};

ExperienceList.propTypes = {
  num: PropTypes.string.isRequired,
};

SectionHead.propTypes = {
  num: PropTypes.string.isRequired,
  eyebrow: PropTypes.string.isRequired,
  title: PropTypes.node.isRequired,
  sub: PropTypes.string,
};
