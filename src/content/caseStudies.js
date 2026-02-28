export const caseStudies = [
  {
    slug: 'lambda-curry-scope-monitoring',
    company: 'Lambda Curry',
    timeframe: 'Previous product work',
    role: 'Product Owner',
    team: 'Client stakeholders, engineering, design, and operations',
    title: 'Owning concurrent client backlogs without letting scope drift break delivery',
    tagline:
      'Managed multiple client engagements while building tighter systems for prioritization, change monitoring, and delivery confidence.',
    challenge:
      'Multiple projects were moving at once, and the real risk was not just shipping slower. It was losing alignment between what clients requested, what internal teams were building, and what had actually changed across tools and releases.',
    featuredOutcome:
      'Built an MCP system to monitor scope drift across Jira and Linear and supported a client deployment that contributed to a 12 percent first-week sales increase.',
    impactHighlights: [
      'Owned product backlogs across multiple concurrent client projects.',
      'Wrote PRDs, defined launch metrics, and translated requests into buildable tickets.',
      'Partnered across delivery teams on a release that drove a 12 percent first-week sales increase for a client.',
    ],
    sections: {
      context:
        'Lambda Curry required balancing multiple client priorities at once while still preserving clarity for internal teams. The challenge was as much operational and product-oriented as it was delivery-oriented.',
      problem:
        'Client requests often arrived vague and high pressure. Without stronger upfront definition, the team would lose time in back-and-forth clarification, absorb avoidable scope risk, and launch without a clear success yardstick.',
      usersStakeholders:
        'Primary stakeholders included clients, internal engineering teams, designers, operations partners, and the delivery leads accountable for on-time execution.',
      goal:
        'Keep concurrent projects aligned and shippable by improving backlog quality, locking scope earlier, and making post-launch decisions based on real data instead of guesswork.',
      constraints: [
        'Several client engagements moving at the same time',
        'Requirements and priorities split across multiple project systems',
        'Need to protect release confidence without slowing delivery velocity',
      ],
      ownership: [
        'Owned and prioritized multiple client backlogs',
        'Translated stakeholder requests into requirements, user stories, acceptance criteria, edge cases, and launch constraints',
        'Facilitated sprint ceremonies, dependency coordination, and blocker removal',
      ],
      decisions: [
        'Wrote PRDs for higher-risk features to get stakeholder sign-off before engineering work began.',
        'Prioritized features based on business impact, delivery risk, and stakeholder expectations rather than urgency alone.',
        'Defined launch success metrics and the tracking plan before release so post-launch iteration had a real signal.',
      ],
      tradeoffs: [
        'Accepted more upfront product-definition work in exchange for less churn during implementation.',
        'Balanced fast stakeholder response with the need to keep work clear enough for engineering teams to execute cleanly.',
      ],
      execution: [
        'Managed sprint ceremonies, mid-sprint adjustments, dependency tracking, and release communication.',
        'Turned vague requests into build-ready tickets with clear acceptance criteria and edge cases.',
        'Worked with engineering, design, and operations to deliver a production release and continue iterating after launch.',
      ],
      outcomes: [
        'Reduced implementation friction by cutting clarification loops during delivery.',
        'Helped ship a client deployment that contributed to a 12 percent first-week sales increase.',
        'Created a stronger operating loop between product definition, release execution, and post-launch iteration.',
      ],
      metrics: [
        '12 percent first-week sales increase tied to a client deployment supported through backlog ownership and iterative releases',
        'Delivery gains came through better scoping, clearer tickets, and defined launch metrics rather than a publicly shareable dashboard',
      ],
      lessons: [
        'Product ownership gets stronger when scope and success criteria are clarified before engineering starts.',
        'Owning multiple concurrent projects requires explicit tradeoff discipline, not just good task management.',
      ],
      confidentialityNote:
        'Client names, internal dashboards, and detailed release mechanics are intentionally withheld.',
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
      'Designed automation and geospatial workflows that made reporting cleaner, grant work stronger, and daily operations far less manual.',
    challenge:
      'The organization needed more reliable operational data, but manual entry and fragmented processes created drag, introduced errors, and limited the usefulness of reporting for both daily work and funding efforts.',
    featuredOutcome:
      'Reduced manual data entry by 65 percent, decreased data errors by 95 percent, and helped analyze more than 19,000 records for grant-supporting GIS work.',
    impactHighlights: [
      'Architected a Python automation suite integrated with SQL databases.',
      'Reduced manual entry by 65 percent and data errors by 95 percent.',
      'Led a GIS partnership that analyzed and classified 19,000 plus records to strengthen grant acquisition work.',
    ],
    sections: {
      context:
        'HSNBA operated in a setting where operational data quality mattered both for day-to-day execution and for the organization’s ability to make a stronger case for external funding.',
      problem:
        'Manual data workflows consumed time, introduced avoidable errors, and made reporting less reliable than the organization needed.',
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
        'Connected operational pain points to practical automation choices',
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
];

export function getCaseStudyBySlug(slug) {
  return caseStudies.find((study) => study.slug === slug);
}
