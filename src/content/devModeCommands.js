import { caseStudies } from './caseStudies';
import { products, flagshipProducts, getProductBySlug } from './projects';
import { profile } from './profile';
import { getProductResearchBySlug } from './productResearch';
import { getProductAnalysisBySlug } from './productAnalyses';
import { resumeContent } from './resumeContent';
import { resumeMeta } from './resumeMeta';

const PRODUCT_SLUGS = ['track-tuner', 'oncopath', 'ridesense', 'wattsmith', 'windcast', 'ctx-chat', 'diaz-on-demand'];
// Command token overrides for products whose current brand name differs from
// their URL slug, so the console reads correctly without changing the route.
const COMMAND_TOKENS = { 'ctx-chat': 'ctx-connect' };
const tokenForSlug = (slug) => COMMAND_TOKENS[slug] || slug;
const slugForToken = (token) =>
  Object.keys(COMMAND_TOKENS).find((slug) => COMMAND_TOKENS[slug] === token) || token;
const commandNames = [
  'help',
  'whoami',
  'products',
  ...PRODUCT_SLUGS.map((slug) => `product ${tokenForSlug(slug)}`),
  'case-studies',
  'experience',
  'stack',
  'contact',
  'clear',
  'exit',
];

function item(title, body, meta) {
  return { title, body, meta };
}

function productItem(product) {
  return item(product.name, product.oneLiner, `run: product ${product.slug}`);
}

function whoamiProductItem(product) {
  if (product.slug === 'ctx-chat') {
    return item(
      product.name,
      `${product.oneLiner} Current MVP proof: secure staff login, role-based access, shared inbox, customer profiles, follow-up tasks, Command Center metrics, Twilio SMS/MMS routing, webhook verification, opt-in/opt-out handling, delivery failure alerts, and production deployment structure.`,
      'operational CRM / dealership command center',
    );
  }

  return item(product.name, product.oneLiner, product.role);
}

function resumeRoleItem(role) {
  return item(`${role.role} / ${role.company}`, role.bullets.join(' '), role.dates);
}

function resumeProjectItem(projectSummary) {
  const separatorIndex = projectSummary.indexOf(':');
  if (separatorIndex === -1) return item(projectSummary, null);

  return item(
    projectSummary.slice(0, separatorIndex),
    projectSummary.slice(separatorIndex + 1).trim(),
  );
}

function resumeSkillItem(group) {
  return item(group.label, group.items.join(' / '));
}

function productOutput(slug) {
  const product = getProductBySlug(slug);
  const analysis = getProductAnalysisBySlug(slug);
  const research = getProductResearchBySlug(slug);

  if (!product || !PRODUCT_SLUGS.includes(slug)) {
    return unknownCommand(`product ${slug}`);
  }

  return {
    title: product.name,
    intro: product.oneLiner,
    sections: [
      {
        label: 'Proof',
        items: [
          item('Audience', product.audience),
          item('Problem', product.problem),
          item('Signal', product.evidenceSignal),
          item('Next', product.nextStep),
        ],
      },
      {
        label: 'MVP scope',
        items: product.mvpScope.slice(0, 5).map((scope) => item(scope, null)),
      },
      {
        label: 'Stack',
        items: product.stack.map((tech) => item(tech, null)),
      },
    ],
    links: [
      { label: 'Open product page', href: `/products/${product.slug}` },
      ...(analysis
        ? [{ label: 'Read PM analysis', href: `/products/${product.slug}/analysis` }]
        : []),
      ...(research
        ? [{ label: 'View persona research', href: `/products/${product.slug}/research` }]
        : []),
    ],
  };
}

function unknownCommand(rawCommand) {
  return {
    title: 'Command not found',
    intro: `"${rawCommand}" is not in this console yet. Try "help", "products", "contact", or "exit".`,
    sections: [],
    links: [],
  };
}

export function getDevModeSuggestions() {
  return ['help', 'products', 'product track-tuner', 'experience', 'contact'];
}

export function getDevModeCommands() {
  return commandNames;
}

export function runDevModeCommand(rawCommand) {
  const command = rawCommand.trim().replace(/\s+/g, ' ').toLowerCase();

  if (!command) {
    return {
      title: 'Awaiting input',
      intro: 'Type "help" for the guided path.',
      sections: [],
      links: [],
    };
  }

  if (command.startsWith('product ')) {
    return productOutput(slugForToken(command.replace('product ', '')));
  }

  switch (command) {
    case 'help':
      return {
        title: 'Available commands',
        intro:
          'Suggested path: whoami -> products -> product track-tuner -> experience -> contact.',
        sections: [
          {
            label: 'Commands',
            items: commandNames.map((name) => item(name, null)),
          },
        ],
        links: [],
      };
    case 'whoami':
      return {
        title: profile.name,
        intro:
          'Product manager with a technical background who turns ambiguous asks into scoped, shippable work. I translate stakeholder needs, user problems, and engineering constraints into requirements, user stories, acceptance criteria, prioritized backlogs, validation paths, and release-ready workflows.',
        sections: [
          {
            label: 'Summary',
            items: [
              item(
                'How I work',
                'I clarify the real need, break it into deliverable pieces, define acceptance criteria, surface risks early, and keep product, engineering, QA, operations, and stakeholder conversations aligned.',
              ),
            ],
          },
          {
            label: 'Product proof',
            items: PRODUCT_SLUGS
              .map((slug) => getProductBySlug(slug))
              .filter(Boolean)
              .map(whoamiProductItem),
          },
        ],
        links: [{ label: 'View active builds', href: '/products' }],
      };
    case 'products':
      return {
        title: 'Active builds',
        intro: 'Current product work, optimized for proof over polish theater.',
        sections: [
          {
            label: 'Flagship products',
            items: flagshipProducts
              .filter((product) => PRODUCT_SLUGS.includes(product.slug))
              .map(productItem),
          },
        ],
        links: [{ label: 'Browse all products', href: '/products' }],
      };
    case 'case-studies':
      return {
        title: 'Case studies',
        intro: 'Selected delivery stories with outcomes, constraints, and ownership.',
        sections: [
          {
            label: 'Available',
            items: caseStudies.map((study) =>
              item(study.title, study.featuredOutcome, `${study.company} / ${study.role}`),
            ),
          },
        ],
        links: [
          { label: 'Open case studies', href: '/case-studies' },
          ...caseStudies.map((study) => ({ label: study.company, href: `/case-studies/${study.slug}` })),
        ],
      };
    case 'experience':
      return {
        title: 'Resume',
        intro: resumeContent.headline,
        sections: [
          {
            label: 'Summary',
            items: [item('', resumeContent.summary.join(' '))],
          },
          {
            label: 'Professional experience',
            items: resumeContent.experience.map(resumeRoleItem),
          },
          {
            label: 'Projects',
            items: resumeContent.activeBuilds.map(resumeProjectItem),
          },
          {
            label: 'Technical skills',
            items: resumeContent.strengths.map(resumeSkillItem),
          },
          {
            label: 'Education and certifications',
            items: resumeContent.credentials.map((credential) => item(credential, null)),
          },
        ],
        links: [],
      };
    case 'stack':
      return {
        title: 'Stack',
        intro: 'Product judgment backed by enough technical range to scope, inspect, and ship.',
        sections: [
          {
            label: 'Toolkit',
            items: profile.toolkit.map((group) => item(group.title, group.items.join(' / '))),
          },
          {
            label: 'Credentials',
            items: resumeContent.credentials.map((credential) => item(credential, null)),
          },
        ],
        links: [],
      };
    case 'contact':
      return {
        title: 'Contact',
        intro: 'Best next step: send a focused note about the role, team, and product surface.',
        sections: [
          {
            label: 'Links',
            items: [
              item('Email', 'codyjohnsontx@gmail.com'),
              item('LinkedIn', 'Product and delivery background'),
              item('GitHub', 'Public product-building activity'),
              item('Resume', 'PDF for hiring loops and referrals'),
            ],
          },
        ],
        links: [
          ...profile.contactLinks,
          {
            label: 'Resume PDF',
            href: resumeMeta.downloadPath,
            external: true,
          },
        ],
      };
    default:
      return unknownCommand(command);
  }
}

export function getDevModeProductSlugs() {
  return PRODUCT_SLUGS.filter((slug) => products.some((product) => product.slug === slug));
}
