import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
// import { resolve } from 'path';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: [
      { find: 'src', replacement: '/src' },
      // {
      //   find: '~bootstrap',
      //   replacement: resolve(__dirname, 'node_modules/bootstrap'),
      // },
    ],
  },
  server: {
    port: 3333,
    proxy: {
      '/graphql': 'http://localhost:5000',
      '/media-server': 'http://localhost:5000',
    },
  },
});
