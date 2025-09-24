<script setup lang="ts">
import { ref } from 'vue'
import { BaseTable } from '@/components'
import type { TableColumn, SortChangValue } from '@/types'

// 表格數據
const tableData = ref([
  { id: 1, name: '張三', age: 25, email: 'zhangsan@example.com', status: '啟用' },
  { id: 2, name: '李四', age: 30, email: 'lisi@example.com', status: '禁用' },
  { id: 3, name: '王五', age: 28, email: 'wangwu@example.com', status: '啟用' },
  { id: 4, name: '趙六', age: 35, email: 'zhaoliu@example.com', status: '啟用' },
  { id: 5, name: '錢七', age: 22, email: 'qianqi@example.com', status: '禁用' },
])

// 表格列配置
const columns = ref<TableColumn[]>([
  { prop: 'id', label: 'ID', width: 80 },
  { prop: 'name', label: '姓名', width: 120, sortable: true },
  { prop: 'age', label: '年齡', width: 80, sortable: true },
  { prop: 'email', label: '郵箱', minWidth: 200 },
  { prop: 'status', label: '狀態', width: 100 },
])

// 分頁配置
const pagination = ref({
  currentPage: 1,
  pageSize: 10,
  total: 5,
})

// 組件狀態
const loading = ref(false)
const showSelection = ref(true)
const showSummary = ref(false)
const selectedRows = ref<any[]>([])

// 事件處理
const handlePageChange = (page: number) => {
  pagination.value.currentPage = page
  console.log('頁面變更:', page)
}

const handlePageSizeChange = (pageSize: number) => {
  pagination.value.pageSize = pageSize
  console.log('頁面大小變更:', pageSize)
}

const handleSelectionChange = (selection: any[]) => {
  selectedRows.value = selection
  console.log('選擇變更:', selection)
}

const handleCurrentChange = (currentRow: any) => {
  console.log('當前行變更:', currentRow)
}

const handleCellClick = (column: TableColumn<any>, row: any) => {
  console.log('單元格點擊:', column, row)
}

const handleSortChange = (sortInfo: SortChangValue<any>) => {
  console.log('排序變更:', sortInfo)
}

const handleCheckRow = (row: any) => {
  console.log('查看按鈕點擊:', row)
}

const handleEditRow = (row: any) => {
  console.log('編輯按鈕點擊:', row)
}

// 模擬加載
const simulateLoading = () => {
  loading.value = true
  setTimeout(() => {
    loading.value = false
  }, 2000)
}
</script>

<template>
  <div class="p-8 bg-gray-50 min-h-screen">
    <div class="max-w-6xl mx-auto">
      <h1 class="text-3xl font-bold text-gray-900 mb-8">BaseTable 組件示範</h1>

      <!-- 控制面板 -->
      <el-card class="mb-8" shadow="always">
        <template #header>
          <h2 class="text-xl font-semibold">控制面板</h2>
        </template>
        <div class="flex flex-wrap gap-4">
          <el-button @click="simulateLoading" :loading="loading">
            {{ loading ? '加載中...' : '模擬加載' }}
          </el-button>
          <el-switch v-model="showSelection" active-text="顯示選擇列" inactive-text="隱藏選擇列" />
          <el-switch v-model="showSummary" active-text="顯示合計行" inactive-text="隱藏合計行" />
        </div>
        <div v-if="selectedRows.length > 0" class="mt-4 p-4 bg-blue-50 rounded-lg">
          <h3 class="text-sm font-medium text-blue-900 mb-2">已選擇的行：</h3>
          <p class="text-sm text-blue-700">{{ selectedRows.length }} 行被選中</p>
        </div>
      </el-card>

      <!-- 基礎表格 -->
      <el-card class="mb-8" shadow="always">
        <template #header>
          <h2 class="text-xl font-semibold">基礎表格</h2>
        </template>
        <BaseTable
          :data="tableData"
          :columns="columns"
          :loading="loading"
          :show-selection="showSelection"
          :show-summary="showSummary"
          :pagination="pagination"
          :show-check-btn="true"
          :show-edit-btn="true"
          @update:page="handlePageChange"
          @update:page-size="handlePageSizeChange"
          @selection-change="handleSelectionChange"
          @current-change="handleCurrentChange"
          @cell-click="handleCellClick"
          @column-sort-change="handleSortChange"
          @click:checkRow="handleCheckRow"
          @click:editRow="handleEditRow"
        />
      </el-card>
    </div>
  </div>
</template>

<style scoped></style>
