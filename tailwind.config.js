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
        // 專案可用顏色 (NTT Data)
        primary: {
          DEFAULT: '#6785c1',
          10: '#f0f3f9', // for element+
          20: '#e1e7f3',
          40: '#b1c4e4',
          60: '#8facd9',
          80: '#7198ce',
          dark: '#4566a8', // for element+
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
        blue: '#0080b1',
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
        orange: '#d76b00',
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
    },
  },
  /**
   * To avoid the conflicts on button style with Element Plus
   * https://juejin.cn/post/7084614555598323719
   */
  corePlugins: {
    preflight: false,
  },
  plugins: [],
};
