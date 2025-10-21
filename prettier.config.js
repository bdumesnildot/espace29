/** @type {import("prettier").Config} */
export default {
  // Basic formatting options
  semi: false,
  singleQuote: true,
  tabWidth: 2,
  useTabs: false,
  trailingComma: "es5",
  printWidth: 80,
  endOfLine: "lf",

  // Plugin configuration
  plugins: [
    "prettier-plugin-astro",
    "prettier-plugin-tailwindcss", // Should be last for proper class sorting
  ],

  // File-specific overrides
  overrides: [
    {
      files: "*.astro",
      options: {
        parser: "astro",
        astroAllowShorthand: false,
        singleQuote: false,
      },
    },
    {
      files: [
        "*.ts",
        "*.tsx",
        "*.js",
        "*.jsx",
        "*.mjs",
        "*.cjs",
        "*.js",
        ".yml",
        "*.yaml",
      ],
      options: {
        semi: false,
        singleQuote: false,
      },
    },
    {
      files: "*.json",
      options: {
        printWidth: 120,
      },
    },
    {
      files: "*.md",
      options: {
        printWidth: 100,
        proseWrap: "always",
      },
    },
  ],
}
