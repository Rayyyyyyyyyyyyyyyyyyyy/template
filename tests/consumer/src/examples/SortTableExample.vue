<script setup lang="ts">
import { ref } from 'vue'
import { SortTable } from 'rayyy-vue-table-components/components'
import type { SortChangValue, TableColumn } from 'rayyy-vue-table-components/types'

type Row = { id: number; name: string }
const original: Row[] = [{ id: 1, name: 'Ada' }, { id: 2, name: 'Grace' }]
const rows = ref([...original])
const columns: TableColumn<Row>[] = [{ prop: 'name', label: '姓名', sortable: 'custom' }]
const lastSort = ref('未排序')
function sort(value: SortChangValue<Row>) {
  lastSort.value = value.order || '未排序'
  rows.value = value.order ? [...original].sort((a, b) =>
    a.name.localeCompare(b.name) * (value.order === 'descending' ? -1 : 1)) : [...original]
}
</script>

<template>
  <!-- 設定與下載按鈕只通知宿主；此範例沒有檔案匯出或持久化。 -->
  <SortTable :data="rows" :columns="columns" row-key="id" show-expand
    @click:column-sort="sort">
    <template #expand="{ row }">{{ row.name }}</template>
  </SortTable>
  <output aria-live="polite">{{ lastSort }}</output>
</template>
