import { defineConfig } from 'vitest/config';
import path from 'node:path';

export default defineConfig({
  test: {
    environment: 'node',
    include: ['src/**/*.test.ts', 'src/**/*.test.tsx'],
    exclude: ['node_modules', 'dist', 'dev'],
    setupFiles: ['./src/test-setup.ts'],
    globals: false,
    reporters: ['default'],
  },
  resolve: {
    alias: { '@': path.resolve(import.meta.dirname, './src') },
  },
});