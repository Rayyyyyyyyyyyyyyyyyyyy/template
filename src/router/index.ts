import {createRouter, createWebHashHistory, createWebHistory} from 'vue-router'
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
        path: ROUTES.SEARCHABLE_LIST_PANEL,
        name: ROUTE_NAMES.SEARCHABLE_LIST_PANEL,
        component: () => import('@/views/demo/SearchableListPanelDemo.vue'),
      },
      {
        path: ROUTES.BASE_MULTIPLE_INPUT,
        name: ROUTE_NAMES.BASE_MULTIPLE_INPUT,
        component: () => import('@/views/demo/BaseMultipleInputDemo.vue'),
      },
      {
        path: ROUTES.TRANSFER_DIALOG,
        name: ROUTE_NAMES.TRANSFER_DIALOG,
        component: () => import('@/views/demo/TransferDialogDemo.vue'),
      },
      {
        path: ROUTES.BASE_TABLE,
        name: ROUTE_NAMES.BASE_TABLE,
        component: () => import('@/views/demo/BaseTableDemo.vue'),
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
        path: ROUTES.FILTER_BTN,
        name: ROUTE_NAMES.FILTER_BTN,
        component: () => import('@/views/demo/FilterBtnDemo.vue'),
      },
      {
        path: ROUTES.BASE_DIALOG,
        name: ROUTE_NAMES.BASE_DIALOG,
        component: () => import('@/views/demo/BaseDialogDemo.vue'),
      },
      {
        path: ROUTES.BASE_FORM,
        name: ROUTE_NAMES.BASE_FORM,
        component: () => import('@/views/demo/BaseFormDemo.vue'),
      },
      {
        path: ROUTES.SORT_TABLE,
        name: ROUTE_NAMES.SORT_TABLE,
        component: () => import('@/views/demo/SortTableDemo.vue'),
      },
      {
        path: ROUTES.SEARCH_BAR,
        name: ROUTE_NAMES.SEARCH_BAR,
        component: () => import('@/views/demo/SearchBarDemo.vue'),
      },
      {
        path: ROUTES.TRANSFER_ITEM,
        name: ROUTE_NAMES.TRANSFER_ITEM,
        component: () => import('@/views/demo/TransferItemDemo.vue'),
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
