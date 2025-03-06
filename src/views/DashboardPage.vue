<template>
  <div class="dashboard-container">
    <a-layout>
      <a-layout-sider
        collapsible
        :collapsed="collapsed"
        @collapse="handleCollapse"
        breakpoint="lg"
        class="dashboard-sider"
        hide-trigger
      >
        <div class="logo">
          <router-link to="/">
            <img src="@/assets/images/logo.png" :alt="t('about.companyProfile.title')" />
          </router-link>
        </div>
        
        <!-- 自定义菜单结构 -->
        <div class="custom-menu" :class="{ 'menu-collapsed': collapsed }">
          <!-- 个人资料 -->
          <div class="menu-item" :class="{ active: isActive('profile') }">
            <router-link to="/dashboard/profile" class="menu-link">
              <span class="menu-icon"><icon-user /></span>
              <span v-if="!collapsed" class="menu-text">{{ t('dashboard.profile') }}</span>
            </router-link>
          </div>
          
          <!-- 企业信息 -->
          <div class="sub-menu" :class="{ open: isOpen('company') }">
            <div class="sub-menu-title" @click="toggleSubMenu('company')">
              <span class="menu-icon"><icon-apps /></span>
              <span v-if="!collapsed" class="menu-text">{{ t('dashboard.company') }}</span>
              <span v-if="!collapsed" class="arrow">
                <icon-down v-if="isOpen('company')" />
                <icon-right v-else />
              </span>
            </div>
            <div class="sub-menu-content" v-show="!collapsed && isOpen('company')">
              <div class="sub-menu-item" :class="{ active: isActive('company-certification') }">
                <router-link to="/dashboard/company/certification">{{ t('dashboard.companyVerification') }}</router-link>
              </div>
              <div class="sub-menu-item" :class="{ active: isActive('company-info') }">
                <router-link to="/dashboard/company/info">{{ t('dashboard.myCompany') }}</router-link>
              </div>
              <div class="sub-menu-item" :class="{ active: isActive('company-account') }">
                <router-link to="/dashboard/company/account">{{ t('dashboard.companyAccount') }}</router-link>
              </div>
            </div>
          </div>
          
          <!-- 订单管理 -->
          <div class="sub-menu" :class="{ open: isOpen('orders') }">
            <div class="sub-menu-title" @click="toggleSubMenu('orders')">
              <span class="menu-icon"><icon-file /></span>
              <span v-if="!collapsed" class="menu-text">{{ t('dashboard.orders') }}</span>
              <span v-if="!collapsed" class="arrow">
                <icon-down v-if="isOpen('orders')" />
                <icon-right v-else />
              </span>
            </div>
            <div class="sub-menu-content" v-show="!collapsed && isOpen('orders')">
              <div class="sub-menu-item" :class="{ active: isActive('forecast-orders') }">
                <router-link to="/dashboard/orders/forecast">{{ t('dashboard.forecastOrders') }}</router-link>
              </div>
            </div>
          </div>
          
          <!-- 财务管理 -->
          <div class="sub-menu" :class="{ open: isOpen('finance') }">
            <div class="sub-menu-title" @click="toggleSubMenu('finance')">
              <span class="menu-icon"><icon-calendar /></span>
              <span v-if="!collapsed" class="menu-text">{{ t('dashboard.finance') }}</span>
              <span v-if="!collapsed" class="arrow">
                <icon-down v-if="isOpen('finance')" />
                <icon-right v-else />
              </span>
            </div>
            <div class="sub-menu-content" v-show="!collapsed && isOpen('finance')">
              <div class="sub-menu-item" :class="{ active: isActive('bill-list') }">
                <router-link to="/dashboard/finance/bill-list">{{ t('dashboard.billList') }}</router-link>
              </div>
              <div class="sub-menu-item" :class="{ active: isActive('foreign-bill') }">
                <router-link to="/dashboard/finance/foreign-bill">{{ t('dashboard.foreignBill') }}</router-link>
              </div>
              <div class="sub-menu-item" :class="{ active: isActive('invoice-list') }">
                <router-link to="/dashboard/finance/invoice-list">{{ t('dashboard.invoiceList') }}</router-link>
              </div>
            </div>
          </div>
          
          <!-- 企业管理 -->
          <div class="sub-menu" :class="{ open: isOpen('enterprise') }">
            <div class="sub-menu-title" @click="toggleSubMenu('enterprise')">
              <span class="menu-icon"><icon-user-group /></span>
              <span v-if="!collapsed" class="menu-text">{{ t('dashboard.enterpriseManagement') }}</span>
              <span v-if="!collapsed" class="arrow">
                <icon-down v-if="isOpen('enterprise')" />
                <icon-right v-else />
              </span>
            </div>
            <div class="sub-menu-content" v-show="!collapsed && isOpen('enterprise')">
              <div class="sub-menu-item" :class="{ active: isActive('certified-enterprise') }">
                <router-link to="/dashboard/company/verified">{{ t('dashboard.verifiedCompanies') }}</router-link>
              </div>
              <div class="sub-menu-item" :class="{ active: isActive('pending-enterprise') }">
                <router-link to="/dashboard/enterprise/pending">{{ t('dashboard.pendingCompanies') }}</router-link>
              </div>
              <div class="sub-menu-item" :class="{ active: isActive('enterprise-account') }">
                <router-link to="/dashboard/enterprise/account">{{ t('dashboard.enterpriseAccounts') }}</router-link>
              </div>
            </div>
          </div>
          
          <!-- 系统管理 -->
          <div class="sub-menu" :class="{ open: isOpen('system') }">
            <div class="sub-menu-title" @click="toggleSubMenu('system')">
              <span class="menu-icon"><icon-settings /></span>
              <span v-if="!collapsed" class="menu-text">{{ t('dashboard.system') }}</span>
              <span v-if="!collapsed" class="arrow">
                <icon-down v-if="isOpen('system')" />
                <icon-right v-else />
              </span>
            </div>
            <div class="sub-menu-content" v-show="!collapsed && isOpen('system')">
              <div class="sub-menu-item" :class="{ active: isActive('operation-account') }">
                <router-link to="/dashboard/system/operation-account">{{ t('dashboard.operationAccounts') }}</router-link>
              </div>
              <div class="sub-menu-item" :class="{ active: isActive('permission-management') }">
                <router-link to="/dashboard/system/permission">{{ t('dashboard.permissionManagement') }}</router-link>
              </div>
              <div class="sub-menu-item" :class="{ active: isActive('custom-config') }">
                <router-link to="/dashboard/system/config">{{ t('dashboard.customConfig') }}</router-link>
              </div>
            </div>
          </div>
          
          <!-- 运营管理 -->
          <div class="sub-menu" :class="{ open: isOpen('operation') }">
            <div class="sub-menu-title" @click="toggleSubMenu('operation')">
              <span class="menu-icon"><icon-dashboard /></span>
              <span v-if="!collapsed" class="menu-text">{{ t('dashboard.operationManagement') }}</span>
              <span v-if="!collapsed" class="arrow">
                <icon-down v-if="isOpen('operation')" />
                <icon-right v-else />
              </span>
            </div>
            <div class="sub-menu-content" v-show="!collapsed && isOpen('operation')">
              <div class="sub-menu-item" :class="{ active: isActive('news-category') }">
                <router-link to="/dashboard/operation/news-category">{{ t('dashboard.newsCategory') }}</router-link>
              </div>
              <div class="sub-menu-item" :class="{ active: isActive('news-management') }">
                <router-link to="/dashboard/operation/news-management">{{ t('dashboard.newsManagement') }}</router-link>
              </div>
            </div>
          </div>
          
          <!-- 站内信 -->
          <div class="sub-menu" :class="{ open: isOpen('message') }">
            <div class="sub-menu-title" @click="toggleSubMenu('message')">
              <span class="menu-icon"><icon-message /></span>
              <span v-if="!collapsed" class="menu-text">{{ t('dashboard.message') }}</span>
              <span v-if="!collapsed" class="arrow">
                <icon-down v-if="isOpen('message')" />
                <icon-right v-else />
              </span>
            </div>
            <div class="sub-menu-content" v-show="!collapsed && isOpen('message')">
              <div class="sub-menu-item" :class="{ active: isActive('inbox') }">
                <router-link to="/dashboard/message/inbox">{{ t('dashboard.inbox') }}</router-link>
              </div>
              <div class="sub-menu-item" :class="{ active: isActive('message-settings') }">
                <router-link to="/dashboard/message/settings">{{ t('dashboard.messageSettings') }}</router-link>
              </div>
            </div>
          </div>
        </div>
      </a-layout-sider>
      <a-layout>
        <a-layout-header class="dashboard-header">
          <a-button class="collapse-btn" @click="toggleCollapse">
            <icon-menu-fold v-if="!collapsed" />
            <icon-menu-unfold v-else />
          </a-button>
          <div class="header-right">
            <a-space>
              <a-select
                v-model="currentLang"
                :style="{ width: '100px' }"
                size="small"
                @change="handleLanguageChange"
              >
                <a-option value="zh">中文</a-option>
                <a-option value="en">English</a-option>
                <a-option value="jp">日本語</a-option>
              </a-select>
              <a-dropdown trigger="click">
                <a-space>
                  <a-avatar :size="32">
                    <icon-user />
                  </a-avatar>
                  <span class="username">{{ username }}</span>
                  <icon-down />
                </a-space>
                <template #content>
                  <a-doption @click="goToProfile">
                    <template #icon><icon-user /></template>
                    {{ t('dashboard.profile') }}
                  </a-doption>
                  <a-doption @click="handleLogout">
                    <template #icon><icon-export /></template>
                    {{ t('auth.logout') }}
                  </a-doption>
                </template>
              </a-dropdown>
            </a-space>
          </div>
        </a-layout-header>
        <a-layout-content class="dashboard-content">
          <router-view></router-view>
        </a-layout-content>
      </a-layout>
    </a-layout>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref, onMounted } from "vue";
import { useRouter, useRoute } from "vue-router";
import { useI18n } from "vue-i18n";
import { Message } from "@arco-design/web-vue";
import {
  IconDashboard,
  IconFile,
  IconSettings,
  IconUser,
  IconMenuFold,
  IconMenuUnfold,
  IconApps,
  IconCalendar,
  IconUserGroup,
  IconMessage,
  IconDown,
  IconRight,
  IconExport,
} from "@arco-design/web-vue/es/icon";

export default defineComponent({
  name: "DashboardPage",
  components: {
    IconDashboard,
    IconFile,
    IconSettings,
    IconUser,
    IconMenuFold,
    IconMenuUnfold,
    IconApps,
    IconCalendar,
    IconUserGroup,
    IconMessage,
    IconDown,
    IconRight,
    IconExport,
  },
  setup() {
    const router = useRouter();
    const route = useRoute();
    const { t, locale } = useI18n();
    const collapsed = ref(false);
    const username = ref("yunying");
    const currentLang = ref(locale.value);
    const openKeys = ref(["company"]);

    onMounted(() => {
      // 从本地存储获取用户名
      const storedUsername = localStorage.getItem("username");
      if (storedUsername) {
        username.value = storedUsername;
      }
      
      // 根据当前路由设置初始展开的菜单项
      const currentPath = route.path;
      if (currentPath.includes('/dashboard/finance')) {
        openKeys.value.push('finance');
      }
      if (currentPath.includes('/dashboard/orders')) {
        openKeys.value.push('orders');
      }
      if (currentPath.includes('/dashboard/enterprise')) {
        openKeys.value.push('enterprise');
      }
      if (currentPath.includes('/dashboard/system')) {
        openKeys.value.push('system');
      }
      if (currentPath.includes('/dashboard/operation')) {
        openKeys.value.push('operation');
      }
      if (currentPath.includes('/dashboard/message')) {
        openKeys.value.push('message');
      }
    });

    const handleCollapse = (value: boolean) => {
      collapsed.value = value;
    };

    const toggleCollapse = () => {
      collapsed.value = !collapsed.value;
    };
    
    const toggleSubMenu = (key: string) => {
      if (openKeys.value.includes(key)) {
        openKeys.value = openKeys.value.filter(k => k !== key);
      } else {
        openKeys.value.push(key);
      }
    };
    
    const isOpen = (key: string) => {
      return openKeys.value.includes(key);
    };
    
    const isActive = (key: string) => {
      return route.path.includes(key);
    };

    const goToProfile = () => {
      router.push("/dashboard/profile");
    };

    const handleLogout = () => {
      // 清除登录状态
      localStorage.removeItem("isLoggedIn");
      localStorage.removeItem("username");
      localStorage.removeItem("userRole");
      
      Message.success(t('auth.logoutSuccess'));
      router.push("/login");
    };

    const handleLanguageChange = (value: string) => {
      locale.value = value;
      localStorage.setItem("preferredLanguage", value);
      Message.success(t('common.languageChanged'));
    };

    return {
      collapsed,
      username,
      currentLang,
      handleCollapse,
      toggleCollapse,
      goToProfile,
      handleLogout,
      toggleSubMenu,
      isOpen,
      isActive,
      handleLanguageChange,
      t
    };
  },
});
</script>

<style scoped>
.dashboard-container {
  height: 100vh;
}

.dashboard-sider {
  background: #ffffff;
  border-right: 1px solid #e0e0e0;
}

.logo {
  height: 64px;
  padding: 16px;
  display: flex;
  align-items: center;
  justify-content: center;
  background: #fff;
  border-bottom: 1px solid #e0e0e0;
}

.logo img {
  height: 32px;
}

.logo a {
  display: block;
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
}

.dashboard-header {
  background: #fff;
  padding: 0 16px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  color: #333;
  border-bottom: 1px solid #f0f0f0;
}

.collapse-btn {
  margin-right: 16px;
  background: transparent;
  border: none;
  color: #333;
}

.header-right {
  display: flex;
  align-items: center;
}

.username {
  color: #333;
  margin: 0 4px;
}

.dashboard-content {
  margin: 24px;
  background: #fff;
  padding: 24px;
  min-height: 280px;
  overflow: auto;
}

/* 自定义菜单样式 */
.custom-menu {
  background-color: #ffffff;
  height: calc(100vh - 64px);
  overflow-y: auto;
}

.menu-item, .sub-menu-title {
  height: 45px;
  line-height: 45px;
  padding: 0 12px;
  color: #333;
  cursor: pointer;
  display: flex;
  align-items: center;
}

.menu-link {
  display: flex;
  align-items: center;
  color: #333;
  text-decoration: none;
}

.menu-icon {
  margin-right: 8px;
  font-size: 16px;
  display: inline-flex;
}

.menu-text {
  flex: 1;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}

.arrow {
  margin-left: 8px;
}

.sub-menu-title {
  display: flex;
  align-items: center;
}

.sub-menu-content {
  background-color: #ffffff;
  overflow: hidden;
}

.sub-menu-item {
  height: 40px;
  line-height: 40px;
  padding-left: 36px;
}

.sub-menu-item a {
  display: block;
  color: #333;
  text-decoration: none;
  font-size: 14px;
}

.menu-item:hover, .sub-menu-title:hover, .sub-menu-item:hover {
  background-color: #cce6ff;
}

.sub-menu-item:hover a, .menu-item:hover a {
  color: #1890ff;
}

.menu-item.active, .sub-menu-item.active {
  background-color: #cce6ff;
}

.menu-item.active a, .sub-menu-item.active a {
  color: #1890ff;
}

.sub-menu.open > .sub-menu-title {
  color: #1890ff;
  background-color: #f0f8ff;
}

/* 适配折叠状态 */
.menu-collapsed .menu-item,
.menu-collapsed .sub-menu-title {
  padding: 0;
  justify-content: center;
}

.menu-collapsed .menu-icon {
  margin-right: 0;
  font-size: 18px;
}
</style>
