<template>
  <ExamplePageShell title-param="componentId" v-model:active-tab="activeTab">
    <template #map>
      <CesiumContainer @viewer-ready="onViewerReady" />
    </template>
    <template #loading>
      <GlobalLoading :visible="!viewerReady" message="正在初始化 Cesium..." />
    </template>
    <template #params>
      <activeCom v-if="viewerReady" />
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
import CesiumContainer from '@/components/CesiumContainer.vue'
import GlobalLoading from '@/components/layout/GlobalLoading.vue'
import activeCom from '@/components/general/activeCom.vue'
import CodePanel from './CodePanel.vue'
import { VIEWER_INJECTION_KEY } from '@/types/injection'

const viewerRef = shallowRef<Viewer | null>(null)
provide(VIEWER_INJECTION_KEY, viewerRef)

const viewerReady = ref(false)
const activeTab = ref('params')

const onViewerReady = (viewer: Viewer) => {
  viewerRef.value = viewer
  viewerReady.value = true
}
</script>
