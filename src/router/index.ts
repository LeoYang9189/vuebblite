import { createRouter, createWebHistory, RouteRecordRaw } from "vue-router";
import Home from "@/views/Home.vue";
import TrackingPage from "@/views/TrackingPage.vue";

const routes: Array<RouteRecordRaw> = [
  {
    path: "/",
    name: "Home",
    component: Home,
  },
  {
    path: "/tracking",
    name: "Tracking",
    component: TrackingPage,
  },
  {
    path: "/service",
    name: "Service",
    component: () => import("@/views/ServicePage.vue"),
  },
  {
    path: "/news",
    name: "News",
    component: () => import("@/views/NewsPage.vue"),
  },
  {
    path: "/about",
    name: "About",
    component: () => import("@/views/AboutPage.vue"),
  },
  {
    path: "/news/:id",
    name: "NewsDetail",
    component: () => import("../views/NewsDetailPage.vue"),
  },
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
  scrollBehavior(to, from, savedPosition) {
    // 如果有保存的位置，则使用
    if (savedPosition) {
      return savedPosition;
    }

    // 如果有hash，滚动到元素
    if (to.hash) {
      return {
        el: to.hash,
        behavior: "smooth",
      };
    }

    // 否则滚动到顶部
    return { top: 0 };
  },
});

export default router;
