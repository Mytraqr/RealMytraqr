/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  darkMode: 'class',
  theme: {
    extend: {},
  },
  plugins: [],
  safelist: [
    { pattern: /bg-(orange|cyan)-(100|500|600|700)/ },
    { pattern: /text-(orange|cyan)-(500|600|700)/ },
    { pattern: /ring-(orange|cyan)-600/ },
  ]
};