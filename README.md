# timniven.com

Astro static site. All content lives in `src/data/posts.json` (migrated from
the old Jekyll-built HTML) plus `src/pages/about.astro` and
`src/pages/publications.astro`.

## Local development (Docker — no local Node install needed)

```bash
docker compose up dev
```

Visit http://localhost:4321/. Source files are bind-mounted, so edits are
picked up live.

## Production build

```bash
docker compose run --rm build
```

Output goes to `dist/`.

## Without Docker

Requires Node 18.20+/20.3+/22+.

```bash
npm install
npm run dev      # dev server
npm run build    # -> dist/
```
