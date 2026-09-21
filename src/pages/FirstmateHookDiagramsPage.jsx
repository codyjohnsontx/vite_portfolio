import { Link } from 'react-router-dom';
import { getCaseStudyBySlug } from '../content/caseStudies';
/* Paper, type, the TopBar strip and the focus ring all come from the Oasis
   tenancy diagrams stylesheet, so the two case study diagram pages read as one
   family. This page's own stylesheet only frames the drawing. */
import './OasisTenancyDiagramsPage.css';
import './FirstmateHookDiagramsPage.css';
/* The owner's approved drawing, exported once from Excalidraw as a static SVG
   with its font embedded; nothing of Excalidraw ships to visitors. The editable
   scene is how-it-broke.excalidraw beside it, and tools/excalidraw/README.md
   says how both were made and how to re-export after an edit. */
import drawing from '../assets/firstmate-hook-prompt/how-it-broke.svg';

const HOOK_SLUG = 'firstmate-hook-prompt';

/* The drawing's own words, in reading order, and no others. */
const DRAWING_ALT =
  "Hand-drawn diagram. A Launcher box that can send Enter, Esc and Ctrl-C has three paths leading out of it, each in its own group. Before: the reviewer starts and meets a prompt that reads Hooks need review, 11 new or changed, with Review hooks selected. A dashed arrow labelled can't move the cursor leads to Stuck, no second review. After: an arrow labelled hook layer off leads to the reviewer starting, then Reads the diff, then Second review runs. Not taken: a dashed arrow labelled the shortcut leads to Write 'trusted' into the config, then Prompt gone, then Says a human trusted 11 hooks, nobody did.";

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
            One launcher, and three paths out of it: the one that broke, the one that shipped,
            and the shortcut that was never taken.
          </p>
        </header>

        <div className="otd-canvas">
          {/* The drawing keeps its reviewed proportions and scrolls sideways inside
              this frame on a narrow screen, rather than shrinking until the
              handwriting cannot be read. A scrolling region has to be focusable
              for the keyboard to reach it. */}
          <div
            className="fhd-frame"
            role="region"
            aria-label="Diagram: how it broke and how it was fixed"
            tabIndex={0}
          >
            <img className="fhd-drawing" src={drawing} alt={DRAWING_ALT} width="1677" height="518" />
          </div>
        </div>

        <footer className="otd-footer">
          <Link to={`/case-studies/${study.slug}`}>&larr; Back to the case study</Link>
          <a
            href="https://github.com/kunchenguid/firstmate/pull/4689"
            target="_blank"
            rel="noreferrer"
          >
            The pull request &rarr;
          </a>
        </footer>
      </div>
    </div>
  );
}
