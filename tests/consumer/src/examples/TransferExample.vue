<script setup lang="ts">
import { ref } from 'vue'
import { BaseBtn, TransferDialog } from 'rayyy-vue-table-components/components'
import type { TableColumn } from 'rayyy-vue-table-components/types'
const open = ref(false)
const columns = ref<TableColumn[]>([
  { prop: 'id', label: 'ID', checkActive: true },
  { prop: 'name', label: '姓名', checkActive: true },
])
function confirm(value: TableColumn[]) {
  columns.value = value // 僅更新宿主記憶體，重新載入頁面不保留。
  open.value = false
}
</script>

<template>
  <BaseBtn text="設定欄位" @click="open = true" />
  <TransferDialog v-model="open" :columns-value="columns" transfer-title="欄位設定" @update:submit="confirm" />
</template>
