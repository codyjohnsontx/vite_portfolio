export const products = [
  {
    name: 'Track Tuner',
    slug: 'track-tuner',
    tier: 'flagship',
    status: 'active-build',
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
  },
  {
    name: 'Diaz on Demand',
    slug: 'diaz-on-demand',
    tier: 'flagship',
    status: 'active-build',
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
  },
  {
    name: 'Overlap',
    slug: 'overlap-racing-radar',
    tier: 'concept',
    status: 'prototype',
    companyContext: 'iRacing ecosystem concept',
    role: 'Product Manager / Developer',
    stack: ['.NET', 'WPF', 'iRacing SDK'],
    oneLiner:
      'Real-time racing radar overlay concept for close-proximity battles where glance speed matters.',
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
      'A working prototype exists with live telemetry integration and real-time positional rendering in desktop sessions.',
    nextStep:
      'Run focused driver usability tests to tune information density and reaction time benefits under race pressure.',
    standaloneMockStatus: 'planned',
  },
  {
    name: 'Strava Component Lifecycle',
    slug: 'strava-component-lifecycle',
    tier: 'concept',
    status: 'prototype',
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
  },
  {
    name: 'Instagram GIF Vault',
    slug: 'instagram-comment-gif-vault',
    tier: 'concept',
    status: 'prototype',
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
