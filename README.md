# Arena Tech

Portfolio website for **Arena Tech** — product design team showcase with case studies, editorial layouts, and motion-driven presentation pages.

## Stack

- Next.js (App Router)
- TypeScript
- GSAP + Lenis
- pnpm

## Development

```bash
pnpm install
pnpm dev:3002
```

Open [http://localhost:3002](http://localhost:3002).

## Scripts

| Command | Description |
|---------|-------------|
| `pnpm dev` | Start dev server (port 3000) |
| `pnpm dev:3002` | Start dev server on port 3002 |
| `pnpm build` | Production build |
| `pnpm lint` | ESLint |
| `pnpm typecheck` | TypeScript check |
| `pnpm images:webp` | Convert `public/assets` PNG/JPEG to WebP (requires `sharp`) |

## Assets

Raster images in `public/assets` are stored as **WebP** (`quality: 82`). SVG and font files stay as-is.

To convert new PNG/JPEG assets:

```bash
pnpm add -D sharp
pnpm images:webp
node scripts/remove-legacy-images.mjs
```

Then update imports/paths in `data/`, `components/`, and `app/globals.css` to `.webp`.

## Structure

- `app/` — routes and global styles
- `components/` — UI and case study presentations
- `data/case-studies.ts` — case metadata and covers
- `public/assets/images/` — optimized image assets

## Deploy

Standard Next.js deployment (Vercel or any Node host):

```bash
pnpm build
pnpm start
```
