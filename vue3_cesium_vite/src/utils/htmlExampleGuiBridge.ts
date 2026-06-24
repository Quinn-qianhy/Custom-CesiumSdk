import GUI from 'lil-gui'
import type { HtmlExampleGuiHost, HtmlExampleMenuOption } from '@/types/htmlExampleGui'

/** 在父页面创建 lil-gui，避免 iframe 内实例化导致 window 事件监听错位 */
export function createHtmlExampleGuiBridge(deps: {
  getMount: () => HTMLElement | null
  getTitle: () => string
  notifyControlsReady: () => void
}): HtmlExampleGuiHost {
  let guiInstance: GUI | null = null
  let defaultAction: (() => void) | null = null
  let buttonCounter = 0
  let toggleCounter = 0
  let sliderCounter = 0
  let textInputCounter = 0
  let numberInputCounter = 0
  let menuCounter = 0

  const ensureGui = (): GUI | null => {
    if (guiInstance) {
      return guiInstance
    }

    const mount = deps.getMount()
    if (!mount) {
      return null
    }

    mount.innerHTML = ''
    guiInstance = new GUI({
      container: mount,
      title: deps.getTitle()
    })
    return guiInstance
  }

  const notifyReady = () => {
    deps.notifyControlsReady()
  }

  const host: HtmlExampleGuiHost = {
    isDelegated: true,

    getMount: deps.getMount,
    getTitle: deps.getTitle,

    clear: () => {
      host.destroy()
      const mount = deps.getMount()
      if (mount) {
        mount.innerHTML = ''
      }
    },

    notifyControlsReady: deps.notifyControlsReady,

    reset: () => {},

    finishedLoading: () => {
      host.reset()
      if (defaultAction) {
        defaultAction()
        defaultAction = null
      }
    },

    addButton: (text, onclick) => {
      const gui = ensureGui()
      if (!gui) {
        return
      }
      buttonCounter += 1
      const key = `__btn${buttonCounter}`
      const actions: Record<string, () => void> = { [key]: onclick }
      gui.add(actions, key).name(text)
      notifyReady()
    },

    addToolbarButton: (text, onclick) => {
      host.addButton(text, onclick)
    },

    addDefaultButton: (text, onclick) => {
      host.addButton(text, onclick)
      defaultAction = onclick
    },

    addDefaultToolbarButton: (text, onclick) => {
      host.addDefaultButton(text, onclick)
    },

    addToggleButton: (text, checked, onchange) => {
      const gui = ensureGui()
      if (!gui) {
        return
      }
      toggleCounter += 1
      const key = `__toggle${toggleCounter}`
      const state: Record<string, boolean> = { [key]: checked }
      gui.add(state, key).name(text).onChange((value) => onchange(Boolean(value)))
      notifyReady()
    },

    addSlider: (text, value, min, max, step, onchange) => {
      const gui = ensureGui()
      if (!gui) {
        return
      }
      sliderCounter += 1
      const key = `__slider${sliderCounter}`
      const state: Record<string, number> = { [key]: value }
      gui.add(state, key, min, max, step).name(text).onChange((value) => onchange(Number(value)))
      notifyReady()
    },

    addTextInput: (text, object, property, onchange) => {
      const gui = ensureGui()
      if (!gui) {
        return
      }
      textInputCounter += 1
      const key = property || `__text${textInputCounter}`
      if (!(key in object)) {
        object[key] = ''
      }
      const controller = gui.add(object, key).name(text)
      if (onchange) {
        controller.onChange((value) => onchange(String(value)))
      }
      notifyReady()
    },

    addNumberInput: (text, object, property, min, max, step, onchange) => {
      const gui = ensureGui()
      if (!gui) {
        return
      }
      numberInputCounter += 1
      const key = property || `__number${numberInputCounter}`
      if (!(key in object)) {
        object[key] = 0
      }
      const controller = gui.add(object, key, min, max, step).name(text)
      if (onchange) {
        controller.onChange((value) => onchange(Number(value)))
      }
      notifyReady()
    },

    addMenu: (options) => {
      const gui = ensureGui()
      if (!gui) {
        return
      }

      const texts = options.map((item) => item.text)
      menuCounter += 1
      const key = `__menu${menuCounter}`
      const state: Record<string, string> = { [key]: texts[0] || '' }

      gui
        .add(state, key, texts)
        .name(`选项 ${menuCounter}`)
        .onChange((value) => {
          const item = options.find((option) => option.text === value)
          item?.onselect?.()
        })

      if (!defaultAction && options[0]?.onselect) {
        defaultAction = options[0].onselect
      }

      notifyReady()
    },

    addToolbarMenu: (options) => {
      host.addMenu(options)
    },

    addDefaultMenu: (options) => {
      host.addMenu(options)
      if (options[0]?.onselect) {
        defaultAction = options[0].onselect
      }
    },

    addDefaultToolbarMenu: (options) => {
      host.addDefaultMenu(options)
    },

    destroy: () => {
      guiInstance?.destroy()
      guiInstance = null
      defaultAction = null
      buttonCounter = 0
      toggleCounter = 0
      sliderCounter = 0
      textInputCounter = 0
      numberInputCounter = 0
      menuCounter = 0
    }
  }

  return host
}
