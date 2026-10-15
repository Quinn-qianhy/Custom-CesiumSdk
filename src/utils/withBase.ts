/**
 * 拼接部署 base 前缀。
 * GitHub Pages 项目页部署在 /<仓库名>/ 子路径下，代码里以 / 开头的静态资源路径
 * 若不加前缀会打到域名根导致 404；base 为 / 时本函数原样返回，行为与直连部署一致。
 */
export function withBase(path: string): string {
  if (!path.startsWith('/') || /^(https?:)?\/\//i.test(path)) {
    return path
  }
  const base = import.meta.env.BASE_URL
  return (base === '/' ? '' : base.replace(/\/$/, '')) + path
}
