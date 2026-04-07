import { HiArrowUpRight } from 'react-icons/hi2';
import { Link } from 'react-router-dom';
import { getStatusLabel } from '../content/productHelpers';
import { conceptProducts, flagshipProducts } from '../content/projects';

function ProductsPage() {
  return (
    <div className="section-shell py-12 md:py-16">
      <section className="surface-card glass-panel p-8 md:p-12">
        <div className="grid gap-8 lg:grid-cols-[minmax(0,1fr)_minmax(280px,0.8fr)]">
          <div>
            <h1 className="max-w-4xl text-4xl font-semibold leading-tight md:text-6xl">Product work.</h1>
            <p className="section-copy mt-6">
              Flagship builds show active delivery. The concept lab shows structured product exploration where problem framing, workflow design, and MVP definition come before full build commitment.
            </p>
          </div>
          <aside className="surface-card glass-panel-soft p-6">
            <h2 className="text-2xl font-semibold">Build method</h2>
            <ol className="workflow-list mt-5">
              <li>Define the user problem and job-to-be-done first.</li>
              <li>Map core workflow and MVP scope before expansion features.</li>
              <li>Use evidence signals to decide if the concept earns deeper build time.</li>
            </ol>
          </aside>
        </div>
      </section>

      <section className="mt-10">
        <h2 className="text-3xl font-semibold md:text-4xl">Flagship builds</h2>
        <div className="mt-6 grid gap-6 lg:grid-cols-2">
          {flagshipProducts.map((product) => (
            <article key={product.slug} className="surface-card glass-panel product-card-flagship p-7 md:p-8">
              <h3 className="text-3xl font-semibold">{product.name}</h3>
              <p className="mt-4 text-base leading-7 text-[color:var(--ink-muted)]">{product.oneLiner}</p>
              <p className="detail-line mt-5">
                <span className="detail-label">Role:</span>
                {product.role}
              </p>
              <p className="detail-line mt-3">
                <span className="detail-label">Stack:</span>
                {product.stack.join(', ')}
              </p>
              <p className="glass-panel-soft mt-5 rounded-3xl px-5 py-4 text-sm leading-6 text-[color:var(--ink)]">
                {product.evidenceSignal}
              </p>
              <Link to={`/products/${product.slug}`} className="cta-primary mt-6 w-fit">
                Open product brief
                <HiArrowUpRight className="text-base" />
              </Link>
            </article>
          ))}
        </div>
      </section>

      <section className="mt-12">
        <h2 className="text-3xl font-semibold md:text-4xl">Concept lab</h2>
        <div className="mt-6 grid gap-5 md:grid-cols-2 xl:grid-cols-3">
          {conceptProducts.map((product) => (
            <article key={product.slug} className="surface-card glass-panel-soft product-card-concept p-6">
              <p className="product-meta-line">{getStatusLabel(product.status)} • {product.companyContext}</p>
              <h3 className="mt-4 text-2xl font-semibold">{product.name}</h3>
              <p className="mt-3 text-sm leading-7 text-[color:var(--ink-muted)]">{product.oneLiner}</p>
              <p className="detail-line mt-4">
                <span className="detail-label">Context:</span>
                {product.companyContext}
              </p>
              <p className="detail-line mt-3">
                <span className="detail-label">Mock status:</span>
                {product.standaloneMockStatus}
              </p>
              {product.brandDisclaimer ? (
                <p className="disclaimer-note mt-4">Unofficial concept. See full disclaimer in brief.</p>
              ) : null}
              <Link to={`/products/${product.slug}`} className="glass-cta-secondary mt-5 w-fit">
                View concept brief
                <HiArrowUpRight className="text-base" />
              </Link>
            </article>
          ))}
        </div>
      </section>
    </div>
  );
}

export default ProductsPage;
