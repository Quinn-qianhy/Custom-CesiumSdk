/** HTML 示例 iframe 与父页面 GUI 挂载桥接 */
export interface HtmlExampleGuiHost {
  getMount: () => HTMLElement | null
  getTitle: () => string
  clear: () => void
  notifyControlsReady: () => void
}

declare global {
  interface Window {
    __htmlExampleGuiHost__?: HtmlExampleGuiHost
  }
}

export {}
