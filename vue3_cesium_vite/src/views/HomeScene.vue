<template>
  <div class="home-scene">
    <el-main ref="examplesListPanel" class="home-scene__content" @scroll="handleScroll">
      <div v-if="stats.total" v-reveal class="home-scene__stats">
        <span class="home-scene__stats-item">
          共 <strong>{{ stats.total }}</strong> 个示例
        </span>
        <span class="home-scene__stats-item home-scene__stats-item--ok">
          可直接体验 <strong>{{ stats.ok }}</strong>
        </span>
        <el-tooltip placement="bottom">
          <template #content>
            <div>待修复：{{ stats.pending }}</div>
            <div>需服务器数据：{{ stats.serverData }}</div>
            <div>依赖 Cesium API：{{ stats.cesiumApi }}</div>
          </template>
          <span class="home-scene__stats-more">
            <el-icon aria-hidden="true"><PhInfo weight="light" /></el-icon>
            维护状态
          </span>
        </el-tooltip>
        <el-input
          v-model="searchKeyword"
          class="home-scene__search"
          placeholder="搜索示例名称"
          clearable
        >
          <template #prefix>
            <el-icon aria-hidden="true"><PhMagnifyingGlass weight="light" /></el-icon>
          </template>
        </el-input>
      </div>

      <section v-for="(item, index) in menuWithMeta" :key="index" class="home-scene__section">
        <el-divider
          :id="item.subMenu"
          content-position="left"
          class="home-scene__divider home-scene__divider--category"
        >
          {{ item.subMenu }}
        </el-divider>

        <div v-for="_item in item.menuItem" :key="_item.menuItemName" class="home-scene__group">
          <el-divider
            v-if="_item.menuItemName"
            content-position="left"
            :id="_item.menuItemName"
            class="home-scene__divider"
          >
            {{ _item.menuItemName }}
          </el-divider>
          <div class="home-scene__card-grid">
            <div
              v-for="entry in _item.pages"
              :key="entry.page.name"
              v-reveal
              class="home-scene__card-shell"
              :class="{ 'home-scene__card-shell--pending': entry.statusMeta?.isPending }"
              tabindex="0"
              role="button"
              @click="openPage(entry.page)"
              @keydown.enter="openPage(entry.page)"
              @keydown.space.prevent="openPage(entry.page)"
            >
              <el-card class="home-scene__card" :body-style="{ padding: '0px' }" shadow="never">
                <div class="home-scene__card-media">
                  <img
                    :src="resolveExampleImageUrl(entry.page.image)"
                    class="home-scene__card-image"
                    :alt="entry.page.name"
                    loading="lazy"
                    @load="markImageLoaded"
                    @error="markImageLoaded"
                  />
                  <div v-if="entry.statusMeta" class="home-scene__card-badges">
                    <el-tooltip
                      v-if="entry.statusMeta.isPending"
                      :content="entry.statusMeta.reason"
                      placement="top"
                    >
                      <el-tag size="small" type="warning" effect="dark">待修复</el-tag>
                    </el-tooltip>
                    <el-tag
                      v-for="label in entry.statusMeta.labels"
                      :key="label"
                      size="small"
                      :type="getStatusTagType(label)"
                      effect="plain"
                    >
                      {{ label }}
                    </el-tag>
                    <el-tooltip
                      v-if="entry.statusMeta.hasHint"
                      :content="entry.statusMeta.hint || '查看示例使用说明'"
                      placement="top"
                    >
                      <el-tag size="small" type="success" effect="dark">示例说明</el-tag>
                    </el-tooltip>
                  </div>
                </div>
                <div class="home-scene__card-name">
                  <span>{{ entry.page.name }}</span>
                </div>
              </el-card>
            </div>
          </div>
        </div>
      </section>

      <div v-if="!menuWithMeta.length" class="home-scene__empty">
        <el-icon aria-hidden="true"><PhMagnifyingGlass weight="light" /></el-icon>
        <p>{{ emptyHint }}</p>
      </div>
    </el-main>

    <button
      v-show="showBackToTop"
      type="button"
      class="home-scene__to-top"
      aria-label="回到顶部"
      @click="scrollToTop"
    >
      <el-icon aria-hidden="true"><PhArrowUp weight="light" /></el-icon>
    </button>
  </div>
</template>

<script setup lang="ts">
import { computed, ref, type Directive } from 'vue'
import { storeToRefs } from 'pinia'
import { useRouter } from 'vue-router'
import { PhArrowUp, PhInfo, PhMagnifyingGlass } from '@phosphor-icons/vue'
import { ElMessage } from 'element-plus'
import { useEngineStore } from '@/stores/engineStore'
import {
  resolveComponentId,
  resolveExampleType,
  resolveHtmlExampleRouteParam
} from '@/utils/exampleResolver'
import { countExampleStats, getPageStatusMeta, getStatusTagType } from '@/utils/exampleStatusMeta'
import { resolveExampleImageUrl } from '@/utils/exampleImage'

const router = useRouter()
const engineStore = useEngineStore()
const { menuData, currentEngineId } = storeToRefs(engineStore)

import type { ExamplePage, ExampleStatusMeta } from '@/types/example'

interface ExamplePageEntry {
  page: ExamplePage
  statusMeta: ExampleStatusMeta | null
}

interface MenuGroupWithMeta {
  menuItemName: string
  pages: ExamplePageEntry[]
}

interface MenuSectionWithMeta {
  subMenu: string
  menuItem: MenuGroupWithMeta[]
}

const searchKeyword = ref('')

const menuWithMeta = computed<MenuSectionWithMeta[]>(() => {
  const keyword = searchKeyword.value.trim().toLowerCase()

  return menuData.value
    .map((section) => ({
      subMenu: section.subMenu,
      menuItem: section.menuItem
        .map((group) => ({
          menuItemName: group.menuItemName,
          // 待修复示例排到组末，避免占位卡打断可用示例的浏览动线
          pages: group.pages
            .map((page) => ({ page, statusMeta: getPageStatusMeta(page) }))
            .filter((entry) => !keyword || entry.page.name.toLowerCase().includes(keyword))
            .sort(
              (a, b) =>
                Number(a.statusMeta?.isPending ?? false) - Number(b.statusMeta?.isPending ?? false)
            )
        }))
        .filter((group) => group.pages.length > 0)
    }))
    .filter((section) => section.menuItem.length > 0)
})

const stats = computed(() => countExampleStats(menuData.value))

const emptyHint = computed(() =>
  searchKeyword.value.trim()
    ? `没有匹配「${searchKeyword.value.trim()}」的示例`
    : '暂无可展示的示例'
)

const showBackToTop = ref(false)

const handleScroll = (event: Event) => {
  showBackToTop.value = (event.target as HTMLElement).scrollTop > 400
}

const scrollToTop = () => {
  const container = document.querySelector<HTMLElement>('.home-scene__content')
  if (!container) {
    return
  }

  const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches
  container.scrollTo({ top: 0, behavior: prefersReducedMotion ? 'auto' : 'smooth' })
}

// 加载失败时同样解除占位，避免图片一直不可见
const markImageLoaded = (event: Event) => {
  const image = event.target as HTMLImageElement
  image.classList.add('is-loaded')
}

let revealObserver: IntersectionObserver | null = null

// 元素进入视口后做带 stagger 延迟的 fade-up 揭示
const vReveal: Directive<HTMLElement> = {
  mounted(el) {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      return
    }
    revealObserver ??= new IntersectionObserver(
      (entries, observer) => {
        // 按同一批进入视口的次序错峰，避免大分组整片同时出现
        entries
          .filter((entry) => entry.isIntersecting)
          .forEach((entry, index) => {
            const target = entry.target as HTMLElement
            target.style.transitionDelay = `${Math.min(index, 7) * 60}ms`
            target.classList.remove('reveal-pending')
            observer.unobserve(target)
            window.setTimeout(() => {
              target.style.transitionDelay = ''
            }, 1200)
          })
      },
      { threshold: 0.15 }
    )
    el.classList.add('reveal-pending')
    revealObserver.observe(el)
  },
  unmounted(el) {
    revealObserver?.unobserve(el)
  }
}

const buildHtmlQuery = (page: ExamplePage) => {
  const query: Record<string, string> = { title: page.name }

  if (page.status === 'pending') {
    query.status = 'pending'
    query.statusReason = page.statusReason || ''
  }

  if (page.statusTags?.length) {
    query.statusTags = page.statusTags.join(',')
  }

  if (page.statusHint?.trim()) {
    query.statusHint = page.statusHint.trim()
  }

  return query
}

const openPage = (page: ExamplePage) => {
  if (page.status === 'pending') {
    ElMessage.warning(page.statusReason?.trim() || '该示例待修复，暂不可用')
    return
  }

  const { url, name } = page
  const exampleType = resolveExampleType(page)

  if (exampleType === 'external') {
    window.open(url, '_blank', 'noopener,noreferrer')
    return
  }

  if (exampleType === 'html') {
    const examplePath = resolveHtmlExampleRouteParam(url)
    const routeUrl = router.resolve({
      name: 'HtmlExample',
      params: { examplePath },
      query: buildHtmlQuery(page)
    })
    window.open(routeUrl.href, '_blank', 'noopener')
    return
  }

  const componentId = resolveComponentId(page)
  if (!componentId) {
    console.warn(`未找到示例组件 ID: ${name}`)
    return
  }

  const routeUrl = router.resolve({
    name: 'Example',
    params: { componentId },
    query: { title: name, engine: currentEngineId.value }
  })

  window.open(routeUrl.href, '_blank', 'noopener')
}
</script>

<style lang="scss">
@use '@/styles/pages/homeScene.scss';
</style>
