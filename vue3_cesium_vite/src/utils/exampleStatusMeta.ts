import type {
  ExamplePage,
  ExampleStats,
  ExampleStatusMeta,
  MenuSection,
  StatusTag
} from '@/types/example'

/** 示例状态标签文案 */
export const STATUS_TAG_LABELS: Record<string, string> = {
  'server-data': '需服务器数据',
  'cesium-api': 'Cesium 版本/API'
}

/** 获取示例卡片展示用的状态信息 */
export function getPageStatusMeta(page: ExamplePage): ExampleStatusMeta | null {
  if (page.status !== 'pending') {
    return null
  }

  const tags = page.statusTags ?? []
  const labels = tags.map((tag) => STATUS_TAG_LABELS[tag] ?? tag)

  return {
    labels,
    reason: page.statusReason ?? '待修复',
    shortLabel: labels.length ? `待修复 · ${labels.join(' / ')}` : '待修复'
  }
}

/** 统计菜单中的示例状态 */
export function countExampleStats(menu: MenuSection[]): ExampleStats {
  let total = 0
  let pending = 0
  let serverData = 0
  let cesiumApi = 0

  for (const section of menu) {
    for (const group of section.menuItem ?? []) {
      for (const page of group.pages ?? []) {
        total += 1
        if (page.status === 'pending') {
          pending += 1
          if (page.statusTags?.includes('server-data' as StatusTag)) {
            serverData += 1
          }
          if (page.statusTags?.includes('cesium-api' as StatusTag)) {
            cesiumApi += 1
          }
        }
      }
    }
  }

  return { total, pending, ok: total - pending, serverData, cesiumApi }
}
