import type { App, DefineComponent, VNode } from 'vue'
import type { TableColumnCtx } from 'element-plus'
import type { SortChangValue, TableColumn } from './index'

// ==================== 表格相關組件類型 ====================

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

// ==================== SortTable 組件類型 ====================

/** SortTable 組件 Props 類型 */
export interface SortTableProps<T extends Record<string, unknown> = Record<string, unknown>> {
  /** 表格數據 */
  data: T[]
  /** 表格列配置 */
  columns: import('./index').TableColumn<T>[]
  /** 表格標題 */
  tableTitle?: string
  /** 是否顯示選擇列 */
  showSelection?: boolean
  /** 是否顯示加載狀態 */
  loading?: boolean
  /** 是否顯示匯總行 */
  showSummary?: boolean
  /** 是否顯示溢出提示 */
  showOverFlowTooltip?: boolean
  /** 匯總方法 */
  summaryMethod?: (param: { columns: import('element-plus').TableColumnCtx<Record<string, unknown>>[]; data: T[] }) => (string | import('vue').VNode)[]
  /** 行樣式類名 */
  sortTableRowClassName?: (data: { row: T; rowIndex: number }) => string
}

/** SortTable 組件 Emits 類型 */
export interface SortTableEmits<T extends Record<string, unknown> = Record<string, unknown>> {
  /** 打開轉移對話框事件 */
  (e: 'open:transfer'): void
  /** 更新選擇行事件 */
  (e: 'update:selectRow', value: T[]): void
  /** 單元格點擊事件 */
  (e: 'click:cell', column: import('./index').TableColumn<T>, row: T): void
  /** 列排序點擊事件 */
  (e: 'click:columnSort', data: import('./index').SortChangValue<T>): void
}

/** SortTable 組件實例類型 */
export interface SortTableInstance<T extends Record<string, unknown> = Record<string, unknown>> {
  /** 組件 Props */
  $props: SortTableProps<T>
  /** 組件 Emits */
  $emit: SortTableEmits<T>
}

// ==================== 按鈕相關組件類型 ====================

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


// ==================== 對話框相關組件類型 ====================

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

// ==================== TransferDialog 組件類型 ====================

/** TransferDialog 組件 Props 類型 */
export interface TransferDialogProps<T = Record<string, unknown>> {
  /** 是否顯示對話框 */
  modelValue: boolean
  /** 列配置值 */
  columnsValue: import('./index').TableColumn<T>[]
  /** 轉移對話框標題 */
  transferTitle: string
}

/** TransferDialog 組件 Emits 類型 */
export interface TransferDialogEmits<T = Record<string, unknown>> {
  /** 更新 modelValue */
  (e: 'update:modelValue', value: boolean): void
  /** 提交事件 */
  (e: 'update:submit', data: import('./index').TableColumn<T>[]): void
}

/** TransferDialog 組件實例類型 */
export interface TransferDialogInstance<T = Record<string, unknown>> {
  /** 組件 Props */
  $props: TransferDialogProps<T>
  /** 組件 Emits */
  $emit: TransferDialogEmits<T>
}

// ==================== 表單相關組件類型 ====================

// ==================== BaseInput 組件類型 ====================

/** BaseInput 組件 Props 類型 */
export interface BaseInputProps {
  /** 模型值 */
  modelValue?: string | number | null
  /** 佔位符 */
  placeholder?: string
  /** 輸入框類型 */
  type?: string
  /** 自定義 CSS 類名 */
  class?: string | { [key: string]: boolean }
  /** 是否顯示密碼切換 */
  showPassword?: boolean
  /** 是否禁用 */
  disabled?: boolean
  /** 是否只讀 */
  readonly?: boolean
  /** 最大長度 */
  maxlength?: string | number
  /** 自動完成 */
  autocomplete?: string
  /** 測試屬性 */
  dataCy?: string
}

/** BaseInput 組件 Emits 類型 */
export interface BaseInputEmits {
  /** 更新模型值事件 */
  (e: 'update:modelValue', data: string | number | undefined | null): void
  /** 清除值事件 */
  (e: 'update:clearValue'): void
}

/** BaseInput 組件實例類型 */
export interface BaseInputInstance {
  /** 組件 Props */
  $props: BaseInputProps
  /** 組件 Emits */
  $emit: BaseInputEmits
}

// ==================== BaseForm 組件類型 ====================

/** BaseForm 組件 Props 類型 */
export interface BaseFormProps<T extends object = object> {
  /** 模型值 */
  modelValue?: T
  /** 表單驗證規則 */
  rules?: import('element-plus').FormRules
  /** 標籤寬度 */
  labelWidth?: string
  /** 測試屬性 */
  dataCy?: string
}

/** BaseForm 組件 Emits 類型 */
export interface BaseFormEmits {
  /** 更新模型值事件 */
  (e: 'update:modelValue', value: Record<string, unknown>): void
  /** 提交事件 */
  (e: 'submit'): void
  /** 驗證事件 */
  (e: 'validate', valid: boolean): void
}

/** BaseForm 組件實例類型 */
export interface BaseFormInstance {
  /** 組件 Props */
  $props: BaseFormProps
  /** 組件 Emits */
  $emit: BaseFormEmits
}

// ==================== BaseMultipleInput 組件類型 ====================

/** BaseMultipleInput 組件 Props 類型 */
export interface BaseMultipleInputProps {
  /** 模型值（字符串數組） */
  modelValue: string[]
  /** 輸入框類型 */
  type?: string
  /** 驗證規則函數 */
  validateRule?: (inputString: string) => boolean
  /** 測試屬性 */
  dataCy?: string
}

/** BaseMultipleInput 組件 Emits 類型 */
export interface BaseMultipleInputEmits {
  /** 更新模型值事件 */
  (e: 'update:modelValue', val: string[]): void
  /** 輸入錯誤事件 */
  (e: 'inputError'): void
}

/** BaseMultipleInput 組件實例類型 */
export interface BaseMultipleInputInstance {
  /** 組件 Props */
  $props: BaseMultipleInputProps
  /** 組件 Emits */
  $emit: BaseMultipleInputEmits
}

// ==================== 搜尋相關組件類型 ====================

// ==================== SearchBar 組件類型 ====================

/** SearchBar 組件 Props 類型 */
export interface SearchBarProps {
  /** 是否顯示篩選功能 */
  showFilter?: boolean
  /** 是否顯示搜尋功能 */
  showSearch?: boolean
  /** 徽章數值 */
  badgeValue?: number
  /** 篩選抽屜大小 */
  filterDrawerSize?: string
}

/** SearchBar 組件 Emits 類型 */
export interface SearchBarEmits {
  /** 按下 Enter 鍵事件 */
  (e: 'keydown:enter', data: string): void
  /** 清除事件 */
  (e: 'update:clear'): void
  /** 重置篩選事件 */
  (e: 'update:resetFilter'): void
}

/** SearchBar 組件實例類型 */
export interface SearchBarInstance {
  /** 組件 Props */
  $props: SearchBarProps
  /** 組件 Emits */
  $emit: SearchBarEmits
}

/** SearchBar 組件 Slots 類型 */
export interface SearchBarSlots {
  /** 按鈕 slot */
  button: () => VNode[]
  /** 自定義篩選 slot */
  'customer-filter': () => VNode[]
}

// ==================== SearchableListPanel 組件類型 ====================

/** SearchableListPanel 組件 Props 類型 */
export interface SearchableListPanelProps {
  /** 標題 */
  title: string
  /** 分頁資訊 */
  pagination: import('./index').Pager
  /** 是否顯示返回按鈕 */
  showBack?: boolean | string | object
  /** 是否顯示搜尋功能 */
  showSearch?: boolean
  /** 是否顯示編輯功能 */
  showEdit?: boolean
  /** 是否顯示篩選功能 */
  showFilter?: boolean
  /** 是否顯示預設搜尋 */
  showDefaultSearch?: boolean
  /** 測試屬性 */
  dataCy?: string
  /** 徽章數值 */
  badgeValue?: number
  /** 篩選抽屜大小 */
  filterDrawerSize?: string
}

/** SearchableListPanel 組件 Emits 類型 */
export interface SearchableListPanelEmits {
  /** 搜尋事件 */
  (e: 'search', data: string | null): void
  /** 更新頁面事件 */
  (e: 'updatePage', page: number): boolean
  /** 更新頁面大小事件 */
  (e: 'updatePageSize', limit: number): boolean
}

/** SearchableListPanel 組件實例類型 */
export interface SearchableListPanelInstance {
  /** 組件 Props */
  $props: SearchableListPanelProps
  /** 組件 Emits */
  $emit: SearchableListPanelEmits
}

/** SearchableListPanel 組件 Slots 類型 */
export interface SearchableListPanelSlots {
  /** 第一個按鈕 slot */
  firstButton: () => VNode[]
  /** 自定義按鈕 slot */
  customButton: () => VNode[]
  /** 最後一個按鈕 slot */
  lastButton: () => VNode[]
  /** 篩選抽屜內容 slot */
  filterDrawBody: () => VNode[]
  /** 主要內容 slot */
  main: () => VNode[]
}

// ==================== 佈局相關組件類型 ====================

// ==================== FunctionHeader 組件類型 ====================

/** FunctionHeader 組件 Props 類型 */
export interface FunctionHeaderProps {
  /** 標題 */
  title?: string
  /** 是否顯示返回按鈕 */
  showBack?: boolean | string | object
  /** 返回深度 */
  depth?: number
}

/** FunctionHeader 組件 Emits 類型 */
export interface FunctionHeaderEmits {
  /** 返回按鈕點擊事件 */
  (e: 'back', payload: { path?: string; [key: string]: unknown }): void
}

/** FunctionHeader 組件實例類型 */
export interface FunctionHeaderInstance {
  /** 組件 Props */
  $props: FunctionHeaderProps
  /** 組件 Emits */
  $emit: FunctionHeaderEmits
}

// ==================== MainPanel 組件類型 ====================

/** MainPanel 組件 Props 類型 */
export interface MainPanelProps {
  /** 標題 */
  title?: string
  /** 是否顯示返回按鈕 */
  showBack?: boolean | string | object
  /** 返回深度 */
  depth?: number
  /** 最大高度 */
  maxHeight?: string
}

/** MainPanel 組件 Emits 類型 */
export interface MainPanelEmits {
  /** 返回按鈕點擊事件 */
  (e: 'back', payload: { path?: string; [key: string]: unknown }): void
}

/** MainPanel 組件實例類型 */
export interface MainPanelInstance {
  /** 組件 Props */
  $props: MainPanelProps
  /** 組件 Emits */
  $emit: MainPanelEmits
}

// ==================== 轉移相關組件類型 ====================

// ==================== TransferItem 組件類型 ====================

/** TransferItem 組件 Props 類型 */
export interface TransferItemProps<T = Record<string, unknown>> {
  /** 對話框模態可見性 */
  dialogModalVisible: boolean
  /** 列配置值 */
  columnsValue: import('./index').TableColumn<T>
  /** 列索引 */
  columnsIndex: number
  /** 列長度 */
  columnsLen: number
}

/** TransferItem 組件 Emits 類型 */
export interface TransferItemEmits {
  /** 移到頂部事件 */
  (e: 'update:toTop'): void
  /** 移到上一個事件 */
  (e: 'update:toPre'): void
  /** 移到下一個事件 */
  (e: 'update:toNext'): void
  /** 移到底部事件 */
  (e: 'update:toBottom'): void
}

/** TransferItem 組件實例類型 */
export interface TransferItemInstance {
  /** 組件 Props */
  $props: TransferItemProps
  /** 組件 Emits */
  $emit: TransferItemEmits
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
  {},
  BaseTableEmits<any>
> & {
  /** 安裝方法 */
  install: (app: App) => void
}

/** SortTable 組件定義 */
export declare const SortTable: DefineComponent<
  SortTableProps<any>,
  {},
  {},
  {},
  {},
  {},
  {},
  {},
  SortTableEmits<any>
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
  {},
  BaseDialogEmits
> & {
  /** 安裝方法 */
  install: (app: App) => void
}

/** TransferDialog 組件定義 */
export declare const TransferDialog: DefineComponent<
  TransferDialogProps<any>,
  {},
  {},
  {},
  {},
  {},
  {},
  {},
  TransferDialogEmits<any>
> & {
  /** 安裝方法 */
  install: (app: App) => void
}

/** BaseInput 組件定義 */
export declare const BaseInput: DefineComponent<
  BaseInputProps,
  {},
  {},
  {},
  {},
  {},
  {},
  {},
  BaseInputEmits
> & {
  /** 安裝方法 */
  install: (app: App) => void
}

/** BaseForm 組件定義 */
export declare const BaseForm: DefineComponent<
  BaseFormProps,
  {},
  {},
  {},
  {},
  {},
  {},
  {},
  BaseFormEmits
> & {
  /** 安裝方法 */
  install: (app: App) => void
}

/** BaseMultipleInput 組件定義 */
export declare const BaseMultipleInput: DefineComponent<
  BaseMultipleInputProps,
  {},
  {},
  {},
  {},
  {},
  {},
  {},
  BaseMultipleInputEmits
> & {
  /** 安裝方法 */
  install: (app: App) => void
}

/** SearchBar 組件定義 */
export declare const SearchBar: DefineComponent<
  SearchBarProps,
  {},
  {},
  {},
  {},
  {},
  SearchBarSlots,
  {},
  SearchBarEmits
> & {
  /** 安裝方法 */
  install: (app: App) => void
}

/** SearchableListPanel 組件定義 */
export declare const SearchableListPanel: DefineComponent<
  SearchableListPanelProps,
  {},
  {},
  {},
  {},
  {},
  SearchableListPanelSlots,
  {},
  SearchableListPanelEmits
> & {
  /** 安裝方法 */
  install: (app: App) => void
}

/** FunctionHeader 組件定義 */
export declare const FunctionHeader: DefineComponent<
  FunctionHeaderProps,
  {},
  {},
  {},
  {},
  {},
  {},
  {},
  FunctionHeaderEmits
> & {
  /** 安裝方法 */
  install: (app: App) => void
}

/** MainPanel 組件定義 */
export declare const MainPanel: DefineComponent<
  MainPanelProps,
  {},
  {},
  {},
  {},
  {},
  {},
  {},
  MainPanelEmits
> & {
  /** 安裝方法 */
  install: (app: App) => void
}

/** TransferItem 組件定義 */
export declare const TransferItem: DefineComponent<
  TransferItemProps<any>,
  {},
  {},
  {},
  {},
  {},
  {},
  {},
  TransferItemEmits
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
  /** SortTable 組件 */
  SortTable: typeof SortTable
  /** BaseBtn 組件 */
  BaseBtn: typeof BaseBtn
  /** BaseDialog 組件 */
  BaseDialog: typeof BaseDialog
  /** TransferDialog 組件 */
  TransferDialog: typeof TransferDialog
  /** BaseInput 組件 */
  BaseInput: typeof BaseInput
  /** BaseForm 組件 */
  BaseForm: typeof BaseForm
  /** BaseMultipleInput 組件 */
  BaseMultipleInput: typeof BaseMultipleInput
  /** SearchBar 組件 */
  SearchBar: typeof SearchBar
  /** SearchableListPanel 組件 */
  SearchableListPanel: typeof SearchableListPanel
  /** FunctionHeader 組件 */
  FunctionHeader: typeof FunctionHeader
  /** MainPanel 組件 */
  MainPanel: typeof MainPanel
  /** TransferItem 組件 */
  TransferItem: typeof TransferItem
}

// ==================== 全局類型擴展 ====================

declare module '@vue/runtime-core' {
  export interface GlobalComponents {
    BaseTable: typeof BaseTable
    SortTable: typeof SortTable
    BaseBtn: typeof BaseBtn
    BaseDialog: typeof BaseDialog
    TransferDialog: typeof TransferDialog
    BaseInput: typeof BaseInput
    BaseForm: typeof BaseForm
    BaseMultipleInput: typeof BaseMultipleInput
    SearchBar: typeof SearchBar
    SearchableListPanel: typeof SearchableListPanel
    FunctionHeader: typeof FunctionHeader
    MainPanel: typeof MainPanel
    TransferItem: typeof TransferItem
  }
}
