# Aakash Thakkar · Online Resume

Single-page resume built with Vite, React and TypeScript from a Claude Design handoff,
deployed to GitHub Pages: https://aakash2000.github.io/resume_aakash_thakkar/

Two profiles (Robotics / HMI and Platform / Web) in English and German, with dark and
light themes. Each version has its own link: `?profile=platform&lang=de`.

## Develop

```bash
npm install
npm run dev      # http://localhost:5173
npm run build    # type-check + production build to dist/
npm run lint
```

Pushing to `main` deploys via `.github/workflows/deploy.yml`.

## Where things live

| Path | What |
| --- | --- |
| `src/content/resume.ts` | All resume content (EN/DE, both profiles). Types in `types.ts`. |
| `src/content/uiStrings.ts` | Interface labels per language. |
| `public/resume/*.pdf` | Ready-made PDFs for the download button, mapped in `resume.pdfs`. The button is hidden where no PDF exists. |
| `public/headshot.jpg` | Optional photo; set `headshot: 'headshot.jpg'` in `resume.ts`. Initials are shown otherwise. |
| `src/styles/` | Design tokens (Nocturne, dark + light), globals, keyframes, print. |
| `src/ui/` | Generic primitives: Button, SegmentedControl, Tag, Avatar. |
| `src/components/` | Page sections: Header, Hero, Signature, Summary, Timeline, Skills, Footer. |
| `src/hooks/`, `src/lib/` | Theme, URL state, scroll/reveal/tween animation helpers. |

All motion respects `prefers-reduced-motion`. Printing (Cmd+P) uses an A4 print stylesheet.
