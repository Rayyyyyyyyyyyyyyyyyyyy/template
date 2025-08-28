/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [],
  safelist: [
    // SortTable 組件類別
    'sort-table-container',
    'sort-table-function-bar',
    'sort-table-settings-btn',

    // FilterBtn 組件類別
    'filter-btn',

    // TransferItem 組件類別
    'transfer-item-wrapper',
    'transfer-arrow-wrapper',

    // TransferDialog 組件類別
    'transfer-sort-wrapper',
    'transfer-active-bg',
    'transfer-active-border',

    // BaseDialog 組件類別
    'base-dialog-title',

    // 通用類別
    'cursor-grab',
    'cursor-grabbing',

    // Primary 顏色類別
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
  ],
  theme: {
    extend: {
      colors: {
        // 專案可用顏色 (NTT Data)
        primary: {
          DEFAULT: '#6785c1',
          10: '#e0e0e0', // function header background
          15: '#F5F5F5', // table header background & Dialog title background
          20: '#E0E0E0', // table Frame background
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
        blue: {
          DEFAULT: '#238dad',
          10: '#0072BC', //Hyperlink
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
    function({ addComponents, theme }) {
      // 組件級樣式
      addComponents({
        // SortTable 組件樣式
        '.sort-table-container': {
          width: '100%',
          marginBottom: '1rem',
        },
        '.sort-table-function-bar': {
          display: 'flex',
          alignItems: 'center',
          height: '3rem',
          backgroundColor: theme('colors.primary.20'),
          padding: '0 0.375rem',
          borderTopLeftRadius: '0.25rem',
          borderTopRightRadius: '0.25rem',
          justifyContent: 'flex-end',
        },
        '.sort-table-settings-btn': {
          cursor: 'pointer',
          color: theme('colors.primary.dark'),
          fontSize: '1.25rem',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          '&:hover': {
            color: theme('colors.primary.40'),
          },
        },

        // FilterBtn 組件樣式
        '.filter-btn': {
          color: '#0ea5e9',
          '& p': {
            color: '#000',
            marginLeft: '0.5rem',
            fontWeight: 'bold',
          },
          '& i': {
            fontSize: '1.25rem',
          },
          '&:hover': {
            color: '#fff',
            backgroundColor: '#0ea5e9',
            '& p': {
              color: '#fff',
            },
          },
          '&:disabled': {
            backgroundColor: '#fff',
            opacity: '0.5',
            '&:hover': {
              backgroundColor: '#fff',
              '& p': {
                color: 'rgba(0, 0, 0, 0.2)',
              },
            },
          },
        },

        // TransferItem 組件樣式
        '.transfer-item-wrapper': {
          borderTop: '1px solid #e5e7eb',
          padding: '0 1rem',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          width: '100%',
        },
        '.transfer-arrow-wrapper': {
          width: '7rem',
          color: theme('colors.primary.10'),
        },

        // TransferDialog 組件樣式
        '.transfer-sort-wrapper': {
          border: '1px solid #e5e7eb',
          height: '24rem',
          overflow: 'auto',
        },
        '.transfer-active-bg': {
          backgroundColor: 'rgba(103, 133, 193, 0.1)',
        },
        '.transfer-active-border': {
          border: '1px solid',
          borderRadius: '0.25rem',
          borderColor: theme('colors.primary.10'),
        },

        // BaseDialog 組件樣式
        '.base-dialog-title': {
          fontWeight: 'bold',
          fontSize: '1rem',
        },
      })
    }
  ],
}
