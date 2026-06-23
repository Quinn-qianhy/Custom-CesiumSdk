<template>
  <ExamplePageShell title-param="componentId">
    <template #map>
      <CesiumContainer @viewer-ready="onViewerReady" />
      <activeCom v-if="viewerReady" class="example-runtime" />
    </template>
    <template #gui>
      <ExampleGuiOverlay v-if="viewerReady" />
    </template>
    <template #loading>
      <GlobalLoading :visible="!viewerReady" message="正在初始化 Cesium..." />
    </template>
    <template #code="{ active }">
      <CodePanel v-if="active" />
    </template>
  </ExamplePageShell>
</template>

<script setup lang="ts">
import { ref, shallowRef, provide } from 'vue'
import type { Viewer } from 'cesium'
import ExamplePageShell from '@/components/layout/ExamplePageShell.vue'
import ExampleGuiOverlay from '@/components/layout/ExampleGuiOverlay.vue'
import CesiumContainer from '@/components/CesiumContainer.vue'
import GlobalLoading from '@/components/layout/GlobalLoading.vue'
import activeCom from '@/components/general/activeCom.vue'
import CodePanel from './CodePanel.vue'
import { VIEWER_INJECTION_KEY } from '@/types/injection'

const viewerRef = shallowRef<Viewer | null>(null)
provide(VIEWER_INJECTION_KEY, viewerRef)

const viewerReady = ref(false)

const onViewerReady = (viewer: Viewer) => {
  viewerRef.value = viewer
  viewerReady.value = true
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
