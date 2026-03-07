import { HiArrowDownTray, HiArrowUpRight } from 'react-icons/hi2';
import ctxMotoWorksLogo from '../assets/ctxmotoworks-logo-v2.png';
import hsnbaLogo from '../assets/hsnba-logo-100x250 (1).png';
import lambdaCurryLogo from '../assets/Icon 144x144-1718828587039.webp';
import texasMalibuLogo from '../assets/texasmalibu-logo.png';
import { resumeContent } from '../content/resumeContent';
import { resumeMeta } from '../content/resumeMeta';

function ResumePage() {
  const getCompanyLogo = (company) => {
    if (company === 'Lambda Curry') {
      return { src: lambdaCurryLogo, alt: 'Lambda Curry logo' };
    }

    if (company === 'HSNBA') {
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
    <div className="section-shell py-12 md:py-16">
      <section className="surface-card p-8 md:p-12">
        <div className="flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
          <div>
            <span className="eyebrow">Resume</span>
            <h1 className="max-w-4xl text-4xl font-semibold leading-tight md:text-6xl">{resumeContent.headline}</h1>
            <div className="mt-6 max-w-3xl space-y-4">
              {resumeContent.summary.map((paragraph) => (
                <p key={paragraph} className="text-base leading-8 text-[color:var(--ink-muted)] md:text-lg">
                  {paragraph}
                </p>
              ))}
            </div>
          </div>
          <div className="no-print flex flex-col gap-3">
            <a
              href={resumeMeta.downloadPath}
              className="cta-primary"
              download
            >
              <HiArrowDownTray className="text-base" />
              Download PDF
            </a>
            <a
              href={resumeMeta.htmlSourcePath}
              className="glass-cta-secondary"
              target="_blank"
              rel="noreferrer"
            >
              Open printable source
              <HiArrowUpRight className="text-base" />
            </a>
          </div>
        </div>
      </section>

      <section className="mt-8 grid gap-8 lg:grid-cols-[minmax(0,1fr)_320px]">
        <div className="space-y-8">
          <article className="surface-card p-7 md:p-8">
            <span className="eyebrow">Core strengths</span>
            <div className="mt-5 grid gap-5 md:grid-cols-2">
              {resumeContent.strengths.map((group) => (
                <div key={group.label} className="rounded-[24px] border border-[color:var(--line)] bg-white/60 p-5">
                  <h2 className="text-xl font-semibold">{group.label}</h2>
                  <p className="detail-line mt-4">{group.items.join(', ')}</p>
                </div>
              ))}
            </div>
          </article>

          <article className="surface-card p-7 md:p-8">
            <span className="eyebrow">Experience</span>
            <div className="mt-4 space-y-6">
              {resumeContent.experience.map((item) => (
                <div key={`${item.company}-${item.role}`} className="rounded-[24px] border border-[color:var(--line)] bg-white/60 p-5">
                  {(() => {
                    const logo = getCompanyLogo(item.company);

                    return (
                  <div className="flex flex-col gap-2 md:flex-row md:items-end md:justify-between">
                    <div>
                      <h2 className="text-2xl font-semibold">{item.company}</h2>
                      <p className="text-sm font-semibold text-[color:var(--ink-muted)]">{item.role}</p>
                    </div>
                    {logo ? (
                      <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-white/80 p-2 shadow-sm">
                        <img src={logo.src} alt={logo.alt} className="h-full w-full object-contain" />
                      </div>
                    ) : null}
                  </div>
                    );
                  })()}
                  <ul className="mt-4 space-y-3">
                    {item.bullets.map((bullet) => (
                      <li key={bullet} className="text-sm leading-7 text-[color:var(--ink-muted)]">
                        {bullet}
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </article>
        </div>

        <aside className="space-y-8">
          <article className="surface-card p-7">
            <span className="eyebrow">Selected projects</span>
            <ul className="mt-4 space-y-3">
              {resumeContent.selectedProjects.map((project) => (
                <li key={project} className="rounded-2xl border border-[color:var(--line)] bg-white/60 px-4 py-4 text-sm leading-6">
                  {project}
                </li>
              ))}
            </ul>
          </article>

          <article className="surface-card p-7">
            <span className="eyebrow">Credentials and community</span>
            <ul className="mt-4 space-y-3">
              {resumeContent.credentials.map((item) => (
                <li key={item} className="rounded-2xl border border-[color:var(--line)] bg-white/60 px-4 py-4 text-sm leading-6">
                  {item}
                </li>
              ))}
            </ul>
          </article>

          <article className="surface-card p-7">
            <span className="eyebrow">Active builds</span>
            <ul className="mt-4 space-y-3">
              {resumeContent.activeBuilds.map((item) => (
                <li key={item} className="rounded-2xl border border-[color:var(--line)] bg-white/60 px-4 py-4 text-sm leading-6">
                  {item}
                </li>
              ))}
            </ul>
          </article>
        </aside>
      </section>
    </div>
  );
}

export default ResumePage;
