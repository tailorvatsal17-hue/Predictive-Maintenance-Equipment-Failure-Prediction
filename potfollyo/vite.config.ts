import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import path from 'node:path';

export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
    },
  },
  build: {
    target: 'es2022',
    sourcemap: false,
    // Let Rollup auto-split chunks. Forcing Recharts into a shared "charts"
    // chunk meant every page (including the Home page) had to fetch 425 KB
    // of chart code on first paint, even though only 3 lazy routes use it.
    rollupOptions: {
      output: {
        manualChunks(id) {
          if (id.includes('node_modules')) {
            if (id.includes('framer-motion')) return 'motion';
            if (id.includes('react-router')) return 'router';
            if (id.includes('recharts')) return 'charts';
            if (id.includes('react') || id.includes('scheduler')) return 'react';
          }
        },
      },
    },
  },
});


