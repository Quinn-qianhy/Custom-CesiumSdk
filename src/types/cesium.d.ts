/**
 * 自编译 Cesium 包（public/cesium）类型声明
 */
declare module 'cesium' {
  export class Viewer {
    constructor(container: string | HTMLElement, options?: Record<string, unknown>)
    scene: {
      globe: {
        enableLighting: boolean
        depthTestAgainstTerrain: boolean
        show: boolean
        pick: (ray: unknown, scene: unknown) => Cartesian3 | undefined
      }
      canvas: HTMLCanvasElement
      skyBox: { show: boolean }
    }
    camera: {
      position: Cartesian3
      heading: number
      pitch: number
      roll: number
      setView: (options: Record<string, unknown>) => void
      getPickRay: (position: Cartesian2) => Ray | undefined
    }
    entities: {
      add: (entity: Record<string, unknown>) => Entity
      remove: (entity: Entity) => boolean
      removeAll: () => void
    }
    dataSources: { removeAll: () => void }
    imageryLayers: {
      add: (layer: unknown) => unknown
      addImageryProvider: (provider: unknown) => unknown
      removeAll: () => void
    }
    isDestroyed: () => boolean
    destroy: () => void
    zoomTo: (target: unknown) => void
  }

  export class Entity {
    id: string
    point?: Record<string, unknown>
    polyline?: Record<string, unknown>
    polygon?: Record<string, unknown>
    ellipse?: Record<string, unknown>
    rectangle?: Record<string, unknown>
    position?: unknown
  }

  export class Cartesian2 {
    constructor(x?: number, y?: number)
  }

  export class Cartesian3 {
    static fromDegrees(lng: number, lat: number, alt?: number): Cartesian3
    static fromDegreesArray(coordinates: number[]): Cartesian3[]
    static distance(left: Cartesian3, right: Cartesian3): number
  }

  export class Cartographic {
    longitude: number
    latitude: number
    height: number
    static fromCartesian(cartesian: Cartesian3): Cartographic
  }

  export class Rectangle {
    constructor(west: number, south: number, east: number, north: number)
  }

  export class Ray {}

  export class Color {
    constructor(red?: number, green?: number, blue?: number, alpha?: number)
    static RED: Color
    static WHITE: Color
    static BLUE: Color
    static BLACK: Color
    static fromCssColorString(color: string): Color
    withAlpha(alpha: number): Color
    rgb: { r: number; g: number; b: number }
    a: number
  }

  export class Event {
    constructor()
  }

  export const Math: {
    toRadians: (degrees: number) => number
    toDegrees: (radians: number) => number
  }

  export const Ion: { defaultAccessToken: string }

  export class ScreenSpaceEventHandler {
    constructor(canvas: HTMLCanvasElement)
    setInputAction: (
      action: (event: Record<string, unknown>) => void,
      type: number
    ) => void
    destroy: () => void
  }

  export const ScreenSpaceEventType: Record<string, number>

  export class CallbackProperty {
    constructor(callback: () => unknown, isConstant?: boolean)
  }

  export const Property: {
    getValueOrClonedDefault: (
      property: unknown,
      time: unknown,
      defaultValue: Color,
      result: Record<string, unknown>
    ) => unknown
    getValueOrDefault: (...args: unknown[]) => unknown
    equals: (a: unknown, b: unknown) => boolean
  }

  export class MaterialProperty {
    static getValue: (...args: unknown[]) => void
  }

  export const Material: Record<string, unknown>

  export class UrlTemplateImageryProvider {
    constructor(options: Record<string, unknown>)
  }

  export class ColorMaterialProperty {
    constructor(color: Color)
  }

  export class GridMaterialProperty {
    constructor(options?: Record<string, unknown>)
  }

  export class StripeMaterialProperty {
    constructor(options?: Record<string, unknown>)
  }

  export class CheckerboardMaterialProperty {
    constructor(options?: Record<string, unknown>)
  }

  export class PolylineGlowMaterialProperty {
    constructor(options?: Record<string, unknown>)
  }

  export class ImageryLayer {
    constructor(provider: unknown)
  }

  export const HeightReference: Record<string, number>

  export const BaiDuMapImageryProvider: new (options?: Record<string, unknown>) => unknown

  export const defaultValue: (...args: unknown[]) => unknown
  export const createPropertyDescriptor: (...args: unknown[]) => unknown

  export function defined(value: unknown): boolean
}

// Vue 侧 Cesium 打进 bundle 后需显式指定静态资源根（src/main.ts 赋值）
interface Window {
  CESIUM_BASE_URL?: string
}
