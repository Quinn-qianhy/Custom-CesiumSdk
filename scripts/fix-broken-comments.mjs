/**
 * 修复迁移脚本破坏的注释：把行首或行尾的单个 "/" 还原为 "//"。
 * 只处理字符串与注释之外、后面紧跟中文的 "/"，避免误伤 URL 路径与除法。
 * 默认 dry-run 仅打印，加 --write 才落盘。
 * 用法：node scripts/fix-broken-comments.mjs [--write] [--dir=public/examples/cesium/html]
 */
import fs from 'node:fs'
import path from 'node:path'
import process from 'node:process'

const args = process.argv.slice(2)
const write = args.includes('--write')
const dirArg = args.find((a) => a.startsWith('--dir='))
const targetDir = dirArg ? dirArg.slice('--dir='.length) : 'public/examples/cesium/html'

const HAN_AFTER = /^(\s*)(?=[\u4e00-\u9fa5])/

function fixLine(line) {
  let out = ''
  let quote = null

  for (let i = 0; i < line.length; i++) {
    const ch = line[i]
    const next = line[i + 1]

    if (quote) {
      out += ch
      if (ch === '\\') {
        out += next ?? ''
        i++
      } else if (ch === quote) {
        quote = null
      }
      continue
    }

    if (ch === '"' || ch === "'" || ch === '`') {
      quote = ch
      out += ch
      continue
    }

    // 已进入行注释，剩余原样保留
    if (ch === '/' && (next === '/' || next === '*')) {
      return out + line.slice(i)
    }

    if (ch === '/') {
      const m = line.slice(i + 1).match(HAN_AFTER)
      if (m) {
        out += '//' + m[1]
        i += m[1].length
        continue
      }
    }

    out += ch
  }

  return out
}

const files = fs.readdirSync(targetDir).filter((f) => f.toLowerCase().endsWith('.html'))

let totalHits = 0
let totalFiles = 0
const report = []

for (const file of files) {
  const full = path.join(targetDir, file)
  const src = fs.readFileSync(full, 'utf8')
  const eol = src.includes('\r\n') ? '\r\n' : '\n'
  let hits = 0

  const next = src.split(/\r?\n/).map((line, idx) => {
    const out = fixLine(line)
    if (out !== line) {
      hits++
      report.push(`${file}:${idx + 1}: ${line.trim()}`)
    }
    return out
  })

  if (hits > 0) {
    totalHits += hits
    totalFiles++
    if (write) fs.writeFileSync(full, next.join(eol), 'utf8')
  }
}

console.log(`${write ? '[write]' : '[dry-run]'} 文件 ${totalFiles} 个，命中 ${totalHits} 处`)
console.log(report.join('\n'))
