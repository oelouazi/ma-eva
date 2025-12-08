import adapter from '@sveltejs/adapter-static';
import { vitePreprocess } from '@sveltejs/vite-plugin-svelte';

export default {
  preprocess: vitePreprocess(),
  kit: {
      adapter: adapter(),
      paths: { base: '/ma-eva' },
    prerender: { entries: ['*'] } // génère /index.html, /galerie/index.html, /poesies/index.html
    // trailingSlash: 'always' // optionnel, aide parfois sur Pages
  }
};
