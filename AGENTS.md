# Project agent memory

This file is the project's committed home for project-intrinsic agent knowledge: build, test, release, architecture, and sharp-edge notes that should travel with the code.

- Add durable project-specific notes here as they are discovered through real work.

## Content is data, not JSX

Every public claim on the site lives in `src/content/*.js`. Update copy there, not in
components. A few things that are easy to get wrong:

- There is no separate changelog module. Each product's `updates` array in
  `src/content/projects.js` is the update feed, rendered by the `04 Updates` section of
  `src/pages/ProductDetailPage.jsx`. Newest entry first, and for the Track Tuner, Attend,
  draftSpace, and Diaz on Demand feeds `src/App.test.jsx` pins the newest entry's date,
  tag, title, and pull request link, so adding an entry to one of those means updating
  that test in the same commit.
- `src/content/latestSignal.js` drives the home page "Latest" block, and
  `src/App.test.jsx` asserts its heading, body phrases, and link targets. Changing that
  copy means updating that test in the same commit.
- `ProductDetailPage.jsx` splits `nextStep` on the first period and renders that sentence
  as the `05 What's next` headline, then repeats the whole field below it. So the first
  sentence has to stand alone as a headline, and `nextStep` cannot open with a decimal.
- `src/App.test.jsx` also asserts the retired CTX Chat name never renders on the Attend
  page, so copy about the rename has to describe it without quoting the old name.

For the per-product record shape, which fields exist and which are optional, read
`src/content/projects.js` alongside the `ProductList` propTypes in
`src/components/ProductList.jsx`. For the supported `status` values, read
`src/content/productHelpers.js`.

Two things those files will not tell you. Nothing currently renders `status` or
`evidenceSignal`; both are defined in `src/content/projects.js` and consumed by no
component. So express lifecycle nuance ("pre-launch", "prototype") in the copy rather than
inventing a new status value, and treat `evidenceSignal` as an internal note whose text
reaches no rendered surface, so editing it does not change the site. And a product with no
screenshot should omit `image` and `visualAssets` rather than carry a placeholder path.

## The resume exists in four places, and they drift

`src/content/resumeContent.js` renders nowhere. `ResumePage.jsx` exists but `/resume` is
not routed in `src/App.jsx`, and a test in `src/App.test.jsx` pins that it stays
unexposed; it was unrouted deliberately in ff0ac60 and kept "for later". So editing
`resumeContent.js` alone changes nothing a visitor sees, and re-exposing the page is a
product decision, not a content fix.

What actually renders the resume story is the home page: `src/content/experience.js`
(company, role, dates, `summary`, `tags` only, never `evidence`) plus the hardcoded hero
eyebrow, `HERO_LINES`, and `PROOF` array in `src/pages/HomePage.jsx`, the positioning line
in `src/components/Preloader.jsx`, `profile.heroSupport`, and the titles and descriptions
in `index.html`. Everything else in `src/content/profile.js` is dead: only `heroSupport`
and `contactLinks` have a consumer, and `toolkit` lost its last one when Dev Mode was
deleted. Nothing on the site renders a skills or strengths list at all.

Of the three files in `public/resume/`, the HTML and the TXT are separate hand-maintained
artifacts, not generated from `resumeContent.js`, so a content change has to be applied to
both. They are unlinked but served, so they go stale silently. The PDF is generated from
the HTML, so a resume change means updating `resumeContent.js` and those two files, then
regenerating the PDF.

The PDF is the exception worth knowing: it is not hand-written, it is Chrome's
print-to-PDF of `cody-johnson-product-manager-resume.html` (its metadata still reads
`Skia/PDF`). No component links to it, but it ships from `public/`, so it is served as a
static asset at `/resume/Cody-Johnson-Product-Manager-Resume.pdf` and stays reachable and
shareable. `src/content/resumeMeta.js` records that path in `downloadPath` and is
currently imported by nothing. So editing the HTML alone silently leaves a live public
artifact stale. Regenerate with:

```shell
"/Applications/Google Chrome.app/Contents/MacOS/Google Chrome" --headless --disable-gpu \
  --no-pdf-header-footer --print-to-pdf=public/resume/Cody-Johnson-Product-Manager-Resume.pdf \
  "file://$PWD/public/resume/cody-johnson-product-manager-resume.html"
```

The HTML's `@media print` block already strips the card chrome. The current resume prints
to 4 US Letter pages. Check the count before committing: it should only move when the
content did, so an unexplained change means the print CSS moved.

## Attend screenshots

The images in `src/assets/attend/` plus the card image `src/assets/attend.png` are
captures of the Attend app (the repository is still named `ctxconnect`, and the public
route slug is still `ctx-chat`; both are deliberate, see the comment above the Attend
entry in `src/content/projects.js`). To retake them, run that app per its README against
any local Postgres and its seed. Two sharp edges: start it with `next dev --webpack`,
because its next-auth v4 `/api/auth/*` routes 500 under Turbopack dev, and set a
placeholder `OPENAI_API_KEY` so the inbox shows brief coverage instead of a
not-configured warning (do not click "Run pass" with a placeholder key). Manager screens
use the seeded gm login, demo screens use the seeded demo service advisor. Capture at
2x device pixels: 1440x900 viewport for most shots, 1280x860 for the login, 1280x900
for tasks-status-views, 1710x826 for the card image.

`attend-08-tasks-status-views.png` needs one state the seed does not give you. Under the
seeded demo service advisor every task starts Open, so In Progress, Done, and Canceled
all read zero and only one labeled section renders. Before capturing, use the app's own
inline status controls to move at least one task into each of those three statuses, so
all four labeled sections are visible. Shooting the default state leaves the image no
longer supporting its `Tasks with status views` label, its alt text, or the PR #8 update
entry in `src/content/projects.js`.

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
