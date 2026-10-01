import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import { TanStackRouterVite } from "@tanstack/router-plugin/vite";
import path from "path";
import tailwindcss from '@tailwindcss/vite';

const projectRoot = process.cwd();

export default defineConfig({
  root: "src",
  server: {
    proxy: {
      "/api": {
        target: "http://localhost:3000",
        changeOrigin: true,
      },
      "/public": {
        target: "http://localhost:3000",
        changeOrigin: true,
      },
    },
  },
  test: {
  environment: "happy-dom",
},
  plugins: [
    TanStackRouterVite({
      routesDirectory: path.resolve(projectRoot, "src/routes"),
      generatedRouteTree: path.resolve(projectRoot, "src/routeTree.gen.ts"),
    }),
    react(),
    tailwindcss(),
  ],
});