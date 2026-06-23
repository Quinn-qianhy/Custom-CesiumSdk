export interface SiteLink {
  label: string
  url: string
  icon: string
}

export interface SiteHighlight {
  title: string
  desc: string
}

export interface SiteConfig {
  siteName: string
  brandShort: string
  version: string
  buildDate: string
  author: string
  authorLabel: string
  email: string
  github: string
  icp: string
  icpLink: string
  copyright: string
  license: string
  intro: string
  features: string[]
  highlights: SiteHighlight[]
  links: SiteLink[]
}

const siteConfig: SiteConfig = {
  siteName: 'HY 3D API 示例中心',
  brandShort: 'HY 3D API',
  version: '0.0.0',
  buildDate: '20260623',
  author: 'qianhy',
  authorLabel: '开发者',
  email: '',
  github: '',
  icp: '湘ICP备00000000号',
  icpLink: 'https://beian.miit.gov.cn/',
  copyright: 'HY 3D API Showcase',
  license: 'MIT',
  intro:
    'HY 3D API 示例中心是一个基于 Vue3 + Cesium 的 WebGIS 示范应用，用于展示三维地球场景浏览、图层叠加、几何绘制与自定义材质等能力，帮助开发者快速上手 Cesium 与 Vue 的集成开发。',
  features: [
    '基础地图操作',
    '图层管理',
    '几何绘制',
    '材质效果',
    '场景特效',
    '数据可视化',
    '交互功能',
    '在线代码调试'
  ],
  highlights: [
    { title: '现代化技术栈', desc: 'Vue3 Composition API + Vite + Pinia + Element Plus' },
    { title: '模块化架构', desc: '布局、引擎、示例分层组织，便于扩展 MapLibre 等引擎' },
    { title: '丰富示例', desc: '涵盖场景、图层、材质、绘制等多类 Cesium 示例' },
    { title: '在线编辑', desc: '源码面板支持编辑、运行与重置，实时预览修改效果' },
    { title: '双主题支持', desc: '暗色 / 亮色主题切换，适配不同使用场景' },
    { title: '响应式布局', desc: '顶栏、侧栏、底栏三段式结构，兼容桌面与移动端' }
  ],
  links: [
    { label: 'Cesium 官网', url: 'https://cesium.com/', icon: 'Location' },
    { label: 'Vue.js 官网', url: 'https://vuejs.org/', icon: 'Document' },
    { label: 'Element Plus', url: 'https://element-plus.org/', icon: 'Grid' },
    { label: 'Vite 官网', url: 'https://vitejs.dev/', icon: 'Lightning' }
  ]
}

export default siteConfig
