export const ROUTES = {
  // 根路由
  ROOT: '/',
  HOME: '/home',
  DEMO: '/demo',
  INSTALL_GUIDE: '/install-guide',
  DOCS_CENTER: '/docs-center',

  // 組件示範頁面
  SEARCHABLE_LIST_PANEL: '/demo/searchable-list-panel',
  BASE_MULTIPLE_INPUT: '/demo/base-multiple-input',
  TRANSFER_DIALOG: '/demo/transfer-dialog',
  BASE_TABLE: '/demo/base-table',
  BASE_BTN: '/demo/base-btn',
  BASE_INPUT: '/demo/base-input',
  BASE_DIALOG: '/demo/base-dialog',
  BASE_FORM: '/demo/base-form',
  SORT_TABLE: '/demo/sort-table',
  SEARCH_BAR: '/demo/search-bar',
  FUNCTION_HEADER: '/demo/function-header',
  MAIN_PANEL: '/demo/main-panel',

  // 錯誤頁面
  NOT_FOUND: '/:catchAll(.*)',
} as const

export const ROUTE_NAMES = {
  HOME_LAYOUT: 'HomeLayout',
  HOME: 'Home',
  DEMO: 'Demo',
  INSTALL_GUIDE: 'InstallGuide',
  DOCS_CENTER: 'DocsCenter',

  // 組件示範頁面
  SEARCHABLE_LIST_PANEL: 'SearchableListPanel',
  BASE_MULTIPLE_INPUT: 'BaseMultipleInput',
  TRANSFER_DIALOG: 'TransferDialog',
  BASE_TABLE: 'BaseTable',
  BASE_BTN: 'BaseBtn',
  BASE_INPUT: 'BaseInput',
  BASE_DIALOG: 'BaseDialog',
  SORT_TABLE: 'SortTable',
  SEARCH_BAR: 'SearchBar',
  FUNCTION_HEADER: 'FunctionHeader',
  MAIN_PANEL: 'MainPanel',

  // 錯誤頁面
  NOT_FOUND: 'NotFoundPage',
} as const
