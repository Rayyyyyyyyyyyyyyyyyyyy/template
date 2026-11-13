<script setup lang="ts">
import { h, ref } from 'vue'
import { BaseBtn, BaseTable, TransferDialog } from 'rayyy-vue-table-components/components'
import type { TableColumn } from 'rayyy-vue-table-components/types'

type User = {
  id: number
  name: string
  email: string
  age: number
  department: string
  salary: number
  status: 'active' | 'inactive' | 'pending'
  joinDate: string
}

const users: User[] = [
  { id: 1, name: '張小明', email: 'zhang@example.com', age: 28, department: '工程部', salary: 45000, status: 'active', joinDate: '2023-01-15' },
  { id: 2, name: '李小華', email: 'li@example.com', age: 32, department: '設計部', salary: 52000, status: 'active', joinDate: '2022-08-20' },
  { id: 3, name: '王小美', email: 'wang@example.com', age: 25, department: '行銷部', salary: 38000, status: 'pending', joinDate: '2024-03-10' },
  { id: 4, name: '陳大強', email: 'chen@example.com', age: 35, department: '工程部', salary: 60000, status: 'active', joinDate: '2021-12-01' },
  { id: 5, name: '林小芳', email: 'lin@example.com', age: 29, department: '設計部', salary: 48000, status: 'inactive', joinDate: '2023-06-15' },
]

const statusConfig = {
  active: { icon: '●', text: '啟用', color: 'var(--el-color-success)' },
  inactive: { icon: '●', text: '停用', color: 'var(--el-color-danger)' },
  pending: { icon: '○', text: '待處理', color: 'var(--el-color-warning)' },
}

const baseColumns: TableColumn<User>[] = [
  { prop: 'id', label: 'ID', width: 80, align: 'center', sortable: true },
  { prop: 'name', label: '姓名', width: 120, align: 'left', sortable: true },
  { prop: 'email', label: '郵箱', align: 'left', sortable: true },
  { prop: 'age', label: '年齡', width: 80, align: 'center', sortable: true },
  { prop: 'department', label: '部門', width: 120, align: 'center', sortable: true },
  { prop: 'salary', label: '薪資', width: 120, align: 'right', sortable: true, formatter: (row: User) => `$${row.salary.toLocaleString()}` },
  {
    prop: 'status',
    label: '狀態',
    width: 100,
    align: 'center',
    template: (row: User) => {
      const { icon, text, color } = statusConfig[row.status]
      return h('div', { style: { display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '4px' } }, [
        h('span', { style: { color } }, icon),
        h('span', { style: { fontSize: '12px', color: 'var(--el-text-color-secondary)' } }, text),
      ])
    },
  },
  { prop: 'joinDate', label: '入職日期', width: 120, align: 'center', sortable: true, formatter: (row: User) => new Date(row.joinDate).toLocaleDateString('zh-TW') },
]
const createColumns = () => baseColumns.map((column) => ({ ...column, checkActive: true }))

const columns = ref<TableColumn<User>[]>(createColumns())
const visible = ref(false)
const loading = ref(false)

// 確認後才更新宿主的欄位設定，僅存在記憶體，重新載入頁面不保留。
function confirm(value: TableColumn<User>[]) {
  columns.value = value
  visible.value = false
}

function simulateLoading() {
  loading.value = true
  setTimeout(() => {
    loading.value = false
  }, 2000)
}
</script>

<template>
  <div class="stack">
    <div class="actions">
      <BaseBtn type="primary" @click="visible = true">配置用戶表格列</BaseBtn>
      <BaseBtn @click="columns = createColumns()">重置列配置</BaseBtn>
      <BaseBtn type="success" @click="simulateLoading">模擬加載</BaseBtn>
    </div>
    <BaseTable
      :data="users"
      :columns="columns.filter((column) => column.checkActive)"
      :loading="loading"
      :show-selection="false"
      show-over-flow-tooltip
    />
    <TransferDialog v-model="visible" :columns-value="columns" transfer-title="配置用戶表格列" @update:submit="confirm" />
  </div>
</template>

<style scoped>
.stack {
  display: grid;
  gap: 16px;
}
.actions {
  display: flex;
  flex-wrap: wrap;
  gap: 12px;
}
</style>
