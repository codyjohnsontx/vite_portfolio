export const profile = {
  name: 'Cody Johnson',
  targetRole: 'Technical Product Owner',
  location: 'Austin, Texas',
  headline:
    'Technical Product Owner | Software Engineer | Digital & Operational Systems',
  heroSupport:
    'I work across technical operations, real-time systems, and data workflows: reproducing issues, comparing expected against actual behavior, defining validation criteria, and improving reliability from what a system actually does under failure. Extensive hands-on motorsports experience sits behind that, so vehicle setup, telemetry, and simulator systems are familiar ground rather than a domain I read up on.',
  summary:
    'I do my best work when the request is messy at first: define the real need, break it into deliverable pieces, clarify acceptance criteria and failure conditions, coordinate tradeoffs, and keep the work moving until the result holds up in practice against real data and real failure.',
  footerNote:
    'Built as a focused portfolio for active products, selected case studies, and supporting execution proof.',
  contactLinks: [
    { label: 'Email', href: 'mailto:codyjohnsontx@gmail.com', external: false },
    {
      label: 'LinkedIn',
      href: 'https://www.linkedin.com/in/codyjohnsontx/',
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
      title: 'Testing & troubleshooting',
      items: ['Issue reproduction', 'Defect triage', 'Root cause analysis', 'Acceptance criteria validation'],
    },
    {
      title: 'Product & engineering',
      items: ['Technical requirements', 'User stories', 'PRDs', 'Release validation'],
    },
    {
      title: 'Data & systems',
      items: ['SQL', 'Data validation', 'Operational metrics', 'Real-time systems'],
    },
    {
      title: 'AI & automation',
      items: ['LLM API integration', 'RAG', 'Agentic workflows', 'Embeddings'],
    },
    {
      title: 'Motorsports & simulation',
      items: ['iRacing SDK', 'Telemetry', 'Vehicle setup', 'Suspension setup', 'Track environments'],
    },
  ],
};
