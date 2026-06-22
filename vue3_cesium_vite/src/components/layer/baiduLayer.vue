<template>
  <div class="funGui" ref="currentComponent"></div>
</template>

<script setup>
import { useCommonImports } from "../../hooks/useCommonImports";
const { ref, inject, onMounted, GUI, useExamplesStore, Cesium } =
  useCommonImports();
const store = useExamplesStore();

const currentComponent = ref(null);
let viewer = null;

onMounted(() => {
  viewer = inject("$viewer");
  viewer.imageryLayers.removeAll();

  const layers = viewer.imageryLayers;
  // 定义百度矢量地图
  const baiduVectorLayer = new Cesium.ImageryLayer(
    new Cesium.BaiDuMapImageryProvider({
      url: "http://online{s}.map.bdimg.com/onlinelabel/?qt=tile&x={x}&y={y}&z={z}",
    })
  );
  // 定义百度影像地图
  const baiduWecLayer = new Cesium.ImageryLayer(
    new Cesium.BaiDuMapImageryProvider({
      url: "https://maponline{s}.bdimg.com/starpic/?qt=satepc&u=x={x};y={y};z={z}",
    })
  );

  const gui = new GUI({
    container: currentComponent.value,
    title: store.componentName,
  });

  const layerObj = {
    '影像地图': baiduWecLayer,
    '矢量地图': baiduVectorLayer
  }
  gui.add(layerObj, '图层切换', ['影像地图','矢量地图']).onChange((value) => {
    viewer.imageryLayers.removeAll();
    switch (value) {
      case '影像地图':
        layers.add(baiduWecLayer)
        break;
      case '矢量地图':
        layers.add(baiduVectorLayer)
        break;
    }
  })
});
</script>

<style></style>
