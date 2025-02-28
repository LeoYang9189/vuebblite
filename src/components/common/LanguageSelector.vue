<template>
  <div class="language-selector">
    <div class="current-lang" @click="toggleOptions">
      <i class="fas fa-globe"></i>
      <span class="current-lang-text">{{ currentLanguage }}</span>
      <i
        class="fas fa-chevron-down"
        style="font-size: 10px; background: none; width: auto; height: auto"
      ></i>
    </div>
    <div class="lang-options" :class="{ show: showOptions }">
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
  </div>
</template>

<script lang="ts">
import { defineComponent, ref, computed, onMounted, onBeforeUnmount } from "vue";
import { useStore } from "vuex";
import { useI18n } from "vue-i18n";

interface Language {
  name: string;
  code: string;
}

export default defineComponent({
  name: "LanguageSelector",
  setup() {
    const store = useStore();
    const { locale } = useI18n();
    const showOptions = ref(false);

    const languages: Language[] = [
      { name: "中文", code: "zh" },
      { name: "English", code: "en" },
      { name: "日本語", code: "jp" },
    ];

    const currentLangCode = computed(() => store.getters.currentLanguage);

    const currentLanguage = computed(() => {
      const lang = languages.find(l => l.code === currentLangCode.value);
      return lang ? lang.name : "中文";
    });

    const toggleOptions = () => {
      showOptions.value = !showOptions.value;
    };

    const changeLanguage = (lang: Language) => {
      store.commit("setLanguage", lang.code);
      locale.value = lang.code;
      showOptions.value = false;

      console.log(`已切换至${lang.name}版本`);
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

    return {
      languages,
      currentLangCode,
      currentLanguage,
      showOptions,
      toggleOptions,
      changeLanguage,
    };
  },
});
</script>

<style scoped>
.lang-options.show {
  opacity: 1;
  visibility: visible;
  transform: translateY(0);
}
</style>
