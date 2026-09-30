import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

export default defineConfig({
  plugins: [react()],

  // GitHub Pages project-site path
  base: "/Portfolio-Website-Elenavoss/",

  resolve: {
    alias: {
      "@": "/src",
    },
  },

  build: {
    outDir: "dist",
    assetsDir: "assets",
    sourcemap: false,
  },
});
