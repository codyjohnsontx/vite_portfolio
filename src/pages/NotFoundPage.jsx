import { Link } from 'react-router-dom';
import { ArrowGlyph, Eyebrow } from '../components/Editorial';

export default function NotFoundPage() {
  return (
    <section className="section">
      <div className="container">
        <Eyebrow>404</Eyebrow>
        <h1 className="display" style={{ margin: '24px 0 24px' }}>
          This page does not exist.
        </h1>
        <p className="lead" style={{ maxWidth: '52ch', margin: '0 0 32px' }}>
          The rebuild is intentionally small. Head back to the index or open the resume directly.
        </p>
        <div style={{ display: 'flex', gap: 28, flexWrap: 'wrap' }}>
          <Link className="link-arrow" to="/">
            Go home <ArrowGlyph />
          </Link>
          <Link className="link-arrow" to="/resume">
            Open resume <ArrowGlyph />
          </Link>
        </div>
      </div>
    </section>
  );
}
