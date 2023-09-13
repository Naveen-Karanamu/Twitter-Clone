/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      colors:{
        blueT:{
          100:"#1d9bf0",
        }
      }
    },
  },
  plugins: [],
}