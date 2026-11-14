// @ts-check
import { defineConfig } from 'astro/config';

import mdx from '@astrojs/mdx';

export default defineConfig({
  // Published by .github/workflows/deploy.yml to GitHub Pages.
  site: 'https://yacoubderradji.dev',

  integrations: [mdx()],
});