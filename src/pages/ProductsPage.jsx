import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Eyebrow } from '../components/Editorial';
import ProductList from '../components/ProductList';
import { products } from '../content/projects';

const FILTERS = [
  { id: 'all', label: 'All' },
  { id: 'flagship', label: 'Apps' },
  { id: 'concept', label: 'Product features' },
];

export default function ProductsPage() {
  const [filter, setFilter] = useState('all');
  const list = filter === 'all' ? products : products.filter((p) => p.tier === filter);

  return (
    <div className="fade-in">
      <section className="page-hero">
        <div className="container">
          <div className="crumbs">
            <Link to="/">Index</Link>
            <span>/</span>
            <span>Products</span>
          </div>
          <h1
            className="display"
            style={{ margin: 0, fontSize: 'clamp(48px, 7vw, 96px)' }}
          >
            Products & <span className="italic">prototypes</span>.
          </h1>
        </div>
      </section>

      <section className="section">
        <div className="container">
          <div
            style={{
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'baseline',
              marginBottom: 32,
              flexWrap: 'wrap',
              gap: 16,
            }}
          >
            <Eyebrow>
              {list.length} of {products.length} products
            </Eyebrow>
            <div className="pill-group" role="group" aria-label="Filter products">
              {FILTERS.map((b) => (
                <button
                  key={b.id}
                  type="button"
                  aria-pressed={filter === b.id}
                  className={filter === b.id ? 'active' : ''}
                  onClick={() => setFilter(b.id)}
                >
                  {b.label}
                </button>
              ))}
            </div>
          </div>
          <ProductList products={list} />
        </div>
      </section>
    </div>
  );
}
