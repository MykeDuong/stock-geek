// eslint-disable-next-line @typescript-eslint/no-var-requires
const colors = require('tailwindcss/colors');

/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      backgroundImage: {
        'workdesk': "url('/images/workdesk.jpeg')",
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
      'coffee': {
        900: '#1A120B',
        700: '#3C2A21',
        600: '#562B08',
        400: "#AA8B56",
        300: '#D5CEA3',
        100: '#E5E5CB',
      },
      'green': {
        700: '#395144',
        600: '#4E6C50'
      }
    },
  },
  plugins: [],
};
