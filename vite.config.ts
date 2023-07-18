import { defineConfig } from "vite";
import vitePluginString from "vite-plugin-string";

export default defineConfig({
  build: {
    // assetsInlineLimit: 40000
  },
  plugins: [
    // @ts-expect-error
    vitePluginString({
      include: ["**/*.html"],
      compress(code) {
        return code
      }
    })
  ]
})