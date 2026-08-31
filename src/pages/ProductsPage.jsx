import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Eyebrow } from '../components/Editorial';
import ProductList from '../components/ProductList';
import { Reveal } from '../components/ScrollReveal';
import { workSubjects } from '../content/engagements';

/* The work index lists every subject, not only the ones with a repository:
   the two client engagements are work too, and until they had a row here the
   only door to them was a nav word that did not say "work". `workSubjects` is
   products followed by engagements, so engagements sort to the end. */
const FILTERS = [
  { id: 'all', label: 'All' },
  { id: 'flagship', label: 'Apps' },
  { id: 'concept', label: 'Product features' },
  { id: 'engagement', label: 'Engagements' },
];

export default function ProductsPage() {
  const [filter, setFilter] = useState('all');
  const list =
    filter === 'all' ? workSubjects : workSubjects.filter((item) => item.tier === filter);

  return (
    <div className="fade-in">
      <Reveal as="section" className="page-hero" duration={900}>
        <div className="container">
          <div className="crumbs">
            <Link to="/">Index</Link>
            <span>/</span>
            <span>Work</span>
          </div>
          <h1
            className="display"
            style={{ margin: 0, fontSize: 'clamp(48px, 7vw, 96px)' }}
          >
            Products, prototypes &amp; <span className="italic">engagements</span>.
          </h1>
          <p className="lead" style={{ marginTop: 24, maxWidth: '62ch' }}>
            Active builds first, smaller product bets second, client engagements last. Each page
            shows the user problem, scoped workflow, delivery decisions, validation logic, and
            what should happen next.
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
              Showing {list.length} of {workSubjects.length}
            </Eyebrow>
            <div className="pill-group" role="group" aria-label="Filter work">
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
