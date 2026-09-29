# Hosted Resume

Personal resume built with Vite + React + TypeScript, deployed to GitHub Pages.

- Edit content in `src/data/resume.ts` (typed by `src/types.ts`).
- `npm run dev` — local preview at http://localhost:5173
- `npm run build` — production build to `dist/`
- "Download PDF" button (or Cmd+P) produces a print-styled A4 PDF.

Pushing to `main` deploys via `.github/workflows/deploy.yml`
(enable Pages → Source: "GitHub Actions" in the repo settings once).
