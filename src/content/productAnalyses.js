export const productAnalyses = [
  {
    slug: 'track-tuner',
    title: 'Track Tuner PM analysis',
    tagline:
      'A mobile-first setup logging product for riders and drivers who need faster trackside decisions than notes apps can support.',
    summary:
      'Track Tuner is built around one narrow but recurring motorsport workflow: riders and drivers make setup changes every session, then struggle to understand what actually changed. The feature sequencing turns a broad "better setup advice" ask into a narrower deliverable compare workflow with explicit guardrails. The product now has a stronger setup-learning loop: free users keep the previous-session comparison, while Pro users can choose a same-vehicle baseline and review deterministic comparison signals with context warnings instead of causal claims.',
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
    title: 'CTX Connect PM analysis',
    tagline:
      'A shared dealership texting and follow-up system designed around the real operating rhythm of sales, service, and parts teams.',
    summary:
      'CTX Connect is built around a dealership communication problem that generic texting tools do not fully solve: a message thread only matters if it also has ownership, department context, follow-up state, and management visibility. The product turns each message into an owned operational work item with status, assignment, follow-up, and exception visibility. The product bet is that a browser-first shared inbox tied to real dealership workflows can outperform fragmented texting, personal phones, and generic vendors by making every customer conversation accountable.',
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
          'Committed the first standalone CTX Connect build with the shared inbox, Command Center, tasks, templates, and Twilio route structure.',
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
      'Wattsmith is built around a practical product decision: make the manual builder trustworthy before AI/RAG. PR #10 tightened the moment of truth for the app: exported .mrc/.erg files are now verified in-repo by parsing them back into workout timelines and checking them against the source workout. The builder is still local-first and composable, but export correctness no longer depends on a flaky third-party desktop app.',
    problem:
      'Cyclists can describe a structured workout in plain language, but turning that idea into a clean workout file is still fiddly. Rebuilding common workout pieces by hand creates friction, and export is where trust either holds or breaks: if the file is wrong, the rider gets the wrong workout on the trainer. Riders need reusable pieces, valid insertion points, understandable nested structures, and confidence that the exported file matches the visible workout before sending it to another platform.',
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
      'Starter workout templates, personal blocks, warmups, intervals, recoveries, and cooldowns often live outside the builder, so reuse requires copying or rebuilding structure by hand.',
      'Palette-style reuse is only useful if starter blocks and custom blocks stay inside the same editing flow as the actual workout.',
      'Power charts can show a workout shape without making each interval inspectable against FTP, zones, and export behavior.',
      'Export files can drift from the visible chart when range targets, ramps, repeats, or validation warnings are handled separately.',
      'Export testing previously depended on importing files into a third-party desktop app and visually checking the result, which stalled the milestone when the app was too buggy to log into.',
    ],
    opportunity: [
      'A local-first builder can make the whole workflow usable without accounts, integrations, or cloud storage.',
      'The manual block model creates the structured foundation AI generation will need later.',
      'A 60-block reusable starter palette can reduce repeated setup for common warmups, endurance work, intervals, recovery steps, cooldowns, and general notes.',
      'Drag/drop composition can make the builder feel faster only if explicit drop joints show where a block can safely land.',
      'Custom reusable blocks let riders keep their own workout pieces visible instead of forcing personal structure to live in a separate library.',
      'Template previews reduce the risk of loading a workout blindly.',
      'Collapsible editing makes complex interval structures easier to manage without hiding the underlying model.',
      'Export readiness turns validation from hidden logic into a visible confidence check.',
      'In-repo export verification can prove the generated file reconstructs the intended workout without depending on any single third-party training app.',
      'Accessibility fixes, drop announcements, and button fallbacks make composition behavior part of the product, not just the visual layer.',
      'Interactive chart inspection helps riders trust what they are exporting by tying watts, %FTP, zones, and selected blocks together.',
      'A local library with templates turns one-off workout drafting into reusable training planning.',
      'Export previews and validation warnings make the product feel rideable instead of just drawable.',
    ],
    betHeading: 'Manual builder first before AI',
    productBet:
      'Before adding AI/RAG, Wattsmith needs a manual workflow riders can trust and reuse. PR #10 strengthens that base by moving export confidence into automated tests: generated .mrc/.erg files are parsed back into workout timelines, checked against source durations, power targets, ramps, repeats, and cues, and protected by golden-file comparisons. AI can later accelerate creation, but it should not bypass the same export-safe model.',
    mvp: {
      shipped: [
        'Tabbed workspace for Builder, Library, Profile, and Export.',
        'Manual block builder with add, delete, duplicate, reorder, repeat blocks, target ranges, single targets, ramp targets, and text cues.',
        '60 protected starter reusable blocks across Warmup, Endurance, Tempo, Sweet Spot, Threshold, VO2, Anaerobic, Recovery, Cooldown, and General.',
        'Grouped searchable reusable block palette with drag/drop insertion and button fallbacks.',
        'Custom reusable block management for creating, editing, duplicating, deleting, and inserting saved workout pieces.',
        'Explicit drop joints before and after root workout blocks and inside repeat children, with invalid nested placements blocked.',
        'Magnetic insertion previews, drag overlays, and drag handles for reordering existing workout blocks.',
        'Local workout library with starter templates, search, category filtering, duplicate, rename, delete, and load.',
        'Starter template preview modal with chart, metrics, profile warnings, training rationale, and citation links.',
        'Accessible modal behavior with focus trap, focus restore, search labeling, and drop joint announcements.',
        'Collapsible workout editing for blocks and repeat children.',
        'Local athlete profile for FTP/default assumptions and workout warnings.',
        'Interactive SVG power chart with hover/tap inspection, keyboard-accessible interval selection, selected-block highlighting, zone bands, FTP line, 0W baseline, and watts/%FTP axis references.',
        'Export readiness checklist for .mrc and .erg output covering validation, FTP, timeline, target sanity, file preview, filename, and range strategy.',
        'Validated .mrc and .erg exports with preview, range export strategy, and shared flattened workout data.',
        'Automated .mrc/.erg export verification that round-trips generated files back into workout timelines.',
        'Golden-file export checks that fail when committed sample exports drift from current exporter output.',
        'App-agnostic export-testing documentation that makes human third-party app checks optional instead of the source of truth.',
        'Workout metrics including duration, zone time, IF/TSS estimates, NP-style estimate, kJ, interval count, and work-above-threshold style metrics.',
        'Cited workout rationale/science notes structure and Vitest coverage for starter validation, export readiness, clone/rekey behavior, nested drag/drop helpers, validation, exports, zones, and science source resolution.',
      ],
      cut: [
        'AI workout generation.',
        'Claims that a specific third-party app accepts every exported file.',
        'TrainerRoad, Strava, Garmin, or TrainingPeaks sync.',
        'Accounts, cloud library sync, sharing, or coaching workflows.',
        'Production usage, adoption, speed, retention, or revenue claims.',
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
        initiative: 'Automated export verification',
        value: 'High',
        effort: 'M',
        decision:
          'Shipped in PR #10 because export correctness is the app’s moment of truth. The build now verifies round-trip file-to-workout fidelity and golden fixtures instead of depending on a flaky third-party desktop app.',
      },
      {
        initiative: 'Reusable starter palette',
        value: 'High',
        effort: 'M',
        decision:
          'Shipped to make common workout pieces reusable inside the builder instead of forcing riders to rebuild warmups, intervals, recoveries, and cooldowns from scratch.',
      },
      {
        initiative: 'Drag/drop composition',
        value: 'High',
        effort: 'L',
        decision:
          'Added after the block model was stable enough to support explicit drop joints, magnetic previews, nested placement rules, reordering, and coherent undo/redo behavior.',
      },
      {
        initiative: 'Custom reusable blocks',
        value: 'High',
        effort: 'M',
        decision:
          'Included so riders can keep their own repeatable workout pieces visible and manageable alongside protected starter blocks.',
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
        initiative: 'Accessibility and fallbacks',
        value: 'High',
        effort: 'M',
        decision:
          'Kept in scope because reusable composition needs labeled search, modal focus behavior, drop joint announcements, and button insertion paths to be usable beyond pointer dragging.',
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
        label: 'Export verification coverage',
        detail:
          'PR #10 moved test count from 84 to 119 and verifies file-format correctness through automated round-trip and golden-file checks. This is a build-confidence signal, not a measured user-impact result.',
      },
      {
        label: 'Library reuse',
        detail:
          'Measure saved workout count, template loads, duplicates, and repeat opens to see whether the library becomes part of planning.',
      },
      {
        label: 'Palette search and insert',
        detail:
          'Track palette searches, category use, and starter block insert rate to see whether the 60-block palette reduces blank-workout friction.',
      },
      {
        label: 'Custom block reuse',
        detail:
          'Measure custom block creation, edits, inserts, duplicates, and deletes to see whether riders save personal workout pieces for later use.',
      },
      {
        label: 'Drag/drop versus buttons',
        detail:
          'Compare drag/drop insertion with button insertion so the product does not mistake visual interaction for the only usable path.',
      },
      {
        label: 'Invalid drop attempts',
        detail:
          'Track blocked repeat-child drops and other invalid placements to find confusing composition rules before they create export problems.',
      },
      {
        label: 'Reorder and undo behavior',
        detail:
          'Watch workout block reorder frequency and undo after drag/drop to confirm composition changes stay understandable and reversible.',
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
        'palette_searched',
        'palette_category_selected',
        'starter_block_inserted',
        'custom_block_created',
        'custom_block_inserted',
        'custom_block_deleted',
        'workout_block_drag_started',
        'workout_block_dropped',
        'drop_joint_focused',
        'invalid_drop_blocked',
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
        'Search or browse palette',
        'Insert starter or custom block',
        'Reorder or adjust block',
        'Edit blocks',
        'Collapse or expand complex blocks',
        'Inspect chart',
        'Review export readiness',
        'Resolve blockers or warnings',
        'Download file',
      ],
      cohorts: [
        'Workout source: blank vs starter template vs duplicated saved workout',
        'Block source: starter vs custom vs existing workout block',
        'Starter block category',
        'Insertion method: drag/drop vs button',
        'Drop location: root vs repeat child',
        'Target type: single vs range vs ramp',
        'Editor state: simple blocks vs nested repeat blocks',
        'Export type: .mrc vs .erg',
      ],
      observabilityLabel: 'Validation and evidence',
      observability:
        'The product should track validation warnings, export attempts, file type, target strategy, palette use, drag/drop behavior, invalid drops, and chart inspection behavior before claiming usage impact. Export file-format correctness is now checked in-repo through automated round-trip and golden-file tests. No production adoption, speed, retention, revenue, or AI outcome metric exists yet.',
      dashboards: [
        'Builder completion funnel',
        'Export readiness pass, blocker, and warning rate',
        'Palette search and starter block insert trend',
        'Custom block creation and reuse trend',
        'Drag/drop versus button insertion mix',
        'Invalid drop and undo-after-drop rate',
        'Template preview-to-load trend',
        'Collapse/expand usage on nested workouts',
        'Chart inspection engagement',
      ],
    },
    shippedIntro:
      'PR #1 changed Wattsmith from a starter workout drawing MVP into a fuller local-first manual builder. PRs #2-#4 tightened trust surfaces before AI/RAG, PR #6 made the builder composable with reusable blocks and drag/drop insertion, and PR #10 moved export correctness into automated verification. These are the milestones that changed the product story.',
    shippedHighlights: [
      {
        label: 'PR #10',
        detail:
          'Replaced flaky third-party-app export testing with automated in-repo verification: generated .mrc/.erg files are parsed back into workout timelines, checked against the source workout, and protected by golden-file tests.',
        url: 'https://github.com/codyjohnsontx/wattSmith/pull/10',
      },
      {
        label: 'PR #6',
        detail:
          'Added a 60-block reusable starter palette, custom reusable block management, drag/drop insertion, explicit drop joints, magnetic previews, workout block reordering, accessibility improvements, and tests for export-safe composition behavior.',
        url: 'https://github.com/codyjohnsontx/wattSmith/pull/6',
      },
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
          'Added reusable workout helpers, reusable block normalization, clone/rekey behavior, nested drag/drop helpers, validation, storage migration, shared flattened workout data, export utilities, zone calculations, and focused Vitest coverage.',
      },
    ],
    decisionStory: {
      heading: 'Export confidence moved into the codebase',
      problem:
        'The export milestone was blocked by a manual verification step that depended on a third-party desktop app. When that app was too buggy to log into, the product could not rely on it as the source of truth.',
      decision:
        'I verified the file format directly in the codebase: generate each .mrc/.erg export, parse it back into a workout timeline, compare it to the source workout, and keep committed sample exports under golden-file checks.',
      outcome:
        'Export correctness is now checked automatically on every change. The milestone is closed, test count moved from 84 to 119, and human visual checks are optional app-acceptance checks instead of the gate.',
    },
    roadmap: {
      heading: 'Roadmap staged around trust before AI',
      intro:
        'Wattsmith’s roadmap is intentionally staged around trust before AI. Export confidence is now complete through automated round-trip and golden-file verification, so the next work can focus on rationale coverage, clearer training metrics, profile-driven warnings, and library polish. Longer term, typed workout intent, source-backed rationale, decision notes, and schema validation will make sure generated workouts cannot bypass the same export-safe model used by the manual builder.',
      phases: [
        {
          label: 'Manual builder trust',
          horizon: 'Next',
          items: [
            'Inline validation refinements.',
            'Keyboard and screen-reader QA across drag/drop paths.',
            'More detailed invalid-drop explanations.',
            'Duplicate-template-into-workout flow polish.',
          ],
        },
        {
          label: 'Library depth',
          horizon: 'Next',
          items: [
            'Duration and difficulty filters.',
            'Favorites.',
            'Recently edited workouts.',
            'Stronger empty states.',
          ],
        },
        {
          label: 'Export confidence',
          horizon: 'Done',
          items: [
            'Automated round-trip parsing for generated .mrc and .erg files.',
            'Checks for durations, %FTP and watts targets, ramp slopes, expanded repeats, and cue timestamps.',
            'Golden-file checks for committed sample exports.',
            'App-agnostic export-testing docs with third-party visual checks treated as optional.',
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
      'Composable workflows need explicit valid insertion points, not just drag/drop visuals.',
      'Fallback buttons, labeled search, focus behavior, and drop announcements are part of the builder surface, not cleanup after the main interaction.',
      'Export readiness should be visible, not just encoded in helper functions or disabled buttons.',
      'Export confidence should not depend on a single third-party app. The source of truth belongs in tests that prove the file reconstructs the intended workout.',
      'A chart is not just visualization; it is a trust surface when export files need to match watts, %FTP, zones, and interval structure.',
      'Local-first can be a product advantage early because it lets the workout workflow work without accounts, sync, or integration dependencies.',
    ],
    nextIterations: [
      'Optional: run a one-time visual acceptance check in an ERG/MRC-capable app if app-specific confidence is needed.',
      'Add AI/RAG only after manual builder trust remains stable across templates, nested blocks, validation, and export.',
      'Avoid claiming direct TrainerRoad, Strava, Garmin, or TrainingPeaks sync until an integration actually ships.',
    ],
  },
  {
    slug: 'oncopath',
    title: 'OncoPath PM analysis',
    tagline:
      'An AI-assisted cancer trial explainer where the centerpiece is not the UI. It is the evaluation work that measures whether the AI explanations stay faithful to the source record.',
    summary:
      'OncoPath turns public ClinicalTrials.gov records into plain-English explanations so patients and caregivers can walk into an oncology appointment with better questions. The product deliberately does not diagnose, recommend treatment, confirm eligibility, or tell anyone to enroll, and it collects no protected health information because everything stays in the browser. The credibility work is the evidence track: a frozen test set of real trials, a validator bug fixed by construction (0 to 100 percent usable output), an unsourced warnings field removed, a second-model faithfulness judge that surfaced a bug in its own inputs (67 to 81 percent), and human calibration that showed the judge is too lenient. The 81 percent is reported, and explicitly not trusted yet.',
    problem:
      'Public trial data is hard for patients to use. ClinicalTrials.gov records are written for researchers, with dense eligibility criteria, phase jargon, and endpoints that do not answer the question a patient actually has: is this trial worth asking my oncologist about? For an AI summarizer in this domain, the harder question is not whether the output looks nice. It is whether the output is making things up.',
    users: {
      primary:
        'Cancer patients researching trials for themselves, entering only basic context: cancer type, age group, and location.',
      secondary:
        'Caregivers and family members preparing questions and a printable discussion sheet for someone else’s oncology appointment.',
      buyerLabel: 'Mission',
      buyer:
        'OncoPath is not built to make money and never will be. It exists to help people in one of the hardest moments of their lives use public information that already belongs to them. It is live and free at onco-path.vercel.app, newly deployed with no adoption or accuracy claims yet, and a faithfulness number that is reported but not yet validated.',
    },
    currentWorkflow: [
      'Patients and caregivers search Google and forums, then land on raw ClinicalTrials.gov pages written for researchers.',
      'Eligibility criteria can run for pages, so people either give up or carry a misreading into the appointment.',
      'Questions for the care team get assembled from memory in the waiting room instead of from the official record.',
    ],
    opportunity: [
      'Trial records are public and free through the ClinicalTrials.gov v2 API, with no auth and no patient data involved.',
      'Plain-English explanations tied to the official record can prepare a conversation without pretending to give medical advice.',
      'A printable discussion sheet turns research into something a patient can physically bring to an appointment.',
      'Keeping all context in browser localStorage means the app collects no PHI, which sidesteps HIPAA by design. That is a deliberate architectural choice, not a gap.',
      'The safety boundary is a feature: a tool that refuses to diagnose or confirm eligibility is easier to trust than one that answers everything.',
    ],
    betHeading: 'Built to be checked, not trusted blindly',
    productBet:
      'For most apps, "it produced an answer" is good enough. For a cancer app it is not. The bet is that an AI trial explainer is only shippable with a hard safety boundary (no diagnosis, no treatment advice, no eligibility confirmation, no enrollment recommendations) and an evaluation loop that measures whether every explanation traces back to the official record. The search UI and discussion sheet were the easy 20 percent. The evidence track is the product.',
    mvp: {
      shipped: [
        'Trial search over the ClinicalTrials.gov v2 API using basic context only: cancer type, age group, location.',
        'Plain-English explanation boxes per trial: why it may be relevant, possible eligibility concerns, what information is missing, and questions to ask the oncology team.',
        'Safety validator on every explanation, with a deterministic source-grounded fallback when the model is unavailable or output fails checks.',
        'Printable doctor discussion sheet with saved trials.',
        'Browser localStorage persistence with no accounts and no PHI.',
        'A reproducible eval test set snapshotted from about a dozen real trials across cancer types and complexity.',
        'A faithfulness judge from a different model family that grades each claim as supported, partially supported, unsupported, or overstated.',
        'Human calibration of the judge against blind hand-labels.',
      ],
      cut: [
        'Diagnosis, treatment recommendations, and eligibility confirmation.',
        'Trial ranking or best-match scoring.',
        'Telling anyone to enroll.',
        'Collecting health records, identifiers, or any server-side storage of personal context.',
        'The model’s free-form warnings field, removed after it invented unsourced clinical risk claims.',
        'Shipping the 81 percent judge score as an accuracy claim.',
      ],
    },
    priorities: [
      {
        initiative: 'Safety boundary',
        value: 'High',
        effort: 'S',
        decision:
          'Defined before features: the app only summarizes public information to prepare a conversation with a care team. Everything it refuses to do is scope, not a disclaimer.',
      },
      {
        initiative: 'No-PHI architecture',
        value: 'High',
        effort: 'S',
        decision:
          'Browser-local storage only. Collecting no protected health information sidesteps HIPAA by design and keeps the app honest about what it can protect.',
      },
      {
        initiative: 'Plain-English explanations',
        value: 'High',
        effort: 'M',
        decision:
          'Shipped as the core loop: relevance, eligibility concerns, missing information, and questions to ask, each meant to trace back to the official record.',
      },
      {
        initiative: 'Disclaimer by construction',
        value: 'High',
        effort: 'S',
        decision:
          'The safety disclaimer is guaranteed in code instead of hoping the model writes it. A safety-critical line should never depend on the model.',
      },
      {
        initiative: 'Faithfulness eval harness',
        value: 'High',
        effort: 'M',
        decision:
          'Built before trusting any quality claim. A frozen test set and usable-output measurement found bugs in the app and in the eval itself.',
      },
      {
        initiative: 'Judge calibration',
        value: 'High',
        effort: 'S',
        decision:
          'Hand-labeled a sample blind and compared. Agreement was only about half, so the judge’s 81 percent is not treated as evidence yet.',
      },
      {
        initiative: 'Warnings field',
        value: 'Low',
        effort: 'S',
        decision:
          'Removed. The model used it to invent clinical risk claims that were not in the source, so the opening no longer exists.',
      },
      {
        initiative: 'Deployment',
        value: 'Medium',
        effort: 'M',
        decision:
          'Shipped. Deployed to Vercel at onco-path.vercel.app, free with no accounts. The faithfulness number stays untrusted until calibration improves.',
      },
    ],
    metricsHeading: 'Measured on the eval bench, not in production',
    successMetrics: [
      {
        label: 'Usable output rate',
        detail:
          'First harness run: 0 percent usable, because the app’s own safety validator silently rejected every valid explanation over an undocumented phrasing rule. Guaranteeing the disclaimer by construction moved it to 100 percent.',
      },
      {
        label: 'Faithfulness judge score',
        detail:
          'A second-model judge grades each claim in an explanation against the source trial text. It first scored 67 percent, then 81 percent after fixing a bug where the judge was not given the same source fields the generator saw.',
      },
      {
        label: 'Judge-human agreement',
        detail:
          'Blind hand-labels on a small sample (n=6) agreed with the judge only about half the time. That is why the 81 percent is explicitly not trusted.',
      },
      {
        label: 'The unsafe pattern',
        detail:
          'Calibration showed the judge is systematically too lenient when the model addresses the reader directly, like "You have been diagnosed with X," when the source says nothing about the reader.',
      },
      {
        label: 'No product metrics',
        detail:
          'Newly deployed: no revenue, no adoption or performance numbers, and none are claimed.',
      },
    ],
    analyticsPlan: {
      events: [
        'trial_searched',
        'trial_detail_opened',
        'explanation_generated',
        'validator_fallback_used',
        'trial_saved_to_sheet',
        'discussion_sheet_printed',
        'eval_run_completed',
        'claim_graded',
        'human_label_recorded',
      ],
      funnel: [
        'Enter basic context',
        'Search trials',
        'Open a trial',
        'Read the plain-English explanation',
        'Save to discussion sheet',
        'Print the sheet for an appointment',
      ],
      cohorts: [
        'Cancer type searched',
        'Trial complexity: simple observational vs Phase 1 with pages of eligibility criteria',
        'Explanation source: model output vs deterministic fallback',
      ],
      observabilityLabel: 'Evaluation and evidence',
      observability:
        'The trust surface is the eval bench, not production telemetry: a frozen test set of about a dozen real trials, usable-output measurement, per-claim faithfulness grades from a different model family than the generator, and human calibration labels. The app itself keeps context in the browser only, so there is no server-side data to protect and no PHI anywhere in the system.',
      dashboards: [
        'Usable output rate per harness run',
        'Faithfulness grade distribution per trial',
        'Judge-human agreement across calibration rounds',
        'Deterministic fallback usage rate',
      ],
    },
    shippedIntro:
      'OncoPath is live at onco-path.vercel.app. Most of the milestones that matter came from the evaluation work rather than the UI.',
    shippedHighlights: [
      {
        label: 'Core app',
        detail:
          'Built the core app: ClinicalTrials.gov v2 search, plain-English explanation boxes, a printable doctor discussion sheet, and browser-local saved searches with no PHI collected.',
        url: 'https://github.com/codyjohnsontx/ocnoPath',
      },
      {
        label: 'Eval harness',
        detail:
          'Snapshotted about a dozen real trials across cancer types and complexity as a reproducible test set, then measured how often the generator produced usable output versus falling back to the safe template.',
      },
      {
        label: 'Validator fix',
        detail:
          'First run was 0 percent usable because the safety validator required an exact disclaimer phrasing the model was never told to use. The disclaimer is now guaranteed by construction, and usable output moved to 100 percent.',
      },
      {
        label: 'Warnings field removed',
        detail:
          'Reading real outputs showed the model freelancing unsourced clinical risk claims in a warnings field. The field was removed instead of prompt-patched.',
      },
      {
        label: 'Faithfulness judge',
        detail:
          'A second model from a different family grades each claim in an explanation against the source trial text: supported, partially supported, unsupported, or overstated. A different family avoids self-grading bias.',
      },
      {
        label: 'Judge bug fix',
        detail:
          'The judge was wrongly penalizing claims like "currently recruiting" because it was not given the same source fields the generator saw. Fixing that moved the score from 67 to 81 percent.',
      },
      {
        label: 'Human calibration',
        detail:
          'Blind hand-labels agreed with the judge only about half the time and revealed systematic leniency on explanations that address the reader directly. The 81 percent is reported, not trusted.',
      },
    ],
    decisionStory: {
      heading: 'The judge said 81 percent and I did not believe it',
      problem:
        'A judge whose own accuracy has not been checked is just another unverified model. The score had already moved from 67 to 81 percent because of a bug in the judge itself, which made trusting the headline number harder to justify.',
      decision:
        'Instead of writing 81 percent faithful on a slide, I hand-labeled a sample of claims blind and compared my labels against the judge’s.',
      outcome:
        'Agreement was only about 50 percent, and the misses clustered on one unsafe pattern: the model telling the reader "you have been diagnosed with X" when the source says nothing about the reader. The faithfulness number is not trusted yet, and the next work targets that exact pattern in both the judge and the generator.',
    },
    learnings: [
      'A safety-critical line should never depend on the model remembering to write it. Guarantee it by construction.',
      'If the model keeps inventing unsourced claims in a field, remove the field instead of prompt-engineering around it.',
      'An eval can be wrong in both directions. My validator failed 100 percent of good output, and my judge passed unsafe output.',
      'Overstated claims are more dangerous than obvious hallucinations because they sound responsible.',
      'A green number you have not calibrated is not evidence. The judge said 81 percent; my own labels said do not believe it yet.',
    ],
    nextIterations: [
      'Tighten the generator so it never addresses the reader as if it knows their diagnosis.',
      'Tighten the judge on that same pattern and expand human calibration beyond the first small sample.',
      'Re-run calibration before quoting any faithfulness number.',
      'Add product screenshots, and consider deployment only after the eval earns more trust.',
    ],
  },
];

export function getProductAnalysisBySlug(slug) {
  return productAnalyses.find((analysis) => analysis.slug === slug);
}
