<!--
 * @Author: qianhy
 * @Date: 2026-07-09 15:07:32
 * @LastEditTime: 2026-07-10 15:16:56
 * @LastEditors: qianhy
 * @Description: 文件修改
 * @FilePath: \trae-cesium-demo\vue3_cesium_vite\src\components\openlayers\olVectorFeatures.vue
-->
<template>
  <!-- 逻辑示例组件，地图渲染在 OpenLayersContainer 中 -->
  <span class="ol-example-runtime" aria-hidden="true" />
</template>

<script setup lang="ts">
import { onMounted } from 'vue'
import OlFeature from 'ol/Feature'
import OlPoint from 'ol/geom/Point'
import OlLineString from 'ol/geom/LineString'
import OlPolygon from 'ol/geom/Polygon'
import OlVectorLayer from 'ol/layer/Vector'
import OlVectorSource from 'ol/source/Vector'
import { Fill, Stroke, Style, Circle as CircleStyle } from 'ol/style'
import { fromLonLat } from 'ol/proj'
import { useOlCommonImports } from '@/hooks/useOlCommonImports'

const { GUI, useExamplesStore, getMap, getGuiMount } = useOlCommonImports()
const store = useExamplesStore()

const layerVisibility = {
  point: true,
  line: true,
  polygon: true
}

let pointLayer = null
let lineLayer = null
let polygonLayer = null

const pointStyle = new Style({
  image: new CircleStyle({
    radius: 8,
    fill: new Fill({ color: '#e74c3c' }),
    stroke: new Stroke({ color: '#fff', width: 2 })
  })
})

const lineStyle = new Style({
  stroke: new Stroke({
    color: '#3498db',
    width: 4
  })
})

const polygonStyle = new Style({
  fill: new Fill({ color: 'rgba(46, 204, 113, 0.35)' }),
  stroke: new Stroke({
    color: '#27ae60',
    width: 2
  })
})

onMounted(() => {
  const map = getMap()
  const mount = getGuiMount()
  if (!map || !mount) {
    return
  }

  pointLayer = new OlVectorLayer({
    source: new OlVectorSource({
      features: [
        new OlFeature({
          geometry: new OlPoint(fromLonLat([116.3912757, 39.906217]))
        })
      ]
    }),
    style: pointStyle
  })

  lineLayer = new OlVectorLayer({
    source: new OlVectorSource({
      features: [
        new OlFeature({
          geometry: new OlLineString([
            fromLonLat([116.35, 39.92]),
            fromLonLat([116.42, 39.9]),
            fromLonLat([116.45, 39.88])
          ])
        })
      ]
    }),
    style: lineStyle
  })

  polygonLayer = new OlVectorLayer({
    source: new OlVectorSource({
      features: [
        new OlFeature({
          geometry: new OlPolygon([
            [
              fromLonLat([116.37, 39.93]),
              fromLonLat([116.43, 39.93]),
              fromLonLat([116.43, 39.89]),
              fromLonLat([116.37, 39.89]),
              fromLonLat([116.37, 39.93])
            ]
          ])
        })
      ]
    }),
    style: polygonStyle
  })

  map.addLayer(pointLayer)
  map.addLayer(lineLayer)
  map.addLayer(polygonLayer)

  const gui = new GUI({
    container: mount,
    title: store.componentName
  })

  gui
    .add(layerVisibility, 'point')
    .name('显示点要素')
    .onChange((value: boolean) => {
      pointLayer?.setVisible(value)
    })

  gui
    .add(layerVisibility, 'line')
    .name('显示线要素')
    .onChange((value: boolean) => {
      lineLayer?.setVisible(value)
    })

  gui
    .add(layerVisibility, 'polygon')
    .name('显示面要素')
    .onChange((value: boolean) => {
      polygonLayer?.setVisible(value)
    })
})
</script>

<style lang="scss" scoped>
.ol-example-runtime {
  display: none;
}
</style>
