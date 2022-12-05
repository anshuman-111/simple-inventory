/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {},
    fontFamily: {
      textMont : 'Montserrat'
    },
    backgroundImage: {
      backg : "url('./assets/bg.avif')"
    }
  },
  plugins: [],
}