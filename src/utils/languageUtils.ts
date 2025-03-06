import { nextTick } from 'vue'
import { useI18n } from 'vue-i18n'

export const STORAGE_LANGUAGE_KEY = 'preferredLanguage'
export const DEFAULT_LANGUAGE = 'zh'
export const SUPPORTED_LANGUAGES = ['zh', 'en', 'jp'] as const

export type SupportedLanguage = typeof SUPPORTED_LANGUAGES[number]

export const getStoredLanguage = (): SupportedLanguage => {
  try {
    const stored = localStorage.getItem(STORAGE_LANGUAGE_KEY)
    if (stored && SUPPORTED_LANGUAGES.includes(stored as SupportedLanguage)) {
      return stored as SupportedLanguage
    }
  } catch (e) {
    console.warn('Failed to read language from localStorage:', e)
  }
  return DEFAULT_LANGUAGE
}

export const setStoredLanguage = (lang: SupportedLanguage): void => {
  try {
    localStorage.setItem(STORAGE_LANGUAGE_KEY, lang)
  } catch (e) {
    console.warn('Failed to save language to localStorage:', e)
  }
}

export const useLanguage = () => {
  const i18n = useI18n()

  const changeLanguage = async (lang: SupportedLanguage) => {
    try {
      // 更新 i18n locale
      i18n.locale.value = lang
      // 保存到 localStorage
      setStoredLanguage(lang)
      // 等待 DOM 更新
      await nextTick()
      // 更新 HTML lang 属性
      document.querySelector('html')?.setAttribute('lang', lang)
    } catch (e) {
      console.error('Failed to change language:', e)
    }
  }

  return {
    currentLanguage: i18n.locale,
    changeLanguage
  }
} 