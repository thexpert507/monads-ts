// vite.config.js
/// <reference types="vitest" />
import { resolve } from "node:path";
import { defineConfig } from "vite";
import dts from "vite-plugin-dts";

export default defineConfig({
  build: {
    lib: {
      // Could also be a dictionary or array of multiple entry points
      entry: { main: resolve(__dirname, "lib/index.ts") },
      name: "@functional-ts/core",
      formats: ["es", "cjs"],
      fileName: (format, chunk) => {
        if (format === "cjs") return `${format}/${chunk}.cjs`;
        return `${format}/${chunk}.js`;
      },
    },
  },
  plugins: [dts()],
  test: { watch: false },
});
