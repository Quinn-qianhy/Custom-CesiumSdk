<template>
  <el-container class="app-shell">
    <el-header class="app-shell__header" height="var(--header-height)">
      <MainNavigation />
    </el-header>

    <el-container class="app-shell__body">
      <AppSidebar v-if="showSidebar" @navigate="handleNavigate" />
      <el-main class="app-shell__main" :class="{ 'app-shell__main--full': !showSidebar }">
        <router-view :key="engineStore.currentEngineId" />
      </el-main>
    </el-container>

    <el-footer class="app-shell__footer" height="var(--footer-height)">
      <AppFooter />
    </el-footer>
  </el-container>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { useRoute } from 'vue-router'
import { useEngineStore } from '@/stores/engineStore'
import AppSidebar from '@/components/layout/AppSidebar.vue'
import MainNavigation from '@/components/layout/MainNavigation.vue'
import AppFooter from '@/components/layout/AppFooter.vue'

const route = useRoute()
const engineStore = useEngineStore()

const showSidebar = computed(() => route.meta.showSidebar !== false)

/** 锚点定位时在分区标题上方预留的呼吸间距 */
const ANCHOR_OFFSET = 100

const handleNavigate = (sectionId: string) => {
  const target = document.getElementById(sectionId)
  const scrollContainer = document.querySelector<HTMLElement>('.home-scene__content')

  if (!target || !scrollContainer) {
    return
  }

  const top =
    target.getBoundingClientRect().top -
    scrollContainer.getBoundingClientRect().top +
    scrollContainer.scrollTop -
    ANCHOR_OFFSET

  const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches
  scrollContainer.scrollTo({ top, behavior: prefersReducedMotion ? 'auto' : 'smooth' })
}
</script>

<style lang="scss">
@use '@/styles/layouts/defaultLayout.scss';
</style>
