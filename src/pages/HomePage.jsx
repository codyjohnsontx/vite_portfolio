import { Link, useNavigate } from 'react-router-dom';
import {
  ArrowGlyph,
  Eyebrow,
  SectionHead,
} from '../components/Editorial';
import FeatureProduct from '../components/FeatureProduct';
import ProductList from '../components/ProductList';
import { Reveal } from '../components/ScrollReveal';
import { caseStudies } from '../content/caseStudies';
import { conceptProducts, flagshipProducts } from '../content/projects';

function Hero() {
  return (
    <section
      className="section"
      id="home"
      style={{ paddingTop: 'clamp(64px, 9vw, 140px)' }}
    >
      <div className="container">
        <div className="home-hero__copy">
          <Reveal
            as="h1"
            className="display"
            delay={80}
            distance={18}
            duration={900}
            style={{ margin: 0 }}
          >
            Turning messy product asks into scoped, shippable work.
          </Reveal>
          <Reveal
            as="p"
            className="hero-support"
            delay={520}
            distance={16}
            duration={840}
          >
            Product manager / technical builder who translates stakeholder needs, user problems, and
            engineering constraints into clear requirements, prioritized work, validation paths, and
            release-ready workflows.
          </Reveal>
        </div>
      </div>
    </section>
  );
}

function ProofStrip() {
  const proofItems = [
    {
      label: 'Requirements clarity',
      body: 'Vague asks become user stories, acceptance criteria, validation rules, and delivery-ready scope.',
    },
    {
      label: 'Cross-team execution',
      body: 'Experience working across product, engineering, QA, design, operations, and stakeholder groups.',
    },
    {
      label: 'Operational trust',
      body: 'Active builds surface validation, readiness, monitoring, and failure states instead of hiding them.',
    },
    {
      label: 'Measured outcomes',
      body: 'Case studies tie product decisions to launch metrics, retention, revenue, data quality, and workflow improvement.',
    },
  ];

  return (
    <Reveal as="section" className="proof-strip" aria-label="Portfolio proof areas" delay={40}>
      <div className="container proof-strip__inner">
        {proofItems.map((item) => (
          <div key={item.label} className="proof-strip__item">
            <span className="mono small uppercase">{item.label}</span>
            <p>{item.body}</p>
          </div>
        ))}
      </div>
    </Reveal>
  );
}

function LatestUpdate() {
  return (
    <Reveal
      as="section"
      className="latest-update"
      aria-labelledby="latest-update-title"
      delay={80}
      duration={840}
    >
      <div className="container latest-update__inner">
        <div className="latest-update__label mono uppercase">Latest update</div>
        <div className="latest-update__copy">
          <h2 id="latest-update-title" className="latest-update__title">
            Wattsmith export verification shipped
          </h2>
          <p className="latest-update__body">
            Wattsmith now verifies .mrc/.erg exports in-repo by parsing generated files back into
            workout timelines and checking durations, power targets, ramps, repeats, cues, and
            golden fixtures. Test count moved from 84 to 119; third-party app acceptance remains
            optional.
          </p>
        </div>
        <div className="latest-update__links">
          <Link to="/products/wattsmith" className="link-arrow latest-update__link">
            Read the build <ArrowGlyph />
          </Link>
          <Link to="/products/wattsmith/analysis" className="link-arrow latest-update__link">
            PM analysis <ArrowGlyph />
          </Link>
        </div>
      </div>
    </Reveal>
  );
}

export default function HomePage() {
  const navigate = useNavigate();

  return (
    <div className="fade-in">
      <Hero />
      <ProofStrip />
      <LatestUpdate />

      <section className="section" id="active">
        <div className="container">
          {flagshipProducts.map((p) => (
            <FeatureProduct key={p.slug} p={p} />
          ))}
        </div>
      </section>

      <Reveal as="section" className="section" id="concepts">
        <div className="container">
          <Reveal delay={80}>
            <SectionHead
              num="02"
              eyebrow="Concepts & prototypes"
              title={<>Smaller bets, sharper questions.</>}
              sub="Concepts I prototyped to push on a single hypothesis: usability under pressure, lifecycle modeling, micro-interactions in social products."
            />
          </Reveal>
          <ProductList
            products={conceptProducts}
            startIndex={flagshipProducts.length + 1}
          />
        </div>
      </Reveal>

      <Reveal as="section" className="section" id="case-studies">
        <div className="container">
          <Reveal className="section-head" style={{ marginBottom: 32 }}>
            <div className="index">
              <Eyebrow>Case studies</Eyebrow>
              <span className="num">03</span>
            </div>
            <div>
              <h2 className="sr-only">Case studies</h2>
            </div>
          </Reveal>
          <div className="case-grid">
            {caseStudies.map((c, index) => (
              <Reveal
                as="button"
                key={c.slug}
                type="button"
                className="case-card"
                delay={index * 90}
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
              </Reveal>
            ))}
          </div>
        </div>
      </Reveal>

    </div>
  );
}
