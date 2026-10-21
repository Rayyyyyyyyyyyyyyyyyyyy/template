import type { App } from 'vue'
import type { PluginOptions, VueTableComponentsPlugin } from './types/components'
import * as componentMap from './components'

// 導入樣式
import './assets/styles/tailwind.scss'

// 導入 i18n
import { setLocale } from './utils/i18n'

// 導出基礎類型
export * from './types'

// 導出工具函數
export * from './utils/tableHelper'

// 導出 i18n 相關
export { useI18n, setLocale, useComponentElementLocale } from './utils/i18n'
export * from './locales'

// 重新導出組件索引
export * from './components'
// 明確值導出優先於歷史 type-only barrel 的同名宣告。
export {
  BaseTable, BaseBtn, BaseInput, BaseSelector, BaseDialog, BaseWaringDialog,
  SortTable, TitleTable, SearchBar, TransferDialog, TransferItem, FunctionHeader,
  MainPanel, SearchableListPanel, DetailLayout, FilterLayout,
} from './components'

// 保留歷史 default[0..15] 順序；module namespace 的 key 順序不同。
const components = [
  componentMap.BaseTable, componentMap.BaseBtn, componentMap.BaseInput,
  componentMap.BaseSelector, componentMap.BaseDialog, componentMap.BaseWaringDialog,
  componentMap.SortTable, componentMap.TitleTable, componentMap.SearchBar,
  componentMap.TransferDialog, componentMap.TransferItem, componentMap.FunctionHeader,
  componentMap.MainPanel, componentMap.SearchableListPanel, componentMap.DetailLayout,
  componentMap.FilterLayout,
]

// Vue 插件安裝函數
export function install(app: App, options?: PluginOptions) {
  // 如果提供了 locale，設定內部 i18n 的預設語系
  if (options?.locale) {
    setLocale(options.locale)
  }

  // 只註冊組件，不處理 Element Plus
  // 外部專案需要自行安裝和配置 Element Plus
  Object.entries(componentMap).forEach(([name, component]) => {
    app.component(component.name || name, component)
  })
}

// 默認導出保留單項名稱與歷史數字索引；安裝能力由 components 入口擁有。
// 明確公共型別避免 TypeScript 展開所有泛型 SFC 而超過 declaration 長度限制。
export default {
  install,
  ...components,
  ...componentMap,
} as unknown as VueTableComponentsPlugin & { [index: number]: any }
