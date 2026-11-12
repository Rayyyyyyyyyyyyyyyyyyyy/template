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
        component: () => import('@/views/DemoPage.vue'),
      },
      {
        path: ROUTES.INSTALL_GUIDE,
        name: ROUTE_NAMES.INSTALL_GUIDE,
        component: () => import('@/views/InstallGuidePage.vue'),
      },
      {
        path: ROUTES.DOCS_CENTER,
        name: ROUTE_NAMES.DOCS_CENTER,
        component: () => import('@/views/DocsCenterPage.vue'),
      },
      {
        path: ROUTES.DOCS_API,
        name: ROUTE_NAMES.DOCS_API,
        component: () => import('@/views/ApiReferencePage.vue'),
      },
      {
        path: ROUTES.DOCS_CHANGELOG,
        name: ROUTE_NAMES.DOCS_CHANGELOG,
        component: () => import('@/views/ChangelogPage.vue'),
      },
      {
        path: ROUTES.DOCS_THEME,
        name: ROUTE_NAMES.DOCS_THEME,
        component: () => import('@/views/ThemeTokensPage.vue'),
      },
      {
        path: ROUTES.SEARCHABLE_LIST_PANEL,
        name: ROUTE_NAMES.SEARCHABLE_LIST_PANEL,
        component: () => import('@/views/demo/SearchableListPanelDemo.vue'),
      },
      {
        path: ROUTES.TRANSFER_DIALOG,
        name: ROUTE_NAMES.TRANSFER_DIALOG,
        component: () => import('@/views/demo/TransferDialogDemo.vue'),
      },
      {
        path: ROUTES.BASE_BTN,
        name: ROUTE_NAMES.BASE_BTN,
        component: () => import('@/views/demo/BaseBtnDemo.vue'),
      },
      {
        path: ROUTES.BASE_INPUT,
        name: ROUTE_NAMES.BASE_INPUT,
        component: () => import('@/views/demo/BaseInputDemo.vue'),
      },
      {
        path: ROUTES.BASE_SELECTOR,
        name: ROUTE_NAMES.BASE_SELECTOR,
        component: () => import('@/views/demo/BaseSelectorDemo.vue'),
      },
      {
        path: ROUTES.BASE_DIALOG,
        name: ROUTE_NAMES.BASE_DIALOG,
        component: () => import('@/views/demo/BaseDialogDemo.vue'),
      },
      {
        path: ROUTES.BASE_WARING_DIALOG,
        name: ROUTE_NAMES.BASE_WARING_DIALOG,
        component: () => import('@/views/demo/BaseWaringDialogDemo.vue'),
      },
      {
        path: ROUTES.TABLE,
        name: ROUTE_NAMES.TABLE,
        component: () => import('@/views/demo/TableDemo.vue'),
      },
      {
        path: ROUTES.SEARCH_BAR,
        name: ROUTE_NAMES.SEARCH_BAR,
        component: () => import('@/views/demo/SearchBarDemo.vue'),
      },
      {
        path: ROUTES.FUNCTION_HEADER,
        name: ROUTE_NAMES.FUNCTION_HEADER,
        component: () => import('@/views/demo/FunctionHeaderDemo.vue'),
      },
      {
        path: ROUTES.MAIN_PANEL,
        name: ROUTE_NAMES.MAIN_PANEL,
        component: () => import('@/views/demo/MainPanelDemo.vue'),
      },
      {
        path: ROUTES.DETAIL_LAYOUT,
        name: ROUTE_NAMES.DETAIL_LAYOUT,
        component: () => import('@/views/demo/DetailLayoutDemo.vue'),
      },
      {
        path: ROUTES.FILTER_LAYOUT,
        name: ROUTE_NAMES.FILTER_LAYOUT,
        component: () => import('@/views/demo/FilterLayoutDemo.vue'),
      },
      {
        path: ROUTES.I18N_TEST,
        name: ROUTE_NAMES.I18N_TEST,
        component: () => import('@/views/demo/I18nTestDemo.vue'),
      },
    ],
  },
  {
    path: ROUTES.NOT_FOUND,
    name: ROUTE_NAMES.NOT_FOUND,
    component: () => import('@/views/NotFoundPage.vue'),
  },
]
export default createRouter({
  history: createWebHistory(),
  routes,
})
