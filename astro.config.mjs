// @ts-check
import { defineConfig, fontProviders } from 'astro/config';
import playformCompress from '@playform/compress';
import react from "@astrojs/react";
import vercel from '@astrojs/vercel';
import tailwindcss from "@tailwindcss/vite";

// https://astro.build/config
export default defineConfig({
  prefetch: true,
  vite: {
    css: {
      transformer: "lightningcss"
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
  output: 'server',
  adapter: vercel(),
});