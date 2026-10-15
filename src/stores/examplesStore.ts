import { defineStore } from 'pinia'
import { ref } from 'vue'
import { createSourceRevisionSlice } from '@/stores/helpers/sourceRevision'

export const useExamplesStore = defineStore('examples', () => {
  const componentName = ref('')
  const vueEditor = createSourceRevisionSlice()
  const htmlEditor = createSourceRevisionSlice()

  return {
    componentName,
    customSource: vueEditor.source,
    applyRevision: vueEditor.revision,
    htmlCustomSource: htmlEditor.source,
    htmlApplyRevision: htmlEditor.revision,
    resetCustomSource: vueEditor.reset,
    applyCustomSource: vueEditor.apply,
    clearCustomSource: vueEditor.clear,
    resetHtmlCustomSource: htmlEditor.reset,
    applyHtmlSource: htmlEditor.apply,
    clearHtmlSource: htmlEditor.clear
  }
})
