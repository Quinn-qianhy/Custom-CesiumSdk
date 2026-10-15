import { computed } from 'vue'
import { useRoute } from 'vue-router'
import { useEngineStore } from '@/stores/engineStore'
import { ENGINE_REGISTRY } from '@/config/engines'
import type { EngineId } from '@/types/engine'

/** 从路由 query 或 Pinia 解析当前示例应使用的地图引擎 */
export function useExampleEngine() {
  const route = useRoute()
  const engineStore = useEngineStore()

  const engineId = computed<EngineId>(() => {
    const fromQuery = route.query.engine as EngineId | undefined
    if (fromQuery && ENGINE_REGISTRY[fromQuery]) {
      return fromQuery
    }
    return engineStore.currentEngineId
  })

  const isCesium = computed(() => engineId.value === 'cesium')
  const isOpenLayers = computed(() => engineId.value === 'openlayers')

  return {
    engineId,
    isCesium,
    isOpenLayers
  }
}
