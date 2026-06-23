/**
 * 从 globe-for-webgl 二进制同步缩略图到 public/examples
 * 用法: node scripts/repair-example-thumbnails.mjs
 */
import fs from 'fs'
import path from 'path'
import { fileURLToPath } from 'url'

const __dirname = path.dirname(fileURLToPath(import.meta.url))
const ROOT = path.resolve(__dirname, '..')
const SRC = path.resolve(ROOT, '../globe-for-webgl/static/examples')
const DEST = path.resolve(ROOT, 'public/examples')

const IMAGE_EXT = /\.(png|gif|jpe?g|webp|svg)$/i

function syncImagesFromDir(srcDir, label) {
  if (!fs.existsSync(srcDir)) {
    console.warn(`跳过 ${label}：目录不存在 ${srcDir}`)
    return 0
  }

  let count = 0
  for (const file of fs.readdirSync(srcDir)) {
    if (!IMAGE_EXT.test(file)) continue
    fs.mkdirSync(DEST, { recursive: true })
    fs.copyFileSync(path.join(srcDir, file), path.join(DEST, file))
    count += 1
  }
  return count
}

function verifyImages() {
  const files = fs.readdirSync(DEST).filter((f) => IMAGE_EXT.test(f))
  let bad = 0

  for (const file of files) {
    const buf = fs.readFileSync(path.join(DEST, file))
    const isGif = file.toLowerCase().endsWith('.gif')
    const isPng = file.toLowerCase().endsWith('.png')
    const isJpg = /\.jpe?g$/i.test(file)

    const ok =
      (isGif && buf[0] === 0x47 && buf[1] === 0x49) ||
      (isPng && buf[0] === 0x89 && buf[1] === 0x50) ||
      (isJpg && buf[0] === 0xff && buf[1] === 0xd8) ||
      file.toLowerCase().endsWith('.webp') ||
      file.toLowerCase().endsWith('.svg')

    if (!ok) {
      bad += 1
      console.warn(`仍损坏: ${file}`)
    }
  }

  return { total: files.length, bad }
}

function main() {
  const synced = syncImagesFromDir(SRC, 'globe-for-webgl')
  const { total, bad } = verifyImages()
  console.log(`缩略图同步完成: ${synced} 张 → public/examples/`)
  console.log(`校验: ${total - bad}/${total} 有效`)
}

main()
