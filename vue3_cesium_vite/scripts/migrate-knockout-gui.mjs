/**
 * 将 Cesium knockout #toolbar 迁移到 ExampleGui + lil-gui
 * 保留 subscribe 回调逻辑，ExampleGui 只负责更新 viewModel
 * 用法: node scripts/migrate-knockout-gui.mjs
 */
import fs from 'fs'
import path from 'path'
import { fileURLToPath } from 'url'

const __dirname = path.dirname(fileURLToPath(import.meta.url))
const EXAMPLES_DIR = path.resolve(__dirname, '../public/examples')

const LIL_GUI_CSS =
  '<link href="/vendor/lil-gui/lil-gui.min.css" rel="stylesheet" />'
const LIL_GUI_JS = '<script src="/vendor/lil-gui/lil-gui.umd.min.js"></script>'
const EXAMPLE_GUI_JS = '<script src="/examples/example-gui.js"></script>'

const TOOLBAR_STYLE_RE = /\s*#toolbar[^{]*\{[^}]*\}\s*/g
const TOOLBAR_INPUT_STYLE_RE = /\s*#toolbar\s+input[^{]*\{[^}]*\}\s*/g

const SCENE_FIX_FROM =
  /viewer\.scene\.imageryLayers\.get\(0\)\.alpha\s*=\s*0\s*\n\s*viewer\.scene\.globe\.baseColor\s*=\s*Cesium\.Color\.DARKOLIVEGREEN/g

const SCENE_FIX_TO = `viewer.scene.globe.baseColor = Cesium.Color.DARKOLIVEGREEN
    if (viewer.scene.imageryLayers.length > 0) {
      viewer.scene.imageryLayers.get(0).alpha = 0.35
    }`

const TILESET_FIX_RE =
  /var tileset = new Cesium\.Cesium3DTileset\(\{\s*\n\s*url: Cesium\.IonResource\.fromAssetId\((\d+)\),\s*\n\s*\}\);\s*\n\s*tileset\.readyPromise\s*\n\s*\.then\(function\s*\(\s*tileset\s*\)\s*\{\s*\n\s*viewer\.scene\.primitives\.add\(tileset\);\s*\n\s*\}\)/g

const SLIDER_HINTS = {
  speed: { label: '速度', min: 1, max: 50, step: 1 },
  length: { label: '高度', min: 100, max: 600, step: 10 },
  topRadius: { label: '底面半径', min: 100, max: 300, step: 10 },
  gradient: { label: '渐变曲率', min: 0.1, max: 1, step: 0.1 },
  count: { label: '波浪数量', min: 1, max: 10, step: 1 },
  duration: { label: '持续时间', min: 500, max: 5000, step: 500 },
  intensityScale: { label: '强度', min: 0.1, max: 3, step: 0.1 },
  exaggeration: { label: '地形夸张', min: 1, max: 10, step: 0.5 },
  distance: { label: '距离', min: 0, max: 500, step: 1 },
  height: { label: '高度', min: -100, max: 100, step: 1 },
  brightness: { label: '亮度', min: 0, max: 3, step: 0.01 },
  contrast: { label: '对比度', min: 0, max: 3, step: 0.01 },
  hue: { label: '色调', min: 0, max: 1, step: 0.01 },
  saturation: { label: '饱和度', min: 0, max: 3, step: 0.01 },
  gamma: { label: '伽马', min: 0, max: 3, step: 0.01 },
  frequency: { label: '频率', min: 10, max: 100000, step: 10 },
  amplitude: { label: '振幅', min: 5, max: 200, step: 10 },
  animationSpeed: { label: '水流速度', min: -10, max: 10, step: 0.001 },
  alpha: { label: '透明度', min: 0, max: 1, step: 0.01 },
  x: { label: 'R', min: 0, max: 1, step: 0.01 },
  y: { label: 'G', min: 0, max: 1, step: 0.01 },
  z: { label: 'B', min: 0, max: 1, step: 0.01 },
  horizontalAngle: { label: '水平夹角', min: 1, max: 180, step: 1 },
  verticalAngle: { label: '垂直夹角', min: 1, max: 180, step: 1 },
  band1Position: { label: '色带1位置', min: 0, max: 10000, step: 100 },
  band2Position: { label: '色带2位置', min: 0, max: 10000, step: 100 },
  band3Position: { label: '色带3位置', min: 0, max: 10000, step: 100 },
  bandThickness: { label: '色带厚度', min: 10, max: 1000, step: 10 },
  bandTransparency: { label: '色带透明度', min: 0, max: 1, step: 0.01 },
  backgroundTransparency: { label: '背景透明度', min: 0, max: 1, step: 0.01 }
}

function injectGuiAssets(content) {
  let next = content

  if (!next.includes('/vendor/lil-gui/lil-gui.umd.min.js')) {
    next = next.replace(
      /(<script\s+src="\/cesium\/Cesium\.js"><\/script>)/i,
      `${LIL_GUI_JS}\n    ${EXAMPLE_GUI_JS}\n$1`
    )
  } else if (!next.includes('/examples/example-gui.js')) {
    next = next.replace(
      /(<script\s+src="\/vendor\/lil-gui\/lil-gui\.umd\.min\.js"><\/script>)/i,
      `$1\n    ${EXAMPLE_GUI_JS}`
    )
  }

  if (!next.includes('/vendor/lil-gui/lil-gui.min.css')) {
    if (next.includes('/examples/example-gui.css')) {
      next = next.replace(
        /(<link\s+href="\/examples\/example-gui\.css"\s+rel="stylesheet"\s*\/?>)/i,
        `${LIL_GUI_CSS}\n  $1`
      )
    } else {
      next = next.replace(
        /(<link\s+href="\/cesium\/Widgets\/widgets\.css"\s+rel="stylesheet"\s*\/?>)/i,
        `$1\n  ${LIL_GUI_CSS}\n  <link href="/examples/example-gui.css" rel="stylesheet" />`
      )
    }
  } else if (!next.includes('/examples/example-gui.css')) {
    next = next.replace(
      /(<link\s+href="\/vendor\/lil-gui\/lil-gui\.min\.css"\s+rel="stylesheet"\s*\/?>)/i,
      `$1\n  <link href="/examples/example-gui.css" rel="stylesheet" />`
    )
  }

  return next
}

function extractToolbarHtml(content) {
  const startMatch = content.match(/<div\s+id="toolbar"[^>]*>/i)
  if (!startMatch) {
    return null
  }

  const start = startMatch.index
  let depth = 0
  let i = start

  while (i < content.length) {
    const open = content.slice(i).match(/^<div[\s>]/i)
    const close = content.slice(i).match(/^<\/div>/i)

    if (open) {
      depth += 1
      i += open[0].length
      continue
    }
    if (close) {
      depth -= 1
      i += close[0].length
      if (depth === 0) {
        return content.slice(start, i)
      }
      continue
    }
    i += 1
  }

  return null
}

function parseToolbarControls(toolbarHtml) {
  const controls = []
  const rangeRe = /<input[^>]*type="range"[^>]*>/gi
  let rangeMatch

  while ((rangeMatch = rangeRe.exec(toolbarHtml))) {
    const inputTag = rangeMatch[0]
    const bindMatch = inputTag.match(/data-bind="([^"]+)"/i)
    if (!bindMatch) {
      continue
    }

    const keyMatch = bindMatch[1].match(/(?:checked|value):\s*(\w+)/)
    if (!keyMatch) {
      continue
    }

    const key = keyMatch[1]
    const before = toolbarHtml.slice(0, rangeMatch.index)
    const divLabel = before.match(/<div[^>]*>([^<]+)<\/div>\s*$/i)
    const tdLabel = before.match(/<td[^>]*>([^<]+)<\/td>\s*$/i)
    const label = (divLabel?.[1] ?? tdLabel?.[1] ?? key).trim()

    controls.push({
      label,
      key,
      type: 'range',
      min: (inputTag.match(/min="([^"]+)"/i) ?? [])[1] ?? '0',
      max: (inputTag.match(/max="([^"]+)"/i) ?? [])[1] ?? '100',
      step: (inputTag.match(/step="([^"]+)"/i) ?? [])[1] ?? '1'
    })
  }

  const checkboxRe = /<input[^>]*type="checkbox"[^>]*>/gi
  let checkboxMatch
  while ((checkboxMatch = checkboxRe.exec(toolbarHtml))) {
    const inputTag = checkboxMatch[0]
    const bindMatch = inputTag.match(/data-bind="([^"]+)"/i)
    if (!bindMatch) {
      continue
    }
    const keyMatch = bindMatch[1].match(/checked:\s*(\w+)/)
    if (!keyMatch) {
      continue
    }
    const key = keyMatch[1]
    const before = toolbarHtml.slice(0, checkboxMatch.index)
    const divLabel = before.match(/<div[^>]*>([^<]+)<\/div>\s*$/i)
    const tdLabel = before.match(/<td[^>]*>([^<]+)<\/td>\s*$/i)
    const label = (divLabel?.[1] ?? tdLabel?.[1] ?? key).trim()
    controls.push({ label, key, type: 'checkbox' })
  }

  return controls
}

function parseViewModelDefaults(script) {
  const match = script.match(/(?:const|var)\s+viewModel\s*=\s*\{([\s\S]*?)\}\s*;?/)
  if (!match) {
    return {}
  }

  const defaults = {}
  const entryRe = /(\w+)\s*:\s*([^,\n}]+)/g
  let entry
  while ((entry = entryRe.exec(match[1]))) {
    defaults[entry[1]] = entry[2].trim()
  }
  return defaults
}

function parseObservableKeys(script) {
  const keys = new Set()
  const re = /getObservable\(viewModel,\s*['"](\w+)['"]\)/g
  let m
  while ((m = re.exec(script))) {
    keys.add(m[1])
  }
  return [...keys]
}

function inferControlsFromViewModel(defaults, observableKeys, toolbarControls) {
  if (toolbarControls.length) {
    return toolbarControls
  }

  const keys = observableKeys.length ? observableKeys : Object.keys(defaults)
  return keys
    .filter((key) => key !== 'selectedShading' && key !== 'currentExampleType')
    .map((key) => {
      const hint = SLIDER_HINTS[key] ?? { label: key, min: 0, max: 100, step: 1 }
      return {
        label: hint.label,
        key,
        type: typeof defaults[key] === 'boolean' || defaults[key] === 'false' || defaults[key] === 'true'
          ? 'checkbox'
          : 'range',
        min: String(hint.min),
        max: String(hint.max),
        step: String(hint.step)
      }
    })
}

function buildGuiCode(controls, defaults) {
  if (!controls.length) {
    return ''
  }

  const lines = ['', '    // ExampleGui 参数面板']
  for (const control of controls) {
    if (control.type === 'checkbox') {
      const defaultValue = defaults[control.key] ?? 'false'
      lines.push(
        `    ExampleGui.addToggleButton('${control.label}', ${defaultValue}, function(checked) {`,
        `      viewModel.${control.key} = checked;`,
        `    });`
      )
    } else {
      lines.push(
        `    ExampleGui.addSlider('${control.label}', viewModel.${control.key}, ${control.min}, ${control.max}, ${control.step}, function(value) {`,
        `      viewModel.${control.key} = value;`,
        `    });`
      )
    }
  }
  lines.push('    ExampleGui.finishedLoading();')
  return lines.join('\n')
}

function buildMenuForShading() {
  return [
    '',
    '    // ExampleGui 参数面板',
    '    ExampleGui.addMenu([',
    "      { text: '坡度', onselect: function() { viewModel.selectedShading = 'slope'; updateMaterial(); } },",
    "      { text: '坡向', onselect: function() { viewModel.selectedShading = 'aspect'; updateMaterial(); } },",
    '    ]);',
    '    ExampleGui.finishedLoading();'
  ].join('\n')
}

function removeToolbarBindingLines(script) {
  return script
    .replace(/\s*(?:const|var)\s+toolbar\s*=\s*document\.getElementById\(["']toolbar["']\)\s*;?\s*/g, '\n')
    .replace(/\s*Cesium\.knockout\.applyBindings\(viewModel,\s*toolbar\)\s*;?\s*/g, '\n')
}

function insertGuiAfterKnockoutTrack(script, guiCode) {
  if (!guiCode || script.includes('ExampleGui.finishedLoading()')) {
    return script
  }

  const trackMatch = script.match(/Cesium\.knockout\.track\(viewModel\)\s*;?/)
  if (!trackMatch) {
    return script
  }

  const insertAt = trackMatch.index + trackMatch[0].length
  return `${script.slice(0, insertAt)}${guiCode}${script.slice(insertAt)}`
}

function migrateKnockout(content) {
  if (!content.includes('Cesium.knockout')) {
    return { content, changed: false }
  }

  const toolbarHtml = extractToolbarHtml(content)
  const scriptBlocks = content.match(/<script[^>]*>[\s\S]*?<\/script>/gi) ?? []
  const mainScript = scriptBlocks.find((block) => block.includes('Cesium.knockout')) ?? ''
  const scriptBody = mainScript.replace(/<\/?script[^>]*>/gi, '')

  const defaults = parseViewModelDefaults(scriptBody)
  const observableKeys = parseObservableKeys(scriptBody)
  const toolbarControls = toolbarHtml ? parseToolbarControls(toolbarHtml) : []

  let guiCode = ''
  if (defaults.selectedShading !== undefined && toolbarControls.length === 0) {
    guiCode = buildMenuForShading()
  } else {
    const controls = inferControlsFromViewModel(defaults, observableKeys, toolbarControls)
    guiCode = buildGuiCode(controls, defaults)
  }

  if (!guiCode) {
    return { content, changed: false }
  }

  let next = content
  next = injectGuiAssets(next)

  if (toolbarHtml) {
    next = next.replace(toolbarHtml, '\n')
  }
  next = next.replace(TOOLBAR_STYLE_RE, '\n')
  next = next.replace(TOOLBAR_INPUT_STYLE_RE, '\n')

  const scriptStart = next.indexOf(scriptBody)
  if (scriptStart === -1) {
    return { content, changed: false }
  }

  let updatedScript = removeToolbarBindingLines(scriptBody)
  updatedScript = insertGuiAfterKnockoutTrack(updatedScript, guiCode)
  next = next.replace(scriptBody, updatedScript)

  next = next.replace(SCENE_FIX_FROM, SCENE_FIX_TO)
  next = next.replace(TILESET_FIX_RE, (_, assetId) =>
    `var tileset = viewer.scene.primitives.add(new Cesium.Cesium3DTileset({
      url: Cesium.IonResource.fromAssetId(${assetId}),
    }));`
  )

  return { content: next, changed: next !== content }
}

function migrateFile(filePath) {
  const original = fs.readFileSync(filePath, 'utf8')
  const { content, changed } = migrateKnockout(original)
  if (changed) {
    fs.writeFileSync(filePath, content, 'utf8')
  }
  return changed
}

function main() {
  const files = fs.readdirSync(EXAMPLES_DIR).filter((f) => f.endsWith('.html'))
  let updated = 0

  for (const file of files) {
    if (migrateFile(path.join(EXAMPLES_DIR, file))) {
      updated += 1
      console.log(`  ✓ ${file}`)
    }
  }

  console.log(`\n已迁移 ${updated} 个 knockout 工具栏示例`)
}

main()
