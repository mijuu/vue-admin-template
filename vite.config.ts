import path from "path";
import { defineConfig } from "vite";
import vue from "@vitejs/plugin-vue";
import { createHtmlPlugin } from "vite-plugin-html";

function resolve(dir) {
  return path.join(__dirname, dir)
}
const defaultSettings = require("./src/settings.js");
const TITLE = defaultSettings.title || "vue Admin Template"; // page title
const BASE_URL = "/";
const PORT = Number(process.env.port) || Number(process.env.npm_config_port) || 9528; // dev port

// https://vitejs.dev/config/
export default defineConfig({
  base: BASE_URL,
  server: {
    port: PORT,
    open: true,
    
  },
  plugins: [
    vue(),
    createHtmlPlugin({
      minify: false,
      entry: "src/main.js",
      inject: {
        data: {
          TITLE: TITLE,
          BASE_URL: BASE_URL
        },
      },
    }),
  ],
  resolve: {
    alias: {
      "@": resolve("src"),
      "~@": resolve("src"),
    },
  },
  build: {
    rollupOptions: {
      output: {
        manualChunks: {
          vue: ["vue"],
          "element-plus": ["element-plus"],
        },
      },
    },
  },
});
