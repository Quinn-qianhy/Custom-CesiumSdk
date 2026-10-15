import type { ExamplePage, ExampleType } from '@/types/example'

/** 从菜单页解析 Vue 组件 ID（type=vue 时 url 即 componentId） */
export function resolveComponentId(
  page: Pick<ExamplePage, 'type' | 'url' | 'name'>
): string | null {
  if (resolveExampleType(page) !== 'vue') {
    return null
  }

  const raw = (page.url ?? '').trim()
  if (!raw) {
    return null
  }

  const withoutLeading = raw.startsWith('/') ? raw.slice(1) : raw
  if (withoutLeading.includes('/')) {
    return withoutLeading.split('/').pop() ?? null
  }

  return withoutLeading
}

/** 解析示例类型（显式 type 优先，否则按 url 推断） */
export function resolveExampleType(page: Pick<ExamplePage, 'type' | 'url'>): ExampleType {
  if (page.type) {
    return page.type
  }

  const url = page.url ?? ''

  if (url.startsWith('http://') || url.startsWith('https://')) {
    return 'external'
  }

  if (url.endsWith('.html') || url.startsWith('/examples/')) {
    return 'html'
  }

  return 'vue'
}

/** 将菜单 url 规范化为 public 下的 HTML 路径（不含 leading slash） */
export function normalizeHtmlExamplePath(url: string): string {
  return url.startsWith('/') ? url.slice(1) : url
}

/** 从菜单 url 或路由参数解析 HTML 相对路径（保留引擎子目录，如 cesium/html/viewer.html） */
export function resolveHtmlExampleRouteParam(urlOrPath: string): string {
  let normalized = normalizeHtmlExamplePath(urlOrPath)
  normalized = normalized.replace(/^examples\/html\//, '')
  normalized = normalized.replace(/^examples\//, '')
  return normalized
}

/** 获取 HTML 示例的 fetch 路径（带 leading slash，指向 public/examples/ 下引擎目录） */
export function getHtmlExampleFetchPath(examplePath: string): string {
  const relative = resolveHtmlExampleRouteParam(examplePath)
  if (!relative) {
    return '/examples/'
  }

  if (relative.startsWith('cesium/') || relative.startsWith('openlayers/')) {
    return `/examples/${relative}`
  }

  // 兼容旧路由：仅文件名时按前缀推断引擎
  const fileName = relative.split('/').pop() ?? relative
  if (fileName.toLowerCase().startsWith('ol')) {
    return `/examples/openlayers/html/${fileName}`
  }

  return `/examples/cesium/html/${fileName}`
}
