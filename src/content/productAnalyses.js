export const productAnalyses = [
  {
    slug: 'track-tuner',
    title: 'Track Tuner PM analysis',
    tagline:
      'A mobile-first setup logging product for riders and drivers who need faster trackside decisions than notes apps can support.',
    summary:
      'Track Tuner is built around one narrow but recurring motorsport workflow: riders and drivers make setup changes every session, then struggle to understand what actually changed. The product now has a stronger setup-learning loop: free users keep the previous-session comparison, while Pro users can choose a same-vehicle baseline and review deterministic comparison signals with context warnings instead of causal claims.',
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
      'Every rider already has a phone in their pocket trackside, so adoption needs no new hardware and no new habit.',
      'There is a clear product gap between unstructured notes and pro-grade telemetry software.',
      'Five-minute between-session turnarounds mean any log flow has to finish in under a minute, which disqualifies most note-taking and full telemetry tools.',
      'LLM-backed guidance becomes credible once it is grounded in the rider’s own session history instead of generic motorsport advice.',
      'The workflow repeats every track weekend, which supports a low-price recurring subscription model.',
    ],
    productBet:
      'If session logging is fast enough to repeat and comparison is careful enough not to overclaim, riders will build structured history they can actually use. The free previous-session diff answers the immediate "what changed?" question, while Pro Session Comparison v1 gives serious users a richer baseline picker, lap-summary metrics, context flags, and setup deltas without pretending the app can prove causation.',
    mvp: {
      shipped: [
        'Supabase auth, protected routes, and a mobile shell optimized for trackside use.',
        'Garage and track management for both motorcycle and car setups.',
        'Session logging with optional setup modules for tires, suspension, alignment, and notes.',
        'Compare-with-previous-session diff view as the core workflow wedge.',
        'Pro Session Comparison v1 with same-vehicle baseline selection, same-track prioritization, strength labels, context flags, lap-summary metrics, and grouped setup deltas.',
        'Trackside tools including a sag calculator and unit converter.',
        'Stripe checkout, portal, webhook handling, and a founder promo path.',
      ],
      cut: [
        'Social feed, sharing, and follower mechanics.',
        'Real-time telemetry ingestion and desktop-first analytics.',
        'Native apps beyond the PWA footprint.',
        'Unbounded compare-any-vehicle workflows and causal recommendation claims.',
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
        decision: 'Shipped and retained for free users as the fastest way to see what changed since the previous session.',
      },
      {
        initiative: 'Session Comparison v1',
        value: 'High',
        effort: 'M',
        decision:
          'Shipped as a Pro workflow for same-vehicle baseline selection, context warnings, lap-summary metrics, and setup deltas.',
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
        label: 'Measurement status',
        detail:
          'No measured result yet. Impact to validate through compare starts, repeat comparison use, Pro gate hits, and follow-up track-day retention.',
      },
      {
        label: 'Activation',
        detail:
          'Time-to-first-session under 60 seconds, with at least 60% of new signups logging session one inside 7 days.',
      },
      {
        label: 'Retention',
        detail:
          'Session-two return at 40% or higher within 30 days, with active users logging at least 3 sessions per month.',
      },
      {
        label: 'Engagement',
        detail:
          'At least 70% of sessions include one setup module, and compare view opens on 60% or more of post-first sessions.',
      },
      {
        label: 'Conversion',
        detail:
          'Free-to-Pro conversion of 3 to 5% overall, with 15% or higher conversion on paywall-hit and Race Engineer gate events.',
      },
      {
        label: 'AI quality',
        detail:
          'Refusal rate between 5 and 15%, follow-up question rate above 30%, and thumbs-up feedback above 70% on shipped recommendations.',
      },
      {
        label: 'Revenue',
        detail:
          'Monthly churn under 8%, founder-promo conversion at 25% or higher, and at least 6 months of MRR runway before paid acquisition.',
      },
    ],
    analyticsPlan: {
      events: [
        'session_created',
        'session_module_added',
        'compare_viewed',
        'session_compare_started',
        'session_compare_baseline_changed',
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
      {
        label: 'PR #16',
        detail:
          'Shipped Session Comparison v1 as a Pro page with same-vehicle baseline selection, same-track prioritization, strength labels, context flags, lap-summary metrics from telemetry summaries, and changed-fields-first setup deltas.',
        url: 'https://github.com/codyjohnsontx/trackday_tuner/pull/16',
      },
    ],
    learnings: [
      'Compare-with-previous beat compare-any-two as the real v1 wedge. Riders usually want “what changed since last time,” not arbitrary historical analysis.',
      'Session Comparison v1 needed rules and warnings more than AI language. The feature is useful because it shows context and setup deltas without implying the setup caused the lap result.',
      'The AI only became trustworthy after refusal hardening and grounding verification. Refusing weakly grounded asks became a feature rather than a failure mode.',
      'Privacy-safe observability is not just a compliance choice; it is a billing and trust feature when AI usage needs to be understood without storing raw notes.',
      'A polished mobile workflow mattered more than richer custom UI controls. Native select elements held up better than touch-unfriendly abstractions.',
    ],
    nextIterations: [
      'Measure compare starts, baseline changes, repeated comparison use, Pro gate hits, and saved-takeaway demand before expanding the workflow.',
      'Add CSV import as a practical way to bring in more structured lap summaries.',
      'Consider saved takeaways only after users prove they return to comparisons across multiple sessions.',
      'Add symptom tags so the AI can reason over more structured signals than free-text notes alone.',
      'Polish PWA install prompts and offline drafts for low-signal track environments.',
    ],
  },
  {
    slug: 'ctx-chat',
    title: 'CTX Chat PM analysis',
    tagline:
      'A shared dealership texting and follow-up system designed around the real operating rhythm of sales, service, and parts teams.',
    summary:
      'CTX Chat is built around a dealership communication problem that generic texting tools do not fully solve: a message thread only matters if it also has ownership, department context, follow-up state, and management visibility. The product bet is that a browser-first shared inbox tied to real dealership workflows can outperform fragmented texting, personal phones, and generic vendors by turning every customer conversation into an accountable work item.',
    problem:
      'Dealership communication is scattered across personal cell phones, calls, email, website leads, DMS notes, and memory. That fragmentation leads directly to missed follow-ups, unclear ownership, weak visibility for managers, and lost sales or service satisfaction when no one is sure who is supposed to respond next.',
    users: {
      primary:
        'General managers, assistant GMs, service advisors, sales staff, and parts staff working customer conversations throughout the day.',
      secondary:
        'Managers and admin users reviewing response coverage, unread backlog, overdue follow-ups, and department exceptions.',
      buyer:
        'The dealership GM or ownership team, starting with a single-store internal rollout before any broader expansion.',
    },
    currentWorkflow: [
      'Customer communication is spread across dealer texting tools, personal phones, phone calls, email, and DMS notes.',
      'Follow-up ownership often lives in memory or manual reminders instead of a shared operational system.',
      'Management can see that something is slipping, but not always where the unread backlog or missed follow-up sits.',
    ],
    opportunity: [
      'A dealership-specific shared inbox can mirror the real roles of sales, service, and parts instead of flattening everything into one chat feed.',
      'Shared ownership, assignment, and follow-up state create a better accountability model than personal texting or generic vendor tools.',
      'Operational oversight becomes more valuable when unread, overdue, unassigned, and failed-message exceptions are visible in one command surface.',
      'A single-store rollout keeps the scope narrow enough to validate workflow fit before adding heavier integrations.',
    ],
    productBet:
      'A dealership-specific communication tool with clear ownership and next actions can outperform generic texting vendors when it matches the real workflow of the sales floor and service lane. The goal is not to be another inbox, but to make every conversation usable as a tracked operational object for the store.',
    mvp: {
      shipped: [
        'Role-based login for admin, manager, sales, service, and parts users.',
        'Shared inbox with filters, assignment, tags, priority, and status controls.',
        'Conversation view with message history, internal notes, customer context, and template-driven replies.',
        'Task and follow-up creation tied to both customers and conversations.',
        'Manager Command Center with operational alerts and drill-down views.',
      ],
      cut: [
        'Native iOS and Android apps.',
        'Deep DMS or Lightspeed EVO integration.',
        'Mass texting, AI features, payments, and full ecommerce integration.',
      ],
    },
    priorities: [
      {
        initiative: 'Shared inbox + assignment',
        value: 'High',
        effort: 'M',
        decision: 'Shipped first because accountability is the core wedge.',
      },
      {
        initiative: 'Operational Command Center',
        value: 'High',
        effort: 'M',
        decision: 'Shipped early to make management visibility part of the product, not an afterthought.',
      },
      {
        initiative: 'Compliance handling',
        value: 'High',
        effort: 'S',
        decision: 'Included in MVP because dealership texting needs opt-out basics from day one.',
      },
      {
        initiative: 'Templates + follow-ups',
        value: 'Medium',
        effort: 'S',
        decision: 'Shipped to reduce repetitive work and make next actions explicit.',
      },
      {
        initiative: 'Deep DMS integration',
        value: 'High',
        effort: 'XL',
        decision: 'Deferred until the communication workflow proves itself in a narrower rollout.',
      },
      {
        initiative: 'Native apps',
        value: 'Medium',
        effort: 'L',
        decision: 'Deferred in favor of a browser-first and PWA-friendly footprint.',
      },
      {
        initiative: 'AI + payments',
        value: 'Low',
        effort: 'L',
        decision: 'Cut from MVP because reliability and visibility mattered more than expansion features.',
      },
      {
        initiative: 'Mass texting',
        value: 'Low',
        effort: 'M',
        decision: 'Deferred because the first problem is accountability, not broadcast volume.',
      },
    ],
    successMetrics: [
      {
        label: 'Response time',
        detail:
          'Track how quickly staff responds once a customer conversation enters the shared inbox.',
      },
      {
        label: 'Unread backlog',
        detail:
          'Monitor unread conversation count and the aging of unread threads by department.',
      },
      {
        label: 'Follow-up discipline',
        detail:
          'Measure overdue follow-up count and the completion rate of created tasks.',
      },
      {
        label: 'Ownership clarity',
        detail:
          'Watch unassigned conversation count and reassignment patterns across staff and departments.',
      },
      {
        label: 'Reply coverage',
        detail:
          'Measure whether customer conversations are getting responses instead of stalling in inbox noise.',
      },
      {
        label: 'Message reliability',
        detail:
          'Track outbound message failures, status transitions, and exception resolution speed.',
      },
    ],
    analyticsPlan: {
      events: [
        'conversation_status_changed',
        'conversation_assigned',
        'follow_up_created',
        'follow_up_completed',
        'conversation_unread_aged',
        'message_sent',
        'message_failed',
        'notification_resolved',
      ],
      funnel: [
        'Staff sign-in',
        'Conversation opened',
        'Reply or note added',
        'Follow-up created',
        'Follow-up completed',
        'Exception resolved',
      ],
      cohorts: [
        'Department: sales vs service vs parts',
        'Role type: manager vs frontline staff',
        'Conversation source or workflow bucket once available',
      ],
      observability:
        'The product should track assignment changes, status transitions, unread aging, follow-up completion, and outbound send outcomes so the GM can see operational slippage before it becomes lost revenue or poor service follow-through.',
      dashboards: [
        'Unread backlog by department',
        'Overdue follow-up trend',
        'Unassigned conversation trend',
        'Failed message exception queue',
      ],
    },
    shippedHighlights: [
      {
        label: 'Initial build',
        detail:
          'Committed the first standalone CTX Chat build with the shared inbox, Command Center, tasks, templates, and Twilio route structure.',
        url: 'https://github.com/codyjohnsontx/ctxconnect/commit/64fb5b2',
      },
      {
        label: 'Command Center',
        detail:
          'Added a manager-facing operational surface for unread conversations, overdue follow-ups, unassigned threads, failed messages, and service or sales exceptions.',
      },
      {
        label: 'Conversation workflow',
        detail:
          'Shipped internal notes, reassignment, customer context, templates, and follow-up creation directly inside the message workflow.',
      },
      {
        label: 'Compliance baseline',
        detail:
          'Included STOP and START handling early so the texting workflow has basic compliance built into the MVP.',
      },
    ],
    learnings: [
      'The product becomes more valuable when every message is tied to an owner, a department, a status, and a next action instead of just becoming another chat feed.',
      'Operational visibility is part of the core product, not just reporting layered on top later.',
      'Single-store rollout discipline makes it easier to validate dealership-specific workflow fit before taking on heavier integrations.',
    ],
    nextIterations: [
      'Deploy a live internal environment with real Postgres and Twilio credentials.',
      'Add SLA tracking and escalation rules around unread and overdue conversations.',
      'Ship CSV import and cleaner customer record management.',
      'Integrate with the broader CTX dealership system and add a handoff path to the Shopify storefront.',
    ],
  },
  {
    slug: 'wattsmith',
    title: 'Wattsmith PM analysis',
    tagline:
      'A local-first cycling workout builder that prioritizes a reliable manual workflow before AI generation or platform sync.',
    summary:
      'Wattsmith is built around a practical product decision: make the manual builder useful first. The latest roadmap slices focus on trust before AI/RAG: template inspection before load, collapsible editing for complex repeat structures, and export readiness before .mrc or .erg download. That keeps the product explainable, testable, and grounded in a structured workout model.',
    problem:
      'Cyclists can describe a structured workout in plain language, but turning that idea into a clean workout file is still fiddly. They do not just need to draw a workout. They need to trust that a starter template is appropriate, that nested repeat structures are understandable, and that the exported file matches the visible workout before sending it to another platform.',
    users: {
      primary:
        'Cyclists who train with FTP-based structured workouts and want to build reusable sessions they can ride in external platforms.',
      secondary:
        'Self-coached riders and technical athletes who want to understand interval structure, watts, zone distribution, and workout rationale before exporting.',
      buyer:
        'Early product validation is self-serve and utility-led; no paid conversion or production usage metric has been claimed yet.',
    },
    currentWorkflow: [
      'A rider sketches workouts in notes, spreadsheets, platform builders, or file text and then manually checks whether duration, watts, and repeats make sense.',
      'Starter workout templates and saved personal workouts often live outside the builder, so reuse requires copying structure by hand.',
      'Power charts can show a workout shape without making each interval inspectable against FTP, zones, and export behavior.',
      'Export files can drift from the visible chart when range targets, ramps, repeats, or validation warnings are handled separately.',
    ],
    opportunity: [
      'A local-first builder can make the whole workflow usable without accounts, integrations, or cloud storage.',
      'The manual block model creates the structured foundation AI generation will need later.',
      'Template previews reduce the risk of loading a workout blindly.',
      'Collapsible editing makes complex interval structures easier to manage without hiding the underlying model.',
      'Export readiness turns validation from hidden logic into a visible confidence check.',
      'Interactive chart inspection helps riders trust what they are exporting by tying watts, %FTP, zones, and selected blocks together.',
      'A local library with templates turns one-off workout drafting into reusable training planning.',
      'Export previews and validation warnings make the product feel rideable instead of just drawable.',
    ],
    betHeading: 'Manual builder first before AI',
    productBet:
      'Before adding AI/RAG, Wattsmith needed a manual workflow riders could trust. That meant making templates inspectable before load, making complex repeat structures manageable after load, and making export readiness visible before download. AI can later accelerate creation, but it should not cover for a weak workout model or unclear export path.',
    mvp: {
      shipped: [
        'Tabbed workspace for Builder, Library, Profile, and Export.',
        'Manual block builder with add, delete, duplicate, reorder, repeat blocks, target ranges, single targets, ramp targets, and text cues.',
        'Local workout library with starter templates, search, category filtering, duplicate, rename, delete, and load.',
        'Starter template preview modal with chart, metrics, profile warnings, training rationale, and citation links.',
        'Accessible modal behavior with focus trap and focus restore.',
        'Collapsible workout editing for blocks and repeat children.',
        'Local athlete profile for FTP/default assumptions and workout warnings.',
        'Interactive SVG power chart with hover/tap inspection, keyboard-accessible interval selection, selected-block highlighting, zone bands, FTP line, 0W baseline, and watts/%FTP axis references.',
        'Export readiness checklist for .mrc and .erg output covering validation, FTP, timeline, target sanity, file preview, filename, and range strategy.',
        'Validated .mrc and .erg exports with preview, range export strategy, and shared flattened workout data.',
        'Workout metrics including duration, zone time, IF/TSS estimates, NP-style estimate, kJ, interval count, and work-above-threshold style metrics.',
        'Cited workout rationale/science notes structure and Vitest coverage for workout helpers, export readiness, validation, exports, zones, and science source resolution.',
      ],
      cut: [
        'AI workout generation.',
        'TrainerRoad, Strava, Garmin, or TrainingPeaks sync.',
        'Accounts, cloud library sync, sharing, or coaching workflows.',
        'Production usage, adoption, retention, or revenue claims.',
      ],
    },
    priorities: [
      {
        initiative: 'Manual block builder',
        value: 'High',
        effort: 'L',
        decision:
          'Shipped first because every later AI or integration feature depends on a trustworthy workout structure.',
      },
      {
        initiative: 'Interactive chart inspection',
        value: 'High',
        effort: 'M',
        decision:
          'Shipped early so riders can verify watts, %FTP, zones, selected blocks, and the 0W baseline before export.',
      },
      {
        initiative: 'Local library + templates',
        value: 'High',
        effort: 'M',
        decision:
          'Shipped to make the builder reusable instead of forcing every workout to start from a blank canvas.',
      },
      {
        initiative: 'Template preview',
        value: 'High',
        effort: 'M',
        decision:
          'Shipped before AI/RAG so riders can inspect the workout structure, training intent, warnings, and citations before loading a template.',
      },
      {
        initiative: 'Collapsible workout editing',
        value: 'Medium',
        effort: 'M',
        decision:
          'Shipped to make nested intervals and repeat blocks easier to manage without simplifying away the underlying structure.',
      },
      {
        initiative: 'Profile assumptions',
        value: 'Medium',
        effort: 'S',
        decision:
          'Included so warnings, watts, zones, and metrics are tied to a rider-specific FTP baseline.',
      },
      {
        initiative: '.mrc and .erg exports',
        value: 'High',
        effort: 'M',
        decision:
          'Shipped because a workout builder is not useful unless the file a rider exports matches the chart and validation model.',
      },
      {
        initiative: 'Export readiness checklist',
        value: 'High',
        effort: 'M',
        decision:
          'Shipped because export confidence is central to whether a manual builder feels serious enough to use.',
      },
      {
        initiative: 'AI generation',
        value: 'Medium',
        effort: 'L',
        decision:
          'Deferred until the manual model, validation, profile assumptions, templates, and export path are reliable.',
      },
    ],
    metricsHeading: 'Measure whether the builder is useful',
    successMetrics: [
      {
        label: 'Export success',
        detail:
          'Track whether users can build and export .mrc or .erg workouts without validation-blocking errors.',
      },
      {
        label: 'Library reuse',
        detail:
          'Measure saved workout count, template loads, duplicates, and repeat opens to see whether the library becomes part of planning.',
      },
      {
        label: 'Template preview-to-load rate',
        detail:
          'Track how often riders preview a starter template and then load it into the builder.',
      },
      {
        label: 'Collapse/expand usage',
        detail:
          'Measure collapse and expand behavior on complex workouts to see whether riders use it to manage nested structures.',
      },
      {
        label: 'Builder completion',
        detail:
          'Watch how often started workouts reach a valid preview/export state instead of being abandoned mid-build.',
      },
      {
        label: 'Export readiness pass rate',
        detail:
          'Track how often workouts reach a full readiness pass before download.',
      },
      {
        label: 'Export blocker/warning frequency',
        detail:
          'Measure which readiness checks create warnings or blockers so the builder can reduce preventable export friction.',
      },
      {
        label: 'Export after readiness review',
        detail:
          'Watch whether riders download .mrc or .erg files after reviewing readiness checks.',
      },
      {
        label: 'Inspection behavior',
        detail:
          'Track chart hover, tap, and keyboard interval inspection to see whether riders use the chart to understand targets.',
      },
      {
        label: 'File confidence',
        detail:
          'Validate exported files against external riding workflows before claiming platform readiness.',
      },
      {
        label: 'No measured result yet',
        detail:
          'This release is product foundation and usability work; adoption, retention, and revenue are not claimed.',
      },
    ],
    analyticsPlan: {
      events: [
        'workout_created',
        'block_added',
        'repeat_block_added',
        'template_preview_opened',
        'template_loaded',
        'workout_block_collapsed',
        'workout_block_expanded',
        'workout_saved',
        'chart_interval_inspected',
        'validation_warning_viewed',
        'export_readiness_viewed',
        'export_preview_opened',
        'export_downloaded',
      ],
      funnel: [
        'Open builder',
        'Create or load workout',
        'Preview template',
        'Edit blocks',
        'Collapse or expand complex blocks',
        'Inspect chart',
        'Review export readiness',
        'Resolve blockers or warnings',
        'Download file',
      ],
      cohorts: [
        'Workout source: blank vs starter template vs duplicated saved workout',
        'Target type: single vs range vs ramp',
        'Editor state: simple blocks vs nested repeat blocks',
        'Export type: .mrc vs .erg',
      ],
      observabilityLabel: 'Validation and evidence',
      observability:
        'The product should track validation warnings, export attempts, file type, target strategy, and chart inspection behavior before claiming usage impact. No production adoption, retention, revenue, or AI outcome metric exists yet.',
      dashboards: [
        'Builder completion funnel',
        'Export readiness pass, blocker, and warning rate',
        'Template preview-to-load trend',
        'Collapse/expand usage on nested workouts',
        'Chart inspection engagement',
      ],
    },
    shippedIntro:
      'PR #1 changed Wattsmith from a starter workout drawing MVP into a fuller local-first manual builder. PRs #2-#4 then tightened the trust surfaces before AI/RAG. These are the milestones that changed the product story.',
    shippedHighlights: [
      {
        label: 'PR #4',
        detail:
          'Added template previews, accessible modal behavior, collapsible workout editing, and export readiness checks to make the manual builder easier to trust before AI/RAG.',
        url: 'https://github.com/codyjohnsontx/wattSmith/pull/4',
      },
      {
        label: 'PR #1',
        detail:
          'Expanded Wattsmith into a tabbed manual workout builder with block editing, repeat blocks, target ranges, ramps, local library, profile assumptions, chart inspection, workout metrics, validation, cited rationale, and .mrc/.erg export previews.',
        url: 'https://github.com/codyjohnsontx/wattSmith/pull/1',
      },
      {
        label: 'Product decision',
        detail:
          'Chose manual builder quality before AI so cyclists can create a structured workout, understand watts and zones, save it locally, and export a file that matches what they see.',
      },
      {
        label: 'Technical foundation',
        detail:
          'Added reusable workout helpers, validation, storage migration, shared flattened workout data, export utilities, zone calculations, and focused Vitest coverage.',
      },
    ],
    roadmap: {
      heading: 'Roadmap staged around trust before AI',
      intro:
        'Wattsmith’s roadmap is intentionally staged around trust before AI. The next work strengthens the manual builder, library, export path, rationale system, metrics, and athlete-profile warnings before AI/RAG becomes part of the workflow. Longer term, typed workout intent, source-backed rationale, decision notes, and schema validation will make sure generated workouts cannot bypass the same export-safe model used by the manual builder.',
      phases: [
        {
          label: 'Manual builder trust',
          horizon: 'Next',
          items: [
            'Undo/redo for safer editing.',
            'Inline block validation.',
            'Better block presets.',
            'Duplicate-template-into-workout flow.',
          ],
        },
        {
          label: 'Library depth',
          horizon: 'Next',
          items: [
            'More starter templates.',
            'Sort by duration, category, and difficulty.',
            'Favorites.',
            'Recently edited workouts.',
            'Stronger empty states.',
          ],
        },
        {
          label: 'Export confidence',
          horizon: 'Next',
          items: [
            'File naming controls.',
            'Copy workout summary.',
            'Documented TrainerRoad import testing before claiming compatibility.',
          ],
        },
        {
          label: 'Science and rationale',
          horizon: 'Next',
          items: [
            'Rationale coverage for every template.',
            'Citation/source registry.',
            'Why this works.',
            'Who should modify this.',
            'Beginner, standard, and advanced versions.',
          ],
        },
        {
          label: 'Training metrics',
          horizon: 'Next',
          items: [
            'Clearer IF/TSS/NP assumptions.',
            'Intensity distribution.',
            'Work/rest ratio.',
            'Time above FTP.',
            'High-intensity density warning.',
            'kJ explanation.',
          ],
        },
        {
          label: 'Athlete profile warnings',
          horizon: 'Next',
          items: [
            'Preferred duration.',
            'Weekly hours.',
            'Experience.',
            'Goals.',
            'Constraints.',
            'Better non-AI warnings driven by those profile fields.',
          ],
        },
      ],
      aiPrep: {
        label: 'AI/RAG preparation',
        detail:
          'Prepare typed workout intent, source-backed rationale, decision/training explanation types, and generated/imported workout schema validation before any generated workout reaches export.',
        items: [
          'WorkoutIntent.',
          'WorkoutRationale.',
          'Source registry.',
          'Decision/training explanation types.',
          'Generated/imported workout schema validation.',
        ],
      },
      laterAi: {
        label: 'Later AI',
        detail:
          'AI can suggest, explain, and revise workouts later, but it must use the same validation and export-safe workout model as manual workouts.',
        items: [
          'AI can suggest workouts.',
          'AI can explain workouts.',
          'AI can revise workouts.',
          'AI must use the same validation and export-safe workout model as manual workouts.',
        ],
      },
    },
    learnings: [
      'AI would be premature without a dependable manual model. The builder has to be useful when every interval is entered by hand.',
      'Trust work is product work. A manual builder needs preview, editing clarity, validation, and export confidence before AI can be useful.',
      'Export readiness should be visible, not just encoded in helper functions or disabled buttons.',
      'A chart is not just visualization; it is a trust surface when export files need to match watts, %FTP, zones, and interval structure.',
      'Local-first can be a product advantage early because it lets the workout workflow work without accounts, sync, or integration dependencies.',
    ],
    nextIterations: [
      'Validate exported .mrc and .erg files against real riding workflows.',
      'Capture any documented manual import test before claiming TrainerRoad compatibility.',
      'Add AI/RAG only after manual builder trust remains stable across templates, nested blocks, validation, and export.',
      'Avoid claiming direct TrainerRoad, Strava, Garmin, or TrainingPeaks sync until an integration actually ships.',
    ],
  },
];

export function getProductAnalysisBySlug(slug) {
  return productAnalyses.find((analysis) => analysis.slug === slug);
}
