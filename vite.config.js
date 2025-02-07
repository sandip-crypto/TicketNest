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
      "/api/v1/movie": {
        target: "http://localhost:8080",
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/api\/v1\/movie/, "/api/v1/movie"),
      },
      "/api/v1/grocery": {
        target: "http://localhost:8080",
        changeOrigin: true,
        rewrite: (path) =>
          path.replace(/^\/api\/v1\/grocery/, "/api/v1/grocery"),
      },
      "/api/v1/event": {
        target: "http://localhost:8080",
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/api\/v1\/event/, "/api/v1/event"),
      },
      "/api/v1/contact": {
        target: "http://localhost:8080",
        changeOrigin: true,
        rewrite: (path) =>
          path.replace(/^\/api\/v1\/contact/, "/api/v1/contact"),
      },
      "/api/v1/booking": {
        target: "http://localhost:8080",
        changeOrigin: true,
        rewrite: (path) =>
          path.replace(/^\/api\/v1\/booking/, "/api/v1/booking"),
      },
      "/api/v1/concert": {
        target: "http://localhost:8080",
        changeOrigin: true,
        rewrite: (path) =>
          path.replace(/^\/api\/v1\/concert/, "/api/v1/concert"),
      },
      "/api/v1/payment": {
        target: "http://localhost:8080",
        changeOrigin: true,
        rewrite: (path) =>
          path.replace(/^\/api\/v1\/payment/, "/api/v1/payment"),
      },
      "/api/v1/transaction": {
        target: "http://localhost:8080",
        changeOrigin: true,
        rewrite: (path) =>
          path.replace(/^\/api\/v1\/transaction/, "/api/v1/transaction"),
      },
      "/api/v1/search": {
        target: "http://localhost:8080",
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/api\/v1\/search/, "/api/v1/search"),
      },
      "/api/v1/event-transaction": {
        target: "http://localhost:8080",
        changeOrigin: true,
        rewrite: (path) =>
          path.replace(
            /^\/api\/v1\/event-transaction/,
            "/api/v1/event-transaction"
          ),
      },
      "/api/v1/concert-transaction": {
        target: "http://localhost:8080",
        changeOrigin: true,
        rewrite: (path) =>
          path.replace(
            /^\/api\/v1\/concert-transaction/,
            "/api/v1/concert-transaction"
          ),
      },
    },
  },
});
