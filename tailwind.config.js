/* eslint-env node */
/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./index.html', './src/**/*.{js,vue,ts}'],
  theme: {
    extend: {
      backgroundImage: {
        'hero-image': "url('/bg-images/hero-image.jpg')",
      },
      colors: {
        primary: {
          DEFAULT: '#6785c1',
          10: '#e0e0e0', // function header background
          15: '#F5F5F5', // table header background & Dialog title background
          20: '#E0E0E0', // table Frame background
          40: '#b1c4e4',
          60: '#8facd9',
          80: '#6785c2',
          dark: '#070f26',
          welcome: '#dbdbdb',
        },
        navy: {
          DEFAULT: '#070f26',
          10: '#f8fafd', // on normal background color
          20: '#d5ddeb', // hover/active background color
          30: '#a0a9c1',
          40: '#667493', // normal background color
          50: '#3b486f',
          60: '#1d264d',
          70: '#121a38', // on hover/active background color
        },
        blue: {
          DEFAULT: '#238dad',
          10: '#0072BC', //Hyperlink
          20: '#d5e4f5',
        },
        text: {
          DEFAULT: '#333',
          border: '#606266',
          welcome: '#555',
        },
        bg: {
          DEFAULT: '#dbdbdb',
          loginBorder: '#b5b5b3',
        },
        orange: {
          DEFAULT: '#e07800',
        },
        redText: {
          DEFAULT: '#ff3636',
        },
        yellow: {
          DEFAULT: '#e6b600',
          10: '#fff9e3',
          20: '#fff3c7',
          30: '#ffedab',
          50: '#ffe273',
          70: '#ffd63b',
          dark: '#b89200',
        },
        red: {
          DEFAULT: '#bc4328',
          10: '#faebe8',
          20: '#f5d7d0',
          30: '#f0c3b9',
          50: '#e69b8b',
          70: '#dc745c',
          light: '#fe617b',
          dark: '#963620',
        },
        green: {
          DEFAULT: '#00b176',
          10: '#defff4',
          20: '#bcffe9',
          30: '#9bffde',
          50: '#58ffc7',
          70: '#16ffb1',
          dark: '#008e5e',
        },
        purple: '#8246af',
        gray: {
          light: '#f4f4f4',
          dark: '#333333',
        },
      },
      spacing: {
        labelRem: '10rem',
        label: 160,
        50: '6.25rem',
        s: 100,
        itemGapRem: '2.5rem',
        itemGap: 40,
      },
      height: {
        header: '60px',
      },
      fontSize: {
        DEFAULT: '1rem', //button & context 16px
        20: '1.25rem', // dialog title & sub title 20px
        24: '1.5rem', // page header title 24px
        28: '1.75rem', // web header title 28px
      },
    },
  },

  corePlugins: {
    preflight: false,
  },
  plugins: [],
}
