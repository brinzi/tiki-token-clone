const { colors: defaultColors } = require('tailwindcss/defaultTheme')


module.exports = {
  mode: 'jit',
  purge: ['./pages/**/*.{js,ts,jsx,tsx}', './components/**/*.{js,ts,jsx,tsx}'],
  darkMode: 'class', // or 'media' or 'class'
  theme: {

    colors: {
      ...defaultColors,
      blue: {
        ...defaultColors.blue,
        DEFAULT: '#3b82f6',
      }

    }
  },
  variants: {
    extend: {
      opacity: ['disabled'],
    }
  },
  plugins: [
  ],
  corePlugins: {
    backgroundOpacity: false
  }
};
