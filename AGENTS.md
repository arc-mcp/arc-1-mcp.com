# AGENTS.md

Guidance for AI coding agents working in this repository.

## Project Overview

This repository is the ARC-1 product landing page for [arc-1-mcp.com](https://arc-1-mcp.com/).
It is a small static Vite site: no React, no router, no backend.

- Source repo: `arc-mcp/arc-1-mcp.com`
- Default branch: `main`
- GitHub Pages URL: `https://arc-1-mcp.com/`
- Pages mode: GitHub Actions workflow deployment
- Custom domain: `public/CNAME` contains `arc-1-mcp.com`
- HTTPS: enforced in GitHub Pages

## Key Files

| Task | Files |
| --- | --- |
| Main landing-page copy, SEO metadata, sections, links | `index.html` |
| Layout, responsive behavior, palette, cards, typography | `src/styles.css` |
| Navigation toggle, sticky header state, copy buttons, footer year | `src/main.ts` |
| Static images and site metadata | `public/` |
| GitHub Pages deployment | `.github/workflows/deploy.yml` |
| Tooling and scripts | `package.json`, `biome.json`, `tsconfig.json` |

Do not edit `dist/`; it is build output and is ignored.

## Development

Use Node 22, matching the GitHub Actions workflow.

```bash
npm ci
npm run dev
npm run lint
npm run build
```

`npm run dev` starts Vite on `127.0.0.1`. If port `5173` is busy, pass another port:

```bash
npm run dev -- --port 5174
```

## Deployment

Pushes to `main` trigger `.github/workflows/deploy.yml`.

The workflow:

1. Checks out the repo.
2. Sets up Node 22 with npm cache.
3. Runs `npm ci`.
4. Runs `npm run lint`.
5. Runs `npm run build`.
6. Uploads `dist/`.
7. Deploys with `actions/deploy-pages@v5`.

Before pushing, run at least:

```bash
npm run lint
npm run build
git diff --check
```

For visual/layout changes, also run the dev server and check desktop plus mobile widths.

## Content Model

The site is a product landing page, not docs. Keep copy concise and executive-readable.

Current positioning to preserve:

- ARC-1 is an open-source, self-hosted MCP gateway for governed SAP ABAP access.
- Supported SAP landscapes include SAP BTP ABAP environment, SAP S/4HANA Cloud Public Edition, SAP S/4HANA Cloud Private Edition, and on-prem ABAP systems from 7.40.
- The operating model is read-only first; writes, SQL, data preview, transports, and Git are explicit opt-ins.
- SAP identity, authorization, and audit remain the control plane.
- BTP, XSUAA, Destination Service, Cloud Connector, and GitHub Pages deployment are first-class story points.

## Design Rules

- Keep the first viewport focused on the product and enterprise value, not a marketing splash.
- Use existing section patterns before inventing new components.
- Cards use `8px` radius; do not introduce highly rounded pill-card layouts except for small tags.
- Avoid decorative gradient blobs, oversized illustrations, or one-note color palettes.
- Keep text responsive without viewport-scaled fonts. Check mobile for wrapping and horizontal overflow.
- If adding images, put them under `public/assets/` and reference them with absolute paths like `/assets/name.png`.

## Tooling Notes

- Biome formats and lints the repo. Run `npm run format` instead of hand-fixing broad formatting churn.
- `public/posthog.js` is excluded from Biome; do not reformat it casually.
- `tsconfig.json` only includes `src`, so TypeScript checks cover `src/main.ts` rather than inline HTML.
- `public/sitemap.xml`, `public/robots.txt`, and metadata in `index.html` should stay aligned with the production domain.

## Git Workflow

The normal branch is `main`. Push directly to `main` only when the user explicitly asks for it. Otherwise, keep changes local or use the requested branch/PR flow.

Useful checks:

```bash
git status --short --branch
git diff --check
gh run list --repo arc-mcp/arc-1-mcp.com --limit 5
gh api repos/arc-mcp/arc-1-mcp.com/pages
```
