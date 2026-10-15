import { createApp } from 'vue'
import App from './App.vue'
import ElementPlus from 'element-plus'
import * as ElementPlusIconsVue from '@element-plus/icons-vue'
import 'element-plus/dist/index.css'
import 'element-plus/theme-chalk/dark/css-vars.css'
import 'ol/ol.css'
import '../node_modules/lil-gui/dist/lil-gui.css'
import '@fontsource-variable/space-grotesk'
import './style.css'
import router from './router'
import { createPinia } from 'pinia'
import { useAppStore } from '@/stores/appStore'
import { withBase } from '@/utils/withBase'

// Vue 侧 Cesium 打进 bundle 后无法从 script 标签推断资源位置，
// 显式声明 Workers/Assets 等静态资源的根，子路径部署下同样成立
window.CESIUM_BASE_URL = withBase('/cesium/')

const pinia = createPinia()
const app = createApp(App)

for (const [key, component] of Object.entries(ElementPlusIconsVue)) {
  app.component(key, component)
}

app.use(router).use(pinia).use(ElementPlus)

useAppStore(pinia)

app.mount('#app')
