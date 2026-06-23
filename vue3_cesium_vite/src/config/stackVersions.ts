import pkg from '../../package.json'

export interface VersionItem {
  label: string
  value: string
}

function normalizeVersion(version: string | undefined): string {
  if (!version) {
    return '-'
  }
  return version.replace(/^[\^~>=<]*/, '')
}

/** 技术栈版本信息（构建时从 package.json 读取） */
export const stackVersions = {
  project: pkg.version,
  vue: normalizeVersion(pkg.dependencies?.vue),
  vueRouter: normalizeVersion(pkg.dependencies?.['vue-router']),
  pinia: normalizeVersion(pkg.dependencies?.pinia),
  elementPlus: normalizeVersion(pkg.dependencies?.['element-plus']),
  vite: normalizeVersion(pkg.devDependencies?.vite),
  lilGui: normalizeVersion(pkg.dependencies?.['lil-gui']),
  cesium: '1.135.0'
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
