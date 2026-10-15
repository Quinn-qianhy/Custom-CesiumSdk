export interface VersionItem {
  label: string
  value: string
}

/**
 * 构建时由 vite.config.js 注入的版本信息。
 * - 依赖版本取自 package.json 声明的版本范围
 * - Cesium 版本解析自 public/cesium 构建产物的 license 头注释
 */
declare const __BUILD_VERSIONS__: Record<string, string>

function pickVersion(key: string): string {
  return __BUILD_VERSIONS__?.[key] || '-'
}

/** 技术栈版本信息（构建时注入） */
export const stackVersions = {
  project: pickVersion('project'),
  vue: pickVersion('vue'),
  vueRouter: pickVersion('vueRouter'),
  pinia: pickVersion('pinia'),
  elementPlus: pickVersion('elementPlus'),
  vite: pickVersion('vite'),
  lilGui: pickVersion('lilGui'),
  cesium: pickVersion('cesium')
}

export function getVersionList(): VersionItem[] {
  return [
    { label: '项目版本', value: stackVersions.project },
    { label: 'Cesium', value: stackVersions.cesium },
    { label: 'Vue', value: stackVersions.vue },
    { label: 'Vue Router', value: stackVersions.vueRouter },
    { label: 'Pinia', value: stackVersions.pinia },
    { label: 'Element Plus', value: stackVersions.elementPlus },
    { label: 'Vite', value: stackVersions.vite },
    { label: 'lil-gui', value: stackVersions.lilGui }
  ]
}
