import { withBase } from './withBase'

/** 解析示例卡片缩略图 URL（支持 /examples/{engine}/cards/ 路径，编码空格） */
export function resolveExampleImageUrl(imagePath: string): string {
  if (!imagePath) {
    return ''
  }

  if (/^https?:\/\//i.test(imagePath)) {
    return imagePath
  }

  let normalized = imagePath

  if (normalized.startsWith('/src/assets/images/exImages/')) {
    normalized = `/examples/cesium/cards/${normalized.slice('/src/assets/images/exImages/'.length)}`
  }

  if (
    !normalized.startsWith('/examples/cesium/') &&
    !normalized.startsWith('/examples/openlayers/') &&
    !normalized.startsWith('/examples/shared/')
  ) {
    const fileName = normalized.replace(/^\/+/, '').replace(/^examples\//, '')
    normalized = `/examples/cesium/cards/${fileName}`
  }

  const slashIndex = normalized.lastIndexOf('/')
  const dir = normalized.slice(0, slashIndex + 1)
  const fileName = normalized.slice(slashIndex + 1)

  return withBase(dir + encodeURIComponent(fileName).replace(/%2F/g, '/'))
}
