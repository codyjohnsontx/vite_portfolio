import hsnbaLogo from '../assets/hsnba-logo-100x250 (1).png';
import lambdaCurryLogo from '../assets/Icon 144x144-1718828587039.webp';
import surfboard from '../assets/surfboard.png';

export const featuredProducts = [
  {
    name: 'Trackday Tuner',
    slug: 'trackday-tuner',
    audience:
      'Track day riders, HPDE and time-attack drivers, club racers, and anyone who needs trustworthy setup history at the track.',
    problem:
      'Scattered notes, memory, and ad hoc tools are too slow and unreliable when setup decisions need to happen between sessions.',
    summary:
      'A mobile-first setup notebook for logging sessions quickly, comparing changes over time, and keeping trackside decisions grounded in what actually worked before.',
    featureThemes: [
      'Garage management',
      'Session logging',
      'Session review and compare',
      'Track library',
      'Trackside tools',
    ],
    statusNote:
      'Working auth, CRUD flows, comparison, built-in tools, billing code, and tests already support a credible path toward usable beta.',
    whyItMatters:
      'Keeps riders in one workflow from setup entry to the next trackside decision.',
  },
  {
    name: 'Diaz on Demand',
    slug: 'diaz-on-demand',
    audience:
      'Diaz Martial Arts members who want structured training outside the gym, plus coaches and admins publishing premium content.',
    problem:
      'Members need one place for structured on-demand training, while the business needs entitlement control and content publishing separate from the marketing site.',
    summary:
      'A members-only training product built around programs, courses, and lessons, with progress tracking, premium access control, and admin publishing workflows.',
    featureThemes: [
      'Training library',
      'Lesson playback',
      'Progress tracking',
      'Subscription gating',
      'Admin publishing',
    ],
    statusNote:
      'Working MVP slices already exist across web, API, mobile, billing, and admin, with production hardening still in progress.',
    whyItMatters:
      'Turns martial arts instruction into a structured digital product instead of burying premium content inside a marketing site.',
  },
];

export const supportingProjects = [
  {
    title: 'Lambda Curry launch planning',
    summary:
      'Scoped higher-risk work with PRDs, acceptance criteria, launch constraints, and success metrics before engineering began.',
    relevance: 'High-signal proof of product definition and release discipline.',
    image: lambdaCurryLogo,
  },
  {
    title: 'CTX Motoworks service model',
    summary:
      'Built an operations model around capacity, queue age, and cycle time to improve revenue, customer satisfaction, and weekly prioritization.',
    relevance: 'Strong evidence that product thinking extends into operations and revenue systems.',
    image: surfboard,
  },
  {
    title: 'HSNBA data automation',
    summary:
      'Designed Python, SQL, and GIS-supported workflows that improved operational trust and made grant-supporting analysis more useful.',
    relevance: 'Useful proof of systems thinking and operations-aware product work.',
    image: hsnbaLogo,
    link: 'https://www.hsnba.org/',
  },
  {
    title: 'Texas Malibu retail operations',
    summary:
      'Used customer and market insight to improve store operations, CRM use, and the training rhythm behind stronger retail performance.',
    relevance: 'Adds business-side credibility beyond pure software work.',
    image: surfboard,
  },
];
