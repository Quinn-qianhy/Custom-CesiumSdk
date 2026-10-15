import * as Cesium from 'cesium'
import type { Viewer } from 'cesium'

const DEFAULT_ION_TOKEN =
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJqdGkiOiI4Mjc1NzgzYi0zNTRkLTQyNTMtYjUxNy02MDYxZDIxZDZhYjYiLCJpZCI6MTg2NzIwLCJpYXQiOjE3MDM3Mjg1NjV9.fv1GhAWeh2xXgJn6cAdla_T3-PdBWYlckq5SBhFuuZo'

interface CameraOrientation {
  heading?: number
  pitch?: number
  roll?: number
}

/** 单例场景管理器，负责 Viewer 的创建与销毁 */
class SceneManagerService {
  viewer: Viewer | null = null

  createViewer(container: string | HTMLElement): Viewer {
    if (this.viewer && !this.viewer.isDestroyed()) {
      this.destroyViewer()
    }

    Cesium.Ion.defaultAccessToken =
      import.meta.env.VITE_CESIUM_ION_TOKEN || DEFAULT_ION_TOKEN

    this.viewer = initViewer(container)
    setScene(this.viewer)
    return this.viewer
  }

  destroyViewer(): void {
    if (this.viewer && !this.viewer.isDestroyed()) {
      this.viewer.destroy()
    }
    this.viewer = null
  }

  getViewer(): Viewer | null {
    return this.viewer
  }
}

export const sceneManager = new SceneManagerService()

export const initViewer = (container: string | HTMLElement): Viewer => {
  return new Cesium.Viewer(container, {
    timeline: false,
    animation: false,
    infoBox: false,
    selectionIndicator: false,
    homeButton: false,
    fullscreenButton: false,
    geocoder: false,
    sceneModePicker: false,
    shouldAnimate: true
  })
}

export const setScene = (viewer: Viewer): void => {
  viewer.scene.globe.enableLighting = false
  viewer.scene.globe.depthTestAgainstTerrain = true
  setCameraView(viewer, 116.38111111111111, 39.90888888888889, 10000000)
}

export const setCameraView = (
  viewer: Viewer,
  lng: number,
  lat: number,
  alt: number,
  orientation: CameraOrientation = {}
): void => {
  viewer.camera.setView({
    destination: Cesium.Cartesian3.fromDegrees(lng, lat, alt),
    orientation: {
      heading: Cesium.Math.toRadians(orientation.heading ?? 0),
      pitch: Cesium.Math.toRadians(orientation.pitch ?? -90),
      roll: orientation.roll ?? 0
    }
  })
}

export const addLayer = (
  viewer: Viewer,
  type: 'gaode' | 'baidu',
  options: Record<string, unknown> = {}
) => {
  switch (type) {
    case 'gaode':
      return viewer.imageryLayers.addImageryProvider(
        new Cesium.UrlTemplateImageryProvider({
          url: 'https://webst01.is.autonavi.com/appmaptile?style=6&x={x}&y={y}&z={z}',
          ...options
        })
      )
    case 'baidu':
      return viewer.imageryLayers.addImageryProvider(
        new Cesium.UrlTemplateImageryProvider({
          url: 'http://online3.map.bdimg.com/onlinelabel/?qt=tile&x={x}&y={y}&z={z}&styles=pl&scaler=1&p=1',
          ...options
        })
      )
    default:
      throw new Error(`Unsupported layer type: ${type}`)
  }
}
