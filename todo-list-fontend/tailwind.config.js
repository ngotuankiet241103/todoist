/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        "primary": "#DC4C3E",
        "second": "rgb(252,250,248)",
        "fill": "rgb(255,239,229)"
      }
    },
  },
  plugins: [],
}