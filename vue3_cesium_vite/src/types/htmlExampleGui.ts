/** HTML 示例菜单项 */
export interface HtmlExampleMenuOption {
  text: string
  value?: string
  onselect?: () => void
}

/** HTML 示例 iframe 与父页面 GUI 桥接（嵌入宿主时由父页面代理 lil-gui） */
export interface HtmlExampleGuiHost {
  isDelegated?: boolean
  getMount: () => HTMLElement | null
  getTitle: () => string
  clear: () => void
  notifyControlsReady: () => void
  reset: () => void
  finishedLoading: () => void
  addButton: (text: string, onclick: () => void, toolbarID?: string) => void
  addToolbarButton: (text: string, onclick: () => void, toolbarID?: string) => void
  addDefaultButton: (text: string, onclick: () => void, toolbarID?: string) => void
  addDefaultToolbarButton: (text: string, onclick: () => void, toolbarID?: string) => void
  addToggleButton: (
    text: string,
    checked: boolean,
    onchange: (checked: boolean) => void,
    toolbarID?: string
  ) => void
  addSlider: (
    text: string,
    value: number,
    min: number,
    max: number,
    step: number,
    onchange: (value: number) => void,
    toolbarID?: string
  ) => void
  addMenu: (options: HtmlExampleMenuOption[], toolbarID?: string) => void
  addToolbarMenu: (options: HtmlExampleMenuOption[], toolbarID?: string) => void
  addDefaultMenu: (options: HtmlExampleMenuOption[], toolbarID?: string) => void
  addDefaultToolbarMenu: (options: HtmlExampleMenuOption[], toolbarID?: string) => void
  destroy: () => void
}

declare global {
  interface Window {
    __htmlExampleGuiHost__?: HtmlExampleGuiHost
  }
}

export {}
