/**
 * 从 globe-for-webgl 批量迁移 HTML 示例，并分析待修复状态
 * 用法: node scripts/migrate-html-examples.mjs
 */
import fs from 'fs'
import path from 'path'
import { fileURLToPath } from 'url'

const __dirname = path.dirname(fileURLToPath(import.meta.url))
const ROOT = path.resolve(__dirname, '..')
const SRC = path.resolve(ROOT, '../globe-for-webgl/static/examples')
const DEST = path.resolve(ROOT, 'public/examples')
const THUMBNAIL_PREFIX = '/examples'

const SERVER_DATA_PATTERNS = [
  /172\.20\.\d+\.\d+/,
  /180\.167\.\d+\.\d+/,
  /localhost:8888/,
  /cesiumLocal_dem/,
  /\/3dtiles\//i,
  /geoserver/i,
  /\/geojson\//i,
  /\.glb['"]/i,
  /earthsdk\.com.*tileset/i,
  /\/ParcLeadMine\//i,
  /\/model\//i
]

const CESIUM_API_PATTERNS = [
  /new Cesium\.Map\s*\(/,
  /pluginJs\//,
  /cesium-viewshed/i,
  /ViewShed3D/i,
  /VisibilityAnalysis/,
  /PolyGradientMaterialProperty/,
  /PolylineFlowMaterialProperty/,
  /DiffusionCircleMaterialProperty/,
  /GoogleImageryProvider/,
  /PolylineTrailMaterialProperty/,
  /EllipsoidTrailMaterialProperty/,
  /RaderScanCircleMaterial/,
  /WallLinkMaterial/,
  /PolylineVolumeMaterialProperty/
]

const MAP_KEY_PATTERNS = [
  /api\.map\.baidu\.com/i,
  /webst\d+\.is\.autonavi\.com/i,
  /restapi\.amap\.com/i
]

function transformContent(content) {
  return content
    .replace(/\/static\/Build\/Cesium\//g, '/cesium/')
    .replace(/\/static\/defaultAccessToken\.js/g, '/defaultAccessToken.js')
    .replace(/\/static\/examples\//g, '/examples/')
    .replace(/\/examples\/Sandcastle-header\.js/g, '/examples/example-gui.js')
    .replace(/\/examples\/bucket\.css/g, '/examples/example-gui.css')
    .replace(/Sandcastle\./g, 'ExampleGui.')
}

function analyzeHtml(relativePath, content) {
  const reasons = []
  const tags = new Set()

  if (SERVER_DATA_PATTERNS.some((p) => p.test(content))) {
    tags.add('server-data')
    reasons.push('依赖本地/内网服务器数据')
  }

  if (MAP_KEY_PATTERNS.some((p) => p.test(content))) {
    tags.add('server-data')
    reasons.push('依赖第三方地图服务或 API Key')
  }

  if (CESIUM_API_PATTERNS.some((p) => p.test(content))) {
    tags.add('cesium-api')
    reasons.push('使用定制 Cesium API 或扩展插件')
  }

  if (/pluginJs\/[^'"]+\.js/.test(content)) {
    const plugins = [...content.matchAll(/pluginJs\/([^'"]+\.js)/g)].map((m) => m[1])
    const missing = plugins.filter(
      (p) => !fs.existsSync(path.join(DEST, 'pluginJs', p))
    )
    if (missing.length) {
      tags.add('cesium-api')
      reasons.push(`缺少插件: ${missing.join(', ')}`)
    }
  }

  if (tags.size === 0) {
    return { status: 'ok', tags: [], reason: '' }
  }

  return {
    status: 'pending',
    tags: [...tags],
    reason: reasons.join('；')
  }
}

function copyDir(src, dest) {
  fs.mkdirSync(dest, { recursive: true })
  const textLike = /\.(html|js|json|css)$/i

  for (const entry of fs.readdirSync(src, { withFileTypes: true })) {
    const srcPath = path.join(src, entry.name)
    const destPath = path.join(dest, entry.name)

    if (entry.isDirectory()) {
      copyDir(srcPath, destPath)
      continue
    }

    if (textLike.test(entry.name)) {
      let content = fs.readFileSync(srcPath, 'utf8')
      content = transformContent(content)
      fs.writeFileSync(destPath, content, 'utf8')
    } else {
      fs.copyFileSync(srcPath, destPath)
    }
  }
}

function resolveImage(page, globeImageMap, pubFiles) {
  const url = page.url || ''
  const htmlName = path.basename(url)

  const candidates = new Set()
  if (globeImageMap?.has(htmlName)) {
    candidates.add(globeImageMap.get(htmlName))
  }
  if (globeImageMap?.has(page.name)) {
    candidates.add(globeImageMap.get(page.name))
  }
  if (page.image) {
    candidates.add(path.basename(page.image))
  }

  const htmlBase = htmlName.replace(/\.html$/i, '')
  candidates.add(`${htmlBase}.png`)
  candidates.add(`${htmlBase}.gif`)
  candidates.add(`${htmlBase}.jpg`)
  candidates.add(`${htmlBase}.jpeg`)

  for (const name of candidates) {
    const pubPath = path.join(DEST, name)
    if (fs.existsSync(pubPath) && /\.(png|gif|jpe?g|webp)$/i.test(name)) {
      return `${THUMBNAIL_PREFIX}/${name}`
    }
  }

  const pubList =
    pubFiles ||
    fs.readdirSync(DEST).filter((f) => /\.(png|gif|jpe?g|webp)$/i.test(f))
  const normHtml = htmlBase.toLowerCase().replace(/[\s_\-()（）]/g, '')

  const fuzzy = pubList.find((file) => {
    const normFile = path.parse(file).name.toLowerCase().replace(/[\s_\-()（）]/g, '')
    return normFile.includes(normHtml.slice(0, 8)) || normHtml.includes(normFile.slice(0, 8))
  })

  if (fuzzy) {
    return `${THUMBNAIL_PREFIX}/${fuzzy}`
  }

  return `${THUMBNAIL_PREFIX}/development.png`
}

function buildGlobeImageMap(globeMenu) {
  const map = new Map()
  for (const section of globeMenu) {
    for (const group of section.menuItem || []) {
      for (const page of group.pages || []) {
        map.set(path.basename(page.url), path.basename(page.image))
        map.set(page.name, path.basename(page.image))
      }
    }
  }
  return map
}

function parseGlobeConfig(filePath) {
  const raw = fs.readFileSync(filePath, 'utf8')
  const match = raw.match(/const menu\s*=\s*(\[[\s\S]*\])\s*\n\s*export default menu/)
  if (!match) {
    throw new Error('无法解析 globe config.js')
  }
  return eval(match[1])
}

function buildConfigFromGlobe(statusMap) {
  const globeConfigPath = path.resolve(
    ROOT,
    '../globe-for-webgl/src/pages/Examples/config.js'
  )
  const menu = parseGlobeConfig(globeConfigPath)
  const globeImageMap = buildGlobeImageMap(menu)
  const pubFiles = fs.existsSync(DEST)
    ? fs.readdirSync(DEST).filter((f) => /\.(png|gif|jpe?g|webp)$/i.test(f))
    : []

  const transformPage = (page) => {
    let url = page.url
    if (url.startsWith('/static/examples/')) {
      url = url.replace('/static/examples/', '/examples/')
    }

    const fileName = path.basename(url)
    const analysis = statusMap[fileName] || { status: 'ok', tags: [], reason: '' }
    const image = resolveImage(page, globeImageMap, pubFiles)

    const item = {
      name: page.name,
      image,
      type: 'html',
      url
    }

    if (analysis.status === 'pending') {
      item.status = 'pending'
      item.statusTags = analysis.tags
      item.statusReason = analysis.reason
    }

    return item
  }

  return menu.map((section) => ({
    ...section,
    menuItem: section.menuItem.map((group) => ({
      ...group,
      pages: group.pages.map(transformPage)
    }))
  }))
}

function main() {
  if (!fs.existsSync(SRC)) {
    console.error('源目录不存在:', SRC)
    process.exit(1)
  }

  console.log('复制并转换示例文件...')
  copyDir(SRC, DEST)

  if (fs.existsSync(path.join(DEST, 'siChuanPolygon.json'))) {
    const geoDir = path.resolve(ROOT, 'public/data/geojson')
    fs.mkdirSync(geoDir, { recursive: true })
    fs.copyFileSync(
      path.join(DEST, 'siChuanPolygon.json'),
      path.join(geoDir, 'siChuanPolygon.json')
    )
  }

  const statusMap = {}
  const htmlFiles = fs
    .readdirSync(DEST)
    .filter((f) => f.endsWith('.html'))

  for (const file of htmlFiles) {
    const content = fs.readFileSync(path.join(DEST, file), 'utf8')
    statusMap[file] = analyzeHtml(file, content)
  }

  const pending = Object.entries(statusMap).filter(([, v]) => v.status === 'pending')
  const ok = Object.entries(statusMap).filter(([, v]) => v.status === 'ok')

  console.log(`分析完成: ${ok.length} 可用, ${pending.length} 待修复`)

  const statusModule = `/** 自动生成 — scripts/migrate-html-examples.mjs */\nexport const EXAMPLE_STATUS = ${JSON.stringify(statusMap, null, 2)}\n\nexport function getExampleStatus(htmlFileName) {\n  return EXAMPLE_STATUS[htmlFileName] || { status: 'ok', tags: [], reason: '' }\n}\n`
  fs.writeFileSync(
    path.resolve(ROOT, 'src/config/exampleStatus.js'),
    statusModule
  )

  const vueOnlySection = {
    subMenu: 'Vue 组件示例',
    menuItem: [
      {
        menuItemName: '材质 Material',
        pages: [
          {
            name: '内置线材质',
            image: '/examples/development.png',
            type: 'vue',
            url: '/Material/OwnlineMaterial'
          },
          {
            name: '自定义线材质',
            image: '/examples/development.png',
            type: 'vue',
            url: '/Material/CustomlineMaterial'
          },
          {
            name: '内置面材质',
            image: '/examples/development.png',
            type: 'vue',
            url: '/Material/OwnPolygonMaterial'
          },
          {
            name: '自定义面材质',
            image: '/examples/development.png',
            type: 'vue',
            url: '/Material/CustomPolygonMaterial'
          }
        ]
      },
      {
        menuItemName: '图层',
        pages: [
          {
            name: '百度地图 (Vue)',
            image: '/examples/baiduMap.png',
            type: 'vue',
            url: '/baiduLayer'
          }
        ]
      },
      {
        menuItemName: 'Entity 绘制',
        pages: [
          {
            name: 'entity点',
            image: '/examples/entityPoint.png',
            type: 'vue',
            url: '/entityData/point'
          },
          {
            name: 'entity线',
            image: '/examples/entityPolyline.png',
            type: 'vue',
            url: '/entityData/line'
          },
          {
            name: 'entity面',
            image: '/examples/entityPolygon.png',
            type: 'vue',
            url: '/entityData/rectangle'
          }
        ]
      }
    ]
  }

  const htmlMenu = buildConfigFromGlobe(statusMap)
  const fullMenu = [...htmlMenu, vueOnlySection]

  const configContent = `/** 示例菜单 — HTML 示例由 scripts/migrate-html-examples.mjs 同步 */\nconst menu = ${JSON.stringify(fullMenu, null, 2)}\n\nexport default menu\n`

  fs.writeFileSync(path.resolve(ROOT, 'src/config/config.js'), configContent)

  console.log('已写入 src/config/config.js 与 src/config/exampleStatus.js')
}

main()
