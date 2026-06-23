<template>
  <iframe
    ref="frameRef"
    class="html-example-frame"
    :src="frameSrc"
    frameborder="0"
    title="HTML 示例"
    @load="onFrameLoad"
  />
</template>

<script setup lang="ts">
import { ref, watch, onMounted, onUnmounted } from 'vue'
import { useRoute } from 'vue-router'
import { storeToRefs } from 'pinia'
import { useExamplesStore } from '@/stores/examplesStore'
import {
  clearHtmlExampleSourceCache,
  loadHtmlExampleSource
} from '@/utils/exampleSource'
import { getHtmlExampleFetchPath } from '@/utils/exampleResolver'
import { prepareHtmlExampleDoc } from '@/utils/prepareHtmlExampleDoc'

const emit = defineEmits<{
  loaded: []
  reloading: []
}>()

const route = useRoute()
const store = useExamplesStore()
const { htmlCustomSource, htmlApplyRevision } = storeToRefs(store)

const frameRef = ref<HTMLIFrameElement | null>(null)
const frameSrc = ref('')
const originalSource = ref('')
let blobUrl: string | null = null

/** 释放 blob URL，避免内存泄漏 */
const revokeBlobUrl = () => {
  if (blobUrl) {
    URL.revokeObjectURL(blobUrl)
    blobUrl = null
  }
}

/** 默认走真实 URL；源码编辑后走 blob，避免 srcdoc 下 Cesium 地球无法渲染 */
const applyFrameSource = () => {
  revokeBlobUrl()

  if (htmlCustomSource.value != null) {
    const doc = prepareHtmlExampleDoc(htmlCustomSource.value)
    blobUrl = URL.createObjectURL(new Blob([doc], { type: 'text/html;charset=utf-8' }))
    frameSrc.value = blobUrl
    return
  }

  frameSrc.value = getHtmlExampleFetchPath(route.params.examplePath as string)
}

const loadOriginal = async () => {
  emit('reloading')
  const text = await loadHtmlExampleSource(route.params.examplePath as string)
  originalSource.value = text
  applyFrameSource()
}

const onFrameLoad = () => {
  emit('loaded')
}

watch(htmlApplyRevision, () => {
  emit('reloading')
  applyFrameSource()
})

watch(
  () => route.params.examplePath,
  async () => {
    clearHtmlExampleSourceCache()
    store.resetHtmlCustomSource()
    await loadOriginal()
  }
)

onMounted(async () => {
  await loadOriginal()
})

onUnmounted(() => {
  revokeBlobUrl()
})
</script>

<style scoped lang="scss">
.html-example-frame {
  width: 100%;
  height: 100%;
  border: 0;
  display: block;
  background: #000;
}
</style>
