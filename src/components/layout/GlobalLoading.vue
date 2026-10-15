<template>
  <Teleport to="body">
    <Transition name="fade">
      <div v-if="visible" class="global-loading">
        <div class="global-loading__content">
          <el-icon class="global-loading__icon"><Loading /></el-icon>
          <span>{{ message }}</span>
        </div>
      </div>
    </Transition>
  </Teleport>
</template>

<script setup lang="ts">
import { Loading } from '@element-plus/icons-vue'

defineProps({
  visible: { type: Boolean, default: false },
  message: { type: String, default: '加载中...' }
})
</script>

<style scoped lang="scss">
.global-loading {
  position: fixed;
  inset: 0;
  z-index: 9999;
  display: flex;
  align-items: center;
  justify-content: center;
  background: rgba(0, 0, 0, 0.45);
  backdrop-filter: blur(4px);

  &__content {
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 12px;
    padding: 24px 32px;
    border-radius: 12px;
    background: var(--glass-bg);
    border: 1px solid var(--glass-border);
    color: var(--text-primary);
    box-shadow: var(--shadow-glow);
  }

  &__icon {
    font-size: 28px;
    color: var(--tech-primary);
    animation: spin 1s linear infinite;
  }
}

@keyframes spin {
  from { transform: rotate(0deg); }
  to { transform: rotate(360deg); }
}
</style>
