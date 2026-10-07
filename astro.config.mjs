// @ts-check
import { defineConfig } from "astro/config";
import sitemap from "@astrojs/sitemap";
import tailwindcss from "@tailwindcss/vite";

const siteUrl = "https://etienne-monier.github.io/cours-prive-sainte-therese/";
const siteBase = new URL(siteUrl).pathname.replace(/\/$/, "");

// https://astro.build/config
export default defineConfig({
  site: siteUrl,
  integrations: [
    sitemap({
      // The integration only honors `config.base`, not the subpath in `site`,
      // so re-inject it here. Drop this once a `base` is configured.
      serialize(item) {
        const url = new URL(item.url);
        url.pathname = siteBase + url.pathname;
        item.url = url.href;
        return item;
      },
    }),
  ],
  vite: {
    plugins: [tailwindcss()],
  },
});
