# 示例测试数据

大体积空间数据（3DTiles、地形、SHP 原始包）**不进 Git**，通过本地或内网 HTTP 服务提供。

## 本地数据服务

```bash
# 将数据目录挂载到 8888 端口（目录结构需与 manifest 中 remote 路径一致）
npx serve ./your-local-data -p 8888
```

## 环境变量

在 `vue3_cesium_vite/.env.development` 中配置：

```
VITE_DATA_ENV=development
VITE_DATA_BASE_URL=http://localhost:8888
```

## 目录约定

| 路径 | 说明 |
|------|------|
| `geojson/` | 小体积 GeoJSON，可提交 Git |
| `models/` | GLB/GLTF 小样 |
| `manifest.json` | 数据集注册表 |

HTML 示例通过 `/data/data-env.js` 的 `window.CESIUM_DATA` 引用别名，避免硬编码内网 IP。
