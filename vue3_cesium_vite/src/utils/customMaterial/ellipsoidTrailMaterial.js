// 获取全局 Cesium 对象
import * as Cesium from "cesium"

/**
 * 椭球体轨迹材质
 */
export default class EllipsoidTrailMaterialProperty {
  constructor(options) {
    options = options || {};
    this._definitionChanged = new Cesium.Event();
    this._color = undefined;
    this._colorSubscription = undefined;
    this.color = options.color || Cesium.Color.RED;
    this.duration = options.duration || 1000;
    this.trailImage = options.trailImage || "./trail.png";
    this.time = new Date().getTime();
  }

  getType() {
    return "EllipsoidTrail";
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
    result.trailImage = this.trailImage;
    result.time = ((new Date().getTime() - this.time) % this.duration) / this.duration;
    return result;
  }

  equals(other) {
    const Cesium = Cesium;
    return (
      this === other ||
      (other instanceof EllipsoidTrailMaterialProperty &&
        Cesium.Property.equals(this._color, other._color) &&
        this.duration === other.duration)
    );
  }
  set color(value) {
    const Cesium = Cesium;
    Cesium.MaterialProperty.getValue(this, "color", value, this._colorSubscription);
  }

  get color() {
    return this._color;
  }

  static registerEllipsoidTrailMaterial() {
    Cesium.Material.EllipsoidTrailType = "EllipsoidTrail";
    Cesium.Material.EllipsoidTrailSource = `
      czm_material czm_getMaterial(czm_materialInput materialInput)
      {
        czm_material material = czm_getDefaultMaterial(materialInput);
        vec2 st = materialInput.st;
        vec3 colorImage = texture2D(trailImage, vec2(fract(time - st.t), st.t)).rgb;
        vec3 foreground = color.rgb;
        float alpha = colorImage.r * color.a;
        material.alpha = alpha;
        material.diffuse = foreground.rgb;
        return material;
      }
    `;

    Cesium.Material._materialCache.addMaterial(Cesium.Material.EllipsoidTrailType, {
      fabric: {
        type: Cesium.Material.EllipsoidTrailType,
        uniforms: {
          color: new Cesium.Color(1.0, 0.0, 0.0, 1.0),
          trailImage: "./trail.png",
          time: 0,
        },
        source: Cesium.Material.EllipsoidTrailSource,
      },
      translucent: function (material) {
        return true;
      },
    });
  }
}
