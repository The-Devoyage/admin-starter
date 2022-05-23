import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: [{ find: "src", replacement: "/src" }],
  },
  server: {
    port: 3333,
    proxy: {
      "/graphql": "http://localhost:5000",
    },
  },
});
