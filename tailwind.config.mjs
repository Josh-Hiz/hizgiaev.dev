/** @type {import('tailwindcss').Config} */
export default {
    purge: ["./src/pages/**/*.{js,ts,jsx,tsx}", "./src/Components/**/*. {js,ts,jsx,tsx}"],
    content: ['./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}'],
    theme: {
        extend: {},
    },
    plugins: [],
};