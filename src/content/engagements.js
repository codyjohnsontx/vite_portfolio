import { getCaseStudyBySlug } from './caseStudies';

/* Client engagements: work with no live app, no repository and no update feed,
   so they are not products and never had a row in the work index. The only door
   to them used to be a nav word that did not say "work".

   Everything a row needs is already written down in the case study, so nothing
   here restates it. A seed carries the slug writing points at, the study the
   row opens, and the card accent, which is presentation rather than content. */
const ENGAGEMENT_SEED = [
  {
    slug: 'lambda-curry',
    caseStudySlug: 'lambda-curry-scope-monitoring',
    accent: 'oklch(0.68 0.15 215)',
  },
  {
    slug: 'hsnba',
    caseStudySlug: 'hsnba-automation-and-gis',
    accent: 'oklch(0.72 0.15 150)',
  },
];

export const engagements = ENGAGEMENT_SEED.map(({ slug, caseStudySlug, accent }) => {
  const study = getCaseStudyBySlug(caseStudySlug);

  return {
    slug,
    accent,
    tier: 'engagement',
    name: study.company,
    year: study.timeframe,
    role: study.role,
    oneLiner: study.tagline,
    problem: study.challenge,
    audience: study.team,
    /* An engagement has no product page of its own: the row opens the case
       study, which is the whole record of the work. */
    href: `/case-studies/${study.slug}`,
    ctaLabel: 'Read the case study',
  };
});

export function getEngagementBySlug(slug) {
  return engagements.find((engagement) => engagement.slug === slug);
}
