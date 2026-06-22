/*
 * @Author: qianhy
 * @Date: 2025-11-19 21:21:18
 * @LastEditTime: 2025-12-18 22:09:38
 * @LastEditors: qianhy
 * @Description: Cesium 地图插件
 * @FilePath: \vue3_cesium_vite\src\plugins\cesiumView.js
 */
import {
  initViewer,
  setScene,
  getCameraPosition,
  createLocationBar
} from "@/utils/sceneManager.js";
import * as Cesium from 'cesium'
// vue的插件: 导出一个对象
// 1. 在该对象必须包含一个install方法
// 2. 当执行app.use(插件对象)时, 会自动执行
export default {
  install(app) {
    // 初始化cesium实例
    Cesium.Ion.defaultAccessToken =
      "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJqdGkiOiI4Mjc1NzgzYi0zNTRkLTQyNTMtYjUxNy02MDYxZDIxZDZhYjYiLCJpZCI6MTg2NzIwLCJpYXQiOjE3MDM3Mjg1NjV9.fv1GhAWeh2xXgJn6cAdla_T3-PdBWYlckq5SBhFuuZo";
    // 创建地图容器 <div id="map" style="width: 100%; height:100%">
    const container = document.createElement("div");
    container.id = "cesiumContainer";
    // const appElement = document.getElementById("app");
    document.body.appendChild(container);
    // 初始化cesium地图对象viewer
    const viewer = initViewer("cesiumContainer");
    // const params = getposition(viewer)
    // createLocationBar(container, params)
    // 设置场景
    setScene(viewer);
    app.provide("$viewer", viewer);
  },
};