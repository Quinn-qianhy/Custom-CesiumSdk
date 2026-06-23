import type { MenuSection } from './example'

export type EngineId = 'cesium' | 'openlayers' | 'threejs'

export interface EngineConfig {
  id: EngineId
  label: string
  description: string
  menu: MenuSection[]
}
