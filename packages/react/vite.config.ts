import { defineConfig } from 'vite';
import { resolve } from 'path';

export default defineConfig({
  build: {
    lib: {
      entry: resolve(__dirname, 'src/index.ts'),
      name: 'KenikoolReact',
      formats: ['es', 'cjs'],
      fileName: (format) => `index.${format === 'es' ? 'mjs' : 'cjs'}`,
    },
    rollupOptions: {
      external: ['react', 'react-dom', '@kenikool/core'],
      output: {
        globals: {
          react: 'React',
          'react-dom': 'ReactDOM',
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
