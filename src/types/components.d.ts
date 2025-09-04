import type { App, DefineComponent, VNode } from 'vue'
import type { TableColumnCtx } from 'element-plus'
import type { SortChangValue, TableColumn } from './index'

// ==================== BaseTable 組件類型 ====================

/** BaseTable 組件 Props 類型 */
export interface BaseTableProps<T extends Record<string, unknown> = Record<string, unknown>> {
  /** 是否顯示加載狀態 */
  loading?: boolean
  /** 表格數據 */
  data: T[]
  /** 表格列配置 */
  columns: TableColumn<T>[]
  /** 是否顯示選擇列 */
  showSelection?: boolean
  /** 是否顯示匯總行 */
  showSummary?: boolean
  /** 是否顯示溢出提示 */
  showOverFlowTooltip?: boolean
  /** 匯總方法 */
  summaryMethod?: (param: {
    columns: TableColumnCtx<Record<string, unknown>>[];
    data: T[]
  }) => (string | VNode)[]
  /** 行樣式類名 */
  baseTableRowClassName?: (data: { row: T; rowIndex: number }) => string
}

/** BaseTable 組件 Emits 類型 */
export interface BaseTableEmits<T extends Record<string, unknown> = Record<string, unknown>> {
  /** 選擇變更事件 */
  'selection-change': (selection: T[]) => void
  /** 當前行變更事件 */
  'current-change': (currentRow: T) => void
  /** 單元格點擊事件 */
  'cell-click': (column: TableColumn<T>, row: T) => void
  /** 列排序變更事件 */
  'column-sort-change': (value: SortChangValue<T>) => void
}

/** BaseTable 組件實例類型 */
export interface BaseTableInstance<T extends Record<string, unknown> = Record<string, unknown>> {
  /** 組件 Props */
  $props: BaseTableProps<T>
  /** 組件 Emits */
  $emit: BaseTableEmits<T>
}

// ==================== BaseBtn 組件類型 ====================

/** BaseBtn 組件 Props 類型 */
export interface BaseBtnProps {
  /** 按鈕文字 */
  text?: string
  /** 按鈕類型 */
  type?: 'default' | 'primary' | 'success' | 'warning' | 'info' | 'danger'
  /** 按鈕尺寸 */
  size?: 'default' | 'small' | 'large'
  /** 是否為樸素按鈕 */
  plain?: boolean
  /** 自定義 CSS 類名 */
  class?: string
  /** 是否禁用 */
  disabled?: boolean
  /** 是否為文字按鈕 */
  textBtn?: boolean
  /** 圖標 */
  icon?: object
  /** 是否為鏈接按鈕 */
  link?: boolean
  /** 是否填充樣式 */
  isFill?: boolean
  /** 是否顯示加載狀態 */
  loading?: boolean
  /** 測試屬性 */
  dataCy?: string
}

/** BaseBtn 組件 Emits 類型 */
export interface BaseBtnEmits {
  /** 點擊事件 */
  (e: 'click', evt: MouseEvent): void
}

/** BaseBtn 組件實例類型 */
export interface BaseBtnInstance {
  /** 組件 Props */
  $props: BaseBtnProps
  /** 組件 Emits */
  $emit: BaseBtnEmits
}

// ==================== BaseDialog 組件類型 ====================

/** BaseDialog 組件 Props 類型 */
export interface BaseDialogProps {
  /** 是否顯示對話框 */
  modelValue: boolean
  /** 對話框標題 */
  title?: string
  /** 副標題 */
  subTitle?: string
  /** 關閉前回調 */
  beforeClose?: () => void
  /** 自定義寬度 */
  customWidth?: string
  /** 是否為警告對話框 */
  isWaring?: boolean
  /** 是否為主要對話框 */
  isPrimary?: boolean
  /** 內容區域加載狀態 */
  bodyLoading?: boolean
  /** 提交按鈕加載狀態 */
  submitLoading?: boolean
}

/** BaseDialog 組件 Emits 類型 */
export interface BaseDialogEmits {
  /** 更新 modelValue */
  (e: 'update:modelValue', data: boolean): void
  /** 提交按鈕點擊事件 */
  (e: 'click:submit'): void
}

/** BaseDialog 組件實例類型 */
export interface BaseDialogInstance {
  /** 組件 Props */
  $props: BaseDialogProps
  /** 組件 Emits */
  $emit: BaseDialogEmits
}

// ==================== 組件定義類型 ====================

/** BaseTable 組件定義 */
export declare const BaseTable: DefineComponent<
  BaseTableProps<any>,
  {},
  {},
  {},
  {},
  {},
  {},
  BaseTableEmits<any>
> & {
  /** 安裝方法 */
  install: (app: App) => void
}

/** BaseBtn 組件定義 */
export declare const BaseBtn: DefineComponent<
  BaseBtnProps,
  {},
  {},
  {},
  {},
  {},
  {},
  BaseBtnEmits
> & {
  /** 安裝方法 */
  install: (app: App) => void
}

/** BaseDialog 組件定義 */
export declare const BaseDialog: DefineComponent<
  BaseDialogProps,
  {},
  {},
  {},
  {},
  {},
  {},
  BaseDialogEmits
> & {
  /** 安裝方法 */
  install: (app: App) => void
}

// ==================== 插件類型 ====================

/** 插件安裝選項 */
export interface PluginOptions {
  /** 是否自動導入樣式 */
  autoImportStyles?: boolean
  /** 自定義前綴 */
  prefix?: string
}

/** 插件實例類型 */
export interface VueTableComponentsPlugin {
  /** 安裝方法 */
  install: (app: App, options?: PluginOptions) => void
  /** BaseTable 組件 */
  BaseTable: typeof BaseTable
  /** BaseBtn 組件 */
  BaseBtn: typeof BaseBtn
  /** BaseDialog 組件 */
  BaseDialog: typeof BaseDialog
}

// ==================== 全局類型擴展 ====================

declare module '@vue/runtime-core' {
  export interface GlobalComponents {
    BaseTable: typeof BaseTable
    BaseBtn: typeof BaseBtn
    BaseDialog: typeof BaseDialog
    FilterBtn: typeof FilterBtn
  }
}
