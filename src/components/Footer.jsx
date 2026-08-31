import { Link } from 'react-router-dom';
import { profile } from '../content/profile';
import { flagshipProducts } from '../content/projects';
import { useKineticText, useMagnetic } from '../motion/hooks';

export default function Footer() {
  const ctaRef = useKineticText({ mode: 'chars', stagger: 0.022, y: '105%' });
  const mailRef = useMagnetic({ strength: 0.24 });

  return (
    <footer className="site-footer">
      <div className="shell">
        <div className="site-footer__cta">
          <span className="mono">Open to product roles</span>
          <h2 className="display site-footer__headline" ref={ctaRef} style={{ opacity: 0 }}>
            Let&rsquo;s build
          </h2>
          <a
            ref={mailRef}
            href="mailto:codyjohnsontx@gmail.com"
            className="pill pill--solid site-footer__mail"
          >
            codyjohnsontx@gmail.com
          </a>
        </div>

        <hr className="hair" />

        <div className="site-footer__grid">
          <div>
            <span className="mono">Index</span>
            <ul>
              <li><Link to="/">Home</Link></li>
              <li><Link to="/products">Work</Link></li>
              <li><Link to="/notes">Notes</Link></li>
            </ul>
          </div>
          <div>
            <span className="mono">Active builds</span>
            <ul>
              {flagshipProducts.map((p) => (
                <li key={p.slug}>
                  <Link to={`/products/${p.slug}`}>{p.name}</Link>
                </li>
              ))}
            </ul>
          </div>
          <div>
            <span className="mono">Elsewhere</span>
            <ul>
              {profile.contactLinks.map((l) => (
                <li key={l.label}>
                  <a
                    href={l.href}
                    target={l.external ? '_blank' : undefined}
                    rel={l.external ? 'noreferrer' : undefined}
                  >
                    {l.label}
                    {l.external ? <span aria-hidden="true" className="site-footer__ext"> ↗</span> : null}
                  </a>
                </li>
              ))}
            </ul>
          </div>
          <div>
            <span className="mono">Based in</span>
            <ul>
              <li>Austin, Texas</li>
              <li>Central time</li>
            </ul>
          </div>
        </div>

        <div className="site-footer__base">
          <span className="mono">© {new Date().getFullYear()} Cody Johnson</span>
          <span className="mono">Built with React, GSAP &amp; WebGL</span>
        </div>
      </div>
    </footer>
  );
}
