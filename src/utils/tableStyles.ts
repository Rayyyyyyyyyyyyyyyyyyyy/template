/**
 * Table 樣式工具類
 * 將原本的 SCSS 樣式轉換為 Tailwind CSS 類名
 */

// 表格單元格樣式
export const tableCell = 'p-0 h-10'

// 表格標題樣式
export const tableHeader = 'bg-primary-15 font-bold text-text text-sm leading-4'

// 表格內容樣式
export const tableCellContent = 'truncate'

// 被駁回行的樣式
export const dismissedRow = 'bg-blue-20'

// 表格底部樣式
export const tableFooter = 'font-bold'

// 藍色文字樣式
export const blueText = 'text-blue-10'

// 紅色文字樣式
export const redText = 'text-redText'

// SortTable 組件樣式
export const sortTableContainer = 'w-full mb-4'
export const sortTableFunctionBar = 'flex items-center h-12 bg-primary-20 px-1.5 rounded-t justify-end'
export const sortTableSettingsBtn = 'cursor-pointer text-primary-dark text-xl flex items-center justify-center hover:text-primary-40'

// FilterBtn 組件樣式
export const filterBtn = 'text-sky-500 hover:text-white hover:bg-sky-500 disabled:bg-white disabled:opacity-50'
export const filterBtnText = 'text-black ml-2 font-bold hover:text-white disabled:text-black/20'
export const filterBtnIcon = 'text-xl'

// TransferDialog 組件樣式
export const transferSortWrapper = 'border border-gray-200 h-96 overflow-auto'
export const transferActiveBg = 'bg-primary/10'
export const transferActiveBorder = 'border border-primary-10 rounded'

// TransferItem 組件樣式
export const transferItemWrapper = 'border-t border-gray-200 px-4 flex items-center justify-between w-full'
export const transferArrowWrapper = 'w-28 text-primary-10'

// BaseDialog 組件樣式
export const baseDialogTitle = 'font-bold text-base'

// 通用樣式
export const cursorGrab = 'cursor-grab'
export const cursorGrabbing = 'cursor-grabbing'

// 組合樣式對象
export const tableStyles = {
  cell: tableCell,
  header: tableHeader,
  content: tableCellContent,
  dismissed: dismissedRow,
  footer: tableFooter,
  blueText,
  redText,
} as const

// 組件樣式對象
export const componentStyles = {
  // SortTable
  sortTableContainer,
  sortTableFunctionBar,
  sortTableSettingsBtn,

  // FilterBtn
  filterBtn,
  filterBtnText,
  filterBtnIcon,

  // TransferDialog
  transferSortWrapper,
  transferActiveBg,
  transferActiveBorder,

  // TransferItem
  transferItemWrapper,
  transferArrowWrapper,

  // BaseDialog
  baseDialogTitle,

  // 通用
  cursorGrab,
  cursorGrabbing,
} as const

// 完整的 data-table 樣式配置
export const dataTableConfig = {
  // 表格單元格配置
  cellClass: tableCell,
  headerClass: tableHeader,

  // 內容相關類名
  contentClass: tableCellContent,
  dismissedClass: dismissedRow,
  footerClass: tableFooter,

  // 文字顏色類名
  blueTextClass: blueText,
  redTextClass: redText,
} as const

// 完整的組件樣式配置
export const allComponentStyles = {
  // 表格樣式
  ...tableStyles,

  // 組件樣式
  ...componentStyles,

  // 配置對象
  dataTableConfig,
} as const

// 樣式組合函數
export const createTableCellClass = (options?: {
  isDismissed?: boolean
  isHeader?: boolean
}) => {
  const baseClass = tableCell
  const classes = [baseClass]

  if (options?.isDismissed) {
    classes.push(dismissedRow)
  }

  if (options?.isHeader) {
    classes.push(tableHeader)
  }

  return classes.join(' ')
}

export const createTextClass = (type: 'blue' | 'red' | 'normal' = 'normal') => {
  switch (type) {
    case 'blue': return blueText
    case 'red': return redText
    default: return ''
  }
}

// 導出類型
export type TableStylesType = typeof tableStyles
export type ComponentStylesType = typeof componentStyles
export type DataTableConfigType = typeof dataTableConfig
export type AllComponentStylesType = typeof allComponentStyles
