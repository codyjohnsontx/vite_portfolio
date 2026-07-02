export const profile = {
  name: 'Cody Johnson',
  targetRole: 'Product Manager',
  location: 'Austin, Texas',
  headline:
    'Turning ambiguous product asks into scoped, shippable work.',
  heroSupport:
    'I work across product, engineering, operations, and stakeholder needs to clarify scope, write actionable requirements, sequence delivery, and ship workflows that are understandable, measurable, and ready for real users.',
  summary:
    'I do my best work when the request is messy at first: define the real need, break it into deliverable pieces, clarify acceptance criteria, coordinate tradeoffs, and keep the work moving until the result holds up in practice.',
  footerNote:
    'Built as a focused portfolio for active products, selected case studies, and supporting execution proof.',
  contactLinks: [
    { label: 'Email', href: 'mailto:codyjohnsontx@gmail.com', external: false },
    {
      label: 'LinkedIn',
      href: 'https://www.linkedin.com/in/cody-johnson-92460b124/',
      external: true,
    },
    { label: 'GitHub', href: 'https://github.com/codyjohnsontx', external: true },
  ],
  proofThemes: [
    {
      stat: 'Track Tuner',
      title: 'AI-assisted setup tuning',
      body: 'Designed the MVP around setup logging first, then layered in RAG-based recommendations using historical setup, condition, and feedback data.',
    },
    {
      stat: 'RideSense',
      title: 'Grounded cyclist analytics',
      body: 'Designed the MVP around canonical workout ingest, cross-provider deduplication, deterministic training analytics, and citation-bound AI answers without coaching prescriptions.',
    },
    {
      stat: 'Diaz on Demand',
      title: 'Subscription training architecture',
      body: 'Built around memberships, progression, entitlement, Stripe billing, and Mux delivery so structured training scales beyond a single gym.',
    },
    {
      stat: 'Strava concept',
      title: 'Component lifecycle tracking',
      body: 'Built a wear-tracking concept that ties ride behavior to component health, replacement alerts, and retailer price comparisons.',
    },
  ],
  toolkit: [
    {
      title: 'Product ownership',
      items: ['Backlog refinement', 'User stories', 'Acceptance criteria', 'Roadmap sequencing'],
    },
    {
      title: 'Cross-functional execution',
      items: ['Stakeholder alignment', 'Engineering handoff', 'QA clarification', 'Release coordination'],
    },
    {
      title: 'Platform trust',
      items: ['Validation logic', 'Operational metrics', 'Issue investigation', 'Readiness checks'],
    },
    {
      title: 'Technical fluency',
      items: ['React', 'TypeScript', 'Node.js', 'SQL', 'RAG prototyping'],
    },
  ],
};
