import { defineConfig } from 'astro/config';

// Static site. Builds to ./dist — point Cloudflare Pages there.
// Set `site` to your final domain so canonical URLs and RSS (if added) are correct.
export default defineConfig({
  site: 'https://nightcone.co',
  build: { format: 'directory' },
});
