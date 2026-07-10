/**
 * 替换示例中的内网资源地址为可公开访问的 Ion / 本地数据
 */
import fs from 'node:fs'
import path from 'node:path'
import { fileURLToPath } from 'node:url'

const __dirname = path.dirname(fileURLToPath(import.meta.url))
const examplesDir = path.join(__dirname, '../public/examples/cesium/cards')

const replacements = [
  [
    /['"]http:\/\/172\.20\.16\.213:8888\/3dtiles\/chengdu_building\/tileset\.json['"]/g,
    'Cesium.IonResource.fromAssetId(75343)',
  ],
  [
    /['"]http:\/\/172\.20\.16\.213:8888\/geojson\/sichuan_region\.json['"]/g,
    "'/data/geojson/' + encodeURIComponent('中国(省级).geojson')",
  ],
  [
    /['"]http:\/\/172\.20\.16\.213:8888\/geojson\/chengdu_road\.geojson['"]/g,
    "'/data/geojson/' + encodeURIComponent('四川国道线_裁剪.geojson')",
  ],
  [
    /['"]http:\/\/172\.20\.16\.213:8888\/geojson\/bazhong_region\.geojson['"]/g,
    "'/data/geojson/siChuanPolygon.json'",
  ],
  [
    /['"]http:\/\/172\.20\.16\.213:8888\/geojson\/huangpujiang\.json['"]/g,
    "'/data/geojson/' + encodeURIComponent('四川国道线_裁剪.geojson')",
  ],
  [/\.otherwise\(/g, '.catch('],
]

function patchFile(filePath) {
  let content = fs.readFileSync(filePath, 'utf8')
  const original = content
  for (const [pattern, replacement] of replacements) {
    content = content.replace(pattern, replacement)
  }
  if (content !== original) {
    fs.writeFileSync(filePath, content, 'utf8')
    return true
  }
  return false
}

function walk(dir) {
  const changed = []
  for (const name of fs.readdirSync(dir)) {
    const full = path.join(dir, name)
    if (fs.statSync(full).isDirectory()) {
      changed.push(...walk(full))
    } else if (name.endsWith('.html') || name.endsWith('.js')) {
      if (patchFile(full)) changed.push(path.relative(examplesDir, full))
    }
  }
  return changed
}

const changed = walk(examplesDir)
console.log(`Patched ${changed.length} file(s):`)
for (const f of changed) console.log(`  - ${f}`)
