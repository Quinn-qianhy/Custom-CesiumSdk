import comNames from '@/config/comNames'
import type { ComponentNameMapping, ExamplePage, ExampleType } from '@/types/example'

const nameToComponentMap = new Map<string, string>(
  (comNames as ComponentNameMapping[]).map((item) => [item.id, item.name])
)

/** 根据示例展示名称解析组件 ID */
export function resolveComponentId(pageName: string): string | null {
  return nameToComponentMap.get(pageName) ?? null
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

  if (
    url.endsWith('.html') ||
    url.startsWith('/static/examples') ||
    url.startsWith('/examples/')
  ) {
    return 'html'
  }

  return 'vue'
}

/** 将菜单 url 规范化为 public 下的 HTML 路径（不含 leading slash） */
export function normalizeHtmlExamplePath(url: string): string {
  let path = url

  if (path.startsWith('/static/examples/')) {
    path = path.replace('/static/examples/', '/examples/')
  }

  if (path.startsWith('/')) {
    path = path.slice(1)
  }

  return path
}

/** 从菜单 url 或路由参数解析 HTML 文件名（用于路由 params） */
export function resolveHtmlExampleRouteParam(urlOrPath: string): string {
  const normalized = normalizeHtmlExamplePath(urlOrPath)
  const withoutRoutePrefix = normalized.replace(/^examples\/html\//, '')
  const fileName = withoutRoutePrefix.replace(/^examples\//, '')
  return fileName.split('/').pop() ?? fileName
}

/** 获取 HTML 示例的 fetch 路径（带 leading slash，始终指向 public/examples/） */
export function getHtmlExampleFetchPath(examplePath: string): string {
  const fileName = resolveHtmlExampleRouteParam(examplePath)
  return `/examples/${fileName}`
}
