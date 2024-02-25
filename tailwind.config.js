/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primaryColor: '#ff5a5e',
        secondaryColor: '#fe999c',
      },
    },
  },
  plugins: [],
}

