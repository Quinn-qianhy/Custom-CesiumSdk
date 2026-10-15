/**
 * 从 globe-for-webgl/static/Build/Cesium/Cesium.js 反编译还原
 * 原始路径（文档标注）: Source/Custom/Materials/PolylineFlowMaterialProperty.js
 * Cesium 定制版内置材质，材质类型名: "PolylineFlow"
 *
 * 用于：箭头贴图流动、纹理流动线（entityPolylineMaterial.html 中除红色贴地线/发光线外的效果）
 */
import {
  Color,
  Cartesian2,
  defaultValue,
  defined,
  Event,
  createPropertyDescriptor,
  Property,
  Material,
} from 'cesium';

/**
 * @typedef {object} PolylineFlowMaterialProperty.ConstructorOptions
 * @property {Property|Color} [color=Color(0,0,0,0)] 流动线颜色，alpha=0 时使用贴图原色
 * @property {Property|number} [speed=10] 流动速度
 * @property {Property|boolean} [axisY=false] 是否沿垂直方向流动
 * @property {Property|Cartesian2} [repeat=new Cartesian2(1,1)] 水平与垂直方向重复次数
 * @property {string} [image] 流动纹理图片 URL
 * @property {string} [image2] 背景纹理图片 URL（别名 bgUrl）
 * @property {Color} [color2] 背景颜色（别名 bgColor）
 * @property {Property|boolean} [transparent=true] 是否半透明（文档参数，shader 未直接使用）
 */

/**
 * 流动线纹理材质（箭头贴图 / 线条贴图流动）
 * @param {PolylineFlowMaterialProperty.ConstructorOptions} [options]
 */
function PolylineFlowMaterialProperty(options) {
  options = defaultValue(options, defaultValue.EMPTY_OBJECT);
  this._definitionChanged = new Event();
  this._image = options.image || Material.DefaultImageId;
  this._color = options.color || new Color(0.0, 0.0, 0.0, 0.0);
  this._axisY = defaultValue(options.axisY, false);
  this._speed = defaultValue(options.speed, 10);
  this._repeat = defaultValue(options.repeat, new Cartesian2(1.0, 1.0));
  this._image2 = options.image2 || options.bgUrl;
  this._color2 = options.color2 || options.bgColor || new Color(1.0, 1.0, 1.0);
  this._hasImage2 = defined(this._image2);
}

Object.defineProperties(PolylineFlowMaterialProperty.prototype, {
  isConstant: {
    get: function () {
      return false;
    },
  },
  definitionChanged: {
    get: function () {
      return this._definitionChanged;
    },
  },
  image: createPropertyDescriptor('_image'),
  color: createPropertyDescriptor('_color'),
  repeat: createPropertyDescriptor('_repeat'),
  speed: createPropertyDescriptor('_speed'),
  color2: createPropertyDescriptor('_color2'),
});

PolylineFlowMaterialProperty.prototype.getType = function (time) {
  return 'PolylineFlow';
};

PolylineFlowMaterialProperty.prototype.getValue = function (time, result) {
  if (!defined(result)) {
    result = {};
  }
  result.image = Property.getValueOrClonedDefault(
    this._image,
    time,
    Material.DefaultImageId,
    result.image
  );
  result.color = Property.getValueOrClonedDefault(
    this._color,
    time,
    Color.WHITE,
    result.color
  );
  result.repeat = Property.getValueOrClonedDefault(
    this._repeat,
    time,
    new Cartesian2(1.0, 1.0),
    result.repeat
  );
  result.axisY = this._axisY;
  result.speed = Property.getValueOrClonedDefault(this._speed, time, 10, result.speed);
  result.hasImage2 = this._hasImage2;
  result.image2 = this._image2;
  result.color2 = Property.getValueOrClonedDefault(
    this._color2,
    time,
    Color.WHITE,
    result.color2
  );
  return result;
};

PolylineFlowMaterialProperty.prototype.equals = function (other) {
  return (
    this === other ||
    (other instanceof PolylineFlowMaterialProperty &&
      this._image === other._image &&
      Property.equals(this._color, other._color) &&
      this._repeat === other._repeat &&
      this._axisY === other._axisY &&
      this._speed === other._speed)
  );
};

// ---- 注册 GLSL 材质 ----
Material.PolylineFlowType = 'PolylineFlow';

Material._materialCache.addMaterial(Material.PolylineFlowType, {
  fabric: {
    type: Material.PolylineFlowType,
    uniforms: {
      image: Material.DefaultImageId,
      color: new Color(1.0, 0.0, 0.0, 1.0),
      repeat: new Cartesian2(1.0, 1.0),
      axisY: false,
      speed: 10,
      hasImage2: false,
      image2: Material.DefaultImageId,
      color2: new Color(1.0, 1.0, 1.0),
    },
    source: /* glsl */ `
      czm_material czm_getMaterial(czm_materialInput materialInput) {
        czm_material material = czm_getDefaultMaterial(materialInput);
        vec2 st = repeat * materialInput.st;
        vec4 colorImage = texture2D(
          image,
          vec2(fract((axisY ? st.t : st.s) - speed * czm_frameNumber / 1000.0), st.t)
        );
        if (color.a == 0.0) {
          if (colorImage.rgb == vec3(1.0)) {
            discard;
          }
          material.alpha = colorImage.a;
          material.diffuse = colorImage.rgb;
        } else {
          material.alpha = colorImage.a * color.a;
          material.diffuse = max(color.rgb * material.alpha * 3.0, color.rgb);
        }
        if (hasImage2) {
          vec4 colorBG = texture2D(image2, materialInput.st);
          if (colorBG.a > 0.5) {
            material.diffuse = color2.rgb;
          }
        }
        return material;
      }
    `,
  },
  translucent: function () {
    return true;
  },
});

export default PolylineFlowMaterialProperty;
