// @ts-nocheck
// 获取全局 Cesium 对象
import * as Cesium from "cesium"

/**
 * 雷达扫描材质
 */
export class RadarScanMaterialProperty {
  constructor(options) {
    options = options || {};
    this._definitionChanged = new Cesium.Event();
    this._color = undefined;
    this._colorSubscription = undefined;
    this.color = options.color || Cesium.Color.RED;
    this.duration = options.duration || 1000;
    this.count = options.count || 3;
    this.gradient = options.gradient || 0.1;
    this.time = new Date().getTime();
  }

  getType() {
    return "RadarScan";
  }

  getValue(time, result) {
    const Cesium = Cesium;
    if (!Cesium.defined(result)) {
      result = {};
    }
    result.color = Cesium.Property.getValueOrClonedDefault(
      this._color,
      time,
      Cesium.Color.WHITE,
      result.color
    );
    result.time = ((new Date().getTime() - this.time) % this.duration) / this.duration;
    result.count = this.count;
    result.gradient = this.gradient;
    return result;
  }

  equals(other) {
    const Cesium = Cesium;
    return (
      this === other ||
      (other instanceof RadarScanMaterialProperty &&
        Cesium.Property.equals(this._color, other._color) &&
        this.duration === other.duration)
    );
  }

  set color(value) {
    const Cesium = Cesium;
    Cesium.ColorMaterialProperty.setValue(this, "color", value, this._colorSubscription);
  }

  get color() {
    return this._color;
  }

  // static registerRadarScanMaterial() {
  //   Cesium.Material.RadarScanType = "RadarScan";
  //   Cesium.Material.RadarScanSource = `
  //     czm_material czm_getMaterial(czm_materialInput materialInput)
  //     {
  //       czm_material material = czm_getDefaultMaterial(materialInput);
  //       vec2 st = materialInput.st;
  //       vec3 color = vec3(1.0, 0.0, 0.0);
  //       float time = czm_frameNumber / 60.0;
  //       vec2 center = vec2(0.5, 0.5);
  //       float maxRadius = 0.5;
  //       float progress = mod(time, 3.0) / 3.0;
  //       float radius = progress * maxRadius;
  //       float distance = length(st - center);
  //       float alpha = 1.0 - smoothstep(radius - 0.005, radius + 0.005, distance);
  //       float gradient = 0.1;
  //       float s = sin(progress * 6.28);
  //       float c = cos(progress * 6.28);
  //       mat2 m = mat2(c, -s, s, c);
  //       vec2 rotatedSt = m * (st - center) + center;
  //       float sectorAngle = 6.28 / 3.0;
  //       float angle = atan(rotatedSt.y - center.y, rotatedSt.x - center.x);
  //       if (angle < 0.0) angle += 6.28;
  //       float inSector = step(angle, sectorAngle);
  //       alpha *= inSector;
  //       alpha *= smoothstep(0.0, gradient, progress) * smoothstep(1.0, 1.0 - gradient, progress);
  //       material.alpha = alpha;
  //       material.diffuse = color.rgb;
  //       return material;
  //     }
  //   `;

  //   Cesium.Material._materialCache.addMaterial(Cesium.Material.RadarScanType, {
  //     fabric: {
  //       type: Cesium.Material.RadarScanType,
  //       uniforms: {
  //         color: new Cesium.Color(1.0, 0.0, 0.0, 1.0),
  //         time: 0,
  //         count: 3,
  //         gradient: 0.1,
  //       },
  //       source: Cesium.Material.RadarScanSource,
  //     },
  //     translucent: function (material) {
  //       return true;
  //     },
  //   });
  // }
}