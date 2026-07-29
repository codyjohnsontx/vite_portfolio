import PropTypes from 'prop-types';

/* Screenshots are imported through vite-imagetools with `?shot`, which hands
   back a srcset string: "url 640w, url 1280w, url 2560w". This renders that
   with the right `sizes` so a phone fetches the 640w variant instead of the
   2560w one, which is where nearly all of the payload saving comes from. */

function widestSource(srcSet) {
  const entries = String(srcSet).split(',');
  const last = entries[entries.length - 1] ?? '';
  return last.trim().split(/\s+/)[0] ?? '';
}

export default function Shot({ source, alt, sizes, eager, ...rest }) {
  return (
    <img
      // ignored by anything that understands srcset, which is every target
      // browser; kept so the element is still valid on its own
      src={widestSource(source)}
      srcSet={source}
      sizes={sizes}
      alt={alt}
      loading={eager ? 'eager' : 'lazy'}
      decoding="async"
      {...rest}
    />
  );
}

Shot.propTypes = {
  /** srcset string produced by the `?shot` import */
  source: PropTypes.string.isRequired,
  alt: PropTypes.string.isRequired,
  /** must describe the rendered width, or the browser over-fetches */
  sizes: PropTypes.string.isRequired,
  eager: PropTypes.bool,
};
