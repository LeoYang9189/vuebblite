import { createRouter, createWebHistory, RouteRecordRaw } from "vue-router";
import Home from "@/views/Home.vue";
import TrackingPage from "@/views/TrackingPage.vue";
import HomePage from "@/views/HomePage.vue";
import LoginPage from "@/views/LoginPage.vue";
import RegisterPage from "@/views/RegisterPage.vue";
import DashboardPage from "@/views/DashboardPage.vue";
import ProfilePage from "@/views/ProfilePage.vue";
import CompanyCertification from "@/views/dashboard/company/CompanyCertification.vue";
import CompanyInfo from "@/views/dashboard/company/CompanyInfo.vue";
import { ForecastOrders } from "@/views/dashboard/orders";

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
  {
    path: "/login",
    name: "Login",
    component: LoginPage,
  },
  {
    path: "/register",
    name: "Register",
    component: RegisterPage,
  },
  {
    path: "/dashboard",
    name: "Dashboard",
    component: DashboardPage,
    children: [
      {
        path: "profile",
        name: "Profile",
        component: ProfilePage,
      },
      {
        path: "company/certification",
        name: "CompanyCertification",
        component: CompanyCertification,
      },
      {
        path: "company/info",
        name: "CompanyInfo",
        component: CompanyInfo,
      },
      {
        path: "company/account",
        name: "CompanyAccount",
        component: () => import("@/views/dashboard/company/CompanyAccount.vue"),
        meta: {
          title: "企业账户",
          requiresAuth: true,
          roles: ["admin", "company"],
        },
      },
      {
        path: "orders/forecast",
        name: "ForecastOrders",
        component: ForecastOrders,
        meta: {
          title: "预报订单",
          requiresAuth: true,
          roles: ["admin", "company"],
        },
      },
      {
        path: "",
        redirect: "/dashboard/profile",
      },
    ],
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

// 路由守卫
router.beforeEach((to, from, next) => {
  const isLoggedIn = localStorage.getItem("isLoggedIn") === "true";

  // 如果用户访问仪表盘页面但未登录，重定向到登录页
  if (to.path.startsWith("/dashboard") && !isLoggedIn) {
    next("/login");
  } else {
    next();
  }
});

export default router;
