<script setup lang="ts" generic="T extends Record<string, unknown>">
import type { SortChangValue, TableColumn } from 'src/types'
import type { TableColumnCtx } from 'element-plus'
import type { VNode } from 'vue'
import BaseTable from "@/components/BaseTable.vue";

defineProps<{
  data: T[]
  columns: TableColumn<T>[]
  tableTitle?: string
  propIsEditable?: boolean
  showSelection?: boolean
  loading?: boolean
  showSummary?: boolean
  showOverFlowTooltip?: boolean
  summaryMethod?: (param: { columns: TableColumnCtx<Record<string, unknown>>[]; data: T[] }) => (string | VNode)[]
  sortTableRowClassName?: (data: { row: T; rowIndex: number }) => string
}>()

const emit = defineEmits<{
  (e: 'update:selectRow', value: T[]): void
  (e: 'click:cell', column: TableColumn<T>, row: T): void
  (e: 'click:columnSort', data: SortChangValue<T>): void
}>()


const handleSelectionChange = (selectList: T[]) => {
  emit('update:selectRow', selectList)
}
const handleCellClick = (column: TableColumn<T>, row: T) => {
  emit('click:cell', column, row)
}

const handleColumnSortChange = (data: SortChangValue<T>) => {
  emit('click:columnSort', data)
}
</script>

<template>
  <div class="data-table-container" data-cy="sort-table">


    <base-table
      v-loading="loading"
      element-loading-text="數據加載中..."
      :data="data"
      :columns="columns"
      :show-summary="showSummary"
      :show-over-flow-tooltip="showOverFlowTooltip"
      :summary-method="summaryMethod"
      :show-selection="propIsEditable || showSelection"
      :base-table-row-class-name="sortTableRowClassName"
      @selection-change="handleSelectionChange"
      @cell-click="handleCellClick"
      @column-sort-change="handleColumnSortChange"
    />
  </div>
</template>

<style scoped lang="scss">
.data-table-container {
  @apply w-full mb-4;
}

</style>
