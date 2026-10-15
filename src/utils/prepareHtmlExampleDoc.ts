// 子路径部署（GitHub Pages）时 blob 文档的 base 与 Cesium 资源根都要带上部署前缀，
// 否则 iframe 里的相对路径会解析到域名根导致 404
const CESIUM_BASE_URL_SCRIPT = `<script>window.CESIUM_BASE_URL='${import.meta.env.BASE_URL}cesium/';</script>`

/** 为 srcdoc iframe 注入 base 与 Cesium 资源根路径，避免 about:srcdoc 下资源解析失败 */
export function prepareHtmlExampleDoc(html: string, origin = window.location.origin): string {
  if (!html || html.includes('<!-- 无法加载') || html.includes('<!-- 未指定')) {
    return html
  }

  let doc = html

  if (!/<base\s/i.test(doc)) {
    doc = doc.replace(/<head(\s[^>]*)?>/i, `<head$1>\n  <base href="${origin}${import.meta.env.BASE_URL}">`)
  }

  if (!/CESIUM_BASE_URL/.test(doc)) {
    // HTML 源码里的 Cesium.js 引用可能是根绝对或相对路径，这里只认文件位置
    doc = doc.replace(
      /(<script\s+src="[^"]*\/cesium\/Cesium\.js"><\/script>)/i,
      `${CESIUM_BASE_URL_SCRIPT}\n$1`
    )
  }

  return doc
}
