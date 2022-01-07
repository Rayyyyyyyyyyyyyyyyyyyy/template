import { createRouter, createWebHistory, RouteRecordRaw } from "vue-router";
import RouterNames from "@/router/name";

const routes: Array<RouteRecordRaw> = [
  {
    path: "/",
    name: RouterNames.home,
    component: () => import("@/views/Home.vue")
  },
  {
    path: "/:catchAll(.*)",
    name: RouterNames.notFound,
    component: () => import("@/views/NotFound.vue")
  }
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
});

export default router;
