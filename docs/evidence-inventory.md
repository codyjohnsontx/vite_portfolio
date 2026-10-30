# Evidence Inventory

## Purpose

This file consolidates the strongest product-relevant evidence currently reflected in the portfolio. It is meant to serve as a working source of truth when updating the public site, adjusting the resume, or preparing for interviews.

The Texas Malibu role, the CTX Motoworks eBay liquidation work, and the HSNBA GIS, 19,000-record and 65 / 95 percent claims were cut from the site and the resume, so they are deliberately absent below. AGENTS.md ("The resume story is spread across the site") records why and what pins them out; do not restore them here as evidence to draw on.

## Ranked case study shortlist

1. Lambda Curry
   - Best past product-ownership story because it includes backlog ownership, PRDs, launch metrics, cross-functional execution, and a measurable client outcome.
   - Strongest narrative for launch discipline and stakeholder alignment in PM conversations.
   - The strongest proof points are clearer scope definition, launch planning, and post-launch iteration tied to a 12 percent revenue lift.

2. CTX Motoworks
   - Strong proof that product thinking extends beyond software tickets into service operations, revenue systems, and e-commerce strategy.
   - Quantitative signals are strong: $90K monthly service revenue improvement and satisfaction gains.

3. HSNBA
   - Repository-backed story: two Selenium jobs that correct records inside the shelter's existing ShelterManager platform, with logging, per-record error handling, and idempotent state checks. No volume or percentage outcome is claimed.
   - Strong proof of shipping inside a system the organization already had, with no API and no budget for a new one.

## Experience evidence by PM signal

### Discovery and problem framing

- Lambda Curry: identified vague task definition and undefined launch success as delivery risks, not just project-management inconveniences.
- CTX Motoworks: identified workflow bottlenecks in service and inventory as a prioritization problem.

### Prioritization

- Lambda Curry: prioritized features based on business impact, delivery risk, and stakeholder expectations.
- CTX Motoworks: used throughput modeling to set weekly priorities.
- HSNBA: focused on automation work that would reduce operational friction before pursuing broader system changes.

### Stakeholder alignment

- Lambda Curry: translated requests into requirements, user stories, and acceptance criteria across clients and internal teams.
- CTX Motoworks: aligned service, inventory, and e-commerce decisions around shared revenue and customer outcomes.

### Execution

- Lambda Curry: owned ceremonies, blocker removal, dependency coordination, and delivery visibility.
- CTX Motoworks: redesigned service and inventory workflow using operating data and queue management.
- HSNBA: Python and Selenium automation with logging, error handling, and reruns that leave already-correct records alone.

### Measurement and outcomes

- Lambda Curry: 12 percent first-week sales increase tied to a client deployment.
- CTX Motoworks: $90K service revenue increase in one month.

### Customer empathy and business context

- Lambda Curry: stakeholder expectation management and iterative post-launch improvement.
- CTX Motoworks: direct ownership of service, inventory, and e-commerce operating decisions.
- HSNBA: mission-driven operational constraints and reporting needs.

## Digital Product Owner Fit

- Ambiguous asks to actionable work: Lambda Curry translated stakeholder requests into requirements, user stories, acceptance criteria, and release validation.
- Backlog and sequencing: Lambda Curry sprint priorities; Wattsmith trust-before-AI roadmap; Trackday Tuner compare workflow sequencing.
- Cross-functional execution: Lambda Curry with client stakeholders, engineering, QA/design; Attend across sales, service, parts, and leadership; HSNBA with shelter staff.
- Production/platform trust: RideSense OAuth hardening and fallback behavior; Trackday Tuner privacy-safe AI observability; Wattsmith reusable palette, drag/drop composition, accessibility fixes, export readiness, and Wattsmith automated export verification; Attend failed-message visibility.
- Metrics and monitoring: Lambda Curry conversion/retention signals; Attend unread/overdue/failed-message metrics.
- Compliance-aware habits: Attend STOP/START handling; privacy-safe AI observability; explicit validation before export; file-format verification before app-acceptance claims.

## Active builds to keep product-first

- Trackday Tuner: audience, problem, and feature set are now strong enough for homepage-level detail, but it is still too early for a full polished case study.
- Diaz on Demand: working MVP slices across web, API, mobile, billing, and admin are worth showing publicly, and the web app is live at its library landing, but no customer has paid yet. The recent work fixed billing paths where money moved and access did not follow, so present it as correctness before launch, not as a proven product, and keep other production hardening details selective.
- draftSpace: the tilt from a flat whiteboard to separated architecture tiers is the clearest single idea to lead with, but it is a working prototype with no users, so keep it at card level rather than writing it up as a case study.

## Weak spots to handle carefully

- Lambda Curry client specifics should remain selective to protect confidentiality.
- HSNBA outcomes are operationally meaningful, but the public narrative should avoid claiming unverified downstream business impact.

## Interview emphasis notes

- Lead with business and user problems, not tool stacks.
- Use technical depth as a trust signal that helps with execution, tradeoffs, and communication.
- Keep returning to the same PM throughline:
  define the problem, reduce friction, align the team, and ship the right next improvement.
