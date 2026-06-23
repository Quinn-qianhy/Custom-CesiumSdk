<template>
  <div class="funGui" ref="currentComponent">
  </div>
</template>

<script setup lang="ts">
// @ts-nocheck
import { useCommonImports } from '../../hooks/useCommonImports'
const { ref, onMounted, GUI, useExamplesStore, getViewer } = useCommonImports()
const store = useExamplesStore()

const currentComponent = ref(null)
let viewer = null

onMounted(() => {
  viewer = getViewer()
  if (!viewer) return
  const gui = new GUI({
    container: currentComponent.value,
    title: store.componentName
  })
  const globe = viewer.scene.globe

  gui.add(globe, 'show').name('Show Globe').onChange((value) => {
    globe.show = value
  })
  gui.add(viewer.scene.skyBox, 'show').name('天空盒背景').onChange((value) => {
    viewer.scene.skyBox.show = value
  })
  gui.add(globe, 'enableLighting').name('全球光照/enableLighting').onChange((value) => {
    globe.enableLighting = value
  })
})
</script>

<style lang="scss" scoped></style>