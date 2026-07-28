import { useEffect, useRef, useState } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { gsap, prefersReducedMotion } from '../motion/motion';
import { getStatusLabel } from '../content/productHelpers';

/* Metalab-style index rows: name / description / disciplines separated by
   hairlines. Hovering a row floats that product's screenshot under the
   cursor with a little lag, and dims every other row. */
export default function WorkRows({ products, startIndex = 1 }) {
  const listRef = useRef(null);
  const floatRef = useRef(null);
  const [active, setActive] = useState(null);

  useEffect(() => {
    const float = floatRef.current;
    if (!float) return undefined;
    if (prefersReducedMotion()) return undefined;
    if (!window.matchMedia('(hover: hover) and (pointer: fine)').matches) return undefined;

    // centre the preview on the pointer, biased slightly above it
    gsap.set(float, { xPercent: -50, yPercent: -58 });

    const xTo = gsap.quickTo(float, 'x', { duration: 0.75, ease: 'power3.out' });
    const yTo = gsap.quickTo(float, 'y', { duration: 0.75, ease: 'power3.out' });
    // `rotation` is GSAP's transform channel; `rotate` targets the separate
    // CSS rotate property and warns that it cannot be reset cleanly
    const rTo = gsap.quickTo(float, 'rotation', { duration: 1.1, ease: 'power3.out' });

    let lastX = 0;
    const onMove = (e) => {
      xTo(e.clientX);
      yTo(e.clientY);
      // tilt into the direction of travel
      rTo(gsap.utils.clamp(-11, 11, (e.clientX - lastX) * 0.6));
      lastX = e.clientX;
    };

    window.addEventListener('pointermove', onMove, { passive: true });
    return () => {
      window.removeEventListener('pointermove', onMove);
      gsap.killTweensOf(float);
    };
  }, []);

  useEffect(() => {
    const float = floatRef.current;
    if (!float || prefersReducedMotion()) return;
    gsap.to(float, {
      opacity: active ? 1 : 0,
      scale: active ? 1 : 0.86,
      duration: 0.55,
      ease: 'expo.out',
    });
  }, [active]);

  const activeProduct = products.find((p) => p.slug === active);

  return (
    <div className="work" ref={listRef} onMouseLeave={() => setActive(null)}>
      <div className="work__float" ref={floatRef} aria-hidden="true">
        {activeProduct?.image ? (
          <img src={activeProduct.image} alt="" loading="lazy" decoding="async" />
        ) : (
          <div className="work__float-fallback">
            <span className="mono">{activeProduct?.name}</span>
          </div>
        )}
      </div>

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
