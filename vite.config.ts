import react from "@vitejs/plugin-react";
import path from "path";
import { defineConfig } from "vite";

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  preview: {
    port: 5000,
    strictPort: true,
  },
  server: {
    port: 5000,
    strictPort: true,
    host: true,
    origin: "http://0.0.0.0:5000",
  },
  resolve: {
    alias: [{ find: "@", replacement: path.resolve(__dirname, "src") }],
  },
});
