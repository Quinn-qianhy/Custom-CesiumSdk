<template>
  <div class="top-navbar">
    <div class="nav-item" @click="goToAPIPage">
      <el-icon><Document /></el-icon>
      <span>API 文档</span>
    </div>
    <div class="nav-item" @click="goToLinksPage">
      <el-icon><Link /></el-icon>
      <span>友情链接</span>
    </div>
    <div class="nav-item" @click="switchTheme">
      <el-icon><Moon v-if="isDarkMode" /><Sunny v-else /></el-icon>
      <span>{{ isDarkMode ? '切换亮色' : '切换暗色' }}</span>
    </div>
  </div>
</template>

<script setup lang="ts">
import { Document, Link, Moon, Sunny } from '@element-plus/icons-vue'

defineProps({
  isDarkMode: { type: Boolean, default: true }
})

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
    margin-right: 24px;
    color: var(--text-accent);
    cursor: pointer;
    font-size: 14px;
    transition: all var(--transition-base);
    padding: 5px 10px;
    border-radius: 4px;

    &:hover {
      background: rgba(64, 158, 255, 0.2);
      box-shadow: var(--shadow-glow);
    }

    .el-icon {
      margin-right: 5px;
      font-size: 16px;
    }
  }
}
</style>
