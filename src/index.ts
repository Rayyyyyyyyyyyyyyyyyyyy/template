import type { App } from 'vue'
import BaseTable from './components/tables/BaseTable.vue'
import BaseBtn from './components/items/BaseBtn.vue'
import BaseInput from './components/items/BaseInput.vue'
import FilterBtn from './components/items/FilterBtn.vue'
import BaseDialog from './components/BaseDialog.vue'
import SortTable from './components/tables/SortTable.vue'
import SearchBar from './components/SearchBar.vue'

// 導入樣式
import './assets/styles/tailwind.scss'

// 導出基礎類型
export * from './types'

// 導出組件
export {
  BaseTable,
  BaseBtn,
  BaseInput,
  FilterBtn,
  BaseDialog,
  SortTable,
  SearchBar
}

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
  FilterBtn,
  BaseDialog,
  SortTable,
  SearchBar
]

// Vue 插件安裝函數
export function install(app: App) {
  // 批量註冊組件
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
;(FilterBtn as unknown as Record<string, unknown>).install = (app: App) => {
  app.component(FilterBtn.name || 'FilterBtn', FilterBtn)
}
;(BaseDialog as unknown as Record<string, unknown>).install = (app: App) => {
  app.component(BaseDialog.name || 'BaseDialog', BaseDialog)
}
;(SortTable as unknown as Record<string, unknown>).install = (app: App) => {
  app.component(SortTable.name || 'SortTable', SortTable)
}
;(SearchBar as unknown as Record<string, unknown>).install = (app: App) => {
  app.component(SearchBar.name || 'SearchBar', SearchBar)
}
