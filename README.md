# Portfolio

Source for [yacoubderradji.dev](https://yacoubderradji.dev), built with [Astro](https://astro.build).

## Editing

- Profile, experience, skills: `src/data/profile.ts`
- Projects: one folder per project in `src/content/projects/<slug>/` (`index.md` + images). The folder name is the URL.
- 3D models: `public/models/<slug>/`, optimized with `npm run model:optimize <in> <out>`
- Flood map data: exported from [ttc-flood-sim](https://github.com/ycouby77/ttc-flood-sim) with `python -m floodsim.export_web`

## Run locally

```bash
npm install
npm run dev
```

## Publishing

Every push to `main` rebuilds the site and deploys it to GitHub Pages (`.github/workflows/deploy.yml`). The URL stays the same.
