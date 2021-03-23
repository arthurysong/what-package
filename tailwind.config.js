module.exports = {
  purge: ['./pages/**/*.{js,ts,jsx,tsx}', './components/**/*.{js,ts,jsx,tsx}'],
  darkMode: false, // or 'media' or 'class'
  theme: {
    fontFamily: {
      'sans': 'Arial',
      'mono': 'Courier',
    },
    // listStyleType: {
    //   none: 'none',
    //   disc: 'disc',
    //   decimal: 'decimal',
    // },
    extend: {},
  },
  variants: {
    extend: {},
  },
  plugins: [],
}
