// @ts-nocheck
import * as Cesium from 'cesium'

interface EllipsoidTrailOptions {
  color?: typeof Cesium.Color.RED
  duration?: number
  trailImage?: string
  speed?: number
}

let registered = false

function registerEllipsoidTrailMaterial(): void {
  if (registered) {
    return
  }
  registered = true

  const Material = Cesium.Material as typeof Cesium.Material & {
    EllipsoidTrailType: string
    EllipsoidTrailSource: string
  }

  Material.EllipsoidTrailType = 'EllipsoidTrail'
  Material.EllipsoidTrailSource = `
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
  `

  Material._materialCache.addMaterial(Material.EllipsoidTrailType, {
    fabric: {
      type: Material.EllipsoidTrailType,
      uniforms: {
        color: new Cesium.Color(1.0, 0.0, 0.0, 1.0),
        trailImage: './trail.png',
        time: 0
      },
      source: Material.EllipsoidTrailSource
    },
    translucent: () => true
  })
}

/** 椭球体轨迹材质 */
export default class EllipsoidTrailMaterialProperty {
  _definitionChanged: InstanceType<typeof Cesium.Event>
  _color: unknown
  _colorSubscription: unknown
  duration: number
  trailImage: string
  time: number

  constructor(options: EllipsoidTrailOptions = {}) {
    registerEllipsoidTrailMaterial()
    this._definitionChanged = new Cesium.Event()
    this._color = undefined
    this._colorSubscription = undefined
    this.color = options.color ?? Cesium.Color.RED
    this.duration = options.duration ?? 1000
    this.trailImage = options.trailImage ?? './trail.png'
    this.time = Date.now()
  }

  getType(): string {
    return 'EllipsoidTrail'
  }

  getValue(time: unknown, result: Record<string, unknown> = {}): Record<string, unknown> {
    if (!Cesium.defined(result)) {
      result = {}
    }
    result.color = Cesium.Property.getValueOrClonedDefault(
      this._color,
      time,
      Cesium.Color.WHITE,
      result.color
    )
    result.trailImage = this.trailImage
    result.time = ((Date.now() - this.time) % this.duration) / this.duration
    return result
  }

  equals(other: unknown): boolean {
    return (
      this === other ||
      (other instanceof EllipsoidTrailMaterialProperty &&
        Cesium.Property.equals(this._color, other._color) &&
        this.duration === other.duration)
    )
  }

  set color(value: unknown) {
    Cesium.MaterialProperty.getValue(this, 'color', value, this._colorSubscription)
  }

  get color(): unknown {
    return this._color
  }
}

registerEllipsoidTrailMaterial()
