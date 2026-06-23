/// <reference types="vite/client" />

interface ImportMetaEnv {
  readonly VITE_CESIUM_ION_TOKEN?: string
  readonly VITE_DATA_ENV?: string
  readonly VITE_DATA_BASE_URL?: string
}

interface ImportMeta {
  readonly env: ImportMetaEnv
}

declare module '*.vue' {
  import type { DefineComponent } from 'vue'
  const component: DefineComponent<object, object, unknown>
  export default component
}

declare module '*.glsl' {
  const source: string
  export default source
}

declare module 'vue3-sfc-loader' {
  export function loadModule(
    path: string,
    options: Record<string, unknown>
  ): Promise<import('vue').Component>
}

declare module 'lil-gui' {
  export interface GUIController {
    name(label: string): GUIController
    onChange(fn: (value: unknown) => void): GUIController
  }

  export interface GUIOptions {
    container?: HTMLElement | null
    title?: string
  }

  export default class GUI {
    constructor(options?: GUIOptions)
    add<T extends object, K extends keyof T>(
      object: T,
      property: K,
      ...args: unknown[]
    ): GUIController
    addFolder(name: string): GUI
    destroy(): void
  }
}
