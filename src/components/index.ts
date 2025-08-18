// 單獨導出組件
export { default as BaseTable } from './BaseTable.vue'
export { default as BaseBtn } from './BaseBtn.vue'
export { default as BaseDialog } from './BaseDialog.vue'

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
export type { default as BaseTableType } from './BaseTable.vue'
export type { default as BaseBtnType } from './BaseBtn.vue'
export type { default as BaseDialogType } from './BaseDialog.vue'
