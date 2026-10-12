import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
// import path from 'path';

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  // publicDir: path.resolve('../public'),
  // 127.0.0.1:
  server: {
    proxy: {
      '/api': {
        target: 'http://127.0.0.1:8000',
        // target: 'https://app-6ac5a070.deploy.meerasolution.com',
        changeOrigin: true,
      },
      '/img/users': {
        target: 'http://127.0.0.1:8000',
        // target: 'https://app-6ac5a070.deploy.meerasolution.com',
        changeOrigin: true,
      },
    },
  },
});
