import diazMa from '../assets/diazma.png';
import ctxChat from '../assets/ctxChat.png';
import rideSense from '../assets/ridesense.png';
import trackTuner from '../assets/track_tuner.png';
import rideSenseOverviewDesktop from '../../docs/assets/readme/overview-desktop.png';
import rideSenseOverviewMobile from '../../docs/assets/readme/overview-mobile.png';
import windCastHero from '../assets/windcast/windcast-hero.png';
import windCastMap from '../assets/windcast/windcast-map.png';
import windCastSpotDetail from '../assets/windcast/windcast-spot-detail.png';

const allProducts = [
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
    stack: [
      'Next.js',
      'TypeScript',
      'FastAPI',
      'Supabase Postgres',
      'Strava OAuth',
      'TrainerRoad ingest',
      'Grounded AI',
    ],
    oneLiner:
      'Full-stack training analytics MVP that unifies TrainerRoad, Strava, and uploaded ride files into one canonical activity timeline with workload trends and grounded AI Q&A.',
    audience:
      'Enthusiast and competitive cyclists who use multiple platforms, log structured intervals, and want decision-support for the next training block.',
    jtbd:
      'After workouts accumulate across multiple tools, riders need one canonical view of their training history and evidence-bound answers that explain workload, consistency, fatigue, freshness, and trend changes from their own data.',
    problem:
      'Cyclists often split training history across TrainerRoad, Strava, head-unit exports, and manual files, making it hard to trust load trends, avoid duplicate activities, and understand what their recent work actually signals.',
    coreWorkflow: [
      'Connect Strava through OAuth, bring in TrainerRoad activity context, or upload GPX, TCX, and FIT ride files.',
      'Normalize provider data into one activity pipeline, then merge overlapping efforts into a canonical timeline.',
      'Apply deterministic analytics for weekly load, form, fatigue, freshness, category breakdowns, and trend detection.',
      'Explore the dashboard through accessible charts with hover readouts, keyboard support, mobile interactions, and screen reader copy.',
      'Ask grounded training questions over computed metrics, with fallback handling when AI parsing fails instead of breaking the experience.',
    ],
    mvpScope: [
      'Next.js dashboard UI with FastAPI backend',
      'Strava OAuth, sync hardening, and UTC-safe date range filtering',
      'TrainerRoad, Strava, and uploaded file activity ingestion into a canonical timeline',
      'Deterministic training analytics for workload trends, readiness signals, category breakdowns, and rolling date windows',
      'Accessible dashboard visualizations with hover readouts, live metric explanations, keyboard support, and mobile behavior',
      'Grounded AI Q&A with safer fallback behavior when model responses are malformed',
      'Seeded demo workflow, README screenshots, custom logo, app icon, guided onboarding, and same-origin local API proxy',
    ],
    evidenceSignal:
      'The MVP now demonstrates production-shaped product judgment across ingestion, deduplication, deterministic analytics, accessible visualization, AI guardrails, local development ergonomics, and public demo documentation.',
    nextStep:
      "Validate the seeded demo flow against real rider history, tighten TrainerRoad ingestion depth, and use the dashboard's load, form, fatigue, freshness, and grounded Q&A signals to drive the next round of user interviews.",
    visualAssets: {
      note: 'Public screenshots use seeded demo data, not private athlete data.',
      items: [
        {
          label: 'Desktop dashboard',
          src: rideSenseOverviewDesktop,
          alt: 'RideSense desktop dashboard showing seeded demo training analytics.',
        },
        {
          label: 'Mobile dashboard',
          src: rideSenseOverviewMobile,
          alt: 'RideSense mobile dashboard showing seeded demo training analytics.',
        },
      ],
    },
    standaloneMockStatus: 'in-progress',
    updates: [
      {
        date: 'May 31, 2026',
        tag: 'PR #18',
        title: 'Added README screenshots with seeded demo data',
        url: 'https://github.com/codyjohnsontx/ridesense/pull/18',
        body: 'Added desktop and mobile README screenshots captured from seeded demo data so GitHub visitors can immediately understand the dashboard experience without exposing private athlete data.',
      },
      {
        date: 'May 31, 2026',
        tag: 'PR #17',
        title: 'Made analytics load trend tests deterministic',
        url: 'https://github.com/codyjohnsontx/ridesense/pull/17',
        body: 'Fixed flaky analytics tests by making rolling date-window behavior deterministic around UTC midnight boundaries.',
      },
      {
        date: 'May 31, 2026',
        tag: 'PR #16',
        title: 'Added the RideSense app icon',
        url: 'https://github.com/codyjohnsontx/ridesense/pull/16',
        body: 'Added an app icon to give the product a more complete, installable product feel.',
      },
      {
        date: 'May 31, 2026',
        tag: 'PR #15',
        title: 'Hardened AI fallback behavior',
        url: 'https://github.com/codyjohnsontx/ridesense/pull/15',
        body: 'Added safer fallback behavior when AI response parsing fails so malformed model output does not break the grounded Q&A experience.',
      },
      {
        date: 'May 31, 2026',
        tag: 'PR #14',
        title: 'Added same-origin local API proxying',
        url: 'https://github.com/codyjohnsontx/ridesense/pull/14',
        body: 'Routed frontend API calls through the Next.js app to the FastAPI backend during local development, simplifying setup and avoiding client-side backend URL wiring.',
      },
      {
        date: 'May 31, 2026',
        tag: 'PR #13',
        title: 'Added guided onboarding and clearer docs',
        url: 'https://github.com/codyjohnsontx/ridesense/pull/13',
        body: 'Added a guided onboarding experience and updated documentation so the product flow and local setup are easier to understand.',
      },
      {
        date: 'May 09, 2026',
        tag: 'PR #12',
        title: 'Refactored the app shell and training analytics experience',
        url: 'https://github.com/codyjohnsontx/ridesense/pull/12',
        body: 'Refactored the app shell and analytics surface, polished mobile navigation accessibility, fixed active nav path matching, preserved accessible mobile dialog behavior, and hardened shell sync and resize behavior.',
      },
      {
        date: 'May 02, 2026',
        tag: 'PR #11',
        title: 'Improved chart accessibility and metric explanations',
        url: 'https://github.com/codyjohnsontx/ridesense/pull/11',
        body: 'Added screen reader support for metric tooltip copy and improved chart explanations with directional context so dashboard metrics are easier to interpret.',
      },
      {
        date: 'May 02, 2026',
        tag: 'PR #10',
        title: 'Added chart hover and live readout improvements',
        url: 'https://github.com/codyjohnsontx/ridesense/pull/10',
        body: 'Added chart hover readouts, improved mobile chart interactions, added live chart readouts, improved keyboard accessibility, and fixed stale heatmap hover behavior.',
      },
      {
        date: 'Apr 29, 2026',
        tag: 'PR #9',
        title: 'Added the RideSense logo component',
        url: 'https://github.com/codyjohnsontx/ridesense/pull/9',
        body: 'Added a custom RideSense logo component to give the product stronger identity and polish inside the app.',
      },
      {
        date: 'Apr 29, 2026',
        tag: 'PR #8',
        title: 'Hardened Strava OAuth sync and range filtering',
        url: 'https://github.com/codyjohnsontx/ridesense/pull/8',
        body: 'Hardened Strava sync behavior, improved activity analysis range filters, fixed UTC date boundary handling, and aligned range metadata with count behavior.',
      },
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
    name: 'windCast',
    slug: 'windcast',
    tier: 'flagship',
    status: 'active-build',
    statusLabel: 'MVP shipped',
    year: '2026',
    accent: 'oklch(0.7 0.15 235)',
    image: windCastHero,
    companyContext: 'Independent build',
    role: 'Product Manager / Developer',
    stack: [
      'React 18',
      'TypeScript',
      'Vite',
      'Tailwind CSS',
      'React Router',
      'Leaflet + react-leaflet',
      'leaflet-velocity',
      'Open-Meteo API',
      'Vitest',
    ],
    oneLiner:
      'Session planner for wind sports — saved spots, scored forecast hours, and an animated wind map answer one question: is it worth loading up gear today?',
    audience:
      'Recreational and intermediate kiteboarders, wing foilers, and downwind foilers who currently juggle 3+ weather sources to plan a single session.',
    jtbd:
      'When deciding whether to load gear and go, I want my saved spots scored against the next 48 hours of wind so I can pick a session window in seconds instead of cross-referencing forecasts.',
    problem:
      'Wind-sport athletes check multiple weather sources manually, then mentally map each forecast against per-spot rules (safe direction, ideal wind range, gust tolerance). The math is repetitive, error-prone, and often gets done in the parking lot. windCast encodes per-spot rules once and runs them against every forecast hour automatically.',
    coreWorkflow: [
      'Save your spots with per-location rules: ideal/unsafe wind directions, min/ideal/max wind speed, and sport type.',
      'Open the dashboard — every saved spot shows current wind, a session-score badge (fire / good / maybe / poor / sketchy), and the best upcoming window.',
      'Tap a spot for the full 48-hour hourly forecast with per-hour scores and the reasoning behind each label.',
      'Switch to the map for an animated wind-particle overlay, score-colored pins at each saved spot, and tap-anywhere ephemeral forecasts.',
      'Swap forecast sources in Settings (mock for demos, Open-Meteo for real data) — all providers are interface-compatible.',
    ],
    mvpScope: [
      'Dashboard view sorted by current safety and confidence.',
      'Per-spot rules engine and scoring (utils/sessionScore.ts) producing 5-label session quality with explainable reasons.',
      'Interactive Leaflet map with animated wind-particle overlay and tap-to-forecast.',
      'Spot CRUD with 48-hour hourly forecast detail.',
      'Pluggable forecast-provider interface (mock + Open-Meteo) with response caching.',
      'Unit toggles (mph / knots / m/s, F / C).',
      'Local persistence with JSON import/export for spot backup.',
    ],
    evidenceSignal:
      'Built end-to-end in roughly one day as a tightly-scoped MVP: real Open-Meteo integration, an explainable scoring engine, and an animated wind map that runs on mock data for offline demos. Codebase is test-covered (Vitest + RTL) and structured so future data sources (NOAA GFS for wind grids, NOAA CO-OPS for tides) drop in behind the existing provider interface.',
    nextStep:
      'Roadmap from the README: real tide data via NOAA CO-OPS, real wind grids via NOAA GFS through a serverless proxy, long-press to add spots on the map, PWA + offline cache, and push notifications for incoming "fire" windows. Explicitly out of scope: radar/satellite, accounts/auth, route planning, premium tiers.',
    visualAssets: {
      note: 'Screenshots use mock seed data — the same data the demo runs on offline.',
      items: [
        {
          label: 'Dashboard',
          src: windCastHero,
          alt: 'windCast dashboard listing saved spots with session-score badges and current wind conditions.',
        },
        {
          label: 'Wind map',
          src: windCastMap,
          alt: 'Leaflet map with animated wind-particle overlay and score-colored pins at saved spots.',
        },
        {
          label: 'Spot forecast',
          src: windCastSpotDetail,
          alt: 'Spot detail page showing 48-hour hourly forecast with per-hour session scores and reasoning.',
        },
      ],
    },
    standaloneMockStatus: 'in-progress',
    updates: [
      {
        date: 'Jun 02, 2026',
        tag: 'PR #2',
        title: 'Added forecast confidence by comparing model output to nearby observations',
        url: 'https://github.com/codyjohnsontx/windCast/pull/2',
        body: 'Each saved spot now compares its model forecast against the nearest weather station and surfaces whether the two agree. Added a layers drawer on the map, station and buoy markers from a mock observation provider, a timeline selector for the forecast hour, and decision summaries on the dashboard and spot detail.',
      },
      {
        date: 'Jun 02, 2026',
        tag: 'PR #1',
        title: 'Swapped mock-only forecasts for the Open-Meteo provider and shipped spot CRUD',
        url: 'https://github.com/codyjohnsontx/windCast/pull/1',
        body: 'Replaced the mock-only forecast pipe with a real Open-Meteo provider behind the existing interface, added per-route error boundaries so a single forecast failure does not take down the dashboard, and built the spot CRUD that the scoring engine needs to do anything useful. Settings now exposes the forecast-source toggle, unit preferences (mph/knots/m/s), and JSON import/export for spot backup. Vitest suites were added for forms, hooks, and forecast utilities.',
      },
      {
        date: 'Jun 01, 2026',
        tag: 'Note',
        title: 'Seeded the MVP in a day',
        url: 'https://github.com/codyjohnsontx/windCast',
        body: 'Initial commit shipped the dashboard, spot list, scoring engine (utils/sessionScore.ts), and a Leaflet map with an animated wind-particle overlay. Forecasts ran on mock data so the UX could be designed against the full data shape before any network call existed; the provider interface was in place from day one so real sources could slot in without component changes.',
      },
    ],
  },
  {
    name: 'CTX Chat',
    slug: 'ctx-chat',
    tier: 'flagship',
    status: 'active-build',
    statusLabel: 'Active build',
    year: '2026',
    accent: 'oklch(0.68 0.14 205)',
    image: ctxChat,
    companyContext:
      'Dealership communication product built for a single-store motorcycle rollout, positioned against generic texting vendors.',
    role: 'Full-stack product builder',
    stack: [
      'Next.js 16',
      'TypeScript',
      'Tailwind CSS',
      'Prisma',
      'PostgreSQL-ready schema',
      'Auth.js / NextAuth',
      'Twilio SMS/MMS',
      'PWA',
    ],
    oneLiner:
      'Dealership communication workspace for motorcycle teams that need customer texting, follow-ups, service updates, and accountability in one place.',
    audience:
      'General managers, assistant GMs, service advisors, sales staff, parts staff, and managers reviewing daily dealership communication performance.',
    jtbd:
      'When a customer conversation, service update, or follow-up is open, dealership staff need one shared workspace that preserves context, ownership, delivery status, and the next action before missed communication becomes missed revenue.',
    problem:
      'Independent dealership communication is fragmented across personal phones, calls, website leads, service notes, and memory. That makes it easy to lose customer context, miss follow-ups, and leave managers without visibility into open conversations.',
    coreWorkflow: [
      'Staff signs in through secure role-based access for sales, service, parts, managers, and admins.',
      'Staff manages customer conversations from a shared inbox with linked vehicles, assignments, templates, internal notes, notifications, and SMS/MMS delivery status.',
      'Staff creates follow-up tasks, sends service updates, reassigns ownership, and handles opt-in or opt-out states without leaving the customer thread.',
      'Managers review Command Center metrics for unread conversations, overdue follow-ups, unassigned threads, failed messages, and department exceptions.',
    ],
    mvpScope: [
      'Public-facing Next.js site plus internal staff dashboard',
      'Secure Auth.js staff login and role-based access for admin, manager, sales, service, and parts users',
      'Shared inbox with customer profiles, linked vehicles, assignments, templates, tasks, notifications, and delivery status',
      'Twilio SMS/MMS send and receive routes with webhook signature verification, opt-in/opt-out handling, and delivery failure alerts',
      'Production-ready deployment structure with Vercel, Neon Postgres, Prisma, and Auth.js',
    ],
    evidenceSignal:
      'The current MVP includes secure staff login, role-based access, a shared inbox, customer profiles, follow-up tasks, Command Center metrics, Twilio SMS/MMS routes, webhook verification, opt-in/opt-out handling, delivery failure alerts, and production deployment structure.',
    nextStep:
      'Expand CTX Chat into a lightweight CRM and communication command center with deeper service-lane context, lead tracking, automated follow-up sequences, customer history, stronger reporting, CI/deployment automation, and integrations for payment, inventory, scheduling, and dealership management systems.',
    standaloneMockStatus: 'in-progress',
    updates: [
      {
        date: 'May 08, 2026',
        tag: 'Build',
        title: 'Initial CTX Chat app committed and pushed',
        url: 'https://github.com/codyjohnsontx/ctxconnect/commit/64fb5b2',
        body: 'The first full app build landed on main in the new ctxconnect repository. That established the standalone product with the shared inbox, Command Center, tasks, templates, and Twilio route structure.',
      },
      {
        date: 'Current',
        tag: 'Note',
        title: 'Manager Command Center added for operational oversight',
        body: 'The build includes a Command Center for unread conversations, overdue follow-ups, unassigned threads, failed messages, and exception states. That shifts the product from a simple inbox into a dealership operations surface.',
      },
      {
        date: 'Current',
        tag: 'Note',
        title: 'SMS compliance and assignment workflow wired into the MVP',
        body: 'The current build includes STOP and START handling, reassignment, internal notes, and follow-up creation inside conversation workflows. For dealership texting, accountability and baseline compliance need to exist from day one.',
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
        date: 'May 01, 2026',
        tag: 'PR #10',
        title: 'Launched a production-gated coming-soon wall and waitlist flow',
        url: 'https://github.com/codyjohnsontx/DiazMartialArts/pull/10',
        body: 'Added a gated Diaz on Demand launch path behind a feature flag, with a dedicated /ondemand waitlist page, Formspree-backed lead capture, and account-card routing that now points members into the on-demand funnel instead of a dead end.',
      },
      {
        date: 'May 01, 2026',
        tag: 'PR #9',
        title: 'Refreshed the homepage and rebuilt announcements as a flyer gallery',
        url: 'https://github.com/codyjohnsontx/DiazMartialArts/pull/9',
        body: 'Updated the live class schedule, centered the homepage layout, and turned announcements into a clickable flyer gallery with modal enlargement. That gives the Diaz ecosystem a cleaner front door while on-demand access is still staged.',
      },
      {
        date: 'Apr 19, 2026',
        tag: 'PR #87',
        title: 'Scoped admin permissions by affiliate school',
        body: 'Admin access now defaults to a single academy while owner access keeps cross-school publishing control. This moves the product closer to a multi-academy LMS instead of a single-site content portal.',
      },
      {
        date: 'Apr 06, 2026',
        tag: 'PR #82',
        title: 'Synced course progress across devices',
        body: 'Resume-where-you-left-off state now persists through the API instead of localStorage, so a member can start on one device and continue on another without losing place.',
      },
      {
        date: 'Mar 31, 2026',
        tag: 'PR #8',
        title: 'Simplified the homepage UI around one stronger CTA',
        body: 'Removed card-heavy homepage framing, collapsed duplicate calls to action, and simplified the programs layout into a cleaner stacked presentation. The site now pushes visitors toward one clearer next step instead of splitting attention.',
      },
      {
        date: 'Mar 31, 2026',
        tag: 'PR #7',
        title: 'Reopened the pricing route and tightened public smoke tests',
        body: 'Removed the stale redirect that had made /pricing unreachable, added that page to smoke coverage, and updated assertions to match the actual visible content. This reduced the chance of quietly shipping broken public routes.',
      },
      {
        date: 'Mar 17, 2026',
        tag: 'PR #6',
        title: 'Split website docs and fixed Clerk auth routing',
        body: 'Documented the website as its own repo boundary, clarified where Diaz on Demand responsibility begins, and moved Clerk auth pages to App Router catch-all routes so path-based auth flows behave correctly.',
      },
      {
        date: 'Mar 14, 2026',
        tag: 'PR #5',
        title: 'Replaced pricing with announcements backed by Sanity CMS',
        body: 'Shifted the public site away from static pricing toward a Sanity-powered announcements page, updated the nav and sitemap, and added the studio configuration needed to manage fresh content without code changes.',
      },
      {
        date: 'Mar 13, 2026',
        tag: 'PR #4',
        title: 'Centralized env validation and expanded E2E coverage',
        body: 'Introduced typed environment validation, fixed the on-demand redirect URL, and added end-to-end coverage around account gating, the on-demand route, and schedule behavior. That hardened the launch path before more funnel work shipped.',
      },
    ],
  },
  {
    name: 'Overlap',
    slug: 'overlap-racing-radar',
    archived: true,
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

export { allProducts };

export const products = allProducts.filter((product) => !product.archived);
export const flagshipProducts = products.filter((product) => product.tier === 'flagship');
export const conceptProducts = products.filter((product) => product.tier === 'concept');

export function getProductBySlug(slug) {
  return products.find((product) => product.slug === slug);
}
