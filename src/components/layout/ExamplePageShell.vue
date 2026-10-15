<template>
  <div class="example-page">
    <header class="example-page__header">
      <span class="example-page__title">{{ examplesTitle }}</span>
      <div class="example-page__actions">
        <el-button size="small" text @click="togglePanel">
          {{ panelCollapsed ? '展开源码' : '收起源码' }}
        </el-button>
      </div>
    </header>

    <slot name="alert" />

    <div
      class="example-page__body"
      :class="{ 'is-resizing': isResizing, 'is-panel-collapsed': panelCollapsed }"
    >
      <div
        v-if="isResizing"
        class="example-page__resize-overlay"
        aria-hidden="true"
      />

      <div class="example-page__map">
        <slot name="gui" />
        <slot name="map" />
        <slot name="loading" />
      </div>

      <aside
        v-show="!panelCollapsed"
        class="example-page__panel"
        :style="{ width: `${panelWidth}px` }"
      >
        <div
          class="example-page__resize-handle"
          role="separator"
          aria-orientation="vertical"
          aria-label="调整源码面板宽度"
          @pointerdown="startResize"
        />
        <div class="example-page__code">
          <!-- <div class="example-page__code-header">源码</div> -->
          <div class="example-page__code-body">
            <slot name="code" :active="!panelCollapsed" />
          </div>
        </div>
      </aside>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useExamplePageTitle } from '@/hooks/useExamplePageTitle'
import { useResizableExamplePanel } from '@/hooks/useResizableExamplePanel'

const props = withDefaults(
  defineProps<{
    titleParam: 'componentId' | 'examplePath'
  }>(),
  {}
)

const { examplesTitle } = useExamplePageTitle(props.titleParam)

const {
  panelCollapsed,
  panelWidth,
  isResizing,
  togglePanel,
  startResize
} = useResizableExamplePanel()
</script>

<style lang="scss" scoped>
@use '@/styles/sceneManage.scss';
</style>
