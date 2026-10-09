<!--
 * @Author: qianhy
 * @Date: 2026-06-23 08:54:26
 * @LastEditTime: 2026-07-13 16:40:00
 * @LastEditors: qianhy
 * @Description: 文件修改
 * @FilePath: \trae-cesium-demo\vue3_cesium_vite\src\App.vue
-->
<template>
  <div id="app-root" :class="themeClass">
    <ErrorBoundary>
      <router-view v-slot="{ Component }">
        <transition name="fade" mode="out-in">
          <component :is="Component" />
        </transition>
      </router-view>
    </ErrorBoundary>
    <GlobalLoading :visible="globalLoading" :message="loadingMessage" />
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { storeToRefs } from 'pinia'
import { useAppStore } from '@/stores/appStore'
import ErrorBoundary from '@/components/layout/ErrorBoundary.vue'
import GlobalLoading from '@/components/layout/GlobalLoading.vue'

const appStore = useAppStore()
const { isDarkMode, globalLoading, loadingMessage } = storeToRefs(appStore)

const themeClass = computed(() =>
  isDarkMode.value ? 'dark-theme' : 'light-theme'
)
</script>

<style lang="scss">
#app-root {
  width: 100%;
  height: 100%;
}
</style>
