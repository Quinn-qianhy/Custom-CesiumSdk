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
  'cesium-api': 'Cesium 版本/API',
  hint: '示例说明'
}

const HINT_TAG = 'hint'

/** 解析示例配置中的状态标签（排除 hint，hint 由 statusHint 单独展示） */
export function resolveStatusTagLabels(statusTags: StatusTag[] = []): string[] {
  return statusTags.filter((tag) => tag !== HINT_TAG).map((tag) => STATUS_TAG_LABELS[tag] ?? tag)
}

/** 示例是否配置了自定义提示语 */
export function hasExampleHint(page: ExamplePage): boolean {
  return Boolean(page.statusHint?.trim()) || page.statusTags?.includes(HINT_TAG) === true
}

/** 获取示例卡片展示用的状态信息 */
export function getPageStatusMeta(page: ExamplePage): ExampleStatusMeta | null {
  const isPending = page.status === 'pending'
  const hasHint = hasExampleHint(page)
  const labels = resolveStatusTagLabels(page.statusTags)

  if (!isPending && !hasHint && labels.length === 0) {
    return null
  }

  const hint = page.statusHint?.trim()
  const parts: string[] = []

  if (isPending) {
    parts.push('待修复')
  }
  if (labels.length) {
    parts.push(...labels)
  }
  if (hasHint) {
    parts.push(STATUS_TAG_LABELS[HINT_TAG])
  }

  return {
    labels,
    reason: page.statusReason ?? '待修复',
    shortLabel: parts.join(' · '),
    isPending,
    hasHint,
    hint
  }
}

/** 根据标签文案推断 Element Plus Tag 类型 */
export function getStatusTagType(label: string): 'warning' | 'danger' | 'info' {
  if (label === STATUS_TAG_LABELS[HINT_TAG]) {
    return 'info'
  }
  if (label.includes('服务器')) {
    return 'warning'
  }
  return 'danger'
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
