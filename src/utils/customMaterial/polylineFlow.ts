// @ts-nocheck
/**
 * 自定义材质线 github:cesium-materialLine
 * options {MaterialType,image,color,duration}
 * @param {*} options
 * @returns
 */
// 获取全局 Cesium 对象
import * as Cesium from "cesium"

function CustomMaterialLine(options) {
  let Color = Cesium.Color,
    defined = Cesium.defined,
    Event = Cesium.Event,
    createPropertyDescriptor = Cesium.createPropertyDescriptor,
    Property = Cesium.Property,
    Material = Cesium.Material,
    defaultColor = Color.WHITE,
    currentTime = window.performance.now()
  // MaterialType = "flowLine";

  class PolylineCustomMaterialProperty {
    constructor(options) {
      // Cesium 1.107 起移除了 defaultValue，这里直接判空兜底
      options = options || {};
      this._definitionChanged = new Event();
      this._color = undefined;
      this._colorSubscription = undefined;
      this.color = options.color || Cesium.Color.BLUE;
      this.duration = options.duration || 1000;
      this.repeat = options.repeat || 1;
      this._time = currentTime;
    }

    get isConstant() {
      return false;
    }
    get definitionChanged() {
      return this._definitionChanged;
    }
    getType(time) {
      return Cesium.Material.PolylineCustomMaterialType;
    };
    getValue(time, result) {
      if (!defined(result)) {
        result = {};
      }
      result.color = Property.getValueOrClonedDefault(
        this._color,
        time,
        defaultColor,
        result.color
      );
      result.image = options.image;
      result.time =
        ((window.performance.now() - this._time) % this.duration) / this.duration;
      result.repeat = options.repeat;
      return result;
    };
    equals(other) {
      return (
        this === other ||
        (other instanceof PolylineCustomMaterialProperty &&
          Property.equals(this._color, other._color))
      );
    };
    isTranslucent() {
      return true;
    };
  }
  Object.defineProperties(PolylineCustomMaterialProperty.prototype, {
    color: createPropertyDescriptor("color")
  })
  // Cesium.Material.PolylineCustomMaterialProperty = "PolylineCustomMaterialProperty";

  Cesium.Material.PolylineCustomMaterialType = 'PolylineCustomMaterialType';
  Material._materialCache.addMaterial(
    Cesium.Material.PolylineCustomMaterialType, {
    fabric: {
      type: Cesium.Material.PolylineCustomMaterialType,
      uniforms: {
        color: new Cesium.Color(1.0, 0.0, 0.0, 0.5),
        image: Cesium.Material.DefaultImageId,
        repeat: new Cesium.Cartesian2(1, 1),
        duration: 1000
      },
      source: /*glsl*/ `czm_material czm_getMaterial(czm_materialInput materialInput)
      {
        float time=czm_frameNumber/(120.0*duration/1000.0);
        //  获取需要输出的纹理坐标
        czm_material material = czm_getDefaultMaterial(materialInput);
        //  获取当前实体上的uv坐标
        vec2 st = materialInput.st;
        //  取图片纹理的透明度分量
        material.alpha=texture2D(image, vec2(fract(st.s*repeat-time),st.t)).a;
        //  取外部颜色的rgb分量
        material.diffuse = color.rgb;
        return material;
      }
      `,
    },
    translucent: function (material) {
      return true;
    },
  });
  return new PolylineCustomMaterialProperty(options);
}

export default CustomMaterialLine;