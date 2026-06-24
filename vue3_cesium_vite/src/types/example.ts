/** 示例类型 */
export type ExampleType = 'vue' | 'html' | 'external'

/** 示例实现状态 */
export type ExampleStatus = 'ok' | 'pending'

/** 示例状态标签 */
export type StatusTag = 'server-data' | 'cesium-api' | 'hint' | (string & {})

/** 菜单中的单个示例页 */
export interface ExamplePage {
  name: string
  image: string
  type?: ExampleType
  url: string
  status?: ExampleStatus
  statusTags?: StatusTag[]
  statusReason?: string
  /** 自定义提示语，配合 statusTags 中的 hint 或单独展示 */
  statusHint?: string
}

/** 二级菜单分组 */
export interface MenuGroup {
  menuItemName: string
  pages: ExamplePage[]
}

/** 一级菜单分区 */
export interface MenuSection {
  subMenu: string
  menuItem: MenuGroup[]
}

/** 菜单名称与组件 ID 映射 */
export interface ComponentNameMapping {
  id: string
  name: string
}

/** 卡片状态展示信息 */
export interface ExampleStatusMeta {
  labels: string[]
  reason: string
  shortLabel: string
  isPending: boolean
  hasHint: boolean
  hint?: string
}

/** 菜单统计 */
export interface ExampleStats {
  total: number
  pending: number
  ok: number
  serverData: number
  cesiumApi: number
}
