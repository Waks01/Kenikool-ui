import { defineConfig } from 'vite';
import { resolve } from 'path';

export default defineConfig({
  build: {
    lib: {
      entry: resolve(__dirname, 'src/index.ts'),
      name: 'KenikoolVanilla',
      formats: ['es', 'cjs'],
      fileName: (format) => `index.${format === 'es' ? 'mjs' : 'cjs'}`,
    },
    rollupOptions: {
      external: ['@kenikool/core'],
      output: {
        globals: {
          '@kenikool/core': 'KenikoolCore',
        },
      },
    },
    minify: 'esbuild',
    sourcemap: true,
    cssCodeSplit: true,
    cssMinify: true,
  },
  server: {
    middlewareMode: true,
    hmr: {
      protocol: 'ws',
      host: 'localhost',
      port: 5173,
    },
  },
});
