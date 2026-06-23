<script setup lang="ts">
// @ts-nocheck
import { useCommonImports } from "../../hooks/useCommonImports";
const { onMounted, GUI, useExamplesStore, Cesium, getViewer, getGuiMount } =
  useCommonImports();
const store = useExamplesStore();

let viewer = null;

onMounted(() => {
  viewer = getViewer();
  const mount = getGuiMount();
  if (!viewer || !mount) return;
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
    container: mount,
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
