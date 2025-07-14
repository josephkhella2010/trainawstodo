import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  build: {
    outDir: "build", // 👈 tells Vite to output to ./build
  },
  server: {
    watch: {
      usePolling: true,
    },
  },
});
