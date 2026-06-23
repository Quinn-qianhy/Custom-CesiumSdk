/** 解析示例卡片缩略图 URL（统一 public/examples，编码空格） */
export function resolveExampleImageUrl(imagePath: string): string {
  if (!imagePath) {
    return ''
  }

  if (/^https?:\/\//i.test(imagePath)) {
    return imagePath
  }

  let normalized = imagePath

  if (normalized.startsWith('/src/assets/images/exImages/')) {
    normalized = `/examples/${normalized.slice('/src/assets/images/exImages/'.length)}`
  }

  if (!normalized.startsWith('/examples/')) {
    const fileName = normalized.replace(/^\/+/, '')
    normalized = `/examples/${fileName}`
  }

  const slashIndex = normalized.lastIndexOf('/')
  const dir = normalized.slice(0, slashIndex + 1)
  const fileName = normalized.slice(slashIndex + 1)

  return dir + encodeURIComponent(fileName).replace(/%2F/g, '/')
}
