import {createRouter, createWebHashHistory} from 'vue-router'
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
    ],
  },
  {
    path: ROUTES.NOT_FOUND,
    name: ROUTE_NAMES.NOT_FOUND,
    component: () => import('@/views/NotFoundPage.vue'),
  },
]
export default createRouter({
  history: createWebHashHistory(),
  routes,
})
