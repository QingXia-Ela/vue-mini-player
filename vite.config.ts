import { defineConfig } from 'vite'

export default defineConfig({
  // ...
  build: {
    assetsDir: './',
    rollupOptions: {
      output: {
        assetFileNames: "[name][extname]",
        entryFileNames: `[name].js`,
        chunkFileNames: `[name].js`,
      },
    },
    emptyOutDir: true
  },
})
