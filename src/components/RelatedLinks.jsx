import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { ArrowGlyph } from './Editorial';
import { Reveal } from './ScrollReveal';

/* The link between a piece of work and what has been written about it, in both
   directions. One component because the three surfaces that need it - the
   product page, the case study, the note - all want the same row: what kind of
   thing this is, its title, and one line of why you would open it. */
export default function RelatedLinks({ items }) {
  if (!items.length) return null;

  return (
    <ul className="related">
      {items.map((item, i) => (
        <Reveal
          as="li"
          key={item.href}
          className="related__row"
          delay={(i % 4) * 70}
          distance={18}
        >
          <Link to={item.href} className="related__link">
            {/* The space is a real text node on purpose: without it the
                accessible name runs the label straight into the title. */}
            <span className="related__label mono">{item.label}</span>{' '}
            <span className="related__body">
              <span className="related__title">{item.title}</span>
              {item.note ? <span className="related__note body">{item.note}</span> : null}
            </span>{' '}
            <span className="related__go link-arrow">
              Open <ArrowGlyph />
            </span>
          </Link>
        </Reveal>
      ))}
    </ul>
  );
}

RelatedLinks.propTypes = {
  items: PropTypes.arrayOf(
    PropTypes.shape({
      href: PropTypes.string.isRequired,
      label: PropTypes.string.isRequired,
      title: PropTypes.string.isRequired,
      note: PropTypes.string,
    }),
  ).isRequired,
};
