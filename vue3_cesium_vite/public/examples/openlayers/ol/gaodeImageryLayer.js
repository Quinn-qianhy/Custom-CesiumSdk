import TileLayer from 'ol/layer/Tile.js'
import XYZ from 'ol/source/XYZ.js'

const GAODE_IMAGERY_MAX_ZOOM = 18

/** 高德影像瓦片 URL 模板（style=6 为卫星影像） */
export const GAODE_IMAGERY_URL =
  'https://webst0{1-4}.is.autonavi.com/appmaptile?style=6&x={x}&y={y}&z={z}'

export { GAODE_IMAGERY_MAX_ZOOM }

/** 高德影像版权信息 */
export const GAODE_ATTRIBUTION = '© 高德地图'

/** 创建高德在线影像底图图层（EPSG:3857，OpenLayers 10 直接使用 URL 模板） */
export function createGaodeImageryLayer() {
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

/** 默认视图：北京天安门附近 */
export const DEFAULT_LON_LAT = [116.3912757, 39.906217]
export const DEFAULT_ZOOM = 10
