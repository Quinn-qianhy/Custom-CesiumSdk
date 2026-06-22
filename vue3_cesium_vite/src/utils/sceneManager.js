/**
 * Cesium 场景管理器
 * 封装了 Cesium 地图的初始化、场景设置、相机控制等功能
 */

// 获取全局 Cesium 对象
import * as Cesium from "cesium"

/**
 * 初始化地图场景
 * @param {string|HTMLElement} container - 地图容器元素或其ID
 * @returns {Cesium.Viewer} Cesium 查看器实例
 */
export const initViewer = (container) => {
  const viewer = new Cesium.Viewer(container, {
    timeline: false, // 是否显示时间线控件
    animation: false, // 是否显示动画控件
    infoBox: false, // 是否显示点击要素之后显示的信息
    selectionIndicator: false, // 选中元素显示,默认true
    homeButton: false,
    fullscreenButton: false,
    geocoder: false,
    sceneModePicker: false,
    shouldAnimate: true
  });
  return viewer;
};

/**
 * 设置场景
 * @param {Cesium.Viewer} viewer - Cesium 查看器实例
 */
export const setScene = (viewer) => {
  // 关闭光照
  viewer.scene.globe.enableLighting = false;
  // 设置贴地
  viewer.scene.globe.depthTestAgainstTerrain = true;

  // 设置初始视角（北京）
  setCameraView(viewer, 116.38111111111111, 39.90888888888889, 10000000);
};

/**
 * 设置相机视角
 * @param {Cesium.Viewer} viewer - Cesium 查看器实例
 * @param {number} lng - 经度
 * @param {number} lat - 纬度
 * @param {number} alt - 高度
 * @param {Object} [orientation] - 相机朝向
 */
export const setCameraView = (viewer, lng, lat, alt, orientation = {}) => {
  viewer.camera.setView({
    destination: Cesium.Cartesian3.fromDegrees(lng, lat, alt),
    orientation: {
      heading: Cesium.Math.toRadians(orientation.heading || 0),
      pitch: Cesium.Math.toRadians(orientation.pitch || -90),
      roll: orientation.roll || 0,
    },
  });
};

/**
 * 获取相机位置信息
 * @param {Cesium.Viewer} viewer - Cesium 查看器实例
 * @returns {Object} 包含经纬度、高度和相机朝向的对象
 */
export const getCameraPosition = (viewer) => {
  const position = viewer.camera.position;
  const cartographic = Cesium.Cartographic.fromCartesian(position);
  
  return {
    lng: Cesium.Math.toDegrees(cartographic.longitude).toFixed(8), // 经度
    lat: Cesium.Math.toDegrees(cartographic.latitude).toFixed(8), // 纬度
    alt: cartographic.height.toFixed(2), // 高度
    heading: Cesium.Math.toDegrees(viewer.camera.heading).toFixed(2), // 偏航角
    pitch: Cesium.Math.toDegrees(viewer.camera.pitch).toFixed(2), // 俯仰角
    roll: Cesium.Math.toDegrees(viewer.camera.roll).toFixed(2) // 翻滚角
  };
};

/**
 * 创建定位信息栏
 * @param {HTMLElement} container - 容器元素
 * @param {Object} params - 定位参数
 */
export const createLocationBar = (container, params) => {
  // 创建定位信息栏
  const locationBar = document.createElement("div");
  locationBar.className = "location-bar";
  locationBar.innerHTML = `
    <div>经度: ${params.lng}</div>
    <div>纬度: ${params.lat}</div>
    <div>高度: ${params.alt}</div>
    <div>偏航角: ${params.heading}</div>
    <div>俯仰角: ${params.pitch}</div>
    <div>翻滚角: ${params.roll}</div>
  `;
  container.appendChild(locationBar);

  // 添加样式
  const style = document.createElement("style");
  style.textContent = `
    .location-bar {
      position: absolute;
      top: 10px;
      right: 10px;
      background: rgba(0, 0, 0, 0.7);
      color: white;
      padding: 10px;
      border-radius: 5px;
      font-family: Arial, sans-serif;
      font-size: 12px;
      z-index: 1000;
    }
    .location-bar div {
      margin: 2px 0;
    }
  `;
  document.head.appendChild(style);
};

/**
 * 添加地图图层
 * @param {Cesium.Viewer} viewer - Cesium 查看器实例
 * @param {string} type - 图层类型
 * @param {Object} options - 图层选项
 * @returns {Cesium.ImageryLayer} 添加的图层
 */
export const addLayer = (viewer, type, options = {}) => {
  switch (type) {
    case 'gaode':
      return viewer.imageryLayers.addImageryProvider(
        new Cesium.UrlTemplateImageryProvider({
          url: "https://webst01.is.autonavi.com/appmaptile?style=6&x={x}&y={y}&z={z}",
          ...options
        })
      );
    case 'baidu':
      return viewer.imageryLayers.addImageryProvider(
        new Cesium.UrlTemplateImageryProvider({
          url: "http://online3.map.bdimg.com/onlinelabel/?qt=tile&x={x}&y={y}&z={z}&styles=pl&scaler=1&p=1",
          ...options
        })
      );
    default:
      throw new Error(`Unsupported layer type: ${type}`);
  }
};