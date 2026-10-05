// vite.config.js
import { defineConfig } from "file:///C:/Users/hp/Documents/BelajarReact/Padre-ginos/node_modules/vite/dist/node/index.js";
import react from "file:///C:/Users/hp/Documents/BelajarReact/Padre-ginos/node_modules/@vitejs/plugin-react/dist/index.js";
import { TanStackRouterVite } from "file:///C:/Users/hp/Documents/BelajarReact/Padre-ginos/node_modules/@tanstack/router-plugin/dist/esm/vite.js";
import path from "path";
import tailwindcss from "file:///C:/Users/hp/Documents/BelajarReact/Padre-ginos/node_modules/@tailwindcss/vite/dist/index.mjs";
var projectRoot = process.cwd();
var vite_config_default = defineConfig({
  root: "src",
  server: {
    proxy: {
      "/api": {
        target: "http://localhost:3000",
        changeOrigin: true
      },
      "/public": {
        target: "http://localhost:3000",
        changeOrigin: true
      }
    }
  },
  test: {
    environment: "happy-dom"
  },
  plugins: [
    TanStackRouterVite({
      routesDirectory: path.resolve(projectRoot, "src/routes"),
      generatedRouteTree: path.resolve(projectRoot, "src/routeTree.gen.ts")
    }),
    react(),
    tailwindcss()
  ]
});
export {
  vite_config_default as default
};
//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAic291cmNlcyI6IFsidml0ZS5jb25maWcuanMiXSwKICAic291cmNlc0NvbnRlbnQiOiBbImNvbnN0IF9fdml0ZV9pbmplY3RlZF9vcmlnaW5hbF9kaXJuYW1lID0gXCJDOlxcXFxVc2Vyc1xcXFxocFxcXFxEb2N1bWVudHNcXFxcQmVsYWphclJlYWN0XFxcXFBhZHJlLWdpbm9zXCI7Y29uc3QgX192aXRlX2luamVjdGVkX29yaWdpbmFsX2ZpbGVuYW1lID0gXCJDOlxcXFxVc2Vyc1xcXFxocFxcXFxEb2N1bWVudHNcXFxcQmVsYWphclJlYWN0XFxcXFBhZHJlLWdpbm9zXFxcXHZpdGUuY29uZmlnLmpzXCI7Y29uc3QgX192aXRlX2luamVjdGVkX29yaWdpbmFsX2ltcG9ydF9tZXRhX3VybCA9IFwiZmlsZTovLy9DOi9Vc2Vycy9ocC9Eb2N1bWVudHMvQmVsYWphclJlYWN0L1BhZHJlLWdpbm9zL3ZpdGUuY29uZmlnLmpzXCI7aW1wb3J0IHsgZGVmaW5lQ29uZmlnIH0gZnJvbSBcInZpdGVcIjtcclxuaW1wb3J0IHJlYWN0IGZyb20gXCJAdml0ZWpzL3BsdWdpbi1yZWFjdFwiO1xyXG5pbXBvcnQgeyBUYW5TdGFja1JvdXRlclZpdGUgfSBmcm9tIFwiQHRhbnN0YWNrL3JvdXRlci1wbHVnaW4vdml0ZVwiO1xyXG5pbXBvcnQgcGF0aCBmcm9tIFwicGF0aFwiO1xyXG5pbXBvcnQgdGFpbHdpbmRjc3MgZnJvbSAnQHRhaWx3aW5kY3NzL3ZpdGUnO1xyXG5cclxuY29uc3QgcHJvamVjdFJvb3QgPSBwcm9jZXNzLmN3ZCgpO1xyXG5cclxuZXhwb3J0IGRlZmF1bHQgZGVmaW5lQ29uZmlnKHtcclxuICByb290OiBcInNyY1wiLFxyXG4gIHNlcnZlcjoge1xyXG4gICAgcHJveHk6IHtcclxuICAgICAgXCIvYXBpXCI6IHtcclxuICAgICAgICB0YXJnZXQ6IFwiaHR0cDovL2xvY2FsaG9zdDozMDAwXCIsXHJcbiAgICAgICAgY2hhbmdlT3JpZ2luOiB0cnVlLFxyXG4gICAgICB9LFxyXG4gICAgICBcIi9wdWJsaWNcIjoge1xyXG4gICAgICAgIHRhcmdldDogXCJodHRwOi8vbG9jYWxob3N0OjMwMDBcIixcclxuICAgICAgICBjaGFuZ2VPcmlnaW46IHRydWUsXHJcbiAgICAgIH0sXHJcbiAgICB9LFxyXG4gIH0sXHJcbiAgdGVzdDoge1xyXG4gIGVudmlyb25tZW50OiBcImhhcHB5LWRvbVwiLFxyXG59LFxyXG4gIHBsdWdpbnM6IFtcclxuICAgIFRhblN0YWNrUm91dGVyVml0ZSh7XHJcbiAgICAgIHJvdXRlc0RpcmVjdG9yeTogcGF0aC5yZXNvbHZlKHByb2plY3RSb290LCBcInNyYy9yb3V0ZXNcIiksXHJcbiAgICAgIGdlbmVyYXRlZFJvdXRlVHJlZTogcGF0aC5yZXNvbHZlKHByb2plY3RSb290LCBcInNyYy9yb3V0ZVRyZWUuZ2VuLnRzXCIpLFxyXG4gICAgfSksXHJcbiAgICByZWFjdCgpLFxyXG4gICAgdGFpbHdpbmRjc3MoKSxcclxuICBdLFxyXG59KTsiXSwKICAibWFwcGluZ3MiOiAiO0FBQXdVLFNBQVMsb0JBQW9CO0FBQ3JXLE9BQU8sV0FBVztBQUNsQixTQUFTLDBCQUEwQjtBQUNuQyxPQUFPLFVBQVU7QUFDakIsT0FBTyxpQkFBaUI7QUFFeEIsSUFBTSxjQUFjLFFBQVEsSUFBSTtBQUVoQyxJQUFPLHNCQUFRLGFBQWE7QUFBQSxFQUMxQixNQUFNO0FBQUEsRUFDTixRQUFRO0FBQUEsSUFDTixPQUFPO0FBQUEsTUFDTCxRQUFRO0FBQUEsUUFDTixRQUFRO0FBQUEsUUFDUixjQUFjO0FBQUEsTUFDaEI7QUFBQSxNQUNBLFdBQVc7QUFBQSxRQUNULFFBQVE7QUFBQSxRQUNSLGNBQWM7QUFBQSxNQUNoQjtBQUFBLElBQ0Y7QUFBQSxFQUNGO0FBQUEsRUFDQSxNQUFNO0FBQUEsSUFDTixhQUFhO0FBQUEsRUFDZjtBQUFBLEVBQ0UsU0FBUztBQUFBLElBQ1AsbUJBQW1CO0FBQUEsTUFDakIsaUJBQWlCLEtBQUssUUFBUSxhQUFhLFlBQVk7QUFBQSxNQUN2RCxvQkFBb0IsS0FBSyxRQUFRLGFBQWEsc0JBQXNCO0FBQUEsSUFDdEUsQ0FBQztBQUFBLElBQ0QsTUFBTTtBQUFBLElBQ04sWUFBWTtBQUFBLEVBQ2Q7QUFDRixDQUFDOyIsCiAgIm5hbWVzIjogW10KfQo=
