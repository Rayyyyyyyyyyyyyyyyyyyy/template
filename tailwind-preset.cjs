/** CommonJS preset so both import and require work in a type=module package. */
/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [],
  safelist: [
    // 保留必要的顏色類別供 Tailwind 使用
    'bg-primary',
    'bg-primary-10',
    'bg-primary-15',
    'bg-primary-20',
    'bg-primary-40',
    'bg-primary-60',
    'bg-primary-80',
    'bg-primary-dark',
    'text-primary',
    'text-primary-10',
    'text-primary-15',
    'text-primary-20',
    'text-primary-40',
    'text-primary-60',
    'text-primary-80',
    'text-primary-dark',
    'border-primary',
    'border-primary-10',
    'border-primary-15',
    'border-primary-20',
    'border-primary-40',
    'border-primary-60',
    'border-primary-80',
    'border-primary-dark',
        'text-blue-10',
    'text-redText',
    'bg-blue-20',
    'border-b-orange',
    'border-b-blue-10',

    // 組件樣式相關的 Tailwind 類別（用於 SCSS 和 TypeScript 工具）
    'bg-primary/10',
    'hover:text-primary-40',
    'text-sky-500',
    'hover:bg-sky-500',
    'disabled:bg-white',
    'disabled:opacity-50',
    'disabled:text-black/20',
    'text-black/20',
  ],
  theme: {
    extend: {
      colors: {
        // Shared palette for Element Plus and library utilities
        primary: {
          DEFAULT: '#256fc0',
          10: '#f5f7fa', // function header background
          15: '#f5f7fa', // table header background & Dialog title background
          20: '#ebeef5', // table Frame background
          40: '#d9e8f7',
          60: '#a8c8e9',
          80: '#6e9fd3',
          dark: '#1d599a', // for element+
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
          10: '#256fc0', //Hyperlink
          20: '#d5e4f5',
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
        text: {
          DEFAULT: '#333',
          border: '#606266',
          welcome: '#555',
        },
        green: {
          DEFAULT: '#00b176',
          10: '#defff4',
          20: '#bcffe9',
          30: '#9bffde',
          50: '#58ffc7',
          70: '#16ffb1',
          dark: '#008e5e',
          control: { DEFAULT: '#006b47', hover: '#005437' },
        },
        purple: '#8246af',
        orange: '#d76b00',
        gray: {
          light: '#f4f4f4',
          dark: '#333333',
        },
        redText: {
          DEFAULT: '#ff3636',
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
  plugins: [
    // 移除了舊的組件級樣式，現在使用 TypeScript 樣式工具和 Sass 模組
  ],
}
