<template>
  <iframe
    ref="frameRef"
    class="html-example-frame"
    :srcdoc="srcdoc"
    frameborder="0"
    title="HTML 示例"
    @load="onFrameLoad"
  />
</template>

<script setup lang="ts">
import { ref, watch, onMounted } from 'vue'
import { useRoute } from 'vue-router'
import { storeToRefs } from 'pinia'
import { useExamplesStore } from '@/stores/examplesStore'
import {
  clearHtmlExampleSourceCache,
  loadHtmlExampleSource
} from '@/utils/exampleSource'
import { prepareHtmlExampleDoc } from '@/utils/prepareHtmlExampleDoc'

const emit = defineEmits<{
  loaded: []
  reloading: []
}>()

const route = useRoute()
const store = useExamplesStore()
const { htmlCustomSource, htmlApplyRevision } = storeToRefs(store)

const frameRef = ref<HTMLIFrameElement | null>(null)
const srcdoc = ref('')
const originalSource = ref('')

const loadOriginal = async () => {
  emit('reloading')
  const text = await loadHtmlExampleSource(route.params.examplePath as string)
  originalSource.value = text
  srcdoc.value = prepareHtmlExampleDoc(htmlCustomSource.value ?? text)
}

const onFrameLoad = () => {
  emit('loaded')
}

watch(htmlApplyRevision, () => {
  emit('reloading')
  srcdoc.value = prepareHtmlExampleDoc(htmlCustomSource.value ?? originalSource.value)
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
