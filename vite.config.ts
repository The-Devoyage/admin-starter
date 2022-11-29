import { defineConfig, loadEnv} from 'vite';
import react from '@vitejs/plugin-react';
import { createHtmlPlugin } from 'vite-plugin-html';

export default ({ mode }) => {
  process.env = {...process.env, ...loadEnv(mode, process.cwd())};

  return defineConfig({
    plugins: [react(), 
      createHtmlPlugin({
        entry: 'src/main.tsx',
        template: 'index.html',
        inject: {
          data: {
            title: process.env.VITE_WEB_TITLE,
          },
          tags: [
            {
              injectTo: 'body-prepend',
              tag: 'div',
              attrs: {
                id: 'tag',
              },
            },
          ],
        },
      }),
    ],
    resolve: {
      alias: [{ find: 'src', replacement: '/src' }],
    },
    server: {
      port: 3333,
      proxy: {
        '/graphql': process.env.VITE_GRAPHQL_URL_ID,
        '/media-server': process.env.VITE_MEDIA_SERVER_ID,
      },
    },
  });
}