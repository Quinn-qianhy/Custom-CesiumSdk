// globe-for-webgl Cesium 定制版 — PolylineFlow 材质 shader
// 材质类型: "PolylineFlow"
// 配合 PolylineFlowMaterialProperty 使用

// uniforms:
//   sampler2D image      — 流动纹理（箭头/线条贴图）
//   vec4 color           — 着色颜色，alpha=0 时保留贴图原色
//   vec2 repeat          — 纹理重复（Cartesian2）
//   bool axisY           — 是否沿垂直方向流动
//   float speed          — 流动速度
//   bool hasImage2       — 是否有背景贴图
//   sampler2D image2      — 背景贴图
//   vec4 color2          — 背景颜色

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
