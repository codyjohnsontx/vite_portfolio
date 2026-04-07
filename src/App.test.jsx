import { readFileSync } from 'node:fs';
import { render, screen, within } from '@testing-library/react';
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
  it('renders homepage product CTAs for every product brief and keeps contact links ordered', () => {
    renderApp('/');

    const briefLinks = screen.getAllByRole('link', { name: /open product brief/i });
    expect(briefLinks).toHaveLength(products.length);

    products.forEach((product) => {
      expect(
        screen.getByRole('link', {
          name: product.name,
        }).getAttribute('href'),
      ).toBe(`/products/${product.slug}`);
    });

    const contactLinks = within(screen.getByLabelText(/primary contact links/i)).getAllByRole('link');
    expect(contactLinks.map((link) => link.textContent.trim())).toEqual(['Email', 'LinkedIn', 'GitHub']);
  });

  it('keeps resume actions only in the closing block and renders decorative logos accessibly', () => {
    const { container } = renderApp('/');

    expect(screen.queryByRole('link', { name: /download resume/i })).toBeNull();
    expect(screen.queryByRole('link', { name: /view resume page/i })).toBeNull();
    expect(screen.getByRole('link', { name: /download pdf/i })).toBeTruthy();
    expect(screen.getByRole('link', { name: /open resume page/i })).toBeTruthy();

    const decorativeLogos = container.querySelectorAll('img[alt=""]');
    expect(decorativeLogos.length).toBeGreaterThan(0);
  });

  products.forEach((product) => {
    it(`renders the product detail page for ${product.slug}`, () => {
      renderApp(`/products/${product.slug}`);

      expect(screen.getByRole('heading', { name: product.name })).toBeTruthy();
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
