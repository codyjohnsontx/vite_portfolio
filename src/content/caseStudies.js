/* `subjects` is what this study is about: a product slug from projects.js or an
   engagement slug from engagements.js. It is the only link between a piece of
   writing and the work it came out of, and it is read in both directions - the
   subject's page lists its writing, and the writing lists its subject. */
export const caseStudies = [
  // Newest first. Add a new case study at the top of this array; both the
  // /notes index and the home page render it in plain array order.
  {
    slug: 'track-tuner-atomic-save',
    subjects: ['track-tuner'],
    // The product renders as Trackday Tuner; the essay calls it Track Tuner,
    // in the owner's own words, and the text is kept as he wrote it.
    company: 'Trackday Tuner',
    timeframe: 'Product decision, September 2026',
    // Same shape as the firstmate study below: no `tagline`, `team`,
    // `challenge` or `impactHighlights`, so the page goes from the title and
    // the drawing straight to the numbered sections. `role`, `deck` and
    // `featuredOutcome` feed the home page card and the /notes row.
    role: 'Product manager and developer',
    title: 'The save that could half-happen',
    deck: 'My app promised it would never lose a session without telling you. Four review rounds in, I realized I was patching that promise instead of keeping it.',
    featuredOutcome: 'A whole class of bug gone at once, and a retry that is safe by construction.',
    diagrams: {
      eyebrow: 'The save, before and after',
      path: '/case-studies/track-tuner-atomic-save/diagrams',
      label: 'View the drawing',
      blurb:
        "The phone's save followed through the server twice: three separate writes with a cleanup delete, then one all-or-nothing transaction.",
    },
    sections: {
      context:
        "Track Tuner is a setup logbook for track days. Riders and drivers log tire pressures, suspension clicks and lap times after every session, then compare sessions to figure out which change actually helped. The website is in a founding-rider beta. The phone app is what I'm building now, because the paddock has a problem the website can't fix: most tracks barely have signal. So the app is local-first. Every screen reads a database that lives on the phone. When you save a session, the app writes it locally and drops it in an outbox, which is just a queue of changes waiting to go up. Whenever the phone finds signal, it drains the queue. I wrote one promise into the plan for all of this, and it's the one I care about most. Nothing is lost silently. If something still only exists on your phone, you can see it.",
      problem:
        'The server saved a session in three separate writes. First the session, then its lap times, then the weather and track conditions. If the lap write failed, the server tried to delete the session to clean up after itself. But whatever kills the lap write on the server\'s side, a dead database connection or a rejected write, usually kills the cleanup delete too. Now the server has a session with no laps. On the website you\'d see the failure. On the phone the outbox retries for you, and that\'s where the trap is: the phone never got an answer, so it does exactly what I built it to do and sends the save again. The server sees the session is already there, answers "already saved," and the phone clears it from the outbox. The laps are gone and nothing on screen says so. The one promise I wrote down, broken by the code that was supposed to keep it. No rider ever hit this. The automated reviewer on my pull request found it before the app shipped to anyone.',
      goal:
        'Keep the promise instead of patching it. The fix I wanted would take a whole class of bug off the table at once, instead of repairing the half-save and waiting to see what the repair broke, and leave the retry safe no matter when it landed.',
      decisions: [
        "This is the part worth writing about, because I handled it wrong for a while. The plan for that pull request said no new database functions. I'd signed off on that to keep the change small. The first few review rounds hardened the endpoint in ordinary ways, and then one round found the half-save. With the constraint in place, the fix went into the retry: on a repeat save, check what actually got stored and fill in whatever's missing.",
        "That repair did exactly what it said. The next round found the hole it opened. If a rider edited their laps on the website in the meantime, a late retry from the phone would quietly overwrite them with the old copy.",
        "The repair was reasonable on its own, and it opened a new edge case in the same shape as the one it closed. One cycle of that was enough to see the pattern. When a patch produces a bug shaped like the one it fixed, you've stopped fixing bugs. You're defending a design.",
        'I try to stay attached to the problem, not to whatever solution I sketched first. Here I\'d done a quieter version of the opposite: I got attached to a constraint. "No new database functions" was a scoping choice. It kept the pull request small, and a small pull request is output. The outcome I actually cared about was the promise.',
        'It also helps me to ask which kind of risk I\'m really looking at. Will riders want it, can they use it, can we build it, does it work for the business. This looked like a can-we-build-it problem, an engineering detail about what order the writes happen in. It was a do-they-want-it problem. A logbook that sometimes forgets your laps without telling you is a logbook you stop trusting, and then you stop logging.',
        "So I dropped the constraint. The server now saves a session in a single transaction, one all-or-nothing database step where the session, its laps and its conditions either all land or none of them do. A half-saved session can't exist anymore, which makes the retry safe by construction. If the session is on the server, it's complete.",
      ],
      tradeoffs: [
        "One new database function, which I apply by hand because the hosted database has no migration history. One more review round. And a line in a plan I'd approved, which I had to be fine with walking back.",
        'I also had a third option: accept the rare loss and document it. It would have shipped that afternoon. I passed, because "rare" was doing a lot of work in that sentence. The failure needs a write to die partway through a save on the server\'s side, which hosted databases do now and then, and the phone retries every unanswered save from a paddock with one bar of signal. That retry is what turns a half-save into lost laps, and it\'s a lot closer to normal than "rare" makes it sound.',
      ],
      execution: [
        'I made this call on September 27, 2026, in between keeping a live leaderboard running at an off-site sim racing event. The atomic save is in review now.',
        "The retry code gets shorter instead of longer, since the cleanup delete and the repair path both disappear. And the website's own new-session form can move onto the same function later.",
      ],
      outcomes: [
        'What the change bought is a whole class of bug gone at once, instead of another repair loop where each fix waits for the review that finds what it broke.',
        "The tests I actually care about come after it merges. Make the database fail right after the session row is written and check that nothing of that session survives. Then pull the phone's signal after a save that landed, at a real track, and watch the retry find it whole.",
      ],
    },
  },
  {
    slug: 'firstmate-hook-prompt',
    // Empty on purpose: this is a contribution to someone else's open-source
    // project, not one of the products. With no subject the page simply has
    // no Related block; do not attach it to an unrelated product.
    subjects: [],
    company: 'kunchenguid/firstmate',
    timeframe: 'Open-source contribution, September 2026',
    // No `team`, `challenge`, `impactHighlights` or `tagline`, on the owner's
    // review of the rendered page: it goes straight from the title to the
    // numbered sections. `role`, `deck` and `featuredOutcome` stay because the
    // home page card and the /notes row read them; CaseStudyPage draws the
    // Role / Team / Outcome row only when all three of its values exist.
    role: 'Contributor',
    title: 'A prompt nobody could answer',
    deck: "For about two weeks, half my code review wasn't happening and I didn't notice.",
    featuredOutcome: 'Every second review since has started clean.',
    diagrams: {
      eyebrow: 'How it broke and how we fixed it',
      path: '/case-studies/firstmate-hook-prompt/diagrams',
      label: 'View the drawing',
      blurb: 'One launcher and three paths out of it, with the one-line fix marked as not taken.',
    },
    sections: {
      context:
        "For about two weeks, half my code review wasn't happening and I didn't notice. I review everything twice. First an automated pipeline, then a second pass from a different vendor's model. Not because one review isn't enough, but because the first reviewer is the same model family that wrote the code. It misses things in exactly the shape it made them. A second vendor misses different things. That's the entire argument.",
      problem:
        'The second reviewer had stopped starting. Not crashed, not erroring. Sitting there. A prompt: "Hooks need review. 11 hooks are new or changed. Hooks can run outside the sandbox after you trust them." Three options, cursor parked on "Review hooks." Those eleven hooks were mine. GitKraken\'s integration on my laptop, plus three of my own session-start tools. None of it belonged to the project under review, and none of it was anything the reviewer needed. It was being asked to vouch for my desk before it could read my diff. The thing that launches these reviewers can send Enter, Escape, and Ctrl-C. No arrows. So it couldn\'t move the cursor off "Review hooks" even if I\'d wanted it to. Pressing Enter would have picked the wrong option confidently.',
      goal:
        "Reviewers now launch with the hook layer off. They never meet the prompt, because there's nothing left to trust. Nothing is bypassed and nothing is pre-approved. The question just stops applying.",
      decisions: [
        'I could have written the trust decision into the config. One line. Prompt gone, reviews running inside a minute.',
        'I keep coming back to why that bothered me. The line says a human trusted eleven hooks. No human did.',
        "I'd have been writing myself a permission slip and signing it, and six months later I'd read that config and believe it. Consent you manufacture for yourself isn't consent, it's a note in your own handwriting.",
      ],
      tradeoffs: [
        "Two things I left alone on purpose. The finished-turn signal stays, so a reviewer still reports when it's done.",
        "And my long-running assistant keeps the old behavior, because it isn't disposable and the reasoning doesn't transfer.",
      ],
      execution: [
        "Then I had it tested against the real tool: not just a check on my flags, though that's there too, but one that runs them against the installed version and fails if a future release changes what that flag means.",
        "Silent stalling is how this started. I'd rather it break loudly.",
        '234 lines, merged upstream. Most of it tests and the written record of why.',
      ],
      outcomes: [
        'Every second review since has started clean. Last week those reviews found real bugs in three of my own pull requests, all of which the pipeline and CodeRabbit had already passed.',
        'My favorite one: two sessions at the same circuit, on different layouts of that circuit, were being scored as the same track. Nothing about it looked wrong. It would have quietly fed the wrong laps into the setup advice, and the rider would never have known why the advice got worse.',
        "That's the bug the second reviewer exists for. It was two weeks from finding it.",
        'Source of record: https://github.com/kunchenguid/firstmate/pull/4689 - merged 2026-09-17, authored by codyjohnsontx, 234 lines added.',
      ],
    },
  },
  {
    slug: 'diaz-deploy-gate',
    subjects: ['diaz-on-demand'],
    company: 'Diaz on Demand',
    timeframe: 'Incident and fix, September 2026',
    role: 'Full-stack product builder',
    team: 'Solo; I build and operate the product',
    title: 'A build that refuses to ship',
    tagline:
      "Diaz on Demand's API was deployed early, while the product was still being built and tested. For a month, health checks passed, the catalogue loaded, webhooks arrived, and everything that ran was a read.",
    challenge:
      "Diaz on Demand's API was deployed early, while the product was still being built and tested. For a month, health checks passed, the catalogue loaded, webhooks arrived, and everything that ran was a read. Then the first real sign-in attempt returned 500, and it took a while to find out why, because the first two explanations were wrong. It wasn't the auth keys and it wasn't the connection pooler. It was the database: five migrations had never reached it, the oldest from 1 August. Reads had worked that whole month because reads only touch old, stable schema. Sign-in was the first write anything had attempted, and it hit the gap immediately.",
    impactHighlights: [
      "Code that needs a schema the database doesn't have never gets published against it.",
      'It only looks. It never applies anything.',
      'The gate is 261 lines, most of them the error message.',
    ],
    featuredOutcome:
      'The gate is 261 lines, most of them the error message. What it prevents is a deployment that reads fine for a month and breaks on its first write - which is a much easier thing to ship than it sounds.',
    sections: {
      context:
        "Diaz on Demand's API was deployed early, while the product was still being built and tested. For a month, health checks passed, the catalogue loaded, webhooks arrived, and everything that ran was a read. Then the first real sign-in attempt returned 500, and it took a while to find out why, because the first two explanations were wrong. It wasn't the auth keys and it wasn't the connection pooler. It was the database: five migrations had never reached it, the oldest from 1 August. Reads had worked that whole month because reads only touch old, stable schema. Sign-in was the first write anything had attempted, and it hit the gap immediately.",
      problem:
        "Applying them failed on the last one. It tried to drop a constraint that wasn't there, from a migration the database said it had already applied. It hadn't. The schema had been pushed straight from the Prisma file rather than migrated, and Prisma doesn't model check constraints, so that one statement got skipped while the migration was marked complete. I fixed it by hand: added the constraint, marked the failed migration rolled back, re-ran the deploy so it genuinely executed.",
      goal:
        'Then I had a gate built, because nothing in the setup would have stopped this from happening again - and next time it might not be a test sign-in.',
      decisions: [
        "It sits in front of the API build on Vercel. Before the build starts, it asks Prisma to compare the migration files in the repo against the ones the database has actually applied. If anything is pending, it exits with an error, the build fails, and the previous deployment keeps serving. Code that needs a schema the database doesn't have never gets published against it.",
        'It only looks. It never applies anything.',
        'Where it runs changes what it does. On Vercel production it refuses. On a preview it warns and carries on. On a laptop pointed at a real database it refuses, same as production.',
        "There's an off switch for a real emergency, and it only accepts 1 or true - a typo doesn't disarm it.",
      ],
      tradeoffs: [
        "That's the design decision I'd defend hardest: a gate that fixes the problem is a gate that migrates production as a side effect of pressing deploy, and that's worse than the outage.",
        'On a laptop with no database configured it skips, so nobody is blocked from building locally.',
      ],
      execution: [
        'When it refuses, the message names the pending migrations and the exact command to run, including the detail that cost me time: Neon migrations need the direct connection string, not the pooled one.',
        "The part I didn't expect came from testing it. I'd assumed Prisma's own deploy command would refuse a database whose migration history had diverged - the state mine was in. It doesn't.",
        "Measured on 6.19.2 against Postgres 17, it applied the migration and reported success, leaving the same migration recorded twice under different names. So for that particular failure, the gate isn't belt-and-braces over something Prisma already catches. It's the only check there is.",
      ],
      outcomes: [
        'The gate is 261 lines, most of them the error message.',
        'What it prevents is a deployment that reads fine for a month and breaks on its first write - which is a much easier thing to ship than it sounds.',
      ],
    },
  },
  {
    slug: 'oasis-multi-tenancy',
    subjects: ['oasis-race-control'],
    company: 'Oasis Race Control',
    timeframe: 'Architecture decision',
    role: 'Full-stack product builder',
    team: 'The venue owners, who want to franchise',
    title: 'One database or many: picking a tenancy model for a sim racing platform',
    tagline:
      'Oasis Race Control was built for one venue because there was one venue. Then the owners said they wanted to franchise. This is the case for one shared database with a venue column, including the parts that point the other way.',
    challenge:
      'Oasis Race Control runs a sim racing shop: twenty-odd iRacing machines on the floor, live timing on a TV wall, a league that runs on Wednesday nights. Franchising turns a straightforward question into the one decision everything else hangs off. Does a second location get its own database, or does every venue share one with a column saying which venue each row belongs to?',
    impactHighlights: [
      'Had the schema swept for assumptions that stop being true with two venues. Thirteen turned up.',
      'Chose shared, on reversibility: shared to separate is a partition you can run, separate to shared is a merge of driver identities with no email address to match on.',
      'Separated the four questions that mattered from the dozen that did not, so nothing gets built before it needs to be.',
    ],
    featuredOutcome:
      'One shared database with a venue column, decided and written down with the argument attached. The schema work is three to four weeks and is not scheduled, because there is still only one venue.',
    diagrams: {
      path: '/case-studies/oasis-multi-tenancy/diagrams',
      label: 'View the system design wireframes',
      blurb:
        'Three states drawn side by side: the single venue today, one shared database with a venue column, and a database per franchise.',
    },
    sections: {
      context:
        'Oasis Race Control runs a sim racing shop. Twenty-odd iRacing machines on the floor, live timing on a TV wall, a league that runs on Wednesday nights. It was built for one venue because there was one venue. Then the owners said they wanted to franchise it.',
      problem:
        'Before deciding anything I had the schema swept for assumptions that stop being true with two venues. Thirteen turned up. A unique index permits exactly one open league round across the entire table, so Dallas opening their Wednesday round hands Austin’s staff a constraint violation, which is a hard stop rather than a degradation. The function that decides what today means has the timezone hardcoded, correct at the time and quietly wrong the moment a franchise opens in Phoenix: laps land on the wrong day, which puts them in the wrong league round, which makes the season standings wrong. Rig numbers and driver names are globally unique, and every venue has a Rig 01 and plenty of venues have a Mike. None of these are bugs. Each was the right call when it was made, and every week of single-venue work adds another one.',
      goal:
        'Decide whether a second location gets its own database or shares one with a venue column, and decide it before more single-venue work piles up behind the answer. Nobody needed this built yet. They needed to know what it costs and which door closes if they wait.',
      decisions: [
        'Went with one shared database and a venue column on every row. The reason a shop pays for this rather than buying something off the shelf is that a driver’s lap follows them to any Oasis: fastest Spa time across the whole network, season standings that roll up nationally. In a shared database that is the query I already run with the venue filter left off, on indexes that already exist.',
        'Made a driver one person across the network rather than a separate account at each shop, for the same reason. Every registration taken under the other model deepens a commitment that gets harder to unwind, and it costs nothing to decide correctly on day one.',
        'Answered the isolation question with an application boundary, and with row level security in the database if a franchisee wants it in writing. What is in the schema is a display name, a hashed four-digit PIN, and lap times. No driver email addresses, no payment data. The strongest case for a database per tenant is regulatory or contractual, and a franchisee’s real worry is commercial: can the shop across town see my customer list.',
        'Left the split available rather than ruled out. If it becomes correct later, the venue column is the seam it partitions on.',
      ],
      tradeoffs: [
        'Separate databases make isolation physical rather than promised. In a shared database one missed WHERE clause leaks a franchise’s data to another franchise. In separate databases a bug cannot cross a connection boundary, because there is no connection to cross.',
        'Backup and restore get much better with separate databases. Restoring one venue to a point in time is trivial when it owns its database and awkward when it shares one, where you are doing table-level exports and hoping you got the dependency order right.',
        'When a franchisee leaves, separate databases mean handing them a connection string. In a shared database you are writing an export script.',
        'Separate databases mean running every migration N times, with partial failure semantics, and redesigning a build gate I actually like. Right now a production deploy fails if the database is behind, so the previous schema-matching version keeps serving instead of a broken one going live. That gate works because it asks one question about one database. Asking it about a fleet is how it stops being trusted.',
        'Splitting also makes the network leaderboard a second system: a warehouse, a sync job, a freshness guarantee, and a new category of bug where the network board disagrees with the venue board. It means choosing to make the differentiator the hardest thing I own.',
      ],
      execution: [
        'Swept the schema for single-venue assumptions before weighing any option, and wrote down all thirteen rather than the three that were easy to find.',
        'Priced the option that looked expensive so it could be removed from the argument rather than left as a vague worry. Neon charges nothing for suspended compute, so the bill scales with venue opening hours rather than venue count: ten or twenty dollars per venue per month, either way.',
        'Drew both candidate architectures against what actually exists, the rig agents, the app, the wall board, and the tables laps land in, so the extra machinery in the split option was visible rather than argued about.',
        'Wrote the decision down with the argument attached rather than just the outcome. I will be the person reading this in six months and I would rather not have to reconstruct it.',
      ],
      outcomes: [
        'Decided: one shared database with a venue column, and a driver who is one person across the network.',
        'The schema work is three to four weeks and is not scheduled. There is still only one venue, and nobody needed this built yet.',
        'Timezones, per-venue branding, whether the scoring scale varies by location, and which day league night falls on all looked like they belonged in this decision. None of them do. Every one is a column or a config value, changeable in an afternoon, with nothing else in the codebase depending on the answer.',
      ],
      lessons: [
        'Everything else here was a judgment call. This part was not. Going from shared to separate later is a clean partition: you already have a venue column on every row, and you split on it. Going the other way is a merge, with N independent driver namespaces and no reliable way to decide whether the Mike at Dallas and the Mike at Phoenix are the same person. No email addresses, a four-digit PIN. At some point you are guessing, and people notice when you guess wrong about who they are. One direction you can walk back. The other you cannot.',
        'Sorting the expensive choices from the cheap ones turned out to be more useful than the recommendation, because it tells you what you are allowed to ignore for now. Most of what looked like one big architectural decision was four questions that mattered and a dozen that did not.',
        'What would change my mind is a franchise contract requiring physically separate data. An actual clause, written by an actual lawyer, not a preference someone expressed in a meeting. If that shows up, separate databases become correct and the split is worth doing then, when it is known to be needed rather than guessed at. Until then I would rather ship the network leaderboard.',
      ],
    },
  },
  /* The slug predates this rewrite and keeps its public URL; the study no longer
     claims GIS work, record counts, or percentage reductions, because the HSNBA
     repository backs none of them. What it does back is below. */
  {
    slug: 'hsnba-automation-and-gis',
    subjects: ['hsnba'],
    company: 'Humane Society of New Braunfels Area (HSNBA)',
    timeframe: 'Freelance automation work, 2024 - 2025',
    role: 'Software Engineer (Freelance)',
    team: 'Shelter staff who run ShelterManager day to day',
    title: 'Correcting a shelter’s records inside the system it already had',
    tagline:
      'Selenium automation that signs into the shelter’s ShelterManager back office, works through its own maintenance reports, and corrects records with logging and idempotent checks, so a rerun never double-applies a change.',
    challenge:
      'HSNBA keeps its animal records in ShelterManager, a browser-based cloud application with no API available to the shelter. Years of movement records sat under types the shelter no longer used, and uploaded images sat unnamed, so staff cleaned both up by hand, one record and one page load at a time, in the gaps between the work the shelter actually exists to do.',
    featuredOutcome:
      'Two report-driven cleanup jobs run end to end against the live system, every step logged, with a rerun that leaves an already-correct record alone.',
    impactHighlights: [
      'Automated two administrative workflows that staff had been working through by hand in the shelter’s existing management platform.',
      'Corrected historical movement records in place, with the animal flags they implied, instead of exporting and re-importing data.',
      'Made each run safe to repeat: every change checks the record’s current state first, and a failure on one record is logged and skipped rather than stopping the run.',
    ],
    sections: {
      context:
        'The shelter had no engineering staff and no budget for a new system. Its records lived in ShelterManager, which exposes maintenance reports in the browser but, for this shelter, no API. The work had to run against the application staff already used, with their credentials, and leave the system in a state they would recognise.',
      problem:
        'Two backlogs had built up. Movement records filed as “Offsite Adoption” or “Working Cat” needed to become plain adoptions, with the right checkbox set and, for working cats, the Feral and Working Cat flags added to the animal’s record. And a report of unnamed JPEGs, many of them driver’s licence photos, needed each image labelled or skipped. Both were clicks through the same screens hundreds of times, which is where mistakes come from.',
      goal:
        'Take the repetition off staff without taking the judgment away from them: automate the navigation and the writes, keep a person in the loop where a decision is needed, and make the scripts safe to run again after an interruption.',
      decisions: [
        'Selenium against the real browser session, because the shelter had no API and needed something that could run on the existing setup immediately. The README says plainly that an API-based approach would be more robust in the long run; this project addressed the current need with the tools available.',
        'Each script drives one of ShelterManager’s own maintenance reports rather than its own query, so the list of records to fix is always the application’s list, not a snapshot that could drift.',
        'Idempotent state checks before every write: the Offsite Adoption checkbox is only clicked if it is not already checked, the flags are only added if missing, and a corrected movement no longer appears in the report, so rerunning after a crash or a network drop cannot double-apply a change.',
        'The image job stays interactive, prompting per image to rename, skip, or move on, because deciding whether a photo is an ID or an animal is a judgment call the script should not make alone.',
      ],
      tradeoffs: [
        'Browser automation is slower and more brittle than an API, and it breaks when the vendor changes a page. That was accepted in exchange for shipping on the system the shelter already had.',
        'Credentials come from a local .env file rather than a secrets manager, which is appropriate for a script a staff member runs on their own machine and would not be for anything shared.',
      ],
      execution: [
        'Built the two jobs in Python with Selenium and python-dotenv, each signing in, navigating the menus to its report, and working through the entries it lists.',
        'Logged sign-in, navigation, and every movement change with timestamps through Python’s logging module, so a run can be audited afterwards and a failure located.',
        'Wrapped each record’s steps in error handling that logs the failure and moves to the next entry instead of stopping the run.',
      ],
      outcomes: [
        'Both cleanup jobs run end to end against the live ShelterManager system, and the movement correction handles both record types including the follow-on animal flags.',
        'A rerun is safe: records already corrected are skipped by the state checks, and the report shrinks as the backlog clears.',
        'Source: https://github.com/codyjohnsontx/HSNBA',
      ],
      lessons: [
        'The useful question was not “what system should the shelter have?” but “what can be fixed inside the one it has?”. Shipping against the existing platform was the whole value.',
        'Idempotency is what makes automation trustworthy to non-engineers. Staff were comfortable rerunning a script precisely because a second run could not make things worse.',
      ],
    },
  },
  {
    slug: 'lambda-curry-scope-monitoring',
    subjects: ['lambda-curry'],
    company: 'Lambda Curry',
    timeframe: 'Contract product work',
    role: 'Product Owner',
    team: 'Client stakeholders, engineering, design, and operations',
    title: 'Driving multi-product delivery from scope through measurable launch outcomes',
    tagline:
      'Turned competing stakeholder asks into scoped product work across e-commerce, consumer, and B2B surfaces, using requirements, acceptance criteria, backlog priorities, and release metrics to guide delivery.',
    challenge:
      'Multiple product lines and stakeholder requests were competing for the same delivery capacity. The work required clarifying what was actually needed, defining ready-to-build scope, sequencing the backlog, and making sure launches were measured by business and user outcomes instead of output alone.',
    featuredOutcome:
      'Contributed to a 12 percent first-week sales lift on a checkout redesign and friction-reduction launch, plus 10-25 percent retention improvement across a multi-product platform.',
    impactHighlights: [
      'Owned product lifecycles across e-commerce, consumer, and B2B products.',
      'Translated stakeholder needs into requirements, user stories, acceptance criteria, and release-ready scope for engineering teams.',
      'Drove 10-25 percent retention improvement by identifying drop-off patterns and prioritizing fixes in sprint planning.',
    ],
    sections: {
      context:
        'Lambda Curry required balancing e-commerce, consumer, and B2B product priorities while keeping stakeholders aligned around business impact, user behavior, and delivery constraints.',
      problem:
        'Stakeholder requests often arrived as desired outputs rather than clear product problems. Without requirements, acceptance criteria, prioritization, and success metrics, the team risked shipping work that was on time but not tied to conversion, retention, or user behavior.',
      usersStakeholders:
        'Primary stakeholders included clients, internal engineering teams, designers, operations partners, and the delivery leads accountable for on-time execution.',
      goal:
        'Prioritize high-impact features, define release scope clearly, and use conversion, retention, and behavioral data to guide post-launch iteration.',
      constraints: [
        'Competing priorities across e-commerce, consumer, and B2B product work',
        'Stakeholders balancing business urgency, user feedback, and delivery realities',
        'Need to define validation criteria before each release without slowing sprint execution',
      ],
      ownership: [
        'Translated stakeholder asks into requirements, user stories, acceptance criteria, and release-ready scope',
        'Maintained backlog priorities and delivery visibility across multiple product surfaces',
        'Coordinated sprint execution, dependencies, blocker removal, and release readiness across teams',
      ],
      decisions: [
        'Prioritized features based on business impact and user behavior rather than stakeholder urgency alone.',
        'Wrote PRDs for higher-risk features to lock scope and secure sign-off before engineering began.',
        'Defined success metrics and validation criteria before each release so post-launch iteration had a real signal.',
      ],
      tradeoffs: [
        'Balanced competing stakeholder priorities by using data and user feedback to make scope and delivery tradeoffs explicit.',
        'Accepted more upfront product-definition work in exchange for less churn during implementation and cleaner validation after launch.',
      ],
      execution: [
        'Translated stakeholder asks into requirements, user stories, acceptance criteria, and release-ready scope for engineering teams.',
        'Maintained backlog priorities and delivery visibility across multiple product surfaces.',
        'Identified drop-off patterns in behavioral data and prioritized retention fixes in sprint planning.',
        'Managed sprint execution, dependency coordination, blocker removal, and release readiness across teams.',
      ],
      outcomes: [
        'Contributed to a 12 percent first-week sales lift at launch and measurable conversion improvement through the purchase funnel.',
        'Drove 10-25 percent retention improvement across a multi-product platform.',
        'Created a stronger operating loop between product definition, sprint execution, release coordination, and post-launch validation.',
      ],
      metrics: [
        '12 percent first-week sales lift tied to a checkout redesign and friction-reduction launch',
        '10-25 percent retention improvement across a multi-product platform',
        'Conversion, retention, and behavioral data used to guide iteration and sprint priorities',
      ],
      lessons: [
        'Product ownership is strongest when ambiguous requests become clear scope, acceptance criteria, delivery sequence, and validation before engineering starts.',
        'Competing priorities are easier to resolve when tradeoffs are grounded in business impact, user behavior, and delivery constraints.',
      ],
      confidentialityNote:
        'Client names, internal dashboards, and detailed release mechanics are intentionally withheld.',
    },
  },
];

/* The one line a /notes row and a home page card print under the title. It is
   the `tagline` for every study that has one, which also opens its page; a
   study whose page opens without that line carries `deck` instead. */
export function getCaseStudyDeck(study) {
  return study.deck ?? study.tagline;
}

export function getCaseStudyBySlug(slug) {
  return caseStudies.find((study) => study.slug === slug);
}
