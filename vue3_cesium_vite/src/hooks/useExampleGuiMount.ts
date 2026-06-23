import { inject } from 'vue'
import { EXAMPLE_GUI_MOUNT_KEY } from '@/types/injection'

/** 获取示例页左上角 GUI 挂载点 */
export function useExampleGuiMount() {
  const mountRef = inject(EXAMPLE_GUI_MOUNT_KEY, null)

  const getGuiMount = (clear = true): HTMLElement | null => {
    const el = mountRef?.value ?? null
    if (el && clear) {
      el.innerHTML = ''
    }
    return el
  }

  return { mountRef, getGuiMount }
}
