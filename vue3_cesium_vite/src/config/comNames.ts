import type { ComponentNameMapping } from '@/types/example'

const comNames: ComponentNameMapping[] = [
  { id: '基础场景浏览', name: 'sceneView' },
  { id: '测试页面', name: 'textView' },
  { id: 'entity点', name: 'entityPoint' },
  { id: 'entity线', name: 'entityLine' },
  { id: 'entity面', name: 'entityRectangle' },
  { id: '内置线材质', name: 'ownLine' },
  { id: '自定义线材质', name: 'customLine' },
  { id: '内置面材质', name: 'ownPolygon' },
  { id: '自定义面材质', name: 'customPolygon' },
  { id: '百度地图', name: 'baiduLayer' }
]

export default comNames
