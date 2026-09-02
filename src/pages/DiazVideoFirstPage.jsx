import { Link, Navigate, useParams } from 'react-router-dom';
import { getProductBySlug } from '../content/projects';
import './DiazVideoFirstPage.css';

const PRODUCT_SLUG = 'diaz-on-demand';

const COUNTS = [
  { n: '67', t: 'lessons in the catalogue' },
  { n: '48', t: 'have no video source at all' },
  { n: '16', t: 'point at video assets that do not exist' },
  { n: '3', t: 'actually play', live: true },
];

const DECISIONS = [
  {
    q: 'Where does a paid lesson’s thumbnail come from?',
    a: (
      <>
        The API serves the image bytes itself at <code>/lessons/:id/thumbnail</code>. No
        identifier appears on any public payload, and no migration.
      </>
    ),
  },
  {
    q: 'What picture does a course row use?',
    a: <>Derived from the first playable lesson in the course. Nothing stored.</>,
  },
  {
    q: 'Do unfilmed lessons appear in the library?',
    a: (
      <>
        Yes, shown as planned: dimmed, counted, and never clickable into a player that would
        fail.
      </>
    ),
  },
  {
    q: 'Which typeface?',
    a: <>Barlow Condensed and Barlow, replacing Oswald and Manrope.</>,
  },
];

export default function DiazVideoFirstPage() {
  const { slug } = useParams();
  const product = getProductBySlug(slug);

  if (!product || product.slug !== PRODUCT_SLUG) {
    return <Navigate to="/not-found" replace />;
  }

  return (
    <div className="fade-in">
      <div className="dvb-page">
        <div className="dvb-inner">
          <div className="dvb-backbar">
            <Link to={`/products/${product.slug}`}>&larr; Back to {product.name}</Link>
            <span>Diaz on Demand / Features / Video-first browse &amp; watch</span>
          </div>

          <header>
            <p className="dvb-eyebrow">Design brief &middot; browse &amp; watch</p>
            <h1 className="dvb-title">A video product with almost no video in it</h1>
            <p className="dvb-lead">
              Diaz on Demand sells a subscription to video lessons. Three of its sixty-seven
              lessons have a video that plays. That number, not a layout, is what this design had
              to solve:{' '}
              <strong>
                every screen was drawn twice, the populated target and the sparse version that is
                what actually ships first
              </strong>
              , because an empty catalogue is the launch state and not an accident to be tidied up
              later.
            </p>
            <Link className="dvb-cta" to={`/products/${product.slug}/video-first/wireframes`}>
              View the wireframes &rarr;
            </Link>

            <div className="dvb-counts">
              {COUNTS.map((c) => (
                <div className={`dvb-count${c.live ? ' dvb-count--live' : ''}`} key={c.t}>
                  <div className="dvb-count__n">{c.n}</div>
                  <p className="dvb-count__t">{c.t}</p>
                </div>
              ))}
            </div>
          </header>

          <section className="dvb-section">
            <p className="dvb-eyebrow">The constraint</p>
            <h2 className="dvb-h2">Designing the empty state on purpose</h2>
            <p className="dvb-body">
              The existing browse screens hide the problem. Every lesson card gets a generated
              gradient poster with the lesson&rsquo;s initials on it, so a lesson with no video
              looks exactly as furnished as a lesson with one. That reads as a full catalogue
              until a member taps one and finds nothing there.
            </p>
            <p className="dvb-body">
              So the whole design hangs on one rule:{' '}
              <strong>a tile with artwork means the lesson plays, and a tile without one does not</strong>
              . The moment a placeholder looks like a poster, artwork stops carrying information,
              and every real thumbnail added later is worth less. With a catalogue that is four
              percent filmed, that is not a small effect.
            </p>
            <p className="dvb-body">
              Drawing the sparse version as its own screen rather than as the populated one with
              things missing changed four things:
            </p>
            <ul className="dvb-list">
              <li>
                <strong>An empty library needs three shapes, not one.</strong> Planned in this
                program, filming now, and not started are three different messages. Rendering all
                three as the same paragraph of grey text is what makes an early catalogue read as
                broken rather than early.
              </li>
              <li>
                <strong>&ldquo;Continue watching&rdquo; is the wrong section at three videos.</strong>{' '}
                It is empty most of the time. The same row, retitled &ldquo;Available now&rdquo;
                and shown unconditionally, is the honest version, and it reverts once there is
                enough to continue.
              </li>
              <li>
                <strong>Every dead end offers the live one.</strong> The empty player&rsquo;s
                primary action is not &ldquo;go back&rdquo;; it is the lesson in that course that
                does play. With three playable videos, the most useful thing any dead end can do
                is name a live one.
              </li>
              <li>
                <strong>An unfilmed lesson shows no runtime.</strong> The stored duration is a
                planned length, not a runtime, and showing it would be the first small lie.
              </li>
            </ul>
          </section>

          <section className="dvb-section">
            <p className="dvb-eyebrow">The decisions</p>
            {/* The table below is named by this heading rather than by an
                aria-label of its own, so the accessible name is the visible
                text and cannot drift away from it. */}
            <h2 className="dvb-h2" id="dvb-decisions-heading">
              Four calls, and the thread between them
            </h2>
            <p className="dvb-body">
              Four questions were open going into the review and were settled in it. What connects
              them is not a visual theme.
            </p>
            <div className="dvb-tablewrap">
              <table className="dvb-table" aria-labelledby="dvb-decisions-heading">
                <thead>
                  <tr>
                    <th>Question</th>
                    <th>Decision</th>
                  </tr>
                </thead>
                <tbody>
                  {DECISIONS.map((d) => (
                    <tr key={d.q}>
                      <td>{d.q}</td>
                      <td className="dvb-cell">{d.a}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <p className="dvb-thread">
              <b>The thread</b>
              All four landed with no database change. The two that could have forced one &mdash;
              where a lesson&rsquo;s thumbnail comes from, and what picture a course row uses
              &mdash; both went the derived way. Lesson, course, and program are untouched, so
              none of this work has to queue behind a migration.
            </p>
          </section>

          <section className="dvb-section">
            <p className="dvb-eyebrow">The interesting one</p>
            <h2 className="dvb-h2">Avoiding the migration was the design problem</h2>
            <p className="dvb-body">
              Every video hosted on Mux comes with a generated thumbnail for free, at a URL built
              from the video&rsquo;s playback identifier. There is no thumbnail field on a lesson
              today and the obvious move is not to add one: let the web app build that URL from
              the playback identifier it already receives.
            </p>
            <p className="dvb-body">
              That does not work here, and what blocks it is the product&rsquo;s own security
              rule. The browse endpoints take no authentication, so their payloads are public, and
              the API deliberately strips the video identifier out of every paid lesson before it
              sends one &mdash; two thirds of the catalogue. The client is never told the
              identifier, so it cannot build the URL. Handing it back would also, separately,
              switch signed playback off, which is the thing that identifier was withheld to
              protect in the first place.
            </p>
            <p className="dvb-body">
              So the picture has to be minted by the server. The route that was chosen serves the
              image bytes itself, rather than serving an address the browser then fetches:{' '}
              <strong>
                no identifier leaves the API, the security rule is untouched, and it costs one
                route and a cache header instead of a column
              </strong>
              . Course artwork went the same way for the same reason &mdash; a course is a
              container and has no frame of its own, so it borrows the first playable
              lesson&rsquo;s. Storing a chosen cover on the course stays available later and stays
              additive; it just is not needed for anything on these screens.
            </p>
            <p className="dvb-open">
              <b>Still open</b>
              Choosing that route created one question and did not answer it. The browse payloads
              are public, so a thumbnail address for a paid lesson will sit on them. Does that
              address return the real frame to a signed-out visitor, or a locked tile? Serving it
              is marketing, and it is what the comparable products do. Refusing is stricter, and
              consistent with how hard this codebase already works to keep paid identifiers off
              anonymous payloads. It changes what a signed-out library looks like, which is the
              marketing surface, so it is being settled before the route is written rather than
              after.
            </p>
          </section>

          <section className="dvb-section">
            <p className="dvb-eyebrow">The drawings</p>
            <h2 className="dvb-h2">Both versions of every screen</h2>
            <p className="dvb-body">
              Library, watch, the paywalled view, and both screens at phone width &mdash; each one
              populated and sparse, side by side, plus the four lesson states everything else is
              built from, and the poster surface they replace.
            </p>
            <Link className="dvb-cta" to={`/products/${product.slug}/video-first/wireframes`}>
              View the wireframes &rarr;
            </Link>
          </section>

          <footer className="dvb-footer">
            <Link to={`/products/${product.slug}`}>&larr; {product.name}</Link>
            <Link to={`/products/${product.slug}/video-first/wireframes`}>Wireframes &rarr;</Link>
          </footer>
        </div>
      </div>
    </div>
  );
}
