// @ts-check
import { defineConfig, fontProviders } from 'astro/config';
import tailwindcss from '@tailwindcss/vite';
import playformCompress from '@playform/compress';
import react from "@astrojs/react";
import vercelServerless from '@astrojs/vercel';

// https://astro.build/config
export default defineConfig({
  prefetch: {
    prefetchAll: false
  },
  vite: {
    css: {
      transformer: "lightningcss"
    },
    build: {
      cssMinify: 'lightningcss'
    },
    plugins: [tailwindcss()]
  },
  integrations: [react(), playformCompress()],
  experimental: {
    fonts: [{
      provider: fontProviders.google(),
      name: "Geist",
      cssVariable: "--font-geist",
      fallbacks: ["Inter", "sans-serif"],
    }]
  },
  base: process.env.NODE_ENV === 'production' ? '/' : '/',
  output: 'server',
  adapter: vercelServerless(),
});