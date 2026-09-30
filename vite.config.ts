import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// GitHub Pages project-site deployment
export default defineConfig({
  plugins: [react()],

  base: process.env.VITE_BASE_PATH ?? "/Portfolio-Website-Elenavoss/",

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
