# 线材质源码提取（globe-for-webgl → 对比用）

从 `globe-for-webgl` 定制 Cesium 中提取的**箭头贴图流动**与**流动线**相关源码，作为参考素材存放，供与 `vue3_cesium_vite` 的 Cesium 实现对比。

## 目录结构

```
vue3_cesium_vite/scripts/extracted-polyline-materials/
├── README.md
└── globe-for-webgl/
    ├── PolylineFlowMaterialProperty.js    # 箭头/纹理贴图流动（核心）
    ├── PolylineTrailMaterialProperty.js   # 无贴图拖尾流动
    ├── material-shaders/
    │   ├── PolylineFlow.glsl
    │   └── PolylineTrail.glsl
    ├── examples/
    │   ├── entityPolylineMaterial.html    # 实体线材质示例（10 种效果）
    │   └── PolylineTrailMaterialProperty.html  # 飞线拖尾示例
    └── material/                          # 贴图资源
        ├── arrow_1.png      # 绿色箭头
        ├── arrow2.png       # 青色箭头
        ├── line.png         # 线条纹理
        ├── lineAarrow.png   # 箭头+线
        ├── lineClr.png      # 黄绿渐变
        ├── lineClr2.png     # 彩虹渐变
        ├── LineDataTrans.png
        └── LinkPulse.png
```

## 来源说明

| 文件 | 原始位置 |
|------|----------|
| 材质类 + Shader | `globe-for-webgl/static/Build/Cesium/Cesium.js`（定制版内置，文档指向 `Source/Custom/Materials/`） |
| 示例 HTML | `globe-for-webgl/static/examples/` |
| 贴图 | `globe-for-webgl/static/examples/material/` |

`.js` 文件由压缩后的 `Cesium.js` **反编译还原**为可读 ES Module，逻辑与原版一致。

## globe-for-webgl 用法（旧版，可正常显示）

```javascript
// 箭头贴图流动 — 使用 PolylineFlowMaterialProperty，材质类型 "PolylineFlow"
new Cesium.PolylineFlowMaterialProperty({
  color: Cesium.Color.AQUA,
  image: '/static/examples/material/arrow2.png',
  repeat: new Cesium.Cartesian2(20, 1),  // 注意：repeat 是 Cartesian2
  speed: 30
})

// 纯色拖尾流动 — 使用 PolylineTrailMaterialProperty，材质类型 "PolylineTrail"
new Cesium.PolylineTrailMaterialProperty({
  speed: 8,
  color: Cesium.Color.CYAN,
  percent: 0.3,
  gradient: 0.01
})
```

## 与 vue3_cesium_vite 的关键差异（对比时注意）

vue3 使用的 Cesium 包中，**同名类已拆分/改写**：

| 旧版 globe-for-webgl | vue3_cesium_vite 新版 Cesium |
|----------------------|------------------------------|
| `PolylineFlowMaterialProperty` → `"PolylineFlow"`（贴图箭头 shader） | `PolylineFlowMaterialProperty` → `"PolylineFlow"`（**不同 shader**，repeat 为 number，含 direction/percent） |
| — | `PolylineFlowImageMaterialProperty` → `"PolylineFlowImage"`（**与旧版 PolylineFlow shader 相同**） |
| `PolylineTrailMaterialProperty` → `"PolylineTrail"` | `PolylineTrailMaterialProperty` → `"PolylineTrail"`（shader 基本一致） |

**结论**：vue3 示例 `entityPolylineMaterial.html` 若仍写 `new Cesium.PolylineFlowMaterialProperty({ image: '...' })`，贴图箭头效果会失效或异常；应改为：

```javascript
new Cesium.PolylineFlowImageMaterialProperty({
  color: Cesium.Color.AQUA,
  image: '/examples/material/arrow2.png',
  repeat: new Cesium.Cartesian2(20, 1),
  speed: 30
})
```

另外 vue3 示例中 `repeat: 4.0`（数字）在旧版需写 `repeat: new Cesium.Cartesian2(4.0, 1.0)`。

## 贴图与示例对应关系（entityPolylineMaterial.html）

| 示例名称 | 贴图 | speed | repeat |
|----------|------|-------|--------|
| 绿色箭头流动 | arrow_1.png | 20 | (4, 1) |
| 青色箭头流动 | arrow2.png | 30 | (20, 1) |
| 绿色线条流动 | line.png | 25 | (2, 1) |
| 绿色箭头线流动 | lineAarrow.png | 20 | (5, 1) |
| 黄绿纹理流动 | lineClr.png | 25 | 默认 (1,1) |
| 纯纹理流动 | lineClr2.png | 10 | 默认 |
| 半透明数据流 | LineDataTrans.png | 8 | 默认 |
| 链路脉冲 | LinkPulse.png | 3 | 默认 |
