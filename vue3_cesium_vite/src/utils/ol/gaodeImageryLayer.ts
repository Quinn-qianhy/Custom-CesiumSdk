/*
 * @Author: qianhy
 * @Date: 2026-07-09 15:10:22
 * @LastEditTime: 2026-07-10 15:55:38
 * @LastEditors: qianhy
 * @Description: 高德影像底图图层加载工具函数
 * @FilePath: \trae-cesium-demo\vue3_cesium_vite\src\utils\ol\gaodeImageryLayer.ts
 */
import TileLayer from 'ol/layer/Tile'
import XYZ from 'ol/source/XYZ'

const GAODE_IMAGERY_MAX_ZOOM = 18

/** 高德影像瓦片 URL 模板（style=6 为卫星影像，{1-4} 为子域负载均衡） */
const GAODE_IMAGERY_URL = 'https://webst0{1-4}.is.autonavi.com/appmaptile?style=6&x={x}&y={y}&z={z}'

/**
 * 创建高德在线影像底图图层
 * OpenLayers 10 的 tileCoord[2] 已是标准 XYZ 行号，直接使用 URL 模板即可，勿再做 TMS 翻转
 * @returns 高德影像 TileLayer
 */
export function createGaodeImageryLayer(): TileLayer<XYZ> {
  return new TileLayer({
    source: new XYZ({
      url: GAODE_IMAGERY_URL,
      maxZoom: GAODE_IMAGERY_MAX_ZOOM,
      crossOrigin: 'anonymous'
    }),
    properties: {
      name: 'gaode-imagery'
    }
  })
}
