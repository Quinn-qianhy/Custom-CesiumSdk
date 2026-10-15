/**
 * 为 HTML 示例注入 lil-gui，并清理地图内 #toolbar
 * 用法: node scripts/migrate-example-gui.mjs
 */
import fs from 'fs'
import path from 'path'
import { fileURLToPath } from 'url'

const __dirname = path.dirname(fileURLToPath(import.meta.url))
const EXAMPLES_DIR = path.resolve(__dirname, '../public/examples/cesium/html')

const LIL_GUI_CSS =
  '<link href="/vendor/lil-gui/lil-gui.min.css" rel="stylesheet" />'
const LIL_GUI_JS = '<script src="/vendor/lil-gui/lil-gui.umd.min.js"></script>'

const SANDCASTLE_SCRIPT_RE =
  /\s*<script\s+src="\/examples\/Sandcastle-header\.js"><\/script>\s*/gi
const BUCKET_CSS_RE =
  /<link\s+href="\/examples\/bucket\.css"\s+rel="stylesheet"\s*\/?>/gi
const EMPTY_TOOLBAR_RE = /\s*<div\s+id="toolbar"><\/div>\s*/gi
const TOOLBAR_STYLE_BLOCK_RE =
  /\s*#toolbar\s*\{[^}]*\}\s*/g
const TOOLBAR_INPUT_STYLE_RE =
  /\s*#toolbar\s+input\s*\{[^}]*\}\s*/g

function usesExampleGui(content) {
  return /ExampleGui\.|Sandcastle\./.test(content) || /example-gui\.js/.test(content)
}

function injectLilGui(content) {
  if (!usesExampleGui(content)) {
    return content
  }

  let next = content

  if (!next.includes('/vendor/lil-gui/lil-gui.min.css')) {
    next = next.replace(
      /(<link\s+href="\/examples\/example-gui\.css"\s+rel="stylesheet"\s*\/?>)/i,
      `${LIL_GUI_CSS}\n    $1`
    )
  }

  if (!next.includes('/vendor/lil-gui/lil-gui.umd.min.js')) {
    next = next.replace(
      /(<script\s+src="\/examples\/example-gui\.js"><\/script>)/i,
      `${LIL_GUI_JS}\n    $1`
    )
  }

  return next
}

function migrateHtml(content) {
  const needsGui = usesExampleGui(content)

  let next = content.replace(
    BUCKET_CSS_RE,
    '<link href="/examples/shared/example-gui.css" rel="stylesheet" />'
  )

  if (needsGui) {
    next = next.replace(
      SANDCASTLE_SCRIPT_RE,
      '\n    <script src="/examples/shared/example-gui.js"></script>\n'
    )
    next = next.replace(/Sandcastle\./g, 'ExampleGui.')
    next = injectLilGui(next)
    next = next.replace(EMPTY_TOOLBAR_RE, '\n')
    next = next.replace(TOOLBAR_STYLE_BLOCK_RE, '\n')
    next = next.replace(TOOLBAR_INPUT_STYLE_RE, '\n')
  } else {
    next = next.replace(SANDCASTLE_SCRIPT_RE, '\n')
    next = next.replace(EMPTY_TOOLBAR_RE, '\n')
  }

  return next
}

function main() {
  const files = fs.readdirSync(EXAMPLES_DIR).filter((f) => f.endsWith('.html'))
  let updated = 0

  for (const file of files) {
    const filePath = path.join(EXAMPLES_DIR, file)
    const original = fs.readFileSync(filePath, 'utf8')
    const migrated = migrateHtml(original)

    if (migrated !== original) {
      fs.writeFileSync(filePath, migrated, 'utf8')
      updated += 1
    }
  }

  console.log(`已更新 ${updated} 个 HTML 示例`)
}

main()
