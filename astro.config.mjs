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

	redirects: {
    "/admin": "/admin/index.html",
  },
	
	env: {
		schema: {
			SITE_URL: envField.string({ context: "client", access: "public", optional: true }),
			// TinaCMS variables
			PUBLIC_TINA_CLIENT_ID: envField.string({ context: "client", access: "public" }),
			TINA_TOKEN: envField.string({ context: "server", access: "secret" }),
			TINA_SEARCH_TOKEN: envField.string({ context: "server", access: "secret" }),
			GITHUB_BRANCH: envField.string({ context: "server", access: "secret", optional: true  }),
			// Mailgun variables
			MAILGUN_DOMAIN: envField.string({ context: "server", access: "secret"}),
			MAILGUN_USERNAME: envField.string({ context: "server", access: "secret" }),
			MAILGUN_API_KEY: envField.string({ context: "server", access: "secret" }),
			MAILGUN_URL: envField.string({ context: "server", access: "secret" }),
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
