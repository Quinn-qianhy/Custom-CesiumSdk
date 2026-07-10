/**
 * 将 public/examples 按引擎重组目录
 * 用法: node scripts/organize-examples-by-engine.mjs
 */
import fs from 'fs'
import path from 'path'
import { fileURLToPath } from 'url'

const __dirname = path.dirname(fileURLToPath(import.meta.url))
const ROOT = path.resolve(__dirname, '..')
const EXAMPLES = path.resolve(ROOT, 'public/examples/cesium/cards')

const IMAGE_EXT = /\.(png|gif|jpe?g|webp|svg)$/i
const HTML_EXT = /\.html$/i

const CESIUM_ASSET_DIRS = [
  'backgroundPicture',
  'clusterPicture',
  'material',
  'sampleData',
  'singlePicture',
  'SkyBox',
  'terrainClip'
]

const OL_HTML_PREFIX = 'ol'
const OL_CARD_SOURCES = {
  olBasicMap: 'baiduMap.png',
  olVectorLayer: 'chinaExaggeration.png',
  olDrawFeatures: 'drawGeometry.png',
  olPopup: 'POIsearch.png'
}

const PATH_REPLACEMENTS = [
  ['/examples/shared/example-gui.js', '/examples/shared/example-gui.js'],
  ['/examples/shared/example-gui.css', '/examples/shared/example-gui.css'],
  ['/examples/shared/pluginJs/', '/examples/shared/pluginJs/'],
  ['/examples/cesium/assets/sampleData/', '/examples/cesium/assets/sampleData/'],
  ['/examples/cesium/assets/material/', '/examples/cesium/assets/material/'],
  ['/examples/cesium/assets/backgroundPicture/', '/examples/cesium/assets/backgroundPicture/'],
  ['/examples/cesium/assets/clusterPicture/', '/examples/cesium/assets/clusterPicture/'],
  ['/examples/cesium/assets/singlePicture/', '/examples/cesium/assets/singlePicture/'],
  ['/examples/cesium/assets/SkyBox/', '/examples/cesium/assets/SkyBox/'],
  ['/examples/cesium/assets/terrainClip/', '/examples/cesium/assets/terrainClip/'],
  ['/examples/openlayers/ol/', '/examples/openlayers/ol/']
]

function ensureDir(dir) {
  fs.mkdirSync(dir, { recursive: true })
}

function moveFile(src, dest) {
  if (!fs.existsSync(src)) {
    return false
  }
  ensureDir(path.dirname(dest))
  fs.renameSync(src, dest)
  return true
}

function moveEntry(src, dest) {
  if (!fs.existsSync(src)) {
    return false
  }

  const stat = fs.statSync(src)
  if (stat.isDirectory()) {
    ensureDir(path.dirname(dest))
    fs.cpSync(src, dest, { recursive: true })
    fs.rmSync(src, { recursive: true, force: true })
    return true
  }

  return moveFile(src, dest)
}

function copyFile(src, dest) {
  if (!fs.existsSync(src)) {
    return false
  }
  ensureDir(path.dirname(dest))
  fs.copyFileSync(src, dest)
  return true
}

function listRootFiles(filterFn) {
  return fs.readdirSync(EXAMPLES).filter((name) => {
    const full = path.join(EXAMPLES, name)
    return fs.statSync(full).isFile() && filterFn(name)
  })
}

function createStructure() {
  const dirs = [
    'shared',
    'cesium/cards',
    'cesium/html',
    'cesium/assets',
    'openlayers/cards',
    'openlayers/html',
    'openlayers/ol'
  ]

  for (const dir of dirs) {
    ensureDir(path.join(EXAMPLES, dir))
  }
}

function moveSharedFiles() {
  for (const file of ['example-gui.js', 'example-gui.css']) {
    const src = path.join(EXAMPLES, file)
    const dest = path.join(EXAMPLES, 'shared', file)
    if (fs.existsSync(src)) {
      moveEntry(src, dest)
    }
  }

  const pluginSrc = path.join(EXAMPLES, 'pluginJs')
  if (fs.existsSync(pluginSrc)) {
    moveEntry(pluginSrc, path.join(EXAMPLES, 'shared', 'pluginJs'))
  }
}

function moveCesiumAssets() {
  for (const dir of CESIUM_ASSET_DIRS) {
    moveEntry(path.join(EXAMPLES, dir), path.join(EXAMPLES, 'cesium/assets', dir))
  }
}

function moveCardsAndHtml() {
  const rootImages = listRootFiles((name) => IMAGE_EXT.test(name))
  for (const file of rootImages) {
    moveFile(path.join(EXAMPLES, file), path.join(EXAMPLES, 'cesium/cards', file))
  }

  const rootHtml = listRootFiles((name) => HTML_EXT.test(name))
  for (const file of rootHtml) {
    const isOl = file.toLowerCase().startsWith(OL_HTML_PREFIX)
    const destDir = isOl ? 'openlayers/html' : 'cesium/html'
    moveFile(path.join(EXAMPLES, file), path.join(EXAMPLES, destDir, file))
  }
}

function moveOpenLayersModule() {
  moveEntry(path.join(EXAMPLES, 'ol'), path.join(EXAMPLES, 'openlayers/ol'))
}

function createOpenLayersCards() {
  // 缩略图由 scripts/capture-ol-card-screenshots.py 从实际 OL 示例页面截取，勿再从 Cesium 卡片复制
  if (process.env.FORCE_OL_CESIUM_CARD_COPY === '1') {
    for (const [name, source] of Object.entries(OL_CARD_SOURCES)) {
      const src = path.join(EXAMPLES, 'cesium/cards', source)
      const dest = path.join(EXAMPLES, 'openlayers/cards', `${name}.png`)
      copyFile(src, dest)
    }
  }
}

function replaceInFile(filePath, replacer) {
  if (!fs.existsSync(filePath)) {
    return 0
  }

  const original = fs.readFileSync(filePath, 'utf8')
  let next = original

  for (const [from, to] of PATH_REPLACEMENTS) {
    next = next.split(from).join(to)
  }

  next = replacer(next)

  if (next !== original) {
    fs.writeFileSync(filePath, next, 'utf8')
    return 1
  }

  return 0
}

function walkAndReplace(dir, replacer) {
  if (!fs.existsSync(dir)) {
    return 0
  }

  let count = 0
  for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
    const full = path.join(dir, entry.name)
    if (entry.isDirectory()) {
      count += walkAndReplace(full, replacer)
      continue
    }

    if (/\.(html|js|css|vue|ts|mjs)$/i.test(entry.name)) {
      count += replaceInFile(full, replacer)
    }
  }

  return count
}

function updateMenuImagePaths(content) {
  return content.replace(/(['"])\/examples\/(?!cesium\/|openlayers\/|shared\/)([^'"]+\.(?:png|gif|jpe?g|webp|svg))\1/g, "$1/examples/cesium/cards/$2$1")
}

function updateMenuHtmlPaths(content) {
  let next = content

  next = next.replace(
    /(['"])\/examples\/(ol[^'"]*\.html)\1/g,
    "$1/examples/openlayers/html/$2$1"
  )

  next = next.replace(
    /(['"])\/examples\/([^/'"]+\.html)\1/g,
    (match, quote, fileName) => {
      if (fileName.startsWith('ol')) {
        return match
      }
      return `${quote}/examples/cesium/html/${fileName}${quote}`
    }
  )

  return next
}

function updateOpenLayersMenuCards(content) {
  return content
    .replace(
      /image: '\/examples\/cesium\/cards\/baiduMap\.png'/,
      "image: '/examples/openlayers/cards/olBasicMap.png'"
    )
    .replace(
      /image: '\/examples\/cesium\/cards\/chinaExaggeration\.png'/,
      "image: '/examples/openlayers/cards/olVectorLayer.png'"
    )
    .replace(
      /image: '\/examples\/cesium\/cards\/drawGeometry\.png'/,
      "image: '/examples/openlayers/cards/olDrawFeatures.png'"
    )
    .replace(
      /image: '\/examples\/cesium\/cards\/POIsearch\.png'/,
      "image: '/examples/openlayers/cards/olPopup.png'"
    )
}

function main() {
  console.log('开始重组 public/examples ...')
  createStructure()
  moveSharedFiles()
  moveCesiumAssets()
  moveCardsAndHtml()
  moveOpenLayersModule()
  createOpenLayersCards()

  let updated = 0
  updated += walkAndReplace(path.join(EXAMPLES, 'cesium/html'), (c) => c)
  updated += walkAndReplace(path.join(EXAMPLES, 'openlayers/html'), (c) => c)
  updated += walkAndReplace(path.join(EXAMPLES, 'openlayers/ol'), (c) => c)
  updated += walkAndReplace(path.join(EXAMPLES, 'shared'), (c) => c)

  const configPath = path.join(ROOT, 'src/config/config.js')
  const olMenuPath = path.join(ROOT, 'src/config/olMenu.js')

  replaceInFile(configPath, (content) => updateMenuHtmlPaths(updateMenuImagePaths(content)))
  replaceInFile(olMenuPath, (content) =>
    updateOpenLayersMenuCards(updateMenuHtmlPaths(updateMenuImagePaths(content)))
  )

  updated += walkAndReplace(path.join(ROOT, 'scripts'), (content) => {
    let next = updateMenuImagePaths(content)
    next = next.replace(/public\/examples'/g, "public/examples/cesium/cards'")
    next = next.replace(/THUMBNAIL_DIR = path\.resolve\(ROOT, 'public\/examples'\)/g,
      "THUMBNAIL_DIR = path.resolve(ROOT, 'public/examples/cesium/cards')")
    return next
  })

  console.log(`文件引用更新: ${updated} 个`)
  console.log('目录结构:')
  console.log('  public/examples/shared/          — 公共 GUI 脚本')
  console.log('  public/examples/cesium/cards/    — Cesium 缩略图')
  console.log('  public/examples/cesium/html/     — Cesium HTML 示例')
  console.log('  public/examples/cesium/assets/   — Cesium 示例资源')
  console.log('  public/examples/openlayers/cards/ — OpenLayers 缩略图')
  console.log('  public/examples/openlayers/html/  — OpenLayers HTML 示例')
  console.log('  public/examples/openlayers/ol/    — OpenLayers 共用模块')
  console.log('完成。请同步更新 src/utils/exampleResolver.ts')
}

main()
