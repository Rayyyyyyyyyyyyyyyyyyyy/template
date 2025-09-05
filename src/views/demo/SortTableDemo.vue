<script setup lang="ts">
import { ref } from 'vue'
import { SortTable } from '@/components'

// 表格數據
const tableData = ref([
  { id: 1, name: '張三', age: 25, score: 85, createTime: '2024-01-15' },
  { id: 2, name: '李四', age: 30, score: 92, createTime: '2024-01-16' },
  { id: 3, name: '王五', age: 28, score: 78, createTime: '2024-01-17' },
  { id: 4, name: '趙六', age: 35, score: 88, createTime: '2024-01-18' },
  { id: 5, name: '錢七', age: 22, score: 95, createTime: '2024-01-19' },
  { id: 6, name: '孫八', age: 26, score: 82, createTime: '2024-01-20' },
  { id: 7, name: '周九', age: 31, score: 90, createTime: '2024-01-21' },
  { id: 8, name: '吳十', age: 29, score: 76, createTime: '2024-01-22' }
])

// 可排序的表格列配置
const sortColumns = ref([
  { prop: 'id', label: 'ID', width: 80, sortable: true },
  { prop: 'name', label: '姓名', width: 120, sortable: true },
  { prop: 'age', label: '年齡', width: 80, sortable: true },
  { prop: 'score', label: '分數', width: 100, sortable: true },
  { prop: 'createTime', label: '創建時間', width: 150, sortable: true }
])

// 分頁配置
const pagination = ref({
  currentPage: 1,
  pageSize: 5,
  total: 8
})

// 排序信息
const sortInfo = ref<{ prop: string; order: string } | null>(null)

// 事件處理
const handlePageChange = (page: number) => {
  pagination.value.currentPage = page
  console.log('頁面變更:', page)
}

const handlePageSizeChange = (pageSize: number) => {
  pagination.value.pageSize = pageSize
  console.log('頁面大小變更:', pageSize)
}

const handleSortChange = (sortData: any) => {
  console.log('排序變更:', sortData)
  sortInfo.value = sortData

  // 這裡可以根據排序信息重新獲取數據
  // 或者對現有數據進行排序
}
</script>

<template>
  <div class="p-8 bg-gray-50 min-h-screen">
    <div class="max-w-6xl mx-auto">
      <h1 class="text-3xl font-bold text-gray-900 mb-8">SortTable 組件示範</h1>

      <!-- 排序表格 -->
      <el-card class="mb-8" shadow="always">
        <template #header>
          <h2 class="text-xl font-semibold">排序表格</h2>
        </template>
        <SortTable
          :data="tableData"
          :columns="sortColumns"
          :pagination="pagination"
          @update:page="handlePageChange"
          @update:page-size="handlePageSizeChange"
          @sort-change="handleSortChange"
        />
      </el-card>

      <!-- 排序狀態顯示 -->
      <el-card class="mb-8" shadow="always" v-if="sortInfo">
        <template #header>
          <h2 class="text-xl font-semibold">當前排序狀態</h2>
        </template>
        <div class="space-y-2">
          <p><strong>排序列:</strong> {{ sortInfo.prop }}</p>
          <p><strong>排序順序:</strong> {{ sortInfo.order }}</p>
        </div>
      </el-card>
    </div>
  </div>
</template>

<style scoped></style>
