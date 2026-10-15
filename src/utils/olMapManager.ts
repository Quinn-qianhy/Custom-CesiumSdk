import Map from 'ol/Map'
import View from 'ol/View'
import { fromLonLat } from 'ol/proj'
import { createGaodeImageryLayer } from '@/utils/ol/gaodeImageryLayer'

/** 默认中心点：北京天安门附近 */
const DEFAULT_CENTER = fromLonLat([116.3912757, 39.906217])
const DEFAULT_ZOOM = 10

/** OpenLayers 地图单例管理器 */
class OlMapManagerService {
  map: Map | null = null

  createMap(container: HTMLElement): Map {
    if (this.map) {
      this.destroyMap()
    }

    this.map = new Map({
      target: container,
      layers: [createGaodeImageryLayer()],
      view: new View({
        center: DEFAULT_CENTER,
        zoom: DEFAULT_ZOOM
      })
    })

    return this.map
  }

  destroyMap(): void {
    if (this.map) {
      this.map.setTarget(undefined)
      this.map.dispose()
    }
    this.map = null
  }

  getMap(): Map | null {
    return this.map
  }

  /** 切换示例时重置图层与视图，保留底图 */
  resetMapState(): void {
    const map = this.map
    if (!map) {
      return
    }

    const layers = map.getLayers().getArray().slice()
    layers.forEach((layer, index) => {
      if (index > 0) {
        map.removeLayer(layer)
      }
    })

    const view = map.getView()
    view.setCenter(DEFAULT_CENTER)
    view.setZoom(DEFAULT_ZOOM)
  }
}

export const olMapManager = new OlMapManagerService()
