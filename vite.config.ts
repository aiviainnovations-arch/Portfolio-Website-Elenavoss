import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// Base path is set for GitHub Pages project-site hosting, e.g.
// https://<username>.github.io/<repo-name>/
// Override with the VITE_BASE_PATH env var for other hosting targets.
export default defineConfig({
  plugins: [react()],
  base: process.env.VITE_BASE_PATH ?? "/",
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
