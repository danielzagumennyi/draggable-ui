import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import { visualizer } from "rollup-plugin-visualizer";
import dts from "vite-plugin-dts";
import { resolve } from "path";

export default defineConfig({
  plugins: [
    react(),
    dts({
      include: "src",
    }),
    visualizer({
      gzipSize: true,
      brotliSize: true,
    }),
  ],
  build: {
    copyPublicDir: false,

    lib: {
      entry: resolve(__dirname, "src/index.ts"),
      formats: ["es"],
    },

    rollupOptions: {
      external: ["react", "react-dom", "react/jsx-runtime"],

      output: {
        assetFileNames: "assets/[name][extname]",
        entryFileNames: "[name].js",
      },
    },
  },
});
