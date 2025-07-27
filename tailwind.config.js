/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
    "./src/**/*.tsx",  // Add this line specifically
  ],
  theme: {
    extend: {},
  },
  plugins: [],
}