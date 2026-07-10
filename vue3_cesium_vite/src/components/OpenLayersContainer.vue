<template>
  <div ref="containerRef" class="ol-container" />
</template>

<script setup lang="ts">
import { ref, shallowRef, onMounted, onUnmounted } from 'vue'
import type Map from 'ol/Map'
import { olMapManager } from '@/utils/olMapManager'

const emit = defineEmits<{
  'map-ready': [map: Map]
}>()

const containerRef = ref<HTMLElement | null>(null)
const mapRef = shallowRef<Map | null>(null)

onMounted(() => {
  if (containerRef.value) {
    mapRef.value = olMapManager.createMap(containerRef.value)
    emit('map-ready', mapRef.value)
  }
})

onUnmounted(() => {
  olMapManager.destroyMap()
  mapRef.value = null
})
</script>

<style scoped lang="scss">
.ol-container {
  width: 100%;
  height: 100%;
}
</style>
