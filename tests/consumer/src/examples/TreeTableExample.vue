<script setup lang="ts">
import { BaseTable } from 'rayyy-vue-table-components/components'
import type { BaseTableProps, TableColumn } from 'rayyy-vue-table-components/types'

type Row = { id: string; name: string; more?: boolean; nodes?: Row[] }
const columns: TableColumn<Row>[] = [{ prop: 'name', label: '姓名' }]
const rows: Row[] = [{ id: 'parent', name: 'Parent', more: true }]
// 本地 mock；實際專案由宿主載入資料，成功後呼叫 resolve。
const load: BaseTableProps<Row>['load'] = (_row, _node, resolve) => {
  resolve([{ id: 'child', name: 'Child' }])
}
</script>

<template>
  <BaseTable :data="rows" :columns="columns" row-key="id" lazy :load="load"
    :tree-props="{ children: 'nodes', hasChildren: 'more' }" />
</template>
