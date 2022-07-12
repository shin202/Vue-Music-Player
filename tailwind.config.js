/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./index.html",
    "./src/**/*.{vue,js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      "textColor": {
        primary: '#0b1945',
        gr: '#80879d',
        secondary: '#264cda',
      },
      "backgroundColor": {
        secondary: '#264CDA',
      }
    },
  },
  plugins: [],
}
