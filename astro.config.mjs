// @ts-check
import { defineConfig, envField } from "astro/config";
import tailwindcss from "@tailwindcss/vite"

const { APP_BASE_URL } = process.env

// https://astro.build/config
export default defineConfig({
  site: APP_BASE_URL,
  compressHTML: true,
  build: {
    inlineStylesheets: "auto",
  },
  vite: {
    build: {
      assetsInlineLimit: 0,
    },
    plugins: [tailwindcss()],
  },
  env: {
    schema: {
      APP_BASE_URL: envField.string({ context: "server", access: "public"}),
    }
  }
})
