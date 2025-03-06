<template>
  <div class="language-switch">
    <button
      v-for="lang in SUPPORTED_LANGUAGES"
      :key="lang"
      :class="['lang-btn', { active: currentLanguage === lang }]"
      @click="changeLanguage(lang)"
    >
      {{ languageLabels[lang] }}
    </button>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import { SUPPORTED_LANGUAGES, useLanguage, type SupportedLanguage } from '@/utils/languageUtils'

export default defineComponent({
  name: 'LanguageSwitch',
  setup() {
    const { currentLanguage, changeLanguage } = useLanguage()

    const languageLabels: Record<SupportedLanguage, string> = {
      zh: '中文',
      en: 'EN',
      jp: '日本語'
    }

    return {
      SUPPORTED_LANGUAGES,
      currentLanguage,
      changeLanguage,
      languageLabels
    }
  }
})
</script>

<style scoped>
.language-switch {
  display: flex;
  gap: 8px;
}

.lang-btn {
  padding: 4px 8px;
  border: 1px solid #ddd;
  border-radius: 4px;
  background: white;
  cursor: pointer;
  transition: all 0.3s ease;
}

.lang-btn:hover {
  background: #f5f5f5;
}

.lang-btn.active {
  background: #1e5aa0;
  color: white;
  border-color: #1e5aa0;
}
</style> 