import { RouteRecordRaw, createRouter, createWebHistory } from "vue-router";

const IndexPage = () => import("./pages/IndexPage.vue");
const NotFoundPage = () => import("./pages/NotFoundPage.vue");

const routes: RouteRecordRaw[] = [
  { path: "/", component: IndexPage },
  { path: "/not_found", component: NotFoundPage },
  { path: "/:pathMatch(.*)*", redirect: "/not_found" },
];

export const router = createRouter({
  history: createWebHistory(),
  routes,
});
