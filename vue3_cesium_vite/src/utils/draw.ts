import * as Cesium from 'cesium'
import type { Entity, Viewer } from 'cesium'

export type DrawKind = 'point' | 'polyline' | 'polygon' | 'circle' | 'rectangle'
type EntityCallback = (entity: Entity) => void

/** Cesium 屏幕绘制工具 */
export class DrawTool {
  private static activeTool: DrawTool | null = null

  viewer: Viewer
  entityObj: Record<string, Entity> = {}
  drawHandler: InstanceType<typeof Cesium.ScreenSpaceEventHandler> | null = null
  tempEntities: Entity[] = []
  onEntityCreated: EntityCallback | null = null

  constructor(viewer: Viewer) {
    this.viewer = viewer
  }

  /** 兼容示例组件中的静态调用方式 */
  static startDraw(viewer: Viewer, type: DrawKind, callback?: EntityCallback): void {
    DrawTool.activeTool?.stopDrawing()
    const tool = new DrawTool(viewer)
    tool.onEntityCreated = callback ?? null
    DrawTool.activeTool = tool
    tool.startDraw(type)
  }

  static stopDrawing(_viewer?: Viewer): void {
    DrawTool.activeTool?.stopDrawing()
    DrawTool.activeTool = null
  }

  startDraw(type: DrawKind): void {
    switch (type) {
      case 'point':
        this.drawPoint()
        break
      case 'polyline':
        this.drawPolyline()
        break
      case 'polygon':
        this.drawPolygon()
        break
      case 'circle':
        this.drawCircle()
        break
      case 'rectangle':
        this.drawRectangle()
        break
    }
  }

  private pickPosition(event: { position?: Cesium.Cartesian2; endPosition?: Cesium.Cartesian2 }) {
    const canvasPosition = event.position ?? event.endPosition
    if (!canvasPosition) {
      return undefined
    }
    const ray = this.viewer.camera.getPickRay(canvasPosition)
    if (!ray) {
      return undefined
    }
    const globe = this.viewer.scene.globe
    return globe.pick(ray, this.viewer.scene)
  }

  private trackEntity(entity: Entity): void {
    this.entityObj[entity.id] = entity
    this.onEntityCreated?.(entity)
  }

  drawPoint(): void {
    this.drawHandler = new Cesium.ScreenSpaceEventHandler(this.viewer.scene.canvas)
    this.drawHandler.setInputAction((event) => {
      const position = this.pickPosition(event)
      if (!position) {
        return
      }

      const entity = this.viewer.entities.add({
        position,
        point: {
          pixelSize: 10,
          color: Cesium.Color.RED,
          outlineColor: Cesium.Color.WHITE,
          outlineWidth: 2
        }
      })

      this.trackEntity(entity)
      this.stopDrawing()
    }, Cesium.ScreenSpaceEventType.LEFT_CLICK)
  }

  drawPolyline(): void {
    const positions: Cesium.Cartesian3[] = []
    const tempEntity = this.viewer.entities.add({
      polyline: {
        positions: new Cesium.CallbackProperty(() => positions, false),
        width: 3,
        material: Cesium.Color.RED
      }
    })
    this.tempEntities.push(tempEntity)

    this.drawHandler = new Cesium.ScreenSpaceEventHandler(this.viewer.scene.canvas)

    this.drawHandler.setInputAction((event) => {
      const position = this.pickPosition(event)
      if (position) {
        positions.push(position)
      }
    }, Cesium.ScreenSpaceEventType.LEFT_CLICK)

    this.drawHandler.setInputAction((event) => {
      const position = this.pickPosition(event)
      if (!position || positions.length === 0) {
        return
      }
      positions.pop()
      positions.push(position)
    }, Cesium.ScreenSpaceEventType.MOUSE_MOVE)

    this.drawHandler.setInputAction(() => {
      if (positions.length < 2) {
        return
      }
      const entity = this.viewer.entities.add({
        polyline: {
          positions: positions.slice(),
          width: 3,
          material: Cesium.Color.RED
        }
      })
      this.trackEntity(entity)
      this.clearTempEntities()
      this.stopDrawing()
    }, Cesium.ScreenSpaceEventType.RIGHT_CLICK)
  }

  drawPolygon(): void {
    const positions: Cesium.Cartesian3[] = []
    const Color = Cesium.Color as typeof Cesium.Color & {
      RED: { withAlpha: (alpha: number) => unknown }
    }
    const tempEntity = this.viewer.entities.add({
      polygon: {
        hierarchy: new Cesium.CallbackProperty(() => positions, false),
        material: Color.RED.withAlpha(0.5)
      }
    })
    this.tempEntities.push(tempEntity)

    this.drawHandler = new Cesium.ScreenSpaceEventHandler(this.viewer.scene.canvas)

    this.drawHandler.setInputAction((event) => {
      const position = this.pickPosition(event)
      if (position) {
        positions.push(position)
      }
    }, Cesium.ScreenSpaceEventType.LEFT_CLICK)

    this.drawHandler.setInputAction((event) => {
      const position = this.pickPosition(event)
      if (!position || positions.length === 0) {
        return
      }
      positions.pop()
      positions.push(position)
    }, Cesium.ScreenSpaceEventType.MOUSE_MOVE)

    this.drawHandler.setInputAction(() => {
      if (positions.length < 3) {
        return
      }
      const entity = this.viewer.entities.add({
        polygon: {
          hierarchy: positions.slice(),
          material: Color.RED.withAlpha(0.5)
        }
      })
      this.trackEntity(entity)
      this.clearTempEntities()
      this.stopDrawing()
    }, Cesium.ScreenSpaceEventType.RIGHT_CLICK)
  }

  drawCircle(): void {
    let center: Cesium.Cartesian3 | null = null
    let radius = 0
    let tempEntity: Entity | null = null
    const Color = Cesium.Color as typeof Cesium.Color & {
      RED: { withAlpha: (alpha: number) => unknown }
    }

    this.drawHandler = new Cesium.ScreenSpaceEventHandler(this.viewer.scene.canvas)

    this.drawHandler.setInputAction((event) => {
      if (center) {
        return
      }
      center = this.pickPosition(event) ?? null
    }, Cesium.ScreenSpaceEventType.LEFT_CLICK)

    this.drawHandler.setInputAction((event) => {
      if (!center) {
        return
      }
      const position = this.pickPosition(event)
      if (!position) {
        return
      }

      const Cartesian3 = Cesium.Cartesian3 as typeof Cesium.Cartesian3 & {
        distance: (left: Cesium.Cartesian3, right: Cesium.Cartesian3) => number
      }
      radius = Cartesian3.distance(center, position)
      if (tempEntity) {
        this.viewer.entities.remove(tempEntity)
      }

      tempEntity = this.viewer.entities.add({
        position: center,
        ellipse: {
          semiMajorAxis: radius,
          semiMinorAxis: radius,
          material: Color.RED.withAlpha(0.5)
        }
      })
      if (tempEntity) {
        this.tempEntities.push(tempEntity)
      }
    }, Cesium.ScreenSpaceEventType.MOUSE_MOVE)

    this.drawHandler.setInputAction(() => {
      if (!center || radius <= 0) {
        return
      }
      const entity = this.viewer.entities.add({
        position: center,
        ellipse: {
          semiMajorAxis: radius,
          semiMinorAxis: radius,
          material: Color.RED.withAlpha(0.5)
        }
      })
      this.trackEntity(entity)
      this.clearTempEntities()
      this.stopDrawing()
    }, Cesium.ScreenSpaceEventType.RIGHT_CLICK)
  }

  drawRectangle(): void {
    let start: Cesium.Cartesian3 | null = null
    let end: Cesium.Cartesian3 | null = null
    let tempEntity: Entity | null = null
    const Color = Cesium.Color as typeof Cesium.Color & {
      RED: { withAlpha: (alpha: number) => unknown }
    }

    this.drawHandler = new Cesium.ScreenSpaceEventHandler(this.viewer.scene.canvas)

    this.drawHandler.setInputAction((event) => {
      if (start) {
        return
      }
      start = this.pickPosition(event) ?? null
    }, Cesium.ScreenSpaceEventType.LEFT_CLICK)

    this.drawHandler.setInputAction((event) => {
      if (!start) {
        return
      }
      end = this.pickPosition(event) ?? null
      if (!end) {
        return
      }

      if (tempEntity) {
        this.viewer.entities.remove(tempEntity)
      }

      const rectangle = this.calculateRectangle(start, end)
      tempEntity = this.viewer.entities.add({
        rectangle: {
          coordinates: rectangle,
          material: Color.RED.withAlpha(0.5)
        }
      })
      if (tempEntity) {
        this.tempEntities.push(tempEntity)
      }
    }, Cesium.ScreenSpaceEventType.MOUSE_MOVE)

    this.drawHandler.setInputAction(() => {
      if (!start || !end) {
        return
      }
      const rectangle = this.calculateRectangle(start, end)
      const entity = this.viewer.entities.add({
        rectangle: {
          coordinates: rectangle,
          material: Color.RED.withAlpha(0.5)
        }
      })
      this.trackEntity(entity)
      this.clearTempEntities()
      this.stopDrawing()
    }, Cesium.ScreenSpaceEventType.RIGHT_CLICK)
  }

  calculateRectangle(start: Cesium.Cartesian3, end: Cesium.Cartesian3) {
    const cartStart = Cesium.Cartographic.fromCartesian(start)
    const cartEnd = Cesium.Cartographic.fromCartesian(end)
    const Rectangle = (Cesium as unknown as { Rectangle: new (...args: number[]) => unknown })
      .Rectangle

    return new Rectangle(
      Math.min(cartStart.longitude, cartEnd.longitude),
      Math.min(cartStart.latitude, cartEnd.latitude),
      Math.max(cartStart.longitude, cartEnd.longitude),
      Math.max(cartStart.latitude, cartEnd.latitude)
    )
  }

  stopDrawing(): void {
    if (this.drawHandler) {
      this.drawHandler.destroy()
      this.drawHandler = null
    }
  }

  clearTempEntities(): void {
    this.tempEntities.forEach((entity) => {
      this.viewer.entities.remove(entity)
    })
    this.tempEntities = []
  }

  clearAll(): void {
    Object.values(this.entityObj).forEach((entity) => {
      this.viewer.entities.remove(entity)
    })
    this.entityObj = {}
    this.clearTempEntities()
    this.stopDrawing()
  }
}
