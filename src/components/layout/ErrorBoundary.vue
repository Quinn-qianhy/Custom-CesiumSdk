<template>
  <div v-if="error" class="error-boundary">
    <el-result icon="error" title="页面渲染出错" :sub-title="error.message">
      <template #extra>
        <el-button type="primary" @click="retry">重试</el-button>
      </template>
    </el-result>
  </div>
  <slot v-else />
</template>

<script setup lang="ts">
import { onErrorCaptured, ref } from 'vue'

const error = ref<Error | null>(null)

onErrorCaptured((err: unknown) => {
  error.value = err instanceof Error ? err : new Error(String(err))
  return false
})

const retry = () => {
  error.value = null
  window.location.reload()
}
</script>

<style scoped lang="scss">
.error-boundary {
  display: flex;
  align-items: center;
  justify-content: center;
  min-height: 100vh;
  background: var(--tech-bg-gradient);
}
</style>
