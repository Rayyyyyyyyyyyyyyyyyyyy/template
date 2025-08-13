import type { VNode } from 'vue'
import type { TableColumnCtx } from 'element-plus'

/** 表格排序變更值 */
export type SortChangValue<T extends Record<string, unknown>> = {
  column: TableColumnCtx<T>[]
  order: string
  prop: string
}

/** 表格列表請求參數 */
export type TableListReq = {
  /** 頁數 */
  page?: number
  /** 每頁筆數 */
  limit?: number
  /** 排序條件 */
  sort?: string
  /** 查詢條件 */
  where?: string
  /** 關鍵字 */
  keyword?: string
}

/** 分頁資訊 */
export interface Pager {
  /** 總筆數 */
  totalCount: number
  /** 每頁筆數 */
  limit: number
  /** 目前頁數 */
  page: number
}

/** 選單項目類型 */
export interface MenuItemType {
  /** 索引 */
  index: string
  /** 路由 */
  route?: string
  /** 標題 */
  title: string
  /** 圖示 */
  icon?: string
  /** 子選單 */
  children: ChildrenMenu[]
}
export interface ChildrenMenu {
  route: string
  title: string
  id: string
  keyCode: string
  isMock: boolean
}

/** QR Code 掃描結果 */
export interface QRCodeResult {
  /** 發票號碼 */
  invoiceNumber: string
  /** 日期 */
  date: string
  /** 隨機碼 */
  randomCode: string
  /** 銷售金額 */
  salesAmount: number
  /** 總金額 */
  totalAmount: number
  /** 買方統編 */
  buyerGUINumber: string
  /** 賣方統編 */
  sellerGUINumber: string
  /** 加密驗證碼 */
  encryptCode: string
}

/** 表格欄位設定 */
export interface TableColumn<T = Record<string, unknown>> {
  /** 屬性名稱 */
  prop?: string
  /** 欄位標題 */
  label: string
  /** 欄位寬度 */
  width?: number | string
  /** 欄位類型 */
  type?: 'selection' | 'index' | 'expand'
  /** 固定位置 */
  fixed?: boolean | 'left' | 'right'
  /** 對齊方式 */
  align?: 'center' | 'left' | 'right'
  /** 是否可排序 */
  sortable?: boolean | 'custom'
  /** 格式化函數 */
  formatter?: (row: T) => string
  /** 自定義模板 */
  template?: (row: T) => VNode
  /** 最小寬度 */
  minWidth?: number | string
  /** 標題對齊方式 */
  headerAlign?: 'center' | 'left' | 'right'
  /** 是否勾選啟用 */
  checkActive?: boolean
}
