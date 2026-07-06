/** @type {import('tailwindcss').Config} */
module.exports = {
  presets: [require('./tailwind-preset')],
  darkMode: 'class',
  content: ['./src/**/*.{ts,tsx}', './.storybook/**/*.{ts,tsx}'],
  plugins: [],
};
