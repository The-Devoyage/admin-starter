import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: [{ find: 'src', replacement: '/src' }],
  },
  server: {
    port: 3333,
    host: true,
    proxy: {
      '/graphql': 'http://gateway:5000',
      '/media-server': 'http://gateway:5000',
    },
  },
});
