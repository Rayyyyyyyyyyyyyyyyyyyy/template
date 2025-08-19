// 單獨導出組件
export { default as BaseTable } from './tables/BaseTable.vue'
export { default as BaseBtn } from './items/BaseBtn.vue'
export { default as BaseDialog } from './BaseDialog.vue'
export { default as SortTable } from './tables/SortTable.vue'
export { default as SearchBar } from './SearchBar.vue'

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
  VueTableComponentsPlugin
} from '../types/components'

// 重新導出組件定義類型
export type { default as BaseTableType } from './tables/BaseTable.vue'
export type { default as BaseBtnType } from './items/BaseBtn.vue'
export type { default as BaseDialogType } from './BaseDialog.vue'
export type { default as SortTableType } from './tables/SortTable.vue'
export type { default as SearchBarType } from './SearchBar.vue'
