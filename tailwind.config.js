/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './src/**/*.{js,jsx,ts,tsx}',
    './node_modules/@auzmorui/**/*.{js,jsx,ts,tsx}',
  ],
  theme: {
    extend: {
      colors: {
        'black-white': { black: '#000000', white: '#ffffff' },
        primary: {
          50: '#ecfdf5',
          100: '#d1fae5',
          200: '#a7f3d0',
          300: '#6ee7b7',
          400: '#34d399',
          500: '#10b981',
          600: '#059669',
          700: '#047857',
          800: '#065f46',
          900: '#064e3b',
        },
        neutral: {
          50: '#fafafa',
          100: '#f5f5f5',
          200: '#e5e5e5',
          300: '#d4d4d4',
          400: '#a3a3a3',
          500: '#737373',
          600: '#525252',
          700: '#404040',
          800: '#262626',
          900: '#171717',
        },
        social: {
          facebook: '#35518d',
          twitter: '#1da1f2',
          google: '#4284f4',
          dribbble: '#ea4c89',
          github: '#1b1f23',
        },
      },
      fontSize: {
        xxs: '0.625rem',
      },
      fontFamily: { manrope: 'Manrope' },
    },
    plugins: [],
  },
};
