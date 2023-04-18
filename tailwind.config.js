/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./src/**/*.{js,jsx,ts,tsx}'],
  theme: {
    extend: {
      width: {
        120: '541px',
        90: '90px',
      },
      spacing: {
        52: '3.25rem',
      },
      color: {
        editorText: '#171717',
      },
      height: {
        56: '56px',
      },
    },
  },
  plugins: [],
};
