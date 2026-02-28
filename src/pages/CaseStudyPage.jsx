import { HiArrowLeft, HiArrowUpRight } from 'react-icons/hi2';
import { Link, Navigate, useParams } from 'react-router-dom';
import hsnbaLogo from '../assets/hsnba-logo-100x250 (1).png';
import lambdaCurryLogo from '../assets/Icon 144x144-1718828587039.webp';
import { getCaseStudyBySlug } from '../content/caseStudies';

function renderList(items) {
  return (
    <ul className="grid gap-3">
      {items.map((item) => (
        <li key={item} className="rounded-2xl border border-[color:var(--line)] bg-white/60 px-4 py-4 text-sm leading-6 text-[color:var(--ink)]">
          {item}
        </li>
      ))}
    </ul>
  );
}

function CaseStudyPage() {
  const { slug } = useParams();
  const study = getCaseStudyBySlug(slug);

  if (!study) {
    return <Navigate to="/" replace />;
  }

  const logo =
    study.company === 'Lambda Curry'
      ? { src: lambdaCurryLogo, alt: 'Lambda Curry logo' }
      : study.company === 'Humane Society (HSNBA)'
        ? { src: hsnbaLogo, alt: 'HSNBA logo' }
        : null;

  return (
    <div className="section-shell py-12 md:py-16">
      <Link
        to="/#case-studies"
        className="inline-flex items-center gap-2 text-sm font-semibold text-[color:var(--ink-muted)] transition hover:text-[color:var(--ink)]"
      >
        <HiArrowLeft className="text-base" />
        Back to featured case studies
      </Link>

      <section className="surface-card mt-6 p-8 md:p-12">
        <div className="flex items-start justify-between gap-4">
          <div>
            <p className="meta-line">{study.company}</p>
            <p className="detail-line mt-2">{study.timeframe} • {study.role}</p>
          </div>
          {logo ? (
            <div className="flex h-16 w-16 shrink-0 items-center justify-center rounded-2xl bg-white/80 p-3 shadow-sm">
              <img src={logo.src} alt={logo.alt} className="h-full w-full object-contain" />
            </div>
          ) : null}
        </div>
        <h1 className="mt-6 max-w-4xl text-4xl font-semibold leading-tight md:text-6xl">{study.title}</h1>
        <p className="mt-6 max-w-3xl text-lg leading-8 text-[color:var(--ink-muted)]">{study.tagline}</p>

        <div className="mt-8 grid gap-5 lg:grid-cols-[minmax(0,1fr)_320px]">
          <div className="rounded-[28px] bg-[color:var(--accent-soft)] p-6">
            <p className="text-sm uppercase tracking-[0.18em] text-[color:var(--accent)]">Challenge</p>
            <p className="mt-4 text-base leading-7">{study.challenge}</p>
          </div>
          <aside className="rounded-[28px] bg-[color:var(--ink)] p-6 text-white">
            <p className="text-sm uppercase tracking-[0.18em] text-white/65">Featured outcome</p>
            <p className="mt-4 text-xl font-semibold leading-8">{study.featuredOutcome}</p>
          </aside>
        </div>
      </section>

      <section className="mt-8 grid gap-8 lg:grid-cols-[minmax(0,1.15fr)_minmax(280px,0.85fr)]">
        <div className="space-y-8">
          <article className="surface-card p-7 md:p-8">
            <span className="eyebrow">Context</span>
            <p className="text-base leading-8 text-[color:var(--ink-muted)]">{study.sections.context}</p>
          </article>

          <article className="surface-card p-7 md:p-8">
            <span className="eyebrow">Problem</span>
            <p className="text-base leading-8 text-[color:var(--ink-muted)]">{study.sections.problem}</p>
          </article>

          <article className="surface-card p-7 md:p-8">
            <span className="eyebrow">Users and stakeholders</span>
            <p className="text-base leading-8 text-[color:var(--ink-muted)]">{study.sections.usersStakeholders}</p>
          </article>

          <article className="surface-card p-7 md:p-8">
            <span className="eyebrow">Goal</span>
            <p className="text-base leading-8 text-[color:var(--ink-muted)]">{study.sections.goal}</p>
          </article>

          <article className="surface-card p-7 md:p-8">
            <span className="eyebrow">Decisions and tradeoffs</span>
            <div className="mt-6 grid gap-5 md:grid-cols-2">
              <div>
                <h2 className="text-2xl font-semibold">Key decisions</h2>
                <div className="mt-4">{renderList(study.sections.decisions)}</div>
              </div>
              <div>
                <h2 className="text-2xl font-semibold">Tradeoffs</h2>
                <div className="mt-4">{renderList(study.sections.tradeoffs)}</div>
              </div>
            </div>
          </article>

          <article className="surface-card p-7 md:p-8">
            <span className="eyebrow">Execution</span>
            <div className="mt-4">{renderList(study.sections.execution)}</div>
          </article>

          <article className="surface-card p-7 md:p-8">
            <span className="eyebrow">Outcome and evidence</span>
            <div className="mt-4">{renderList(study.sections.outcomes)}</div>
            <div className="mt-6">
              <h2 className="text-2xl font-semibold">Evidence notes</h2>
              <div className="mt-4">{renderList(study.sections.metrics)}</div>
            </div>
          </article>

          <article className="surface-card p-7 md:p-8">
            <span className="eyebrow">Reflection</span>
            <div className="mt-4">{renderList(study.sections.lessons)}</div>
          </article>
        </div>

        <aside className="space-y-8">
          <article className="surface-card p-7">
            <span className="eyebrow">Role and ownership</span>
            <p className="text-sm font-semibold uppercase tracking-[0.18em] text-[color:var(--accent)]">{study.team}</p>
            <div className="mt-4">{renderList(study.sections.ownership)}</div>
          </article>

          <article className="surface-card p-7">
            <span className="eyebrow">Constraints</span>
            <div className="mt-4">{renderList(study.sections.constraints)}</div>
          </article>

          <article className="surface-card p-7">
            <span className="eyebrow">Confidentiality note</span>
            <p className="text-base leading-7 text-[color:var(--ink-muted)]">{study.sections.confidentialityNote}</p>
          </article>

          <article className="surface-card p-7">
            <span className="eyebrow">Next step</span>
            <Link
              to="/resume"
              className="mt-4 inline-flex items-center gap-2 rounded-full border border-[color:var(--line)] px-5 py-3 text-sm font-semibold transition hover:border-[color:var(--accent)]"
            >
              Open the resume
              <HiArrowUpRight className="text-base" />
            </Link>
          </article>
        </aside>
      </section>
    </div>
  );
}

export default CaseStudyPage;
