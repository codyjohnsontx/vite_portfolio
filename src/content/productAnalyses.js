export const productAnalyses = [
  {
    slug: 'track-tuner',
    title: 'Track Tuner PM analysis',
    tagline:
      'A mobile-first setup logging product for riders and drivers who need faster trackside decisions than notes apps can support.',
    summary:
      'Track Tuner is built around one narrow but recurring motorsport workflow: riders and drivers make setup changes every session, then struggle to remember what actually helped. The product bet is that if logging is faster than Notes and the app automatically surfaces what changed since last time, users will build enough structured history for grounded AI recommendations to become genuinely useful instead of generic forum advice.',
    problem:
      'Track day riders and HPDE or club drivers make tire, suspension, alignment, and sag changes between sessions, but the value of each change is comparative. A single session note is not enough. The real question is what changed versus last time, whether it improved the car or bike, and what to try next with only a few minutes before going back out.',
    users: {
      primary:
        'Motorcycle track-day riders and HPDE or time-attack drivers logging setups on a phone between sessions.',
      secondary:
        'Club racers running multi-session weekends who need more rigorous comparison data across repeated runs.',
      buyer:
        'The same person as the user: a self-serve B2C subscription with no separate economic buyer.',
    },
    currentWorkflow: [
      'Most riders use Notes, Google Sheets, paper notebooks, or photos of tire gauges and clicker counts in the trailer.',
      'Trackside conditions make manual logging worse: gloves on, sun glare, and five-minute turnarounds between sessions.',
      'Existing motorsport software tends to split between free but sloppy note-taking and expensive telemetry-first desktop suites.',
    ],
    opportunity: [
      'The smartphone is already in the tank bag or trailer, so there is no new hardware behavior to teach.',
      'There is a clear product gap between unstructured notes and pro-grade telemetry software.',
      'LLM-backed guidance becomes credible once it is grounded in the rider’s own session history instead of generic motorsport advice.',
      'The workflow repeats every track weekend, which supports a low-price recurring subscription model.',
    ],
    productBet:
      'If session logging is faster than typing into Notes in under a minute and the app automatically shows what changed since the previous session, riders will log consistently enough for structured history to become the moat. Once a rider has several grounded sessions, Race Engineer can answer with better context than a forum thread, which is what justifies upgrading to Pro.',
    mvp: {
      shipped: [
        'Supabase auth, protected routes, and a mobile shell optimized for trackside use.',
        'Garage and track management for both motorcycle and car setups.',
        'Session logging with optional setup modules for tires, suspension, alignment, and notes.',
        'Compare-with-previous-session diff view as the core workflow wedge.',
        'Trackside tools including a sag calculator and unit converter.',
        'Stripe checkout, portal, webhook handling, and a founder promo path.',
      ],
      cut: [
        'Social feed, sharing, and follower mechanics.',
        'Real-time telemetry ingestion and desktop-first analytics.',
        'Native apps beyond the PWA footprint.',
        'Arbitrary compare-any-two-session workflows for v1.',
        'CSV export and analytics charts until the core loop was stable.',
      ],
    },
    priorities: [
      {
        initiative: 'Session logging + modules',
        value: 'High',
        effort: 'M',
        decision: 'Shipped first as the core loop.',
      },
      {
        initiative: 'Compare with previous',
        value: 'High',
        effort: 'S',
        decision: 'Shipped as the clearest wedge against Notes.',
      },
      {
        initiative: 'Stripe billing',
        value: 'Medium',
        effort: 'M',
        decision: 'Shipped before AI gating to support monetization cleanly.',
      },
      {
        initiative: 'Race Engineer AI',
        value: 'High',
        effort: 'L',
        decision: 'Deferred until after MVP, then shipped as the main differentiator.',
      },
      {
        initiative: 'Trackside tools',
        value: 'Medium',
        effort: 'S',
        decision: 'Shipped to create daily-use surface area beyond pure logging.',
      },
      {
        initiative: 'CSV export + charts',
        value: 'Medium',
        effort: 'M',
        decision: 'Deferred as a Pro enhancement rather than a launch blocker.',
      },
      {
        initiative: 'Social / sharing',
        value: 'Low',
        effort: 'L',
        decision: 'Cut because it was not the product wedge.',
      },
      {
        initiative: 'Telemetry ingest',
        value: 'High',
        effort: 'XL',
        decision: 'Cut because it pushed the product into the wrong tier too early.',
      },
    ],
    successMetrics: [
      {
        label: 'Activation',
        detail:
          'Measure session-one creation within seven days and keep time-to-first-session below sixty seconds for the basic flow.',
      },
      {
        label: 'Retention',
        detail:
          'Track the percentage of users who come back to log session two, plus sessions per active user each month.',
      },
      {
        label: 'Engagement',
        detail:
          'Watch the share of sessions using at least one setup module and the usage rate of the compare view.',
      },
      {
        label: 'Conversion',
        detail:
          'Measure free-to-Pro conversion after free-tier limits and after Race Engineer queries hit an upgrade gate.',
      },
      {
        label: 'AI quality',
        detail:
          'Keep refusal rate low but non-zero, monitor follow-up question rate, and capture recommendation feedback.',
      },
      {
        label: 'Revenue',
        detail:
          'Track MRR, founder-promo conversion, and churn before scaling acquisition.',
      },
    ],
    analyticsPlan: {
      events: [
        'session_created',
        'session_module_added',
        'compare_viewed',
        'ai_query_submitted',
        'ai_query_refused',
        'ai_feedback_submitted',
        'paywall_hit',
        'checkout_started',
        'subscription_active',
      ],
      funnel: [
        'Signup',
        'First vehicle',
        'First session',
        'Second session',
        'Compare view',
        'Paywall hit',
        'Pro subscription',
      ],
      cohorts: [
        'Vehicle type: motorcycle vs car',
        'Signup week',
        'Founder-promo cohort',
      ],
      observability:
        'AI observability stores fingerprints and redacted previews rather than raw prompts, which supports cost debugging, deduplication, and safety review without retaining sensitive setup notes.',
      dashboards: [
        'Activation funnel',
        'AI cost per active user',
        'Refusal-rate trend',
        'Free-tier limit-hit conversion',
      ],
    },
    shippedHighlights: [
      {
        label: 'PRs #1–#3',
        detail:
          'Stabilized routes, cross-device QA, and performance details like auth-call deduplication and loading states.',
      },
      {
        label: 'PR #5',
        detail:
          'Shipped Race Engineer as a post-session setup assistant for Pro users.',
        url: 'https://github.com/codyjohnsontx/trackday_tuner/pull/5',
      },
      {
        label: 'PR #6',
        detail:
          'Expanded Race Engineer into a fuller adaptive workflow with session-history UX and recommendation feedback.',
        url: 'https://github.com/codyjohnsontx/trackday_tuner/pull/6',
      },
      {
        label: 'PRs #8–#9',
        detail:
          'Hardened refusal behavior and verified that personal evidence must actually be present in loaded context before the AI can speak as if it knows rider history.',
      },
      {
        label: 'PRs #10, #12, #13',
        detail:
          'Added privacy-safe observability, inspection tooling, and prompt deduplication so repeated identical requests are not billed twice.',
      },
      {
        label: 'PR #14',
        detail:
          'Moved billing controls out of the dashboard and into settings to keep the core product surface cleaner.',
      },
    ],
    learnings: [
      'Compare-with-previous beat compare-any-two as the real v1 wedge. Riders usually want “what changed since last time,” not arbitrary historical analysis.',
      'The AI only became trustworthy after refusal hardening and grounding verification. Refusing weakly grounded asks became a feature rather than a failure mode.',
      'Privacy-safe observability is not just a compliance choice; it is a billing and trust feature when AI usage needs to be understood without storing raw notes.',
      'A polished mobile workflow mattered more than richer custom UI controls. Native select elements held up better than touch-unfriendly abstractions.',
    ],
    nextIterations: [
      'Add multi-session compare as a Pro feature now that the session shape is more stable.',
      'Ship CSV export as a low-effort Pro utility.',
      'Add symptom tags so the AI can reason over more structured signals than free-text notes alone.',
      'Polish PWA install prompts and offline drafts for low-signal track environments.',
      'Publish a public deploy and activation dashboard before spending on acquisition.',
    ],
  },
];

export function getProductAnalysisBySlug(slug) {
  return productAnalyses.find((analysis) => analysis.slug === slug);
}

