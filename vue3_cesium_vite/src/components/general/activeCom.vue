<template>
  <div class="activeCom" v-if="currentComponent">
    <component :is="currentComponent" :key="componentKey" />
  </div>
</template>

<script setup lang="ts">
import { computed, shallowRef, watch, markRaw, type Component } from 'vue'
import { storeToRefs } from 'pinia'
import { useRoute } from 'vue-router'
import { ElMessage } from 'element-plus'
import { useExamplesStore } from '@/stores/examplesStore'
import { sceneManager, setScene } from '@/utils/sceneManager'
import { loadExampleFromSource, clearRuntimeStyles } from '@/utils/exampleRuntimeLoader'

const route = useRoute()
const store = useExamplesStore()
const { customSource, applyRevision } = storeToRefs(store)

const modules = import.meta.glob<{ default: Component }>([
  '@/components/scene/*.vue',
  '@/components/layer/*.vue',
  '@/components/material/*.vue',
  '@/components/draw/*.vue',
  '@/components/general/textView.vue'
])

const modulePathById = new Map<string, string>()
for (const path of Object.keys(modules)) {
  const match = path.match(/\/([^/]+)\.vue$/)
  if (match) {
    modulePathById.set(match[1], path)
  }
}

const componentId = computed(() => route.params.componentId as string)
const currentComponent = shallowRef<Component | null>(null)

const componentKey = computed(
  () => `${componentId.value}-${applyRevision.value}`
)

const resetViewerState = () => {
  const viewer = sceneManager.getViewer()
  if (!viewer || viewer.isDestroyed()) {
    return
  }
  viewer.entities.removeAll()
  viewer.dataSources.removeAll()
  setScene(viewer)
  clearRuntimeStyles()
}

const loadDefaultComponent = async (id: string) => {
  const modulePath = modulePathById.get(id)

  if (!modulePath) {
    console.warn(`未找到示例组件: ${id}`)
    currentComponent.value = null
    return
  }

  const mod = await modules[modulePath]()
  currentComponent.value = markRaw(mod.default)
}

const loadComponent = async (id: string) => {
  if (!id) {
    currentComponent.value = null
    return
  }

  resetViewerState()

  if (customSource.value) {
    try {
      const component = await loadExampleFromSource(customSource.value, id)
      currentComponent.value = markRaw(component)
    } catch (error) {
      const message = error instanceof Error ? error.message : String(error)
      console.error(error)
      ElMessage.error(`自定义代码加载失败: ${message}`)
      store.resetCustomSource()
      await loadDefaultComponent(id)
    }
    return
  }

  await loadDefaultComponent(id)
}

watch(
  [componentId, applyRevision],
  ([id], [prevId]) => {
    if (prevId && id !== prevId) {
      store.resetCustomSource()
    }
    store.componentName = id || ''
    loadComponent(id)
  },
  { immediate: true }
)
</script>

<style lang="scss" scoped>
.activeCom {
  width: 100%;
  min-height: 0;
}
</style>
