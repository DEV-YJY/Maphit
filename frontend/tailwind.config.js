/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./src/**/*.{js,jsx,ts,tsx}'],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        darkModeBg: '#0A0A0A',
        darkModeTxt: '#E4E6EB',
      },
      fontFamily: {
        margarine: ['Margarine', 'cursive'],
      },
    },
  },
  plugins: [],
}
