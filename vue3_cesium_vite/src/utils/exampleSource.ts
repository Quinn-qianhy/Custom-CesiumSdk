import { getHtmlExampleFetchPath } from '@/utils/exampleResolver'

const sourceModules = import.meta.glob<string>('@/components/**/*.vue', {
  query: '?raw',
  import: 'default'
})

const componentSourcePathById = new Map<string, string>()
for (const path of Object.keys(sourceModules)) {
  const match = path.match(/\/([^/]+)\.vue$/)
  if (match) {
    componentSourcePathById.set(match[1], path)
  }
}

const htmlSourceCache = new Map<string, Promise<string>>()

/** 按组件 ID 加载 Vue 示例源码 */
export async function loadExampleSource(componentId: string): Promise<string> {
  if (!componentId) {
    return '// 未指定示例组件'
  }

  const modulePath = componentSourcePathById.get(componentId)

  if (!modulePath) {
    return `// 未找到组件 ${componentId} 的源码文件`
  }

  return sourceModules[modulePath]()
}

/** 加载 HTML 示例源码（带内存缓存，避免 iframe 与 CodePanel 重复 fetch） */
export async function loadHtmlExampleSource(examplePath: string): Promise<string> {
  if (!examplePath) {
    return '<!-- 未指定 HTML 示例路径 -->'
  }

  const fetchPath = getHtmlExampleFetchPath(examplePath)
  const cached = htmlSourceCache.get(fetchPath)
  if (cached) {
    return cached
  }

  const request = (async () => {
    const response = await fetch(fetchPath)
    if (!response.ok) {
      return `<!-- 无法加载 ${fetchPath} (${response.status}) -->`
    }
    const text = await response.text()
    if (text.includes('/@vite/client') && !text.includes('cesiumContainer')) {
      return `<!-- 无法加载 ${fetchPath}：返回了 SPA 入口页，请检查路径 -->`
    }
    return text
  })()

  htmlSourceCache.set(fetchPath, request)
  return request
}

/** 清除 HTML 源码缓存（路由切换时可按需调用） */
export function clearHtmlExampleSourceCache(): void {
  htmlSourceCache.clear()
}
