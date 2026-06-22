// 不再直接导入 Cesium，而是通过全局对象使用
// import * as Cesium from "cesium";
import { useExamplesStore } from "@/stores/examplesStore";
import * as Cesium from "cesium";
export class DrawTool {
  constructor(viewer) {
    this.viewer = viewer;
    this.store = useExamplesStore();
    this.entityObj = {}; // 存储所有实体对象
    this.drawHandler = undefined; // 绘制句柄
    this.modifyHandler = undefined; // 编辑句柄
    this.tempEntities = []; // 存储临时实体
  }

  // 开始绘制
  startDraw(type) {
    switch (type) {
      case "point":
        this.drawPoint();
        break;
      case "polyline":
        this.drawPolyline();
        break;
      case "polygon":
        this.drawPolygon();
        break;
      case "circle":
        this.drawCircle();
        break;
      case "rectangle":
        this.drawRectangle();
        break;
    }
  }

  // 绘制点
  drawPoint() {
    this.drawHandler = new Cesium.ScreenSpaceEventHandler(this.viewer.scene.canvas);
    this.drawHandler.setInputAction((event) => {
      const ray = this.viewer.camera.getPickRay(event.position);
      const position = this.viewer.scene.globe.pick(ray, this.viewer.scene);
      if (!position) return;

      const entity = this.viewer.entities.add({
        position: position,
        point: {
          pixelSize: 10,
          color: Cesium.Color.RED,
          outlineColor: Cesium.Color.WHITE,
          outlineWidth: 2,
        },
      });

      this.entityObj[entity.id] = entity;
      this.store.setEntities(this.entityObj);
      this.stopDrawing();

    }, Cesium.ScreenSpaceEventType.LEFT_CLICK);
  }

  // 绘制线
  drawPolyline() {
    let positions = [];
    const tempEntity = this.viewer.entities.add({
      polyline: {
        positions: new Cesium.CallbackProperty(() => positions, false),
        width: 3,
        material: Cesium.Color.RED,
      },
    });
    this.tempEntities.push(tempEntity);

    this.drawHandler = new Cesium.ScreenSpaceEventHandler(this.viewer.scene.canvas);

    this.drawHandler.setInputAction((event) => {
      const ray = this.viewer.camera.getPickRay(event.position);
      const position = this.viewer.scene.globe.pick(ray, this.viewer.scene);
      if (!position) return;
      positions.push(position);
    }, Cesium.ScreenSpaceEventType.LEFT_CLICK);

    this.drawHandler.setInputAction((event) => {
      const ray = this.viewer.camera.getPickRay(event.endPosition);
      const position = this.viewer.scene.globe.pick(ray, this.viewer.scene);
      if (!position) return;

      if (positions.length === 0) return;
      positions.pop();
      positions.push(position);
    }, Cesium.ScreenSpaceEventType.MOUSE_MOVE);

    this.drawHandler.setInputAction(() => {
      if (positions.length < 2) return;
      const entity = this.viewer.entities.add({
        polyline: {
          positions: positions.slice(),
          width: 3,
          material: Cesium.Color.RED,
        },
      });
      this.entityObj[entity.id] = entity;
      this.store.setEntities(this.entityObj);
      this.clearTempEntities();
      this.stopDrawing();
    }, Cesium.ScreenSpaceEventType.RIGHT_CLICK);
  }

  // 绘制多边形
  drawPolygon() {
    let positions = [];
    const tempEntity = this.viewer.entities.add({
      polygon: {
        hierarchy: new Cesium.CallbackProperty(() => positions, false),
        material: Cesium.Color.RED.withAlpha(0.5),
      },
    });
    this.tempEntities.push(tempEntity);

    this.drawHandler = new Cesium.ScreenSpaceEventHandler(this.viewer.scene.canvas);

    this.drawHandler.setInputAction((event) => {
      const ray = this.viewer.camera.getPickRay(event.position);
      const position = this.viewer.scene.globe.pick(ray, this.viewer.scene);
      if (!position) return;
      positions.push(position);
    }, Cesium.ScreenSpaceEventType.LEFT_CLICK);

    this.drawHandler.setInputAction((event) => {
      const ray = this.viewer.camera.getPickRay(event.endPosition);
      const position = this.viewer.scene.globe.pick(ray, this.viewer.scene);
      if (!position) return;

      if (positions.length === 0) return;
      positions.pop();
      positions.push(position);
    }, Cesium.ScreenSpaceEventType.MOUSE_MOVE);

    this.drawHandler.setInputAction(() => {
      if (positions.length < 3) return;
      const entity = this.viewer.entities.add({
        polygon: {
          hierarchy: positions.slice(),
          material: Cesium.Color.RED.withAlpha(0.5),
        },
      });
      this.entityObj[entity.id] = entity;
      this.store.setEntities(this.entityObj);
      this.clearTempEntities();
      this.stopDrawing();
    }, Cesium.ScreenSpaceEventType.RIGHT_CLICK);
  }

  // 绘制圆
  drawCircle() {
    let center = null;
    let radius = 0;
    let tempEntity = null;

    this.drawHandler = new Cesium.ScreenSpaceEventHandler(this.viewer.scene.canvas);

    this.drawHandler.setInputAction((event) => {
      if (center) return;
      const ray = this.viewer.camera.getPickRay(event.position);
      const position = this.viewer.scene.globe.pick(ray, this.viewer.scene);
      if (!position) return;
      center = position;
    }, Cesium.ScreenSpaceEventType.LEFT_CLICK);

    this.drawHandler.setInputAction((event) => {
      if (!center) return;
      const ray = this.viewer.camera.getPickRay(event.endPosition);
      const position = this.viewer.scene.globe.pick(ray, this.viewer.scene);
      if (!position) return;

      radius = Cesium.Cartesian3.distance(center, position);
      if (tempEntity) {
        this.viewer.entities.remove(tempEntity);
      }

      tempEntity = this.viewer.entities.add({
        position: center,
        ellipse: {
          semiMajorAxis: radius,
          semiMinorAxis: radius,
          material: Cesium.Color.RED.withAlpha(0.5),
        },
      });
      this.tempEntities.push(tempEntity);
    }, Cesium.ScreenSpaceEventType.MOUSE_MOVE);

    this.drawHandler.setInputAction(() => {
      if (!center || radius <= 0) return;
      const entity = this.viewer.entities.add({
        position: center,
        ellipse: {
          semiMajorAxis: radius,
          semiMinorAxis: radius,
          material: Cesium.Color.RED.withAlpha(0.5),
        },
      });
      this.entityObj[entity.id] = entity;
      this.store.setEntities(this.entityObj);
      this.clearTempEntities();
      this.stopDrawing();
    }, Cesium.ScreenSpaceEventType.RIGHT_CLICK);
  }

  // 绘制矩形
  drawRectangle() {
    let start = null;
    let end = null;
    let tempEntity = null;

    this.drawHandler = new Cesium.ScreenSpaceEventHandler(this.viewer.scene.canvas);

    this.drawHandler.setInputAction((event) => {
      if (start) return;
      const ray = this.viewer.camera.getPickRay(event.position);
      const position = this.viewer.scene.globe.pick(ray, this.viewer.scene);
      if (!position) return;
      start = position;
    }, Cesium.ScreenSpaceEventType.LEFT_CLICK);

    this.drawHandler.setInputAction((event) => {
      if (!start) return;
      const ray = this.viewer.camera.getPickRay(event.endPosition);
      const position = this.viewer.scene.globe.pick(ray, this.viewer.scene);
      if (!position) return;
      end = position;

      if (tempEntity) {
        this.viewer.entities.remove(tempEntity);
      }

      const rectangle = this.calculateRectangle(start, end);
      tempEntity = this.viewer.entities.add({
        rectangle: {
          coordinates: rectangle,
          material: Cesium.Color.RED.withAlpha(0.5),
        },
      });
      this.tempEntities.push(tempEntity);
    }, Cesium.ScreenSpaceEventType.MOUSE_MOVE);

    this.drawHandler.setInputAction(() => {
      if (!start || !end) return;
      const rectangle = this.calculateRectangle(start, end);
      const entity = this.viewer.entities.add({
        rectangle: {
          coordinates: rectangle,
          material: Cesium.Color.RED.withAlpha(0.5),
        },
      });
      this.entityObj[entity.id] = entity;
      this.store.setEntities(this.entityObj);
      this.clearTempEntities();
      this.stopDrawing();
    }, Cesium.ScreenSpaceEventType.RIGHT_CLICK);
  }

  // 计算矩形坐标
  calculateRectangle(start, end) {
    const cartStart = Cesium.Cartographic.fromCartesian(start);
    const cartEnd = Cesium.Cartographic.fromCartesian(end);

    return new Cesium.Rectangle(
      Math.min(cartStart.longitude, cartEnd.longitude),
      Math.min(cartStart.latitude, cartEnd.latitude),
      Math.max(cartStart.longitude, cartEnd.longitude),
      Math.max(cartStart.latitude, cartEnd.latitude)
    );
  }

  // 停止绘制
  stopDrawing() {
    if (this.drawHandler) {
      this.drawHandler.destroy();
      this.drawHandler = null;
    }
  }

  // 清除临时实体
  clearTempEntities() {
    this.tempEntities.forEach(entity => {
      this.viewer.entities.remove(entity);
    });
    this.tempEntities = [];
  }

  // 清除所有实体
  clearAll() {
    Object.values(this.entityObj).forEach(entity => {
      this.viewer.entities.remove(entity);
    });
    this.entityObj = {};
    this.store.setEntities(this.entityObj);
    this.clearTempEntities();
    this.stopDrawing();
  }
}