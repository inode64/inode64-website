// @ts-check
import { defineConfig } from "astro/config";
import tailwindcss from "@tailwindcss/vite";
import robotsTxt from "astro-robots-txt";
import sitemap from "@astrojs/sitemap";
import htaccessIntegration from "astro-htaccess";

import mdx from "@astrojs/mdx";

// https://astro.build/config
export default defineConfig({
  site: "https://inode64.com",
  vite: {
    plugins: [tailwindcss()],
  },

  integrations: [
    robotsTxt(),
    sitemap(),
    mdx(),
    htaccessIntegration({
      generateHtaccessFile: import.meta.env.GENERATE_HTACCESS_FILE === "true",
      errorPages: [{ code: 404, document: "/404.html" }],
      redirects: [{ match: /^\/tienda/, url: "https://www.npmjs.com/package/astro-htaccess" }],
    }),
  ],
});
