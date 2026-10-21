<script setup lang="ts">
import { h, ref } from 'vue'
import { BaseTable } from 'rayyy-vue-table-components/components'
import type { BaseTableProps, TableColumn } from 'rayyy-vue-table-components/types'

type Row = { id: number; name: string; amount: number }
const rows: Row[] = [{ id: 1, name: 'Ada', amount: 20 }, { id: 2, name: 'Grace', amount: 30 }]
const columns: TableColumn<Row>[] = [
  { prop: 'name', label: '姓名', template: (row) => h('strong', row.name) },
  { prop: 'amount', label: '金額', formatter: (row) => `$${row.amount}` },
]
const selected = ref<Row[]>([])
const summary: BaseTableProps<Row>['summaryMethod'] = ({ columns, data }) =>
  columns.map((column, index) => index === 0 ? '合計' : column.property === 'amount'
    ? String(data.reduce((total, row) => total + row.amount, 0)) : '')
</script>

<template>
  <BaseTable :data="rows" :columns="columns" row-key="id" show-selection show-index show-expand
    show-summary :summary-method="summary" @selection-change="selected = $event">
    <template #expand="{ row }">{{ row.name }} 的金額：{{ row.amount }}</template>
  </BaseTable>
  <output>已選 {{ selected.length }} 筆</output>
</template>
