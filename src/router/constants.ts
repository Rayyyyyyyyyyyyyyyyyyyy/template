export const ROUTES = {
  // 根路由
  ROOT: '/',
  HOME: '/home',
  DEMO: '/demo',

  // 組件示範頁面
  SEARCHABLE_LIST_PANEL: '/demo/searchable-list-panel',
  BASE_MULTIPLE_INPUT: '/demo/base-multiple-input',
  TRANSFER_DIALOG: '/demo/transfer-dialog',
  BASE_TABLE: '/demo/base-table',
  BASE_BTN: '/demo/base-btn',
  BASE_INPUT: '/demo/base-input',
  FILTER_BTN: '/demo/filter-btn',
  BASE_DIALOG: '/demo/base-dialog',
  BASE_FORM: '/demo/base-form',
  SORT_TABLE: '/demo/sort-table',
  SEARCH_BAR: '/demo/search-bar',
  TRANSFER_ITEM: '/demo/transfer-item',
  FUNCTION_HEADER: '/demo/function-header',
  MAIN_PANEL: '/demo/main-panel',

  // 錯誤頁面
  NOT_FOUND: '/:catchAll(.*)',
} as const

export const ROUTE_NAMES = {
  HOME_LAYOUT: 'HomeLayout',
  HOME: 'Home',
  DEMO: 'Demo',

  // 組件示範頁面
  SEARCHABLE_LIST_PANEL: 'SearchableListPanel',
  BASE_MULTIPLE_INPUT: 'BaseMultipleInput',
  TRANSFER_DIALOG: 'TransferDialog',
  BASE_TABLE: 'BaseTable',
  BASE_BTN: 'BaseBtn',
  BASE_INPUT: 'BaseInput',
  FILTER_BTN: 'FilterBtn',
  BASE_DIALOG: 'BaseDialog',
  BASE_FORM: 'BaseForm',
  SORT_TABLE: 'SortTable',
  SEARCH_BAR: 'SearchBar',
  TRANSFER_ITEM: 'TransferItem',
  FUNCTION_HEADER: 'FunctionHeader',
  MAIN_PANEL: 'MainPanel',

  // 錯誤頁面
  NOT_FOUND: 'NotFoundPage',
} as const
