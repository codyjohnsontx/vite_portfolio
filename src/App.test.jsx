import { readFileSync } from 'node:fs';
import { fireEvent, render, screen } from '@testing-library/react';
import { describe, expect, it } from 'vitest';
import { MemoryRouter } from 'react-router-dom';
import App from './App';
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
    expect(screen.getByRole('heading', { name: 'RideSense' })).toBeTruthy();
    expect(screen.getByRole('heading', { name: 'CTX Chat' })).toBeTruthy();
    expect(screen.getByRole('heading', { name: 'Diaz on Demand' })).toBeTruthy();
    expect(screen.getByText('Latest update')).toBeTruthy();
    expect(screen.getByRole('heading', { name: 'Persona research systems' })).toBeTruthy();
    expect(screen.getByRole('link', { name: /Track Tuner research/i }).getAttribute('href')).toBe(
      '/products/track-tuner/research',
    );
    expect(screen.getByRole('link', { name: /RideSense research/i }).getAttribute('href')).toBe(
      '/products/ridesense/research',
    );
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

    expect(screen.getByRole('button', { name: /^all$/i })).toBeTruthy();
    expect(screen.getByRole('button', { name: /apps/i })).toBeTruthy();
    expect(screen.getByRole('button', { name: /product features/i })).toBeTruthy();
    expect(screen.getByRole('heading', { name: /Track Tuner/ })).toBeTruthy();
  });

  it('keeps Overlap archived outside the visible product exports', () => {
    expect(allProducts.find((product) => product.slug === 'overlap-racing-radar')).toBeTruthy();
    expect(products.some((product) => product.slug === 'overlap-racing-radar')).toBe(false);
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

    caseStudies.forEach((study) => {
      expect(screen.getByRole('heading', { name: study.title })).toBeTruthy();
    });
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
    expect(screen.getByText(/operational CRM \/ dealership command center/i)).toBeTruthy();
    expect(screen.getByText(/Twilio SMS\/MMS routing/i)).toBeTruthy();

    fireEvent.change(input, { target: { value: 'products' } });
    fireEvent.submit(input.closest('form'));
    expect(screen.getByText('Active builds')).toBeTruthy();
    expect(screen.getByText(/run: product track-tuner/i)).toBeTruthy();

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

  it('renders the Track Tuner PM analysis page', () => {
    renderApp('/products/track-tuner/analysis');

    expect(screen.getByRole('heading', { name: /Track Tuner PM analysis/i })).toBeTruthy();
    expect(screen.getByRole('heading', { name: /The problem worth solving/i })).toBeTruthy();
    expect(screen.getByText(/Win the trackside loop first/i)).toBeTruthy();
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

  it('renders the CTX Chat PM analysis page', () => {
    renderApp('/products/ctx-chat/analysis');

    expect(screen.getByRole('heading', { name: /CTX Chat PM analysis/i })).toBeTruthy();
    expect(screen.getByRole('heading', { name: /The problem worth solving/i })).toBeTruthy();
    expect(screen.getByText(/A dealership-specific communication tool/i)).toBeTruthy();
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

  it('sends unknown product and case study slugs to the not-found experience', () => {
    const firstRender = renderApp('/products/not-a-real-product');
    expect(screen.getByRole('heading', { name: /this page does not exist/i })).toBeTruthy();

    firstRender.unmount();
    renderApp('/case-studies/not-a-real-study');
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
});
