import PropTypes from 'prop-types';
import { useEffect, useRef, useState } from 'react';

export function Reveal({
  as: Component,
  children,
  className,
  delay,
  distance,
  duration,
  threshold,
  rootMargin,
  style,
  ...props
}) {
  const nodeRef = useRef(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const node = nodeRef.current;
    if (!node) return undefined;

    if (typeof window === 'undefined' || typeof window.IntersectionObserver !== 'function') {
      setVisible(true);
      return undefined;
    }

    const observer = new window.IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting) return;
        setVisible(true);
        observer.unobserve(entry.target);
      },
      { threshold, rootMargin },
    );

    observer.observe(node);
    return () => observer.disconnect();
  }, [rootMargin, threshold]);

  return (
    <Component
      ref={nodeRef}
      className={['scroll-reveal', visible ? 'is-visible' : '', className]
        .filter(Boolean)
        .join(' ')}
      style={{
        '--reveal-delay': `${delay}ms`,
        '--reveal-distance': `${distance}px`,
        '--reveal-duration': `${duration}ms`,
        ...style,
      }}
      {...props}
    >
      {children}
    </Component>
  );
}

Reveal.propTypes = {
  as: PropTypes.elementType,
  children: PropTypes.node,
  className: PropTypes.string,
  delay: PropTypes.number,
  distance: PropTypes.number,
  duration: PropTypes.number,
  threshold: PropTypes.number,
  rootMargin: PropTypes.string,
  style: PropTypes.object,
};

Reveal.defaultProps = {
  as: 'div',
  children: null,
  className: '',
  delay: 0,
  distance: 18,
  duration: 760,
  threshold: 0.14,
  rootMargin: '0px 0px -12% 0px',
  style: undefined,
};
