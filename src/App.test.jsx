import { readFileSync } from 'node:fs';
import { fireEvent, render, screen, waitFor, within } from '@testing-library/react';
import { describe, expect, it } from 'vitest';
import { MemoryRouter } from 'react-router-dom';
import App from './App';
import { blogPosts } from './content/blogPosts';
import { caseStudies } from './content/caseStudies';
import { allProducts, flagshipProducts, products } from './content/projects';

function renderApp(initialEntry = '/') {
  return render(
    <MemoryRouter initialEntries={[initialEntry]}>
      <App />
    </MemoryRouter>,
  );
}

describe('portfolio routes and metadata', () => {
  it('renders the editorial homepage with hero and active builds', () => {
    renderApp('/');

    expect(screen.getAllByRole('heading', { level: 1 }).length).toBeGreaterThan(0);
    expect(screen.getByRole('heading', { name: 'Track Tuner' })).toBeTruthy();
    expect(screen.getByRole('heading', { name: 'OncoPath' })).toBeTruthy();
    expect(screen.getByRole('heading', { name: 'RideSense' })).toBeTruthy();
    expect(screen.getByRole('heading', { name: 'Wattsmith' })).toBeTruthy();
    expect(screen.getByRole('heading', { name: 'Attend' })).toBeTruthy();
    expect(screen.getByRole('heading', { name: 'Diaz on Demand' })).toBeTruthy();
    expect(screen.getByText('Ambiguous to shipped')).toBeTruthy();
    expect(screen.getByText(/Product manager · Technical builder · Austin, TX/i)).toBeTruthy();
    expect(screen.getByText(/actionable requirements/i)).toBeTruthy();
    expect(screen.getByText('Requirements clarity')).toBeTruthy();
    expect(screen.getByText('Cross-team execution')).toBeTruthy();
    expect(screen.getByText('Operational trust')).toBeTruthy();
    expect(screen.getByText('Measured outcomes')).toBeTruthy();
    expect(screen.getByText('Latest')).toBeTruthy();
    expect(
      screen.getByRole('heading', { name: 'draftSpace: a system-design board you can tilt' }),
    ).toBeTruthy();
    expect(screen.getAllByText(/first working prototype/i).length).toBeGreaterThan(0);
    expect(screen.getAllByText(/the layers separate/i).length).toBeGreaterThan(0);
    expect(screen.getAllByText(/no measured result yet/i).length).toBeGreaterThan(0);
    expect(
      screen
        .getAllByRole('link', { name: /Read the build/i })
        .some((link) => link.getAttribute('href') === '/products/draftspace'),
    ).toBe(true);
  });

  it('falls back when localStorage is unavailable during initial render', () => {
    const descriptor = Object.getOwnPropertyDescriptor(window, 'localStorage');
    Object.defineProperty(window, 'localStorage', {
      configurable: true,
      get() {
        throw new Error('localStorage is blocked');
      },
    });

    try {
      expect(() => renderApp('/')).not.toThrow();
    } finally {
      Object.defineProperty(window, 'localStorage', descriptor);
    }
  });

  it('migrates the legacy dark theme preference to the dark art direction', () => {
    const descriptor = Object.getOwnPropertyDescriptor(window, 'localStorage');
    Object.defineProperty(window, 'localStorage', {
      configurable: true,
      value: {
        getItem: () => 'dark',
        setItem: () => {},
      },
    });

    try {
      renderApp('/');

      expect(document.documentElement.getAttribute('data-theme')).toBe('dark');
    } finally {
      Object.defineProperty(window, 'localStorage', descriptor);
    }
  });

  it('renders the products index with filter pills', () => {
    renderApp('/products');

    expect(screen.getByText(/Active builds first/i)).toBeTruthy();
    expect(screen.getByText(/scoped workflow/i)).toBeTruthy();
    expect(screen.getByText(/delivery decisions/i)).toBeTruthy();
    expect(screen.getAllByText(/validation logic/i).length).toBeGreaterThan(0);
    expect(screen.getByRole('button', { name: /^all$/i })).toBeTruthy();
    expect(screen.getByRole('button', { name: /apps/i })).toBeTruthy();
    expect(screen.getByRole('button', { name: /product features/i })).toBeTruthy();
    expect(screen.getByRole('heading', { name: /Track Tuner/ })).toBeTruthy();
  });

  it('does not collapse product cards when keyboard users press Enter on the nested project link', () => {
    renderApp('/products');
    const trackTunerCard = screen.getByRole('button', { name: /Track Tuner/i });

    fireEvent.keyDown(trackTunerCard, { key: 'Enter' });
    expect(trackTunerCard.getAttribute('aria-expanded')).toBe('true');

    const projectLink = within(trackTunerCard).getByRole('link', { name: /Open project/i });
    fireEvent.keyDown(projectLink, { key: 'Enter' });

    expect(trackTunerCard.getAttribute('aria-expanded')).toBe('true');
  });

  it('keeps archived concepts outside the visible product exports', () => {
    expect(allProducts.find((product) => product.slug === 'overlap-racing-radar')).toBeTruthy();
    expect(allProducts.find((product) => product.slug === 'strava-component-lifecycle')).toBeTruthy();
    expect(allProducts.find((product) => product.slug === 'instagram-comment-gif-vault')).toBeTruthy();
    expect(products.some((product) => product.slug === 'overlap-racing-radar')).toBe(false);
    expect(products.some((product) => product.slug === 'strava-component-lifecycle')).toBe(false);
    expect(products.some((product) => product.slug === 'instagram-comment-gif-vault')).toBe(false);
  });

  /* The overlay menu renders only the first three flagships, so inserting a card
     above Attend silently drops it out of the site owner's own menu. */
  it('keeps the overlay menu on the first three flagship products', () => {
    expect(flagshipProducts.slice(0, 3).map((p) => p.slug)).toEqual([
      'track-tuner',
      'oasis-race-control',
      'ctx-chat',
    ]);
  });

  it('does not expose Overlap on primary public product surfaces', () => {
    const firstRender = renderApp('/');
    expect(screen.queryByRole('heading', { name: 'Overlap' })).toBeNull();
    expect(screen.queryByRole('link', { name: 'Overlap' })).toBeNull();

    firstRender.unmount();
    renderApp('/products');
    expect(screen.queryByRole('heading', { name: 'Overlap' })).toBeNull();
    expect(screen.queryByRole('link', { name: /Overlap/ })).toBeNull();
  });

  it('renders the cases index page', () => {
    renderApp('/case-studies');

    expect(screen.getByText(/ambiguous needs became scoped work/i)).toBeTruthy();
    caseStudies.forEach((study) => {
      expect(screen.getByRole('heading', { name: study.title })).toBeTruthy();
    });
  });

  it('renders the blog index page with starter posts', () => {
    renderApp('/blog');

    expect(screen.getByRole('heading', { name: /Product notes/i })).toBeTruthy();
    expect(screen.getByText(/Short product notes on trust, sequencing, scope/i)).toBeTruthy();
    blogPosts.forEach((post) => {
      expect(screen.getByRole('heading', { name: post.title })).toBeTruthy();
      expect(screen.getByRole('link', { name: new RegExp(post.title, 'i') }).getAttribute('href')).toBe(
        `/blog/${post.slug}`,
      );
    });
  });

  it('exposes Blog in the site navigation', () => {
    renderApp('/blog');

    // The overlay menu is hidden from assistive tech until it is opened, so
    // the persistent path to every section is the footer index.
    const footerBlogLink = within(screen.getByRole('contentinfo')).getByRole('link', {
      name: 'Blog',
    });
    expect(footerBlogLink.getAttribute('href')).toBe('/blog');

    fireEvent.click(screen.getByRole('button', { name: /menu/i }));

    const menuBlogLink = within(screen.getByRole('navigation', { name: 'Primary' })).getByRole(
      'link',
      { name: 'Blog' },
    );
    expect(menuBlogLink.getAttribute('href')).toBe('/blog');
    expect(menuBlogLink.className).toContain('is-active');
  });

  products.forEach((product) => {
    it(`renders the product detail page for ${product.slug}`, () => {
      renderApp(`/products/${product.slug}`);

      expect(screen.getByRole('heading', { name: 'How it works end-to-end' })).toBeTruthy();
      expect(screen.getByText(product.oneLiner)).toBeTruthy();
    });
  });

  it('renders the Track Tuner Session Comparison v1 update and screenshots', () => {
    renderApp('/products/track-tuner');

    expect(screen.getAllByText(/Active build/).length).toBeGreaterThan(0);
    expect(screen.getByText(/Update 12/)).toBeTruthy();
    const comparisonUpdateLink = screen.getByRole('link', {
      name: 'Ship Session Comparison v1',
    });
    expect(comparisonUpdateLink).toBeTruthy();
    expect(comparisonUpdateLink.getAttribute('href')).toBe(
      'https://github.com/codyjohnsontx/trackday_tuner/pull/16',
    );
    expect(screen.getByText(/rules-based, avoids causal claims/i)).toBeTruthy();
    expect(screen.getByRole('heading', { name: 'Product screenshots' })).toBeTruthy();
    expect(screen.getByText(/No measured result is claimed/i)).toBeTruthy();
    expect(screen.getByText('Baseline picker')).toBeTruthy();
    expect(screen.getByText('Strength and metrics')).toBeTruthy();
    expect(screen.getByText('Context flags')).toBeTruthy();
    expect(screen.getByText('Setup deltas')).toBeTruthy();
  });

  it('renders the Track Tuner Session Compare brief when ResizeObserver is unavailable', async () => {
    const resizeObserverDescriptor = Object.getOwnPropertyDescriptor(globalThis, 'ResizeObserver');
    Object.defineProperty(globalThis, 'ResizeObserver', {
      configurable: true,
      value: undefined,
    });

    try {
      renderApp('/products/track-tuner/session-compare');

      await waitFor(() =>
        expect(screen.getByRole('heading', { name: /Session Compare/i })).toBeTruthy(),
      );
      // Scope to the page body: the overlay menu also lists the latest
      // Track Tuner update, whose title contains the same phrase.
      const main = within(document.querySelector('main'));
      expect(main.getByText(/Session Comparison v1/i)).toBeTruthy();
      expect(main.getByText(/rules-based/i)).toBeTruthy();
      expect(main.getByText(/free previous-session comparison intact/i)).toBeTruthy();
    } finally {
      if (resizeObserverDescriptor) {
        Object.defineProperty(globalThis, 'ResizeObserver', resizeObserverDescriptor);
      } else {
        delete globalThis.ResizeObserver;
      }
    }
  });

  it('renders the refreshed RideSense product proof and screenshot section', () => {
    renderApp('/products/ridesense');

    expect(
      screen.getByText(
        /Full-stack training analytics MVP that unifies TrainerRoad, Strava, and uploaded ride files/i,
      ),
    ).toBeTruthy();
    expect(screen.getByRole('heading', { name: 'Product screenshots' })).toBeTruthy();
    expect(
      screen.getByText('Public screenshots use seeded demo data, not private athlete data.'),
    ).toBeTruthy();
    expect(
      screen.getByRole('img', {
        name: 'RideSense desktop dashboard showing seeded demo training analytics.',
      }),
    ).toBeTruthy();
    expect(
      screen.getByRole('img', {
        name: 'RideSense mobile dashboard showing seeded demo training analytics.',
      }),
    ).toBeTruthy();
    expect(screen.getByText(/PR #18/)).toBeTruthy();
    expect(screen.getByRole('link', { name: 'Added README screenshots with seeded demo data' })).toBeTruthy();
    expect(screen.getByText(/PR #8/)).toBeTruthy();
    expect(screen.getByRole('link', { name: 'Hardened Strava OAuth sync and range filtering' })).toBeTruthy();
    expect(screen.getByText(/PR #7/)).toBeTruthy();
  });

  it('renders the Wattsmith automated export verification update without overclaiming', () => {
    renderApp('/products/wattsmith');

    expect(screen.getAllByText(/FTP-based structured workouts/i).length).toBeGreaterThan(0);
    expect(screen.getByText(/Jul 4, 2026 · PR #10/)).toBeTruthy();
    expect(
      screen.getByRole('link', {
        name: /Wattsmith automated export verification/i,
      }),
    ).toBeTruthy();
    expect(screen.getByText(/automated checks in the codebase/i)).toBeTruthy();
    expect(
      screen.getAllByText(/durations, power targets, ramps, repeats, and cues/i).length,
    ).toBeGreaterThan(0);
    expect(screen.getAllByText(/Golden-file checks/i).length).toBeGreaterThan(0);
    expect(screen.getByText(/84 to 119/i)).toBeTruthy();
    expect(
      screen.getByText(/third-party app acceptance remains a separate optional check/i),
    ).toBeTruthy();
    expect(screen.getAllByText(/Next\.js/i).length).toBeGreaterThan(0);
    expect(screen.getAllByText(/React/i).length).toBeGreaterThan(0);
    expect(screen.getAllByText(/TypeScript/i).length).toBeGreaterThan(0);
    expect(screen.getAllByText(/Tailwind CSS/i).length).toBeGreaterThan(0);
    expect(screen.getAllByText(/Vitest/i).length).toBeGreaterThan(0);
    expect(screen.queryByText(/measured adoption result/i)).toBeNull();
    expect(screen.queryByText(/measured retention result/i)).toBeNull();
    expect(screen.queryByText(/conversion lift/i)).toBeNull();
    expect(screen.queryByText(/measured revenue result/i)).toBeNull();
    expect(screen.getByText('Template preview')).toBeTruthy();
    expect(screen.getByText('Collapsed editor')).toBeTruthy();
    expect(screen.getByText('Export readiness')).toBeTruthy();
    expect(screen.getByText('Builder workspace')).toBeTruthy();
    expect(screen.getByText('Reusable block palette')).toBeTruthy();
    expect(screen.getByText('Workout step editor')).toBeTruthy();
    expect(screen.getAllByText(/Wattsmith is a local-first cycling training workspace/i).length).toBeGreaterThan(0);
    expect(screen.getAllByText(/self-coached riders and coach-led athletes/i).length).toBeGreaterThan(0);
    expect(screen.getAllByText(/FTP, form, fatigue, TSS, and VO2 progress/i).length).toBeGreaterThan(0);
    expect(screen.getAllByText(/analytics, AI-assisted insight, and workout creation/i).length).toBeGreaterThan(0);
    expect(screen.getAllByText(/export correctness is now verified in the codebase/i).length).toBeGreaterThan(0);
    expect(screen.getByRole('link', { name: /Read PM analysis/i })).toBeTruthy();
  });

  it('opens RideSense screenshots in a zoom dialog and restores focus on close', async () => {
    renderApp('/products/ridesense');
    const zoomButton = screen.getByRole('button', { name: 'Zoom Desktop dashboard' });

    zoomButton.focus();
    fireEvent.click(zoomButton);

    expect(
      screen.getByRole('dialog', { name: 'Desktop dashboard enlarged screenshot' }),
    ).toBeTruthy();
    expect(
      screen.getAllByRole('img', {
        name: 'RideSense desktop dashboard showing seeded demo training analytics.',
      }).length,
    ).toBeGreaterThan(1);

    const closeButton = screen.getByRole('button', { name: 'Close' });
    await waitFor(() => expect(document.activeElement).toBe(closeButton));

    fireEvent.keyDown(closeButton, { key: 'Tab' });
    expect(document.activeElement).toBe(closeButton);
    expect(document.activeElement).not.toBe(zoomButton);

    fireEvent.keyDown(closeButton, { key: 'Tab', shiftKey: true });
    expect(document.activeElement).toBe(closeButton);
    expect(document.activeElement).not.toBe(zoomButton);

    fireEvent.click(closeButton);

    expect(screen.queryByRole('dialog')).toBeNull();
    await waitFor(() => expect(document.activeElement).toBe(zoomButton));
  });

  it('renders the Track Tuner PM analysis page', () => {
    renderApp('/products/track-tuner/analysis');

    expect(screen.getByRole('heading', { name: /Track Tuner PM analysis/i })).toBeTruthy();
    expect(screen.getByRole('heading', { name: /The problem worth solving/i })).toBeTruthy();
    expect(screen.getByText(/Win the trackside loop first/i)).toBeTruthy();
    expect(screen.getAllByText(/Session Comparison v1/i).length).toBeGreaterThan(0);
    expect(screen.getByText(/No measured result yet/i)).toBeTruthy();
    expect(screen.getByText(/PR #16/i)).toBeTruthy();
    expect(screen.getAllByText(/context warnings/i).length).toBeGreaterThan(0);
    expect(
      screen.queryByRole('heading', { name: /Roadmap staged around trust before AI/i }),
    ).toBeNull();
  });

  it('renders the Track Tuner research page', () => {
    renderApp('/products/track-tuner/research');

    expect(screen.getByRole('heading', { name: /Track Tuner research system/i })).toBeTruthy();
    expect(screen.getAllByText('Progression Addict').length).toBeGreaterThan(0);
    expect(screen.getByText('First-Track Learner')).toBeTruthy();
    expect(screen.getByText('Coach Operator')).toBeTruthy();
    expect(screen.getByRole('heading', { name: /The wedge is memory before intelligence/i })).toBeTruthy();
    expect(screen.getByText(/Feature prioritization matrix across Beginner/i)).toBeTruthy();
    expect(screen.getByRole('columnheader', { name: 'Beginner' })).toBeTruthy();
    expect(screen.getByRole('rowheader', { name: 'Race Engineer AI' })).toBeTruthy();
  });

  it('renders the RideSense research page', () => {
    renderApp('/products/ridesense/research');

    expect(screen.getByRole('heading', { name: /RideSense research system/i })).toBeTruthy();
    expect(screen.getAllByText('Structured Amateur').length).toBeGreaterThan(0);
    expect(screen.getByText('Data-Aware Recreational Rider')).toBeTruthy();
    expect(screen.getByText('Event-Driven Rider')).toBeTruthy();
    expect(screen.getByRole('heading', { name: /Interpretation is the product wedge/i })).toBeTruthy();
    expect(screen.getByText(/Feature prioritization matrix across Structured/i)).toBeTruthy();
    expect(screen.getByRole('columnheader', { name: 'Structured' })).toBeTruthy();
    expect(screen.getByRole('rowheader', { name: 'Deduped canonical feed' })).toBeTruthy();
    expect(screen.queryByRole('link', { name: /Read PM analysis/i })).toBeNull();
  });

  it('renders the Attend PM analysis page', () => {
    renderApp('/products/ctx-chat/analysis');

    expect(screen.getByRole('heading', { name: /Attend PM analysis/i })).toBeTruthy();
    expect(screen.getByRole('heading', { name: /The problem worth solving/i })).toBeTruthy();
    expect(screen.getByText(/A dealership-specific communication tool/i)).toBeTruthy();
  });

  it('renders the Wattsmith PM analysis page', () => {
    renderApp('/products/wattsmith/analysis');

    expect(screen.getByRole('heading', { name: /Wattsmith PM analysis/i })).toBeTruthy();
    expect(screen.getByRole('heading', { name: /Manual builder first before AI/i })).toBeTruthy();
    expect(screen.getAllByText(/Reusable starter palette/i).length).toBeGreaterThan(0);
    expect(screen.getAllByText(/Drag\/drop composition/i).length).toBeGreaterThan(0);
    expect(screen.getAllByText(/Custom reusable blocks/i).length).toBeGreaterThan(0);
    expect(screen.getAllByText(/PR #10/i).length).toBeGreaterThan(0);
    expect(screen.getAllByText(/PR #6/i).length).toBeGreaterThan(0);
    expect(
      screen.getByRole('heading', { name: /Export confidence moved into the codebase/i }),
    ).toBeTruthy();
    expect(screen.getAllByText(/Problem/i).length).toBeGreaterThan(0);
    expect(screen.getAllByText(/Decision/i).length).toBeGreaterThan(0);
    expect(screen.getAllByText(/Outcome/i).length).toBeGreaterThan(0);
    expect(screen.getAllByText(/round-trip/i).length).toBeGreaterThan(0);
    expect(screen.getAllByText(/golden-file/i).length).toBeGreaterThan(0);
    expect(screen.getAllByText(/84 to 119/i).length).toBeGreaterThan(0);
    expect(screen.getAllByText(/template previews/i).length).toBeGreaterThan(0);
    expect(screen.getAllByText(/collapsible workout editing/i).length).toBeGreaterThan(0);
    expect(screen.getAllByText(/export readiness checklist/i).length).toBeGreaterThan(0);
    expect(
      screen.getByRole('heading', { name: /Roadmap staged around trust before AI/i }),
    ).toBeTruthy();
    expect(screen.getByRole('heading', { name: /Manual builder trust/i })).toBeTruthy();
    expect(screen.getByRole('heading', { name: /Library depth/i })).toBeTruthy();
    expect(screen.getByRole('heading', { name: /^Export confidence$/i })).toBeTruthy();
    expect(screen.getByText('Done')).toBeTruthy();
    expect(screen.getByRole('heading', { name: /Science and rationale/i })).toBeTruthy();
    expect(screen.getByRole('heading', { name: /Training metrics/i })).toBeTruthy();
    expect(screen.getByRole('heading', { name: /Athlete profile warnings/i })).toBeTruthy();
    expect(screen.getByRole('heading', { name: /AI\/RAG preparation/i })).toBeTruthy();
    expect(screen.getByRole('heading', { name: /Later AI/i })).toBeTruthy();
    expect(screen.getByText(/No measured result yet/)).toBeTruthy();
  });

  it('renders the OncoPath product page with the eval story and the repo link', () => {
    renderApp('/products/oncopath');

    expect(
      screen.getByText(/plain-English explanations of public clinical trials/i),
    ).toBeTruthy();
    expect(screen.getAllByText(/no PHI/i).length).toBeGreaterThan(0);
    const evalUpdateLink = screen.getByRole('link', {
      name: 'Built an accuracy-evaluation harness and a faithfulness judge',
    });
    expect(evalUpdateLink.getAttribute('href')).toBe('https://github.com/codyjohnsontx/ocnoPath');
    expect(screen.getAllByText(/not trusted yet/i).length).toBeGreaterThan(0);
    expect(screen.queryByText(/81 percent accurate/i)).toBeNull();
    expect(screen.getByRole('heading', { name: 'Product screenshots' })).toBeTruthy();
    expect(
      screen.getByText(
        /The app uses public ClinicalTrials\.gov records and only the basic context a person chooses to share/i,
      ),
    ).toBeTruthy();
    const liveUpdateLink = screen.getByRole('link', {
      name: 'Deployed OncoPath to production',
    });
    expect(liveUpdateLink.getAttribute('href')).toBe('https://onco-path.vercel.app');
    expect(screen.getByText('Explanation notes')).toBeTruthy();
    expect(screen.getByText('Eval run output')).toBeTruthy();
    const liveAppLink = screen.getByRole('link', {
      name: 'Open the live OncoPath app',
    });
    expect(liveAppLink.getAttribute('href')).toBe('https://onco-path.vercel.app');
    expect(
      screen.getByRole('img', {
        name: 'OncoPath trial detail page showing plain-English explanation notes generated from the official record.',
      }),
    ).toBeTruthy();
  });

  it('renders the OncoPath PM analysis page without overclaiming', () => {
    renderApp('/products/oncopath/analysis');

    expect(screen.getByRole('heading', { name: /OncoPath PM analysis/i })).toBeTruthy();
    expect(
      screen.getByRole('heading', { name: /Built to be checked, not trusted blindly/i }),
    ).toBeTruthy();
    expect(
      screen.getByRole('heading', { name: /The judge said 81 percent and I did not believe it/i }),
    ).toBeTruthy();
    expect(screen.getAllByText(/0 percent usable/i).length).toBeGreaterThan(0);
    expect(screen.getAllByText(/67/).length).toBeGreaterThan(0);
    expect(screen.getAllByText(/n=6/).length).toBeGreaterThan(0);
    expect(screen.getAllByText(/sidesteps HIPAA by design/i).length).toBeGreaterThan(0);
    expect(screen.getByText(/no revenue, no adoption or performance numbers/i)).toBeTruthy();
  });

  it('shows the PM analysis CTA only for products with analysis content', () => {
    const firstRender = renderApp('/products/track-tuner');
    expect(screen.getByRole('link', { name: /Read PM analysis/i })).toBeTruthy();

    firstRender.unmount();
    const secondRender = renderApp('/products/ctx-chat');
    expect(screen.getByRole('link', { name: /Read PM analysis/i })).toBeTruthy();

    secondRender.unmount();
    renderApp('/products/ridesense');
    expect(screen.queryByRole('link', { name: /Read PM analysis/i })).toBeNull();
  });

  it('shows the research CTA only for products with research content', () => {
    const firstRender = renderApp('/products/track-tuner');
    expect(screen.getByRole('link', { name: /View persona research/i })).toBeTruthy();

    firstRender.unmount();
    const secondRender = renderApp('/products/ridesense');
    expect(screen.getByRole('link', { name: /View persona research/i })).toBeTruthy();

    secondRender.unmount();
    renderApp('/products/ctx-chat');
    expect(screen.queryByRole('link', { name: /View persona research/i })).toBeNull();
  });

  it('exposes Track Tuner research from the PM analysis page', () => {
    renderApp('/products/track-tuner/analysis');
    expect(screen.getAllByRole('link', { name: /View persona research/i }).length).toBeGreaterThan(0);
  });

  it('sends product analysis slugs without content to the not-found experience', () => {
    renderApp('/products/ridesense/analysis');

    expect(screen.getByRole('heading', { name: /this page does not exist/i })).toBeTruthy();
  });

  it('sends product research slugs without content to the not-found experience', () => {
    renderApp('/products/diaz-on-demand/research');

    expect(screen.getByRole('heading', { name: /this page does not exist/i })).toBeTruthy();
  });

  caseStudies.forEach((study) => {
    it(`renders the case study page for ${study.slug}`, () => {
      renderApp(`/case-studies/${study.slug}`);

      expect(screen.getByRole('heading', { name: study.title })).toBeTruthy();
      expect(screen.getByText(study.tagline)).toBeTruthy();
    });
  });

  it('renders the Lambda Curry product-owner proof points', () => {
    renderApp('/case-studies/lambda-curry-scope-monitoring');

    expect(screen.getAllByText(/requirements, user stories, acceptance criteria/i).length).toBeGreaterThan(0);
    expect(screen.getAllByText(/release-ready scope/i).length).toBeGreaterThan(0);
    expect(screen.getAllByText(/backlog priorities/i).length).toBeGreaterThan(0);
    expect(screen.getAllByText(/delivery visibility/i).length).toBeGreaterThan(0);
    expect(screen.getAllByText(/success metrics/i).length).toBeGreaterThan(0);
  });

  blogPosts.forEach((post) => {
    it(`renders the blog post page for ${post.slug}`, () => {
      renderApp(`/blog/${post.slug}`);

      expect(screen.getByRole('heading', { name: post.title })).toBeTruthy();
      expect(screen.getByText(post.deck)).toBeTruthy();
      expect(screen.getByRole('heading', { name: post.sections[0].heading })).toBeTruthy();
    });
  });

  it('sends unknown product and case study slugs to the not-found experience', () => {
    const firstRender = renderApp('/products/not-a-real-product');
    expect(screen.getByRole('heading', { name: /this page does not exist/i })).toBeTruthy();

    firstRender.unmount();
    renderApp('/case-studies/not-a-real-study');
    expect(screen.getByRole('heading', { name: /this page does not exist/i })).toBeTruthy();
  });

  it('sends unknown blog slugs to the not-found experience', () => {
    renderApp('/blog/not-a-real-post');

    expect(screen.getByRole('heading', { name: /this page does not exist/i })).toBeTruthy();
  });

  it('sends the archived Overlap product route to the not-found experience', () => {
    renderApp('/products/overlap-racing-radar');

    expect(screen.getByRole('heading', { name: /this page does not exist/i })).toBeTruthy();
  });

  it('does not expose the dev mode route while it is being reworked', () => {
    renderApp('/dev-mode');

    expect(screen.getByRole('heading', { name: /this page does not exist/i })).toBeTruthy();
  });

  it('does not expose the resume page route', () => {
    renderApp('/resume');

    expect(screen.getByRole('heading', { name: /this page does not exist/i })).toBeTruthy();
  });

  it('includes the required social metadata in index.html', () => {
    const indexHtml = readFileSync('index.html', 'utf8');

    expect(indexHtml).toContain('rel="canonical"');
    expect(indexHtml).toContain('property="og:title"');
    expect(indexHtml).toContain('property="og:description"');
    expect(indexHtml).toContain('property="og:image"');
    expect(indexHtml).toContain('name="twitter:card"');
    expect(indexHtml).toContain('name="twitter:title"');
    expect(indexHtml).toContain('name="twitter:description"');
  });

  /* Both of these were broken and produced no link card at all, so they are
     pinned rather than left to regress. */
  it('gives crawlers absolute canonical and Open Graph URLs', () => {
    const indexHtml = readFileSync('index.html', 'utf8');
    const attr = (re) => indexHtml.match(re)?.[1];

    ['canonical', 'og:url', 'og:image', 'twitter:image'].forEach((key) => {
      const value = attr(
        new RegExp(`(?:rel|property|name)="${key}"[^>]*content="([^"]+)"|` +
          `content="([^"]+)"[^>]*(?:rel|property|name)="${key}"`),
      ) ?? indexHtml.match(new RegExp(`${key}"\\s+href="([^"]+)"`))?.[1];
      expect(value, `${key} must be absolute`).toMatch(/^https:\/\//);
    });
  });

  it('uses a raster Open Graph image, since no major platform renders SVG', () => {
    const indexHtml = readFileSync('index.html', 'utf8');
    const images = [...indexHtml.matchAll(/(?:og:image|twitter:image)"\s+content="([^"]+)"/g)].map(
      (m) => m[1],
    );

    expect(images.length).toBeGreaterThan(0);
    images.forEach((src) => expect(src).toMatch(/\.(jpg|jpeg|png)$/));
  });

  it('saves the portfolio roadmap document', () => {
    const roadmap = readFileSync('docs/portfolio-roadmap.md', 'utf8');
    const pmBrief = readFileSync('docs/pm-positioning-brief.md', 'utf8');
    const evidenceInventory = readFileSync('docs/evidence-inventory.md', 'utf8');
    const resumeTailoring = readFileSync('docs/resume-tailoring-guide.md', 'utf8');

    expect(roadmap).toContain('Portfolio polish pass');
    expect(roadmap).toContain('Status: complete');
    expect(roadmap).toContain('Wattsmith roadmap UI polish');
    expect(pmBrief).toContain('Schwab-aligned product-owner signals');
    expect(evidenceInventory).toContain('Digital Product Owner Fit');
    expect(evidenceInventory).toContain('Wattsmith automated export verification');
    expect(evidenceInventory).toContain('file-format verification');
    expect(resumeTailoring).toContain('release readiness');
  });
});
