/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      borderRadius: {
        'custom-bottom': '30px 30px 0 0',
      },
    },
  },
  plugins: [],
}

