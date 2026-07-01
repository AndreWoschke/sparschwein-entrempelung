import { defineConfig } from "astro/config";
import react from "@astrojs/react";
import tailwind from "@astrojs/tailwind";
import sitemap from "@astrojs/sitemap";

// https://astro.build/config
export default defineConfig({
  site: "https://sparschwein-entruempelung.de",
  output: "static",
  integrations: [
    react(),
    // Reuse the existing tailwind.config.ts / index.css instead of Astro base styles
    tailwind({ applyBaseStyles: false }),
    sitemap(),
  ],
  build: {
    // Match the existing asset layout served by nginx
    assets: "assets",
  },
  // `@/*` alias is picked up automatically from tsconfig.json paths.
});
