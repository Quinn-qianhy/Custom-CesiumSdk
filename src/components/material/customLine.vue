<script setup lang="ts">
// @ts-nocheck
import { useCommonImports } from '../../hooks/useCommonImports'
import CustomMaterialLine from '../../utils/customMaterial/polylineFlow'
import { withBase } from '../../utils/withBase'

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
  // CustomMaterialLine 是工厂函数，需传入贴图与颜色生成流动线材质
  redLine.polyline.material = CustomMaterialLine({
    image: withBase('/examples/cesium/assets/material/arrow_1.png'),
    color: Cesium.Color.RED
  })

  const typeOptions = {

  }
})
</script>

<style lang="scss" scoped></style>