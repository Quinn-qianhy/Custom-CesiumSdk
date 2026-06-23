/** 同步主题 class 到 html，供 CSS 变量与 Element Plus 暗色模式使用 */
export function applyThemeClass(isDark: boolean): void {
  const root = document.documentElement
  root.classList.toggle('dark-theme', isDark)
  root.classList.toggle('light-theme', !isDark)
  root.classList.toggle('dark', isDark)
}
