<script setup lang="ts">
import { ref } from 'vue'
import { BaseTable } from '@/components'

// 表格數據
const tableData = ref([
  { id: 1, name: '張三', age: 25, email: 'zhangsan@example.com', status: '啟用' },
  { id: 2, name: '李四', age: 30, email: 'lisi@example.com', status: '禁用' },
  { id: 3, name: '王五', age: 28, email: 'wangwu@example.com', status: '啟用' },
  { id: 4, name: '趙六', age: 35, email: 'zhaoliu@example.com', status: '啟用' },
  { id: 5, name: '錢七', age: 22, email: 'qianqi@example.com', status: '禁用' }
])

// 表格列配置
const columns = ref([
  { prop: 'id', label: 'ID', width: 80 },
  { prop: 'name', label: '姓名', width: 120 },
  { prop: 'age', label: '年齡', width: 80 },
  { prop: 'email', label: '郵箱', minWidth: 200 },
  { prop: 'status', label: '狀態', width: 100 }
])

// 分頁配置
const pagination = ref({
  currentPage: 1,
  pageSize: 10,
  total: 5
})

// 事件處理
const handlePageChange = (page: number) => {
  pagination.value.currentPage = page
  console.log('頁面變更:', page)
}

const handlePageSizeChange = (pageSize: number) => {
  pagination.value.pageSize = pageSize
  console.log('頁面大小變更:', pageSize)
}
</script>

<template>
  <div class="p-8 bg-gray-50 min-h-screen">
    <div class="max-w-6xl mx-auto">
      <h1 class="text-3xl font-bold text-gray-900 mb-8">BaseTable 組件示範</h1>

      <el-card class="mb-8" shadow="always">
        <template #header>
          <h2 class="text-xl font-semibold">基礎表格</h2>
        </template>
        <BaseTable
          :data="tableData"
          :columns="columns"
          :pagination="pagination"
          @update:page="handlePageChange"
          @update:page-size="handlePageSizeChange"
        />
      </el-card>
    </div>
  </div>
</template>

<style scoped></style>
