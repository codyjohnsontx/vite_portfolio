import { Link } from 'react-router-dom';

function NotFoundPage() {
  return (
    <div className="section-shell py-24">
      <div className="surface-card max-w-3xl p-10">
        <span className="eyebrow">Not found</span>
        <h1 className="mt-4 text-4xl font-semibold">This page does not exist.</h1>
        <p className="mt-4 text-base leading-7 text-[color:var(--ink-muted)]">
          The rebuild is intentionally small and recruiter-focused. Head back to the homepage or open the resume directly.
        </p>
        <div className="mt-8 flex gap-3">
          <Link to="/" className="cta-primary">
            Go home
          </Link>
          <Link to="/resume" className="glass-cta-secondary">
            Open resume
          </Link>
        </div>
      </div>
    </div>
  );
}

export default NotFoundPage;
