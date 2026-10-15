import { computed } from 'vue'
import { useRoute } from 'vue-router'

/** 示例页标题（Vue / HTML 路由共用） */
export function useExamplePageTitle(paramKey: 'componentId' | 'examplePath') {
  const route = useRoute()

  const displayTitle = computed(
    () => (route.query.title as string) || (route.params[paramKey] as string)
  )

  const examplesTitle = computed(() => `Vue3+Cesium示例:${displayTitle.value}`)

  return { displayTitle, examplesTitle }
}
