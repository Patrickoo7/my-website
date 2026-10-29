# my-website

Personal portfolio for **Prateek Awate**: AI engineer and quantum computing researcher.
Built with [Astro](https://astro.build) and vanilla Canvas/CSS animations, deployed to GitHub Pages.

Live: https://patrickoo7.github.io/my-website/

## Run locally

```bash
npm install
npm run dev       # http://localhost:4321/my-website/
npm run build     # static output in dist/
```

## Editing content

| What | Where |
| --- | --- |
| Name, bio, links, skills, stats, education | `src/data/profile.ts` |
| Projects | `src/content/projects/*.md` (one file per project) |
| Publications | `src/content/publications/*.md` |
| Experience timeline | `src/content/experience/*.md` |
| Resume / CV / photo | `public/resume.pdf`, `public/cv.pdf`, `public/profile.jpg` |
| News list and "open to" line on the home page | `src/data/profile.ts` (`news`, `openTo`) |

To add a project, copy an existing `.md` file in `src/content/projects/` and edit its front-matter.

## Deploying

`.github/workflows/deploy.yml` builds and deploys on every push to `main`.
One-time setup: **Settings → Pages → Source: GitHub Actions**.

If you rename the repo to `patrickoo7.github.io`, remove `base` from `astro.config.mjs`.

## Visual elements

- `QubitCanvas`: animated particle background in the home page hero
- `BlochSphere`: interactive Bloch sphere on the About page
- `CircuitDivider`: section dividers drawn as quantum circuits
- `/qec`: interactive note on surface code decoding (logic in `src/scripts/surfaceCode.ts`), linked from the Research page

All animations pause off-screen and respect `prefers-reduced-motion`.
