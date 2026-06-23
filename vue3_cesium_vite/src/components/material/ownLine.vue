<template>
  <div class="funGui" ref="currentComponent">
  </div>
</template>

<script setup lang="ts">
// @ts-nocheck
import { useCommonImports } from '../../hooks/useCommonImports'
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
  var glowingLine = viewer.entities.add({
    name: "折线发光材质",
    polyline: {
      positions: Cesium.Cartesian3.fromDegreesArray([
        104.0332281742513,
        30.69907491652907,
        104.10923153655882,
        30.697056684251017
      ]),
      width: 10,
      material: new Cesium.PolylineGlowMaterialProperty({
        glowPower: 0.8,
        color: Cesium.Color.BLUE
      })
    }
  });
  // var dashedLine = viewer.entities.add({
  //   name: "Blue dashed line",
  //   polyline: {
  //     positions: Cesium.Cartesian3.fromDegreesArray([
  //       104.03307699060909,
  //       30.695733283181116,
  //       104.10879937525253,
  //       30.69321987716073
  //     ]),
  //     width: 10,
  //     material: new Cesium.PolylineFlowMaterialProperty({
  //       color: Cesium.Color.fromCssColorString("#a6d96a"),
  //       repeat: new Cesium.Cartesian2(4.0, 1.0),
  //       image: "/static/examples/material/arrow_1.png",
  //       speed: 20
  //     })
  //   }
  // });

  // var purpleArrow = viewer.entities.add({
  //   name: "Purple straight arrow at height",
  //   polyline: {
  //     positions: Cesium.Cartesian3.fromDegreesArray([
  //       104.03316625221242,
  //       30.690255252944123,
  //       104.10722510021458,
  //       30.687616485473797
  //     ]),
  //     width: 10,
  //     arcType: Cesium.ArcType.NONE,
  //     material: new Cesium.PolylineFlowMaterialProperty({
  //       color: Cesium.Color.AQUA,
  //       image: "/static/examples/material/arrow2.png",
  //       repeat: new Cesium.Cartesian2(20, 1),
  //       speed: 30
  //     })
  //   }
  // });

  // viewer.entities.add({
  //   name: "Purple straight arrow at height",
  //   polyline: {
  //     positions: Cesium.Cartesian3.fromDegreesArray([
  //       104.03288445032665,
  //       30.685026097859662,
  //       104.10673852007864,
  //       30.6819749108634
  //     ]),
  //     width: 10,
  //     arcType: Cesium.ArcType.NONE,
  //     material: new Cesium.PolylineFlowMaterialProperty({
  //       color: Cesium.Color.fromCssColorString("#66bd63"),
  //       image: "/static/examples/material/line.png",
  //       repeat: new Cesium.Cartesian2(2.0, 1.0),
  //       speed: 25
  //     })
  //   }
  // });
  // viewer.entities.add({
  //   name: "Purple straight arrow at height",
  //   polyline: {
  //     positions: Cesium.Cartesian3.fromDegreesArray([
  //       104.03268954190479,
  //       30.679092170903008,
  //       104.10616455851273,
  //       30.67549571590221
  //     ]),
  //     width: 10,
  //     arcType: Cesium.ArcType.NONE,
  //     material: new Cesium.PolylineFlowMaterialProperty({
  //       color: Cesium.Color.fromCssColorString("#1a9850"),
  //       image: "/static/examples/material/lineAarrow.png",
  //       speed: 20,
  //       repeat: new Cesium.Cartesian2(5, 1)
  //     })
  //   }
  // });
  // viewer.entities.add({
  //   name: "Purple straight arrow at height",
  //   polyline: {
  //     positions: Cesium.Cartesian3.fromDegreesArray([
  //       104.01624576864165,
  //       30.669490900159023,
  //       104.12041824936227,
  //       30.66614347818527
  //     ]),
  //     width: 10,
  //     arcType: Cesium.ArcType.NONE,
  //     material: new Cesium.PolylineFlowMaterialProperty({
  //       color: Cesium.Color.CHARTREUSE,
  //       image: "/static/examples/material/lineClr.png",
  //       speed: 25
  //     })
  //   }
  // });

  // viewer.entities.add({
  //   name: "Purple straight arrow at height",
  //   polyline: {
  //     positions: Cesium.Cartesian3.fromDegreesArray([
  //       104.01655501133256,
  //       30.65731216344814,
  //       104.1214388934745,
  //       30.65486882894573
  //     ]),
  //     width: 10,
  //     arcType: Cesium.ArcType.NONE,
  //     material: new Cesium.PolylineFlowMaterialProperty({
  //       image: "/static/examples/material/lineClr2.png",
  //       speed: 10
  //     })
  //   }
  // });
  // viewer.entities.add({
  //   name: "Purple straight arrow at height",
  //   polyline: {
  //     positions: Cesium.Cartesian3.fromDegreesArray([
  //       104.014171853155,
  //       30.64625827520461,
  //       104.12756399586742,
  //       30.6449849632324
  //     ]),
  //     width: 10,
  //     arcType: Cesium.ArcType.NONE,
  //     material: new Cesium.PolylineFlowMaterialProperty({
  //       color: new Cesium.Color(89 / 255, 249 / 255, 255 / 255, 0.8),
  //       image: "/static/examples/material/LineDataTrans.png",
  //       speed: 8
  //     })
  //   }
  // });
  // viewer.entities.add({
  //   name: "Purple straight arrow at height",
  //   polyline: {
  //     positions: Cesium.Cartesian3.fromDegreesArray([
  //       104.02971505424267,
  //       30.638295340730842,
  //       104.10961408351449,
  //       30.633233446477604
  //     ]),
  //     width: 10,
  //     arcType: Cesium.ArcType.NONE,
  //     material: new Cesium.PolylineFlowMaterialProperty({
  //       color: Cesium.Color.fromCssColorString("#00ff00"),
  //       image: "/static/examples/material/LinkPulse.png",
  //       speed: 3
  //     })
  //   }
  // });

  viewer.zoomTo(viewer.entities);

})
</script>

<style lang="scss" scoped></style>