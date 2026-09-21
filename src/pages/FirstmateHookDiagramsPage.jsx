import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { getCaseStudyBySlug } from '../content/caseStudies';
/* Same paper, cards, notes and type as the Oasis tenancy diagrams, so the two
   case study diagram pages read as one family. Only what that page never had to
   draw - two panels, a terminal, keys - lives in this page's own stylesheet. */
import './OasisTenancyDiagramsPage.css';
import './FirstmateHookDiagramsPage.css';

const HOOK_SLUG = 'firstmate-hook-prompt';
const KEYS = ['Enter', 'Escape', 'Ctrl-C'];

/* Every sentence drawn here is the case study's own. A label may name a part,
   but the page adds no fact the approved copy does not already state - which is
   why the prompt's second and third options are blank bars: the copy names only
   the one the cursor was parked on. */

function Launcher() {
  return (
    <div className="otd-card">
      <p className="otd-card__kicker">Launcher</p>
      <p className="otd-card__title">The thing that launches these reviewers</p>
      <p className="otd-card__sub">The keys it can send</p>
      <div className="otd-chips">
        {KEYS.map((key) => (
          <span key={key} className="otd-chip fhd-key">
            {key}
          </span>
        ))}
        <span className="otd-chip otd-chip--ghost">No arrows</span>
      </div>
    </div>
  );
}

function Arrow({ label }) {
  return (
    <div className="fhd-arrow">
      <span className="fhd-arrow__glyph" aria-hidden="true">
        &darr;
      </span>
      <span className="otd-arrow__label">{label}</span>
    </div>
  );
}

function Panel({ tone, mark, title, body, children }) {
  return (
    <section className={`fhd-panel fhd-panel--${tone}`}>
      <div className="otd-thesis">
        <span className={`otd-thesis__mark otd-thesis__mark--${tone}`}>{mark}</span>
        <div>
          <h2 className="otd-thesis__title">{title}</h2>
          <p className="otd-thesis__body">{body}</p>
        </div>
      </div>
      <div className="fhd-flow">{children}</div>
    </section>
  );
}

Arrow.propTypes = { label: PropTypes.string.isRequired };
Panel.propTypes = {
  tone: PropTypes.oneOf(['amber', 'teal']).isRequired,
  mark: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  body: PropTypes.string.isRequired,
  children: PropTypes.node.isRequired,
};

export default function FirstmateHookDiagramsPage() {
  const study = getCaseStudyBySlug(HOOK_SLUG);

  return (
    <div className="fade-in">
      <div className="otd-page">
        <div className="otd-backbar">
          <Link to={`/case-studies/${study.slug}`}>&larr; Back to the case study</Link>
          <span>{study.company} / Second review / Before and after</span>
        </div>

        <header className="otd-header">
          <h1 className="otd-title">How it broke, how it was fixed</h1>
          <p className="otd-intro">
            The second review, a pass from a different vendor&rsquo;s model, drawn twice: the
            launch that sat at a prompt nobody could answer, and the same launch with the
            hook layer off. The one-line fix is drawn too, marked not taken.
          </p>
        </header>

        <div className="otd-canvas">
          <div className="fhd-panels">
            <Panel
              tone="amber"
              mark="1"
              title="Before &middot; how it broke"
              body="The second reviewer had stopped starting. Not crashed, not erroring. Sitting there."
            >
              <Launcher />
              <Arrow label="launches a reviewer" />
              <div className="otd-card">
                <p className="otd-card__kicker">Second reviewer</p>
                <p className="otd-card__title">Waiting at a prompt</p>
                <div className="fhd-term" role="group" aria-label="The prompt the reviewer stopped at">
                  <p className="fhd-term__head">Hooks need review.</p>
                  <p className="fhd-term__line">11 hooks are new or changed.</p>
                  <p className="fhd-term__line">
                    Hooks can run outside the sandbox after you trust them.
                  </p>
                  <ul className="fhd-term__options">
                    <li className="fhd-term__option fhd-term__option--on">
                      <span aria-hidden="true">&rsaquo;</span> Review hooks
                    </li>
                    <li className="fhd-term__option" aria-hidden="true">
                      <span className="fhd-term__bar" />
                    </li>
                    <li className="fhd-term__option" aria-hidden="true">
                      <span className="fhd-term__bar fhd-term__bar--short" />
                    </li>
                  </ul>
                </div>
                <p className="otd-card__sub">
                  Three options, cursor parked on &ldquo;Review hooks.&rdquo;
                </p>
                <p className="otd-card__foot otd-card__foot--warn">
                  Those eleven hooks were mine. It was being asked to vouch for my desk before
                  it could read my diff.
                </p>
              </div>
              <Arrow label="no arrows, so the cursor cannot move" />
              <div className="otd-card fhd-end fhd-end--amber">
                <p className="otd-card__kicker">Result</p>
                <p className="otd-card__title">No second review</p>
                <p className="otd-card__body">
                  Pressing Enter would have picked the wrong option confidently. For about two
                  weeks, half my code review wasn&rsquo;t happening and I didn&rsquo;t notice.
                </p>
              </div>
            </Panel>

            <Panel
              tone="teal"
              mark="2"
              title="After &middot; how it was fixed"
              body="Reviewers now launch with the hook layer off."
            >
              <Launcher />
              <Arrow label="launches a reviewer, hook layer off" />
              <div className="otd-card">
                <p className="otd-card__kicker">Second reviewer</p>
                <p className="otd-card__title">No prompt to meet</p>
                <div className="fhd-term fhd-term--clear" role="group" aria-label="No prompt appears">
                  <p className="fhd-term__head fhd-term__head--off" aria-hidden="true">
                    Hooks need review.
                  </p>
                  <p className="fhd-term__line">The question just stops applying.</p>
                </div>
                <p className="otd-card__sub">
                  They never meet the prompt, because there&rsquo;s nothing left to trust.
                </p>
                <p className="otd-card__body">Nothing is bypassed and nothing is pre-approved.</p>
                <p className="otd-card__foot">
                  The finished-turn signal stays, so a reviewer still reports when it&rsquo;s
                  done.
                </p>
              </div>
              <Arrow label="reads the diff" />
              <div className="otd-card fhd-end fhd-end--teal">
                <p className="otd-card__kicker">Result</p>
                <p className="otd-card__title">The second review runs</p>
                <p className="otd-card__body">Every second review since has started clean.</p>
              </div>
            </Panel>
          </div>

          <div className="fhd-shortcut">
            <div className="fhd-shortcut__top">
              <p className="otd-door__label">The one-line fix</p>
              <span className="fhd-stamp">Not taken</span>
            </div>
            <div className="fhd-shortcut__row">
              <div className="otd-card otd-card--proposed">
                <p className="otd-card__kicker">Shortcut</p>
                <p className="otd-card__title fhd-struck">Write the trust decision into the config</p>
                <p className="otd-card__body">
                  One line. Prompt gone, reviews running inside a minute.
                </p>
                <p className="otd-card__foot otd-card__foot--warn">
                  The line says a human trusted eleven hooks. No human did.
                </p>
              </div>
              <p className="fhd-shortcut__why">
                Consent you manufacture for yourself isn&rsquo;t consent, it&rsquo;s a note in your
                own handwriting.
              </p>
            </div>
          </div>
        </div>

        <footer className="otd-footer">
          <Link to={`/case-studies/${study.slug}`}>&larr; Back to the case study</Link>
          <a href="https://github.com/kunchenguid/firstmate/pull/4689" target="_blank" rel="noreferrer">
            The pull request &rarr;
          </a>
        </footer>
      </div>
    </div>
  );
}
