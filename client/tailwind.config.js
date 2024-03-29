/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
    "./public/index.html"
  ],
  theme: {
    fontFamily: {
      main: ['Poppins', 'sans-serif'],
    },
    listStyleType: {
      square: 'square'
    },
    extend: {
      gridRow: {
        'span-7': 'span 7 / span 7',
      },
      gridTemplateRows: {
        '10': 'repeat(10, minmax(0, 1fr))',
      },
      boxShadow: {
        'main': '0 0 0 1px #1a1b188c;',
      },
      width: {
        main: '1220px',

      },
      backgroundColor: {
        main: '#ee3131',
        overlay: 'rgba(0, 0, 0, .3)',
      },
      colors: {
        hover: '#ee3131',
      },
      flex: {
        '2': '2 2 0%',
        '3': '3 3 0%',
        '4': '4 4 0%',
        '5': '5 5 0%',
        '6': '6 6 0%',
        '7': '7 7 0%',
      },
      keyframes: {
        "slide-top": {
          '0%': {
            '-webkit-transform': 'translateY(40px);',
            transform: 'translateY(40px);',
          },
          '100%': {
            '-webkit-transform': 'translateY(0px);',
            transform: 'translateY(0px);',
          }
        },
        "slide-top-sm": {
          '0%': {
            '-webkit-transform': 'translateY(4px);',
            transform: 'translateY(4px);',
          },
          '100%': {
            '-webkit-transform': 'translateY(0px);',
            transform: 'translateY(0px);',
          }
        },
        "slide-bottom": {
          '0%': {
            '-webkit-transform': 'translateY(-50px);',
            transform: 'translateY(-50px);'
          },
          '100%': {
            '-webkit-transform': 'translateY(0);',
            transform: 'translateY(0);'
          }
        },
        "scale-up-center": {
          '0%': {
            '-webkit-transform': 'scale(0.5);',
            transform: 'scale(0.5);'
          },
          '100%': {
            '-webkit-transform': 'scale(1);',
            transform: 'scale(1);'
          }
        }
      },
      animation: {
        'slide-top': 'slide-top 0.2s cubic-bezier(0.250, 0.460, 0.450, 0.940) both;',
        'slide-top-sm': 'slide-top 0.2s linear both;',
        'slide-bottom': 'slide-bottom 0.2s cubic-bezier(0.250, 0.460, 0.450, 0.940) both;',
        'scale-up-center': 'scale-up-center 0.3s cubic-bezier(0.390, 0.575, 0.565, 1.000) both; '
      }
    },
  },
  plugins: [
    // require("@tailwindcss/line-clamp"),
    // require("@tailwindcss/forms"),
  ],
}