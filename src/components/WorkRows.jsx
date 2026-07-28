import { useState } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { getStatusLabel } from '../content/productHelpers';

/* Metalab-style index rows: name / description / disciplines separated by
   hairlines. Hovering a row lights it and dims the rest. */
export default function WorkRows({ products, startIndex = 1 }) {
  const [active, setActive] = useState(null);

  return (
    <div className="work" onMouseLeave={() => setActive(null)}>
      <ul className={'work__list' + (active ? ' is-dimmed' : '')}>
        {products.map((p, i) => (
          <li key={p.slug} className={'work__row' + (active === p.slug ? ' is-active' : '')}>
            <Link
              to={`/products/${p.slug}`}
              className="work__link"
              onMouseEnter={() => setActive(p.slug)}
              onFocus={() => setActive(p.slug)}
              onBlur={() => setActive(null)}
            >
              <span className="work__index mono tabular">
                {String(startIndex + i).padStart(2, '0')}
              </span>

              <span className="work__name">
                <h3 className="work__name-text h3">{p.name}</h3>
                <span className={'work__status mono' + (p.status === 'active-build' ? ' is-live' : '')}>
                  {getStatusLabel(p.status)}
                </span>
              </span>

              <span className="work__desc body">{p.oneLiner}</span>

              <span className="work__stack">
                {(p.stack || []).slice(0, 4).map((s) => (
                  <span key={s} className="mono">{s}</span>
                ))}
              </span>

              <span className="work__go" aria-hidden="true">
                <svg viewBox="0 0 16 16" width="14" height="14" fill="none">
                  <path
                    d="M3 13 13 3M6 3h7v7"
                    stroke="currentColor"
                    strokeWidth="1.3"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </span>
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}

WorkRows.propTypes = {
  products: PropTypes.arrayOf(PropTypes.object).isRequired,
  startIndex: PropTypes.number,
};
