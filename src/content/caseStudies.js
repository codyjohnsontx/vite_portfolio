export const caseStudies = [
  // Newest first. Add a new case study at the top of this array; both the
  // /case-studies index and the home page render it in plain array order.
  {
    slug: 'oasis-multi-tenancy',
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
  {
    slug: 'hsnba-automation-and-gis',
    company: 'Humane Society (HSNBA)',
    timeframe: 'Apr 2024 - May 2025',
    role: 'Software Engineer',
    team: 'Operations leaders, municipal GIS partners, and shelter staff',
    title: 'Reducing manual work and data risk in a mission-driven operations environment',
    tagline:
      'Improved operational reliability and data quality with automation, validation, and partner-facing analysis that made daily work and reporting easier to trust.',
    challenge:
      'The organization needed more reliable operational data and clearer partner communication, but manual entry and fragmented processes created drag, introduced errors, and limited the usefulness of reporting for both daily work and funding efforts.',
    featuredOutcome:
      'Reduced manual data entry by 65 percent, decreased data errors by 95 percent, and helped analyze more than 19,000 records for grant-supporting GIS work.',
    impactHighlights: [
      'Architected a Python automation suite integrated with SQL databases.',
      'Reduced manual entry by 65 percent and data errors by 95 percent.',
      'Led a GIS partnership that analyzed and classified 19,000 plus records to strengthen grant acquisition work.',
    ],
    sections: {
      context:
        'HSNBA operated in a setting where operational data quality, daily reliability, and partner-ready reporting all mattered to the organization’s ability to execute.',
      problem:
        'Manual data workflows consumed time, introduced avoidable errors, made reporting less reliable than the organization needed, and made partner analysis harder to communicate cleanly.',
      usersStakeholders:
        'Stakeholders included shelter operations staff, leadership, municipal GIS collaborators, and grant-related decision-makers relying on clean analysis.',
      goal:
        'Reduce manual operational overhead, improve data trust, and generate stronger analysis to support both internal execution and external funding opportunities.',
      constraints: [
        'Mission-driven environment with limited excess capacity',
        'Existing operational processes already in use by staff',
        'Need for reliable analysis without creating more manual work',
      ],
      ownership: [
        'Architected the automation suite and SQL integration approach',
        'Led the GIS partnership and technical design for record analysis',
        'Connected operational pain points to practical automation choices and clearer reporting handoffs',
      ],
      decisions: [
        'Focused first on eliminating repetitive manual work because that unlocked both accuracy and reporting quality.',
        'Used Python and SQL as the backbone so the system could be practical, maintainable, and usable by the organization.',
        'Pursued the GIS partnership because richer analysis could support a broader strategic outcome than operations alone.',
      ],
      tradeoffs: [
        'Chose targeted automation over a broader systems overhaul to keep adoption realistic.',
        'Balanced analytical ambition with the organization’s need for dependable day-to-day workflows.',
      ],
      execution: [
        'Built Python-based automation integrated with SQL databases.',
        'Refined validation and classification workflows to improve trust in the underlying data.',
        'Designed geospatial automation systems that supported analysis across 19,000 plus records.',
      ],
      outcomes: [
        'Reduced manual data entry by 65 percent.',
        'Decreased data errors by 95 percent.',
        'Delivered analysis that strengthened grant-acquisition efforts through better record classification and reporting.',
      ],
      metrics: [
        '65 percent reduction in manual data entry',
        '95 percent reduction in data errors',
        '19,000 plus records analyzed and classified through GIS-enabled workflows',
      ],
      lessons: [
        'Operational pain is often the clearest path to product value because the ROI is immediate and visible.',
        'Good systems work can create strategic leverage when it improves both execution and the story an organization can tell externally.',
      ],
      confidentialityNote:
        'Detailed internal datasets and grant documentation are intentionally summarized.',
    },
  },
  {
    slug: 'lambda-curry-scope-monitoring',
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

export function getCaseStudyBySlug(slug) {
  return caseStudies.find((study) => study.slug === slug);
}
