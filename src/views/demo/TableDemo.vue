<script setup lang="ts">
import { ref, reactive } from 'vue'
import { SortTable, TitleTable } from '@/components'
import type { TableColumn } from '@/types'
import { h } from 'vue'

// ==================== 數據定義 ====================
interface TableDataItem {
  id: number
  name: string
  age: number
  score: number
  department: string
  createTime: string
  status: 'active' | 'inactive'
}

interface TreeTableItem extends Record<string, unknown> {
  id: string
  name: string
  department: string
  role: string
  hasChildren?: boolean
  children?: TreeTableItem[]
}

// 表格數據
const tableData = ref<TableDataItem[]>([
  {
    id: 1,
    name: '張三',
    age: 25,
    score: 85,
    department: '技術部',
    createTime: '2024-01-15',
    status: 'active',
  },
  {
    id: 2,
    name: '李四',
    age: 30,
    score: 92,
    department: '產品部',
    createTime: '2024-01-16',
    status: 'active',
  },
  {
    id: 3,
    name: '王五',
    age: 28,
    score: 78,
    department: '設計部',
    createTime: '2024-01-17',
    status: 'inactive',
  },
  {
    id: 4,
    name: '趙六',
    age: 35,
    score: 88,
    department: '技術部',
    createTime: '2024-01-18',
    status: 'active',
  },
  {
    id: 5,
    name: '錢七',
    age: 22,
    score: 95,
    department: '產品部',
    createTime: '2024-01-19',
    status: 'active',
  },
  {
    id: 6,
    name: '孫八',
    age: 26,
    score: 82,
    department: '設計部',
    createTime: '2024-01-20',
    status: 'inactive',
  },
  {
    id: 7,
    name: '周九',
    age: 31,
    score: 90,
    department: '技術部',
    createTime: '2024-01-21',
    status: 'active',
  },
  {
    id: 8,
    name: '吳十',
    age: 29,
    score: 76,
    department: '產品部',
    createTime: '2024-01-22',
    status: 'inactive',
  },
])

// 表格列配置
const tableColumns = ref<TableColumn<TableDataItem>[]>([
  { prop: 'id', label: 'ID', width: 80, sortable: true, align: 'center' },
  { prop: 'name', label: '姓名', width: 120, sortable: true, align: 'left' },
  { prop: 'age', label: '年齡', width: 80, sortable: true, align: 'center' },
  { prop: 'score', label: '分數', width: 100, sortable: true, align: 'center' },
  { prop: 'department', label: '部門', width: 120, sortable: true, align: 'center' },
  {
    prop: 'status',
    label: '狀態',
    width: 100,
    align: 'center',
    template: (row: TableDataItem) => {
      const statusConfig =
        row.status === 'active'
          ? { class: 'text-green-600', text: '啟用' }
          : { class: 'text-red-600', text: '停用' }
      return h('span', { class: statusConfig.class }, statusConfig.text)
    },
  },
  { prop: 'createTime', label: '創建時間', width: 150, sortable: true, align: 'center' },
])

const treeTableData = ref<TreeTableItem[]>([
  {
    id: 'dept-tech',
    name: '技術部',
    department: '技術部',
    role: '部門',
    children: [
      { id: 'u-101', name: '林工程師', department: '技術部', role: '前端工程師' },
      { id: 'u-102', name: '郭工程師', department: '技術部', role: '後端工程師' },
    ],
  },
  {
    id: 'dept-product',
    name: '產品部',
    department: '產品部',
    role: '部門',
    hasChildren: true,
  },
  {
    id: 'dept-design',
    name: '設計部',
    department: '設計部',
    role: '部門',
    hasChildren: true,
  },
])

const treeTableColumns = ref<TableColumn<TreeTableItem>[]>([
  { prop: 'name', label: '名稱', minWidth: 180 },
  { prop: 'department', label: '部門', minWidth: 140, align: 'center' },
  { prop: 'role', label: '角色', minWidth: 140, align: 'center' },
])

const lazyChildrenMap: Record<string, TreeTableItem[]> = {
  'dept-product': [
    { id: 'u-201', name: '蔡產品', department: '產品部', role: 'PM' },
    { id: 'u-202', name: '何產品', department: '產品部', role: 'PO' },
  ],
  'dept-design': [
    { id: 'u-301', name: '黃設計', department: '設計部', role: 'UI 設計師' },
    { id: 'u-302', name: '陳設計', department: '設計部', role: 'UX 設計師' },
  ],
}

// 組件狀態
const state = reactive({
  loading: false,
  multiSort: false,
  showIndex: true,
  showExpand: true,
  preserveExpanded: true,
  selectedRows: [] as TableDataItem[],
})

// ==================== SortTable 事件處理 ====================
const handleSortTableTransfer = () => {
  console.log('SortTable 打開轉移對話框')
}

const handleSortTableSelectRow = (selectList: TableDataItem[]) => {
  console.log('SortTable 選擇行變更:', selectList)
  state.selectedRows = selectList
}

const handleSortTableCellClick = (column: TableColumn<TableDataItem>, row: TableDataItem) => {
  console.log('SortTable 單元格點擊:', column, row)
}

const handleSortTableColumnSort = (data: any) => {
  console.log('SortTable 列排序點擊:', data)
}

const handleSortTableCheckRow = (row: TableDataItem) => {
  console.log('SortTable 查看按鈕點擊:', row)
}

const handleSortTableEditRow = (row: TableDataItem) => {
  console.log('SortTable 編輯按鈕點擊:', row)
}

// ==================== TitleTable 事件處理 ====================
const handleTitleTableAdd = () => {
  console.log('TitleTable 新增按鈕點擊')
}

const handleTitleTableDelete = () => {
  console.log('TitleTable 刪除按鈕點擊')
}

const handleTitleTableSelectRow = (selectList: TableDataItem[]) => {
  console.log('TitleTable 選擇行變更:', selectList)
  state.selectedRows = selectList
}

const handleTitleTableCellClick = (column: TableColumn<TableDataItem>, row: TableDataItem) => {
  console.log('TitleTable 單元格點擊:', column, row)
}

const handleTitleTableCheckRow = (row: TableDataItem) => {
  console.log('TitleTable 查看按鈕點擊:', row)
}

const handleTitleTableEditRow = (row: TableDataItem) => {
  console.log('TitleTable 編輯按鈕點擊:', row)
}

const loadTreeChildren = (
  row: TreeTableItem,
  _treeNode: unknown,
  resolve: (data: TreeTableItem[]) => void,
) => {
  setTimeout(() => {
    resolve(lazyChildrenMap[row.id] ?? [])
  }, 500)
}

const getTreeRowClassName = (data: { row: TreeTableItem; rowIndex: number }) => {
  if (data.row.role === '部門') {
    return 'bg-slate-50'
  }
  return ''
}

// ==================== 通用功能 ====================
const simulateLoading = () => {
  state.loading = true
  setTimeout(() => {
    state.loading = false
  }, 2000)
}
</script>

<template>
  <div class="demo-page">
    <div class="demo-container space-y-6">
      <section class="demo-section p-6">
        <h1 class="mt-1 text-3xl font-bold tracking-tight text-slate-900">表格組件示範中心</h1>
        <p class="mt-2 text-sm text-slate-500">
          一頁測試 `SortTable`、`TitleTable`、`BaseTable` 的展開列、索引列、樹形資料與懶加載。
        </p>
      </section>

      <el-card shadow="never" class="demo-section">
        <template #header>
          <div class="flex items-center justify-between">
            <h2 class="text-lg font-semibold text-slate-800">互動控制面板</h2>
            <p class="text-sm text-slate-500">已選擇 {{ state.selectedRows.length }} 筆</p>
          </div>
        </template>
        <div class="grid gap-4 md:grid-cols-2 lg:grid-cols-5">
          <el-button @click="simulateLoading" :loading="state.loading" type="primary" plain>
            {{ state.loading ? '加載中...' : '模擬加載' }}
          </el-button>
          <el-switch v-model="state.showIndex" active-text="顯示索引列" inactive-text="隱藏索引列" />
          <el-switch v-model="state.showExpand" active-text="顯示展開列" inactive-text="隱藏展開列" />
          <el-switch
            v-model="state.preserveExpanded"
            active-text="保留展開內容"
            inactive-text="不保留展開內容"
          />
          <el-switch v-model="state.multiSort" active-text="多列排序" inactive-text="單列排序" />
        </div>
      </el-card>

      <section class="grid gap-6 xl:grid-cols-2">
        <el-card shadow="never" class="demo-section">
          <template #header>
            <div class="flex items-center justify-between">
              <h3 class="text-lg font-semibold text-slate-800">SortTable 展示</h3>
              <el-tag size="small" type="primary">排序 + 操作欄</el-tag>
            </div>
          </template>
          <p class="mb-4 text-sm text-slate-500">
            支援列排序、選取、檢視/編輯按鈕，並可切換索引列與展開列。
          </p>
          <SortTable
            :data="tableData"
            :columns="tableColumns"
            :loading="state.loading"
            :show-selection="true"
            :show-index="state.showIndex"
            :show-expand="state.showExpand"
            :preserve-expanded="state.preserveExpanded"
            :show-over-flow-tooltip="true"
            :show-check-btn="true"
            :show-edit-btn="true"
            @open:transfer="handleSortTableTransfer"
            @update:select-row="handleSortTableSelectRow"
            @click:cell="handleSortTableCellClick"
            @click:column-sort="handleSortTableColumnSort"
            @click:checkRow="handleSortTableCheckRow"
            @click:editRow="handleSortTableEditRow"
          >
            <template #expand="{ row, $index }" v-if="state.showExpand">
              <div class="m-2 rounded-lg border border-slate-200 bg-slate-50 p-4 text-sm">
                <p class="mb-2 font-semibold text-slate-700">展開資訊 #{{ $index + 1 }}</p>
                <p>姓名：{{ row.name }}</p>
                <p>部門：{{ row.department }}</p>
                <p>建立日期：{{ row.createTime }}</p>
              </div>
            </template>
          </SortTable>
        </el-card>

        <el-card shadow="never" class="demo-section">
          <template #header>
            <div class="flex items-center justify-between">
              <h3 class="text-lg font-semibold text-slate-800">TitleTable 展示</h3>
              <el-tag size="small" type="success">標題 + 搜尋 Slot</el-tag>
            </div>
          </template>
          <p class="mb-4 text-sm text-slate-500">
            帶標題、搜尋區域、新增/刪除操作，並透傳展開列內容。
          </p>
          <TitleTable
            :data="tableData.slice(0, 4)"
            :columns="tableColumns"
            :loading="state.loading"
            :show-selection="true"
            :show-index="state.showIndex"
            :show-expand="state.showExpand"
            :preserve-expanded="state.preserveExpanded"
            :show-over-flow-tooltip="true"
            :show-check-btn="true"
            :show-edit-btn="true"
            table-title="員工管理"
            @click:add="handleTitleTableAdd"
            @click:delete="handleTitleTableDelete"
            @update:select-row="handleTitleTableSelectRow"
            @click:cell="handleTitleTableCellClick"
            @click:checkRow="handleTitleTableCheckRow"
            @click:editRow="handleTitleTableEditRow"
          >
            <template #tableSearch>
              <el-input
                placeholder="搜尋員工..."
                class="w-56 mr-2"
                clearable
              />
            </template>
            <template #expand="{ row, $index }" v-if="state.showExpand">
              <div class="m-2 rounded-lg border border-emerald-200 bg-emerald-50 p-4 text-sm">
                <p class="mb-2 font-semibold text-emerald-700">員工明細 #{{ $index + 1 }}</p>
                <p>姓名：{{ row.name }}</p>
                <p>年齡：{{ row.age }}</p>
                <p>分數：{{ row.score }}</p>
                <p>狀態：{{ row.status === 'active' ? '啟用' : '停用' }}</p>
              </div>
            </template>
          </TitleTable>
        </el-card>
      </section>

      <el-card shadow="never" class="demo-section">
        <template #header>
          <div class="flex items-center justify-between">
            <h3 class="text-lg font-semibold text-slate-800">BaseTable 樹形資料 + 懶加載</h3>
            <el-tag size="small" type="warning">Tree / Lazy Load</el-tag>
          </div>
        </template>
        <div class="grid gap-4 lg:grid-cols-3">
          <div class="rounded-xl border border-slate-200 bg-slate-50 p-4 text-sm text-slate-600 lg:col-span-1">
            <p class="font-semibold text-slate-800">使用重點</p>
            <ul class="mt-3 space-y-2">
              <li><code>row-key="id"</code> 定義唯一鍵</li>
              <li><code>tree-props</code> 指定 children/hasChildren</li>
              <li><code>lazy + load</code> 按需載入子節點</li>
            </ul>
          </div>
          <div class="lg:col-span-2">
            <!-- @vue-generic {TreeTableItem} -->
            <BaseTable
              :data="treeTableData"
              :columns="treeTableColumns"
              row-key="id"
              :tree-props="{ children: 'children', hasChildren: 'hasChildren' }"
              :lazy="true"
              :load="loadTreeChildren"
              :show-index="false"
              :show-over-flow-tooltip="true"
              :base-table-row-class-name="getTreeRowClassName"
            />
          </div>
        </div>
      </el-card>

      <el-card shadow="never" class="demo-section">
        <template #header>
          <h3 class="text-lg font-semibold text-slate-800">快速參數參考</h3>
        </template>
        <div class="grid gap-4 md:grid-cols-2">
          <div class="rounded-xl border border-slate-200 p-4">
            <h4 class="mb-3 font-semibold text-slate-700">常用開關</h4>
            <ul class="space-y-2 text-sm text-slate-600">
              <li><code>showIndex</code>：顯示索引列</li>
              <li><code>showExpand</code>：顯示展開列（搭配 <code>#expand</code>）</li>
              <li><code>preserveExpanded</code>：保留展開內容 DOM</li>
              <li><code>showSelection</code>：顯示勾選列</li>
            </ul>
          </div>
          <div class="rounded-xl border border-slate-200 p-4">
            <h4 class="mb-3 font-semibold text-slate-700">樹形/懶加載</h4>
            <ul class="space-y-2 text-sm text-slate-600">
              <li><code>rowKey</code>：唯一鍵（建議必填）</li>
              <li><code>treeProps</code>：children/hasChildren 欄位映射</li>
              <li><code>lazy</code>：啟用懶加載子節點</li>
              <li><code>load</code>：載入函式 <code>(row, treeNode, resolve)</code></li>
            </ul>
          </div>
        </div>
      </el-card>
    </div>
  </div>
</template>

<style scoped></style>
