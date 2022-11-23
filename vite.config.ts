import { defineConfig, loadEnv} from 'vite';
import react from '@vitejs/plugin-react';
import { createHtmlPlugin } from 'vite-plugin-html';

// https://vitejs.dev/config/

export default ({ mode }) => {
  process.env = {...process.env, ...loadEnv(mode, process.cwd())};


  return defineConfig({
    plugins: [react(), 
      createHtmlPlugin({
        minify: true,
        /**
         * After writing entry here, you will not need to add script tags in `index.html`, the original tags need to be deleted
         * @default src/main.ts
         */
        entry: 'src/main.tsx',
        /**
         * If you want to store `index.html` in the specified folder, you can modify it, otherwise no configuration is required
         * @default index.html
         */
        template: 'index.html',

        /**
         * Data that needs to be injected into the index.html ejs template
         */
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
        '/graphql': 'http://localhost:5000',
        '/media-server': 'http://localhost:5000',
      },
    },
  });
}

