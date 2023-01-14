// eslint-disable-next-line @typescript-eslint/no-var-requires
const colors = require('tailwindcss/colors');

/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      width: {
        'sidebar': '22.5%',
        'main-screen': '77.5%',
      },
      backgroundImage: {
        'auth-image': "url('/assets/auth-image.png')",
      },
      boxShadow: {
        'dark': '2px 3px 3px 3px rgba(0, 0, 0, 0.2)',
        'landing-box': '1px 5px 5px 5px rgba(0, 0, 0, 0.2)'
      },
      fontFamily: {
        'sans': ['ui-sans-serif', 'system-ui'],
        'serif': ['ui-serif', 'Georgia'],
        'pacifico': ["'Pacifico', cursive"],
        'nunito': ["'Nunito Sans', sans-serif"],
        'raleway': ["'Raleway', sans-serif"],
      },
    },
    colors: {
      'white': colors.white,
      'transparent': colors.transparent,
      'black': colors.black,
      'slate': colors.slate,
      'beige': {
        700: '#83622A',
        600: '#AA8B56',
        500: '#CFAF78',
        400: '#D5CEA3',
        300: '#E5E0BD',
        200: '#F4EFCC'
      },
      'green': {
        700: '#395144',
        600: '#4E6C50'
      },
      'red': {
        700: "#941D1D",
      }
    },
  },
  plugins: [],
};
