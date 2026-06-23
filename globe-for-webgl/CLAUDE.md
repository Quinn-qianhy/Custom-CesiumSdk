# globe-for-webgl

Vue 3 + Vite 示例导航壳，Cesium 能力以 `static/examples/*.html` 独立页面承载。

## Quick Start

```bash
cd globe-for-webgl
npm install          # 有 package-lock.json，无 pnpm-lock
npm run dev          # http://0.0.0.0:8080，自动打开浏览器
npm run build
npm run preview
```

- 包管理器：npm（`package.json` engines 指定 npm >= 8）
- 当前无 lint / test 脚本

## Architecture

```
globe-for-webgl/
├── src/                           # Vue 导航壳（Element Plus）
│   ├── pages/Examples/config.js   # 示例菜单（~96 项，582 行）
│   ├── pages/Examples/Examples.vue # 示例画廊首页
│   ├── pages/ExamplesView/        # iframe 预览 + CodeMirror 源码编辑
│   ├── pages/APIView/             # iframe 嵌入 API 文档
│   └── pages/Development/         # 开发教程（静态 Codemirror 片段）
├── static/
│   ├── Build/Cesium/              # 自编译 Cesium SDK（非 npm 依赖）
│   ├── Build/Documentation/       # Cesium API 文档
│   ├── examples/*.html            # 95+ 独立 Cesium 示例
│   ├── defaultAccessToken.js      # Cesium Ion Token
│   └── Images/                    # 菜单缩略图、教程配图
└── vite.config.js                 # @ alias、port 8080、scss 全局变量
```

| 路由 | 页面 | 说明 |
|------|------|------|
| `/Examples` | Examples | 侧边栏 + 卡片画廊，菜单来自 `config.js` |
| `/ExamplesView/:url` | ExamplesView | 新标签页打开，iframe 加载 HTML，可编辑源码 |
| `/APIView` | APIView | iframe → `/static/Build/Documentation/index.html` |
| `/Development` | Development | 开发教程（硬编码 Codemirror 片段） |

- 路由模式：**History**（`createWebHistory`），生产部署需 fallback 到 `index.html`
- 兄弟项目：`vue3_cesium_vite/` 正在将部分示例迁移为 Vue 组件，其菜单仍链接本项目的 `/static/examples/*.html`

## Static Example Pattern

每个示例为独立 HTML，通过 script 标签引入 Cesium：

```html
<script src="/static/Build/Cesium/Cesium.js"></script>
<script src="/static/defaultAccessToken.js"></script>
<link href="/static/Build/Cesium/Widgets/widgets.css" rel="stylesheet" />
```

部分示例引用 `Sandcastle-header.js`（Sandcastle 兼容层）。

## Adding a New Example

1. 在 `static/examples/` 创建 `<name>.html`（遵循上述 Cesium 引入模式）
2. 可选：在 `static/examples/` 或 `static/Images/` 添加缩略图
3. 在 `src/pages/Examples/config.js` 对应分类的 `pages` 数组添加 `{ name, image, url }`

## Gotchas

- **URL 路由编码**：打开示例时 `/` 替换为 `orisdom`（`Examples.vue` → `ExamplesView/:url`），还原在 `ExamplesView` 的 `route.params.url.replace(/orisdom/g, "/")`
- **iframe srcdoc**：`ExamplesView` 用 `fetch` 拉取 HTML 后以 `srcdoc` 注入 iframe，非直接 `src` 导航
- **DOM hack**：`ExamplesView` onMounted 会移除父容器中的 header 节点以全屏展示
- **文件名含空格**：如 `Dynamic SkyBox.html`、`Line of Sight Analysis.html`，URL 需正确编码
- **Ion Token**：硬编码于 `static/defaultAccessToken.js`，各 HTML 需单独引入
- **README 过时**：仍写 Webpack 模板，`build --report` 无效，以本文件和 `package.json` 为准
