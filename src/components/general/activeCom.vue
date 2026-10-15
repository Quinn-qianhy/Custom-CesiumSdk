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
import { olMapManager } from '@/utils/olMapManager'
import { loadExampleFromSource, clearRuntimeStyles } from '@/utils/exampleRuntimeLoader'
import type { EngineId } from '@/types/engine'

const props = defineProps<{
  engineId: EngineId
}>()

const route = useRoute()
const store = useExamplesStore()
const { customSource, applyRevision } = storeToRefs(store)

const cesiumModules = import.meta.glob<{ default: Component }>([
  '@/components/scene/*.vue',
  '@/components/layer/*.vue',
  '@/components/material/*.vue',
  '@/components/draw/*.vue',
  '@/components/general/textView.vue'
])

const olModules = import.meta.glob<{ default: Component }>(
  '@/components/openlayers/*.vue'
)

const allModules = { ...cesiumModules, ...olModules }

const modulePathById = new Map<string, string>()

function registerModules(modules: Record<string, () => Promise<{ default: Component }>>) {
  for (const path of Object.keys(modules)) {
    const match = path.match(/\/([^/]+)\.vue$/)
    if (match) {
      modulePathById.set(match[1], path)
    }
  }
}

registerModules(cesiumModules)
registerModules(olModules)

function isVueComponent(value: unknown): value is Component {
  if (typeof value !== 'object' || value === null) {
    return false
  }
  return 'setup' in value || 'render' in value || '__asyncLoader' in value
}

const componentId = computed(() => route.params.componentId as string)
const currentComponent = shallowRef<Component | null>(null)

const componentKey = computed(
  () => `${props.engineId}-${componentId.value}-${applyRevision.value}`
)

const resetCesiumState = () => {
  const viewer = sceneManager.getViewer()
  if (!viewer || viewer.isDestroyed()) {
    return
  }
  viewer.entities.removeAll()
  viewer.dataSources.removeAll()
  setScene(viewer)
  clearRuntimeStyles()
}

const resetOpenLayersState = () => {
  olMapManager.resetMapState()
}

const resetRuntimeState = () => {
  if (props.engineId === 'openlayers') {
    resetOpenLayersState()
    return
  }
  resetCesiumState()
}

const loadDefaultComponent = async (id: string) => {
  const modulePath = modulePathById.get(id)

  if (!modulePath) {
    console.warn(`未找到示例组件: ${id}`)
    currentComponent.value = null
    return
  }

  const loader = allModules[modulePath]
  if (!loader) {
    console.warn(`未找到示例模块加载器: ${modulePath}`)
    currentComponent.value = null
    return
  }

  const mod = await loader()
  if (!isVueComponent(mod.default)) {
    console.warn(`示例组件无效: ${id}`, mod.default)
    currentComponent.value = null
    return
  }

  currentComponent.value = markRaw(mod.default)
}

const loadComponent = async (id: string) => {
  if (!id) {
    currentComponent.value = null
    return
  }

  resetRuntimeState()

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
  [componentId, applyRevision, () => props.engineId],
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
