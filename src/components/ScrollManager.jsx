import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { getLenis } from '../motion/motion';

/* Hash anchoring only. Plain route changes are reset by SiteLayout, which
   also owns the Lenis instance - two components calling window.scrollTo
   would fight the virtual scroll. */
function ScrollManager() {
  const location = useLocation();

  useEffect(() => {
    if (!location.hash) return undefined;

    const raf = requestAnimationFrame(() => {
      const target = document.getElementById(location.hash.slice(1));
      if (!target) return;

      const lenis = getLenis();
      if (lenis) lenis.scrollTo(target, { offset: -100 });
      else target.scrollIntoView({ behavior: 'smooth', block: 'start' });
    });

    return () => cancelAnimationFrame(raf);
  }, [location]);

  return null;
}

export default ScrollManager;
