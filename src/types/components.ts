import type { App, VNode } from 'vue'
import type { TableColumnCtx } from 'element-plus'
import type { SortChangValue, TableColumn } from './index'
import type { ElOptions } from './OptionDto'

// Keep event names literal so Vue can extract runtime emits from consumer
// defineEmits<...>() calls. Payload tuples still come from the shared event maps.

// ==================== 表格相關組件類型 ====================

// ==================== BaseTable 組件類型 ====================

/** BaseTable 組件 Props 類型 */
export interface BaseTableProps<T extends Record<string, unknown> = Record<string, unknown>> {
  /** 是否顯示加載狀態 */
  loading?: boolean
  /** 為 true 且不在載入中時，顯示 `error` slot 取代表格；預設 false */
  error?: boolean
  /** 視窗寬度小於此值（px）時，選取欄、序號欄、操作欄不固定。不傳時一律固定（現狀） */
  unfixColumnsBelow?: number
  /** 用來組出每列查看／編輯按鈕的 aria-label，例如「編輯 張小明」 */
  rowLabel?: (row: T) => string
  /** 表格數據 */
  data: T[]
  /** 表格列配置 */
  columns: TableColumn<T>[]
  /** 行資料的 Key（樹形資料與懶加載建議必填） */
  rowKey?: string | ((row: T) => string)
  /** 樹形資料配置 */
  treeProps?: {
    children?: string
    hasChildren?: string
    checkStrictly?: boolean
  }
  /** 是否預設展開所有節點 */
  defaultExpandAll?: boolean
  /** 指定預設展開的行 keys */
  expandRowKeys?: string[]
  /** 是否啟用懶加載子節點 */
  lazy?: boolean
  /** 懶加載函式 */
  load?: (row: T, treeNode: unknown, resolve: (data: T[]) => void) => void
  /** 是否顯示選擇列 */
  showSelection?: boolean
  /** 是否顯示索引列 */
  showIndex?: boolean
  /** 是否顯示匯總行 */
  showSummary?: boolean
  /** 是否顯示溢出提示 */
  showOverFlowTooltip?: boolean
  /** 匯總方法 */
  summaryMethod?: (param: {
    columns: TableColumnCtx<Record<string, unknown>>[]
    data: T[]
  }) => (string | VNode)[]
  /** 行樣式類名 */
  baseTableRowClassName?: (data: { row: T; rowIndex: number }) => string
  /** 是否顯示展開列 */
  showExpand?: boolean
  /** 是否顯示查看按鈕 */
  showCheckBtn?: boolean
  /** 是否顯示編輯按鈕 */
  showEditBtn?: boolean
  /** 是否保留展開內容 */
  preserveExpanded?: boolean
  locale?: import('element-plus/es/locale').Language
}

/** BaseTable 組件 Slots 類型 */
export interface BaseTableSlots<T extends Record<string, unknown> = Record<string, unknown>> {
  /** 展開行內容 slot */
  expand?: (props: { row: T; $index: number }) => VNode[]
  /** 無資料時的內容 slot（取代預設空狀態） */
  empty?: () => unknown
  /** 載入失敗時的內容 slot（取代預設失敗訊息） */
  error?: () => unknown
}

export interface BaseTableEventMap<
  T extends Record<string, unknown> = Record<string, unknown>,
> {
  'selection-change': [selection: T[]]
  'current-change': [currentRow: T]
  'cell-click': [column: TableColumn<T>, row: T]
  'column-sort-change': [value: SortChangValue<T>]
  'click:checkRow': [row: T]
  'click:editRow': [row: T]
}

/** Handler-map shape retained for indexed access compatibility. */
export interface BaseTableEmits<
  T extends Record<string, unknown> = Record<string, unknown>,
> {
  'selection-change': (...args: BaseTableEventMap<T>['selection-change']) => void
  'current-change': (...args: BaseTableEventMap<T>['current-change']) => void
  'cell-click': (...args: BaseTableEventMap<T>['cell-click']) => void
  'column-sort-change': (...args: BaseTableEventMap<T>['column-sort-change']) => void
  'click:checkRow': (...args: BaseTableEventMap<T>['click:checkRow']) => void
  'click:editRow': (...args: BaseTableEventMap<T>['click:editRow']) => void
}

/** 表格透過 ref 開放的 el-table 方法 */
export interface TableExposed<T extends Record<string, unknown> = Record<string, unknown>> {
  clearSelection: () => void
  toggleRowSelection: (row: T, selected?: boolean) => void
  doLayout: () => void
}

/** BaseTable 組件實例類型 */
export interface BaseTableInstance<T extends Record<string, unknown> = Record<string, unknown>> extends TableExposed<T> {
  /** 組件 Props */
  $props: BaseTableProps<T>
  /** 組件 Emits */
  $emit: BaseTableEmits<T>
}

// ==================== SortTable 組件類型 ====================

/** SortTable 組件 Props 類型 */
export interface SortTableProps<T extends Record<string, unknown> = Record<string, unknown>>
  extends BaseTableProps<T> {
  /** 表格標題（保留既有契約） */
  tableTitle?: string
  /** 舊名稱優先於 baseTableRowClassName */
  sortTableRowClassName?: BaseTableProps<T>['baseTableRowClassName']
}

/** SortTable 組件 Slots 類型 */
export interface SortTableSlots<T extends Record<string, unknown> = Record<string, unknown>>
  extends BaseTableSlots<T> {
  /** 第一個按鈕 slot */
  firstButton?: () => VNode[]
}

export interface SortTableEventMap<T extends Record<string, unknown> = Record<string, unknown>> {
  'open:transfer': []
  'click:downloadExcelFile': []
  'update:selectRow': [value: T[]]
  'click:cell': [column: TableColumn<T>, row: T]
  'click:columnSort': [data: SortChangValue<T>]
  'click:checkRow': [row: T]
  'click:editRow': [row: T]
}

export interface SortTableEmits<T extends Record<string, unknown> = Record<string, unknown>> {
  (event: 'open:transfer', ...args: SortTableEventMap<T>['open:transfer']): void
  (event: 'click:downloadExcelFile', ...args: SortTableEventMap<T>['click:downloadExcelFile']): void
  (event: 'update:selectRow', ...args: SortTableEventMap<T>['update:selectRow']): void
  (event: 'click:cell', ...args: SortTableEventMap<T>['click:cell']): void
  (event: 'click:columnSort', ...args: SortTableEventMap<T>['click:columnSort']): void
  (event: 'click:checkRow', ...args: SortTableEventMap<T>['click:checkRow']): void
  (event: 'click:editRow', ...args: SortTableEventMap<T>['click:editRow']): void
}

/** SortTable 組件實例類型 */
export interface SortTableInstance<T extends Record<string, unknown> = Record<string, unknown>> extends TableExposed<T> {
  /** 組件 Props */
  $props: SortTableProps<T>
  /** 組件 Emits */
  $emit: SortTableEmits<T>
}

// ==================== TitleTable 組件類型 ====================

/** TitleTable 組件 Props 類型 */
export interface TitleTableProps<T extends Record<string, unknown> = Record<string, unknown>>
  extends BaseTableProps<T> {
  /** 表格標題 */
  tableTitle?: string
  /** 是否可編輯（顯示新增/刪除按鈕，並啟用選取） */
  propIsEditable?: boolean
  /** 是否只顯示刪除按鈕 */
  onlyDelete?: boolean
  /** 是否顯示刪除按鈕 */
  showDelete?: boolean
}

/** TitleTable 組件 Slots 類型 */
export interface TitleTableSlots<T extends Record<string, unknown> = Record<string, unknown>>
  extends BaseTableSlots<T> {
  /** 搜尋 slot */
  tableSearch?: () => VNode[]
  /** 編輯按鈕 slot */
  editBtn?: () => VNode[]
}

export interface TitleTableEventMap<
  T extends Record<string, unknown> = Record<string, unknown>,
> {
  'click:add': []
  'click:delete': []
  'update:selectRow': [value: T[]]
  'click:cell': [column: TableColumn<T>, row: T]
  'click:checkRow': [row: T]
  'click:editRow': [row: T]
}

export interface TitleTableEmits<T extends Record<string, unknown> = Record<string, unknown>> {
  (event: 'click:add', ...args: TitleTableEventMap<T>['click:add']): void
  (event: 'click:delete', ...args: TitleTableEventMap<T>['click:delete']): void
  (event: 'update:selectRow', ...args: TitleTableEventMap<T>['update:selectRow']): void
  (event: 'click:cell', ...args: TitleTableEventMap<T>['click:cell']): void
  (event: 'click:checkRow', ...args: TitleTableEventMap<T>['click:checkRow']): void
  (event: 'click:editRow', ...args: TitleTableEventMap<T>['click:editRow']): void
}

/** TitleTable 組件實例類型 */
export interface TitleTableInstance<T extends Record<string, unknown> = Record<string, unknown>> extends TableExposed<T> {
  /** 組件 Props */
  $props: TitleTableProps<T>
  /** 組件 Emits */
  $emit: TitleTableEmits<T>
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
}

export interface BaseBtnEventMap {
  click: [evt: MouseEvent]
}

export interface BaseBtnEmits {
  (event: 'click', ...args: BaseBtnEventMap['click']): void
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
  /** 明確指定對話框寬度；優先於響應式預設 */
  customWidth?: string
  /** 是否為警告對話框 */
  isWaring?: boolean
  /** 是否為主要對話框 */
  isPrimary?: boolean
  /** 內容區域加載狀態 */
  bodyLoading?: boolean
  /** 提交按鈕加載狀態 */
  submitLoading?: boolean
  /** 是否顯示關閉按鈕 */
  showClose?: boolean
  /** 確認鈕改用 danger 色，並讓取消鈕取得初始焦點 */
  dangerSubmit?: boolean
}

export interface BaseDialogEventMap {
  'update:modelValue': [data: boolean]
  'click:submit': []
}

/** Callable shape retained for existing consumer code. */
export interface BaseDialogEmits {
  (event: 'update:modelValue', ...args: BaseDialogEventMap['update:modelValue']): void
  (event: 'click:submit', ...args: BaseDialogEventMap['click:submit']): void
}

/** BaseDialog 組件實例類型 */
export interface BaseDialogInstance {
  /** 組件 Props */
  $props: BaseDialogProps
  /** 組件 Emits */
  $emit: BaseDialogEmits
}

// ==================== BaseWaringDialog 組件類型 ====================

/** BaseWaringDialog 組件 Props 類型 */
export interface BaseWaringDialogProps {
  /** 是否顯示對話框 */
  modelValue: boolean
  /** 警告文字 */
  waringText?: string
  /** 副警告文字 */
  subWaringText?: string
  /** 標題文字 */
  titleText?: string
  /** 確認鈕改用 danger 色，並讓取消鈕取得初始焦點 */
  dangerSubmit?: boolean
}

export interface BaseWaringDialogEventMap {
  'update:modelValue': [value: boolean]
  'update:submit': []
}

export interface BaseWaringDialogEmits {
  (event: 'update:modelValue', ...args: BaseWaringDialogEventMap['update:modelValue']): void
  (event: 'update:submit', ...args: BaseWaringDialogEventMap['update:submit']): void
}

/** BaseWaringDialog 組件實例類型 */
export interface BaseWaringDialogInstance {
  /** 組件 Props */
  $props: BaseWaringDialogProps
  /** 組件 Emits */
  $emit: BaseWaringDialogEmits
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

export interface TransferDialogEventMap<T = Record<string, unknown>> {
  'update:modelValue': [value: boolean]
  'update:submit': [data: TableColumn<T>[]]
  'update:checkChange': [data: { columns: TableColumn<T>[]; checkList: string[] }]
}

export interface TransferDialogEmits<T = Record<string, unknown>> {
  (event: 'update:modelValue', ...args: TransferDialogEventMap<T>['update:modelValue']): void
  (event: 'update:submit', ...args: TransferDialogEventMap<T>['update:submit']): void
  (event: 'update:checkChange', ...args: TransferDialogEventMap<T>['update:checkChange']): void
}

/** TransferDialog 組件實例類型 */
export interface TransferDialogInstance<T = Record<string, unknown>> {
  /** 組件 Props */
  $props: TransferDialogProps<T>
  /** 組件 Emits */
  $emit: TransferDialogEmits<T>
}

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
  showSearch?: boolean
}

export interface BaseInputEventMap {
  'update:modelValue': [data: string | number | undefined | null]
  'update:clearValue': []
}

export interface BaseInputEmits {
  (event: 'update:modelValue', ...args: BaseInputEventMap['update:modelValue']): void
  (event: 'update:clearValue', ...args: BaseInputEventMap['update:clearValue']): void
}

/** BaseInput 組件實例類型 */
export interface BaseInputInstance {
  /** 組件 Props */
  $props: BaseInputProps
  /** 組件 Emits */
  $emit: BaseInputEmits
}

// ==================== BaseSelector 組件類型 ====================

/** BaseSelector 組件 Props 類型 */
export interface BaseSelectorProps {
  /** 模型值 */
  modelValue?: string | string[] | null
  /** 選項數據 */
  options?: ElOptions[]
  /** 佔位符 */
  placeholder?: string
  /** 是否折疊標籤 */
  collapseTags?: boolean
  /** 是否顯示折疊標籤提示 */
  collapseTagsTooltip?: boolean
  /** 是否多選 */
  multiple?: boolean
  /** 是否禁用 */
  disabled?: boolean
  /** 自定義 CSS 類名 */
  class?: string
}

export interface BaseSelectorEventMap {
  'update:modelValue': [value?: string | string[] | null]
}

/** Handler-map shape retained for existing indexed access. */
export interface BaseSelectorEmits {
  'update:modelValue': (value?: Exclude<BaseSelectorEventMap['update:modelValue'][0], null>) => void
}

/** BaseSelector 組件實例類型 */
export interface BaseSelectorInstance {
  /** 組件 Props */
  $props: BaseSelectorProps
  /** 組件 Emits */
  $emit: BaseSelectorEmits
}

// ==================== 搜尋相關組件類型 ====================

// ==================== SearchBar 組件類型 ====================

/** SearchBar 組件 Props 類型 */
export interface SearchBarProps {
  /** 是否顯示搜尋功能 */
  showSearch?: boolean
  /** 輸入後延遲 searchDelay 毫秒自動觸發 keydown:enter；預設 false */
  searchOnInput?: boolean
  /** searchOnInput 的延遲毫秒數；預設 300 */
  searchDelay?: number
}

export interface SearchBarEventMap {
  'keydown:enter': [data: string]
  'update:clear': []
  'update:resetFilter': []
}

export interface SearchBarEmits {
  (event: 'keydown:enter', ...args: SearchBarEventMap['keydown:enter']): void
  (event: 'update:clear', ...args: SearchBarEventMap['update:clear']): void
  (event: 'update:resetFilter', ...args: SearchBarEventMap['update:resetFilter']): void
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
  customerFilter: () => VNode[]
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
  /** 分頁大小選項列表 */
  pageSizeList?: number[]
  /** 是否顯示分頁 */
  showPagination?: boolean
  /** el-pagination 的 layout，預設 `'prev, pager, next, total, sizes, jumper'` */
  paginationLayout?: string
  /** 視窗寬度小於此值（px）時 layout 改為 `'prev, pager, next'`；不傳時不切換 */
  compactPaginationBelow?: number
  /** Element Plus 語系設定 */
  locale?: import('element-plus/es/locale').Language
}

export interface SearchableListPanelEventMap {
  search: [data: string | null]
  updatePage: [page: number]
  updatePageSize: [limit: number]
  'click:back': [payload: FunctionHeaderEventMap['back'][0]]
}

export interface SearchableListPanelEmits {
  (event: 'search', ...args: SearchableListPanelEventMap['search']): void
  (event: 'updatePage', ...args: SearchableListPanelEventMap['updatePage']): boolean
  (event: 'updatePageSize', ...args: SearchableListPanelEventMap['updatePageSize']): boolean
  (event: 'click:back', ...args: SearchableListPanelEventMap['click:back']): void
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
  /** 篩選按鈕 slot */
  filterButton: () => VNode[]
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
  /** 歷史相容欄位，目前不影響返回行為或 payload */
  depth?: number
}

export interface FunctionHeaderEventMap {
  back: [payload: { path?: string; [key: string]: unknown }]
}

export interface FunctionHeaderEmits {
  (event: 'back', ...args: FunctionHeaderEventMap['back']): void
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
  /** 歷史相容欄位，目前不影響返回行為或 payload */
  depth?: number
}

export interface MainPanelEventMap {
  'click:back': [payload: FunctionHeaderEventMap['back'][0]]
}

export interface MainPanelEmits {
  (event: 'click:back', ...args: MainPanelEventMap['click:back']): void
}

/** MainPanel 組件實例類型 */
export interface MainPanelInstance {
  /** 組件 Props */
  $props: MainPanelProps
  /** 組件 Emits */
  $emit: MainPanelEmits
}

// ==================== DetailLayout 組件類型 ====================

/** DetailLayout 組件 Props 類型 */
export interface DetailLayoutProps {
  /** 標題 */
  title: string
  /** 是否顯示返回按鈕 */
  showBack?: boolean | string | object
  /** 是否可編輯 */
  isEditable: boolean
  /** 頁面加載狀態 */
  pageLoading?: boolean
}

export interface DetailLayoutEventMap {
  'update:saveEdit': [value: boolean]
  'update:cancelEdit': []
  'click:back': [payload: FunctionHeaderEventMap['back'][0]]
}

export interface DetailLayoutEmits {
  (event: 'update:saveEdit', ...args: DetailLayoutEventMap['update:saveEdit']): void
  (event: 'update:cancelEdit', ...args: DetailLayoutEventMap['update:cancelEdit']): void
  (event: 'click:back', ...args: DetailLayoutEventMap['click:back']): void
}

/** DetailLayout 組件實例類型 */
export interface DetailLayoutInstance {
  /** 組件 Props */
  $props: DetailLayoutProps
  /** 組件 Emits */
  $emit: DetailLayoutEmits
}

// ==================== FilterLayout 組件類型 ====================

/** FilterLayout 組件 Props 類型 */
export interface FilterLayoutProps {
  /** 標題 */
  mainTitle: string
  /** 是否顯示返回按鈕 */
  showBack?: boolean | string | object
  /** 篩選標題 */
  filterTitle: string
}

export interface FilterLayoutEventMap {
  submitEmit: []
  resetEmit: []
  'click:back': [payload: FunctionHeaderEventMap['back'][0]]
}

export interface FilterLayoutEmits {
  (event: 'submitEmit', ...args: FilterLayoutEventMap['submitEmit']): void
  (event: 'resetEmit', ...args: FilterLayoutEventMap['resetEmit']): void
  (event: 'click:back', ...args: FilterLayoutEventMap['click:back']): void
}

/** FilterLayout 組件實例類型 */
export interface FilterLayoutInstance {
  /** 組件 Props */
  $props: FilterLayoutProps
  /** 組件 Emits */
  $emit: FilterLayoutEmits
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
  /** 是否顯示抓取游標；預設 true（相容）。TransferDialog 的預設清單不能拖曳，會傳 false */
  draggable?: boolean
}

export interface TransferItemEventMap {
  'update:toUnLock': []
  'update:toLock': []
  'update:toTop': []
  'update:toPre': []
  'update:toNext': []
  'update:toBottom': []
}

export interface TransferItemEmits {
  (event: 'update:toUnLock', ...args: TransferItemEventMap['update:toUnLock']): void
  (event: 'update:toLock', ...args: TransferItemEventMap['update:toLock']): void
  (event: 'update:toTop', ...args: TransferItemEventMap['update:toTop']): void
  (event: 'update:toPre', ...args: TransferItemEventMap['update:toPre']): void
  (event: 'update:toNext', ...args: TransferItemEventMap['update:toNext']): void
  (event: 'update:toBottom', ...args: TransferItemEventMap['update:toBottom']): void
}

/** TransferItem 組件實例類型 */
export interface TransferItemInstance {
  /** 組件 Props */
  $props: TransferItemProps
  /** 組件 Emits */
  $emit: TransferItemEmits
}

// ==================== 組件定義類型 ====================

/** Component values are derived from the implementation declarations. */
export declare const BaseTable: typeof import('../components/tables/BaseTable.vue')['default'] & { install: (app: App) => void }

export declare const SortTable: typeof import('../components/tables/SortTable.vue')['default'] & { install: (app: App) => void }

/** TitleTable 組件定義 */
export declare const TitleTable: typeof import('../components/tables/TitleTable.vue')['default'] & { install: (app: App) => void }

/** BaseBtn 組件定義 */
export declare const BaseBtn: typeof import('../components/items/BaseBtn.vue')['default'] & { install: (app: App) => void }

/** BaseDialog 組件定義 */
export declare const BaseDialog: typeof import('../components/items/BaseDialog.vue')['default'] & { install: (app: App) => void }

/** BaseWaringDialog 組件定義 */
export declare const BaseWaringDialog: typeof import('../components/items/BaseWaringDialog.vue')['default'] & { install: (app: App) => void }

/** TransferDialog 組件定義 */
export declare const TransferDialog: typeof import('../components/transfer/TransferDialog.vue')['default'] & { install: (app: App) => void }

/** BaseInput 組件定義 */
export declare const BaseInput: typeof import('../components/form/BaseInput.vue')['default'] & { install: (app: App) => void }

/** BaseSelector 組件定義 */
export declare const BaseSelector: typeof import('../components/form/BaseSelector.vue')['default'] & { install: (app: App) => void }

/** SearchBar 組件定義 */
export declare const SearchBar: typeof import('../components/items/SearchBar.vue')['default'] & { install: (app: App) => void }

/** SearchableListPanel 組件定義 */
export declare const SearchableListPanel: typeof import('../components/layout/SearchableListPanel.vue')['default'] & { install: (app: App) => void }

/** FunctionHeader 組件定義 */
export declare const FunctionHeader: typeof import('../components/layout/FunctionHeader.vue')['default'] & { install: (app: App) => void }

/** MainPanel 組件定義 */
export declare const MainPanel: typeof import('../components/layout/MainPanel.vue')['default'] & { install: (app: App) => void }

/** DetailLayout 組件定義 */
export declare const DetailLayout: typeof import('../components/layout/DetailLayout.vue')['default'] & { install: (app: App) => void }

/** FilterLayout 組件定義 */
export declare const FilterLayout: typeof import('../components/layout/FilterLayout.vue')['default'] & { install: (app: App) => void }

/** TransferItem 組件定義 */
export declare const TransferItem: typeof import('../components/transfer/transferItem.vue')['default'] & { install: (app: App) => void }

// ==================== 插件類型 ====================

/** 插件安裝選項 */
export interface PluginOptions {
  /** 是否自動導入樣式 */
  autoImportStyles?: boolean
  /** 自定義前綴 */
  prefix?: string
  /**
   * Legacy standalone composer locale.
   * @deprecated Component text follows the host vue-i18n instance.
   */
  locale?: string
}

/** 插件實例類型 */
export interface VueTableComponentsPlugin {
  /** 安裝方法 */
  install: (app: App, options?: PluginOptions) => void
  /** BaseTable 組件 */
  BaseTable: typeof BaseTable
  /** SortTable 組件 */
  SortTable: typeof SortTable
  /** TitleTable 組件 */
  TitleTable: typeof TitleTable
  /** BaseBtn 組件 */
  BaseBtn: typeof BaseBtn
  /** BaseDialog 組件 */
  BaseDialog: typeof BaseDialog
  /** BaseWaringDialog 組件 */
  BaseWaringDialog: typeof BaseWaringDialog
  /** TransferDialog 組件 */
  TransferDialog: typeof TransferDialog
  /** BaseInput 組件 */
  BaseInput: typeof BaseInput
  /** BaseSelector 組件 */
  BaseSelector: typeof BaseSelector
  /** SearchBar 組件 */
  SearchBar: typeof SearchBar
  /** SearchableListPanel 組件 */
  SearchableListPanel: typeof SearchableListPanel
  /** FunctionHeader 組件 */
  FunctionHeader: typeof FunctionHeader
  /** MainPanel 組件 */
  MainPanel: typeof MainPanel
  /** DetailLayout 組件 */
  DetailLayout: typeof DetailLayout
  /** FilterLayout 組件 */
  FilterLayout: typeof FilterLayout
  /** TransferItem 組件 */
  TransferItem: typeof TransferItem
}

// ==================== 全局類型擴展 ====================

declare module '@vue/runtime-core' {
  export interface GlobalComponents {
    BaseTable: typeof BaseTable
    SortTable: typeof SortTable
    TitleTable: typeof TitleTable
    BaseBtn: typeof BaseBtn
    BaseDialog: typeof BaseDialog
    BaseWaringDialog: typeof BaseWaringDialog
    TransferDialog: typeof TransferDialog
    BaseInput: typeof BaseInput
    BaseSelector: typeof BaseSelector
    SearchBar: typeof SearchBar
    SearchableListPanel: typeof SearchableListPanel
    FunctionHeader: typeof FunctionHeader
    MainPanel: typeof MainPanel
    DetailLayout: typeof DetailLayout
    FilterLayout: typeof FilterLayout
    TransferItem: typeof TransferItem
  }
}

export interface BaseDialogSlots {
  default?: () => VNode[]
  customHeader?: () => VNode[]
  customFooter?: () => VNode[]
}

export interface BaseBtnSlots {
  default?: () => VNode[]
}

export interface BaseWaringDialogSlots {
  default?: () => VNode[]
}

export interface FunctionHeaderSlots {
  default?: () => VNode[]
}

export interface MainPanelSlots {
  searchBar?: () => VNode[]
  main?: () => VNode[]
  footer?: () => VNode[]
}

export interface DetailLayoutSlots {
  detailHeader?: () => VNode[]
  main?: () => VNode[]
}

export interface FilterLayoutSlots {
  default?: () => VNode[]
}

export interface TransferDialogSlots<T = Record<string, unknown>> {
  'list-container'?: (props: {
    columns: TableColumn<T>[]
    clickItemProp: string
    handleItemEvents: TransferColumnActions
    handleMousedown: (prop: string) => void
    handleReorder: (columns: TableColumn<T>[]) => void
  }) => VNode[]
}

export interface TransferColumnActions {
  toTop: (index: number) => void
  toBottom: (index: number) => void
  toPre: (index: number) => void
  toNext: (index: number) => void
  toLock: (index: number) => void
  toUnLock: (index: number) => void
}
