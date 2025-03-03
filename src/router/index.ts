import { createRouter, createWebHistory, RouteRecordRaw } from "vue-router";
import Home from "@/views/Home.vue";
import TrackingPage from "@/views/TrackingPage.vue";
import HomePage from "@/views/HomePage.vue";
import LoginPage from "@/views/LoginPage.vue";
import RegisterPage from "@/views/RegisterPage.vue";
import DashboardPage from "@/views/DashboardPage.vue";
import ProfilePage from "@/views/ProfilePage.vue";
import CompanyVerificationPage from "@/views/CompanyVerificationPage.vue";
import CompanyAccountListPage from "@/views/CompanyAccountListPage.vue";
import ShippingOrderPage from "@/views/ShippingOrderPage.vue";
// import CompanyCertification from "@/views/dashboard/company/CompanyCertification.vue";
// import CompanyInfo from "@/views/dashboard/company/CompanyInfo.vue";
// import { ForecastOrders } from "@/views/dashboard/orders";

const routes: Array<RouteRecordRaw> = [
  {
    path: "/",
    name: "Home",
    component: Home,
  },
  {
    path: "/tracking",
    name: "Tracking",
    component: () => import("@/views/TrackingPage.vue"),
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
    component: () => import("@/views/LoginPage.vue"),
  },
  {
    path: "/register",
    name: "Register",
    component: () => import("@/views/RegisterPage.vue"),
  },
  {
    path: "/dashboard",
    name: "Dashboard",
    component: () => import("@/views/DashboardPage.vue"),
    meta: {
      requiresAuth: true,
    },
    children: [
      {
        path: "profile",
        name: "Profile",
        component: () => import("@/views/ProfilePage.vue"),
        meta: {
          title: "个人资料",
          requiresAuth: true,
        },
      },
      {
        path: "company/certification",
        name: "CompanyCertification",
        component: () => import("@/views/CompanyVerificationPage.vue"),
        meta: {
          title: "企业认证",
          requiresAuth: true,
        },
      },
      {
        path: "company/info",
        name: "CompanyInfo",
        component: () => import("@/components/UnderConstruction.vue"),
        meta: {
          title: "我的企业",
          requiresAuth: true,
        },
      },
      {
        path: "company/account",
        name: "CompanyAccount",
        component: () => import("@/views/CompanyAccountListPage.vue"),
        meta: {
          title: "企业账户",
          requiresAuth: true,
        },
      },
      {
        path: "orders/forecast",
        name: "ForecastOrders",
        component: () => import("@/views/ShippingOrderPage.vue"),
        meta: {
          title: "预报订单",
          requiresAuth: true,
        },
      },
      {
        path: "finance/bill-list",
        name: "BillList",
        component: () => import("@/components/UnderConstruction.vue"),
        meta: {
          title: "账单列表",
          requiresAuth: true,
        },
      },
      {
        path: "finance/foreign-bill",
        name: "ForeignBill",
        component: () => import("@/components/UnderConstruction.vue"),
        meta: {
          title: "国外账单",
          requiresAuth: true,
        },
      },
      {
        path: "finance/invoice-list",
        name: "InvoiceList",
        component: () => import("@/components/UnderConstruction.vue"),
        meta: {
          title: "发票列表",
          requiresAuth: true,
        },
      },
      {
        path: "enterprise/certified",
        name: "CertifiedEnterprise",
        component: () => import("@/components/UnderConstruction.vue"),
        meta: {
          title: "已认证企业",
          requiresAuth: true,
        },
      },
      {
        path: "enterprise/pending",
        name: "PendingEnterprise",
        component: () => import("@/components/UnderConstruction.vue"),
        meta: {
          title: "待审核企业",
          requiresAuth: true,
        },
      },
      {
        path: "enterprise/account",
        name: "EnterpriseAccount",
        component: () => import("@/components/UnderConstruction.vue"),
        meta: {
          title: "企业账号",
          requiresAuth: true,
        },
      },
      {
        path: "system/operation-account",
        name: "OperationAccount",
        component: () => import("@/components/UnderConstruction.vue"),
        meta: {
          title: "运营账号",
          requiresAuth: true,
        },
      },
      {
        path: "system/permission",
        name: "PermissionManagement",
        component: () => import("@/components/UnderConstruction.vue"),
        meta: {
          title: "权限管理",
          requiresAuth: true,
        },
      },
      {
        path: "system/config",
        name: "CustomConfig",
        component: () => import("@/components/UnderConstruction.vue"),
        meta: {
          title: "个性化配置",
          requiresAuth: true,
        },
      },
      {
        path: "operation/news-category",
        name: "NewsCategory",
        component: () => import("@/components/UnderConstruction.vue"),
        meta: {
          title: "资讯类别",
          requiresAuth: true,
        },
      },
      {
        path: "operation/news-management",
        name: "NewsManagement",
        component: () => import("@/components/UnderConstruction.vue"),
        meta: {
          title: "资讯管理",
          requiresAuth: true,
        },
      },
      {
        path: "message/inbox",
        name: "Inbox",
        component: () => import("@/components/UnderConstruction.vue"),
        meta: {
          title: "收件箱",
          requiresAuth: true,
        },
      },
      {
        path: "message/settings",
        name: "MessageSettings",
        component: () => import("@/components/UnderConstruction.vue"),
        meta: {
          title: "消息设置",
          requiresAuth: true,
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
