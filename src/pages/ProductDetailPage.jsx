import { HiArrowLeft, HiArrowUpRight } from 'react-icons/hi2';
import { Link, Navigate, useParams } from 'react-router-dom';
import { getProductBySlug } from '../content/projects';

function getTierLabel(tier) {
  if (tier === 'flagship') {
    return 'Flagship build';
  }

  return 'Concept build';
}

function getStatusLabel(status) {
  if (status === 'active-build') {
    return 'Active build';
  }

  return 'Prototype concept';
}

function ProductDetailPage() {
  const { slug } = useParams();
  const product = getProductBySlug(slug);

  if (!product) {
    return <Navigate to="/not-found" replace />;
  }

  return (
    <div className="section-shell py-12 md:py-16">
      <Link
        to="/products"
        className="inline-flex items-center gap-2 text-sm font-semibold text-[color:var(--ink-muted)] transition hover:text-[color:var(--ink)]"
      >
        <HiArrowLeft className="text-base" />
        Back to product briefs
      </Link>

      <section className="surface-card mt-6 p-8 md:p-12">
        <p className="product-meta-line">
          {getTierLabel(product.tier)} • {getStatusLabel(product.status)} • {product.companyContext}
        </p>
        <h1 className="mt-4 max-w-4xl text-4xl font-semibold leading-tight md:text-6xl">{product.name}</h1>
        <p className="mt-6 max-w-3xl text-lg leading-8 text-[color:var(--ink-muted)]">{product.oneLiner}</p>
        <p className="detail-line mt-6">
          <span className="detail-label">Role:</span>
          {product.role}
        </p>
        <p className="detail-line mt-3">
          <span className="detail-label">Stack:</span>
          {product.stack.join(', ')}
        </p>
        {product.brandDisclaimer ? (
          <p className="disclaimer-note mt-6">{product.brandDisclaimer}</p>
        ) : null}
      </section>

      <section className="mt-8 grid gap-8 lg:grid-cols-[minmax(0,1.15fr)_minmax(280px,0.85fr)]">
        <div className="space-y-8">
          <article className="surface-card p-7 md:p-8">
            <span className="eyebrow">Problem</span>
            <p className="mt-2 text-base leading-8 text-[color:var(--ink-muted)]">{product.problem}</p>
          </article>

          <article className="surface-card p-7 md:p-8">
            <span className="eyebrow">Audience and JTBD</span>
            <p className="text-base leading-8 text-[color:var(--ink-muted)]">{product.audience}</p>
            <p className="mt-4 text-base leading-8 text-[color:var(--ink-muted)]">{product.jtbd}</p>
          </article>

          <article className="surface-card p-7 md:p-8">
            <span className="eyebrow">Core workflow</span>
            <ol className="workflow-list mt-5">
              {product.coreWorkflow.map((step) => (
                <li key={step}>{step}</li>
              ))}
            </ol>
          </article>

          <article className="surface-card p-7 md:p-8">
            <span className="eyebrow">MVP scope</span>
            <ol className="workflow-list mt-5">
              {product.mvpScope.map((scopeItem) => (
                <li key={scopeItem}>{scopeItem}</li>
              ))}
            </ol>
          </article>
        </div>

        <aside className="space-y-8">
          <article className="surface-card p-7">
            <span className="eyebrow">Evidence signal</span>
            <p className="mt-2 text-base leading-7 text-[color:var(--ink-muted)]">{product.evidenceSignal}</p>
          </article>

          <article className="surface-card p-7">
            <span className="eyebrow">Next step</span>
            <p className="mt-2 text-base leading-7 text-[color:var(--ink-muted)]">{product.nextStep}</p>
          </article>

          <article className="surface-card p-7">
            <span className="eyebrow">Standalone mock status</span>
            <p className="mt-2 text-base leading-7 text-[color:var(--ink-muted)]">
              {product.standaloneMockStatus}
            </p>
            {product.standaloneMockUrl ? (
              <a href={product.standaloneMockUrl} className="glass-cta-secondary mt-4 w-fit" target="_blank" rel="noreferrer">
                Open standalone mock
                <HiArrowUpRight className="text-base" />
              </a>
            ) : null}
          </article>
        </aside>
      </section>

      <section className="mt-10 flex flex-col gap-3 sm:flex-row">
        <Link to="/products" className="cta-primary">
          Back to products
          <HiArrowUpRight className="text-base" />
        </Link>
        <Link to="/#case-studies" className="glass-cta-secondary">
          View supporting case studies
          <HiArrowUpRight className="text-base" />
        </Link>
      </section>
    </div>
  );
}

export default ProductDetailPage;
