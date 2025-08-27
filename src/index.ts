import type { App } from 'vue'
import BaseTable from './components/tables/BaseTable.vue'
import BaseBtn from './components/items/BaseBtn.vue'
import BaseDialog from './components/BaseDialog.vue'
import SortTable from './components/tables/SortTable.vue'
import SearchBar from './components/SearchBar.vue'
import TransferDialog from './components/transfer/TransferDialog.vue'
import TransferItem from './components/transfer/transferItem.vue'

// 導出基礎類型
export * from './types'

// 導出工具函數
export * from './utils/tableHelper'

// 導出組件
export { BaseTable, BaseBtn, BaseDialog, SortTable, SearchBar, TransferDialog, TransferItem }

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
const components = [BaseTable, BaseBtn, BaseDialog, SortTable, SearchBar, TransferDialog, TransferItem]

// Vue 插件安裝函數
function install(app: App) {
  // 批量註冊組件
  components.forEach((component) => {
    app.component(component.name || 'BaseTable', component)
  })
}

// 導出安裝函數（支持 app.use() 語法）
export { install }

// 支援單個組件安裝（使用類型斷言）
;(BaseTable as unknown as Record<string, unknown>).install = (app: App) => {
  app.component(BaseTable.name || 'BaseTable', BaseTable)
}
;(BaseBtn as unknown as Record<string, unknown>).install = (app: App) => {
  app.component(BaseBtn.name || 'BaseBtn', BaseBtn)
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
;(TransferDialog as unknown as Record<string, unknown>).install = (app: App) => {
  app.component(TransferDialog.name || 'TransferDialog', TransferDialog)
}
;(TransferItem as unknown as Record<string, unknown>).install = (app: App) => {
  app.component(TransferItem.name || 'TransferItem', TransferItem)
}
