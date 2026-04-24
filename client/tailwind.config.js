/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        "corn-gold": "#F5C842",
        "husk-green": "#3B5323",
        "silk-cream": "#FAF3E0",
        "burnt-amber": "#C8702A",
        "deep-soil": "#1A1208",
        "soft-white": "#FEFDF8",
        "muted-sage": "#7D9070",
      },
      fontFamily: {
        display: ["Playfair Display", "Georgia", "serif"],
        body: ["Lora", "Georgia", "serif"],
        mono: ["Space Mono", "monospace"],
      },
    },
  },
  plugins: [],
};
