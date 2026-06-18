import { Link } from 'react-router-dom';
import { ArrowGlyph, Eyebrow } from '../components/Editorial';
import { Reveal } from '../components/ScrollReveal';
import { blogPosts } from '../content/blogPosts';

export default function BlogIndexPage() {
  return (
    <div className="fade-in">
      <Reveal as="section" className="page-hero" duration={900}>
        <div className="container">
          <div className="crumbs">
            <Link to="/">Index</Link>
            <span>/</span>
            <span>Blog</span>
          </div>
          <h1 className="display" style={{ margin: 0 }}>
            Product <span className="italic">notes</span>.
          </h1>
          <p className="lead" style={{ marginTop: 24, maxWidth: '60ch' }}>
            Short essays on product judgment, technical tradeoffs, and the operating choices
            behind the work I build.
          </p>
        </div>
      </Reveal>

      <Reveal as="section" className="section">
        <div className="container">
          {blogPosts.map((post, i) => (
            <Reveal
              as={Link}
              key={post.slug}
              to={`/blog/${post.slug}`}
              className="case-row"
              delay={i * 90}
            >
              <span className="numeral" style={{ fontSize: 60 }}>
                0{i + 1}
              </span>
              <div>
                <Eyebrow>
                  {post.date} · {post.readingTime}
                </Eyebrow>
                <h2 className="h2" style={{ margin: '8px 0 12px' }}>
                  {post.title}
                </h2>
                <p
                  className="body"
                  style={{ color: 'var(--ink-2)', maxWidth: '70ch', margin: 0 }}
                >
                  {post.deck}
                </p>
              </div>
              <div className="case-row__cta" style={{ textAlign: 'right' }}>
                <span className="link-arrow" style={{ borderColor: 'transparent' }}>
                  Read <ArrowGlyph />
                </span>
              </div>
            </Reveal>
          ))}
        </div>
      </Reveal>
    </div>
  );
}
