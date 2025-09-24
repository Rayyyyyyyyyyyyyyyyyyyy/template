<script setup lang="ts">
import { ref, reactive } from 'vue'
import { SortTable, TitleTable, BaseBtn } from '@/components'
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

// 分頁配置
const pagination = ref({
  currentPage: 1,
  pageSize: 5,
  total: 8,
})

// 組件狀態
const state = reactive({
  loading: false,
  multiSort: false,
  selectedRows: [] as TableDataItem[],
  sortInfo: null as { prop: string; order: string } | null,
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

const handleTitleTableEditButton = () => {
  console.log('TitleTable 編輯按鈕點擊')
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

// ==================== 通用功能 ====================
const simulateLoading = () => {
  state.loading = true
  setTimeout(() => {
    state.loading = false
  }, 2000)
}
</script>

<template>
  <div class="p-8 bg-gray-50 min-h-screen">
    <div class="max-w-6xl mx-auto">
      <h1 class="text-3xl font-bold text-gray-900 mb-8">表格組件示範</h1>

      <!-- 控制面板 -->
      <el-card class="mb-8" shadow="always">
        <template #header>
          <h2 class="text-xl font-semibold">控制面板</h2>
        </template>
        <div class="flex flex-wrap gap-4">
          <el-button @click="simulateLoading" :loading="state.loading">
            {{ state.loading ? '加載中...' : '模擬加載' }}
          </el-button>
          <el-switch v-model="state.multiSort" active-text="多列排序" inactive-text="單列排序" />
          <div class="text-sm text-gray-600">已選擇 {{ state.selectedRows.length }} 行</div>
        </div>
      </el-card>

      <!-- SortTable 示範 -->
      <el-card class="mb-8" shadow="always">
        <template #header>
          <h2 class="text-xl font-semibold">SortTable 組件</h2>
        </template>
        <div class="mb-4">
          <p class="text-gray-600 mb-4">
            SortTable 是一個帶有排序功能的表格組件，支持多列排序、分頁和轉移對話框功能。
          </p>
        </div>

        <SortTable
          :data="tableData"
          :columns="tableColumns"
          :loading="state.loading"
          :show-selection="true"
          :show-over-flow-tooltip="true"
          :show-operator="true"
          @open:transfer="handleSortTableTransfer"
          @update:select-row="handleSortTableSelectRow"
          @click:cell="handleSortTableCellClick"
          @click:column-sort="handleSortTableColumnSort"
          @click:checkRow="handleSortTableCheckRow"
          @click:editRow="handleSortTableEditRow"
        />
      </el-card>

      <!-- TitleTable 示範 -->
      <el-card class="mb-8" shadow="always">
        <template #header>
          <h2 class="text-xl font-semibold">TitleTable 組件</h2>
        </template>
        <div class="mb-4">
          <p class="text-gray-600 mb-4">
            TitleTable 是一個帶有標題和操作按鈕的表格組件，內建新增和刪除功能。
          </p>
        </div>

        <TitleTable
          :data="tableData.slice(0, 4)"
          :columns="tableColumns"
          :loading="state.loading"
          :show-selection="true"
          :show-over-flow-tooltip="true"
          :show-operator="true"
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
              style="width: 200px; margin-right: 10px"
              clearable
            />
          </template>
        </TitleTable>
      </el-card>

      <!-- 排序狀態顯示 -->
      <el-card class="mb-8" shadow="always" v-if="state.sortInfo">
        <template #header>
          <h2 class="text-xl font-semibold">當前排序狀態</h2>
        </template>
        <div class="space-y-2">
          <p><strong>排序列:</strong> {{ state.sortInfo.prop }}</p>
          <p><strong>排序順序:</strong> {{ state.sortInfo.order }}</p>
        </div>
      </el-card>

      <!-- 功能特色說明 -->
      <el-card class="mb-8" shadow="always">
        <template #header>
          <h2 class="text-xl font-semibold">表格組件功能特色</h2>
        </template>
        <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
          <!-- SortTable 特色 -->
          <div class="bg-blue-50 p-4 rounded-lg">
            <h3 class="text-lg font-semibold text-blue-800 mb-3">SortTable 特色</h3>
            <ul class="space-y-2 text-blue-700">
              <li class="flex items-start">
                <span class="text-blue-600 mr-2 mt-0.5">•</span>
                <span>支持多列排序功能</span>
              </li>
              <li class="flex items-start">
                <span class="text-blue-600 mr-2 mt-0.5">•</span>
                <span>內建轉移對話框按鈕</span>
              </li>
              <li class="flex items-start">
                <span class="text-blue-600 mr-2 mt-0.5">•</span>
                <span>支持行選擇功能</span>
              </li>
              <li class="flex items-start">
                <span class="text-blue-600 mr-2 mt-0.5">•</span>
                <span>單元格點擊事件</span>
              </li>
            </ul>
          </div>

          <!-- TitleTable 特色 -->
          <div class="bg-green-50 p-4 rounded-lg">
            <h3 class="text-lg font-semibold text-green-800 mb-3">TitleTable 特色</h3>
            <ul class="space-y-2 text-green-700">
              <li class="flex items-start">
                <span class="text-green-600 mr-2 mt-0.5">•</span>
                <span>自定義表格標題</span>
              </li>
              <li class="flex items-start">
                <span class="text-green-600 mr-2 mt-0.5">•</span>
                <span>內建新增/刪除按鈕</span>
              </li>
              <li class="flex items-start">
                <span class="text-green-600 mr-2 mt-0.5">•</span>
                <span>支持搜尋插槽</span>
              </li>
              <li class="flex items-start">
                <span class="text-green-600 mr-2 mt-0.5">•</span>
                <span>完整的 CRUD 操作</span>
              </li>
            </ul>
          </div>
        </div>
      </el-card>

      <!-- API 文檔 -->
      <el-card class="mb-8" shadow="always">
        <template #header>
          <h2 class="text-xl font-semibold">API 文檔</h2>
        </template>
        <div class="space-y-6">
          <!-- SortTable API -->
          <div>
            <h3 class="text-lg font-semibold mb-3">SortTable Props</h3>
            <div class="overflow-x-auto">
              <BaseTable
                :data="[
                  { prop: 'data', type: 'T[]', default: '-', desc: '表格數據' },
                  { prop: 'columns', type: 'TableColumn<T>[]', default: '-', desc: '列配置' },
                  { prop: 'loading', type: 'boolean', default: 'false', desc: '加載狀態' },
                  {
                    prop: 'showSelection',
                    type: 'boolean',
                    default: 'false',
                    desc: '是否顯示選擇列',
                  },
                ]"
                :columns="[
                  { prop: 'prop', label: '屬性', align: 'left' },
                  { prop: 'type', label: '類型', align: 'left' },
                  { prop: 'default', label: '預設值', align: 'left' },
                  { prop: 'desc', label: '說明', align: 'left' },
                ]"
                class="min-w-full border border-gray-200"
                :showHeader="true"
                :showSelection="false"
                :loading="false"
              />
            </div>
          </div>

          <!-- TitleTable API -->
          <div>
            <h3 class="text-lg font-semibold mb-3">TitleTable Props</h3>
            <div class="overflow-x-auto">
              <table class="min-w-full border border-gray-200">
                <thead class="bg-gray-50">
                  <tr>
                    <th class="px-4 py-2 text-left border-b">屬性</th>
                    <th class="px-4 py-2 text-left border-b">類型</th>
                    <th class="px-4 py-2 text-left border-b">預設值</th>
                    <th class="px-4 py-2 text-left border-b">說明</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td class="px-4 py-2 border-b">data</td>
                    <td class="px-4 py-2 border-b">T[]</td>
                    <td class="px-4 py-2 border-b">-</td>
                    <td class="px-4 py-2 border-b">表格數據</td>
                  </tr>
                  <tr>
                    <td class="px-4 py-2 border-b">columns</td>
                    <td class="px-4 py-2 border-b">TableColumn&lt;T&gt;[]</td>
                    <td class="px-4 py-2 border-b">-</td>
                    <td class="px-4 py-2 border-b">列配置</td>
                  </tr>
                  <tr>
                    <td class="px-4 py-2 border-b">tableTitle</td>
                    <td class="px-4 py-2 border-b">string</td>
                    <td class="px-4 py-2 border-b">-</td>
                    <td class="px-4 py-2 border-b">表格標題</td>
                  </tr>
                  <tr>
                    <td class="px-4 py-2 border-b">loading</td>
                    <td class="px-4 py-2 border-b">boolean</td>
                    <td class="px-4 py-2 border-b">false</td>
                    <td class="px-4 py-2 border-b">加載狀態</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>

          <!-- Events -->
          <div>
            <h3 class="text-lg font-semibold mb-3">Events</h3>
            <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <h4 class="font-semibold mb-2">SortTable Events</h4>
                <ul class="space-y-1 text-sm">
                  <li><code>@open:transfer</code> - 打開轉移對話框</li>
                  <li><code>@update:select-row</code> - 選擇行變更</li>
                  <li><code>@click:cell</code> - 單元格點擊</li>
                  <li><code>@click:column-sort</code> - 列排序點擊</li>
                  <li><code>@click:checkRow</code> - 查看按鈕點擊</li>
                  <li><code>@click:editRow</code> - 編輯按鈕點擊</li>
                </ul>
              </div>
              <div>
                <h4 class="font-semibold mb-2">TitleTable Events</h4>
                <ul class="space-y-1 text-sm">
                  <li><code>@click:add</code> - 新增按鈕點擊</li>
                  <li><code>@click:edit</code> - 編輯按鈕點擊</li>
                  <li><code>@click:delete</code> - 刪除按鈕點擊</li>
                  <li><code>@update:select-row</code> - 選擇行變更</li>
                  <li><code>@click:cell</code> - 單元格點擊</li>
                  <li><code>@click:checkRow</code> - 查看按鈕點擊</li>
                  <li><code>@click:editRow</code> - 編輯按鈕點擊</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </el-card>
    </div>
  </div>
</template>

<style scoped></style>
