import { readFileSync } from 'node:fs';
import { render, screen } from '@testing-library/react';
import { describe, expect, it } from 'vitest';
import { MemoryRouter } from 'react-router-dom';
import App from './App';
import { caseStudies } from './content/caseStudies';
import { products } from './content/projects';

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
    expect(screen.getByRole('heading', { name: /Track Tuner/ })).toBeTruthy();
    expect(screen.getByRole('heading', { name: 'RideSense' })).toBeTruthy();
    expect(screen.getByRole('heading', { name: 'Diaz on Demand' })).toBeTruthy();
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

  it('renders the cases index page', () => {
    renderApp('/case-studies');

    caseStudies.forEach((study) => {
      expect(screen.getByRole('heading', { name: study.title })).toBeTruthy();
    });
  });

  products.forEach((product) => {
    it(`renders the product detail page for ${product.slug}`, () => {
      renderApp(`/products/${product.slug}`);

      expect(screen.getByRole('heading', { name: 'How it works end-to-end' })).toBeTruthy();
      expect(screen.getByText(product.oneLiner)).toBeTruthy();
    });
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
