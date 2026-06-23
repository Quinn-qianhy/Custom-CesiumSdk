import type { InjectionKey, Ref, ShallowRef } from 'vue'
import type { Viewer } from 'cesium'

/** Cesium Viewer 注入键（SceneManage 提供） */
export const VIEWER_INJECTION_KEY: InjectionKey<ShallowRef<Viewer | null>> =
  Symbol('viewer')

/** lil-gui 挂载点注入键（ExampleGuiOverlay 提供） */
export const EXAMPLE_GUI_MOUNT_KEY: InjectionKey<Ref<HTMLElement | null>> =
  Symbol('exampleGuiMount')
