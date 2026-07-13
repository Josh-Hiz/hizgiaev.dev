// @ts-check
import { defineConfig } from 'astro/config';
import react from '@astrojs/react';
import vercel from '@astrojs/vercel';
import playformCompress from '@playform/compress';
import sitemap from '@astrojs/sitemap';
import tailwindcss from '@tailwindcss/vite';
import { unified } from '@astrojs/markdown-remark';
import remarkMath from 'remark-math';
import rehypeKatex from 'rehype-katex';

// https://astro.build/config
export default defineConfig({
  // Required for canonical URLs, sitemap and robots.txt.
  site: 'https://www.hizgiaev.dev',
  prefetch: true,
  output: 'static',

  markdown: {
    processor: unified({
      remarkPlugins: [remarkMath],
      rehypePlugins: [rehypeKatex],
    }),
  },

  vite: {
    css: { transformer: 'lightningcss' },
    plugins: [tailwindcss()],
  },

  integrations: [
    react(),
    sitemap(),
    // csso (used by this integration) can't parse Tailwind v4's media-query
    // range syntax `@media (width >= 40rem)` and silently drops those rules,
    // which kills every responsive utility. Vite/lightningcss already minifies
    // CSS, so leave CSS to it and let this handle the rest.
    playformCompress({ CSS: false }),
  ],

  adapter: vercel({
    webAnalytics: { enabled: true },
  }),
});
