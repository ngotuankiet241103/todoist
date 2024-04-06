/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      keyframes: {
        fadeIn: {
          '0%': { transform: 'rotate(-3deg)' },
          '50%': { transform: 'rotate(3deg)' },
        }
      },
      colors: {
        "primary": "#DC4C3E",
        "second": "rgb(252,250,248)",
        "secondary": "rgb(74,84,98)",
        "sidebarDark": "rgb(38,38,38)",
        "dark": "#1E1E1E",
        "thirdary": "rgb(214,132,0)",
        "fill": "rgb(255,239,229)"
      }
    },
  },
  plugins: [],
}