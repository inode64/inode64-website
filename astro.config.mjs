import { defineConfig } from "astro/config";
import tailwindcss from "@tailwindcss/vite";
import robotsTxt from "astro-robots-txt";
import sitemap from "@astrojs/sitemap";

export default defineConfig({
  site: "https://inode64.com",
  compressHTML: true,
  vite: {
    plugins: [tailwindcss()],
  },

  integrations: [
    robotsTxt(),
    sitemap({
      filter: (page) => !page.endsWith("/blog/") && !page.endsWith("/contact/success/"),
    }),
  ],
});
