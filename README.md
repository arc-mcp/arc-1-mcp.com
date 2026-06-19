# ARC-1 product site

Landing page for [arc-1-mcp.com](https://arc-1-mcp.com/), published with GitHub Pages.

## Development

```bash
npm ci
npm run dev
```

## Checks

```bash
npm run lint
npm run build
```

## Deployment

Pushes to `main` run `.github/workflows/deploy.yml`, build the static site with Vite, and publish `dist/` to GitHub Pages.
