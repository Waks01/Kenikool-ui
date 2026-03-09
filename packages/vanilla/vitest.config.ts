import { defineConfig } from 'vitest/config';
import path from 'path';

export default defineConfig({
  test: {
    environment: 'jsdom',
    globals: true,
    coverage: {
      provider: 'v8',
      reporter: ['text', 'json', 'html'],
      lines: 80,
      functions: 80,
      branches: 80,
      statements: 80,
    },
    include: ['src/**/*.test.ts', 'src/**/*.property.test.ts'],
  },
  resolve: {
    alias: {
      '@kenikool/core': path.resolve(__dirname, '../core/src'),
    },
  },
});
