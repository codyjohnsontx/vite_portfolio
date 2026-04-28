export const profile = {
  name: 'Cody Johnson',
  targetRole: 'Product Manager',
  location: 'Austin, Texas',
  headline:
    'Building product systems with engineering depth, operational range, and a bias toward shipping useful things.',
  heroSupport:
    'I am building Track Tuner, RideSense, and Diaz on Demand, and prototyping Overlap plus a Strava component lifecycle concept, while drawing on prior product ownership, automation, and operations work across client delivery, nonprofits, and commerce.',
  summary:
    'I do my best work when a team needs to turn vague requests into clear requirements, make practical release decisions, and keep execution moving until the result holds up in the real world.',
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
      stat: 'Overlap',
      title: 'Real-time race awareness',
      body: 'Prototyped an always-on-top radar in .NET/WPF with iRacing telemetry integration for quick-glance spatial awareness during close battles.',
    },
    {
      stat: 'Strava concept',
      title: 'Component lifecycle tracking',
      body: 'Built a wear-tracking concept that ties ride behavior to component health, replacement alerts, and retailer price comparisons.',
    },
  ],
  toolkit: [
    {
      title: 'Product work',
      items: ['Backlog ownership', 'Requirements translation', 'Acceptance criteria', 'Stakeholder alignment'],
    },
    {
      title: 'Execution',
      items: ['Sprint ceremonies', 'Dependency clearing', 'Scope tradeoffs', 'Release coordination'],
    },
    {
      title: 'Analytics and systems',
      items: ['Jira', 'Linear', 'Google Analytics', 'GTM', 'MCP monitoring', 'SQL'],
    },
    {
      title: 'Technical fluency',
      items: ['React', 'TypeScript', 'Node.js', '.NET/WPF', 'SQL', 'RAG prototyping'],
    },
  ],
};
