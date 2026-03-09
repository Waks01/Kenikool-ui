import { defineConfig } from 'vitest/config';
import path from 'path';

export default defineConfig({
  test: {
    // Use jsdom environment for DOM testing
    environment: 'jsdom',

    // Global test setup
    globals: true,

    // Setup files
    setupFiles: ['./vitest.setup.ts'],

    // Coverage configuration
    coverage: {
      provider: 'v8',
      reporter: ['text', 'json', 'html', 'lcov'],
      exclude: [
        'node_modules/',
        'dist/',
        'packages/*/dist/',
        '**/*.config.ts',
        '**/*.d.ts',
        '**/index.ts',
      ],
      // 80% minimum coverage thresholds
      lines: 80,
      functions: 80,
      branches: 80,
      statements: 80,
    },

    // Test file patterns
    include: ['**/*.test.ts', '**/*.test.tsx', '**/*.property.test.ts', '**/*.property.test.tsx'],

    // Exclude patterns
    exclude: ['node_modules', 'dist', '.idea', '.git', '.cache', 'packages/*/dist'],

    // Test timeout
    testTimeout: 10000,

    // Hook timeout
    hookTimeout: 10000,
  },

  resolve: {
    alias: {
      '@kenikool/core': path.resolve(__dirname, './packages/core/src'),
      '@kenikool/vanilla': path.resolve(__dirname, './packages/vanilla/src'),
      '@kenikool/react': path.resolve(__dirname, './packages/react/src'),
    },
  },
});
