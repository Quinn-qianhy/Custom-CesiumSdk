<template>
  <div class="funGui" ref="currentComponent">
  </div>
</template>

<script setup>
import { useCommonImports } from '../../hooks/useCommonImports'
import { DrawTool } from '../../utils/draw'
import EllipsoidTrailMaterial from '../../utils/customMaterial/ellipsoidTrailMaterial'
import CustomMaterialLine from '../../utils/customMaterial/polylineFlow'
import RadarScanCircleMaterial from '../../utils/customMaterial/RaderScanCircleMaterial'
const { ref, inject, onMounted, GUI, Cesium, useExamplesStore } = useCommonImports()
const store = useExamplesStore()
console.log(Cesium,"Cesium")
const currentComponent = ref(null)
let viewer = null
// let imageUrl = require("../assets/images/wallMaterial.png");
onMounted(() => {
  viewer = inject('$viewer')
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
  gui.add(globe, 'depthTestAgainstTerrain').name('地形深度检测/depthTestAgainstTerrain').onChange((value) => {
    globe.depthTestAgainstTerrain = value
  })

  const options = {
    color: '点'
  }
  // gui.add(options, 'color', ['点', '线', '面']).name('几何绘制').onChange((value) => {
  //   if (value === '点') {
  //     toDraw(viewer, 'point')
  //   } else if (value === '线') {
  //     toDraw(viewer, 'line')
  //   } else if (value === '面') {
  //     toDraw(viewer, 'polygon')
  //   }
  // })


  var entity = viewer.entities.add({
    //关联时间轴  TimeIntervalCollection管理时间间隔数据的集合  把时间轴的起止时间同步为实体的
    // availability: new Cesium.TimeIntervalCollection([new Cesium.TimeInterval({
    //   start: start,
    //   stop: stop
    // })]),
    position: Cesium.Cartesian3.fromDegrees(104.063245, 30.6628335, 300),
    // polyline: {
    //   positions: Cesium.Cartesian3.fromDegreesArray([104.0, 29.0, 104.0, 28.0]),
    //   material: Cesium.Color.RED.withAlpha(0.9),
    //   width: 20,
    // },
    // orientation: new Cesium.VelocityOrientationProperty(entityPath),
    // cylinder: {
    //   HeightReference: Cesium.HeightReference.CLAMP_TO_GROUND,
    //   length: 700000,
    //   topRadius: 0,
    //   bottomRadius: 700000 / 2,
    //   // material: Cesium.Color.RED.withAlpha(0.4),
    //   material: new EllipsoidTrailMaterial({
    //     color: new Cesium.Color(1.0, 1.0, 0.0, 1.0),
    //     speed: 10.0
    //     // image: "../../public/wallMaterial.png",
    //     // color: Cesium.Color.CHARTREUSE,
    //     // repeat: new Cesium.Cartesian2(1, 3),
    //     // // duration: 1000 // 持续时间
    //     // axisY: true,
    //     // speed: 10 // 速度，建议取值范围1-100
    //   }),
    //   outline: true,
    //   // numberOfVerticalLines: 0,
    //   outlineColor: Cesium.Color.RED.withAlpha(0.8)
    // },
    // ellipse: {
    //   semiMajorAxis: 1000,
    //   semiMinorAxis: 1000,
    //   material: new RadarScanCircleMaterial({
    //     radians: Math.PI/6, // 60度扇形
    //     color: Cesium.Color.BLACK.withAlpha(0.1), // 白色半透明
    //     sectorColor: Cesium.Color.RED,
    //     speed: 10.0,
    //     width: 1.5,
    //     offset: 0.0
    //   })
    // },
    ellipsoid: {
      radii: new Cesium.Cartesian3(1000.0, 1000.0, 1000.0),
      material: new EllipsoidTrailMaterial({
        color: new Cesium.Color(1.0, 1.0, 0.0, 1.0),
        speed: 10.0
      })
    }
  });
  viewer.zoomTo(viewer.entities);

  // const position = Cesium.Cartesian3.fromDegrees(80, 40);
  // const modelMatrix = Cesium.Transforms.eastNorthUpToFixedFrame(position);
  // const radius = 40000.0;
  // const primitive = viewer.scene.primitives.add(new Cesium.Primitive({
  //   geometryInstances: [
  //     new Cesium.GeometryInstance({
  //       geometry: new Cesium.EllipseGeometry({
  //         center: position,
  //         semiMajorAxis: radius,
  //         semiMinorAxis: radius,
  //       })
  //     })
  //   ],
  //   appearance: new Cesium.MaterialAppearance({
  //     material: new RaderScanCircleMaterial({
  //       color: 'rgb(0,255,50)',
  //       sectorColor: 'rgb(0,255,50)',
  //       radians: Math.PI * 3 / 8,
  //       offset: 0.2
  //     }),
  //     flat: false,
  //     faceForward: false,
  //     translucent: true,
  //     closed: false
  //   }),
  //   asynchronous: false,
  //   modelMatrix: modelMatrix
  // }))
  // viewer.zoomTo(primitive)
})
</script>

<style lang="scss" scoped></style>