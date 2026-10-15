import { defineStore } from 'pinia'
import { ref, computed } from 'vue'
import {
  ENGINE_LIST,
  ENGINE_REGISTRY,
  DEFAULT_ENGINE_ID,
  getEngineMenu
} from '@/config/engines'
import type { EngineId } from '@/types/engine'

const STORAGE_KEY = 'map-engine'

function readStoredEngineId(): EngineId {
  const stored = localStorage.getItem(STORAGE_KEY) as EngineId | null
  if (stored && ENGINE_REGISTRY[stored]) {
    return stored
  }
  return DEFAULT_ENGINE_ID
}

export const useEngineStore = defineStore('engine', () => {
  const currentEngineId = ref<EngineId>(readStoredEngineId())

  const engineList = computed(() => ENGINE_LIST)

  const currentEngine = computed(
    () => ENGINE_REGISTRY[currentEngineId.value] ?? ENGINE_REGISTRY[DEFAULT_ENGINE_ID]
  )

  const menuData = computed(() => getEngineMenu(currentEngineId.value))

  const switchEngine = (engineId: EngineId) => {
    if (!ENGINE_REGISTRY[engineId] || engineId === currentEngineId.value) {
      return
    }
    currentEngineId.value = engineId
    localStorage.setItem(STORAGE_KEY, engineId)
  }

  return {
    currentEngineId,
    engineList,
    currentEngine,
    menuData,
    switchEngine
  }
})
