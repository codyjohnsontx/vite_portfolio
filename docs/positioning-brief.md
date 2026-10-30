# Positioning Brief

## Core positioning

Cody Johnson is a full stack software engineer working in C#/.NET, TypeScript, React, and SQL. That is the resume's headline, "Full Stack Software Engineer | C#/.NET | TypeScript | React | SQL", chosen by the owner in October 2026 over the earlier technical product owner framing; AGENTS.md records the decision and the files that carry it on the site.

He builds business applications, third-party integrations, and operational systems that hold up under failure: gathering the requirements, designing the solution, implementing the APIs, and supporting the application through testing and deployment. Product ownership and business operations experience sits behind the engineering, along with practical AI integration and workflow automation. It is a supporting strength that explains why the requirements are sound, not the title.

Where the same work can be framed as a business outcome or as investigation, validation, and system behavior, the second framing wins.

## Audience

- Recruiters screening for full stack, C#/.NET, TypeScript, and React engineering roles.
- Hiring managers looking for an engineer who can own a feature from a vague ask through deployment and support.
- Interviewers probing how he handles failure modes, integrations, data integrity, and testing.

## Narrative spine

1. Lead with the engineering: requirements to data model to API to tests to deployment, owned end to end.
2. Use Oasis Race Control as the strongest engineering proof: sole engineer, a C#/.NET 8 Windows agent reading simulator telemetry from shared memory, a Next.js app, PostgreSQL, and live leaderboards, deployed at a two-day event for Cavender Cadillac of San Antonio where more than 100 guests drove.
3. Use the integration work as proof of correctness under real traffic: Stripe and Twilio webhooks behind signature verification and duplicate-event prevention on Diaz on Demand and Attend.
4. Use Trackday Tuner and Dragonglass AI as proof of practical AI engineering with guardrails: a RAG pipeline with input validation, output guardrails, and a 33-case evaluation suite in CI; streaming provider integrations with approval-based editing.
5. Use Lambda Curry, CTX Motoworks, and HSNBA as the experience behind the engineering: requirements, acceptance criteria, defect investigation, regression testing, and release validation done alongside developers and QA, which is why the requirements in the engineering work hold up.

## Engineering signals and where they are proven

- C#/.NET: the Oasis Race Control rig agent, verified with 373 xUnit tests.
- TypeScript, React, Next.js: Oasis Race Control (1,082 TypeScript tests), Attend, Trackday Tuner, Diaz on Demand, draftSpace.
- SQL and data integrity: PostgreSQL across the active builds; Oasis local SQLite storage, automatic retries, and idempotent event processing; the Trackday Tuner atomic save case study; HSNBA record correction with data validation and logging.
- Third-party integrations: Stripe, Twilio, Mux, Clerk, OpenAI, and the Dragonglass AI provider integrations.
- Reliability and failure handling: disconnects, restarts, interrupted delivery, and duplicate events defined rather than assumed; the Oasis monitoring system with about 20 alert rules and GitHub issue integration.
- Testing and delivery: xUnit, Vitest, Playwright, the deploy gate in the Diaz deploy gate case study, and the Trackday Tuner evaluation suite.
- Architecture decisions: the Oasis multi-tenancy case study.
- Requirements and collaboration (supporting): Lambda Curry user stories, acceptance criteria, and release validation; working directly with the Diaz Martial Arts owner and CTX Motoworks dealership staff.

## Messaging rules

- Lead with engineering: the hero eyebrow and the preloader open with the full stack software engineer and C#/.NET positioning, and product ownership appears as the experience behind it rather than as the title.
- Prefer "reproduced the failure," "defined what happens when it breaks," and "validated it against real data" over tool-by-tool descriptions.
- Use the resume's numbers and the repositories' numbers; do not manufacture new ones. A number the resume dropped stays off the site (AGENTS.md lists them).
- Keep the site selective: real products, real repositories, and decisions written up as case studies.

## Proof themes

### Owns the whole path

A vague ask becomes requirements, a data model, endpoints, tests, and a deployment he supports afterward. The product-ownership background shows up here as sharper requirements, not as a separate role.

### Integrations that hold

Webhooks are verified and deduplicated, so a replayed event cannot double-charge or double-send.

### Reliability under failure

Active builds say what happens on a disconnect, a restart, or a duplicate event, and the tests pin that behavior.

### Verified, not asserted

Claims on the site point at tests, CI gates, pull requests, and live deployments that a reader can open.

## Tone

- Credible
- Direct
- Specific
- Evidence-first

## What to cut

- Generic "problem solver" positioning
- Product-manager framing as the headline, including PM-role signal lists
- Skills, strengths, and toolkit lists: the resume tells, the site shows. Capability areas belong inside project copy as evidence that the work happened, which is also why `/resume` stays unrouted.
- Empty portfolio filler
- Technology lists with no connection to the work
- Case studies that are really just build logs
