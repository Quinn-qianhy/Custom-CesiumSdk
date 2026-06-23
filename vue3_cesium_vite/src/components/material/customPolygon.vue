<script setup lang="ts">
// @ts-nocheck
import { useCommonImports } from '../../hooks/useCommonImports'
const { onMounted, GUI, Cesium, useExamplesStore, getViewer, getGuiMount } = useCommonImports()
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