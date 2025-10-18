import eslintPluginAstro from "eslint-plugin-astro"

export default [
  // Global ignores
  {
    ignores: [
      "**/node_modules/**",
      "**/dist/**",
      "**/build/**",
      "**/coverage/**",
      "**/generated/**",
      "**/public/**",
      "**/out/**",
      "**/cache/**",
      "**/eslint.config.js",
      "**/astro.config.mjs",
      "**/pnpm-lock.yaml",
    ],
  },

  // add more generic rule sets here, such as:
  // js.configs.recommended,
  ...eslintPluginAstro.configs.recommended,
  {
    rules: {
      // override/add rules settings here, such as:
      // "astro/no-set-html-directive": "error"
    },
  },
]
