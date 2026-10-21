<script setup lang="ts">
import { ref } from 'vue'
import { TitleTable } from 'rayyy-vue-table-components/components'
import type { TableColumn } from 'rayyy-vue-table-components/types'

type Row = { id: number; name: string }
const rows = ref<Row[]>([{ id: 1, name: 'Ada' }])
const selected = ref<Row[]>([])
const columns: TableColumn<Row>[] = [{ prop: 'name', label: '姓名' }]
let nextId = 2
function add() { rows.value.push({ id: nextId++, name: 'New user' }) }
function remove() {
  const ids = new Set(selected.value.map((row) => row.id))
  rows.value = rows.value.filter((row) => !ids.has(row.id))
  selected.value = []
}
</script>

<template>
  <!-- 僅操作宿主記憶體；重新載入後不保留。 -->
  <TitleTable table-title="用戶" :data="rows" :columns="columns" row-key="id"
    prop-is-editable show-delete @update:select-row="selected = $event"
    @click:add="add" @click:delete="remove" />
</template>
