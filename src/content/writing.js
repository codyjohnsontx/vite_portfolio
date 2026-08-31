import { blogPosts } from './blogPosts';
import { caseStudies } from './caseStudies';
import { engagements, getEngagementBySlug } from './engagements';
import { getProductBySlug, products } from './projects';

/* One list, two kinds. `kind` is derived from which array a record came from
   rather than hand-written on it, so it cannot drift: a record in
   caseStudies.js is a case study by definition.

   Order is by hand, not by date. Case studies carry no date - `timeframe` is
   free text like "Architecture decision" - and inventing a published date for
   the two engagements would make the site assert something it does not know.
   Sorting on the dates that do exist would put the strongest work at the
   bottom. So case studies lead, notes follow newest first, and both keep their
   own array order. This is a portfolio, not a feed. */
export const CASE_STUDY = 'case-study';
export const NOTE = 'note';

export const KIND_LABEL = {
  [CASE_STUDY]: 'Case study',
  [NOTE]: 'Note',
};

export const writing = [
  ...caseStudies.map((study) => ({
    kind: CASE_STUDY,
    slug: study.slug,
    href: `/case-studies/${study.slug}`,
    title: study.title,
    deck: study.tagline,
    meta: [study.company, study.timeframe],
    subjects: study.subjects ?? [],
  })),
  ...blogPosts.map((post) => ({
    kind: NOTE,
    slug: post.slug,
    href: `/blog/${post.slug}`,
    title: post.title,
    deck: post.deck,
    meta: [post.date, post.readingTime],
    subjects: post.subjects ?? [],
  })),
];

export function getWritingByHref(href) {
  return writing.find((piece) => piece.href === href);
}

/* A subject is whatever a piece of writing is about: a product from
   projects.js, or an engagement. The two slug namespaces do not overlap, so a
   subject slug resolves without a prefix. Archived products resolve to nothing
   on purpose - their routes are gone, so a link to one would 404. */
export function getSubject(slug) {
  const product = getProductBySlug(slug);
  if (product) {
    return {
      slug: product.slug,
      name: product.name,
      href: `/products/${product.slug}`,
      label: 'The build',
    };
  }

  const engagement = getEngagementBySlug(slug);
  if (engagement) {
    return {
      slug: engagement.slug,
      name: engagement.name,
      href: engagement.href,
      label: 'The engagement',
    };
  }

  return undefined;
}

/* Everything written about one subject. `excludeHref` keeps a page from
   listing itself, which matters for an engagement, whose own case study is
   also the page its row opens. */
export function getWritingForSubject(subjectSlug, excludeHref) {
  return writing.filter(
    (piece) => piece.subjects.includes(subjectSlug) && piece.href !== excludeHref,
  );
}

/* The reverse lookup, for the block on a case study or a note. */
export function getSubjectsForWriting(href) {
  const piece = getWritingByHref(href);
  if (!piece) return [];

  return piece.subjects
    .map(getSubject)
    .filter((subject) => Boolean(subject) && subject.href !== href);
}

export const workSubjects = [...products, ...engagements];
