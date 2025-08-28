<script setup lang="ts" generic="T extends Record<string, unknown>">
import type { SortChangValue, TableColumn } from '@/types'
import type { TableColumnCtx } from 'element-plus'
import type { VNode } from 'vue'
import BaseTable from './BaseTable.vue'
import { Setting } from '@element-plus/icons-vue'

defineProps<{
  data: T[]
  columns: TableColumn<T>[]
  tableTitle?: string
  showSelection?: boolean
  loading?: boolean
  showSummary?: boolean
  showOverFlowTooltip?: boolean
  summaryMethod?: (param: { columns: TableColumnCtx<Record<string, unknown>>[]; data: T[] }) => (string | VNode)[]
  sortTableRowClassName?: (data: { row: T; rowIndex: number }) => string
}>()

const emit = defineEmits<{
  (e: 'open:transfer'): void
  (e: 'update:selectRow', value: T[]): void
  (e: 'click:cell', column: TableColumn<T>, row: T): void
  (e: 'click:columnSort', data: SortChangValue<T>): void
}>()

const openTransferDialog = () => {
  emit('open:transfer')
}

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
  <div class="w-full mb-4">
    <div class="flex items-center h-12 bg-primary-20 px-1.5 rounded-t justify-end">
      <div class="flex items-center mr-4">
        <div class="cursor-pointer text-primary-dark text-xl flex items-center justify-center hover:text-primary-40" @click="openTransferDialog">
          <el-icon><Setting /></el-icon>
        </div>
      </div>
    </div>

    <base-table
      v-loading="loading"
      element-loading-text="數據加載中..."
      :data="data"
      :columns="columns"
      :show-summary="showSummary"
      :show-over-flow-tooltip="showOverFlowTooltip"
      :summary-method="summaryMethod"
      :show-selection="showSelection"
      :base-table-row-class-name="sortTableRowClassName"
      @selection-change="handleSelectionChange"
      @cell-click="handleCellClick"
      @column-sort-change="handleColumnSortChange"
    />
  </div>
</template>

<style scoped lang="scss">
</style>
