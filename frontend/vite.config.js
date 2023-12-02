import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// https://vitejs.dev/config/
export default defineConfig({
  build: {
    outDir: "../backend/gignation/API/wwwroot",
  },
  plugins: [react()],
  server: {
    port: 3000,
    https: false,
  },
});
