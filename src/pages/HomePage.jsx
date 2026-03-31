import { useEffect, useRef } from 'react';
import { HiArrowDownTray, HiArrowUpRight } from 'react-icons/hi2';
import { Link } from 'react-router-dom';
import ctxMotoWorksLogo from '../assets/ctxmotoworks-logo-v2.png';
import hsnbaLogo from '../assets/hsnba-logo-100x250 (1).png';
import lambdaCurryLogo from '../assets/Icon 144x144-1718828587039.webp';
import texasMalibuLogo from '../assets/texasmalibu-logo.png';
import { caseStudies } from '../content/caseStudies';
import { experience } from '../content/experience';
import { profile } from '../content/profile';
import { conceptProducts, flagshipProducts } from '../content/projects';
import { resumeMeta } from '../content/resumeMeta';

const companyLogos = {
  'Lambda Curry': { src: lambdaCurryLogo, alt: 'Lambda Curry logo' },
  'Humane Society (HSNBA)': { src: hsnbaLogo, alt: 'HSNBA logo' },
  'CTX Motoworks': { src: ctxMotoWorksLogo, alt: 'CTX Motoworks logo' },
  'Texas Malibu': { src: texasMalibuLogo, alt: 'Texas Malibu logo' },
};

function HomePage() {
  const homePageRef = useRef(null);

  useEffect(() => {
    if (typeof window === 'undefined') {
      return undefined;
    }

    const root = homePageRef.current;
    if (!root) {
      return undefined;
    }

    const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)');
    const coarsePointer = window.matchMedia('(pointer: coarse)');

    if (reduceMotion.matches || coarsePointer.matches) {
      return undefined;
    }

    let frameId = 0;
    let targetX = 50;
    let targetY = 18;
    let currentX = 50;
    let currentY = 18;

    const writePoint = (x, y) => {
      root.style.setProperty('--mouse-x', `${x}%`);
      root.style.setProperty('--mouse-y', `${y}%`);
    };

    const animatePointer = () => {
      currentX += (targetX - currentX) * 0.14;
      currentY += (targetY - currentY) * 0.14;

      writePoint(currentX, currentY);

      const deltaX = Math.abs(targetX - currentX);
      const deltaY = Math.abs(targetY - currentY);

      if (deltaX <= 0.1 && deltaY <= 0.1) {
        currentX = targetX;
        currentY = targetY;
        writePoint(currentX, currentY);
        frameId = 0;
        return;
      }

      frameId = window.requestAnimationFrame(animatePointer);
    };

    const scheduleAnimation = () => {
      if (!frameId) {
        frameId = window.requestAnimationFrame(animatePointer);
      }
    };

    const handlePointerMove = (event) => {
      const bounds = root.getBoundingClientRect();
      if (!bounds.width || !bounds.height) {
        return;
      }

      const x = ((event.clientX - bounds.left) / bounds.width) * 100;
      const y = ((event.clientY - bounds.top) / bounds.height) * 100;

      targetX = Math.min(Math.max(x, 0), 100);
      targetY = Math.min(Math.max(y, 0), 100);

      scheduleAnimation();
    };

    const handlePointerLeave = () => {
      targetX = 50;
      targetY = 18;
      scheduleAnimation();
    };

    root.addEventListener('pointermove', handlePointerMove);
    root.addEventListener('pointerleave', handlePointerLeave);

    return () => {
      root.removeEventListener('pointermove', handlePointerMove);
      root.removeEventListener('pointerleave', handlePointerLeave);

      if (frameId) {
        window.cancelAnimationFrame(frameId);
      }
    };
  }, []);

  return (
    <div ref={homePageRef} className="home-page pb-16">

      {/* Hero — open text, no container */}
      <section className="section-shell py-16 md:py-28">
        <h1 className="max-w-4xl text-4xl font-semibold leading-tight md:text-6xl">
          {profile.headline}
        </h1>
        <p className="mt-6 max-w-3xl text-lg leading-8 text-[color:var(--ink-muted)] md:text-xl">
          {profile.heroSupport}
        </p>
        <p className="mt-4 max-w-2xl text-base leading-7 text-[color:var(--ink-muted)] opacity-80">
          {profile.summary}
        </p>
        <div className="mt-8 flex flex-col gap-3 sm:flex-row">
          <a
            href={resumeMeta.downloadPath}
            className="cta-primary"
            download
          >
            <HiArrowDownTray className="text-base" />
            Download resume
          </a>
          <Link
            to="/#case-studies"
            className="glass-cta-secondary"
          >
            Read case studies
            <HiArrowUpRight className="text-base" />
          </Link>
        </div>
      </section>

      {/* Products — structured text, no cards */}
      <section className="section-shell py-12 md:py-20">
        <h2 className="section-title">What I'm building now.</h2>
        <p className="section-copy mt-4">
          Flagship builds show what is actively being shipped. The concept lab shows where new product bets are being framed.
        </p>

        <div className="mt-12 grid gap-16 lg:grid-cols-2">
          {flagshipProducts.map((product) => (
            <article key={product.slug}>
              <p className="text-xs font-semibold uppercase tracking-[0.18em] text-[color:var(--accent)]">
                Active build
              </p>
              <h3 className="mt-3 text-3xl font-semibold">
                <Link to={`/products/${product.slug}`} className="transition-colors hover:text-[color:var(--accent)]">
                  {product.name}
                </Link>
              </h3>
              <p className="mt-4 text-base leading-7 text-[color:var(--ink-muted)]">
                {product.oneLiner}
              </p>
              <p className="detail-line mt-5">
                <span className="detail-label">Audience:</span>
                {product.audience}
              </p>
              <p className="detail-line mt-3">
                <span className="detail-label">Problem:</span>
                {product.problem}
              </p>
              <ol className="workflow-list mt-5">
                {product.coreWorkflow.slice(0, 4).map((step, idx) => (
                  <li key={idx}>{step}</li>
                ))}
              </ol>
              <p className="mt-6 border-l-2 border-[color:var(--accent)] pl-4 text-sm leading-7 text-[color:var(--ink-muted)]">
                {product.evidenceSignal}
              </p>
              <Link
                to={`/products/${product.slug}`}
                className="mt-6 inline-flex items-center gap-2 text-sm font-semibold text-[color:var(--ink)] transition hover:text-[color:var(--accent)]"
              >
                Open product brief
                <HiArrowUpRight className="text-base" />
              </Link>
            </article>
          ))}
        </div>

        {/* Concept lab — compact list */}
        <div className="mt-16">
          <p className="text-xs font-semibold uppercase tracking-[0.18em] text-[color:var(--accent)]">
            Concept lab
          </p>
          <div className="mt-4 space-y-4">
            {conceptProducts.map((product) => (
              <div key={product.slug} className="flex flex-col gap-1 sm:flex-row sm:items-baseline sm:gap-3">
                <Link
                  to={`/products/${product.slug}`}
                  className="text-lg font-semibold transition-colors hover:text-[color:var(--accent)]"
                >
                  {product.name}
                </Link>
                <span className="text-sm leading-7 text-[color:var(--ink-muted)]">
                  {product.oneLiner}
                  {product.brandDisclaimer ? (
                    <span className="ml-2 text-xs font-semibold uppercase tracking-[0.1em] text-[color:var(--accent)]">
                      Unofficial concept
                    </span>
                  ) : null}
                </span>
              </div>
            ))}
          </div>
        </div>

        <div className="mt-10 flex flex-col gap-3 sm:flex-row">
          <Link to="/products" className="cta-primary">
            View all product briefs
            <HiArrowUpRight className="text-base" />
          </Link>
        </div>
      </section>

      {/* Case Studies — structured text, no cards */}
      <section id="case-studies" className="section-shell py-12 md:py-20">
        <div className="flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
          <div>
            <h2 className="section-title">Past work that supports the build story.</h2>
            <p className="section-copy mt-4">
              Enough depth to show product judgment and execution quality, without oversharing confidential details.
            </p>
          </div>
          <Link
            to="/resume"
            className="inline-flex items-center gap-2 text-sm font-semibold text-[color:var(--ink-muted)] transition hover:text-[color:var(--ink)]"
          >
            View resume page
            <HiArrowUpRight className="text-base" />
          </Link>
        </div>

        <div className="mt-12 grid gap-16 lg:grid-cols-2">
          {caseStudies.map((study) => {
            const logo = companyLogos[study.company];

            return (
              <article key={study.slug}>
                <div className="flex items-center gap-3">
                  {logo ? (
                    <img src={logo.src} alt={logo.alt} className="h-6 w-6 object-contain" />
                  ) : null}
                  <p className="text-xs font-semibold uppercase tracking-[0.18em] text-[color:var(--accent)]">
                    {study.company} &middot; {study.timeframe}
                  </p>
                </div>
                <h3 className="mt-4 text-2xl font-semibold md:text-3xl">{study.title}</h3>
                <p className="mt-4 text-base leading-7 text-[color:var(--ink-muted)]">
                  {study.tagline}
                </p>
                <p className="mt-5 text-[15px] font-medium leading-7 text-[color:var(--ink)]">
                  {study.featuredOutcome}
                </p>
                <ul className="mt-5 space-y-2">
                  {study.impactHighlights.map((item, idx) => (
                    <li key={`${study.slug}-${idx}`} className="text-sm leading-6 text-[color:var(--ink-muted)]">
                      &mdash; {item}
                    </li>
                  ))}
                </ul>
                <Link
                  to={`/case-studies/${study.slug}`}
                  className="mt-6 inline-flex items-center gap-2 text-sm font-semibold text-[color:var(--ink)] transition hover:text-[color:var(--accent)]"
                >
                  Read full case study
                  <HiArrowUpRight className="text-base" />
                </Link>
              </article>
            );
          })}
        </div>
      </section>

      {/* Experience — clean list with dividers */}
      <section id="experience" className="section-shell py-12 md:py-20">
        <h2 className="section-title">Prior product and systems work.</h2>
        <p className="section-copy mt-4">
          Launch work, automation, operations systems, and customer-facing execution that make the product story more credible.
        </p>

        <div className="mt-10 divide-y divide-[color:var(--line)]">
          {experience.map((item) => {
            const logo = companyLogos[item.company];

            return (
              <article key={`${item.company}-${item.role}`} className="py-8 first:pt-0">
                <div className="flex flex-col gap-1 md:flex-row md:items-baseline md:justify-between">
                  <div className="flex items-center gap-3">
                    {logo ? (
                      <img src={logo.src} alt={logo.alt} className="h-5 w-5 object-contain" />
                    ) : null}
                    <h3 className="text-xl font-semibold">{item.company}</h3>
                    <span className="text-sm text-[color:var(--ink-muted)]">{item.role}</span>
                  </div>
                  <span className="text-sm text-[color:var(--ink-muted)]">{item.dates}</span>
                </div>
                <p className="mt-3 text-base leading-7 text-[color:var(--ink-muted)]">
                  {item.summary}
                </p>
                <ul className="mt-4 space-y-1 pl-4">
                  {item.evidence.map((detail, idx) => (
                    <li key={`${item.company}-${idx}`} className="text-sm leading-6 text-[color:var(--ink-muted)]">
                      {detail}
                    </li>
                  ))}
                </ul>
              </article>
            );
          })}
        </div>
      </section>

      {/* Closing — resume + contact merged */}
      <section id="contact" className="section-shell border-t border-[color:var(--line)] py-12 md:py-20">
        <div className="grid gap-8 md:grid-cols-[minmax(0,1fr)_minmax(260px,0.75fr)] md:items-start">
          <div>
            <h2 className="section-title">Want the full picture?</h2>
            <p className="section-copy mt-4">
              If you want to talk product, operating systems, or the builds in progress, email is the fastest path. LinkedIn and GitHub are here if you want more context first.
            </p>
          </div>
          <div className="flex flex-col gap-3">
            <a
              href={resumeMeta.downloadPath}
              className="cta-primary"
              download
            >
              <HiArrowDownTray className="text-base" />
              Download PDF
            </a>
            <Link
              to="/resume"
              className="glass-cta-secondary"
            >
              Open resume page
              <HiArrowUpRight className="text-base" />
            </Link>
            {profile.contactLinks.map((link) => (
              <a
                key={link.label}
                href={link.href}
                target={link.external ? '_blank' : undefined}
                rel={link.external ? 'noreferrer' : undefined}
                className="inline-flex items-center justify-center gap-2 text-sm font-semibold text-[color:var(--ink-muted)] transition hover:text-[color:var(--ink)]"
              >
                {link.label}
                <HiArrowUpRight className="text-base" />
              </a>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}

export default HomePage;
