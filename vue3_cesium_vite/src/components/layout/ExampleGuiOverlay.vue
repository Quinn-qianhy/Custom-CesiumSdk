<template>
  <div
    v-show="visible"
    class="example-gui-overlay"
    :class="{ 'is-visible': visible }"
    aria-label="示例参数面板"
  >
    <div
      id="example-gui-mount"
      ref="mountRef"
      class="example-gui-overlay__mount funGui"
    />
  </div>
</template>

<script setup lang="ts">
import { ref, provide, onMounted, onUnmounted, watch } from 'vue'
import { EXAMPLE_GUI_MOUNT_KEY } from '@/types/injection'

const props = withDefaults(
  defineProps<{
    /** 外部显式控制可见性（HTML 示例桥接） */
    forceVisible?: boolean | null
  }>(),
  {
    forceVisible: null
  }
)

const mountRef = ref<HTMLElement | null>(null)
const hasContent = ref(false)
const visible = ref(false)

let observer: MutationObserver | null = null
let mapBlockDepth = 0

const MAP_BLOCK_SELECTOR = '.cesium-viewer, .cesium-widget'

const syncVisibility = () => {
  if (props.forceVisible === true) {
    visible.value = true
    return
  }
  if (props.forceVisible === false) {
    visible.value = false
    return
  }
  visible.value = hasContent.value
}

const checkContent = () => {
  const mount = mountRef.value
  if (!mount) {
    hasContent.value = false
    syncVisibility()
    return
  }
  hasContent.value = mount.childElementCount > 0
  syncVisibility()
}

/** Vue 示例：拖拽 GUI 时暂时屏蔽 Cesium 画布指针事件 */
const blockMapPointer = () => {
  mapBlockDepth += 1
  if (mapBlockDepth > 1) {
    return
  }
  document.querySelectorAll<HTMLElement>(MAP_BLOCK_SELECTOR).forEach((el) => {
    el.dataset.guiPointerBlock = '1'
    el.style.pointerEvents = 'none'
  })
}

const restoreMapPointer = () => {
  if (mapBlockDepth <= 0) {
    return
  }
  mapBlockDepth = 0
  document.querySelectorAll<HTMLElement>('[data-gui-pointer-block="1"]').forEach((el) => {
    el.style.pointerEvents = ''
    delete el.dataset.guiPointerBlock
  })
  document.body.classList.remove('lil-gui-dragging', 'lil-gui-vertical')
}

const onInteractionStart = () => {
  blockMapPointer()
}

const clearMount = () => {
  restoreMapPointer()
  if (mountRef.value) {
    mountRef.value.innerHTML = ''
  }
  hasContent.value = false
  syncVisibility()
}

defineExpose({
  getMount: () => mountRef.value,
  clear: clearMount
})

provide(EXAMPLE_GUI_MOUNT_KEY, mountRef)

onMounted(() => {
  const mount = mountRef.value
  if (!mount) {
    return
  }

  mount.addEventListener('mousedown', onInteractionStart, true)
  window.addEventListener('mouseup', restoreMapPointer)
  window.addEventListener('blur', restoreMapPointer)

  observer = new MutationObserver(checkContent)
  observer.observe(mount, { childList: true, subtree: true })
  checkContent()
})

onUnmounted(() => {
  mountRef.value?.removeEventListener('mousedown', onInteractionStart, true)
  window.removeEventListener('mouseup', restoreMapPointer)
  window.removeEventListener('blur', restoreMapPointer)
  observer?.disconnect()
  observer = null
  restoreMapPointer()
})

watch(
  () => props.forceVisible,
  () => {
    syncVisibility()
  }
)
</script>

<style lang="scss" scoped>
.example-gui-overlay {
  position: absolute;
  top: 12px;
  left: 12px;
  z-index: 100;
  width: var(--example-gui-width, 280px);
  max-height: var(--example-gui-max-height, 420px);
  pointer-events: none;
  opacity: 0;
  transform: translateY(-4px);
  transition:
    opacity 0.2s ease,
    transform 0.2s ease;

  &.is-visible {
    pointer-events: auto;
    opacity: 1;
    transform: translateY(0);
  }

  &__mount {
    width: 100%;
    max-height: var(--example-gui-max-height, 420px);
    overflow: auto;
    border-radius: 8px;
    border: 1px solid rgba(255, 255, 255, 0.12);
    background: rgba(26, 26, 26, 0.96);
    box-shadow: 0 8px 24px rgba(0, 0, 0, 0.45);

    &::-webkit-scrollbar {
      width: 5px;
    }

    &::-webkit-scrollbar-thumb {
      background: rgba(255, 255, 255, 0.22);
      border-radius: 3px;
    }

    &:empty {
      display: none;
    }
  }
}

:deep(.lil-gui) {
  --background-color: #1f1f1f;
  --text-color: #ebebeb;
  --title-background-color: #111111;
  --title-text-color: #ebebeb;
  --widget-color: #424242;
  --hover-color: #4f4f4f;
  --focus-color: #595959;
  --number-color: #2cc9ff;
  --folder-text-color: #ebebeb;
  --input-color: #ebebeb;
  width: 100% !important;
  max-width: 100%;
  position: relative !important;
  top: auto !important;
  right: auto !important;
  font-family: inherit;
}

@media (max-width: 768px) {
  .example-gui-overlay {
    top: 8px;
    left: 8px;
    width: min(var(--example-gui-width, 280px), calc(100% - 16px));
    max-height: min(var(--example-gui-max-height, 420px), 40vh);
  }
}

@media (prefers-reduced-motion: reduce) {
  .example-gui-overlay {
    transition: none;
  }
}
</style>
