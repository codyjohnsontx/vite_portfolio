export const caseStudies = [
  {
    slug: 'lambda-curry-scope-monitoring',
    company: 'Lambda Curry',
    timeframe: 'Contract product work',
    role: 'Product Owner',
    team: 'Client stakeholders, engineering, design, and operations',
    title: 'Driving multi-product delivery from scope through measurable launch outcomes',
    tagline:
      'Owned product lifecycles across e-commerce, consumer, and B2B products while using behavior data, stakeholder feedback, and release metrics to guide iteration.',
    challenge:
      'Multiple product lines were competing for attention at once. The work required deciding which features mattered most, protecting delivery scope, and making sure launches were measured by business and user outcomes instead of output alone.',
    featuredOutcome:
      'Contributed to a 12 percent first-week sales lift on a checkout redesign and friction-reduction launch, plus 10-25 percent retention improvement across a multi-product platform.',
    impactHighlights: [
      'Owned product lifecycles across e-commerce, consumer, and B2B products.',
      'Defined feature scope and acceptance criteria for a checkout redesign and friction-reduction initiative.',
      'Drove 10-25 percent retention improvement by identifying drop-off patterns and prioritizing fixes in sprint planning.',
    ],
    sections: {
      context:
        'Lambda Curry required balancing e-commerce, consumer, and B2B product priorities while keeping stakeholders aligned around business impact, user behavior, and delivery constraints.',
      problem:
        'Feature requests and stakeholder priorities often competed for the same engineering capacity. Without clear scope, acceptance criteria, and success metrics, the team risked shipping work that was on time but not tied to conversion, retention, or user behavior.',
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
        'Owned product lifecycles across multiple product surfaces',
        'Prioritized features based on business impact, user behavior, conversion, and retention signals',
        'Owned sprint execution, dependency management, and release coordination across teams',
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
        'Defined feature scope and acceptance criteria for a checkout redesign and friction-reduction initiative.',
        'Identified drop-off patterns in behavioral data and prioritized retention fixes in sprint planning.',
        'Managed sprint execution and release coordination across teams, including dependencies for high-impact features.',
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
        'Product ownership gets stronger when scope, acceptance criteria, and success metrics are clarified before engineering starts.',
        'Competing priorities are easier to resolve when tradeoffs are grounded in business impact, user behavior, and delivery constraints.',
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
