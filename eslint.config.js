import eslintPluginAstro from "eslint-plugin-astro"
import eslintConfigPrettier from "eslint-config-prettier"
import importPlugin from "eslint-plugin-import"
import tsParser from "@typescript-eslint/parser"

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

  // JavaScript and TypeScript files
  {
    files: ["**/*.{js,jsx}"],
    plugins: {
      import: importPlugin,
    },
    rules: {
      // Enforce single quotes for strings, but allow double quotes to avoid escaping
      quotes: ["error", "single", { avoidEscape: true }],

      // Import/export specific rules
      "import/no-unresolved": "off", // Turn off since we're not configuring module resolution
    },
  },

  // TypeScript files with specific parser
  {
    files: ["**/*.{ts,tsx}"],
    languageOptions: {
      parser: tsParser,
      parserOptions: {
        ecmaVersion: "latest",
        sourceType: "module",
      },
    },
    plugins: {
      import: importPlugin,
    },
    rules: {
      // Enforce single quotes for strings, but allow double quotes to avoid escaping
      quotes: ["error", "single", { avoidEscape: true }],

      // Import/export specific rules
      "import/no-unresolved": "off", // Turn off since we're not configuring module resolution
    },
  },

  {
    rules: {
      // override/add rules settings here, such as:
      // "astro/no-set-html-directive": "error"

      // Enforce single quotes for strings, but allow double quotes to avoid escaping
      quotes: ["error", "single", { avoidEscape: true }],
    },
  },

  // Disable ESLint rules that conflict with Prettier
  eslintConfigPrettier,
]
