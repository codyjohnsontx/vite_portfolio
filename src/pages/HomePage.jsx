import { HiArrowDownTray, HiArrowUpRight, HiEnvelope } from 'react-icons/hi2';
import { Link } from 'react-router-dom';
import hsnbaLogo from '../assets/hsnba-logo-100x250 (1).png';
import lambdaCurryLogo from '../assets/Icon 144x144-1718828587039.webp';
import { caseStudies } from '../content/caseStudies';
import { experience } from '../content/experience';
import { profile } from '../content/profile';
import { activeInitiatives, supportingProjects } from '../content/projects';
import { resumeMeta } from '../content/resumeMeta';

function HomePage() {
  const getCompanyLogo = (company) => {
    if (company === 'Lambda Curry') {
      return { src: lambdaCurryLogo, alt: 'Lambda Curry logo' };
    }

    if (company === 'Humane Society (HSNBA)' || company === 'HSNBA') {
      return { src: hsnbaLogo, alt: 'HSNBA logo' };
    }

    return null;
  };

  return (
    <div className="pb-16">
      <section className="section-shell grid gap-8 py-16 md:grid-cols-[minmax(0,1.3fr)_minmax(320px,0.7fr)] md:py-24">
        <div className="surface-card overflow-hidden bg-[linear-gradient(135deg,rgba(14,26,43,0.96),rgba(23,50,82,0.92))] p-8 text-white md:p-12">
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
              className="inline-flex items-center justify-center gap-2 rounded-full border border-white/20 px-6 py-3 text-sm font-semibold text-white transition hover:border-white/40 hover:bg-white/10"
            >
              Read case studies
              <HiArrowUpRight className="text-base" />
            </Link>
          </div>
        </div>

        <aside className="grid gap-4">
          <div className="surface-card p-7">
            <div className="flex items-start justify-between gap-4">
              <div>
                <span className="eyebrow">Current role</span>
                <p className="text-sm uppercase tracking-[0.2em] text-[color:var(--accent)]">Lambda Curry</p>
              </div>
              <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-white/80 p-3 shadow-sm">
                <img src={lambdaCurryLogo} alt="Lambda Curry logo" className="h-full w-full object-contain" />
              </div>
            </div>
            <p className="mt-3 text-3xl font-semibold">Product Owner</p>
            <p className="mt-4 text-sm leading-6 text-[color:var(--ink-muted)]">
              Managing concurrent client work, backlog priorities, release coordination, and scope visibility across delivery systems.
            </p>
          </div>

          <div className="surface-card flex flex-col justify-between p-8">
          <div>
            <span className="eyebrow">At a glance</span>
            <ul className="space-y-4">
              {profile.quickFacts.map((fact) => (
                <li key={fact} className="rounded-2xl border border-[color:var(--line)] bg-white/55 px-4 py-4 text-sm leading-6 text-[color:var(--ink)]">
                  {fact}
                </li>
              ))}
            </ul>
          </div>
          <div className="mt-8 rounded-[24px] bg-[color:var(--ink)] p-6 text-white">
            <p className="text-sm uppercase tracking-[0.2em] text-white/70">Target roles</p>
            <p className="mt-3 text-2xl font-semibold">PM / Technical PM</p>
            <p className="mt-3 text-sm leading-6 text-white/75">
              Best fit for teams that value strong backlog ownership, technical fluency, and a bias toward clean execution.
            </p>
          </div>
          </div>
        </aside>
      </section>

      <section className="section-shell py-8 md:py-12">
        <span className="eyebrow">Why this story works</span>
        <div className="mb-8 flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
          <div>
            <h2 className="section-title">Selected proof, not generic portfolio filler.</h2>
            <p className="section-copy mt-4">
              This rebuild leads with the signals that matter for PM hiring: product judgment, clarity under ambiguity, customer and business awareness, and the ability to keep delivery moving.
            </p>
          </div>
        </div>
        <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-4">
          {profile.proofThemes.map((theme) => (
            <article key={theme.title} className="surface-card p-6">
              <p className="text-sm uppercase tracking-[0.18em] text-[color:var(--accent)]">{theme.stat}</p>
              <h3 className="mt-3 text-2xl font-semibold">{theme.title}</h3>
              <p className="mt-4 text-sm leading-7 text-[color:var(--ink-muted)]">{theme.body}</p>
            </article>
          ))}
        </div>
      </section>

      <section id="case-studies" className="section-shell py-12 md:py-16">
        <span className="eyebrow">Featured case studies</span>
        <div className="mb-8 flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
          <div>
            <h2 className="section-title">Two stories built for hiring conversations.</h2>
            <p className="section-copy mt-4">
              Each case study is selective by design: enough depth to show product thinking and execution quality, without oversharing confidential details.
            </p>
          </div>
          <Link
            to="/resume"
            className="inline-flex items-center gap-2 text-sm font-semibold text-[color:var(--ink-muted)] transition hover:text-[color:var(--ink)]"
          >
            View resume view
            <HiArrowUpRight className="text-base" />
          </Link>
        </div>
        <div className="grid gap-6 lg:grid-cols-2">
          {caseStudies.map((study) => (
            <article key={study.slug} className="surface-card p-7 md:p-8">
              {(() => {
                const logo = getCompanyLogo(study.company);

                return (
              <div className="flex items-start justify-between gap-4">
                <p className="meta-line">
                  {study.company} • {study.timeframe}
                </p>
                {logo ? (
                  <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl bg-white/80 p-3 shadow-sm">
                    <img src={logo.src} alt={logo.alt} className="h-full w-full object-contain" />
                  </div>
                ) : null}
              </div>
                );
              })()}
              <h3 className="mt-5 text-3xl font-semibold">{study.title}</h3>
              <p className="mt-4 text-base leading-7 text-[color:var(--ink-muted)]">{study.tagline}</p>
              <p className="mt-6 rounded-3xl bg-[color:var(--accent-soft)] px-5 py-4 text-sm leading-6 text-[color:var(--ink)]">
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

      <section className="section-shell py-12 md:py-16">
        <div className="grid gap-6 lg:grid-cols-[minmax(0,1fr)_minmax(0,0.9fr)]">
          <div className="surface-card p-7 md:p-8">
            <span className="eyebrow">Now building</span>
            <h2 className="section-title">Current initiatives that should be part of the story.</h2>
            <p className="section-copy mt-4">
              These projects belong in the portfolio narrative even before they each have a full public case study. They show where product thinking is actively going next.
            </p>
            <div className="mt-6 grid gap-4">
              {activeInitiatives.map((initiative) => (
                <article key={initiative.title} className="rounded-[24px] border border-[color:var(--line)] bg-white/60 p-5">
                  <p className="text-sm uppercase tracking-[0.18em] text-[color:var(--accent)]">{initiative.stage}</p>
                  <h3 className="mt-2 text-2xl font-semibold">{initiative.title}</h3>
                  <p className="mt-3 text-sm leading-7 text-[color:var(--ink-muted)]">{initiative.summary}</p>
                </article>
              ))}
            </div>
          </div>

          <div className="surface-card p-7 md:p-8">
            <span className="eyebrow">Supporting proof</span>
            <h2 className="text-3xl font-semibold">Signals beyond the headline case studies.</h2>
            <div className="mt-6 space-y-5">
              {supportingProjects.map((project) => {
                const content = (
                  <div className="flex gap-4">
                    <div className="flex h-20 w-20 shrink-0 items-center justify-center rounded-2xl bg-white/80 p-3">
                      <img src={project.image} alt={project.title} className="h-full w-full object-contain" />
                    </div>
                    <div>
                      <h3 className="text-lg font-semibold">{project.title}</h3>
                      <p className="mt-2 text-sm leading-6 text-[color:var(--ink-muted)]">{project.summary}</p>
                      <p className="mt-3 text-sm font-medium text-[color:var(--accent)]">{project.relevance}</p>
                    </div>
                  </div>
                );

                if (project.link) {
                  return (
                    <a
                      key={project.title}
                      href={project.link}
                      target="_blank"
                      rel="noreferrer"
                      className="block rounded-[24px] border border-[color:var(--line)] bg-white/60 p-4 transition hover:-translate-y-1"
                    >
                      {content}
                    </a>
                  );
                }

                return (
                  <div key={project.title} className="rounded-[24px] border border-[color:var(--line)] bg-white/60 p-4">
                    {content}
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </section>

      <section id="experience" className="section-shell py-12 md:py-16">
        <span className="eyebrow">Relevant experience</span>
        <h2 className="section-title">Experience framed for PM relevance.</h2>
        <p className="section-copy mt-4">
          This is not a raw chronology. It is a deliberately curated view of the work that best supports a PM transition: customer impact, product judgment, stakeholder alignment, and execution.
        </p>
        <div className="mt-8 space-y-5">
          {experience.map((item) => (
            <article key={`${item.company}-${item.role}`} className="surface-card p-6 md:p-8">
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
                  <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl bg-white/80 p-3 shadow-sm">
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

      <section className="section-shell py-12 md:py-16">
        <div className="grid gap-6 lg:grid-cols-[minmax(0,1fr)_minmax(280px,0.9fr)]">
          <div className="surface-card p-7 md:p-8">
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
          <div className="surface-card p-7 md:p-8">
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

      <section className="section-shell py-12 md:py-16">
        <div className="surface-card overflow-hidden p-8 md:p-10">
          <div className="grid gap-8 md:grid-cols-[minmax(0,1fr)_auto] md:items-end">
            <div>
              <span className="eyebrow">Resume</span>
              <h2 className="section-title">A master PM resume with a tailoring workflow behind it.</h2>
              <p className="section-copy mt-4">
                The public resume is aligned with this site, and the repo now includes a repeatable checklist for tailoring it to product, technical PM, or hybrid product-owner openings.
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
                className="inline-flex items-center justify-center gap-2 rounded-full border border-[color:var(--line)] px-6 py-3 text-sm font-semibold"
              >
                Open resume page
                <HiArrowUpRight className="text-base" />
              </Link>
            </div>
          </div>
        </div>
      </section>

      <section id="contact" className="section-shell py-12 md:py-16">
        <div className="surface-card grid gap-8 p-8 md:grid-cols-[minmax(0,1fr)_minmax(260px,0.75fr)] md:p-10">
          <div>
            <span className="eyebrow">Contact</span>
            <h2 className="section-title">Make the next conversation easy to start.</h2>
            <p className="section-copy mt-4">
              The site is optimized for recruiter conversion, so the contact path is intentionally simple: direct email, LinkedIn, and a current resume download.
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
