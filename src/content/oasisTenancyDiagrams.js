/* System design wireframes for the Oasis Race Control tenancy decision.
   Three states rendered as raw HTML; React owns the toggle between them.

   Everything drawn here corresponds to something that exists in Oasis Race
   Control today or was genuinely proposed while the decision was being weighed.
   Layout and colour live in OasisTenancyDiagramsPage.css, so the markup below
   carries classes rather than inline styles and the whole board can reflow at
   narrow widths. */

const rigStack = (venue, city, rigs) => `
  <div class="otd-card otd-card--venue">
    <p class="otd-card__kicker">Venue</p>
    <p class="otd-card__title">${venue}</p>
    <p class="otd-card__sub">${city}</p>
    <div class="otd-chips">
      ${rigs.map((r) => `<span class="otd-chip">${r}</span>`).join('')}
      <span class="otd-chip otd-chip--ghost">+ the rest</span>
    </div>
    <p class="otd-card__foot">Each rig PC runs the .NET rig agent: reads iRacing
      telemetry, queues laps locally, ships them once.</p>
  </div>`;

const tableRow = (name, cols, flag) => `
  <div class="otd-table${flag ? ` otd-table--${flag}` : ''}">
    <span class="otd-table__name">${name}</span>
    <span class="otd-table__cols">${cols}</span>
  </div>`;

const note = (tone, mark, title, body) => `
  <div class="otd-note otd-note--${tone}">
    <span class="otd-note__mark">${mark}</span>
    <div>
      <p class="otd-note__title">${title}</p>
      <p class="otd-note__body">${body}</p>
    </div>
  </div>`;

const appCard = (foot) => `
  <div class="otd-card otd-card--app">
    <p class="otd-card__kicker">Application</p>
    <p class="otd-card__title">Oasis Race Control</p>
    <p class="otd-card__sub">Next.js on Vercel</p>
    <ul class="otd-list">
      <li>QR check-in</li>
      <li>Idempotent lap ingestion</li>
      <li>Driver portal, on a phone</li>
      <li>Staff dashboard</li>
      <li>Wall board at <span class="otd-code">/tv</span></li>
    </ul>
    <p class="otd-card__foot">${foot}</p>
  </div>`;

const arrow = (label) => `
  <div class="otd-arrow">
    <span class="otd-arrow__glyph" aria-hidden="true">&#8594;</span>
    ${label ? `<span class="otd-arrow__label">${label}</span>` : ''}
  </div>`;

const ledger = (label, items) => `
  <div class="otd-ledger">
    <p class="otd-ledger__label">${label}</p>
    <ul class="otd-ledger__list">
      ${items
        .map(
          (i) =>
            `<li class="otd-ledger__item otd-ledger__item--${i.tone}">
              <span class="otd-ledger__count">${i.count}</span>
              <span class="otd-ledger__text">${i.text}</span>
            </li>`,
        )
        .join('')}
    </ul>
  </div>`;

/* ---------- 1. Today ---------- */

export const STATE_TODAY_HTML = `
  <section class="otd-state">
    <div class="otd-thesis">
      <span class="otd-thesis__mark">1</span>
      <div>
        <h2 class="otd-thesis__title">Today &middot; one venue</h2>
        <p class="otd-thesis__body">One shop, twenty-odd iRacing machines, one
          application, one database. It was built this way because there was one
          venue, and every assumption below was the right call when it was made.</p>
      </div>
    </div>

    <div class="otd-board">
      <div class="otd-col">
        <p class="otd-col__label">Floor</p>
        ${rigStack('Oasis Sim Racing', 'Austin, Texas', ['Rig 01', 'Rig 02', 'Rig 03', 'Rig 04'])}
      </div>

      ${arrow('laps')}

      <div class="otd-col">
        <p class="otd-col__label">Application</p>
        ${appCard('One deploy. A production deploy fails if the database is behind, so the previous schema-matching version keeps serving.')}
      </div>

      ${arrow('one connection')}

      <div class="otd-col">
        <p class="otd-col__label">Data</p>
        <div class="otd-card otd-card--db">
          <p class="otd-card__kicker">Database</p>
          <p class="otd-card__title">Neon Postgres</p>
          <p class="otd-card__sub">One database. One migration run. One backup.</p>
          ${tableRow('drivers', 'display name &middot; PIN hash')}
          ${tableRow('rigs', 'rig number')}
          ${tableRow('laps', 'driver &middot; rig &middot; lap time')}
          ${tableRow('league_rounds', 'opened &middot; closed')}
          <p class="otd-card__foot">No venue anywhere in the schema, because
            there is nothing to distinguish.</p>
        </div>
      </div>
    </div>

    <div class="otd-notes">
      <p class="otd-notes__label">Three of the thirteen assumptions that stop being true with two venues</p>
      <div class="otd-notes__row">
        ${note(
          'amber',
          '01',
          'One open round in the whole table',
          `A unique index on <span class="otd-code">league_rounds</span> permits
           exactly one open round across the entire table. That is what makes
           &ldquo;the lap that just landed belongs to tonight&rsquo;s round&rdquo;
           unambiguous. With two venues, Dallas opens their Wednesday round and
           Austin staff get a constraint violation. Not a degradation. A hard stop.`,
        )}
        ${note(
          'amber',
          '02',
          'Every venue is in Chicago',
          `The function that decides what <em>today</em> means has the timezone
           hardcoded, with a comment saying single-venue product, so a constant is
           fine for now. Honest, correct at the time, and quietly wrong the moment a
           franchise opens in Phoenix. Laps land on the wrong day, which puts them in
           the wrong league round, which makes the season standings wrong.`,
        )}
        ${note(
          'amber',
          '03',
          'Rig numbers and driver names are globally unique',
          `Every venue has a Rig 01. Plenty of venues have a Mike.`,
        )}
      </div>
    </div>
  </section>
`;

/* ---------- 2. Shared database with a venue column ---------- */

export const STATE_SHARED_HTML = `
  <section class="otd-state">
    <div class="otd-thesis">
      <span class="otd-thesis__mark otd-thesis__mark--teal">2</span>
      <div>
        <h2 class="otd-thesis__title">One shared database, with a venue column</h2>
        <p class="otd-thesis__body">Every venue keeps its own rigs and its own
          board. The venue dimension goes through the whole schema instead of
          through the infrastructure. The network leaderboard is the query that
          already exists, with the venue filter left off.</p>
      </div>
    </div>

    <div class="otd-board">
      <div class="otd-col">
        <p class="otd-col__label">Floor</p>
        ${rigStack('Oasis Sim Racing', 'Austin', ['Rig 01', 'Rig 02', 'Rig 03'])}
        ${rigStack('Oasis Sim Racing', 'Dallas', ['Rig 01', 'Rig 02', 'Rig 03'])}
        ${rigStack('Oasis Sim Racing', 'Phoenix', ['Rig 01', 'Rig 02', 'Rig 03'])}
      </div>

      ${arrow('laps, stamped with a venue')}

      <div class="otd-col">
        <p class="otd-col__label">Application</p>
        ${appCard('One deploy, and the build gate keeps asking one question about one database.')}
        <div class="otd-card otd-card--soft">
          <p class="otd-card__kicker">Isolation</p>
          <p class="otd-card__body">A franchisee&rsquo;s worry is commercial, and
            it sounds like <em>can the shop across town see my customer list</em>.
            That is answerable with an application boundary, and with row level
            security in the database if they want it in writing.</p>
          <p class="otd-card__foot">What is in the schema: a display name, a hashed
            four-digit PIN, lap times. No driver email addresses. No payment data.</p>
        </div>
      </div>

      ${arrow('one connection')}

      <div class="otd-col">
        <p class="otd-col__label">Data</p>
        <div class="otd-card otd-card--db">
          <p class="otd-card__kicker">Database</p>
          <p class="otd-card__title">Neon Postgres</p>
          <p class="otd-card__sub">Still one database. Still one migration run. Still one backup.</p>
          ${tableRow('venues', 'name &middot; timezone', 'new')}
          ${tableRow('drivers', '<span class="otd-code">venue_id</span> &middot; display name &middot; PIN hash', 'venue')}
          ${tableRow('rigs', '<span class="otd-code">venue_id</span> &middot; rig number', 'venue')}
          ${tableRow('laps', '<span class="otd-code">venue_id</span> &middot; driver &middot; rig &middot; lap time', 'venue')}
          ${tableRow('league_rounds', '<span class="otd-code">venue_id</span> &middot; opened &middot; closed', 'venue')}
          <p class="otd-card__foot">Three to four weeks of schema work to put the
            venue dimension through every table. Not scheduled: there is still only
            one venue.</p>
        </div>

        <div class="otd-card otd-card--query">
          <p class="otd-card__kicker">Reads</p>
          <div class="otd-query">
            <p class="otd-query__label">Venue board &middot; <span class="otd-code">/tv</span> in Dallas</p>
            <p class="otd-query__line">fastest laps <span class="otd-query__where">where venue_id = Dallas</span></p>
          </div>
          <div class="otd-query otd-query--hero">
            <p class="otd-query__label">Network board &middot; fastest Spa time across every Oasis</p>
            <p class="otd-query__line">fastest laps <span class="otd-query__where otd-query__where--off">venue filter left off</span></p>
            <p class="otd-query__note">The same query, on indexes that already
              exist. This is the reason a shop pays for this rather than buying
              something off the shelf.</p>
          </div>
        </div>
      </div>
    </div>

    <div class="otd-notes">
      <p class="otd-notes__label">What the venue column does to the three landmines</p>
      <div class="otd-notes__row">
        ${note(
          'teal',
          '01',
          'One open round per venue',
          `The unique index gets scoped to the venue. Dallas opening their Wednesday
           round no longer collides with Austin&rsquo;s.`,
        )}
        ${note(
          'teal',
          '02',
          'Timezone becomes a column',
          `<span class="otd-code">venues.timezone</span>, read by the function that
           decides what <em>today</em> means. A column and a config value,
           changeable in an afternoon.`,
        )}
        ${note(
          'teal',
          '03',
          'Uniqueness scoped to the venue',
          `Rig numbers and driver display names become unique within a venue instead
           of globally. Every venue gets its Rig 01, and Dallas Mike and Phoenix Mike
           can both exist and still be told apart.`,
        )}
      </div>
    </div>

    ${ledger('What this costs to run', [
      { tone: 'good', count: '1', text: 'migration run per deploy' },
      { tone: 'good', count: '1', text: 'backup to keep' },
      { tone: 'good', count: '1', text: 'question for the build gate: is this database behind?' },
      { tone: 'good', count: '0', text: 'extra systems behind the network leaderboard' },
      { tone: 'warn', count: '1', text: 'missed WHERE clause is how a franchise leaks to another franchise' },
    ])}
  </section>
`;

/* ---------- 3. A database per franchise ---------- */

export const STATE_SPLIT_HTML = `
  <section class="otd-state">
    <div class="otd-thesis">
      <span class="otd-thesis__mark otd-thesis__mark--amber">3</span>
      <div>
        <h2 class="otd-thesis__title">A database per franchise</h2>
        <p class="otd-thesis__body">Worth taking seriously, because it is not a bad
          answer. Isolation stops being a promise and becomes physical, a bug cannot
          cross a connection boundary because there is no connection to cross, and a
          franchisee who leaves gets handed a connection string. This is what it
          adds.</p>
      </div>
    </div>

    <div class="otd-board">
      <div class="otd-col">
        <p class="otd-col__label">Floor</p>
        ${rigStack('Oasis Sim Racing', 'Austin', ['Rig 01', 'Rig 02', 'Rig 03'])}
        ${rigStack('Oasis Sim Racing', 'Dallas', ['Rig 01', 'Rig 02', 'Rig 03'])}
        ${rigStack('Oasis Sim Racing', 'Phoenix', ['Rig 01', 'Rig 02', 'Rig 03'])}
      </div>

      ${arrow('laps')}

      <div class="otd-col">
        <p class="otd-col__label">Application</p>
        ${appCard('The app now has to pick a connection before it can answer anything, so every request carries a venue before it reaches a database.')}
      </div>

      ${arrow('one connection per venue')}

      <div class="otd-col">
        <p class="otd-col__label">Data</p>
        <div class="otd-card otd-card--db otd-card--db-split">
          <p class="otd-card__kicker">Database &middot; Austin</p>
          ${tableRow('drivers', 'display name &middot; PIN hash')}
          ${tableRow('rigs, laps, league_rounds', 'unchanged, and unaware of anywhere else')}
        </div>
        <div class="otd-card otd-card--db otd-card--db-split">
          <p class="otd-card__kicker">Database &middot; Dallas</p>
          ${tableRow('drivers', 'display name &middot; PIN hash')}
          ${tableRow('rigs, laps, league_rounds', 'unchanged, and unaware of anywhere else')}
        </div>
        <div class="otd-card otd-card--db otd-card--db-split">
          <p class="otd-card__kicker">Database &middot; Phoenix</p>
          ${tableRow('drivers', 'display name &middot; PIN hash')}
          ${tableRow('rigs, laps, league_rounds', 'unchanged, and unaware of anywhere else')}
        </div>
        <p class="otd-col__foot">One database per venue. Cost is not the argument
          either way: Neon charges nothing for suspended compute, so the bill scales
          with opening hours rather than venue count. Ten or twenty dollars per
          venue per month.</p>
      </div>

      ${arrow('every lap, again')}

      <div class="otd-col">
        <p class="otd-col__label">The extra system</p>
        <div class="otd-card otd-card--proposed">
          <p class="otd-card__kicker">Proposed, and not built</p>
          <p class="otd-card__title">Network leaderboard</p>
          <p class="otd-card__sub">Nothing here exists today.</p>
          <ul class="otd-list otd-list--proposed">
            <li>A warehouse to hold every venue&rsquo;s laps together</li>
            <li>A sync job per venue, feeding it</li>
            <li>A freshness guarantee, so the board can say how current it is</li>
          </ul>
          <p class="otd-card__foot otd-card__foot--warn">And a new category of bug:
            the network board disagrees with the venue board. Splitting means choosing
            to make the differentiator the hardest thing I own.</p>
        </div>
      </div>
    </div>

    <div class="otd-notes">
      <p class="otd-notes__label">What the split does to the three landmines, and to one thing that was never a landmine</p>
      <div class="otd-notes__row">
        ${note(
          'teal',
          '01',
          'All three go away on their own',
          `One open round per database is already one open round per venue. The
           hardcoded timezone is correct again per deployment. Rig 01 and Mike are
           unique inside their own database. The split fixes the landmines by
           never letting two venues meet.`,
        )}
        ${note(
          'amber',
          '02',
          'And the schema work does not disappear',
          `Migrations now run N times with partial failure semantics, and the build
           gate that fails a deploy when the database is behind has to be
           redesigned. It works because it asks one question about one database.
           Asking it about a fleet is how it stops being trusted.`,
        )}
        ${note(
          'amber',
          '03',
          'N independent driver namespaces',
          `Each database has its own drivers table, and nothing links them. This is
           the part that does not come back.`,
        )}
      </div>
    </div>

    ${ledger('What this costs to run, at three venues', [
      { tone: 'warn', count: 'N', text: 'migration runs per deploy, with partial failure semantics' },
      { tone: 'warn', count: 'N', text: 'backups to keep, though restoring one venue to a point in time gets much better' },
      { tone: 'warn', count: 'N', text: 'questions for the build gate, which is how it stops being trusted' },
      { tone: 'warn', count: '3', text: 'new systems behind the network leaderboard: warehouse, sync, freshness' },
      { tone: 'good', count: '0', text: 'ways for one franchise to read another: there is no connection to cross' },
    ])}
  </section>
`;

export const DIAGRAM_STATES = [
  { id: 'today', tab: 'Today', sub: 'one venue', html: STATE_TODAY_HTML },
  { id: 'shared', tab: 'Shared database', sub: 'with a venue column', html: STATE_SHARED_HTML },
  { id: 'split', tab: 'Database per franchise', sub: 'the option that lost', html: STATE_SPLIT_HTML },
];
