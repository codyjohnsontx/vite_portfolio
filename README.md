# Cody Johnson PM Portfolio

This repository contains a recruiter-first portfolio and resume system for Cody Johnson's transition into Product Manager roles.

The site is built with Vite, React, React Router, and Tailwind CSS. The implementation is intentionally content-driven so messaging, case studies, and resume details can be updated without rewriting the UI.

## What is in scope

- A PM-positioned homepage
- Two public case studies
- A web resume view
- A downloadable resume asset
- Structured content files for profile, case studies, experience, projects, and resume metadata
- Supporting docs for positioning, evidence capture, and resume tailoring

## Project structure

- `src/content/`
  Source-of-truth content objects for the public site and resume page.
- `src/pages/`
  Route-level pages for the homepage, case studies, and resume.
- `src/components/`
  Shared layout and navigation components.
- `public/resume/`
  Printable and downloadable resume assets.
- `docs/`
  PM transition planning artifacts, including the positioning brief, evidence inventory, and tailoring guide.

## Local development

```bash
npm install
npm run dev
```

## Build

```bash
npm run build
```

## Content workflow

Update the files in `src/content/` when changing:

- hero positioning
- case study copy
- experience framing
- supporting project links
- resume metadata

Use the supporting docs in `docs/` when refining the PM narrative for new applications.

## Notes

- The public portfolio is intentionally selective. It is designed to start interviews, not to publish every project artifact.
- The downloadable resume asset should stay aligned with both the `/resume` route and the tailoring workflow documented in `docs/resume-tailoring-guide.md`.
