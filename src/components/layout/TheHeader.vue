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
            <a href="#" class="btn btn-primary">注册/登录</a>
          </div>
        </div>
      </div>
    </div>
  </header>
</template>

<script lang="ts">
import { defineComponent, ref, onMounted, computed } from "vue";
import { useRoute } from "vue-router";
import LanguageSelector from "@/components/common/LanguageSelector.vue";

export default defineComponent({
  name: "TheHeader",
  components: {
    LanguageSelector,
  },
  setup() {
    const isScrolled = ref(false);
    const route = useRoute();

    const currentRoute = computed(() => route.path);

    const handleScroll = () => {
      isScrolled.value = window.scrollY > 100;
    };

    onMounted(() => {
      window.addEventListener("scroll", handleScroll);
    });

    return {
      isScrolled,
      currentRoute,
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
</style>
