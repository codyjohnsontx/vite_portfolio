import { readFileSync } from 'node:fs';
import { fireEvent, render, screen, waitFor, within } from '@testing-library/react';
import { describe, expect, it } from 'vitest';
import { MemoryRouter } from 'react-router-dom';
import App from './App';
import { blogPosts } from './content/blogPosts';
import { caseStudies } from './content/caseStudies';
import { allProducts, products } from './content/projects';

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
    expect(screen.getByRole('heading', { name: 'CTX Connect' })).toBeTruthy();
    expect(screen.getByRole('heading', { name: 'Diaz on Demand' })).toBeTruthy();
    expect(screen.getByText('Turning messy product asks into scoped, shippable work.')).toBeTruthy();
    expect(screen.getByText(/Product manager \/ technical builder/i)).toBeTruthy();
    expect(screen.getByText(/clear requirements/i)).toBeTruthy();
    expect(screen.getByText('Requirements clarity')).toBeTruthy();
    expect(screen.getByText('Cross-team execution')).toBeTruthy();
    expect(screen.getByText('Operational trust')).toBeTruthy();
    expect(screen.getByText('Measured outcomes')).toBeTruthy();
    expect(screen.getByText('Latest update')).toBeTruthy();
    expect(
      screen.getByRole('heading', { name: 'OncoPath faithfulness eval built and calibrated' }),
    ).toBeTruthy();
    expect(screen.getAllByText(/frozen test set/i).length).toBeGreaterThan(0);
    expect(screen.getAllByText(/0 to 100 percent/i).length).toBeGreaterThan(0);
    expect(screen.getAllByText(/faithfulness judge/i).length).toBeGreaterThan(0);
    expect(screen.getAllByText(/not trusted yet/i).length).toBeGreaterThan(0);
    expect(
      screen
        .getAllByRole('link', { name: /Read the build/i })
        .some((link) => link.getAttribute('href') === '/products/oncopath'),
    ).toBe(true);
    expect(
      screen
        .getAllByRole('link', { name: /PM analysis/i })
        .some((link) => link.getAttribute('href') === '/products/oncopath/analysis'),
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

  it('migrates the legacy dark theme preference to ink', () => {
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

      expect(document.documentElement.getAttribute('data-theme')).toBe('ink');
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

    const blogLinks = screen.getAllByRole('link', { name: 'Blog' });
    expect(blogLinks.some((link) => link.getAttribute('href') === '/blog')).toBe(true);
    expect(blogLinks.some((link) => link.className.includes('active'))).toBe(true);
  });

  it('renders Dev Mode from the dedicated route and navbar', () => {
    renderApp('/dev-mode');

    expect(screen.getByRole('heading', { name: 'Dev Mode' })).toBeTruthy();
    expect(screen.getByRole('link', { name: 'Dev Mode' })).toBeTruthy();
    expect(screen.getByLabelText(/Dev Mode command/i)).toBeTruthy();
    expect(screen.queryByRole('contentinfo')).toBeNull();
  });

  it('runs core Dev Mode commands', () => {
    renderApp('/dev-mode');
    const input = screen.getByLabelText(/Dev Mode command/i);

    fireEvent.change(input, { target: { value: 'help' } });
    fireEvent.submit(input.closest('form'));
    expect(screen.getByText('Available commands')).toBeTruthy();

    fireEvent.change(input, { target: { value: 'whoami' } });
    fireEvent.submit(input.closest('form'));
    expect(screen.getByText(/turns ambiguous asks into scoped, shippable work/i)).toBeTruthy();
    expect(screen.getByText(/user stories/i)).toBeTruthy();
    expect(screen.getAllByText(/acceptance criteria/i).length).toBeGreaterThan(0);
    expect(screen.getByText(/prioritized backlogs/i)).toBeTruthy();
    expect(screen.getByText(/release-ready workflows/i)).toBeTruthy();
    expect(screen.getByText(/operational CRM \/ dealership command center/i)).toBeTruthy();
    expect(screen.getByText(/Twilio SMS\/MMS routing/i)).toBeTruthy();

    fireEvent.change(input, { target: { value: 'products' } });
    fireEvent.submit(input.closest('form'));
    expect(screen.getByText('Active builds')).toBeTruthy();
    expect(screen.getByText(/run: product track-tuner/i)).toBeTruthy();

    fireEvent.change(input, { target: { value: 'experience' } });
    fireEvent.submit(input.closest('form'));
    expect(screen.getByRole('heading', { name: 'Resume' })).toBeTruthy();
    expect(screen.getByText('Product Owner | Product Manager | Digital Platform Operations')).toBeTruthy();
    expect(screen.getByText('Professional experience')).toBeTruthy();
    expect(screen.getByText(/directly contributing to a \$90K service revenue increase/i)).toBeTruthy();
    expect(screen.getByText('CTX Connect')).toBeTruthy();
    expect(screen.getByText('Technical skills')).toBeTruthy();
    expect(screen.getByText('Harvard CS50')).toBeTruthy();

    fireEvent.change(input, { target: { value: 'contact' } });
    fireEvent.submit(input.closest('form'));
    expect(screen.getByText('codyjohnsontx@gmail.com')).toBeTruthy();

    fireEvent.change(input, { target: { value: 'wat' } });
    fireEvent.submit(input.closest('form'));
    expect(screen.getByText('Command not found')).toBeTruthy();

    fireEvent.change(input, { target: { value: 'clear' } });
    fireEvent.submit(input.closest('form'));
    expect(screen.queryByText('Available commands')).toBeNull();
    expect(screen.queryByText('Command not found')).toBeNull();
  });

  it('renders Dev Mode product commands from product data', () => {
    renderApp('/dev-mode');
    const input = screen.getByLabelText(/Dev Mode command/i);
    const trackTuner = products.find((product) => product.slug === 'track-tuner');

    fireEvent.change(input, { target: { value: 'product track-tuner' } });
    fireEvent.submit(input.closest('form'));

    expect(screen.getByRole('heading', { name: trackTuner.name })).toBeTruthy();
    expect(screen.getByText(trackTuner.oneLiner)).toBeTruthy();
    expect(screen.getByText(trackTuner.audience)).toBeTruthy();
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
    expect(screen.getByText(/Product Manager \/ Developer/)).toBeTruthy();
    expect(screen.getByText(/Independent build/)).toBeTruthy();
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
      expect(screen.getByText(/Session Comparison v1/i)).toBeTruthy();
      expect(screen.getByText(/rules-based/i)).toBeTruthy();
      expect(screen.getByText(/free previous-session comparison intact/i)).toBeTruthy();
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

  it('renders the CTX Connect PM analysis page', () => {
    renderApp('/products/ctx-chat/analysis');

    expect(screen.getByRole('heading', { name: /CTX Connect PM analysis/i })).toBeTruthy();
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
        /Screenshots show the local prototype using public ClinicalTrials\.gov records and generic demo search context/i,
      ),
    ).toBeTruthy();
    expect(screen.getByText('Explanation notes')).toBeTruthy();
    expect(screen.getByText('Eval run output')).toBeTruthy();
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

  it('exposes Track Tuner research from the PM analysis page and Dev Mode output', () => {
    const firstRender = renderApp('/products/track-tuner/analysis');
    expect(screen.getAllByRole('link', { name: /View persona research/i }).length).toBeGreaterThan(0);

    firstRender.unmount();
    renderApp('/dev-mode');
    const input = screen.getByLabelText(/Dev Mode command/i);

    fireEvent.change(input, { target: { value: 'product track-tuner' } });
    fireEvent.submit(input.closest('form'));

    expect(screen.getByRole('link', { name: /View persona research/i })).toBeTruthy();

    fireEvent.change(input, { target: { value: 'product ridesense' } });
    fireEvent.submit(input.closest('form'));

    expect(screen.getByRole('heading', { name: 'RideSense' })).toBeTruthy();
    expect(
      screen
        .getAllByRole('link', { name: /View persona research/i })
        .some((link) => link.getAttribute('href') === '/products/ridesense/research'),
    ).toBe(true);
  });

  it('resolves the CTX product through both the ctx-connect alias and the ctx-chat slug', () => {
    renderApp('/dev-mode');
    const input = screen.getByLabelText(/Dev Mode command/i);

    // Alias token: `product ctx-connect` maps back to the ctx-chat slug.
    fireEvent.change(input, { target: { value: 'product ctx-connect' } });
    fireEvent.submit(input.closest('form'));
    expect(screen.getAllByRole('heading', { name: 'CTX Connect' })).toHaveLength(1);

    // Raw slug still resolves via the fallback path.
    fireEvent.change(input, { target: { value: 'product ctx-chat' } });
    fireEvent.submit(input.closest('form'));
    expect(screen.getAllByRole('heading', { name: 'CTX Connect' })).toHaveLength(2);
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
