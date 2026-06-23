import {
  defineConfig
} from 'vite';
import vue from '@vitejs/plugin-vue';
import { resolve } from 'path'
import { fileURLToPath, URL } from 'node:url'
// https://vitejs.dev/config/
export default defineConfig({
  plugins: [vue()],
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src',
        import.meta.url)),
      // 配置Cesium 自定义包 引用路径  // 指向项目外部的目录
      'cesium': resolve(__dirname, 'public/cesium/')
    }
  },
  server: {
    host: '0.0.0.0',
    port: 3000
  },
  css: {
    preprocessorOptions: {
      scss: {
        api: 'modern-compiler'
      }
    }
  }
});