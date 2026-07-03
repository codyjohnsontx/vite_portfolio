import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Eyebrow } from '../components/Editorial';
import ProductList from '../components/ProductList';
import { Reveal } from '../components/ScrollReveal';
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
      <Reveal as="section" className="page-hero" duration={900}>
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
          <p className="lead" style={{ marginTop: 24, maxWidth: '62ch' }}>
            Active builds first, smaller product bets second. Each page shows the user problem,
            scoped workflow, delivery decisions, validation logic, and what should happen next.
          </p>
        </div>
      </Reveal>

      <Reveal as="section" className="section">
        <div className="container">
          <Reveal
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
          </Reveal>
          <ProductList products={list} />
        </div>
      </Reveal>
    </div>
  );
}
