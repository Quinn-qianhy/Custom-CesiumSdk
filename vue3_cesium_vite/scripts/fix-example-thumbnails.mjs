/**
 * 修复示例缩略图路径：统一指向 public/examples
 * 用法: node scripts/fix-example-thumbnails.mjs
 */
import fs from 'fs'
import path from 'path'
import { fileURLToPath } from 'url'

const __dirname = path.dirname(fileURLToPath(import.meta.url))
const ROOT = path.resolve(__dirname, '..')
const THUMBNAIL_DIR = path.resolve(ROOT, 'public/examples/cesium/cards')
const THUMBNAIL_PREFIX = '/examples'
const GLOBE_CONFIG = path.resolve(ROOT, '../globe-for-webgl/src/pages/Examples/config.js')
const VUE_CONFIG = path.resolve(ROOT, 'src/config/config.js')

/** html 文件名 -> 缩略图文件名（与 globe config 一致但易漏匹配） */
const HTML_TO_IMAGE_ALIASES = {
  'viewer.html': 'viewer.png',
  'backGroundMap.html': 'backgroundPicture.png',
  'mapRotation.html': 'skyboxPicture.png',
  'text.html': 'development.png',
  'coordinateDisplay.html': 'PickLocation.png',
  'pointPrimitive.html': 'pointsPrimitive.png',
  'Path Track Line.html': 'Path Track Line.gif',
  'Water Surface Geojson.html': 'Water Surface Geojson.gif',
  'baiduMap.html': 'baiduMapOffset.png',
  'rotationMap.html': 'openAnimation.gif',
  'rotationPoint.html': 'RouteFlyManager.gif'
}

function parseGlobeConfig(filePath) {
  const raw = fs.readFileSync(filePath, 'utf8')
  const match = raw.match(/const menu\s*=\s*(\[[\s\S]*\])\s*\n\s*export default menu/)
  if (!match) throw new Error('无法解析 globe config')
  return eval(match[1])
}

function buildGlobeImageMap(globeMenu) {
  const map = new Map()
  for (const section of globeMenu) {
    for (const group of section.menuItem || []) {
      for (const page of group.pages || []) {
        const htmlName = path.basename(page.url)
        const imageName = path.basename(page.image)
        map.set(htmlName, imageName)
        map.set(page.name, imageName)
      }
    }
  }
  return map
}

function normalizeName(value) {
  return value.toLowerCase().replace(/[\s_\-()（）]/g, '')
}

function findImageFile(imageName) {
  if (!imageName) return null

  const pubPath = path.join(THUMBNAIL_DIR, imageName)
  if (fs.existsSync(pubPath)) {
    return `${THUMBNAIL_PREFIX}/${imageName}`
  }

  return null
}

function resolveImageForPage(page, globeImageMap, pubFiles) {
  const htmlName = page.url ? path.basename(page.url) : ''
  const candidates = new Set()

  if (globeImageMap.has(htmlName)) {
    candidates.add(globeImageMap.get(htmlName))
  }
  if (globeImageMap.has(page.name)) {
    candidates.add(globeImageMap.get(page.name))
  }
  if (HTML_TO_IMAGE_ALIASES[htmlName]) {
    candidates.add(HTML_TO_IMAGE_ALIASES[htmlName])
  }
  if (page.image) {
    candidates.add(path.basename(page.image))
  }

  const htmlBase = htmlName.replace(/\.html$/i, '')
  candidates.add(`${htmlBase}.png`)
  candidates.add(`${htmlBase}.gif`)
  candidates.add(`${htmlBase}.jpg`)
  candidates.add(`${htmlBase}.jpeg`)
  candidates.add(`${htmlBase}.webp`)

  for (const name of candidates) {
    const found = findImageFile(name)
    if (found) return found
  }

  const normHtml = normalizeName(htmlBase)
  const fuzzy = pubFiles.find((file) => {
    const base = path.parse(file).name
    const normFile = normalizeName(base)
    return (
      normFile === normHtml ||
      normFile.includes(normHtml) ||
      normHtml.includes(normFile)
    )
  })

  if (fuzzy) {
    return `${THUMBNAIL_PREFIX}/${fuzzy}`
  }

  return `${THUMBNAIL_PREFIX}/development.png`
}

function loadVueConfig() {
  const raw = fs.readFileSync(VUE_CONFIG, 'utf8')
  const match = raw.match(/const menu = (\[[\s\S]*\])\s*\n\s*export default menu/)
  if (!match) throw new Error('无法解析 vue config')
  return eval(match[1])
}

function main() {
  const globeMenu = parseGlobeConfig(GLOBE_CONFIG)
  const globeImageMap = buildGlobeImageMap(globeMenu)
  const menu = loadVueConfig()

  const pubFiles = fs.existsSync(THUMBNAIL_DIR)
    ? fs.readdirSync(THUMBNAIL_DIR).filter((f) => /\.(png|gif|jpe?g|webp)$/i.test(f))
    : []

  let fixed = 0
  let stillFallback = 0
  const missing = []

  for (const section of menu) {
    for (const group of section.menuItem || []) {
      for (const page of group.pages || []) {
        const before = page.image
        const resolved = resolveImageForPage(page, globeImageMap, pubFiles)
        page.image = resolved

        if (resolved !== before) fixed += 1
        if (resolved.endsWith('development.png')) {
          stillFallback += 1
          missing.push({ name: page.name, url: page.url })
        }
      }
    }
  }

  const header = '/** 示例菜单 — 缩略图统一放在 public/examples，路径 /examples/xxx */\n'
  fs.writeFileSync(VUE_CONFIG, `${header}const menu = ${JSON.stringify(menu, null, 2)}\n\nexport default menu\n`)

  console.log(`缩略图路径统一完成: 更新 ${fixed} 项, 仍使用占位图 ${stillFallback} 项`)
  if (missing.length) {
    console.log('仍缺缩略图:')
    missing.forEach((item) => console.log(`  - ${item.name} (${item.url})`))
  }
}

main()
