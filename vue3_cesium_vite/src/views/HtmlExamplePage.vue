<template>
  <ExamplePageShell title-param="examplePath" v-model:active-tab="activeTab">
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
    <template #loading>
      <GlobalLoading :visible="!frameReady" message="正在加载 HTML 示例..." />
    </template>
    <template #params>
      <div
        id="html-example-gui-mount"
        ref="guiMountRef"
        class="funGui html-example-gui"
      />
      <p
        v-if="frameReady && !hasGuiControls"
        class="html-example-info__desc html-example-info__empty"
      >
        此示例无可调参数，可在「源码」标签查看与编辑代码。
      </p>
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
import HtmlExampleFrame from '@/components/HtmlExampleFrame.vue'
import GlobalLoading from '@/components/layout/GlobalLoading.vue'
import CodePanel from './CodePanel.vue'
import { STATUS_TAG_LABELS } from '@/utils/exampleStatusMeta'
import type { HtmlExampleGuiHost } from '@/types/htmlExampleGui'

const route = useRoute()

const frameReady = ref(false)
const hasGuiControls = ref(false)
const activeTab = ref('params')
const guiMountRef = ref<HTMLElement | null>(null)

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
  if (guiMountRef.value) {
    guiMountRef.value.innerHTML = ''
  }
}

const setupGuiHost = () => {
  const host: HtmlExampleGuiHost = {
    getMount: () => guiMountRef.value,
    getTitle: () =>
      (route.query.title as string) || (route.params.examplePath as string),
    clear: clearGuiMount,
    notifyControlsReady: () => {
      hasGuiControls.value = true
    }
  }
  window.__htmlExampleGuiHost__ = host
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

.html-example-info {
  &__desc {
    margin: 0;
    font-size: 0.875rem;
    line-height: 1.6;
    color: var(--text-secondary, #999);
  }

  &__empty {
    padding: 16px;
  }
}

.html-example-gui:empty {
  display: none;
}
</style>
