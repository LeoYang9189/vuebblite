<template>
  <div class="sidebar" :class="{ 'sidebar-collapsed': collapsed }">
    <div class="sidebar-content">
      <div class="logo-container">
        <router-link to="/" class="logo-link">
          <img src="@/assets/images/logo.png" alt="Logo" class="sidebar-logo" />
        </router-link>
      </div>

      <a-menu
        :default-selected-keys="['1']"
        mode="vertical"
        :style="{ width: '100%' }"
        @menu-item-click="handleMenuClick"
        :collapsed="collapsed"
        :default-open-keys="['2']"
      >
        <a-menu-item key="1">
          <template #icon><icon-user /></template>
          <template #default>个人资料</template>
        </a-menu-item>

        <!-- 企业信息子菜单 -->
        <a-sub-menu key="2">
          <template #icon><icon-apps /></template>
          <template #title>企业信息</template>
          <a-menu-item key="2-1">
            <router-link to="/dashboard/company/certification">企业认证申请</router-link>
          </a-menu-item>
          <a-menu-item key="2-2">
            <router-link to="/dashboard/company/info">我的企业</router-link>
          </a-menu-item>
          <a-menu-item key="2-3">
            <router-link to="/dashboard/company/account">企业账户</router-link>
          </a-menu-item>
        </a-sub-menu>

        <!-- 订单中心子菜单 -->
        <a-sub-menu key="3">
          <template #icon><icon-dashboard /></template>
          <template #title>订单中心</template>
          <a-menu-item key="3-1">预报订单</a-menu-item>
        </a-sub-menu>

        <!-- 财务中心子菜单 -->
        <a-sub-menu key="4">
          <template #icon><icon-safe /></template>
          <template #title>财务中心</template>
          <a-menu-item key="4-1">账单列表</a-menu-item>
          <a-menu-item key="4-2">国外账单</a-menu-item>
          <a-menu-item key="4-3">发票列表</a-menu-item>
        </a-sub-menu>

        <a-menu-item key="5">
          <template #icon><icon-user-group /></template>
          客户中心
        </a-menu-item>

        <a-menu-item key="6">
          <template #icon><icon-settings /></template>
          运营管理
        </a-menu-item>

        <a-menu-item key="7">
          <template #icon><icon-computer /></template>
          系统管理
        </a-menu-item>

        <!-- 站内信子菜单 -->
        <a-sub-menu key="8">
          <template #icon><icon-message /></template>
          <template #title>站内信</template>
          <a-menu-item key="8-1">收件箱</a-menu-item>
          <a-menu-item key="8-2">消息设置</a-menu-item>
        </a-sub-menu>
      </a-menu>

      <div class="sidebar-toggle-bottom" @click="toggleCollapse">
        <icon-menu-fold v-if="!collapsed" />
        <icon-menu-unfold v-else />
        <span v-if="!collapsed" class="toggle-text">收起菜单</span>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref, watch } from "vue";
import { useRouter } from "vue-router";
import {
  IconUser,
  IconApps,
  IconDashboard,
  IconSafe,
  IconUserGroup,
  IconSettings,
  IconComputer,
  IconMessage,
  IconMenuFold,
  IconMenuUnfold,
} from "@arco-design/web-vue/es/icon";

export default defineComponent({
  name: "SidebarComponent",
  components: {
    IconUser,
    IconApps,
    IconDashboard,
    IconSafe,
    IconUserGroup,
    IconSettings,
    IconComputer,
    IconMessage,
    IconMenuFold,
    IconMenuUnfold,
  },
  props: {
    modelValue: {
      type: Boolean,
      default: false,
    },
  },
  emits: ["update:modelValue"],
  setup(props, { emit }) {
    const router = useRouter();
    const collapsed = ref(props.modelValue);

    // 监听props变化更新本地状态
    watch(
      () => props.modelValue,
      newVal => {
        collapsed.value = newVal;
      }
    );

    // 通知父组件状态变化
    const toggleCollapse = () => {
      collapsed.value = !collapsed.value;
      emit("update:modelValue", collapsed.value);
    };

    const handleMenuClick = (key: string) => {
      switch (key) {
        case "1":
          router.push("/dashboard/profile");
          break;
        case "2-1":
          router.push("/dashboard/company/certification");
          break;
        case "2-2":
          router.push("/dashboard/company/info");
          break;
        case "2-3":
          router.push("/dashboard/company/account");
          break;
        case "3-1":
          router.push("/dashboard/orders/forecast");
          break;
        default:
          break;
      }
    };

    return {
      collapsed,
      toggleCollapse,
      handleMenuClick,
    };
  },
});
</script>

<style scoped>
.sidebar {
  width: 240px;
  background-color: #fff;
  color: #333;
  transition: width 0.3s ease;
  flex-shrink: 0;
  align-self: stretch;
  box-shadow: 0 0 15px rgba(0, 0, 0, 0.06);
}

.sidebar-content {
  display: flex;
  flex-direction: column;
  height: 100%;
}

.sidebar-collapsed {
  width: 64px;
}

.logo-container {
  padding: 20px;
  display: flex;
  justify-content: center; /* 居中显示logo */
  align-items: center;
  border-bottom: 1px solid rgba(0, 0, 0, 0.05);
}

.logo-link {
  display: block;
  transition: opacity 0.2s;
}

.logo-link:hover {
  opacity: 0.9;
}

.sidebar-logo {
  height: 35px; /* 稍微增大logo尺寸 */
  margin-right: 0; /* 移除右侧margin */
}

/* 菜单样式优化 */
:deep(.arco-menu) {
  background-color: transparent;
  border-right: none;
  flex: 1; /* 让菜单填充剩余空间 */
  overflow-y: auto; /* 菜单内容过多时可滚动 */
}

:deep(.arco-menu-inner) {
  padding-top: 0;
}

/* 菜单项垂直居中对齐，移除白色底框 */
:deep(.arco-menu-light .arco-menu-item) {
  color: rgba(50, 50, 50, 0.9);
  padding: 0 16px;
  height: 44px;
  line-height: 44px;
  margin: 4px 8px;
  border-radius: 6px;
  text-align: left;
  display: flex;
  align-items: center;
  background-color: transparent; /* 确保背景透明 */
  border: none; /* 移除边框 */
  box-shadow: none; /* 移除阴影 */
}

:deep(.arco-menu-light .arco-menu-item .arco-icon) {
  margin-right: 8px;
  font-size: 1.1em;
  display: flex; /* 确保图标也正确对齐 */
  align-items: center;
}

/* 统一子菜单标题样式，移除白色底框 */
:deep(.arco-menu-light .arco-menu-inline-header) {
  color: rgba(50, 50, 50, 0.9);
  padding: 0 16px;
  height: 44px;
  line-height: 44px;
  margin: 4px 8px;
  border-radius: 6px;
  text-align: left;
  display: flex;
  align-items: center;
  background-color: transparent; /* 确保背景透明 */
  border: none; /* 移除边框 */
  box-shadow: none; /* 移除阴影 */
}

/* 调整子菜单项，也移除白色底框 */
:deep(.arco-menu-light .arco-menu-inline-content .arco-menu-item) {
  padding-left: 40px;
  margin: 2px 8px;
  height: 40px;
  line-height: 40px;
  background-color: transparent; /* 确保背景透明 */
  border: none; /* 移除边框 */
  box-shadow: none; /* 移除阴影 */
}

/* 确保子菜单内容区域背景也是透明的 */
:deep(.arco-menu-light .arco-menu-inline-content) {
  background-color: transparent; /* 确保背景透明 */
  border: none; /* 移除边框 */
}

/* 确保展开图标也垂直居中 */
:deep(.arco-menu-light .arco-menu-inline-header .arco-icon-down) {
  font-size: 12px;
  margin-right: 4px;
  display: flex;
  align-items: center;
}

/* 确保子菜单标题文本垂直居中 */
:deep(.arco-menu-inline-header-title) {
  display: flex;
  align-items: center;
}

/* 菜单项靠左对齐，且选中时文字加粗 */
:deep(.arco-menu-light .arco-menu-item:hover) {
  color: #1e88e5;
  background-color: rgba(30, 136, 229, 0.08); /* 非常浅的蓝色背景 */
}

:deep(.arco-menu-light .arco-menu-selected) {
  color: #1e88e5;
  background-color: rgba(30, 136, 229, 0.12);
  font-weight: 600; /* 加粗选中的菜单项 */
}

:deep(.arco-menu-light .arco-menu-selected:hover) {
  background-color: rgba(30, 136, 229, 0.15);
}

/* 子菜单标题样式 */
:deep(.arco-menu-light .arco-menu-inline-header:hover) {
  color: #1e88e5;
  background-color: rgba(30, 136, 229, 0.08);
}

/* 子菜单项缩进和样式 */
:deep(.arco-menu-light .arco-menu-inline-header.arco-menu-selected) {
  color: #1e88e5;
  background-color: rgba(30, 136, 229, 0.12);
  font-weight: 600;
}

/* 确保菜单样式兼容收起状态 */
:deep(.arco-menu-collapsed) {
  .arco-menu-item {
    padding: 0 !important;
    height: 48px;
    line-height: 48px;
  }
}

/* 添加底部按钮样式 - 修改定位方式 */
.sidebar-toggle-bottom {
  position: sticky; /* 改为sticky定位 */
  bottom: 0; /* 粘附在底部 */
  left: 0;
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 16px 0;
  color: #666;
  cursor: pointer;
  border-top: 1px solid rgba(0, 0, 0, 0.06);
  background-color: rgba(255, 255, 255, 0.6);
  backdrop-filter: blur(5px);
  transition: color 0.3s;
  margin-top: auto; /* 将按钮推到flex容器底部 */
  flex-shrink: 0; /* 防止按钮被压缩 */
}

.sidebar-toggle-bottom:hover {
  color: #3080e8;
  background-color: rgba(255, 255, 255, 0.8);
}

.toggle-text {
  margin-left: 8px;
  font-size: 14px;
}

/* 侧边栏收起状态下的按钮样式 */
.sidebar-collapsed .sidebar-toggle-bottom {
  justify-content: center;
  padding: 16px 0;
}

.sidebar-collapsed .toggle-text {
  display: none;
}

/* 确保菜单路由链接正确显示 */
:deep(a) {
  text-decoration: none;
  color: inherit;
  display: block;
}
</style>
