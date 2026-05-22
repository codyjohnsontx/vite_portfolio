import { caseStudies } from './caseStudies';
import { experience } from './experience';
import { products, flagshipProducts, getProductBySlug } from './projects';
import { profile } from './profile';
import { getProductResearchBySlug } from './productResearch';
import { resumeContent } from './resumeContent';

const productCommandSlugs = ['track-tuner', 'ridesense', 'ctx-chat', 'diaz-on-demand'];
const whoamiProductSlugs = ['track-tuner', 'ridesense', 'ctx-chat', 'diaz-on-demand'];
const commandNames = [
  'help',
  'whoami',
  'products',
  ...productCommandSlugs.map((slug) => `product ${slug}`),
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

function productOutput(slug) {
  const product = getProductBySlug(slug);
  const research = getProductResearchBySlug(slug);

  if (!product || !productCommandSlugs.includes(slug)) {
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
      ...(product.slug === 'track-tuner' || product.slug === 'ctx-chat'
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
    return productOutput(command.replace('product ', ''));
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
          'Product Manager with a technical background building data-driven and AI-enabled products across e-commerce, internal tools, and analytics platforms. I focus on turning operational complexity into simple, usable products by combining engineering execution with product decision-making. Operate across code, data, and stakeholder conversations to ship and iterate quickly in fast-moving environments.',
        sections: [
          {
            label: 'Summary',
            items: [
              item(
                'How I work',
                'I operate across code, data, and stakeholder conversations to turn messy workflows into simple product surfaces that can ship, measure, and improve quickly.',
              ),
            ],
          },
          {
            label: 'Product proof',
            items: whoamiProductSlugs
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
              .filter((product) => productCommandSlugs.includes(product.slug))
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
        title: 'Experience',
        intro: resumeContent.headline,
        sections: [
          {
            label: 'Roles',
            items: experience.map((role) =>
              item(`${role.role} / ${role.company}`, role.evidence[0], role.dates),
            ),
          },
        ],
        links: [{ label: 'Open resume PDF', href: '/resume/Cody-Johnson-Product-Manager-Resume.pdf' }],
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
          { label: 'Resume PDF', href: '/resume/Cody-Johnson-Product-Manager-Resume.pdf' },
        ],
      };
    default:
      return unknownCommand(command);
  }
}

export function getDevModeProductSlugs() {
  return productCommandSlugs.filter((slug) => products.some((product) => product.slug === slug));
}
