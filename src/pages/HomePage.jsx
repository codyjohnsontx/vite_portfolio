import { useEffect, useRef } from 'react';
import { HiArrowDownTray, HiArrowUpRight, HiEnvelope } from 'react-icons/hi2';
import { Link } from 'react-router-dom';
import ctxMotoWorksLogo from '../assets/ctxmotoworks-logo-v2.png';
import hsnbaLogo from '../assets/hsnba-logo-100x250 (1).png';
import lambdaCurryLogo from '../assets/Icon 144x144-1718828587039.webp';
import texasMalibuLogo from '../assets/texasmalibu-logo.png';
import { caseStudies } from '../content/caseStudies';
import { experience } from '../content/experience';
import { profile } from '../content/profile';
import { featuredProducts } from '../content/projects';
import { resumeMeta } from '../content/resumeMeta';

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

  const getCompanyLogo = (company) => {
    if (company === 'Lambda Curry') {
      return { src: lambdaCurryLogo, alt: 'Lambda Curry logo' };
    }

    if (company === 'Humane Society (HSNBA)' || company === 'HSNBA') {
      return { src: hsnbaLogo, alt: 'HSNBA logo' };
    }

    if (company === 'CTX Motoworks') {
      return { src: ctxMotoWorksLogo, alt: 'CTX Motoworks logo' };
    }

    if (company === 'Texas Malibu') {
      return { src: texasMalibuLogo, alt: 'Texas Malibu logo' };
    }

    return null;
  };

  return (
    <div ref={homePageRef} className="home-page pb-16">
      <section className="section-shell glass-stage py-16 md:py-24">
        <div className="surface-card glass-panel-strong max-w-5xl overflow-hidden p-8 text-white md:p-12">
          <p className="mb-4 text-sm font-semibold uppercase tracking-[0.18em] text-white/72">
            Product Manager
          </p>
          <h1 className="max-w-4xl text-4xl font-semibold leading-tight md:text-6xl">
            {profile.headline}
          </h1>
          <p className="mt-6 max-w-3xl text-lg leading-8 text-white/78 md:text-xl">
            {profile.heroSupport}
          </p>
          <p className="mt-6 max-w-3xl text-base leading-7 text-white/72">
            {profile.summary}
          </p>
          <div className="mt-8 flex flex-col gap-3 sm:flex-row">
            <a
              href={resumeMeta.downloadPath}
              className="inline-flex items-center justify-center gap-2 rounded-full bg-[color:var(--ink)] px-6 py-3 text-sm font-semibold text-white transition hover:bg-[color:var(--accent)]"
              download
            >
              <HiArrowDownTray className="text-base" />
              Download resume
            </a>
            <Link
              to="/#case-studies"
              className="glass-cta-secondary inline-flex items-center justify-center gap-2 rounded-full px-6 py-3 text-sm font-semibold text-white transition"
            >
              Read case studies
              <HiArrowUpRight className="text-base" />
            </Link>
          </div>
        </div>
      </section>

      <section className="section-shell glass-stage py-8 md:py-12">
        <div className="mb-8 flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
          <div>
            <h2 className="section-title">Featured products.</h2>
            <p className="section-copy mt-4">
              These are the products doing the heaviest lifting on the homepage because they show what I am actively building now, not just what I have shipped before.
            </p>
          </div>
        </div>
        <div className="grid gap-6 lg:grid-cols-2">
          {featuredProducts.map((product) => (
            <article key={product.slug} className="surface-card glass-panel p-7 md:p-8">
              <h3 className="text-3xl font-semibold">{product.name}</h3>
              <p className="mt-4 text-base leading-7 text-[color:var(--ink-muted)]">{product.summary}</p>
              <p className="detail-line mt-5">
                <span className="detail-label">Audience:</span>
                {product.audience}
              </p>
              <p className="detail-line mt-3">
                <span className="detail-label">Problem:</span>
                {product.problem}
              </p>
              <p className="detail-line mt-3">
                <span className="detail-label">Features:</span>
                {product.featureThemes.join(', ')}
              </p>
              <p className="glass-panel-soft mt-5 rounded-3xl px-5 py-4 text-sm leading-6 text-[color:var(--ink)]">
                {product.statusNote}
              </p>
              <p className="mt-4 text-sm font-medium text-[color:var(--accent)]">{product.whyItMatters}</p>
            </article>
          ))}
        </div>
      </section>

      <section className="section-shell glass-stage py-12 md:py-16">
        <span className="eyebrow">Build signals</span>
        <div className="mb-8 flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
          <div>
            <h2 className="section-title">Why these products are credible, not just ideas.</h2>
            <p className="section-copy mt-4">
              The active builds matter more when they sit next to working proof: product launches, operating systems, and automation work that shipped in real environments.
            </p>
          </div>
        </div>
        <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-4">
          {profile.proofThemes.map((theme) => (
            <article key={theme.title} className="surface-card glass-panel-soft p-6">
              <p className="text-sm uppercase tracking-[0.18em] text-[color:var(--accent)]">{theme.stat}</p>
              <h3 className="mt-3 text-2xl font-semibold">{theme.title}</h3>
              <p className="mt-4 text-sm leading-7 text-[color:var(--ink-muted)]">{theme.body}</p>
            </article>
          ))}
        </div>
      </section>

      <section id="case-studies" className="section-shell glass-stage py-12 md:py-16">
        <span className="eyebrow">Selected case studies</span>
        <div className="mb-8 flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
          <div>
            <h2 className="section-title">Past work that supports the current build story.</h2>
            <p className="section-copy mt-4">
              These two case studies stay selective on purpose: enough depth to show product judgment and execution quality, without oversharing confidential details.
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
        <div className="grid gap-6 lg:grid-cols-2">
          {caseStudies.map((study) => (
            <article key={study.slug} className="surface-card glass-panel p-7 md:p-8">
              {(() => {
                const logo = getCompanyLogo(study.company);

                return (
                  <div className="flex items-start justify-between gap-4">
                    <p className="meta-line">
                      {study.company} • {study.timeframe}
                    </p>
                    {logo ? (
                      <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl border border-white/50 bg-white/76 p-3 shadow-sm">
                        <img src={logo.src} alt={logo.alt} className="h-full w-full object-contain" />
                      </div>
                    ) : null}
                  </div>
                );
              })()}
              <h3 className="mt-5 text-3xl font-semibold">{study.title}</h3>
              <p className="mt-4 text-base leading-7 text-[color:var(--ink-muted)]">{study.tagline}</p>
              <p className="glass-panel-soft mt-6 rounded-3xl px-5 py-4 text-sm leading-6 text-[color:var(--ink)]">
                {study.featuredOutcome}
              </p>
              <ul className="mt-6 space-y-3">
                {study.impactHighlights.map((item) => (
                  <li key={item} className="text-sm leading-6 text-[color:var(--ink-muted)]">
                    {item}
                  </li>
                ))}
              </ul>
              <Link
                to={`/case-studies/${study.slug}`}
                className="mt-8 inline-flex items-center gap-2 rounded-full border border-[color:var(--line)] px-5 py-3 text-sm font-semibold transition hover:border-[color:var(--accent)] hover:bg-white/70"
              >
                Read full case study
                <HiArrowUpRight className="text-base" />
              </Link>
            </article>
          ))}
        </div>
      </section>

      <section id="experience" className="section-shell glass-stage py-12 md:py-16">
        <span className="eyebrow">Selected experience</span>
        <h2 className="section-title">Prior product and systems work that supports the products above.</h2>
        <p className="section-copy mt-4">
          The active builds lead this portfolio. The experience below is the supporting proof: launch work, automation, operations systems, and customer-facing execution that make the product story more credible.
        </p>
        <div className="mt-8 space-y-5">
          {experience.map((item) => (
            <article key={`${item.company}-${item.role}`} className="surface-card glass-panel-soft p-6 md:p-8">
              {(() => {
                const logo = getCompanyLogo(item.company);

                return (
              <div className="flex flex-col gap-3 md:flex-row md:items-start md:justify-between">
                <div>
                  <p className="text-sm uppercase tracking-[0.18em] text-[color:var(--accent)]">{item.dates}</p>
                  <h3 className="mt-2 text-2xl font-semibold">{item.company}</h3>
                  <p className="mt-1 text-sm font-semibold text-[color:var(--ink-muted)]">{item.role}</p>
                </div>
                {logo ? (
                  <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl border border-white/50 bg-white/76 p-3 shadow-sm">
                    <img src={logo.src} alt={logo.alt} className="h-full w-full object-contain" />
                  </div>
                ) : null}
              </div>
                );
              })()}
              <p className="mt-5 text-base leading-7 text-[color:var(--ink-muted)]">{item.summary}</p>
              <p className="detail-line mt-3">
                <span className="detail-label">Focus:</span>
                {item.tags.join(', ')}
              </p>
              <ul className="mt-5 grid gap-3 md:grid-cols-3">
                {item.evidence.map((detail) => (
                  <li key={detail} className="rounded-2xl border border-[color:var(--line)] bg-white/60 px-4 py-4 text-sm leading-6 text-[color:var(--ink)]">
                    {detail}
                  </li>
                ))}
              </ul>
            </article>
          ))}
        </div>
      </section>

      <section className="section-shell glass-stage py-12 md:py-16">
        <div className="grid gap-6 lg:grid-cols-[minmax(0,1fr)_minmax(280px,0.9fr)]">
          <div className="surface-card glass-panel-soft p-7 md:p-8">
            <span className="eyebrow">PM toolkit</span>
            <h2 className="section-title">What I bring into product conversations.</h2>
            <div className="mt-8 grid gap-5 md:grid-cols-2">
              {profile.toolkit.map((group) => (
                <article key={group.title} className="rounded-[24px] border border-[color:var(--line)] bg-white/60 p-5">
                  <h3 className="text-xl font-semibold">{group.title}</h3>
                  <p className="detail-line mt-4">{group.items.join(', ')}</p>
                </article>
              ))}
            </div>
          </div>
          <div className="surface-card glass-panel-soft p-7 md:p-8">
            <span className="eyebrow">Operating style</span>
            <h2 className="text-3xl font-semibold">How I work when the stakes are real.</h2>
            <div className="mt-6 space-y-4">
              {[
                'Keep scope visible so surprises are rare, not normal.',
                'Translate vague stakeholder requests into work engineering can actually ship.',
                'Use analytics, qualitative feedback, and delivery signals together instead of in isolation.',
                'Treat operations friction as a product problem when it slows customers or teams down.',
              ].map((item) => (
                <div key={item} className="rounded-[24px] border border-[color:var(--line)] bg-white/60 px-5 py-4 text-sm leading-7 text-[color:var(--ink-muted)]">
                  {item}
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="section-shell glass-stage py-12 md:py-16">
        <div className="surface-card glass-panel overflow-hidden p-8 md:p-10">
          <div className="grid gap-8 md:grid-cols-[minmax(0,1fr)_auto] md:items-end">
            <div>
              <span className="eyebrow">Resume</span>
              <h2 className="section-title">Resume and selected experience.</h2>
              <p className="section-copy mt-4">
                The public resume stays aligned with the site: active products first, selected past work second, and enough detail to keep follow-up conversations concrete.
              </p>
              <p className="mt-4 text-sm font-medium uppercase tracking-[0.18em] text-[color:var(--accent)]">
                Last updated {resumeMeta.lastUpdated}
              </p>
            </div>
            <div className="flex flex-col gap-3 sm:flex-row md:flex-col">
              <a
                href={resumeMeta.downloadPath}
                className="inline-flex items-center justify-center gap-2 rounded-full bg-[color:var(--ink)] px-6 py-3 text-sm font-semibold text-white transition hover:bg-[color:var(--accent)]"
                download
              >
                <HiArrowDownTray className="text-base" />
                Download PDF
              </a>
              <Link
                to="/resume"
                className="glass-cta-secondary inline-flex items-center justify-center gap-2 rounded-full px-6 py-3 text-sm font-semibold text-[color:var(--ink)]"
              >
                Open resume page
                <HiArrowUpRight className="text-base" />
              </Link>
            </div>
          </div>
        </div>
      </section>

      <section id="contact" className="section-shell glass-stage py-12 md:py-16">
        <div className="surface-card glass-panel grid gap-8 p-8 md:grid-cols-[minmax(0,1fr)_minmax(260px,0.75fr)] md:p-10">
          <div>
            <span className="eyebrow">Contact</span>
            <h2 className="section-title">Make the next conversation easy to start.</h2>
            <p className="section-copy mt-4">
              If you want to talk product, operating systems, or the builds in progress, the contact path is intentionally simple: direct email, LinkedIn, and a current resume download.
            </p>
          </div>
          <div className="space-y-3">
            {profile.contactLinks.map((link) => (
              <a
                key={link.label}
                href={link.href}
                target={link.external ? '_blank' : undefined}
                rel={link.external ? 'noreferrer' : undefined}
                className="flex items-center justify-between rounded-[24px] border border-[color:var(--line)] bg-white/60 px-5 py-4 text-sm font-semibold transition hover:border-[color:var(--accent)]"
              >
                <span className="inline-flex items-center gap-3">
                  <HiEnvelope className={link.label === 'Email' ? 'text-base' : 'hidden'} />
                  {link.label}
                </span>
                <HiArrowUpRight className="text-base text-[color:var(--accent)]" />
              </a>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}

export default HomePage;
