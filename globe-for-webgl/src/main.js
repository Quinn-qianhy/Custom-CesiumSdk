import { createApp } from 'vue'
import App from './App.vue'
import router from './router'

// Element Plus
import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css'
// Element Plus Icons
import * as ElementPlusIconsVue from '@element-plus/icons-vue'

// Codemirror
import { Codemirror } from 'vue-codemirror'
import 'codemirror/lib/codemirror.css'

const app = createApp(App)

// 注册Element Plus Icons
for (const [key, component] of Object.entries(ElementPlusIconsVue)) {
  app.component(key, component)
}

app.use(router)
app.use(ElementPlus)
app.component('Codemirror', Codemirror)

app.mount('#app')
