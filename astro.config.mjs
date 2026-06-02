// @ts-check
import { defineConfig } from 'astro/config';
import playformCompress from '@playform/compress';
import react from '@astrojs/react';
import vercel from '@astrojs/vercel';
import tailwindcss from '@tailwindcss/vite';

// https://astro.build/config
export default defineConfig({
  prefetch: true,

  // Changed from 'server' → 'static'.
  // Every page in this site is fully static. SSR mode was forcing Vercel to
  // cold-start a serverless function for every request. Static output
  // prerenders everything at build time; individual routes can still opt out
  // with `export const prerender = false` when needed.
  output: 'static',

  vite: {
    css: {
      transformer: 'lightningcss',
    },
    plugins: [tailwindcss()],
  },

  integrations: [
    react(),
    playformCompress(),
  ],

  // Removed: the `fonts` block was pointing at Google Fonts for "Geist",
  // which does not exist there. Geist is Vercel's proprietary font and is
  // pulled via @fontsource packages already. The broken provider was silently
  // falling back to the system sans-serif. Font imports now live in global.css.

  adapter: vercel({
    // Enables Vercel Web Analytics — injects the tracking script on every page.
    // Compatible with @astrojs/vercel ≥ 3.8. No extra package needed.
    webAnalytics: { enabled: true },
  }),
});
