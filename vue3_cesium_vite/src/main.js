import {
  createApp
} from 'vue'
import App from './App.vue'
//引入element-plus
import ElementPlus from 'element-plus'
import * as ElementPlusIconsVue from '@element-plus/icons-vue'
import 'element-plus/dist/index.css'
import './style.css'
// 引入封装好的cesium地图插件
import cesiumView from './plugins/cesiumView'
import router from './router';
import {
  createPinia
} from 'pinia'
const pinia = createPinia()
const app = createApp(App)
for (const [key, component] of Object.entries(ElementPlusIconsVue)) {
  app.component(key, component)
}
app
  .use(router)
  .use(pinia)
  .use(cesiumView)
  .use(ElementPlus)
  .mount('#app')