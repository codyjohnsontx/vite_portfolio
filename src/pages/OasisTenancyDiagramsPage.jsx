import { useState } from 'react';
import { Link, Navigate, useParams } from 'react-router-dom';
import { getCaseStudyBySlug } from '../content/caseStudies';
import { DIAGRAM_STATES } from '../content/oasisTenancyDiagrams';
import './OasisTenancyDiagramsPage.css';

const TENANCY_SLUG = 'oasis-multi-tenancy';

export default function OasisTenancyDiagramsPage() {
  const { slug } = useParams();
  const study = getCaseStudyBySlug(slug);
  const [stateId, setStateId] = useState(DIAGRAM_STATES[0].id);

  if (!study || study.slug !== TENANCY_SLUG) {
    return <Navigate to="/not-found" replace />;
  }

  const active = DIAGRAM_STATES.find((s) => s.id === stateId) ?? DIAGRAM_STATES[0];

  return (
    <div className="fade-in">
      <div className="otd-page">
        <div className="otd-backbar">
          <Link to={`/case-studies/${study.slug}`}>&larr; Back to the case study</Link>
          <span>Oasis Race Control / Tenancy / System design</span>
        </div>

        <header className="otd-header">
          <h1 className="otd-title">One database or many</h1>
          <p className="otd-intro">
            The two architectures that were weighed for Oasis Race Control when its owners
            said they wanted to franchise, drawn against the single venue that exists today.
            Shared won. The diagrams are here because the answer is less useful than the
            comparison.
          </p>

          <div className="otd-tabs" role="group" aria-label="Architecture state">
            {DIAGRAM_STATES.map((s) => (
              <button
                key={s.id}
                type="button"
                className="otd-tab"
                aria-pressed={s.id === stateId}
                onClick={() => setStateId(s.id)}
              >
                <span className="otd-tab__name">{s.tab}</span>
                <span className="otd-tab__sub">{s.sub}</span>
              </button>
            ))}
          </div>

          <div className="otd-door">
            <p className="otd-door__label">The argument that decided it</p>
            <div className="otd-door__row">
              <div className="otd-door__leg otd-door__leg--open">
                <p className="otd-door__way">Shared &rarr; separate, later</p>
                <p className="otd-door__body">
                  A clean partition. You already have a venue column on every row. You split
                  on it.
                </p>
              </div>
              <div className="otd-door__leg otd-door__leg--shut">
                <p className="otd-door__way">Separate &rarr; shared, later</p>
                <p className="otd-door__body">
                  A merge. N independent driver namespaces and no reliable way to decide
                  whether the Mike at Dallas and the Mike at Phoenix are the same person. No
                  email addresses. A four-digit PIN. At some point you are guessing, and
                  people notice when you guess wrong about who they are.
                </p>
              </div>
            </div>
            <p className="otd-door__close">
              One direction you can walk back. The other you cannot. That settled it.
            </p>
          </div>
        </header>

        {/* The only source for this markup is DIAGRAM_STATES, whose every value is a
            module-level template literal built from literals in
            src/content/oasisTenancyDiagrams.js. Its helpers interpolate their arguments
            unescaped, so keep it that way: no route param, request, fetched, or
            user-provided value may reach these strings. */}
        <div
          className="otd-canvas"
          key={active.id}
          dangerouslySetInnerHTML={{ __html: active.html }}
        />

        <footer className="otd-footer">
          <Link to={`/case-studies/${study.slug}`}>&larr; Back to the case study</Link>
          <Link to="/products/oasis-race-control">Oasis Race Control &rarr;</Link>
        </footer>
      </div>
    </div>
  );
}
