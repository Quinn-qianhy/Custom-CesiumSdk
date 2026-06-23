<script setup lang="ts">
// @ts-nocheck
import { useCommonImports } from '../../hooks/useCommonImports'
const { onMounted, GUI, useExamplesStore, getViewer, getGuiMount } = useCommonImports()
const store = useExamplesStore()

let viewer = null

onMounted(() => {
  viewer = getViewer()
  const mount = getGuiMount()
  if (!viewer || !mount) return
  const gui = new GUI({
    container: mount,
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
