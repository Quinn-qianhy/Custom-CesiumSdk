/**
 * 批量将 HTML 示例中的旧版 Viewer 选项迁移到当前 Cesium API
 * imageryProvider -> baseLayer + fromProviderAsync
 * terrainProvider / createWorldTerrain -> terrain + Terrain
 */
import fs from 'node:fs'
import path from 'node:path'
import { fileURLToPath } from 'node:url'

const __dirname = path.dirname(fileURLToPath(import.meta.url))
const examplesDir = path.join(__dirname, '../public/examples/cesium/cards')

function findBalancedParenEnd(text, openIndex) {
  let depth = 0
  for (let i = openIndex; i < text.length; i++) {
    const ch = text[i]
    if (ch === '(') depth++
    else if (ch === ')') {
      depth--
      if (depth === 0) return i
    }
  }
  return -1
}

function extractConstructorCall(text, startIndex) {
  const newIdx = text.indexOf('new ', startIndex)
  if (newIdx === -1 || newIdx > startIndex + 5) return null

  const openParen = text.indexOf('(', newIdx)
  if (openParen === -1) return null

  const closeParen = findBalancedParenEnd(text, openParen)
  if (closeParen === -1) return null

  return {
    expr: text.slice(newIdx, closeParen + 1),
    end: closeParen + 1,
  }
}

function hasBaseLayerPicker(optionsBlock) {
  return /\bbaseLayerPicker\s*:/.test(optionsBlock)
}

function migrateImageryProvider(content) {
  const key = 'imageryProvider'
  let result = content
  let searchFrom = 0
  let changed = false

  while (true) {
    const idx = result.indexOf(key, searchFrom)
    if (idx === -1) break

    const colonIdx = result.indexOf(':', idx)
    if (colonIdx === -1) break

    let valueStart = colonIdx + 1
    while (valueStart < result.length && /\s/.test(result[valueStart])) valueStart++

    const ctor = extractConstructorCall(result, valueStart)
    if (!ctor) {
      searchFrom = idx + key.length
      continue
    }

    const optionsStart = result.lastIndexOf('{', idx)
    const optionsEnd = result.indexOf('}', ctor.end)
    const optionsBlock = optionsStart !== -1 && optionsEnd !== -1 ? result.slice(optionsStart, optionsEnd) : ''

    const prefix = hasBaseLayerPicker(optionsBlock) ? '' : 'baseLayerPicker: false,\n        '
    const replacement = `${prefix}baseLayer: Cesium.ImageryLayer.fromProviderAsync(\n          ${ctor.expr}\n        )`

    result = result.slice(0, idx) + replacement + result.slice(ctor.end)
    changed = true
    searchFrom = idx + replacement.length
  }

  return { content: result, changed }
}

function migrateCreateWorldTerrain(content) {
  const patterns = [
    [/terrainProvider\s*:\s*Cesium\.createWorldTerrain\(\s*\)/g, 'terrain: new Cesium.Terrain(Cesium.CesiumTerrainProvider.fromIonAssetId(1))'],
    [/\/\/\s*terrainProvider\s*:\s*Cesium\.createWorldTerrain\(\s*\)/g, '// terrain: new Cesium.Terrain(Cesium.CesiumTerrainProvider.fromIonAssetId(1))'],
  ]

  let result = content
  let changed = false
  for (const [re, repl] of patterns) {
    if (re.test(result)) {
      result = result.replace(re, repl)
      changed = true
    }
  }
  return { content: result, changed }
}

function migrateTerrainProviderConstructor(content) {
  const key = 'terrainProvider'
  let result = content
  let searchFrom = 0
  let changed = false

  while (true) {
    const idx = result.indexOf(key, searchFrom)
    if (idx === -1) break

    const colonIdx = result.indexOf(':', idx)
    if (colonIdx === -1) break

    let valueStart = colonIdx + 1
    while (valueStart < result.length && /\s/.test(result[valueStart])) valueStart++

    const ctor = extractConstructorCall(result, valueStart)
    if (!ctor) {
      searchFrom = idx + key.length
      continue
    }

    let replacement
    if (ctor.expr.startsWith('new Cesium.CesiumTerrainProvider')) {
      const urlMatch = ctor.expr.match(/url\s*:\s*(['"`])(.*?)\1/)
      if (urlMatch) {
        const url = urlMatch[2]
        const inner = ctor.expr.slice(ctor.expr.indexOf('{') + 1, ctor.expr.lastIndexOf('}'))
        const otherOpts = inner
          .replace(/url\s*:\s*(['"`]).*?\1\s*,?/g, '')
          .replace(/^\s*,\s*|\s*,\s*$/g, '')
          .trim()
        const optsPart = otherOpts ? `, { ${otherOpts} }` : ''
        replacement = `terrain: new Cesium.Terrain(\n          Cesium.CesiumTerrainProvider.fromUrl("${url}"${optsPart})\n        )`
      } else {
        replacement = `terrain: new Cesium.Terrain(\n          ${ctor.expr}\n        )`
      }
    } else {
      replacement = `terrain: new Cesium.Terrain(\n          ${ctor.expr}\n        )`
    }

    result = result.slice(0, idx) + replacement + result.slice(ctor.end)
    changed = true
    searchFrom = idx + replacement.length
  }

  return { content: result, changed }
}

function migrateFile(filePath) {
  let content = fs.readFileSync(filePath, 'utf8')
  const original = content

  const steps = [migrateImageryProvider, migrateCreateWorldTerrain, migrateTerrainProviderConstructor]
  for (const step of steps) {
    const out = step(content)
    content = out.content
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
    const stat = fs.statSync(full)
    if (stat.isDirectory()) {
      changed.push(...walk(full))
    } else if (name.endsWith('.html') || name.endsWith('.js')) {
      if (migrateFile(full)) changed.push(path.relative(examplesDir, full))
    }
  }
  return changed
}

const changedFiles = walk(examplesDir)
console.log(`Migrated ${changedFiles.length} file(s):`)
for (const f of changedFiles) console.log(`  - ${f}`)
