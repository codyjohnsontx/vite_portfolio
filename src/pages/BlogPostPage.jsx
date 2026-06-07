import { Link, Navigate, useParams } from 'react-router-dom';
import { ArrowGlyph, Eyebrow } from '../components/Editorial';
import { Reveal } from '../components/ScrollReveal';
import { getBlogPostBySlug } from '../content/blogPosts';

export default function BlogPostPage() {
  const { slug } = useParams();
  const post = getBlogPostBySlug(slug);

  if (!post) return <Navigate to="/not-found" replace />;

  return (
    <div className="fade-in">
      <Reveal as="section" className="page-hero" duration={900}>
        <div className="container">
          <div className="crumbs">
            <Link to="/">Index</Link>
            <span>/</span>
            <Link to="/blog">Blog</Link>
            <span>/</span>
            <span>{post.title}</span>
          </div>
          <Eyebrow>
            {post.category} · {post.date} · {post.readingTime}
          </Eyebrow>
          <h1
            className="display"
            style={{ margin: '24px 0 0', fontSize: 'clamp(40px, 5.6vw, 84px)' }}
          >
            {post.title}
          </h1>
          <p className="lead" style={{ marginTop: 24, maxWidth: '60ch' }}>
            {post.deck}
          </p>
        </div>
      </Reveal>

      <article className="section blog-article">
        <div className="container">
          <div className="blog-article__body">
            <Reveal as="p" className="lead" delay={80} style={{ color: 'var(--ink)' }}>
              {post.intro}
            </Reveal>

            {post.sections.map((section, index) => (
              <Reveal
                as="section"
                key={section.heading}
                className="blog-article__section"
                delay={(index % 2) * 80}
              >
                <h2>{section.heading}</h2>
                {section.body.map((paragraph, idx) => (
                  <p key={idx}>{paragraph}</p>
                ))}
              </Reveal>
            ))}

            <Reveal as="p" className="blog-article__closing">
              {post.closing}
            </Reveal>
          </div>
        </div>
      </article>

      <section className="section section--tight">
        <Reveal className="container blog-article__footer">
          <Link className="link-arrow" to="/blog">
            ← All posts
          </Link>
          <a className="link-arrow" href="mailto:codyjohnsontx@gmail.com">
            Discuss this note <ArrowGlyph />
          </a>
        </Reveal>
      </section>
    </div>
  );
}
