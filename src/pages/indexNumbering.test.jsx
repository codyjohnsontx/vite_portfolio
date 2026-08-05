import { render } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import { describe, expect, it } from 'vitest';
import App from '../App';
import { getProductBySlug } from '../content/projects';
import { getProductAnalysisBySlug } from '../content/productAnalyses';
import { getProductResearchBySlug } from '../content/productResearch';

function renderRoute(route) {
  return render(
    <MemoryRouter initialEntries={[route]}>
      <App />
    </MemoryRouter>,
  );
}

function labels(nodes) {
  return [...nodes].map((n) => n.textContent);
}

function expectedLabels(count) {
  return Array.from({ length: count }, (_, i) => String(i + 1).padStart(2, '0'));
}

describe('index labels past nine', () => {
  it('numbers a 19-item MVP scope list 01..19 on the product detail page', () => {
    const { container } = renderRoute('/products/wattsmith');
    const scope = container.querySelector('#scope');
    const nums = labels(scope.querySelectorAll('span.mono.small'));

    expect(nums.length).toBe(getProductBySlug('wattsmith').mvpScope.length);
    expect(nums).toEqual(expectedLabels(19));
    expect(nums).not.toContain('010');
  });

  it('numbers the ten persona dimensions 01..10 on the research page', () => {
    const { container } = renderRoute('/products/track-tuner/research');
    const nums = labels(container.querySelectorAll('.research-dimension__index'));

    expect(nums.length).toBe(getProductResearchBySlug('track-tuner').dimensions.length);
    expect(nums).toEqual(expectedLabels(10));
    expect(nums).not.toContain('010');
  });

  it('numbers a 13-item opportunity list 01..13 on the analysis page', () => {
    const { container } = renderRoute('/products/wattsmith/analysis');
    const workflow = container.querySelector('#workflow');
    const lists = workflow.querySelectorAll('ul.analysis-list');
    const opportunity = labels(lists[lists.length - 1].querySelectorAll('span.mono.small'));

    expect(opportunity.length).toBe(getProductAnalysisBySlug('wattsmith').opportunity.length);
    expect(opportunity).toEqual(expectedLabels(13));
    expect(opportunity).not.toContain('010');
  });
});
