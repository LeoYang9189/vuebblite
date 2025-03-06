<template>
  <div class="language-selector" ref="selectorRef">
    <div class="current-lang" @click="toggleOptions">
      <i class="fas fa-globe"></i>
      <span class="current-lang-text">{{ currentLanguage }}</span>
      <i
        class="fas fa-chevron-down"
        style="font-size: 10px; background: none; width: auto; height: auto"
      ></i>
    </div>

    <!-- 使用Teleport将下拉菜单移动到body元素下 -->
    <teleport to="body">
      <div class="lang-options" :class="{ show: showOptions }" :style="dropdownStyle">
        <a
          v-for="lang in languages"
          :key="lang.code"
          href="#"
          class="lang-option"
          :class="{ active: currentLangCode === lang.code }"
          :data-lang="lang.code"
          @click.prevent="changeLanguage(lang)"
        >
          {{ lang.name }}
        </a>
      </div>
    </teleport>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref, computed, onMounted, onBeforeUnmount } from "vue";
import { useStore } from "vuex";
import { useI18n } from "vue-i18n";
import { Message } from "@arco-design/web-vue";

interface Language {
  name: string;
  code: string;
}

export default defineComponent({
  name: "LanguageSelector",
  setup() {
    const store = useStore();
    const { locale, t } = useI18n();
    const showOptions = ref(false);
    const selectorRef = ref<HTMLElement | null>(null);

    const languages: Language[] = [
      { name: "中文", code: "zh" },
      { name: "English", code: "en" },
      { name: "日本語", code: "jp" },
    ];

    // 从localStorage获取保存的语言设置
    const savedLanguage = localStorage.getItem("preferredLanguage");
    if (savedLanguage && languages.some(lang => lang.code === savedLanguage)) {
      store.commit("setLanguage", savedLanguage);
      locale.value = savedLanguage;
    }

    const currentLangCode = computed(() => store.getters.currentLanguage);

    const currentLanguage = computed(() => {
      const lang = languages.find(l => l.code === currentLangCode.value);
      return lang ? lang.name : "中文";
    });

    const toggleOptions = () => {
      showOptions.value = !showOptions.value;
    };

    const changeLanguage = async (lang: Language) => {
      try {
        // 更新store
        store.commit("setLanguage", lang.code);
        // 更新i18n locale
        locale.value = lang.code as "zh" | "en" | "jp";
        // 保存到localStorage
        localStorage.setItem("preferredLanguage", lang.code);
        // 强制重新渲染整个应用
        window.location.reload();
        // 关闭下拉菜单
        showOptions.value = false;
        // 显示成功消息
        Message.success(t("common.languageChanged"));
      } catch (error) {
        console.error("Failed to change language:", error);
        Message.error("Failed to change language");
      }
    };

    // 点击外部时关闭选项
    const handleOutsideClick = (event: MouseEvent) => {
      const target = event.target as HTMLElement;
      if (!target.closest(".language-selector")) {
        showOptions.value = false;
      }
    };

    onMounted(() => {
      document.addEventListener("click", handleOutsideClick);
    });

    onBeforeUnmount(() => {
      document.removeEventListener("click", handleOutsideClick);
    });

    const dropdownStyle = computed(() => {
      if (!selectorRef.value) return {};

      const rect = selectorRef.value.getBoundingClientRect();
      return {
        position: "fixed",
        top: `${rect.bottom}px`,
        left: `${rect.left}px`,
        width: `${rect.width}px`,
        zIndex: 1000,
      };
    });

    return {
      languages,
      currentLangCode,
      currentLanguage,
      showOptions,
      toggleOptions,
      changeLanguage,
      dropdownStyle,
      selectorRef,
    };
  },
});
</script>

<style scoped>
.language-selector {
  position: relative;
  margin-left: 20px;
  cursor: pointer;
}

.current-lang {
  display: flex;
  align-items: center;
  color: #fff;
}

.current-lang-text {
  margin: 0 5px;
}

.lang-options {
  position: absolute;
  top: 100%;
  right: 0;
  background: white;
  box-shadow: 0 5px 15px rgba(0, 0, 0, 0.1);
  border-radius: 4px;
  padding: 10px 0;
  min-width: 120px;
  opacity: 0;
  visibility: hidden;
  transform: translateY(10px);
  transition: all 0.3s;
  z-index: 1000;
}

.lang-options.show {
  opacity: 1;
  visibility: visible;
  transform: translateY(0);
}

.lang-option {
  display: block;
  padding: 8px 15px;
  color: #333;
  text-decoration: none;
  transition: background 0.2s;
}

.lang-option:hover,
.lang-option.active {
  background-color: #f5f5f5;
  color: #0056b3;
}

.fa-globe {
  font-size: 14px;
  color: #1e5aa0;
}
</style>
