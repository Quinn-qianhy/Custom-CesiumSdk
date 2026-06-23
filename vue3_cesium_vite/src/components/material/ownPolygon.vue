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
  // 棋盘材质
  const checkerboardMaterial = new Cesium.CheckerboardMaterialProperty({
    evenColor: Cesium.Color.WHITE,
    oddColor: Cesium.Color.BLACK,
  })
  // 实体
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

  //材质类型选择
  const materialType = {
    type: ['颜色材质']
  }
  const materialFolder = gui.addFolder('材质类型选择')
  materialFolder.add(materialType, 'type', ['颜色材质', '网格材质', '条纹材质', '棋盘材质']).onChange((value) => {
    colorFolder.hide()
    gridFolder.hide()
    stripeFolder.hide()
    checkerboardFolder.hide()
    if (value === '颜色材质') {
      colorFolder.show()
      entityPolygon.polygon.material = colorMaterial
    }
    if (value === '网格材质') {
      gridFolder.show()
      entityPolygon.polygon.material = gridMaterial
    }
    if (value === '条纹材质') {
      stripeFolder.show()
      entityPolygon.polygon.material = stripeMaterial
    }
    if (value === '棋盘材质') {
      checkerboardFolder.show()
      entityPolygon.polygon.material = checkerboardMaterial
    }
  })
  // 颜色材质调试
  const colorParams = {
    color: '#ff0000',
    outlineWidth: 1.0,
    outlineColor: '#000000',
    outline: false
  }
  const colorFolder = gui.addFolder('基础颜色材质')
  colorFolder.addColor(colorParams, 'color').onChange((value) => {
    entityPolygon.polygon.material.color = Cesium.Color.fromCssColorString(value)
  })
  //网格材质调试
  const gridParams = {
    color: '#ffffff',
    cellAlpha: 0.1, //指定单元格 alpha 值的数字属性
    lineCount: 8, //指定沿每个轴的网格线数
    lineThickness: 1, //指定沿每个轴的网格线的粗细
    lineOffset: 0 //指定网格线沿每个轴的起始偏移量
  }
  const gridFolder = gui.addFolder('网格材质').hide()
  gridFolder.addColor(gridParams, 'color').onChange((value) => {
    entityPolygon.polygon.material.color = Cesium.Color.fromCssColorString(value)
  })
  gridFolder.add(gridParams, 'cellAlpha', 0.1, 1, 0.1).onChange((value) => {
    entityPolygon.polygon.material.cellAlpha = value
  })
  gridFolder.add(gridParams, 'lineCount', 8, 20, 1).onChange((value) => {
    entityPolygon.polygon.material.lineCount = new Cesium.Cartesian2(value, value)
  })
  gridFolder.add(gridParams, 'lineThickness', 1, 10, 1).onChange((value) => {
    entityPolygon.polygon.material.lineThickness = new Cesium.Cartesian2(value, value)
  })
  gridFolder.add(gridParams, 'lineOffset', 0, 10, 1).onChange((value) => {
    entityPolygon.polygon.material.lineOffset = new Cesium.Cartesian2(value, value)
  })


  //条纹材质调试
  const stripeParams = {
    evenColor: '#ffffff',
    oddColor: '#000000',
    offset: 0.0, //指定在模式中开始材料的距离
    repeat: 1.0, //指定条纹重复的次数
  }
  const stripeFolder = gui.addFolder('条纹材质').hide()
  stripeFolder.addColor(stripeParams, 'evenColor').onChange((value) => {
    entityPolygon.polygon.material.evenColor = Cesium.Color.fromCssColorString(value)
  })
  stripeFolder.addColor(stripeParams, 'oddColor').onChange((value) => {
    entityPolygon.polygon.material.oddColor = Cesium.Color.fromCssColorString(value)
  })
  stripeFolder.add(stripeParams, 'offset', 0, 10, 1).onChange((value) => {
    entityPolygon.polygon.material.offset = value
  })
  stripeFolder.add(stripeParams, 'repeat', 1, 10, 1).onChange((value) => {
    entityPolygon.polygon.material.repeat = value
  })

  //棋盘材质调试
  const checkerboardParams = {
    evenColor: '#ffffff',
    oddColor: '#000000',
    repeat: 2, //指定棋盘重复的次数
  }
  const checkerboardFolder = gui.addFolder('棋盘材质').hide()
  checkerboardFolder.addColor(checkerboardParams, 'evenColor').onChange((value) => {
    entityPolygon.polygon.material.evenColor = Cesium.Color.fromCssColorString(value)
  })
  checkerboardFolder.addColor(checkerboardParams, 'oddColor').onChange((value) => {
    entityPolygon.polygon.material.oddColor = Cesium.Color.fromCssColorString(value)
  })
  checkerboardFolder.add(checkerboardParams, 'repeat', 2, 10, 1).onChange((value) => {
    entityPolygon.polygon.material.repeat = new Cesium.Cartesian2(value, value)
  })
})
</script>

<style lang="scss" scoped></style>