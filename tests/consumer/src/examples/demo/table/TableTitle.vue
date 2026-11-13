<script setup lang="ts">
import { h, ref } from 'vue'
import { TitleTable } from 'rayyy-vue-table-components/components'
import type { TableColumn } from 'rayyy-vue-table-components/types'

type Row = {
  id: number
  name: string
  age: number
  score: number
  department: string
  createTime: string
  status: 'active' | 'inactive'
}

const rows: Row[] = [
  { id: 1, name: '張三', age: 25, score: 85, department: '技術部', createTime: '2024-01-15', status: 'active' },
  { id: 2, name: '李四', age: 30, score: 92, department: '產品部', createTime: '2024-01-16', status: 'active' },
  { id: 3, name: '王五', age: 28, score: 78, department: '設計部', createTime: '2024-01-17', status: 'inactive' },
  { id: 4, name: '趙六', age: 35, score: 88, department: '技術部', createTime: '2024-01-18', status: 'active' },
]
const columns: TableColumn<Row>[] = [
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
    template: (row: Row) =>
      h(
        'span',
        { style: `color: ${row.status === 'active' ? 'var(--el-color-success)' : 'var(--el-color-danger)'}` },
        row.status === 'active' ? '啟用' : '停用',
      ),
  },
  { prop: 'createTime', label: '創建時間', width: 150, sortable: true, align: 'center' },
]

const loading = ref(false)
const showIndex = ref(true)
const showExpand = ref(true)
const preserveExpanded = ref(true)
const selected = ref<Row[]>([])
const lastEvent = ref('尚無操作')

const simulateLoading = () => {
  loading.value = true
  setTimeout(() => {
    loading.value = false
  }, 2000)
}
</script>

<template>
  <div class="stack">
    <div class="controls">
      <el-button type="primary" plain :loading="loading" @click="simulateLoading">{{ loading ? '加載中...' : '模擬加載' }}</el-button>
      <el-switch v-model="showIndex" active-text="顯示索引列" inactive-text="隱藏索引列" />
      <el-switch v-model="showExpand" active-text="顯示展開列" inactive-text="隱藏展開列" />
      <el-switch v-model="preserveExpanded" active-text="保留展開內容" inactive-text="不保留展開內容" />
      <span class="hint">已選擇 {{ selected.length }} 筆</span>
    </div>
    <TitleTable
      :data="rows"
      :columns="columns"
      :loading="loading"
      show-selection
      :show-index="showIndex"
      :show-expand="showExpand"
      :preserve-expanded="preserveExpanded"
      show-over-flow-tooltip
      show-check-btn
      show-edit-btn
      table-title="員工管理"
      @click:add="lastEvent = '新增按鈕點擊'"
      @click:delete="lastEvent = '刪除按鈕點擊'"
      @update:select-row="selected = $event"
      @click:cell="(column, row) => (lastEvent = `單元格點擊: ${column.label} / ${row.name}`)"
      @click:checkRow="lastEvent = `查看按鈕點擊: ${$event.name}`"
      @click:editRow="lastEvent = `編輯按鈕點擊: ${$event.name}`"
    >
      <template #tableSearch>
        <el-input placeholder="搜尋員工..." class="search" clearable />
      </template>
      <template v-if="showExpand" #expand="{ row, $index }">
        <div class="expand">
          <p class="expand-title">員工明細 #{{ $index + 1 }}</p>
          <p>姓名：{{ row.name }}</p>
          <p>年齡：{{ row.age }}</p>
          <p>分數：{{ row.score }}</p>
          <p>狀態：{{ row.status === 'active' ? '啟用' : '停用' }}</p>
        </div>
      </template>
    </TitleTable>
    <p class="hint">最近操作：<output aria-live="polite">{{ lastEvent }}</output></p>
  </div>
</template>

<style scoped>
.stack {
  display: grid;
  gap: 16px;
}
.controls {
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  gap: 16px;
}
.hint {
  margin: 0;
  font-size: 14px;
  color: var(--el-text-color-regular);
}
.search {
  width: 224px;
  margin-right: 8px;
}
.expand {
  margin: 8px;
  padding: 16px;
  border: 1px solid var(--el-color-success-light-5);
  border-radius: 8px;
  background: var(--el-color-success-light-9);
  font-size: 14px;
  color: var(--el-text-color-regular);
}
.expand p {
  margin: 0;
}
.expand-title {
  margin-bottom: 8px !important;
  font-weight: 600;
  color: var(--el-color-success);
}
</style>
