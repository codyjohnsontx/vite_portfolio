import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import { describe, expect, it } from 'vitest';
import ProductList from './ProductList';

const products = Array.from({ length: 12 }, (_, i) => ({
  slug: `p${i + 1}`,
  name: `Product ${i + 1}`,
  oneLiner: 'one liner',
  problem: 'problem',
  audience: 'audience',
  approach: 'approach',
  stack: ['react'],
  accent: '#000',
}));

describe('ProductList numbering', () => {
  it('pads to two digits without gluing a zero past nine', () => {
    const { container } = render(
      <MemoryRouter>
        <ProductList products={products} />
      </MemoryRouter>,
    );
    const nums = [...container.querySelectorAll('.num')].map((n) => n.textContent);
    expect(nums).toEqual([
      '01', '02', '03', '04', '05', '06', '07', '08', '09', '10', '11', '12',
    ]);
    expect(screen.queryByText('010')).toBeNull();
  });
});
