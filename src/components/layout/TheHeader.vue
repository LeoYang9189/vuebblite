<template>
  <header class="header-section">
    <div class="header-top">
      <div class="container">
        <div class="header-top-content">
          <div class="contact-info">
            <a href="tel:021-65143931" class="contact-item">
              <i class="fas fa-phone-alt"></i>
              <span>客服电话: 021-65143931转826</span>
            </a>
            <a href="mailto:b2b-service@walltechsystem.com" class="contact-item">
              <i class="fas fa-envelope"></i>
              <span>邮箱: b2b-service@walltechsystem.com</span>
            </a>
          </div>
          <LanguageSelector />
        </div>
      </div>
    </div>
    <div class="header">
      <div class="container">
        <div class="navbar">
          <div class="logo">
            <router-link to="/">
              <img src="@/assets/images/logo.png" alt="B2B平台 Logo" />
            </router-link>
          </div>
          <nav class="nav-menu">
            <ul>
              <li :class="{ active: currentRoute === '/' }">
                <router-link to="/">首页</router-link>
              </li>
              <li :class="{ active: currentRoute === '/tracking' }">
                <router-link to="/tracking">货物追踪</router-link>
              </li>
              <li :class="{ active: currentRoute === '/service' }">
                <router-link to="/service">业务介绍</router-link>
              </li>
              <li :class="{ active: currentRoute === '/news' }">
                <router-link to="/news">资讯中心</router-link>
              </li>
              <li :class="{ active: currentRoute === '/about' }">
                <router-link to="/about">关于我们</router-link>
              </li>
            </ul>
          </nav>
          <div class="action-btn">
            <template v-if="isLoggedIn">
              <a-dropdown trigger="click">
                <div class="user-dropdown">
                  <span class="username">{{ username }}</span>
                  <icon-down />
                </div>
                <template #content>
                  <a-doption @click="goToDashboard">
                    <template #icon><icon-dashboard /></template>
                    工作台
                  </a-doption>
                  <a-doption @click="goToProfile">
                    <template #icon><icon-user /></template>
                    个人资料
                  </a-doption>
                  <a-doption @click="handleLogout">
                    <template #icon><icon-export /></template>
                    退出登录
                  </a-doption>
                </template>
              </a-dropdown>
            </template>
            <router-link v-else to="/login" class="btn btn-primary">注册/登录</router-link>
          </div>
        </div>
      </div>
    </div>
  </header>
</template>

<script lang="ts">
import { defineComponent, ref, onMounted, computed, watch } from "vue";
import { useRoute, useRouter } from "vue-router";
import LanguageSelector from "@/components/common/LanguageSelector.vue";
import { IconDashboard, IconUser, IconExport, IconDown } from "@arco-design/web-vue/es/icon";
import { Message } from "@arco-design/web-vue";

export default defineComponent({
  name: "TheHeader",
  components: {
    LanguageSelector,
    IconDashboard,
    IconUser,
    IconExport,
    IconDown
  },
  setup() {
    const isScrolled = ref(false);
    const route = useRoute();
    const router = useRouter();
    const isLoggedIn = ref(false);
    const username = ref("");

    const currentRoute = computed(() => route.path);

    const handleScroll = () => {
      isScrolled.value = window.scrollY > 100;
    };

    const checkLoginStatus = () => {
      const loginStatus = localStorage.getItem("isLoggedIn");
      const storedUsername = localStorage.getItem("username");
      
      isLoggedIn.value = loginStatus === "true";
      if (storedUsername) {
        username.value = storedUsername;
      }
    };

    const goToDashboard = () => {
      router.push("/dashboard");
    };
    
    const goToProfile = () => {
      router.push("/dashboard/profile");
    };
    
    const handleLogout = () => {
      localStorage.removeItem("isLoggedIn");
      localStorage.removeItem("username");
      localStorage.removeItem("userRole");
      
      isLoggedIn.value = false;
      username.value = "";
      
      Message.success("已退出登录");
      router.push("/");
    };

    onMounted(() => {
      window.addEventListener("scroll", handleScroll);
      checkLoginStatus();
      
      // 监听存储变化，实时更新登录状态
      window.addEventListener("storage", checkLoginStatus);
    });

    // 监听路由变化，更新登录状态
    watch(route, () => {
      checkLoginStatus();
    });

    return {
      isScrolled,
      currentRoute,
      isLoggedIn,
      username,
      goToDashboard,
      goToProfile,
      handleLogout
    };
  },
});
</script>

<style scoped>
.header-section {
  position: relative;
  width: 100%;
  z-index: 100;
  transform: scale(1, 0.8);
  transform-origin: top;
}

.header-top {
  background-color: #0a1232;
  color: #fff;
  padding: 4px 0;
  font-size: 14px;
}

.header {
  position: relative;
  z-index: 100;
  background-color: white;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
  padding: 0;
  height: auto;
}

.navbar {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 8px 0;
}

.logo img {
  max-height: 30px;
}

.nav-menu ul {
  display: flex;
  margin: 0;
  padding: 0;
}

.nav-menu ul li {
  margin: 0 15px;
  position: relative;
}

.nav-menu ul li a {
  color: #333;
  font-weight: 500;
  padding: 5px 0;
  display: block;
  transition: all 0.3s;
  position: relative;
}

.nav-menu ul li a:hover,
.nav-menu ul li.active a {
  color: #0056b3;
}

.nav-menu ul li a::after,
.nav-menu ul li.active a::after {
  content: "";
  position: absolute;
  width: 0;
  height: 2px;
  background-color: #0056b3;
  bottom: -2px;
  left: 0;
  transition: width 0.3s;
}

.nav-menu ul li a:hover::after,
.nav-menu ul li.active a::after {
  width: 100%;
}

.action-btn .btn {
  padding: 6px 15px;
  font-size: 14px;
}

.nav-container {
  /* 同样确保不限制overflow */
}

/* 添加一个新样式确保导航层级适当 */
.nav-menu {
  position: relative; /* 确保创建堆叠上下文 */
  z-index: 10; /* 较低的z-index值 */
}

/* 用户下拉菜单样式 */
.user-dropdown {
  display: flex;
  align-items: center;
  cursor: pointer;
}

.username {
  margin-right: 4px;
  font-weight: 500;
}
</style>
