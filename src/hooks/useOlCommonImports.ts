import { ref, inject, onMounted } from 'vue'
import type { ShallowRef } from 'vue'
import type Map from 'ol/Map'
import GUI from 'lil-gui'
import { useExamplesStore } from '@/stores/examplesStore'
import { useExampleGuiMount } from '@/hooks/useExampleGuiMount'
import { OL_MAP_INJECTION_KEY } from '@/types/injection'

/** 解析 inject 注入的 OpenLayers Map */
export function resolveOlMap(injected: ShallowRef<Map | null> | null | undefined): Map | null {
  return injected?.value ?? null
}

/** OpenLayers 示例组件通用依赖聚合 */
export function useOlCommonImports() {
  const injectedMap = inject(OL_MAP_INJECTION_KEY, null)
  const { getGuiMount } = useExampleGuiMount()
  const getMap = () => resolveOlMap(injectedMap)

  return {
    ref,
    inject,
    onMounted,
    GUI,
    useExamplesStore,
    useExampleGuiMount,
    resolveOlMap,
    getMap,
    getGuiMount,
    injectedMap
  }
}
