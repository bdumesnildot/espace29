/** @type {import('tailwindcss').Config} */
export default {
  content: ["./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}"],
  theme: {
    extend: {
      fontSize: {
        // Legacy-specific typography scale with embedded weights
        "8xl": ["120px", { lineHeight: "1", fontWeight: "600" }],
        "7xl": ["100px", { lineHeight: "1", fontWeight: "600" }],
        "6xl": ["80px", { lineHeight: "1", fontWeight: "400" }],
        "5xl": ["60px", { lineHeight: "1", fontWeight: "400" }],
        "4xl": ["35px", { lineHeight: "1.2", fontWeight: "400" }],
        "3xl": ["30px", { fontWeight: "400" }],
        "2xl": ["25px", { fontWeight: "400" }],
        xl: ["20px", { fontWeight: "400" }],
        lg: ["15px", { lineHeight: "1.6", fontWeight: "400" }],
      },
    },
  },
  plugins: [],
};
