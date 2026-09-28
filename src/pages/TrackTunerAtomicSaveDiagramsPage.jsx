import { Link } from 'react-router-dom';
import { getCaseStudyBySlug } from '../content/caseStudies';
/* Paper, type, the TopBar strip and the focus ring all come from the Oasis
   tenancy diagrams stylesheet, and the frame around the drawing from the
   firstmate hook page's, so the three case study diagram pages read as one
   family. This page brings no stylesheet of its own. */
import './OasisTenancyDiagramsPage.css';
import './FirstmateHookDiagramsPage.css';
/* The owner's approved drawing, exported once from Excalidraw as static SVGs
   with their font embedded; nothing of Excalidraw ships to visitors. Both come
   from one Mermaid source, so they carry the same words: the wide one puts the
   Before and After panels side by side, the phone one stacks them. The
   editable .excalidraw scenes sit beside them, and tools/excalidraw/README.md
   says how all four files were made and how to re-export after an edit. */
import drawingWide from '../assets/track-tuner-atomic-save/atomic-save.svg';
import drawingPhone from '../assets/track-tuner-atomic-save/atomic-save-phone.svg';

const STUDY_SLUG = 'track-tuner-atomic-save';

/* The wide drawing's handwriting is 20 units in a 1088-unit drawing, so it
   holds 16px down to about 870px of viewport. The stacked drawing takes over
   at the same breakpoint as the hook drawing, whose stylesheet this page
   shares, which holds it to 430px: a hair under its 434 units, so it is never
   scaled up past its natural size. */
const STACKED_BELOW = '(max-width: 1099px)';

/* The drawing's own words, in reading order, and no others. It describes the
   paths rather than where they sit, so it is true of both layouts. */
const DRAWING_ALT =
  'Hand-drawn diagram titled The save that could half-happen. A box for the phone: every screen reads a database on the phone, and a save also joins the outbox, a queue of changes waiting for signal. Two arrows labelled signal found, the outbox sends it lead into two panels. Before: three separate writes, plus a cleanup delete. The server writes the session, then the laps, then the conditions. A dashed arrow labelled a database write fails partway, and so does the cleanup delete, leads from the laps write to Half-saved, a session with no laps. The phone got no answer and sends the save again, the server sees the session and answers already saved, and the phone clears the outbox. The laps are gone, and nothing on screen says so. After: one transaction, all or nothing. The server saves session, laps and conditions in one step, a database transaction. A dashed arrow labelled a write fails, or the reply is lost, leads to No reply reached the phone. The server stored everything or nothing. The save stays in the outbox. The phone got no answer and sends the save again, finds the complete session or writes it safely, and there is a complete session on the server. The phone clears the outbox. Any session a retry meets is whole.';

export default function TrackTunerAtomicSaveDiagramsPage() {
  const study = getCaseStudyBySlug(STUDY_SLUG);

  return (
    <div className="fade-in">
      <div className="otd-page">
        <div className="otd-backbar">
          <Link to={`/case-studies/${study.slug}`}>&larr; Back to the case study</Link>
          <span>{study.company} / The phone&apos;s save / Before and after</span>
        </div>

        {/* The visible title is drawn into the picture, in the same hand as its
            boxes. This h1 keeps the page's place in the document outline for
            screen readers and search. */}
        <header className="otd-header">
          <h1 className="sr-only">The save that could half-happen</h1>
          <p className="otd-intro fhd-intro">
            One save from the phone, followed through the server twice: three separate
            writes and a cleanup delete, then one all-or-nothing transaction.
          </p>
        </header>

        <div className="otd-canvas">
          <picture className="fhd-frame">
            <source media={STACKED_BELOW} srcSet={drawingPhone} width="434" height="2392" />
            <img className="fhd-drawing" src={drawingWide} alt={DRAWING_ALT} width="1088" height="1330" />
          </picture>
        </div>

        <footer className="otd-footer">
          <Link to={`/case-studies/${study.slug}`}>&larr; Back to the case study</Link>
        </footer>
      </div>
    </div>
  );
}
