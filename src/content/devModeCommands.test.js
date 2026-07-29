import { describe, expect, it } from 'vitest';
import {
  getDevModeCommands,
  getDevModeProductSlugs,
  runDevModeCommand,
} from './devModeCommands';
import { getProductBySlug, products } from './projects';

/* Dev Mode is not routed while it is being reworked, so the console is
   covered here instead of by driving the page. These are the behaviours the
   removed route-level tests were pinning. */
describe('dev mode command console', () => {
  it('resolves a product through both the ctx-connect alias and the ctx-chat slug', () => {
    // The brand name and the URL slug diverge, so the console accepts the
    // token while the route keeps the slug.
    expect(runDevModeCommand('product ctx-connect').title).toBe('CTX Connect');
    expect(runDevModeCommand('product ctx-chat').title).toBe('CTX Connect');
  });

  it('advertises the aliased token rather than the raw slug', () => {
    const commands = getDevModeCommands();

    expect(commands).toContain('product ctx-connect');
    expect(commands).not.toContain('product ctx-chat');
    expect(commands).toEqual(expect.arrayContaining(['help', 'whoami', 'products', 'contact']));
  });

  it('builds product output from the product content, not duplicated copy', () => {
    const trackTuner = getProductBySlug('track-tuner');
    const output = runDevModeCommand('product track-tuner');

    expect(output.title).toBe(trackTuner.name);
    expect(output.intro).toBe(trackTuner.oneLiner);

    const proof = output.sections.find((section) => section.label === 'Proof');
    expect(proof.items.find((i) => i.title === 'Audience').body).toBe(trackTuner.audience);
    expect(proof.items.find((i) => i.title === 'Problem').body).toBe(trackTuner.problem);
  });

  it('normalises casing and extra whitespace before dispatching', () => {
    expect(runDevModeCommand('  PRODUCT   Track-Tuner  ').title).toBe('Track Tuner');
    expect(runDevModeCommand('HELP').title).toBe('Available commands');
  });

  it('offers analysis and research links only where that content exists', () => {
    const labelsFor = (slug) => runDevModeCommand(`product ${slug}`).links.map((l) => l.label);

    expect(labelsFor('track-tuner')).toEqual(
      expect.arrayContaining(['Open product page', 'Read PM analysis', 'View persona research']),
    );
    // RideSense has persona research but no PM analysis page
    expect(labelsFor('ridesense')).toContain('View persona research');
    expect(labelsFor('ridesense')).not.toContain('Read PM analysis');
  });

  it('reports unknown commands instead of throwing', () => {
    expect(runDevModeCommand('wat').title).toBe('Command not found');
    expect(runDevModeCommand('product not-a-real-product').title).toBe('Command not found');
    expect(runDevModeCommand('').title).toBe('Awaiting input');
  });

  it('only lists product slugs that are still publicly visible', () => {
    const visible = new Set(products.map((product) => product.slug));

    expect(getDevModeProductSlugs().length).toBeGreaterThan(0);
    getDevModeProductSlugs().forEach((slug) => {
      expect(visible.has(slug)).toBe(true);
    });
  });
});
