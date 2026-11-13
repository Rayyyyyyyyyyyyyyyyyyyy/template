import { createRouter, createWebHistory } from 'vue-router'
import {ROUTE_NAMES, ROUTES} from '@/router/constants.ts'

const routes = [
  {
    path: ROUTES.ROOT,
    name: ROUTE_NAMES.HOME_LAYOUT,
    component: () => import('@/layout/HomeLayout.vue'),
    children: [
      {
        path: ROUTES.ROOT,
        name: ROUTE_NAMES.HOME,
        component: () => import('@/views/HomePage.vue'),
      },
      {
        path: ROUTES.DEMO,
        name: ROUTE_NAMES.DEMO,
        meta: { title: '組件目錄' },
        component: () => import('@/views/DemoPage.vue'),
      },
      {
        path: ROUTES.INSTALL_GUIDE,
        name: ROUTE_NAMES.INSTALL_GUIDE,
        meta: { title: '安裝指南' },
        component: () => import('@/views/InstallGuidePage.vue'),
      },
      {
        path: ROUTES.DOCS_CENTER,
        name: ROUTE_NAMES.DOCS_CENTER,
        meta: { title: '文件中心' },
        component: () => import('@/views/DocsCenterPage.vue'),
      },
      {
        path: ROUTES.DOCS_API,
        name: ROUTE_NAMES.DOCS_API,
        meta: { title: 'API 參考' },
        component: () => import('@/views/ApiReferencePage.vue'),
      },
      {
        path: ROUTES.DOCS_CHANGELOG,
        name: ROUTE_NAMES.DOCS_CHANGELOG,
        meta: { title: '變更紀錄' },
        component: () => import('@/views/ChangelogPage.vue'),
      },
      {
        path: ROUTES.DOCS_THEME,
        name: ROUTE_NAMES.DOCS_THEME,
        meta: { title: '主題 token' },
        component: () => import('@/views/ThemeTokensPage.vue'),
      },
      {
        path: ROUTES.SEARCHABLE_LIST_PANEL,
        name: ROUTE_NAMES.SEARCHABLE_LIST_PANEL,
        meta: { title: 'SearchableListPanel' },
        component: () => import('@/views/demo/SearchableListPanelDemo.vue'),
      },
      {
        path: ROUTES.TRANSFER_DIALOG,
        name: ROUTE_NAMES.TRANSFER_DIALOG,
        meta: { title: 'TransferDialog' },
        component: () => import('@/views/demo/TransferDialogDemo.vue'),
      },
      {
        path: ROUTES.BASE_BTN,
        name: ROUTE_NAMES.BASE_BTN,
        meta: { title: 'BaseBtn' },
        component: () => import('@/views/demo/BaseBtnDemo.vue'),
      },
      {
        path: ROUTES.BASE_INPUT,
        name: ROUTE_NAMES.BASE_INPUT,
        meta: { title: 'BaseInput' },
        component: () => import('@/views/demo/BaseInputDemo.vue'),
      },
      {
        path: ROUTES.BASE_SELECTOR,
        name: ROUTE_NAMES.BASE_SELECTOR,
        meta: { title: 'BaseSelector' },
        component: () => import('@/views/demo/BaseSelectorDemo.vue'),
      },
      {
        path: ROUTES.BASE_DIALOG,
        name: ROUTE_NAMES.BASE_DIALOG,
        meta: { title: 'BaseDialog' },
        component: () => import('@/views/demo/BaseDialogDemo.vue'),
      },
      { path: '/demo/base-waring-dialog', redirect: ROUTES.BASE_WARNING_DIALOG },
      {
        path: ROUTES.BASE_WARNING_DIALOG,
        name: ROUTE_NAMES.BASE_WARNING_DIALOG,
        meta: { title: 'BaseWarningDialog' },
        component: () => import('@/views/demo/BaseWarningDialogDemo.vue'),
      },
      {
        path: ROUTES.TABLE,
        name: ROUTE_NAMES.TABLE,
        meta: { title: 'Table' },
        component: () => import('@/views/demo/TableDemo.vue'),
      },
      {
        path: ROUTES.SEARCH_BAR,
        name: ROUTE_NAMES.SEARCH_BAR,
        meta: { title: 'SearchBar' },
        component: () => import('@/views/demo/SearchBarDemo.vue'),
      },
      {
        path: ROUTES.FUNCTION_HEADER,
        name: ROUTE_NAMES.FUNCTION_HEADER,
        meta: { title: 'FunctionHeader' },
        component: () => import('@/views/demo/FunctionHeaderDemo.vue'),
      },
      {
        path: ROUTES.MAIN_PANEL,
        name: ROUTE_NAMES.MAIN_PANEL,
        meta: { title: 'MainPanel' },
        component: () => import('@/views/demo/MainPanelDemo.vue'),
      },
      {
        path: ROUTES.DETAIL_LAYOUT,
        name: ROUTE_NAMES.DETAIL_LAYOUT,
        meta: { title: 'DetailLayout' },
        component: () => import('@/views/demo/DetailLayoutDemo.vue'),
      },
      {
        path: ROUTES.FILTER_LAYOUT,
        name: ROUTE_NAMES.FILTER_LAYOUT,
        meta: { title: 'FilterLayout' },
        component: () => import('@/views/demo/FilterLayoutDemo.vue'),
      },
      {
        path: ROUTES.I18N_TEST,
        name: ROUTE_NAMES.I18N_TEST,
        meta: { title: '多語系' },
        component: () => import('@/views/demo/I18nTestDemo.vue'),
      },
    ],
  },
  {
    path: ROUTES.NOT_FOUND,
    name: ROUTE_NAMES.NOT_FOUND,
    meta: { title: '找不到頁面' },
    component: () => import('@/views/NotFoundPage.vue'),
  },
]
declare module 'vue-router' {
  interface RouteMeta {
    title?: string
  }
}

export const SITE_NAME = 'RayTable'
export const pageTitle = (title?: string) => (title ? `${title} · ${SITE_NAME}` : SITE_NAME)

const router = createRouter({
  history: createWebHistory(),
  routes,
})
router.afterEach((to) => {
  document.title = pageTitle(to.meta.title)
})
export default router
