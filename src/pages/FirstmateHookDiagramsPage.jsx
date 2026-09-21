import { Link } from 'react-router-dom';
import { getCaseStudyBySlug } from '../content/caseStudies';
/* Paper, type, the TopBar strip and the focus ring all come from the Oasis
   tenancy diagrams stylesheet, so the two case study diagram pages read as one
   family. This page's own stylesheet only frames the drawing. */
import './OasisTenancyDiagramsPage.css';
import './FirstmateHookDiagramsPage.css';
/* The owner's approved drawing, exported once from Excalidraw as static SVGs
   with their font embedded; nothing of Excalidraw ships to visitors. Both come
   from one Mermaid source, so they carry the same words: the wide one runs left
   to right, the phone one stacks the same elements top to bottom. The editable
   .excalidraw scenes sit beside them, and tools/excalidraw/README.md says how
   all four files were made and how to re-export after an edit. */
import drawingWide from '../assets/firstmate-hook-prompt/how-it-broke.svg';
import drawingPhone from '../assets/firstmate-hook-prompt/how-it-broke-phone.svg';

const HOOK_SLUG = 'firstmate-hook-prompt';

/* The wide drawing's handwriting is 20 units in a 1677-unit drawing, so below
   about 1100px of viewport it drops under 12px. The stacked drawing takes over
   there; it is 430 units wide and is never scaled up past its natural size. */
const STACKED_BELOW = '(max-width: 1099px)';

/* The drawing's own words, in reading order, and no others. It describes the
   paths rather than where they sit, so it is true of both layouts. */
const DRAWING_ALT =
  "Hand-drawn diagram titled How it broke, how it was fixed. A Launcher box that can send Enter, Esc and Ctrl-C has three paths leading out of it, each in its own group. Before: the reviewer starts and meets a prompt that reads Hooks need review, 11 new or changed, with Review hooks selected. A dashed arrow labelled can't move the cursor leads to Stuck, no second review. After: an arrow labelled hook layer off leads to the reviewer starting, then Reads the diff, then Second review runs. Not taken: a dashed arrow labelled the shortcut leads to Write 'trusted' into the config, then Prompt gone, then Says a human trusted 11 hooks, nobody did.";

export default function FirstmateHookDiagramsPage() {
  const study = getCaseStudyBySlug(HOOK_SLUG);

  return (
    <div className="fade-in">
      <div className="otd-page">
        <div className="otd-backbar">
          <Link to={`/case-studies/${study.slug}`}>&larr; Back to the case study</Link>
          <span>{study.company} / Second review / Before and after</span>
        </div>

        {/* The visible title is drawn into the picture, in the same hand as its
            boxes. This h1 keeps the page's place in the document outline for
            screen readers and search. */}
        <header className="otd-header">
          <h1 className="sr-only">How it broke, how it was fixed</h1>
          <p className="otd-intro fhd-intro">
            One launcher, and three paths out of it: the one that broke, the one that shipped,
            and the shortcut that was never taken.
          </p>
        </header>

        <div className="otd-canvas">
          <picture className="fhd-frame">
            <source media={STACKED_BELOW} srcSet={drawingPhone} width="430" height="1611" />
            <img className="fhd-drawing" src={drawingWide} alt={DRAWING_ALT} width="1677" height="599" />
          </picture>
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
