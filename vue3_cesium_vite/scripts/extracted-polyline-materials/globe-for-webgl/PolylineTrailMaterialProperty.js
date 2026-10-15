/**
 * 从 globe-for-webgl/static/Build/Cesium/Cesium.js 反编译还原
 * 原始路径（文档标注）: Source/Custom/Materials/PolylineTrailMaterialProperty.js
 * Cesium 定制版内置材质，材质类型名: "PolylineTrail"
 *
 * 用于：无贴图的纯色流动拖尾线（PolylineTrailMaterialProperty.html 飞线效果）
 */
import {
  Color,
  defaultValue,
  defined,
  Event,
  createPropertyDescriptor,
  Property,
  Material,
} from 'cesium';

/**
 * @typedef {object} PolylineTrailMaterialProperty.ConstructorOptions
 * @property {Property|Color} [color=Color.RED] 流动线颜色
 * @property {Property|number} [speed] 流动速度（默认 6 * Math.random()）
 * @property {Property|number} [percent=0.1] 拖尾占比
 * @property {Property|number} [gradient=0.01] 渐变强度
 */

/**
 * 流动拖尾线材质（无贴图）
 * @param {PolylineTrailMaterialProperty.ConstructorOptions} [options]
 */
function PolylineTrailMaterialProperty(options) {
  options = defaultValue(options, defaultValue.EMPTY_OBJECT);
  this._definitionChanged = new Event();
  this.colorSubscription = undefined;
  this.speed = options.speed || 6 * Math.random();
  this.color = options.color || Color.RED;
  this.percent = options.percent || 0.1;
  this.gradient = options.gradient || 0.01;
}

Object.defineProperties(PolylineTrailMaterialProperty.prototype, {
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
  color: createPropertyDescriptor('color'),
});

PolylineTrailMaterialProperty.prototype.getType = function (time) {
  return 'PolylineTrail';
};

PolylineTrailMaterialProperty.prototype.getValue = function (time, result) {
  if (!defined(result)) {
    result = {};
  }
  result.color = Property.getValueOrClonedDefault(
    this.color,
    time,
    Color.WHITE,
    result.color
  );
  result.speed = this.speed;
  result.gradient = this.gradient;
  result.percent = this.percent;
  return result;
};

PolylineTrailMaterialProperty.prototype.equals = function (other) {
  return (
    this === other ||
    (other instanceof PolylineTrailMaterialProperty &&
      this.speed === other.speed &&
      Property.equals(this.color, other.color))
  );
};

// ---- 注册 GLSL 材质 ----
Material.PolylineTrailType = 'PolylineTrail';

Material._materialCache.addMaterial(Material.PolylineTrailType, {
  fabric: {
    type: Material.PolylineTrailType,
    uniforms: {
      color: new Color(1.0, 0.0, 0.0, 0.5),
      transparent: true,
      speed: 0,
      gradient: 0.01,
      percent: 0.1,
    },
    source: /* glsl */ `
      uniform vec4 color;
      uniform float speed;
      uniform float percent;
      uniform float gradient;

      czm_material czm_getMaterial(czm_materialInput materialInput) {
        czm_material material = czm_getDefaultMaterial(materialInput);
        vec2 st = materialInput.st;
        float t = fract(czm_frameNumber * speed / 1000.0);
        t *= (1.0 + percent);
        float alpha = smoothstep(t - percent, t, st.s) * step(-t, -st.s);
        alpha += gradient;
        material.diffuse = color.rgb;
        material.alpha = alpha;
        return material;
      }
    `,
  },
  translucent: function () {
    return true;
  },
});

export default PolylineTrailMaterialProperty;
