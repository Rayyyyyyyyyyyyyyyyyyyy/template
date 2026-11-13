<script setup lang="ts">
import { BaseTable } from 'rayyy-vue-table-components/components'
import type { TableColumn } from 'rayyy-vue-table-components/types'

interface Row extends Record<string, unknown> {
  id: string
  name: string
  department: string
  role: string
  hasChildren?: boolean
  children?: Row[]
}

const rows: Row[] = [
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
  { id: 'dept-product', name: '產品部', department: '產品部', role: '部門', hasChildren: true },
  { id: 'dept-design', name: '設計部', department: '設計部', role: '部門', hasChildren: true },
]
const columns: TableColumn<Row>[] = [
  { prop: 'name', label: '名稱', minWidth: 180 },
  { prop: 'department', label: '部門', minWidth: 140, align: 'center' },
  { prop: 'role', label: '角色', minWidth: 140, align: 'center' },
]

// 模擬按需載入子節點；實際情況由宿主呼叫 API 後 resolve。
const lazyChildren: Record<string, Row[]> = {
  'dept-product': [
    { id: 'u-201', name: '蔡產品', department: '產品部', role: 'PM' },
    { id: 'u-202', name: '何產品', department: '產品部', role: 'PO' },
  ],
  'dept-design': [
    { id: 'u-301', name: '黃設計', department: '設計部', role: 'UI 設計師' },
    { id: 'u-302', name: '陳設計', department: '設計部', role: 'UX 設計師' },
  ],
}
const load = (row: Row, _treeNode: unknown, resolve: (data: Row[]) => void) => {
  setTimeout(() => resolve(lazyChildren[row.id] ?? []), 500)
}
const getRowClassName = ({ row }: { row: Row; rowIndex: number }) => (row.role === '部門' ? 'dept-row' : '')
</script>

<template>
  <div class="layout">
    <div class="tips">
      <p class="tips-title">使用重點</p>
      <ul>
        <li><code>row-key="id"</code> 定義唯一鍵</li>
        <li><code>tree-props</code> 指定 children/hasChildren</li>
        <li><code>lazy + load</code> 按需載入子節點</li>
      </ul>
    </div>
    <!-- @vue-generic {Row} -->
    <BaseTable
      :data="rows"
      :columns="columns"
      row-key="id"
      :tree-props="{ children: 'children', hasChildren: 'hasChildren' }"
      lazy
      :load="load"
      :show-index="false"
      show-over-flow-tooltip
      :base-table-row-class-name="getRowClassName"
    />
  </div>
</template>

<style scoped>
.layout {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(240px, 1fr));
  gap: 16px;
  align-items: start;
}
.tips {
  padding: 16px;
  border: 1px solid var(--el-border-color);
  border-radius: 12px;
  background: var(--el-fill-color-light);
  font-size: 14px;
  color: var(--el-text-color-regular);
}
.tips-title {
  margin: 0;
  font-weight: 600;
  color: var(--el-text-color-primary);
}
.tips ul {
  margin: 12px 0 0;
  padding-left: 20px;
  display: grid;
  gap: 8px;
}
:deep(.dept-row) {
  background: var(--el-fill-color-light);
}
</style>
