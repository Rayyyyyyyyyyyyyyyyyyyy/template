export const ROUTES = {
  // 根路由
  ROOT: '/',
  HOME: '/home',
  DEMO: '/demo',
  INSTALL_GUIDE: '/install-guide',
  DOCS_CENTER: '/docs-center',

  // 組件示範頁面
  SEARCHABLE_LIST_PANEL: '/demo/searchable-list-panel',
  TRANSFER_DIALOG: '/demo/transfer-dialog',
  BASE_BTN: '/demo/base-btn',
  BASE_INPUT: '/demo/base-input',
  BASE_DIALOG: '/demo/base-dialog',
  BASE_WARING_DIALOG: '/demo/base-waring-dialog',
  BASE_FORM: '/demo/base-form',
  TABLE: '/demo/table',
  SEARCH_BAR: '/demo/search-bar',
  FUNCTION_HEADER: '/demo/function-header',
  MAIN_PANEL: '/demo/main-panel',
  DETAIL_LAYOUT: '/demo/detail-layout',
  FILTER_LAYOUT: '/demo/filter-layout',
  I18N_TEST: '/demo/i18n-test',

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
  TRANSFER_DIALOG: 'TransferDialog',
  BASE_BTN: 'BaseBtn',
  BASE_INPUT: 'BaseInput',
  BASE_DIALOG: 'BaseDialog',
  BASE_WARING_DIALOG: 'BaseWaringDialog',
  TABLE: 'Table',
  SEARCH_BAR: 'SearchBar',
  FUNCTION_HEADER: 'FunctionHeader',
  MAIN_PANEL: 'MainPanel',
  DETAIL_LAYOUT: 'DetailLayout',
  FILTER_LAYOUT: 'FilterLayout',
  I18N_TEST: 'I18nTest',

  // 錯誤頁面
  NOT_FOUND: 'NotFoundPage',
} as const
