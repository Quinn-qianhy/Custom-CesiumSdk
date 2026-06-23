<template>
  <ExamplePageShell title-param="examplePath">
    <template #alert>
      <el-alert
        v-if="isPendingExample"
        class="example-page__alert"
        type="warning"
        :closable="false"
        show-icon
        :title="pendingAlertTitle"
        :description="pendingAlertDescription"
      />
    </template>

    <template #map>
      <HtmlExampleFrame
        @loaded="onFrameLoaded"
        @reloading="onFrameReloading"
      />
    </template>
    <template #gui>
      <ExampleGuiOverlay
        ref="guiOverlayRef"
        :force-visible="guiForceVisible"
      />
    </template>
    <template #loading>
      <GlobalLoading :visible="!frameReady" message="正在加载 HTML 示例..." />
    </template>
    <template #code="{ active }">
      <CodePanel v-if="active" example-mode="html" />
    </template>
  </ExamplePageShell>
</template>

<script setup lang="ts">
import { ref, computed, onMounted, onUnmounted, watch } from 'vue'
import { useRoute } from 'vue-router'
import ExamplePageShell from '@/components/layout/ExamplePageShell.vue'
import ExampleGuiOverlay from '@/components/layout/ExampleGuiOverlay.vue'
import HtmlExampleFrame from '@/components/HtmlExampleFrame.vue'
import GlobalLoading from '@/components/layout/GlobalLoading.vue'
import CodePanel from './CodePanel.vue'
import { STATUS_TAG_LABELS } from '@/utils/exampleStatusMeta'
import { createHtmlExampleGuiBridge } from '@/utils/htmlExampleGuiBridge'
import type { HtmlExampleGuiHost } from '@/types/htmlExampleGui'

const route = useRoute()

const frameReady = ref(false)
const hasGuiControls = ref(false)
const guiOverlayRef = ref<InstanceType<typeof ExampleGuiOverlay> | null>(null)
let guiHost: HtmlExampleGuiHost | null = null

/** HTML 桥接：有控件时强制显示，无控件时强制隐藏，加载中不干预 */
const guiForceVisible = computed<boolean | null>(() => {
  if (!frameReady.value) {
    return null
  }
  return hasGuiControls.value ? true : false
})

const isPendingExample = computed(() => route.query.status === 'pending')

const pendingAlertTitle = computed(() => {
  const tags = String(route.query.statusTags ?? '')
    .split(',')
    .filter(Boolean)
    .map((tag) => STATUS_TAG_LABELS[tag] ?? tag)

  if (tags.length) {
    return `此示例标记为待修复：${tags.join('、')}`
  }
  return '此示例标记为待修复'
})

const pendingAlertDescription = computed(
  () =>
    (route.query.statusReason as string) ||
    '该示例可能因缺少服务器数据或 Cesium 定制 API 无法正常展示，源码仍可查看与编辑。'
)

const clearGuiMount = () => {
  hasGuiControls.value = false
  guiHost?.clear()
}

const setupGuiHost = () => {
  guiHost = createHtmlExampleGuiBridge({
    getMount: () => guiOverlayRef.value?.getMount() ?? null,
    getTitle: () =>
      (route.query.title as string) || (route.params.examplePath as string),
    notifyControlsReady: () => {
      hasGuiControls.value = true
    }
  })
  window.__htmlExampleGuiHost__ = guiHost
}

const onFrameLoaded = () => {
  frameReady.value = true
}

const onFrameReloading = () => {
  frameReady.value = false
  clearGuiMount()
}

onMounted(() => {
  setupGuiHost()
})

onUnmounted(() => {
  guiHost?.destroy()
  guiHost = null
  delete window.__htmlExampleGuiHost__
})

watch(
  () => route.params.examplePath,
  () => {
    clearGuiMount()
    frameReady.value = false
  }
)
</script>

<style lang="scss" scoped>
.example-page__alert {
  flex-shrink: 0;
  margin: 0;
  border-radius: 0;
  border-left: none;
  border-right: none;
}
</style>
