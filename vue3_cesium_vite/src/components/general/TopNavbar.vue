<template>
  <div class="top-navbar">
    <div class="nav-item" @click="goToAPIPage">
      <el-icon><Document /></el-icon>
      <span>API 页面</span>
    </div>
    <div class="nav-item" @click="goToLinksPage">
      <el-icon><Link /></el-icon>
      <span>友情链接</span>
    </div>
    <div class="nav-item" @click="switchTheme">
      <el-icon><Brush /></el-icon>
      <span>主题背景切换</span>
    </div>
  </div>
</template>

<script setup>
import { Document, Link, Brush } from '@element-plus/icons-vue'

// 定义组件要发射的事件
const emit = defineEmits(['goToLinksPage', 'switchTheme'])

const goToAPIPage = () => {
  window.open('/Documentation/index.html', '_blank')
}

const goToLinksPage = () => {
  emit('goToLinksPage')
}

const switchTheme = () => {
  emit('switchTheme')
}
</script>

<style lang="scss" scoped>
.top-navbar {
  display: flex;
  align-items: center;
  height: 100%;
  padding: 0 20px;
  justify-content: flex-end;
  .nav-item {
    display: flex;
    align-items: center;
    margin-right: 30px;
    color: #409eff;
    cursor: pointer;
    font-size: 14px;
    transition: all 0.3s;
    padding: 5px 10px;
    border-radius: 4px;
    
    &:hover {
      background: rgba(64, 158, 255, 0.2);
      box-shadow: 0 0 10px rgba(64, 158, 255, 0.3);
    }
    
    .el-icon {
      margin-right: 5px;
      font-size: 16px;
    }
  }
}
</style>