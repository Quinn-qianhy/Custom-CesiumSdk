# HY 3D API 示例中心

基于 **Vue 3 + Vite + TypeScript** 的 WebGIS 示例中心，内置自编译 Cesium 与 OpenLayers 双引擎示例画廊，覆盖场景浏览、图层叠加、几何绘制、材质特效、自定义控件等能力，支持在页面上直接查看与编辑示例源码。

## 特性

- **双引擎画廊**：Cesium（三维地球）与 OpenLayers（二维地图）菜单独立维护，顶栏一键切换
- **两类示例运行时**：HTML 示例走 iframe 沙箱，Vue 示例走组件挂载 + 代码面板
- **在线代码调试**：源码面板支持编辑、运行与重置，实时预览修改效果
- **统一 GUI 面板**：示例参数通过 `ExampleGui` 统一渲染为左上角浮层；HTML 示例嵌入宿主时由父页面代理创建 lil-gui，避免 iframe 与父页面 DOM 错位
- **双主题**：暗色 / 亮色主题切换
- **响应式布局**：顶栏、侧栏、底栏三段式结构

## 快速开始

```bash
pnpm install
pnpm dev          # http://localhost:3000
pnpm typecheck    # vue-tsc --noEmit
pnpm build        # typecheck + vite build
pnpm preview
```

- 包管理器：pnpm
- 默认引擎：Cesium
- 开发端口：3000（`vite.config.js` 中 `server.port`）

## 技术栈

| 依赖 | 版本 | 说明 |
|------|------|------|
| Vue | 3.2 | Composition API |
| Vue Router | 4.1 | hash 模式 |
| Pinia | 2.1 | 状态管理 |
| Element Plus | 2.6 | UI 组件库 |
| Vite | 5.4 | 构建工具 |
| TypeScript | 5.7 | `strict: true` |
| Cesium | 1.144 | 自编译发行包，位于 `public/cesium/` |
| OpenLayers | 10.9 | 二维地图引擎 |
| lil-gui | 0.19 | 示例参数面板 |

## 目录结构

```
vue3_cesium_vite/
├── public/
│   ├── cesium/                    # 自编译 Cesium 发行包（Cesium.js / Widgets / 类型声明）
│   ├── Documentation/             # Cesium 官方 API 文档
│   ├── examples/
│   │   ├── cesium/
│   │   │   ├── html/              # Cesium HTML 示例源码
│   │   │   ├── cards/             # 示例缩略图（237×237）
│   │   │   └── assets/            # 示例依赖的图片、模型、材质
│   │   ├── openlayers/
│   │   │   ├── html/              # OpenLayers HTML 示例源码
│   │   │   ├── cards/             # 示例缩略图（237×237）
│   │   │   └── ol/                # OpenLayers 共享模块
│   │   └── shared/                # example-gui.js / example-gui.css
│   ├── vendor/lil-gui/            # lil-gui 独立发行版（HTML 示例引用）
│   └── defaultAccessToken.js      # 地图服务 Token
├── scripts/                       # 截图与批量迁移脚本
├── src/
│   ├── main.ts                    # 应用入口
│   ├── types/                     # 共享类型（example / engine / injection）
│   ├── stores/                    # Pinia（app / engine / examples）
│   ├── hooks/                     # 组合式函数（useCommonImports 等）
│   ├── utils/                     # 示例解析、源码加载、GUI 桥接、绘制工具
│   ├── config/                    # 菜单、引擎注册、站点信息
│   ├── components/                # 布局、容器与分类组件
│   ├── views/                     # 页面（HomeScene / SceneManage / HtmlExamplePage / About）
│   ├── layouts/                   # DefaultLayout / MapLayout
│   ├── shaders/                   # 自定义着色器
│   └── styles/                    # 全局样式
├── CONTEXT.md                     # 领域术语表
└── vite.config.js
```

## 架构

### 引擎注册表

所有引擎在 `src/config/engines/index.ts` 的 `ENGINE_REGISTRY` 中注册，每项包含 `id`、`label`、`description` 与 `menu`：

| 引擎 | 状态 | 菜单来源 |
|------|------|----------|
| `cesium` | 已接入（默认） | `src/config/config.js` |
| `openlayers` | 已接入 | `src/config/olMenu.js` |
| `threejs` | 占位（菜单为空） | — |

新增引擎只需在注册表中追加一项并实现对应容器组件。

### 示例目录

菜单是「子菜单 → 分组 → 页面」三层结构，页面条目即 `ExamplePage`：

```js
{
  name: '示例中文名',
  image: '/examples/cesium/cards/ExampleName.png',
  type: 'html',
  url: '/examples/cesium/html/exampleName.html'
}
```

| 字段 | 说明 |
|------|------|
| `type` | `html`（iframe 示例）、`vue`（组件示例）、`external`（外链） |
| `url` | HTML 示例填静态文件路径；Vue 示例填 componentId（与 `.vue` 文件名一致） |
| `status` | `pending` 表示示例待修复，卡片显示角标**且点击会被拦截** |
| `statusTags` / `statusHint` | 仅提示不拦截，用于标注数据来源或操作说明 |

### 路由

hash 模式（`createWebHashHistory`）：

| 路由 | 页面 | 说明 |
|------|------|------|
| `/#/` | HomeScene | 示例画廊 |
| `/#/about` | About | 关于项目 |
| `/#/examples/html/:examplePath(.*)` | HtmlExamplePage | HTML iframe 示例 |
| `/#/examples/:componentId` | Example | Vue 示例 + 代码面板 |

## 新增示例

### Cesium HTML 示例

1. 创建 `public/examples/cesium/html/{name}.html`

   必须引入以下资源，并在脚本末尾调用 `ExampleGui.finishedLoading()`：

   ```html
   <script src="/vendor/lil-gui/lil-gui.umd.min.js"></script>
   <script src="/examples/shared/example-gui.js"></script>
   <script src="/cesium/Cesium.js"></script>
   <script src="/defaultAccessToken.js"></script>
   <link href="/cesium/Widgets/widgets.css" rel="stylesheet" />
   <link href="/vendor/lil-gui/lil-gui.min.css" rel="stylesheet" />
   <link href="/examples/shared/example-gui.css" rel="stylesheet" />
   ```

   地图容器使用 `<div id="cesiumContainer">`，GUI 一律通过 `ExampleGui.addButton / addSlider / addMenu / addToggleButton` 创建，**不要**在示例里直接 `new lil.GUI()`。

2. 注册菜单：在 `src/config/config.js` 对应分组下追加条目

3. 生成缩略图：

   ```bash
   python scripts/capture-cesium-card-screenshots.py --name ExampleName
   ```

   输出 `public/examples/cesium/cards/ExampleName.png`（237×237）。截图前请确保示例的默认状态就有内容可看（如默认已创建标注、默认已加载图层）。

4. 验收：打开 `/#/`，确认卡片缩略图与示例实际画面一致，且点击能正常进入。

### Vue 示例

1. 在 `src/components/<分类>/` 下创建组件（`<script setup lang="ts">`），通过 `useCommonImports()` 获取 `viewer`、`GUI` 等依赖：

   ```ts
   import { useCommonImports } from '@/hooks/useCommonImports'
   const { onMounted, GUI, getViewer, useExamplesStore } = useCommonImports()
   ```

2. 注册菜单时 `url` 填组件 ID（与 `.vue` 文件名一致），`type` 填 `vue`。

### 状态字段注意事项

`status: 'pending'` 不只是显示角标，`HomeScene.vue` 会直接拦截点击并弹出提示：

```js
if (page.status === 'pending') {
  ElMessage.warning(page.statusReason?.trim() || '该示例待修复，暂不可用')
  return
}
```

因此：

- 已实现的示例**不要**写 `status` 字段
- 仅需补充说明时使用 `statusTags: ['hint']` + `statusHint: '...'`，不影响点击
- 移除待修复标记时，需把 `status`、`statusTags`、`statusReason` 三个字段整体删除

`src/config/exampleStatus.js` 是自动生成的状态表，`config.js` 中的显式字段优先于它。

## 脚本工具

`scripts/` 目录下的 Node 与 Python 脚本：

| 脚本 | 用途 |
|------|------|
| `capture-cesium-card-screenshots.py` | 截取 Cesium 示例缩略图（237×237，截 `#cesiumContainer`） |
| `capture-ol-card-screenshots.py` | 截取 OpenLayers 示例缩略图（237×237，截 `#map`） |
| `migrate-example-gui.mjs` | 将示例的旧 GUI 写法迁移为 `ExampleGui` |
| `migrate-knockout-gui.mjs` | 将 Knockout 面板迁移为 `ExampleGui` |
| `patch-example-data-urls.mjs` | 批量修正示例中的数据资源路径 |

截图脚本依赖 Python 环境：

```bash
pip install playwright pillow
python -m playwright install chromium-headless-shell
```

支持参数：`--name`（单个示例）、`--names`（逗号分隔多个）、`--base-url`（默认 `http://localhost:3000`）。

## 许可

MIT
