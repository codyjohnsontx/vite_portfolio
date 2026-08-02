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

Optional per-product fields include `image`, `visualAssets`, `liveUrl`, and `year`. Cards without
a screenshot simply omit `image` and `visualAssets` and render fine. `ProductList` requires
`slug`, `accent`, `name`, `oneLiner`, `problem`, `audience`, and `stack`.

`status` only has two supported values in `src/content/productHelpers.js`
(`active-build`, `prototype`); anything else logs a warning and renders "Unknown status".
Nothing currently renders it, so express lifecycle nuance ("pre-launch", "prototype") in the
copy rather than inventing a new status string.

## Maintaining this file

Keep this file for knowledge useful to almost every future agent session in this project.
Do not repeat what the codebase already shows; point to the authoritative file or command instead.
Prefer rewriting or pruning existing entries over appending new ones.
When updating this file, preserve this bar for all agents and keep entries concise.
