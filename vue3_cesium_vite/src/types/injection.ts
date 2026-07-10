import type { InjectionKey, Ref, ShallowRef } from 'vue'
import type { Viewer } from 'cesium'
import type Map from 'ol/Map'

/** Cesium Viewer 注入键（SceneManage 提供） */
export const VIEWER_INJECTION_KEY: InjectionKey<ShallowRef<Viewer | null>> =
  Symbol('viewer')

/** OpenLayers Map 注入键（SceneManage 提供） */
export const OL_MAP_INJECTION_KEY: InjectionKey<ShallowRef<Map | null>> =
  Symbol('olMap')

/** lil-gui 挂载点注入键（ExampleGuiOverlay 提供） */
export const EXAMPLE_GUI_MOUNT_KEY: InjectionKey<Ref<HTMLElement | null>> =
  Symbol('exampleGuiMount')
