<template>
  <span class="ol-example-runtime" aria-hidden="true" />
</template>

<script setup lang="ts">
// @ts-nocheck
import { onMounted } from 'vue'
import { fromLonLat } from 'ol/proj'
import { useOlCommonImports } from '@/hooks/useOlCommonImports'

const { GUI, useExamplesStore, getMap, getGuiMount } = useOlCommonImports()
const store = useExamplesStore()

const viewOptions = {
  zoom: 10,
  rotation: 0
}

onMounted(() => {
  const map = getMap()
  const mount = getGuiMount()
  if (!map || !mount) {
    return
  }

  const view = map.getView()
  viewOptions.zoom = view.getZoom() ?? viewOptions.zoom
  viewOptions.rotation = view.getRotation()

  const gui = new GUI({
    container: mount,
    title: store.componentName
  })

  gui
    .add(viewOptions, 'zoom', 2, 18, 1)
    .name('缩放级别')
    .onChange((value: number) => {
      view.setZoom(value)
    })

  gui
    .add(viewOptions, 'rotation', 0, Math.PI * 2, 0.1)
    .name('旋转角度')
    .onChange((value: number) => {
      view.setRotation(value)
    })

  const actions = {
    flyToBeijing: () => {
      view.animate({
        center: fromLonLat([116.3912757, 39.906217]),
        zoom: 12,
        duration: 800
      })
    },
    flyToShanghai: () => {
      view.animate({
        center: fromLonLat([121.4737, 31.2304]),
        zoom: 11,
        duration: 800
      })
    }
  }

  const folder = gui.addFolder('快速定位')
  folder.add(actions, 'flyToBeijing').name('飞往北京')
  folder.add(actions, 'flyToShanghai').name('飞往上海')
  folder.open()
})
</script>

<style lang="scss" scoped>
.ol-example-runtime {
  display: none;
}
</style>
