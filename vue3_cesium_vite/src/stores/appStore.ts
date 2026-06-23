import { defineStore } from 'pinia'
import { ref, watch } from 'vue'
import { applyThemeClass } from '@/utils/theme'

const storedTheme = localStorage.getItem('theme')
const initialDark = storedTheme ? storedTheme === 'dark' : true

export const useAppStore = defineStore('app', () => {
  const isDarkMode = ref(initialDark)
  const globalLoading = ref(false)
  const loadingMessage = ref('加载中…')

  const syncTheme = (dark: boolean) => {
    localStorage.setItem('theme', dark ? 'dark' : 'light')
    applyThemeClass(dark)
  }

  watch(isDarkMode, syncTheme, { immediate: true })

  const toggleTheme = () => {
    isDarkMode.value = !isDarkMode.value
  }

  const showLoading = (message = '加载中…') => {
    loadingMessage.value = message
    globalLoading.value = true
  }

  const hideLoading = () => {
    globalLoading.value = false
  }

  return {
    isDarkMode,
    globalLoading,
    loadingMessage,
    toggleTheme,
    showLoading,
    hideLoading
  }
})
