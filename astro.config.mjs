// @ts-check
import { defineConfig, envField } from 'astro/config';
import mdx from '@astrojs/mdx';
import sitemap from '@astrojs/sitemap';
import react from '@astrojs/react';
import tinaDirective from "./astro-tina-directive/register"
import tailwindcss from "@tailwindcss/vite"
import vercel from "@astrojs/vercel/static"


// https://astro.build/config
export default defineConfig({
	site: process.env.SITE_URL || `https://${process.env.VERCEL_URL}`,
	
	env: {
		schema: {
			SITE_URL: envField.string({ context: "client", access: "public", optional: true }),
			PUBLIC_TINA_CLIENT_ID: envField.string({ context: "client", access: "public" }),
			TINA_TOKEN: envField.string({ context: "server", access: "secret" }),
			TINA_SEARCH_TOKEN: envField.string({ context: "server", access: "secret" }),
		},
	},

	integrations: [mdx(), sitemap(), react(), tinaDirective()],

	vite: {
    build: {
      assetsInlineLimit: 0,
    },
    plugins: [tailwindcss()],
  },

	output: "static",
  adapter: vercel({
    webAnalytics: {
      enabled: true,
    },
  }),
});
