// @ts-check
import { defineConfig } from "astro/config";
import sitemap from "@astrojs/sitemap";
import tailwindcss from "@tailwindcss/vite";

const siteUrl = "https://etienne-monier.github.io/cours-prive-sainte-therese/";

// https://astro.build/config
export default defineConfig({
  site: siteUrl,
  // GitHub Pages project site: served under a subpath. Without this, Astro
  // emits asset/link URLs from the domain root and everything 404s.
  // Remove it when the site moves to a domain root (custom domain).
  base: "/cours-prive-sainte-therese",
  integrations: [sitemap()],
  vite: {
    plugins: [tailwindcss()],
  },
});
