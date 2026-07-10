# vue3_cesium_vite — Domain Glossary

本文件记录示例中心领域的共享词汇，供架构审查与实现使用。

## Core Terms

| Term | Definition |
|------|------------|
| **Engine** | 地图渲染引擎。当前：`cesium`、`openlayers`；占位：`threejs`。由 `ENGINE_REGISTRY` 注册。 |
| **Example** | 用户可从画廊打开的一项演示，类型为 `vue`、`html` 或 `external`。 |
| **ExamplePage** | 菜单中的单条示例元数据（`name`、`image`、`type`、`url`、可选 `status*`）。 |
| **Example Catalog** | 某 Engine 下的全部 `MenuSection[]`，来自 `config.js`（Cesium）或 `olMenu.js`（OpenLayers），经 `ENGINE_REGISTRY` 聚合。 |
| **componentId** | Vue 示例在路由 `/examples/:componentId` 中的标识，**等于**对应 `.vue` 文件名（不含扩展名）。对 `type: 'vue'` 的菜单项，`url` 字段即 componentId。 |
| **Example Runtime** | 负责加载、重置、卸载 Vue 示例组件的运行时（当前实现在 `activeCom.vue`，待深化为独立 module）。 |
| **Map Context** | 示例组件访问底层地图实例的注入 seam（当前为 `VIEWER_INJECTION_KEY` / `OL_MAP_INJECTION_KEY`，待统一）。 |

## Resolution Rules

1. **示例类型**：`resolveExampleType(page)` — 显式 `type` 优先，否则按 `url` 推断。
2. **Vue 组件 ID**：`resolveComponentId(page)` — 当类型为 `vue` 时，从 `page.url` 解析 componentId（去前导 `/`，遗留路径取末段）。
3. **引擎选择**：示例页 `route.query.engine` 优先于 `engineStore.currentEngineId`。

## Architecture Decisions (Grilling — Candidate 1)

**选定**：Example Catalog 单真源（2026-07-09）

| 约束 | 决策 |
|------|------|
| `config.js` 保持 JS | 是 — 不强制 TS 迁移 |
| HTML 示例 URL | 不变 — 仅 Vue 示例的 `url` 语义收敛为 componentId |
| 删除 `comNames` / `olComNames` | 是 — 查表 seam 移除 |
| 缺失组件（entityLine、entityRectangle） | `status: 'pending'` — 保留菜单项，url 已为未来 componentId |
| 脚本工具（migrate/repair） | 不受影响 — 仅操作 HTML 示例 |
| 测试 | 本次不引入 vitest — `resolveComponentId` / `resolveExampleType` 为后续 test surface |

## Module Map (target state)

```
ENGINE_REGISTRY (seam entry)
  └── Example Catalog (menu per engine)
        └── ExamplePage.url ──► componentId (vue only)
              └── Example Runtime ──► .vue component
```
