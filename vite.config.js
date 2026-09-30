import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

//defineConfig digunakan untuk memberikan konfigurasi pada Vite. 
// Plugin React digunakan untuk mendukung pengembangan aplikasi React dengan Vite.

export default defineConfig({
  plugins: [react()],
});