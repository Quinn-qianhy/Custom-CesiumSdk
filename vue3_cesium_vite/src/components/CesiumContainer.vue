<template>
  <div ref="containerRef" class="cesium-container" />
</template>

<script setup lang="ts">
import { ref, shallowRef, onMounted, onUnmounted } from 'vue'
import type { Viewer } from 'cesium'
import { sceneManager } from '@/utils/sceneManager'

const emit = defineEmits<{
  'viewer-ready': [viewer: Viewer]
}>()

const containerRef = ref<HTMLElement | null>(null)
const viewerRef = shallowRef<Viewer | null>(null)

onMounted(() => {
  if (containerRef.value) {
    viewerRef.value = sceneManager.createViewer(containerRef.value)
    emit('viewer-ready', viewerRef.value)
  }
})

onUnmounted(() => {
  sceneManager.destroyViewer()
  viewerRef.value = null
})
</script>

<style scoped lang="scss">
.cesium-container {
  width: 100%;
  height: 100%;
}
</style>
