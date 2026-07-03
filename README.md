# amanparganiha.github.io

Personal portfolio of **Aman Parganiha** — AI & Software Engineer.
Live at **[amanparganiha.github.io](https://amanparganiha.github.io)**.

## Stack

- **Vite 5 + React 18 + TypeScript**, styled with **Tailwind CSS** and shadcn/ui
- **react-router-dom** (BrowserRouter) with a [spa-github-pages](https://github.com/rafgraph/spa-github-pages) 404 fallback for deep links on GitHub Pages
- **framer-motion** animations, **TanStack Query** for live GitHub data
- **MediaPipe** hand tracking powering the in-browser [Air Canvas demo](https://amanparganiha.github.io/projects/air-canvas)

## Development

```sh
npm install
npm run dev        # local dev server
npm run build      # production build (runs gen:feed first)
npm run preview    # serve the production build locally
npm run test       # vitest
npm run gen:feed   # regenerate public/sitemap.xml + public/rss.xml
npx tsc -p tsconfig.app.json --noEmit   # typecheck (vite build does not)
```

## Content

Nearly all site copy lives in **`src/data/portfolio.ts`** (bio, stats, experience,
education, skills, certifications, projects, open-source highlights).

Blog posts are markdown files in **`src/content/posts/`** — drop in a new `.md`
file with frontmatter and it is published automatically on the next push. See
[`src/content/posts/README.md`](src/content/posts/README.md) for the format.

## Deployment

Pushing to `main` triggers the GitHub Actions workflow
(`.github/workflows/deploy.yml`), which builds the site and deploys it to
GitHub Pages. The `prebuild` step regenerates the sitemap and RSS feed from the
blog posts.
