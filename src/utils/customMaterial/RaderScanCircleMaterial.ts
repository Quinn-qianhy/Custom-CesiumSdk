// @ts-nocheck
/**
 * 雷达扫描材质。
 *
 */
// 获取全局 Cesium 对象
import * as Cesium from "cesium"
function RadarScanCircleMaterial(options) {
  options = options ?? {};

  class RadarScanCircleMaterialProperty {
    constructor(options) {

      this._definitionChanged = new Cesium.Event();
      this._radians = undefined;  //扇形角度
      this._color = undefined;   //颜色
      this._sectorColor = undefined; //扇形颜色
      this._speed = undefined; //速度
      this._width = undefined; // 宽度
      this._offset = undefined; // 偏移量

      this.color = options.color;
      this.sectorColor = options.sectorColor;
      this.radians = options.radians;
      this.speed = options.speed;
      this.width = options.width;
      this.offset = options.offset;
    }

    get isConstant() {
      return false;
    }

    get definitionChanged() {
      return this._definitionChanged;
    }

    getType(time) {
      return this.Cesium.Material.RaderScanCircleType;
    }

    getValue(time, result) {
      if (!Cesium.defined(result)) {
        result = {};
      }

      result.color = Cesium.Property.getValueOrDefault(
        this._color,
        time,
        Cesium.Color.RED,
        result.color
      );
      
      result.sectorColor = Cesium.Property.getValueOrDefault(
        this._sectorColor,
        time,
        Cesium.Color.BLUE,
        result.sectorColor
      );
      
      result.radians = Cesium.Property.getValueOrDefault(
        this._radians,
        time,
        1.047, // 默认60度
        result.radians
      );
      
      result.speed = Cesium.Property.getValueOrDefault(
        this._speed,
        time,
        3.0,
        result.speed
      );
      
      result.width = Cesium.Property.getValueOrDefault(
        this._width,
        time,
        1.0,
        result.width
      );
      
      result.offset = Cesium.Property.getValueOrDefault(
        this._offset,
        time,
        0.0,
        result.offset
      );

      return result;
    }

    equals(other) {
      return (
        this === other ||
        (other instanceof RadarScanCircleMaterialProperty &&
          Cesium.Property.equals(this._color, other._color) &&
          Cesium.Property.equals(this._sectorColor, other._sectorColor) &&
          Cesium.Property.equals(this._radians, other._radians) &&
          Cesium.Property.equals(this._width, other._width) &&
          Cesium.Property.equals(this._offset, other._offset))
      );
    }
  }

  Object.defineProperties(RadarScanCircleMaterialProperty.prototype, {
    color: Cesium.createPropertyDescriptor("color"),
    sectorColor: Cesium.createPropertyDescriptor("sectorColor"),
    radians: Cesium.createPropertyDescriptor("radians"),
    speed: Cesium.createPropertyDescriptor("speed"),
    width: Cesium.createPropertyDescriptor("width"),
    offset: Cesium.createPropertyDescriptor("offset")
  });

  // Cesium.RadarScanCircleMaterialProperty = 'RadarScanCircleMaterialProperty';
  Cesium.Material.RadarScanCircleMaterialProperty =
    "RadarScanCircleMaterialProperty";
  Cesium.Material.RaderScanCircleType = "RaderScanCircleType";
  Cesium.Material.RadarScanCircleMaterialSource = /*glsl*/`
  uniform vec4 color;
  uniform vec4 sectorColor;
  uniform float radians;
  uniform float speed;
  uniform float width;
  uniform float offset;
  czm_material czm_getMaterial(czm_materialInput materialInput)
  {
    czm_material material = czm_getDefaultMaterial(materialInput);
    vec2 st = materialInput.st;
    float dis = distance(st, vec2(0.5));

    // 添加一个随时间变化的偏移量，用于动画效果
    float time = fract(czm_frameNumber * speed / 1000.0);
    
    // 初始化透明度为0，不显示底部圆形
    material.alpha = 0.0;
    material.diffuse = color.rgb;
    
    // 绘制扇区 (旋转的扇形扫描效果)
    vec2 xy = materialInput.st;
    float rx = xy.x - 0.5;
    float ry = xy.y - 0.5;
    float at = atan(ry, rx);
    
    // 计算半径
    float radius = sqrt(rx * rx + ry * ry);
    
    // 创建旋转的扇形效果
    float rotatedAngle = 1.0 - at - time * czm_pi*2.0; // 减去随时间变化的角度
    
    // 确保角度在正确的范围内，解决扇形消失问题
    if (rotatedAngle < -czm_pi) {
        rotatedAngle += czm_pi*2.0;
    } else if (rotatedAngle > czm_pi) {
        rotatedAngle -= czm_pi*2.0 * 2.0;
    }
    
    // 判断是否在扇区范围内
    if (radius <= 0.5 && abs(rotatedAngle) <= radians/2.0 && radius > 0.0) {
        // 扇区渐变色渲染
        float sectorAlpha = 1.0 - (radius / 0.5);
        sectorAlpha = pow(sectorAlpha, 2.0) * 0.8;
        material.alpha = max(material.alpha, sectorAlpha);  // 使用max确保可见性
        material.diffuse = sectorColor.rgb;
    }
    return material;
  }
`;
  Cesium.Material._materialCache.addMaterial(
    Cesium.Material.RaderScanCircleType,
    {
      fabric: {
        type: Cesium.Material.RaderScanCircleType,
        uniforms: {
          radians: 1.047, // 默认60度 (π/3)
          color: new Cesium.Color(1.0, 1.0, 1.0, 0.5), // 白色半透明
          sectorColor: new Cesium.Color(1.0, 0.0, 0.0, 1.0), // 红色
          speed: 3.0,
          width: 1.5,
          offset: 0.0,
        },
        source: Cesium.Material.RadarScanCircleMaterialSource,
      },
      translucent: function (material) {
        return true;
      },
    }
  );

  return new RadarScanCircleMaterialProperty(options);
}
export default RadarScanCircleMaterial;