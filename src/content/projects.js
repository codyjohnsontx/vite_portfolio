import diazMa from '../assets/diazma.png';
import rideSense from '../assets/ridesense.png';
import trackTuner from '../assets/track_tuner.png';

export const products = [
  {
    name: 'Track Tuner',
    slug: 'track-tuner',
    tier: 'flagship',
    status: 'active-build',
    statusLabel: 'Active build',
    year: '2026',
    accent: 'oklch(0.62 0.18 30)',
    image: trackTuner,
    companyContext: 'Independent build',
    role: 'Product Manager / Developer',
    stack: ['React', 'TypeScript', 'Node.js', 'RAG prototypes'],
    oneLiner: 'AI-assisted race setup and telemetry platform for faster trackside tuning decisions.',
    audience:
      'Track day riders, HPDE and time-attack drivers, and club racers who need setup confidence between sessions.',
    jtbd:
      'When a session ends, users need to log what changed and decide what to adjust next without guessing.',
    problem:
      'Scattered notes and memory-driven tuning make it difficult to learn from past sessions and improve consistently.',
    coreWorkflow: [
      'Capture suspension settings, tire pressures, and track conditions right after each session.',
      'Log rider and driver feedback in the same timeline as setup changes.',
      'Compare historical sessions to identify what setup deltas improved lap behavior.',
      'Use RAG-powered recommendations to suggest next setup adjustments from prior outcomes.',
    ],
    mvpScope: [
      'Setup logging first, telemetry workflows second',
      'Bike and car setup capture',
      'Condition and feedback timeline',
      'Historical comparison baseline',
      'Early AI recommendation engine prototype',
    ],
    evidenceSignal:
      'Roadmap and MVP sequence are already anchored in setup logging; AI recommendations are being layered in from historical data patterns.',
    nextStep:
      'Ship telemetry-enriched recommendations and validate suggested adjustments against repeat session performance.',
    standaloneMockStatus: 'in-progress',
    updates: [
      {
        date: 'Open',
        tag: 'Update 10',
        title: 'Deduplicate repeated Race Engineer prompts',
        url: 'https://github.com/codyjohnsontx/trackday_tuner/pull/13',
        body: 'Prevents riders from accidentally sending the same AI question over and over. If the same request comes in within five minutes, the app reuses the recent result instead of spending time and money on another answer.',
      },
      {
        date: 'Merged',
        tag: 'Update 09',
        title: 'Add ai_requests inspection script',
        url: 'https://github.com/codyjohnsontx/trackday_tuner/pull/12',
        body: 'Adds a local way to review recent Race Engineer activity without digging through the database manually, making it easier to spot failed requests, refusals, and usage patterns while testing.',
      },
      {
        date: 'Merged',
        tag: 'Update 08',
        title: 'Add agent doc sync guardrails',
        url: 'https://github.com/codyjohnsontx/trackday_tuner/pull/11',
        body: 'Adds guardrails so contributor and AI-agent instructions stay clean and consistent. This keeps the project easier to maintain as more automation and helper workflows get added.',
      },
      {
        date: 'Merged',
        tag: 'Update 07',
        title: 'Add privacy-safe AI request observability',
        url: 'https://github.com/codyjohnsontx/trackday_tuner/pull/10',
        body: 'Makes Race Engineer activity easier to understand without storing sensitive prompt text. The app can now track patterns, refusals, and safety decisions while keeping request details privacy-safe.',
      },
      {
        date: 'Merged',
        tag: 'Update 06',
        title: 'Verify personal evidence against loaded context',
        url: 'https://github.com/codyjohnsontx/trackday_tuner/pull/9',
        body: 'Stops the AI from acting like it knows personal riding history unless that session data is actually loaded. If the evidence is not available, the answer stays general or refuses the request.',
      },
      {
        date: 'Merged',
        tag: 'Update 05',
        title: 'Harden Race Engineer refusal handling',
        url: 'https://github.com/codyjohnsontx/trackday_tuner/pull/8',
        body: 'Tightens the boundaries around what Race Engineer will answer. Off-topic, unsafe, or manipulative prompts now get a clear refusal instead of a fake setup recommendation.',
      },
      {
        date: 'Merged',
        tag: 'Update 04',
        title: 'Load local env in Playwright config',
        url: 'https://github.com/codyjohnsontx/trackday_tuner/pull/7',
        body: 'Makes the browser test setup behave more like the real local app by loading the same environment settings. This reduces false test failures and makes the test workflow easier to run.',
      },
      {
        date: 'Merged',
        tag: 'Update 03',
        title: 'Add adaptive race engineer flows and session history UX',
        url: 'https://github.com/codyjohnsontx/trackday_tuner/pull/6',
        body: 'Turns Race Engineer from a single advice box into a fuller workflow: day plans, recommendation feedback, session memory, environment details, settings, and cleaner navigation around past sessions.',
      },
      {
        date: 'Merged',
        tag: 'Update 02',
        title: 'Add Race Engineer AI assistant',
        url: 'https://github.com/codyjohnsontx/trackday_tuner/pull/5',
        body: 'Ships the first Race Engineer assistant for Pro users, giving setup advice from saved session context and a small knowledge base while adding citations, safety rules, rate limits, and tests.',
      },
      {
        date: 'Merged',
        tag: 'Update 01',
        title: 'Stabilize app wiring, lint config, and contributor docs',
        url: 'https://github.com/codyjohnsontx/trackday_tuner/pull/4',
        body: 'Cleans up the app foundation before adding more AI work: navigation, auth, billing display, session comparison, environment helpers, contributor docs, automated checks, and test coverage.',
      },
    ],
  },
  {
    name: 'RideSense',
    slug: 'ridesense',
    tier: 'flagship',
    status: 'active-build',
    statusLabel: 'Active build',
    year: '2026',
    accent: 'oklch(0.66 0.16 170)',
    image: rideSense,
    companyContext: 'Independent build',
    role: 'Product Manager / Developer',
    stack: ['Next.js', 'TypeScript', 'FastAPI', 'Supabase Postgres', 'Fernet', 'Grounded AI'],
    oneLiner:
      'Grounded AI training-insights platform that unifies cyclist workout data across providers without coaching prescriptions.',
    audience:
      'Enthusiast and competitive cyclists who use multiple platforms, log structured intervals, and want decision-support for the next training block.',
    jtbd:
      'After a workout, riders need one canonical view of their week and grounded answers that cite the underlying metrics rather than fabricate authoritative advice.',
    problem:
      'Training data is fragmented across Strava, TrainerRoad, Garmin, and head-unit exports, leaving riders with double-counted load, timeline gaps, and no honest read on whether they are progressing or digging a hole.',
    coreWorkflow: [
      'Connect Strava via OAuth or drop GPX, TCX, and FIT exports into the dashboard; both paths feed the same ingest pipeline.',
      'Score workouts from each provider for overlap using start-time delta, duration delta, and name similarity, then merge matches into a canonical activity at a 0.72 confidence threshold.',
      'Run deterministic analytics over the canonical timeline to produce weekly load, zone breakdown, multi-week trend percentage, and regression flags.',
      'Answer natural-language questions over those facts with metric citations, falling back to deterministic responses when no LLM key is configured.',
    ],
    mvpScope: [
      'Strava OAuth and file upload first; TrainerRoad scaffolded for browser session-link',
      'Similarity-scored cross-provider deduplication into one canonical timeline',
      'Deterministic weekly load, zone distribution, and trend analytics',
      'Grounded AI Q&A with mandatory metric citations and a no-medical-advice prompt boundary',
      'Fernet-encrypted provider token storage with weak-secret guard outside development',
    ],
    evidenceSignal:
      'OAuth, upload ingest, canonical activity deduplication, deterministic analytics, and citation-bound AI behavior are being built around verifiable workout facts instead of coaching claims.',
    nextStep:
      'Wire the live Strava OAuth credentials and validate the full pipeline against real activity history, then ship the TrainerRoad session-link via Playwright so riders with structured workouts get TSS-accurate canonical activities without manual exports.',
    standaloneMockStatus: 'in-progress',
    updates: [
      {
        date: 'Apr 28, 2026',
        tag: 'PR #7',
        title: 'Hardened Strava OAuth ahead of going live',
        body: 'Stamped a 5-minute TTL onto the OAuth state token so a stolen redirect cannot be replayed later, taught sync_strava to mark the connection status="error" when refresh fails so the UI can prompt for a relink, and locked the behavior in with 6 new tests. Next: register the Strava app and run real activities through the canonical pipeline.',
      },
      {
        date: 'Apr 28, 2026',
        tag: 'PR #6',
        title: 'GPX / TCX / FIT upload pipeline',
        body: 'Built three parsers with defusedxml for XML formats and fitparse for FIT behind one EXTENSION_TO_PARSER dispatcher, using a SHA-256 content hash as the upsert identity so re-uploads are idempotent. Added a drag-and-drop card on the Connections page while TrainerRoad remains scaffolded.',
      },
      {
        date: 'Apr 28, 2026',
        tag: 'PR #5',
        title: 'Replaced HMAC-only signing with real Fernet encryption',
        body: 'The previous token wrapper was tamper-evident but plaintext-readable. Swapped to Fernet with the key derived from APP_SECRET_KEY, added a guard that refuses default or weak secrets outside development, and pinned the property that plaintext must not appear in ciphertext with a dedicated test.',
      },
      {
        date: 'Apr 27, 2026',
        tag: 'Note',
        title: 'Audited the README against the implementation',
        body: 'Three claims did not match the code: tokens were called encrypted, TrainerRoad was described as storing cookies only, and the AI was described as deterministic. Rewrote each to match what the code actually does.',
      },
    ],
  },
  {
    name: 'Diaz on Demand',
    slug: 'diaz-on-demand',
    tier: 'flagship',
    status: 'active-build',
    statusLabel: 'Active build',
    year: '2026',
    accent: 'oklch(0.62 0.18 240)',
    image: diazMa,
    companyContext: 'Diaz Martial Arts ecosystem',
    role: 'Product Manager / Developer',
    stack: ['React', 'TypeScript', 'Node.js', 'Stripe', 'Mux'],
    oneLiner: 'Subscription training platform for structured martial arts courses across affiliate schools.',
    audience:
      'Martial arts students, coaches, and admins who need premium training content with clear progression and access control.',
    jtbd:
      'When members train outside the gym, they need structured lessons and progress continuity while admins need scalable publishing control.',
    problem:
      'Without a dedicated learning product, premium training content is hard to organize, monetize, and scale across schools.',
    coreWorkflow: [
      'Member signs in and receives entitlement-based access.',
      'Learner enters a structured program and progresses through course lessons.',
      'Video playback and progress state remain synced across sessions.',
      'Admins publish and manage course content while subscriptions stay gated through billing rules.',
    ],
    mvpScope: [
      'Membership and entitlement architecture',
      'Course progression model',
      'Stripe subscription integration',
      'Mux video delivery',
      'Admin publishing workflow',
    ],
    evidenceSignal:
      'Auth, entitlement, Stripe, and Mux are already integrated, creating a working subscription product foundation instead of a static content library.',
    nextStep:
      'Expand multi-academy LMS controls and validate onboarding + retention patterns across affiliate school cohorts.',
    standaloneMockStatus: 'in-progress',
    updates: [
      {
        date: 'Apr 19, 2026',
        tag: 'PR #87',
        title: 'Affiliate-school admin scopes',
        body: 'Admin role now scoped to a single academy by default. Owner role keeps cross-academy publishing. Setting up E2E tests for entitlement boundaries.',
      },
      {
        date: 'Apr 06, 2026',
        tag: 'PR #82',
        title: 'Resume-where-you-left-off across devices',
        body: 'Progress state now syncs through the API rather than per-device localStorage. Helped a member start on iPad and finish on TV without skipping.',
      },
      {
        date: 'Mar 28, 2026',
        tag: 'Note',
        title: 'Pricing experiment scoped',
        body: 'Considering a single-academy tier vs. all-access. Need clean reporting of view-time per program before testing.',
      },
    ],
  },
  {
    name: 'Overlap',
    slug: 'overlap-racing-radar',
    tier: 'flagship',
    status: 'active-build',
    statusLabel: 'Active app',
    year: '2025',
    accent: 'oklch(0.7 0.16 140)',
    companyContext: 'iRacing ecosystem app',
    role: 'Product Manager / Developer',
    stack: ['.NET', 'WPF', 'iRacing SDK'],
    oneLiner:
      'Real-time racing radar overlay app for close-proximity battles where glance speed matters.',
    audience: 'Sim racers who need immediate spatial awareness without losing cockpit visibility.',
    jtbd:
      'When cars are side-by-side, drivers need a glanceable position radar that improves awareness without visual clutter.',
    problem:
      'In high-pressure race moments, cockpit views and mirrors alone do not always provide fast enough relative-position context.',
    coreWorkflow: [
      'Read nearby-car telemetry from the iRacing SDK feed.',
      'Render an always-on-top radar overlay with relative positioning.',
      'Allow quick-glance interpretation during overtakes and defensive battles.',
      'Keep the interface minimal so it supports awareness without obscuring racing lines.',
    ],
    mvpScope: [
      'Telemetry ingestion from iRacing SDK',
      'Always-on-top radar surface',
      'Close-battle positioning cues',
      'Minimal cockpit-safe visual language',
    ],
    evidenceSignal:
      'A working app exists with live telemetry integration and real-time positional rendering in desktop sessions.',
    nextStep:
      'Run focused driver usability tests to tune information density and reaction time benefits under race pressure.',
    standaloneMockStatus: 'planned',
    updates: [
      {
        date: 'Mar 12, 2026',
        tag: 'Build',
        title: 'App runs at 90 Hz steady',
        body: 'Frame budget holding under 4ms. Need to test on a second monitor + ultrawide before sharing more broadly.',
      },
      {
        date: 'Feb 24, 2026',
        tag: 'Note',
        title: 'Decided on relative (not absolute) layout',
        body: 'Drivers reacted faster to a "you-centered" radar than a top-down absolute one in informal tests. Going with it.',
      },
    ],
  },
  {
    name: 'Strava Component Lifecycle',
    slug: 'strava-component-lifecycle',
    tier: 'concept',
    status: 'prototype',
    statusLabel: 'Prototype',
    year: '2025',
    accent: 'oklch(0.7 0.16 60)',
    companyContext: 'Strava concept',
    role: 'Product Manager / Developer',
    stack: ['React', 'Node.js'],
    oneLiner:
      'Bike component wear-tracking concept that turns ride data into maintenance and replacement decisions.',
    audience:
      'Cyclists managing multiple bikes and drivetrains who need better timing for maintenance and part replacement.',
    jtbd:
      'When riders accumulate mileage across bikes, they need component health visibility and clear replacement guidance in one flow.',
    problem:
      'Component wear is tracked inconsistently, so riders miss replacement windows and manually hunt for pricing when failures are near.',
    coreWorkflow: [
      'Aggregate ride activity and map it to component lifecycle models.',
      'Estimate drivetrain and part wear across multiple bikes.',
      'Trigger replacement alerts when wear thresholds are crossed.',
      'Surface retailer price comparisons to speed replacement decisions.',
    ],
    mvpScope: [
      'Lifecycle estimation model',
      'Multi-bike component tracking',
      'Component health dashboard',
      'Replacement alert logic',
      'Price comparison panel',
    ],
    evidenceSignal:
      'Prototype UI and lifecycle logic are already mapped to concrete replacement workflows instead of abstract maintenance scoring.',
    nextStep:
      'Validate wear-threshold confidence and notification timing against rider maintenance behavior over longer ride history.',
    standaloneMockStatus: 'planned',
    brandDisclaimer:
      'Unofficial independent product concept. Not affiliated with or endorsed by Strava.',
    updates: [
      {
        date: 'Feb 02, 2026',
        tag: 'Note',
        title: 'Mapped chain wear curve to mileage + watts',
        body: 'Weighted by elevation gain, the model predicts replacement within ~150mi for the bikes I have data for. Need more riders.',
      },
    ],
  },
  {
    name: 'Instagram GIF Vault',
    slug: 'instagram-comment-gif-vault',
    tier: 'concept',
    status: 'prototype',
    statusLabel: 'Prototype',
    year: '2025',
    accent: 'oklch(0.7 0.16 320)',
    companyContext: 'Instagram concept',
    role: 'Product Manager / Developer',
    stack: ['Product concept', 'Comment UX', 'Saved reactions workflow'],
    oneLiner:
      'Comment-thread feature concept that lets users save reaction GIFs and reuse them across future comments.',
    audience:
      'Instagram users who frequently react with GIFs in reels and comment threads and want a reusable personal GIF collection.',
    jtbd:
      'When users find a perfect reaction GIF in comments, they need to save it instantly and reuse it later without searching again.',
    problem:
      'Great reaction GIFs are discovered contextually and then lost, forcing users to repeatedly search and slowing down participation in comments.',
    coreWorkflow: [
      'Tap save on any GIF encountered in a comment thread.',
      'Open a personal GIF Vault directly from the comment composer.',
      'Filter saved GIFs by recency, tone, and custom tags.',
      'Reuse a saved GIF in one tap across reels, posts, and comment threads.',
    ],
    mvpScope: [
      'Save-to-vault action in comment GIF picker',
      'Personal vault shelf inside composer',
      'Tag and recency filters',
      'Cross-thread one-tap reuse',
      'Simple usage analytics for repeat reactions',
    ],
    evidenceSignal:
      'The concept targets clear interaction friction: repeated GIF searching in high-frequency comment behavior.',
    nextStep:
      'Prototype comment-composer integration and test whether saved GIF reuse increases comment velocity and repeat posting.',
    standaloneMockStatus: 'planned',
    brandDisclaimer:
      'Unofficial independent product concept. Not affiliated with or endorsed by Instagram.',
  },
];

export const flagshipProducts = products.filter((product) => product.tier === 'flagship');
export const conceptProducts = products.filter((product) => product.tier === 'concept');

export function getProductBySlug(slug) {
  return products.find((product) => product.slug === slug);
}
