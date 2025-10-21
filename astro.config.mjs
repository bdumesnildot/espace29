import { defineConfig, envField } from "astro/config"
import dotenv from "dotenv"
import tailwindcss from "@tailwindcss/vite"
import vercel from "@astrojs/vercel/static"

dotenv.config()
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
    schema: {},
  },

  image: {
    domains: ["picsum.photos"],
    remotePatterns: [{ protocol: "https" }],
  },

  output: "static",
  adapter: vercel({
    webAnalytics: {
      enabled: false,
    },
  }),
})
