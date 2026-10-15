<template>
  <div id="code-editor-panel">
    <div class="editor-header">
      <div class="header-left">
        <span class="title">示例代码</span>
        <el-tag type="primary" size="small">{{ resolvedMode }}</el-tag>
        <el-tag v-if="sourceLabel" size="small">{{ sourceLabel }}</el-tag>
        <el-tag v-if="isModified" type="warning" size="small">已修改</el-tag>
      </div>
      <div class="header-right">
        <el-button
          size="small"
          :type="isEditing ? 'primary' : 'default'"
          @click="toggleEdit"
        >
          {{ isEditing ? '预览' : '编辑' }}
        </el-button>
        <el-button
          size="small"
          type="success"
          :disabled="!isEditing || !isModified"
          @click="runCode"
        >
          运行
        </el-button>
        <el-button
          size="small"
          :disabled="!isModified"
          @click="resetCode"
        >
          重置
        </el-button>
        <el-button size="small" @click="copySource">复制</el-button>
      </div>
    </div>
    <codemirror
      v-model="draftSource"
      :extensions="cmExtensions"
      class="code"
      :disabled="!isEditing"
    />
  </div>
</template>

<script setup lang="ts">
import { ref, computed, watch } from 'vue'
import { useRoute } from 'vue-router'
import { ElMessage } from 'element-plus'
import { Codemirror } from 'vue-codemirror'
import { javascript } from '@codemirror/lang-javascript'
import { html } from '@codemirror/lang-html'
import { vue as vueLang } from '@codemirror/lang-vue'
import { oneDark } from '@codemirror/theme-one-dark'
import { loadExampleSource, loadHtmlExampleSource } from '@/utils/exampleSource'
import { useExamplesStore } from '@/stores/examplesStore'

const props = withDefaults(
  defineProps<{
    exampleMode?: string
  }>(),
  {
    exampleMode: ''
  }
)

const route = useRoute()
const store = useExamplesStore()

const originalSource = ref('// 加载中...')
const draftSource = ref('// 加载中...')
const sourceLabel = ref('')
const isEditing = ref(false)

const resolvedMode = computed(() => {
  if (props.exampleMode) {
    return props.exampleMode
  }
  return route.name === 'HtmlExample' ? 'html' : 'vue'
})

const cmExtensions = computed(() => {
  if (resolvedMode.value === 'html') {
    return [html(), oneDark]
  }
  return [javascript(), vueLang(), oneDark]
})

const isModified = computed(() => draftSource.value !== originalSource.value)

const routeParam = (value: string | string[] | undefined): string =>
  Array.isArray(value) ? value[0] ?? '' : value ?? ''

let loadGeneration = 0

const loadSource = async () => {
  const generation = ++loadGeneration
  isEditing.value = false

  if (resolvedMode.value === 'html') {
    const examplePath = routeParam(route.params.examplePath)
    sourceLabel.value = examplePath
    const source = await loadHtmlExampleSource(examplePath)
    if (generation !== loadGeneration) {
      return
    }
    originalSource.value = source
    draftSource.value = source
    return
  }

  const componentId = routeParam(route.params.componentId)
  sourceLabel.value = componentId
  store.resetCustomSource()
  const source = await loadExampleSource(componentId)
  if (generation !== loadGeneration) {
    return
  }
  originalSource.value = source
  draftSource.value = source
}

watch(
  () => [route.params.componentId, route.params.examplePath, resolvedMode.value],
  () => {
    loadSource()
  },
  { immediate: true }
)

const toggleEdit = () => {
  isEditing.value = !isEditing.value
}

const runCode = () => {
  if (!isEditing.value || !isModified.value) {
    return
  }

  if (resolvedMode.value === 'html') {
    store.applyHtmlSource(draftSource.value)
    ElMessage.success('HTML 已应用，左侧场景已刷新')
    return
  }

  store.applyCustomSource(draftSource.value)
  ElMessage.success('代码已应用，左侧场景已刷新')
}

const resetCode = async () => {
  draftSource.value = originalSource.value
  isEditing.value = false

  if (resolvedMode.value === 'html') {
    store.clearHtmlSource()
    ElMessage.info('已恢复为原始 HTML 示例')
    return
  }

  store.clearCustomSource()
  ElMessage.info('已恢复为原始示例代码')
}

const copySource = async () => {
  try {
    await navigator.clipboard.writeText(draftSource.value)
    ElMessage.success('源码已复制到剪贴板')
  } catch {
    ElMessage.error('复制失败')
  }
}
</script>

<style lang="scss" scoped>
#code-editor-panel {
  display: flex;
  flex-direction: column;
  height: 100%;
  background-color: #1e1e1e;
  border: 1px solid var(--glass-border);
  border-radius: 8px;
  overflow: hidden;

  .editor-header {
    height: 40px;
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 0 12px;
    background-color: #2d2d30;
    border-bottom: 1px solid #3e3e42;
    flex-shrink: 0;
    gap: 8px;

    .header-left {
      display: flex;
      align-items: center;
      gap: 8px;
      min-width: 0;

      .title {
        font-size: 0.875rem;
        font-weight: 500;
        color: #ccc;
        white-space: nowrap;
      }
    }

    .header-right {
      display: flex;
      align-items: center;
      gap: 6px;
      flex-shrink: 0;
    }
  }

  .code {
    flex: 1;
    overflow: auto;

    :deep(.cm-editor) {
      height: 100%;
    }

    :deep(.cm-scroller) {
      font-family: 'Consolas', 'Monaco', 'Courier New', monospace;
      font-size: 13px;
    }
  }
}
</style>
