import { defineConfig, loadEnv } from 'vite';
import react from '@vitejs/plugin-react';
import { visualizer } from 'rollup-plugin-visualizer';
import { resolve } from 'path';

export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd(), '');
  const enableAnalyzer = env.VITE_ENABLE_BUNDLE_ANALYZER === 'true' || mode === 'analyze';

  return {
    plugins: [
      react(),
      enableAnalyzer && visualizer({
        filename: 'dist/stats.html',
        open: true,
        gzipSize: true,
        brotliSize: true,
      }),
    ].filter(Boolean),

    server: {
      port: 3000,
    },

    build: {
      sourcemap: env.VITE_ENABLE_SOURCE_MAPS === 'true',
      minify: 'terser',
      terserOptions: {
        compress: {
          drop_console: mode === 'production',
          drop_debugger: mode === 'production',
        },
      },
      rollupOptions: {
        maxParallelFileOps: 1,
      },
    },

    resolve: {
      alias: {
        '@': resolve(__dirname, 'src'),
      },
    },

    define: {
      __APP_VERSION__: JSON.stringify(env.VITE_APP_VERSION || '1.0.0'),
    },

    optimizeDeps: {
      include: ['react', 'react-dom', '@mui/material', '@mui/icons-material'],
    },
  };
});
