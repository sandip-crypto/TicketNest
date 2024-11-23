import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    proxy: {
      "/api/v1/auth": {
        target: "http://localhost:8080", // Backend server URL
        changeOrigin: true, // This is to ensure the origin of the request matches the target
        rewrite: (path) => path.replace(/^\/api\/v1\/auth/, "/api/v1/auth"), // Optionally rewrite the path
      },
    },
  },
});
