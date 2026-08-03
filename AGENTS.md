# Project agent memory

This file is the project's committed home for project-intrinsic agent knowledge: build, test, release, architecture, and sharp-edge notes that should travel with the code.

- Add durable project-specific notes here as they are discovered through real work.

## Content is data, not JSX

Every public claim on the site lives in `src/content/*.js`. Update copy there, not in
components. Two things that are easy to get wrong:

- There is no separate changelog module. Each product's `updates` array in
  `src/content/projects.js` is the update feed, rendered by the `04 Updates` section of
  `src/pages/ProductDetailPage.jsx`. Newest entry first.
- `src/content/latestSignal.js` drives the home page "Latest" block, and
  `src/App.test.jsx` asserts its heading, body phrases, and link targets. Changing that
  copy means updating that test in the same commit.

For the per-product record shape, which fields exist and which are optional, read
`src/content/projects.js` alongside the `ProductList` propTypes in
`src/components/ProductList.jsx`. For the supported `status` values, read
`src/content/productHelpers.js`.

Two things those files will not tell you. Nothing currently renders `status`, so express
lifecycle nuance ("pre-launch", "prototype") in the copy rather than inventing a new status
value. And a product with no screenshot should omit `image` and `visualAssets` rather than
carry a placeholder path.

## CodeRabbit reviews

CodeRabbit reviews a pull request once, when it is opened, and does not re-review
automatically. That is deliberate: `reviews.auto_review.auto_incremental_review` is
`false` in `.coderabbit.yaml`.

Any pull request that gained commits after it was opened must be re-reviewed by
commenting `@coderabbitai review` before it is merged. Skipping that merges those
commits unreviewed.

## Maintaining this file

Keep this file for knowledge useful to almost every future agent session in this project.
Do not repeat what the codebase already shows; point to the authoritative file or command instead.
Prefer rewriting or pruning existing entries over appending new ones.
When updating this file, preserve this bar for all agents and keep entries concise.
