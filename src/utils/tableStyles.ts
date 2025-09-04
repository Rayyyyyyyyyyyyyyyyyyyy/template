/**
 * Table 樣式工具類
 * 注意：樣式定義已移至 src/assets/styles/_components.scss
 * 此檔案僅保留工具函數和類型定義
 */

// ==================== 樣式組合函數 ====================
// 創建表格單元格樣式類名
export const createTableCellClass = (options?: { isDismissed?: boolean; isHeader?: boolean }) => {
  const classes = ['p-0 h-10']

  if (options?.isDismissed) {
    classes.push('bg-blue-20')
  }

  if (options?.isHeader) {
    classes.push('bg-primary-15 font-bold text-text text-sm leading-4')
  }

  return classes.join(' ')
}

// 創建文字樣式類名
export const createTextClass = (type: 'blue' | 'red' | 'normal' = 'normal') => {
  switch (type) {
    case 'blue':
      return 'text-blue-10'
    case 'red':
      return 'text-redText'
    default:
      return ''
  }
}

// ==================== 樣式類名常量 ====================
// 這些常量對應 _components.scss 中定義的 CSS 類名
export const STYLE_CLASSES = {
  // 表格基礎樣式
  tableCell: 'table-cell',
  tableHeader: 'table-header',
  tableCellContent: 'table-cell-content',
  dismissedRow: 'dismissed-row',
  tableFooter: 'table-footer',
  blueText: 'blue-text',
  redText: 'red-text',

  // SortTable 組件樣式
  sortTableContainer: 'sort-table-container',
  sortTableFunctionBar: 'sort-table-function-bar',
  sortTableSettingsBtn: 'sort-table-settings-btn',

  // FilterBtn 組件樣式
  filterBtn: 'filter-btn',
  filterBtnText: 'filter-btn-text',
  filterBtnIcon: 'filter-btn-icon',

  // TransferDialog 組件樣式
  transferSortWrapper: 'transfer-sort-wrapper',
  transferActiveBg: 'transfer-active-bg',
  transferActiveBorder: 'transfer-active-border',

  // TransferItem 組件樣式
  transferItemWrapper: 'transfer-item-wrapper',
  transferArrowWrapper: 'transfer-arrow-wrapper',

  // BaseDialog 組件樣式
  baseDialogTitle: 'base-dialog-title',

  // 通用樣式
  cursorGrab: 'cursor-grab',
  cursorGrabbing: 'cursor-grabbing',

  // 配置樣式
  dataTableConfig: 'data-table-config',
  componentStyles: 'component-styles',
} as const

// ==================== 類型定義 ====================
export type StyleClassesType = typeof STYLE_CLASSES

// 樣式選項類型
export interface TableCellStyleOptions {
  isDismissed?: boolean
  isHeader?: boolean
}

// 文字樣式類型
export type TextStyleType = 'blue' | 'red' | 'normal'

// ==================== 使用說明 ====================
/**
 * 使用方式：
 *
 * 1. 在 Vue 組件中使用樣式類名：
 *    <div :class="STYLE_CLASSES.tableCell">內容</div>
 *
 * 2. 使用樣式組合函數：
 *    <div :class="createTableCellClass({ isHeader: true })">標題</div>
 *
 * 3. 使用文字樣式函數：
 *    <span :class="createTextClass('blue')">藍色文字</span>
 *
 * 4. 在 SCSS 中使用對應的類名：
 *    .my-custom-class {
 *      @extend .table-cell;
 *    }
 */
