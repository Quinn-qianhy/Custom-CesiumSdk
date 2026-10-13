<template>
  <div class="main-navigation">
    <div class="main-navigation__start">
      <button type="button" class="main-navigation__brand" @click="goHome">
        <el-icon class="main-navigation__logo" aria-hidden="true">
          <PhGlobeHemisphereWest weight="light" />
        </el-icon>
        <span class="main-navigation__title">{{ site.brandShort }}</span>
      </button>

      <div class="main-navigation__divider" aria-hidden="true" />

      <nav class="main-navigation__primary" aria-label="站点导航">
        <router-link
          to="/"
          class="main-navigation__link"
          :class="{ 'is-active': route.name === 'Home' }"
        >
          <span>示例中心</span>
        </router-link>
        <router-link
          to="/about"
          class="main-navigation__link"
          :class="{ 'is-active': route.name === 'About' }"
        >
          <span>关于项目</span>
        </router-link>
      </nav>
    </div>

    <div class="main-navigation__end">
      <el-select
        v-if="showEngineSelect"
        :model-value="currentEngineId"
        class="main-navigation__engine"
        size="small"
        placeholder="地图引擎"
        aria-label="切换地图引擎"
        @change="handleEngineChange"
      >
        <el-option
          v-for="engine in engineList"
          :key="engine.id"
          :label="engine.label"
          :value="engine.id"
        >
          <span>{{ engine.label }}</span>
          <span class="main-navigation__engine-desc">{{ engine.description }}</span>
        </el-option>
      </el-select>

      <div class="main-navigation__tools">
        <button
          type="button"
          class="main-navigation__tool main-navigation__tool--aux"
          title="API 文档"
          @click="goToAPIPage"
        >
          <el-icon aria-hidden="true"><PhBookOpen weight="light" /></el-icon>
          <span>API 文档</span>
        </button>
        <el-dropdown trigger="click" @command="handleOpenLink">
          <button type="button" class="main-navigation__tool main-navigation__tool--aux" title="友情链接">
            <el-icon aria-hidden="true"><PhLinkSimple weight="light" /></el-icon>
            <span>友情链接</span>
          </button>
          <template #dropdown>
            <el-dropdown-menu>
              <el-dropdown-item v-for="link in site.links" :key="link.url" :command="link.url">
                {{ link.label }}
              </el-dropdown-item>
            </el-dropdown-menu>
          </template>
        </el-dropdown>
        <button
          type="button"
          class="main-navigation__tool"
          :title="isDarkMode ? '切换为亮色主题' : '切换为暗色主题'"
          @click="toggleTheme"
        >
          <el-icon aria-hidden="true">
            <PhMoon v-if="isDarkMode" weight="light" />
            <PhSun v-else weight="light" />
          </el-icon>
          <span>{{ isDarkMode ? '亮色' : '暗色' }}</span>
        </button>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { storeToRefs } from 'pinia'
import {
  PhGlobeHemisphereWest,
  PhBookOpen,
  PhLinkSimple,
  PhMoon,
  PhSun
} from '@phosphor-icons/vue'
import site from '@/config/site'
import { useAppStore } from '@/stores/appStore'
import { useEngineStore } from '@/stores/engineStore'
import type { EngineId } from '@/types/engine'

const route = useRoute()
const router = useRouter()
const appStore = useAppStore()
const engineStore = useEngineStore()

const { isDarkMode } = storeToRefs(appStore)
const { engineList, currentEngineId } = storeToRefs(engineStore)

const showEngineSelect = computed(() => route.name === 'Home')

const handleEngineChange = (engineId: EngineId) => {
  engineStore.switchEngine(engineId)
}

const goHome = () => {
  if (route.name !== 'Home') {
    router.push({ name: 'Home' })
  }
}

const goToAPIPage = () => {
  window.open('/Documentation/index.html', '_blank')
}

const handleOpenLink = (url: string) => {
  window.open(url, '_blank', 'noopener')
}

const toggleTheme = () => {
  appStore.toggleTheme()
}
</script>

<style lang="scss">
@use '@/styles/layouts/mainNavigation.scss';
</style>
