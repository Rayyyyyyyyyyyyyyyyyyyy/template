export const ROUTES = {
  // 根路由
  ROOT: '/',
  HOME: '/home',

  // 錯誤頁面
  NOT_FOUND: '/:catchAll(.*)',
} as const

export const ROUTE_NAMES = {
  HOME_LAYOUT: 'HomeLayout',
  HOME: 'Home',

  // 錯誤頁面
  NOT_FOUND: 'NotFoundPage',
} as const
