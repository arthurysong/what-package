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
    extend: {
      animation: {
        wiggle: 'wiggle 1s slide-in infinite' 
      },
      keyframes: {
        wiggle: {
          '0%, 100%': { transform: 'rotateX(-1deg)' },
          '50%': { transform: 'rotateX(1deg)' },
        }
      }
    },
  },
  variants: {
    extend: {
      animation: ['hover', 'focus']
    },
  },
  plugins: [],
}
