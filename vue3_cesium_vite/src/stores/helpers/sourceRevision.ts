import { ref } from 'vue'

/** 可编辑源码切片（Vue / HTML 示例共用） */
export function createSourceRevisionSlice() {
  const source = ref<string | null>(null)
  const revision = ref(0)

  const reset = () => {
    source.value = null
  }

  const apply = (next: string) => {
    source.value = next
    revision.value += 1
  }

  const clear = () => {
    if (source.value === null) {
      return
    }
    source.value = null
    revision.value += 1
  }

  return { source, revision, reset, apply, clear }
}
