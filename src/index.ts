import type { App } from 'vue'
import BaseTable from './components/tables/BaseTable.vue'
import BaseBtn from './components/items/BaseBtn.vue'
import BaseInput from './components/form/BaseInput.vue'
import BaseDialog from './components/items/BaseDialog.vue'
import SortTable from './components/tables/SortTable.vue'
import TitleTable from './components/tables/TitleTable.vue'
import SearchBar from './components/items/SearchBar.vue'

// 導入樣式
import './assets/styles/tailwind.scss'

// 導入 i18n
import { setLocale } from './utils/i18n'

// 導出基礎類型
export * from './types'

// 導出工具函數
export * from './utils/tableHelper'

// 導出 i18n 相關
export { useI18n, setLocale, useElementLocale, useComponentElementLocale } from './utils/i18n'
export * from './locales'

// 導出組件
export { BaseTable, BaseBtn, BaseInput, BaseDialog, SortTable, TitleTable, SearchBar }

// 導出組件類型
export type {
  BaseTableProps,
  BaseTableEmits,
  BaseTableInstance,
  BaseBtnProps,
  BaseBtnEmits,
  BaseBtnInstance,
  BaseDialogProps,
  BaseDialogEmits,
  BaseDialogInstance,
  PluginOptions,
  VueTableComponentsPlugin,
} from './types/components'

// 重新導出組件索引
export * from './components'

// 組件列表（參考 ElementUI 的做法）
const components: any[] = [
  BaseTable,
  BaseBtn,
  BaseInput,
  BaseDialog,
  SortTable,
  TitleTable,
  SearchBar,
]

// Vue 插件安裝函數
export function install(
  app: App,
  options?: { autoImportStyles?: boolean; prefix?: string; locale?: string },
) {
  // 如果提供了 locale，設定內部 i18n 的預設語系
  if (options?.locale) {
    setLocale(options.locale)
  }

  // 只註冊組件，不處理 Element Plus
  // 外部專案需要自行安裝和配置 Element Plus
  components.forEach((component) => {
    app.component(component.name || 'VueTableComponent', component)
  })
}

// 默認導出（支持 app.use() 語法）
export default {
  install,
  ...components,
}

// 支援單個組件安裝（使用類型斷言）
;(BaseTable as unknown as Record<string, unknown>).install = (app: App) => {
  app.component(BaseTable.name || 'BaseTable', BaseTable)
}
;(BaseBtn as unknown as Record<string, unknown>).install = (app: App) => {
  app.component(BaseBtn.name || 'BaseBtn', BaseBtn)
}
;(BaseInput as unknown as Record<string, unknown>).install = (app: App) => {
  app.component(BaseInput.name || 'BaseInput', BaseInput)
}
;(BaseDialog as unknown as Record<string, unknown>).install = (app: App) => {
  app.component(BaseDialog.name || 'BaseDialog', BaseDialog)
}
;(SortTable as unknown as Record<string, unknown>).install = (app: App) => {
  app.component(SortTable.name || 'SortTable', SortTable)
}
;(TitleTable as unknown as Record<string, unknown>).install = (app: App) => {
  app.component(TitleTable.name || 'TitleTable', TitleTable)
}
;(SearchBar as unknown as Record<string, unknown>).install = (app: App) => {
  app.component(SearchBar.name || 'SearchBar', SearchBar)
}
