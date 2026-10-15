# vue3_cesium_vite

Vue 3 + Vite + TypeScript + 自编译 Cesium 的 3D API 示例中心。

## Quick Start

```bash
cd vue3_cesium_vite
pnpm install
pnpm dev          # http://0.0.0.0:3000
pnpm typecheck    # vue-tsc --noEmit
pnpm build        # typecheck + vite build
pnpm preview
```

- 包管理器：pnpm
- 语言：TypeScript（`strict: true`）
- 大菜单数据 `config/config.js` 仍为 JS（`allowJs: true`）

## Architecture

```
src/
├── main.ts                        # 应用入口
├── types/                         # 共享类型（example / engine / cesium.d.ts）
├── stores/                        # Pinia（app / engine / examples）
├── hooks/                         # useCommonImports、useResizableExamplePanel
├── utils/                         # 示例解析、源码加载、sceneManager、draw
├── config/                        # 菜单、引擎注册、站点信息
├── components/layout/             # AppSidebar、MainNavigation、AppFooter
├── components/CesiumContainer.vue # Viewer 生命周期容器
├── views/HomeScene.vue            # 示例画廊
├── views/SceneManage.vue          # Vue 示例页
├── views/HtmlExamplePage.vue      # HTML 示例页
└── layouts/DefaultLayout.vue      # 顶栏 + 侧栏 + 底栏
```

| 路由 | 页面 | 说明 |
|------|------|------|
| `/` | HomeScene | 示例画廊，菜单来自 engineStore |
| `/about` | About | 关于项目 |
| `/examples/:componentId` | SceneManage | Vue 示例 + CodePanel |
| `/examples/html/:examplePath` | HtmlExamplePage | HTML iframe 示例 |

- Cesium：`public/cesium/`（Vite alias `'cesium'`，类型见 `src/types/cesium.d.ts`）
- Viewer 注入：`VIEWER_INJECTION_KEY`（`src/types/injection.ts`）

## Adding a New Example

1. `src/config/config.js`（或 `olMenu.js`）添加菜单项；Vue 示例的 `url` 填组件 ID（与 `.vue` 文件名一致）
2. `src/components/<category>/<name>.vue` 创建组件（`<script setup lang="ts">`）

HTML 示例的完整流程（示例页 → 菜单注册与状态标记 → 缩略图截图 → 画廊验收）见项目 skill：

- Cesium：`.cursor/skills/add-cesium-example/SKILL.md`
- OpenLayers：`.cursor/skills/adapt-openlayers-official-example/SKILL.md`

示例组件惯例：

```ts
import { useCommonImports } from '@/hooks/useCommonImports'
const { onMounted, GUI, getViewer, useExamplesStore } = useCommonImports()
```

## Gotchas

- **Cesium 定制 API**：`utils/customMaterial/*.ts` 与部分示例组件使用 `@ts-nocheck`（自编译包无完整类型）
- **HTML 双 fetch**：已统一走 `loadHtmlExampleSource` 内存缓存
- **HTML 示例目录**：按引擎分目录 — `public/examples/cesium/`、`public/examples/openlayers/`、`public/examples/shared/`
- **HTML 示例工具栏**：嵌入宿主时由父页面 `htmlExampleGuiBridge` 代理创建 `lil-gui`（避免 iframe window 与父页面 DOM 错位）；独立打开 HTML 时仍用页面内 `example-gui.js`
- **DrawTool**：`entityPoint.vue` 使用静态方法 `DrawTool.startDraw / stopDrawing`
- **菜单 url**：HTML 示例的 `url` 指向 `/examples/<engine>/html/*.html` 静态文件；Vue 示例的 `url` 即 componentId（见 `CONTEXT.md`）
