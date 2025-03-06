<template>
  <div id="app">
    <TheHeader v-if="!isInDashboard" />
    <main class="main-content" :class="{ 'dashboard-view': isInDashboard }">
      <router-view />
    </main>
    <TheFooter v-if="!isInDashboard" />
    <FloatingService v-if="!isInDashboard" />
  </div>
</template>

<script lang="ts">
import { defineComponent, computed } from "vue";
import { useRoute } from "vue-router";
import { useI18n } from "vue-i18n";
import TheHeader from "@/components/layout/TheHeader.vue";
import TheFooter from "@/components/layout/TheFooter.vue";
import FloatingService from "@/components/layout/FloatingService.vue";

export default defineComponent({
  name: "App",
  components: {
    TheHeader,
    TheFooter,
    FloatingService,
  },
  setup() {
    const route = useRoute();
    const { t } = useI18n();
    
    const isInDashboard = computed(() => {
      return route.path.startsWith('/dashboard');
    });
    
    return {
      isInDashboard,
      t
    };
  }
});
</script>

<style lang="scss">
#app {
  display: flex;
  flex-direction: column;
  min-height: 100vh;
  font-family: "Montserrat", Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}

nav {
  padding: 30px;

  a {
    font-weight: bold;
    color: #2c3e50;

    &.router-link-exact-active {
      color: #0056b3;
    }
  }
}

.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.3s ease;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}

.main-content {
  flex: 1;
  padding-top: 0;
  min-height: calc(100vh - 300px);
  
  &.dashboard-view {
    min-height: 100vh;
    padding: 0;
  }
}
</style>
