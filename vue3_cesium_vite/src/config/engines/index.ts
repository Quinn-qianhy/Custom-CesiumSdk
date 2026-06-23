import cesiumMenu from '@/config/config.js'
import type { EngineConfig, EngineId } from '@/types/engine'
import type { MenuSection } from '@/types/example'

/** 地图引擎注册表 */
export const ENGINE_REGISTRY: Record<EngineId, EngineConfig> = {
  openlayers: {
    id: 'openlayers',
    label: 'OpenLayers',
    description: 'OpenLayers 二维地图引擎',
    menu: []
  },
  cesium: {
    id: 'cesium',
    label: 'Cesium',
    description: 'CesiumJS 三维地球引擎',
    menu: cesiumMenu as MenuSection[]
  },
  threejs: {
    id: 'threejs',
    label: 'Three.js',
    description: 'Three.js 三维地图引擎',
    menu: []
  }
}

export const ENGINE_LIST = Object.values(ENGINE_REGISTRY)

export const DEFAULT_ENGINE_ID: EngineId = 'cesium'

export function getEngineMenu(engineId: EngineId): MenuSection[] {
  return ENGINE_REGISTRY[engineId]?.menu ?? []
}
