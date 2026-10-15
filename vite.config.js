import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import { resolve } from 'path'
import { readFileSync } from 'node:fs'
import { fileURLToPath, URL } from 'node:url'

const projectRoot = fileURLToPath(new URL('.', import.meta.url))

const pkg = JSON.parse(readFileSync(resolve(projectRoot, 'package.json'), 'utf8'))

/** 依赖版本统一取自 package.json 声明范围，去掉 ^ ~ 前缀便于展示 */
function declaredVersion(name) {
  return (pkg.dependencies?.[name] || pkg.devDependencies?.[name] || '-').replace(/^[\^~]/, '')
}

/** Cesium 是自编译产物、不在 package.json 中，版本号只能从产物 license 头注释解析 */
function readCesiumVersion() {
  for (const file of ['index.js', 'Cesium.js', 'index.cjs']) {
    try {
      const content = readFileSync(resolve(projectRoot, 'public/cesium', file), 'utf8')
      const matched = content.match(/Version\s+(\d+\.\d+\.\d+)/)
      if (matched) {
        return matched[1]
      }
    } catch {
      // 该产物不存在，继续尝试下一个
    }
  }
  return '-'
}

/** 构建时注入前端的版本信息，供 src/config/stackVersions.ts 使用 */
const buildVersions = {
  project: pkg.version,
  cesium: readCesiumVersion(),
  vue: declaredVersion('vue'),
  vueRouter: declaredVersion('vue-router'),
  pinia: declaredVersion('pinia'),
  elementPlus: declaredVersion('element-plus'),
  vite: declaredVersion('vite'),
  lilGui: declaredVersion('lil-gui')
}

// https://vitejs.dev/config/
export default defineConfig({
  // 部署到 GitHub Pages 项目页时在 CI 里注入 VITE_BASE=/Custom-CesiumSdk/，
  // 本地开发与构建保持 / 不受影响
  base: process.env.VITE_BASE || '/',
  plugins: [vue()],
  define: {
    __BUILD_VERSIONS__: JSON.stringify(buildVersions)
  },
  resolve: {
    alias: {
      '@': resolve(projectRoot, 'src'),
      // cesium 指向自编译产物，而非 node_modules
      cesium: resolve(projectRoot, 'public/cesium')
    }
  },
  server: {
    host: '0.0.0.0',
    port: 3000
  },
  css: {
    preprocessorOptions: {
      scss: {
        api: 'modern-compiler'
      }
    }
  }
})
