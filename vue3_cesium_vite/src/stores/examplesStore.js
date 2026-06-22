import {
  defineStore
} from 'pinia'
import {
  ref
} from 'vue'
export const useExamplesStore = defineStore('examples', () => {
  //当前示例功能组件
  const componentName = ref('')
  // const setTitle = (newTitle) => {
  //   return currentView.value = newTitle
  // }
  return {
    componentName,
    // setTitle
  }
})