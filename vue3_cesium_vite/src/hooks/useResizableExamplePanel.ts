import { ref, onMounted, onUnmounted } from 'vue'

const MIN_PANEL_WIDTH = 280

/** 示例页右侧可拖拽面板尺寸与折叠状态 */
export function useResizableExamplePanel() {
  const panelCollapsed = ref(false)
  const panelWidth = ref(380)
  const isResizing = ref(false)

  let activePointerId: number | null = null

  const getDefaultPanelWidth = () =>
    Math.min(
      Math.max(window.innerWidth * 0.35, MIN_PANEL_WIDTH),
      window.innerWidth * 0.5
    )

  const togglePanel = () => {
    panelCollapsed.value = !panelCollapsed.value
  }

  const startResize = (event: PointerEvent) => {
    if (event.button !== 0) {
      return
    }

    event.preventDefault()
    event.stopPropagation()

    isResizing.value = true
    activePointerId = event.pointerId

    const startX = event.clientX
    const startWidth = panelWidth.value
    const maxWidth = window.innerWidth * 0.5

    const onPointerMove = (moveEvent: PointerEvent) => {
      if (activePointerId !== null && moveEvent.pointerId !== activePointerId) {
        return
      }
      const delta = startX - moveEvent.clientX
      panelWidth.value = Math.min(
        Math.max(startWidth + delta, MIN_PANEL_WIDTH),
        maxWidth
      )
    }

    const endResize = () => {
      isResizing.value = false
      activePointerId = null
      window.removeEventListener('pointermove', onPointerMove)
      window.removeEventListener('pointerup', endResize)
      window.removeEventListener('pointercancel', endResize)
    }

    window.addEventListener('pointermove', onPointerMove)
    window.addEventListener('pointerup', endResize)
    window.addEventListener('pointercancel', endResize)
  }

  const handleWindowResize = () => {
    panelWidth.value = getDefaultPanelWidth()
  }

  onMounted(() => {
    panelWidth.value = getDefaultPanelWidth()
    window.addEventListener('resize', handleWindowResize)
  })

  onUnmounted(() => {
    window.removeEventListener('resize', handleWindowResize)
  })

  return {
    panelCollapsed,
    panelWidth,
    isResizing,
    togglePanel,
    startResize
  }
}
