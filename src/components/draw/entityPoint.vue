<script setup lang="ts">
// @ts-nocheck
import { useCommonImports } from '../../hooks/useCommonImports'
import { DrawTool } from '../../utils/draw'
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


  const clearPoints = () => {
    options.points.forEach(entity => {
      viewer.entities.remove(entity)
    })
    options.points = []
  }
  const options = {
    clear: clearPoints,
    start: false,
    points: [] // 绘制的点数组
  }
  gui.add(options, 'start').name('绘制开始').onChange((value) => {
    if (value === true) {
      DrawTool.startDraw(viewer, 'point', (entity) => {
        options.points.push(entity)
      })
    } else {
      DrawTool.stopDrawing(viewer)
    }
  })

  gui.add(options, 'clear').name('清除绘制')
  //鼠标浮动点
  const pointParams = {
    color: '#FF0000',
    pixelSize: 10,
    outlineColor: '#000000'
  }
  const startPointGui = gui.addFolder('鼠标浮动点')
  startPointGui.addColor(pointParams, 'color').onChange((value) => { })
  startPointGui.add(pointParams, 'pixelSize', 1, 20, 1).onChange((value) => { })

  //entity绘制完成点
  const entityPointParams = {
    color: '#0000FF',
    pixelSize: 10,
    outlineColor: '#000000',
    outlineWidth: 1,
    heightReference: Cesium.HeightReference.NONE,
  }
  const drawPointGui = gui.addFolder('entity绘制点')
  drawPointGui.addColor(entityPointParams, 'color').onChange((value) => {
    options.points.forEach(entity => {
      entity.point.color = Cesium.Color.fromCssColorString(value)
    })
  })
  drawPointGui.addColor(entityPointParams, 'outlineColor').onChange((value) => {
    options.points.forEach(entity => {
      entity.point.outlineColor = Cesium.Color.fromCssColorString(value)
    })
  })
  drawPointGui.add(entityPointParams, 'pixelSize', 1, 20, 1).onChange((value) => {
    options.points.forEach(entity => {
      entity.point.pixelSize = value
    })
  })
  drawPointGui.add(entityPointParams, 'outlineWidth', 1, 20, 1).onChange((value) => {
    options.points.forEach(entity => {
      entity.point.outlineWidth = value
    })
  })
  drawPointGui.add(entityPointParams, 'heightReference', [Cesium.HeightReference.NONE, Cesium.HeightReference.CLAMP_TO_GROUND, Cesium.HeightReference.RELATIVE_TO_GROUND]).onChange((value) => {
    options.points.forEach(entity => {
      entity.point.heightReference = value
    })
  })
})
</script>

<style lang="scss" scoped></style>