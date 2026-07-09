// @ts-check
import { defineConfig } from 'astro/config';
import react from '@astrojs/react';
import vercel from '@astrojs/vercel';
import playformCompress from '@playform/compress';
import tailwindcss from '@tailwindcss/vite';
import { unified } from '@astrojs/markdown-remark';
import remarkMath from 'remark-math';
import rehypeKatex from 'rehype-katex';

// https://astro.build/config
export default defineConfig({
  prefetch: true,
  output: 'static',

  // Astro 7's default Markdown engine (Sätteri) doesn't run remark/rehype
  // plugins. The unified() processor keeps the classic remark pipeline the
  // existing posts were written against and enables LaTeX math via KaTeX.
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

  integrations: [react(), playformCompress()],

  adapter: vercel({
    webAnalytics: { enabled: true },
  }),
});
