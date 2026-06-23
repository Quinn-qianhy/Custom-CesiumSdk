import type { InjectionKey, ShallowRef } from 'vue'
import type { Viewer } from 'cesium'

/** Cesium Viewer 注入键（SceneManage 提供） */
export const VIEWER_INJECTION_KEY: InjectionKey<ShallowRef<Viewer | null>> =
  Symbol('viewer')
