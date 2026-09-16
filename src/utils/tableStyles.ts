/**
 * Stable style helpers retained for the historical `./utils/styles` subpath.
 * CSS class definitions live in `src/assets/styles/_components.scss`.
 */
export const createTableCellClass = (options?: {
  isDismissed?: boolean
  isHeader?: boolean
}) => {
  const classes = ['p-0 h-10']

  if (options?.isDismissed) classes.push('bg-blue-20')
  if (options?.isHeader) {
    classes.push('bg-primary-15 font-bold text-text text-sm leading-4')
  }

  return classes.join(' ')
}

export const createTextClass = (type: 'blue' | 'red' | 'normal' = 'normal') => {
  if (type === 'blue') return 'text-blue-10'
  if (type === 'red') return 'text-redText'
  return ''
}

export const STYLE_CLASSES = {
  tableCell: 'table-cell',
  tableHeader: 'table-header',
  tableCellContent: 'table-cell-content',
  dismissedRow: 'dismissed-row',
  tableFooter: 'table-footer',
  blueText: 'blue-text',
  redText: 'red-text',
  sortTableContainer: 'sort-table-container',
  sortTableFunctionBar: 'sort-table-function-bar',
  sortTableSettingsBtn: 'sort-table-settings-btn',
  filterBtn: 'filter-btn',
  filterBtnText: 'filter-btn-text',
  filterBtnIcon: 'filter-btn-icon',
  transferSortWrapper: 'transfer-sort-wrapper',
  transferActiveBg: 'transfer-active-bg',
  transferActiveBorder: 'transfer-active-border',
  transferItemWrapper: 'transfer-item-wrapper',
  transferArrowWrapper: 'transfer-arrow-wrapper',
  baseDialogTitle: 'base-dialog-title',
  cursorGrab: 'cursor-grab',
  cursorGrabbing: 'cursor-grabbing',
  dataTableConfig: 'data-table-config',
  componentStyles: 'component-styles',
} as const

export type StyleClassesType = typeof STYLE_CLASSES

export interface TableCellStyleOptions {
  isDismissed?: boolean
  isHeader?: boolean
}

export type TextStyleType = 'blue' | 'red' | 'normal'
