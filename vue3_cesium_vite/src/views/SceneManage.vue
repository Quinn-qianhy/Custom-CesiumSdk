<template>
  <ExamplePageShell title-param="componentId">
    <template #map>
      <CesiumContainer v-if="isCesium" @viewer-ready="onViewerReady" />
      <OpenLayersContainer v-else-if="isOpenLayers" @map-ready="onMapReady" />
      <activeCom v-if="runtimeReady" class="example-runtime" :engine-id="engineId" />
    </template>
    <template #gui>
      <ExampleGuiOverlay v-if="runtimeReady" />
    </template>
    <template #loading>
      <GlobalLoading :visible="!runtimeReady" :message="loadingMessage" />
    </template>
    <template #code="{ active }">
      <CodePanel v-if="active" />
    </template>
  </ExamplePageShell>
</template>

<script setup lang="ts">
import { ref, shallowRef, provide, computed } from 'vue'
import type { Viewer } from 'cesium'
import type Map from 'ol/Map'
import ExamplePageShell from '@/components/layout/ExamplePageShell.vue'
import ExampleGuiOverlay from '@/components/layout/ExampleGuiOverlay.vue'
import CesiumContainer from '@/components/CesiumContainer.vue'
import OpenLayersContainer from '@/components/OpenLayersContainer.vue'
import GlobalLoading from '@/components/layout/GlobalLoading.vue'
import activeCom from '@/components/general/activeCom.vue'
import CodePanel from './CodePanel.vue'
import { VIEWER_INJECTION_KEY, OL_MAP_INJECTION_KEY } from '@/types/injection'
import { useExampleEngine } from '@/hooks/useExampleEngine'

const { engineId, isCesium, isOpenLayers } = useExampleEngine()

const viewerRef = shallowRef<Viewer | null>(null)
const mapRef = shallowRef<Map | null>(null)
provide(VIEWER_INJECTION_KEY, viewerRef)
provide(OL_MAP_INJECTION_KEY, mapRef)

const cesiumReady = ref(false)
const olReady = ref(false)

const runtimeReady = computed(() => {
  if (isCesium.value) {
    return cesiumReady.value
  }
  if (isOpenLayers.value) {
    return olReady.value
  }
  return false
})

const loadingMessage = computed(() => {
  if (isOpenLayers.value) {
    return '正在初始化 OpenLayers...'
  }
  return '正在初始化 Cesium...'
})

const onViewerReady = (viewer: Viewer) => {
  viewerRef.value = viewer
  cesiumReady.value = true
}

const onMapReady = (map: Map) => {
  mapRef.value = map
  olReady.value = true
}
</script>

<style lang="scss" scoped>
.example-runtime {
  position: absolute;
  width: 0;
  height: 0;
  overflow: hidden;
  pointer-events: none;
  visibility: hidden;
}
</style>
