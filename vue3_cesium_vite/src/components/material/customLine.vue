<template>
  <div class="funGui" ref="currentComponent">
  </div>
</template>

<script setup lang="ts">
// @ts-nocheck
import { useCommonImports } from '../../hooks/useCommonImports'
import CustomMaterialLine from '../../utils/customMaterial/polylineFlow'

const { ref, onMounted, GUI, Cesium, useExamplesStore, getViewer } = useCommonImports()
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
  var redLine = viewer.entities.add({
    name: "Red line on terrain",
    polyline: {
      positions: Cesium.Cartesian3.fromDegreesArray([
        104.03295520287969,
        30.701755327449018,
        104.11020303098933,
        30.699298233275737
      ]),
      width: 10,
      material: Cesium.Color.RED,
      clampToGround: true
    }
  });
  viewer.zoomTo(viewer.entities);
  redLine.polyline.material = CustomMaterialLine

  const typeOptions = {

  }
})
</script>

<style lang="scss" scoped></style>