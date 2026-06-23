import * as Vue from 'vue'
import type { Component } from 'vue'
import { loadModule } from 'vue3-sfc-loader'
import GUI from 'lil-gui'
import * as Cesium from 'cesium'
import { useExamplesStore } from '@/stores/examplesStore'

const rawModuleLoaders = import.meta.glob<string>('/src/**/*.{js,vue,scss,ts}', {
  query: '?raw',
  import: 'default'
})

const styleElements = new Set<HTMLStyleElement>()

function toVirtualPath(filePath: string): string {
  const match = filePath.match(/[/\\]src[/\\](.+)$/)
  if (!match) {
    return filePath.replace(/\\/g, '/')
  }
  return `/src/${match[1].replace(/\\/g, '/')}`
}

const virtualPathIndex = new Map<string, () => Promise<string>>()

Object.entries(rawModuleLoaders).forEach(([key, loader]) => {
  const virtualPath = toVirtualPath(key)
  virtualPathIndex.set(virtualPath, loader)

  const withoutExt = virtualPath.replace(/\.(js|ts|vue|scss)$/, '')
  if (!virtualPathIndex.has(withoutExt)) {
    virtualPathIndex.set(withoutExt, loader)
  }
})

function normalizeAlias(path: string): string {
  if (path.startsWith('@/')) {
    return `/src/${path.slice(2)}`
  }
  return path.replace(/\\/g, '/')
}

function resolveRelativePath(refPath: string, relPath: string): string {
  const baseParts = refPath.split('/').slice(0, -1)
  const relParts = relPath.split('/')
  const stack = [...baseParts]

  relParts.forEach((part) => {
    if (!part || part === '.') {
      return
    }
    if (part === '..') {
      stack.pop()
      return
    }
    stack.push(part)
  })

  return stack.join('/')
}

function findLoader(path: string): (() => Promise<string>) | undefined {
  const normalized = normalizeAlias(path)
  const candidates = [
    normalized,
    `${normalized}.ts`,
    `${normalized}.js`,
    `${normalized}.vue`,
    `${normalized}/index.ts`,
    `${normalized}/index.js`
  ]

  for (const candidate of candidates) {
    const loader = virtualPathIndex.get(candidate)
    if (loader) {
      return loader
    }
  }

  return undefined
}

function getEntryPath(componentId: string): string {
  return `/examples/${componentId}.vue`
}

const sharedModuleCache: Record<string, unknown> = {
  vue: Vue,
  'lil-gui': GUI,
  cesium: Cesium,
  '@/stores/examplesStore': { useExamplesStore },
  '../stores/examplesStore': { useExamplesStore },
  '../../stores/examplesStore': { useExamplesStore }
}

/** 从编辑后的 SFC 源码动态加载示例组件 */
export async function loadExampleFromSource(
  source: string,
  componentId: string
): Promise<Component> {
  const entryPath = getEntryPath(componentId)

  const options = {
    moduleCache: sharedModuleCache,
    pathResolve({
      refPath,
      relPath
    }: {
      refPath: string
      relPath: string
    }) {
      if (relPath.startsWith('@/')) {
        return normalizeAlias(relPath)
      }
      if (relPath.startsWith('.')) {
        return resolveRelativePath(refPath, relPath)
      }
      return relPath
    },
    async getFile(url: string) {
      if (url === entryPath) {
        return {
          getContentData: () => source,
          type: '.vue'
        }
      }

      const loader = findLoader(url)
      if (!loader) {
        throw new Error(`未找到依赖文件: ${url}`)
      }

      const content = await loader()
      const type = url.endsWith('.vue')
        ? '.vue'
        : url.endsWith('.scss')
          ? '.scss'
          : '.js'

      return {
        getContentData: () => content,
        type
      }
    },
    addStyle(textContent: string) {
      const style = document.createElement('style')
      style.setAttribute('data-example-runtime', componentId)
      style.textContent = textContent
      document.head.appendChild(style)
      styleElements.add(style)
    },
    log(type: string, ...args: unknown[]) {
      if (type === 'error') {
        console.error('[example-runtime]', ...args)
      }
    }
  }

  return loadModule(entryPath, options)
}

/** 清理运行时注入的样式 */
export function clearRuntimeStyles(): void {
  styleElements.forEach((style) => {
    style.remove()
  })
  styleElements.clear()
}
