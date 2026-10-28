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

To add a project, copy an existing `.md` file in `src/content/projects/` and edit its front-matter.

## Deploying

`.github/workflows/deploy.yml` builds and deploys on every push to `main`.
One-time setup: **Settings → Pages → Source: GitHub Actions**.

If you rename the repo to `patrickoo7.github.io`, remove `base` from `astro.config.mjs`.

## Quantum touches

- `QubitCanvas`: drifting qubits with entanglement lines, reacting to the cursor
- `BlochSphere`: a precessing qubit you can click to measure (Born-rule collapse)
- `CircuitDivider`: section dividers drawn as quantum circuits that light up on scroll
- Bra-ket nav and labels, and a "superposition" hover on project cards

All animations pause off-screen and respect `prefers-reduced-motion`.
