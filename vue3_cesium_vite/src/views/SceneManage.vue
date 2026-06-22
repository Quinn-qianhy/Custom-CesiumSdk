<!--
 * @Author: qianhy
 * @Date: 2025-11-19 21:21:18
 * @LastEditTime: 2025-11-29 21:22:10
 * @LastEditors: qianhy
 * @Description: 
 * @FilePath: \vue3_cesium_vite\src\views\SceneManage.vue
-->
<template>
  <el-container>
    <el-header>{{ examplesTitle }}</el-header>
    <Transition name="slide-fade">
      <CodePanel v-show="isCodePanelVisible" />
    </Transition>
      <el-tag 
        type="primary" 
        size="large"
        class="tagButton"
        @click="handleTagClick"
        :class="{ clicked: tagClicked }"
      >
        源码
      </el-tag>
    <el-main>
      <!-- 动态组件树 -->
      <activeCom />
    </el-main>
  </el-container>
</template>

<script setup>
import { ref, onMounted, inject } from 'vue'
import { useExamplesStore } from '../stores/examplesStore' // 导入examplesStore
import activeCom from '../components/general/activeCom.vue';
import CodePanel from './CodePanel.vue'
// 获取examplesStore
const store = useExamplesStore()
const examplesTitle = ref('')
const tagClicked = ref(false)
const isCodePanelVisible = ref(false) // 控制CodePanel显示状态

// 获取路由
onMounted(() => {
  examplesTitle.value = localStorage.getItem('examplesTitle')
  store.componentName = localStorage.getItem('componentName')
})

const handleTagClick = () => {
  // 切换点击状态
  tagClicked.value = !tagClicked.value
  
  // 切换CodePanel显示状态
  isCodePanelVisible.value = !isCodePanelVisible.value
}
</script>

<style lang="scss" scoped>
@use '@/styles/sceneManage.scss'
</style>