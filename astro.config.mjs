// @ts-check
import { defineConfig } from 'astro/config';

// If you rename the repo to "patrickoo7.github.io", remove `base`.
export default defineConfig({
  site: 'https://patrickoo7.github.io',
  base: '/my-website',
  trailingSlash: 'ignore',
});
