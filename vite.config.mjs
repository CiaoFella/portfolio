import { defineConfig } from 'vite'
import glsl from 'vite-plugin-glsl'
import babel from 'vite-plugin-babel'

// vite.config.js
export default defineConfig({
  plugins: [glsl(), babel()],
  server: {
    host: 'localhost',
    port: 3000,
    cors: '*',
    hmr: {
      host: 'localhost',
      protocol: 'ws',
    },
  },
  build: {
    minify: true,
    manifest: true,
    rollupOptions: {
      input: './src/main.js',
      output: {
        inlineDynamicImports: true,
        format: 'umd',
        entryFileNames: 'main.js',
        esModule: false,
        compact: true,
        globals: {
          jquery: '$',
        },
      },
      external: ['jquery'],
    },
  },
})
