# Cody Johnson Portfolio

Personal portfolio site built with Vite, React, React Router, and Tailwind CSS.

## Features

- Homepage
- Product index and product detail pages
- Case study pages
- Downloadable resume assets
- SPA rewrite support for deep links
- Smoke tests for route and content integrity

## Project structure

- `src/content/` content used by the site pages
- `src/pages/` route-level page components
- `src/components/` shared layout and utility components
- `public/resume/` printable and downloadable resume assets
- `docs/` supporting project documentation

## Local development

```bash
npm install
npm run dev
```

## Production build

```bash
npm run build
```

## Testing

```bash
npm test
```

## Continuous integration

`npm run lint`, `npm test`, and `npm run build` run in GitHub Actions on every pull request and on every push to `main`. See `.github/workflows/ci.yml` for the job itself.

The workflow reports status, it does not block merges. Making it enforcing takes a branch protection rule or ruleset on `main` that marks the `checks` job a required status check, and that is a repository setting rather than a file in this repo. Until someone adds it, a pull request with a red or still-pending run stays mergeable.

## Deployment

This app uses `BrowserRouter`, so deep links like `/products/track-tuner` and `/case-studies/:slug` require SPA rewrites in production.

- `vercel.json` provides a catch-all rewrite for Vercel-style hosting.
- `public/_redirects` provides the Netlify-style fallback route when the site is built.

## Content updates

Most site copy and structured data live in `src/content/`.
