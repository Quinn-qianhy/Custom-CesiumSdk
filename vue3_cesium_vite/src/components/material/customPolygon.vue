<template>
  <div class="funGui" ref="currentComponent">
  </div>
</template>

<script setup>
import { useCommonImports } from '../../hooks/useCommonImports'
const { ref, inject, onMounted, GUI, Cesium, useExamplesStore } = useCommonImports()
const store = useExamplesStore()

const currentComponent = ref(null)
let viewer = null

onMounted(() => {
  viewer = inject('$viewer')
  const gui = new GUI({
    container: currentComponent.value,
    title: store.componentName
  })
  // const globe = viewer.scene.globe
  //颜色材质
  const colorMaterial = new Cesium.ColorMaterialProperty(Cesium.Color.RED)
  //网格材质
  const gridMaterial = new Cesium.GridMaterialProperty({
    color: Cesium.Color.WHITE
  })
  // 条纹材质
  const stripeMaterial = new Cesium.StripeMaterialProperty({
    evenColor: Cesium.Color.WHITE,
    oddColor: Cesium.Color.BLACK,
  })

  var entityPolygon = viewer.entities.add({
    name: "polygon on surface",
    polygon: {
      hierarchy: Cesium.Cartesian3.fromDegreesArray([
        -115.0,
        37.0,
        -115.0,
        32.0,
        -107.0,
        32.0,
        -107.0,
        37.0,
      ]),
      material: colorMaterial
    },
  });

  viewer.zoomTo(viewer.entities);

})
</script>

<style lang="scss" scoped></style>