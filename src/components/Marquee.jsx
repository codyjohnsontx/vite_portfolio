import { useEffect, useRef } from 'react';
import PropTypes from 'prop-types';
import { ScrollTrigger, gsap, prefersReducedMotion } from '../motion/motion';

/* Infinite band that also reads scroll velocity: scrolling fast skews the
   type and shoves the band along, so the marquee feels physically coupled
   to the page instead of looping on its own clock. */
export default function Marquee({ items, speed = 42, separator = '·' }) {
  const rootRef = useRef(null);
  const trackRef = useRef(null);

  useEffect(() => {
    const root = rootRef.current;
    const track = trackRef.current;
    if (!root || !track) return undefined;

    if (prefersReducedMotion()) return undefined;

    const ctx = gsap.context(() => {
      // A zero/near-zero width would make the loop duration ~0, which with
      // repeat:-1 spins the ticker without ever advancing.
      const half = track.scrollWidth / 2;
      if (!Number.isFinite(half) || half < 50) return;

      const tl = gsap.to(track, {
        x: -half,
        duration: half / speed,
        ease: 'none',
        repeat: -1,
      });

      const st = ScrollTrigger.create({
        trigger: root,
        start: 'top bottom',
        end: 'bottom top',
        onUpdate(self) {
          const v = gsap.utils.clamp(-1, 1, self.getVelocity() / 2600);
          tl.timeScale(1 + Math.abs(v) * 5);
          gsap.to(track, {
            skewX: v * -7,
            duration: 0.6,
            ease: 'power3.out',
            overwrite: 'auto',
          });
        },
      });

      return () => {
        st.kill();
        tl.kill();
      };
    }, root);

    return () => ctx.revert();
  }, [items, speed]);

  const run = [...items, ...items];

  return (
    <div className="marquee" ref={rootRef} aria-hidden="true">
      <div className="marquee__track" ref={trackRef}>
        {run.map((item, i) => (
          <span className="marquee__item" key={`${item}-${i}`}>
            {item}
            <span className="marquee__sep">{separator}</span>
          </span>
        ))}
      </div>
    </div>
  );
}

Marquee.propTypes = {
  items: PropTypes.arrayOf(PropTypes.string).isRequired,
  speed: PropTypes.number,
  separator: PropTypes.string,
};
