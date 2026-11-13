export interface ApiRow {
  name: string
  type: string
  default: string
  description: string
}

export interface ApiComponent {
  name: string
  note?: string
  props: ApiRow[]
  events: ApiRow[]
  slots: ApiRow[]
}

const row = (name: string, type: string, defaultValue: string, description: string): ApiRow => ({
  name, type, default: defaultValue, description,
})

export const apiReference: ApiComponent[] = [
  {
    name: 'BaseTable',
    props: [
      row('loading', 'boolean', 'false', '是否顯示加載狀態'),
      row('error', 'boolean', 'false', '為 true 且不在載入中時，顯示 error slot 取代表格'),
      row('unfixColumnsBelow', 'number', '—', '視窗寬度小於此值（px）時，選取欄、序號欄、操作欄不固定；不傳時一律固定'),
      row('rowLabel', '(row: T) => string', '—', '組出每列查看／編輯按鈕的 aria-label，例如「編輯 張小明」'),
      row('data', 'T[]', '[]', '表格數據；型別上必填，元件預設為 () => []'),
      row('columns', 'TableColumn<T>[]', '必填', '表格列配置'),
      row('rowKey', 'string | ((row: T) => string)', '—', '行資料的 Key（樹形資料與懶加載建議必填）'),
      row('treeProps', '{ children?, hasChildren?, checkStrictly? }', '{ children: \'children\', hasChildren: \'hasChildren\' }', '樹形資料配置'),
      row('defaultExpandAll', 'boolean', 'false', '是否預設展開所有節點'),
      row('expandRowKeys', 'string[]', '—', '指定預設展開的行 keys'),
      row('lazy', 'boolean', 'false', '是否啟用懶加載子節點'),
      row('load', '(row, treeNode, resolve) => void', '—', '懶加載函式'),
      row('showSelection', 'boolean', 'false', '是否顯示選擇列'),
      row('showIndex', 'boolean', 'false', '是否顯示索引列'),
      row('showSummary', 'boolean', 'false', '是否顯示匯總行'),
      row('showOverFlowTooltip', 'boolean', 'false', '是否顯示溢出提示'),
      row('summaryMethod', '(param) => (string | VNode)[]', '() => []', '匯總方法'),
      row('baseTableRowClassName', '(data: { row, rowIndex }) => string', '() => \'\'', '行樣式類名'),
      row('showExpand', 'boolean', 'false', '是否顯示展開列'),
      row('showCheckBtn', 'boolean', 'false', '是否顯示查看按鈕'),
      row('showEditBtn', 'boolean', 'false', '是否顯示編輯按鈕'),
      row('preserveExpanded', 'boolean', 'false', '是否保留展開內容'),
      row('locale', 'Language', '—', 'Element Plus 語系設定'),
    ],
    events: [
      row('selection-change', '[selection: T[]]', '—', '選取列變更'),
      row('current-change', '[currentRow: T]', '—', '目前列變更'),
      row('cell-click', '[column: TableColumn<T>, row: T]', '—', '點擊儲存格'),
      row('column-sort-change', '[value: SortChangValue<T>]', '—', '欄位排序變更'),
      row('click:checkRow', '[row: T]', '—', '點擊查看按鈕'),
      row('click:editRow', '[row: T]', '—', '點擊編輯按鈕'),
    ],
    slots: [
      row('expand', '(props: { row: T; $index: number }) => VNode[]', '—', '展開行內容'),
      row('empty', '() => unknown', '預設空狀態', '無資料時的內容'),
      row('error', '() => unknown', '預設失敗訊息', '載入失敗時的內容'),
    ],
  },
  {
    name: 'SortTable',
    note: '其餘 props、slots 同 BaseTable。',
    props: [
      row('tableTitle', 'string', '—', '表格標題'),
      row('sortTableRowClassName', "BaseTableProps<T>['baseTableRowClassName']", '—', '舊名稱，優先於 baseTableRowClassName'),
      row('showSettings', 'boolean', 'true', '是否顯示設定欄位按鈕'),
      row('showExport', 'boolean', 'true', '是否顯示匯出 Excel 按鈕'),
    ],
    events: [
      row('open:transfer', '[]', '—', '開啟欄位設定'),
      row('click:downloadExcelFile', '[]', '—', '點擊匯出 Excel'),
      row('update:selectRow', '[value: T[]]', '—', '選取列變更'),
      row('click:cell', '[column: TableColumn<T>, row: T]', '—', '點擊儲存格'),
      row('click:columnSort', '[data: SortChangValue<T>]', '—', '欄位排序變更'),
      row('click:checkRow', '[row: T]', '—', '點擊查看按鈕'),
      row('click:editRow', '[row: T]', '—', '點擊編輯按鈕'),
    ],
    slots: [
      row('firstButton', '() => VNode[]', '—', '第一個按鈕'),
    ],
  },
  {
    name: 'BaseDialog',
    props: [
      row('modelValue', 'boolean', '必填', '是否顯示對話框'),
      row('title', 'string', '—', '對話框標題'),
      row('subTitle', 'string', '—', '副標題'),
      row('beforeClose', '() => void', '—', '關閉前回調'),
      row('customWidth', 'string', '—', '明確指定對話框寬度；優先於響應式預設'),
      row('isWarning', 'boolean', 'false', '是否為警告對話框'),
      row('isPrimary', 'boolean', 'false', '是否為主要對話框'),
      row('bodyLoading', 'boolean', 'false', '內容區域加載狀態'),
      row('submitLoading', 'boolean', 'false', '提交按鈕加載狀態'),
      row('showClose', 'boolean', 'false', '是否顯示關閉按鈕'),
      row('dangerSubmit', 'boolean', 'false', '確認鈕改用 danger 色，並讓取消鈕取得初始焦點'),
    ],
    events: [
      row('update:modelValue', '[data: boolean]', '—', '顯示狀態變更'),
      row('click:submit', '[]', '—', '點擊確認鈕'),
    ],
    slots: [
      row('default', '—', '—', '內容區域'),
      row('customHeader', '—', '預設標題', '自訂標題區'),
      row('customFooter', '—', '預設按鈕', '自訂頁尾'),
    ],
  },
  {
    name: 'SearchableListPanel',
    props: [
      row('title', 'string', '必填', '標題'),
      row('pagination', 'Pager', '必填', '分頁資訊'),
      row('showBack', 'boolean | string | object', 'false', '是否顯示返回按鈕'),
      row('showSearch', 'boolean', 'false', '是否顯示搜尋功能'),
      row('pageSizeList', 'number[]', '[10, 25, 50, 100, 200]', '分頁大小選項列表'),
      row('showPagination', 'boolean', '—', '是否顯示分頁'),
      row('paginationLayout', 'string', "'prev, pager, next, total, sizes, jumper'", 'el-pagination 的 layout'),
      row('compactPaginationBelow', 'number', '—', "視窗寬度小於此值（px）時 layout 改為 'prev, pager, next'；不傳時不切換"),
      row('locale', 'Language', '—', 'Element Plus 語系設定'),
    ],
    events: [
      row('search', '[data: string | null]', '—', '觸發搜尋'),
      row('updatePage', '[page: number]', '—', '頁碼變更'),
      row('updatePageSize', '[limit: number]', '—', '每頁筆數變更'),
      row('click:back', '[payload]', '—', '點擊返回'),
    ],
    slots: [
      row('firstButton', '() => VNode[]', '—', '第一個按鈕'),
      row('customButton', '() => VNode[]', '—', '自定義按鈕'),
      row('lastButton', '() => VNode[]', '—', '最後一個按鈕'),
      row('filterButton', '() => VNode[]', '—', '篩選按鈕'),
      row('main', '() => VNode[]', '—', '主要內容'),
    ],
  },
  {
    name: 'TransferDialog',
    props: [
      row('modelValue', 'boolean', '必填', '是否顯示對話框'),
      row('columnsValue', 'TableColumn<T>[]', '必填', '列配置值'),
      row('transferTitle', 'string', '必填', '轉移對話框標題'),
    ],
    events: [
      row('update:modelValue', '[value: boolean]', '—', '顯示狀態變更'),
      row('update:submit', '[data: TableColumn<T>[]]', '—', '提交欄位設定'),
      row('update:checkChange', '[data: { columns, checkList }]', '—', '勾選變更'),
    ],
    slots: [
      row('list-container', 'scoped（columns、click-item-prop、handle-item-events、handle-reorder、handle-mousedown）', '預設清單', '自訂列表容器，可選擇是否使用 draggable'),
    ],
  },
]
