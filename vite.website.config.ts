import react from "@vitejs/plugin-react";
import { defineConfig } from "vite";

export default defineConfig({
  base: "/draggable-ui",
  plugins: [react()],
  build: {
    outDir: "docs",
  },
});
