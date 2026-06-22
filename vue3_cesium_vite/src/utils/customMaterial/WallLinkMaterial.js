// 不再直接导入 Cesium，而是通过全局对象使用
// import * as Cesium from "cesium";

// 获取全局 Cesium 对象
import * as Cesium from "cesium"

/**
 * 流动围墙材质
 */
export class WallLinkMaterialProperty {
  constructor(options) {
    options = options || {};
    this._definitionChanged = new Cesium.Event();
    this._color = undefined;
    this._colorSubscription = undefined;
    this.color = options.color || Cesium.Color.RED;
    this.duration = options.duration || 1000;
    this.time = new Date().getTime();
  }

  getType() {
    return "WallLink";
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
    result.image = "./wallMaterial.png";
    result.time = ((new Date().getTime() - this.time) % this.duration) / this.duration;
    return result;
  }

  equals(other) {
    const Cesium = Cesium;
    return (
      this === other ||
      (other instanceof WallLinkMaterialProperty &&
        Cesium.Property.equals(this._color, other._color) &&
        this.duration === other.duration)
    );
  }

  set color(value) {
    const Cesium = Cesium;
    Cesium.MaterialProperty.setValue(this, "color", value, this._colorSubscription);
  }

  get color() {
    return this._color;
  }

  static registerWallLinkMaterial() {
    Cesium.Material.WallLinkType = "WallLink";
    Cesium.Material.WallLinkSource = `
      czm_material czm_getMaterial(czm_materialInput materialInput)
      {
        czm_material material = czm_getDefaultMaterial(materialInput);
        vec2 st = materialInput.st;
        vec3 colorImage = texture2D(image, vec2(fract(time - st.t), st.t)).rgb;
        vec3 foreground = color.rgb;
        float alpha = colorImage.r * color.a;
        material.alpha = alpha;
        material.diffuse = foreground.rgb;
        return material;
      }
    `;

    Cesium.Material._materialCache.addMaterial(Cesium.Material.WallLinkType, {
      fabric: {
        type: Cesium.Material.WallLinkType,
        uniforms: {
          color: new Cesium.Color(1.0, 0.0, 0.0, 1.0),
          image: "./wallMaterial.png",
          time: 0,
        },
        source: Cesium.Material.WallLinkSource,
      },
      translucent: function (material) {
        return true;
      },
    });
  }
}