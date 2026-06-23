import { ref, inject, onMounted } from 'vue'
import type { ShallowRef } from 'vue'
import type { Viewer } from 'cesium'
import GUI from 'lil-gui'
import { useExamplesStore } from '@/stores/examplesStore'
import { useExampleGuiMount } from '@/hooks/useExampleGuiMount'
import { VIEWER_INJECTION_KEY } from '@/types/injection'
import * as Cesium from 'cesium'

/** 解析 inject 注入的 Viewer */
export function resolveViewer(
  injected: ShallowRef<Viewer | null> | null | undefined
): Viewer | null {
  return injected?.value ?? null
}

/** 示例组件通用依赖聚合 */
export function useCommonImports() {
  const injectedViewer = inject(VIEWER_INJECTION_KEY, null)
  const { getGuiMount } = useExampleGuiMount()
  const getViewer = () => resolveViewer(injectedViewer)

  return {
    ref,
    inject,
    onMounted,
    GUI,
    Cesium,
    useExamplesStore,
    useExampleGuiMount,
    resolveViewer,
    getViewer,
    getGuiMount,
    injectedViewer
  }
}
